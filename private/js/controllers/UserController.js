// MySQL
const connection = require("../../../external_routes/mysql_connection");
let MySqlResults = require("../../../external_routes/mysql_results");

// Encryption
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.BCRYPT_SALT);


// Access req.body in post requests (USED FOR FORMS)
const bodyParser = require("body-parser");
app.use(bodyParser.json());                         // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


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
	
	static async getByUsername(req)
	{
		return new Promise(function (resolve, reject)
		{
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
	
	static async login(req)
	{
		return new Promise(function (resolve, reject)
		{
			// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
			const formData = req.body;
			
			UserController.getUserByUsername(req)
				.then(function (result)
				{
					_tryLogin(formData.password, result[0][0], resolve,
							  reject)
						.then(function (user)
						{
							UserController._onSuccessfulLogin(user, 
															  resolve);
						})
						.catch(function (err)
						{
							UserController._onFailedLogin(err, reject);
						});
				})
				.catch(
					(err) => _onFailedLogin(err, reject)
				);
		});
	}
	
	static async _tryLogin(formPassword, user, resolve, reject)
	{
		try
		{
			let mySqlResultsErr = new MySqlResults("Failed Login", 
												   user, null);
			
			// Username not found
			if (user["user_username"] == null)
			{
				mySqlResultsErr.error = "Invalid username.";
				reject(mySqlResultsErr);
			}

			bcryptHelpers.encryptedPasswordMatches(
				bcrypt, formPassword, user["user_password"]
			)
				.then(function (doesPasswordMatch)
				{
					if (doesPasswordMatch)
					{
						resolve(user);
					}

					else
					{
						mySqlResultsErr.error = "Invalid password.";
						reject(mySqlResultsErr);
					}
				})
				.catch(function (err)
				{
					mySqlResultsErr.error = err;
					reject(mySqlResultsErr);
				});
		}

		catch (err)
		{
			mySqlResultsErr.error = err;
			reject(mySqlResultsErr);
		}
	}
	
	static _onSuccessfulLogin(user, resolve)
	{
		let mySqlResults = new MySqlResults("Successful Login", user, 
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
	
	
	
	static async register(req)
	{
		return new Promise(function (resolve, reject)
		{
			// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
			const formData = req.body;
			
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
		let mySqlResults = new MySqlResults("Successful Register", 
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
