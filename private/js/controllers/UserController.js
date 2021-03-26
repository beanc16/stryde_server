// MySQL
const connection = require("../../../external_routes/mysql_connection");
let MySqlResults = require("../../../external_routes/mysql_results");

// Encryption
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.BCRYPT_SALT);
const bcryptHelpers = require("../../../custom_modules/bcrypt_helpers");


// Custom modules && variables
const mysqlHelpers = require('../../../custom_modules/mysql_helpers');

// Models
const UserExperience = require("../models/views/UserExperience");



class UserController
{
	/* 
	 * GETS
	 */
	
	static async getById(req)
	{
		return new Promise(function (resolve, reject)
		{
			const storedProcedureName = "getUserById";
			const keywordParameters = [ req.params["userId"] ];
			
			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureName, keywordParameters)
				.then(function (result)
				{
					UserController._onSuccessfulGetUser(req, result, resolve, reject);
				})
				.catch(function (err)
				{
					UserController._onFailedGetUser(req, err, reject);
				});
		});
	}
	
	static async getByUsername(req, username)
	{
		return new Promise(function (resolve, reject)
		{
			if (username != null)
			{
				req.params["username"] = username;
			}
			
			const storedProcedureName = "getUserByUsername";
			const keywordParameters = [ req.params["username"] ];
			
			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureName, keywordParameters)
				.then(function (result)
				{
					UserController._onSuccessfulGetUser(req, result, resolve, reject);
				})
				.catch(function (err)
				{
					UserController._onFailedGetUser(req, err, reject);
				});
		});
	}
	
	
	
	static _onSuccessfulGetUser(req, result, resolve, reject)
	{
		let newResult = result[0][0];
		
		if (newResult != null)
		{
			let userExperience = new UserExperience(newResult);
			let mysqlResults = new MySqlResults(
				"Succeeded at finding User with params: " + req.params.toString(),
				userExperience, null
			);
			
			resolve(mysqlResults);
		}
		
		else
		{
			let mysqlResults = new MySqlResults(
				"Failed to find User with params: " + req.params.toString(),
				null, "User not found"
			);
			reject(mysqlResults);
		}
	}
	
	static _onFailedGetUser(req, err, reject)
	{
		let mysqlResults = new MySqlResults(
			"Failed to find User with params: " + req.params,
			null, err
		);
		
		reject(mysqlResults);
	}
	
	
	
	
	
	/* 
	 * POSTS
	 */
	
	static async login(req, formData)
	{
		return new Promise(function (resolve, reject)
		{
			UserController.getByUsername(req, formData.username)
				.then(function (mysqlResults)
				{
					UserController._tryLogin(formData.password, 
											 mysqlResults._results
														 ._user, 
											 resolve,
											 reject)
						.then(function (user)
						{
							console.log(mysqlResults._results);
							UserController._onSuccessfulLogin(mysqlResults._results, 
															  resolve);
						})
						.catch(function (err)
						{
							UserController._onFailedLogin(err, reject);
						});
				})
				.catch(function (err)
				{
					UserController._onFailedLogin("Invalid username", reject);
				});
		});
	}
	
	static async _tryLogin(formPassword, user)
	{
		return new Promise(function (resolve, reject)
		{
			try
			{
				// Username not found
				if (user["_username"] == null)
				{
					reject("Invalid username.");
				}

				bcryptHelpers.encryptedPasswordMatches(
					bcrypt, formPassword, user["_password"]
				)
					.then(function (doesPasswordMatch)
					{
						if (doesPasswordMatch)
						{
							resolve(user);
						}

						else
						{
							reject("Invalid password.");
						}
					})
					.catch(function (err)
					{
						reject(err);
					});
			}

			catch (err)
			{
				reject(err);
			}
		});
	}
	
	static _onSuccessfulLogin(userExperience, resolve)
	{
		let mySqlResults = new MySqlResults("Successful Login", userExperience, 
											null);
		resolve(mySqlResults);
	}
	
	static _onFailedLogin(err, reject)
	{
		try
		{
			if (err.includes("Invalid username") || 
				err.includes("Invalid password"))
			{
				let mySqlResults = new MySqlResults("Failed Login", 
													null, err);
				reject(mySqlResults);
			}
			
			else
			{
				let mySqlResults = new MySqlResults("Failed Login", 
													null, 
													"User does not exist");
				reject(mySqlResults);
			}
		}
		
		catch (err2)
		{
			let mySqlResults = new MySqlResults("Failed Login", null, 
												"An unknown error " +
												"occurred while " + 
												"logging in:\n" + 
												err2);
			reject(mySqlResults);
		}
	}
	
	
	
	static async register(req, formData)
	{
		return new Promise(async function (resolve, reject)
		{
			const encryptedPassword = await bcryptHelpers.encryptPassword(
				bcrypt, formData.password, saltRounds
			);

			const storedProcedureToRun = "registerUser";
			const keywordParameters = [formData.username, encryptedPassword];

			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
				.then(function (result)
				{
					UserController._onSuccessfulRegister(req, result, resolve);
				})
				.catch(function (err)
				{
					UserController._onFailedRegister(err, reject);
				});
		});
	}
	
	static _onSuccessfulRegister(req, result, resolve)
	{
		let mySqlResults = new MySqlResults("Successful Register", result, 
											null);
		resolve(mySqlResults);
	}
	
	static _onFailedRegister(err, reject)
	{
		let mySqlResults = new MySqlResults("Failed Register", 
											null, 
											"Failed to register. A " + 
											"user with that " + 
											"username may already " + 
											"exist:\n" + err);
		reject(mySqlResults);
	}
}



module.exports = (function()
{
    return UserController;
})();
