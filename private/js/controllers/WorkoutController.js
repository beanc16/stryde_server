// MySQL
const connection = require("../../../external_routes/mysql_connection");
let MySqlResults = require("../../../external_routes/mysql_results");

// Encryption
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.BCRYPT_SALT);

// Custom modules && variables
const mysqlHelpers = require('../../../custom_modules/mysql_helpers');

// Models
const FullWorkoutOrderWithSupersetExercise = 
	require("../models/views/FullWorkoutOrderWithSupersetExercise");


class WorkoutController
{
	/* 
	 * GETS
	 */
	
	static async getByUserId(req)
	{
		return new Promise(function (resolve, reject)
		{
			const storedProcedureName = "getAllWorkoutsByUserId";
			const keywordParameters = [ req.params["userId"] ];
			
			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureName, keywordParameters)
				.then(function (result)
				{
					WorkoutController._onSuccessfulGetWorkouts(req, result, resolve, reject);
				})
				.catch(function (err)
				{
					WorkoutController._onFailedGetWorkouts(req, err, reject);
				});
		});
	}
	
	
	
	static _onSuccessfulGetWorkouts(req, result, resolve, reject)
	{
		let newResults = result[0];
		
		
		if (newResults != null && newResults.length > 0)
		{
			let resultsArray = [];
			
			for (let i = 0; i < newResults.length; i++)
			{
				let fwoWithSupersetExercise = 
					new FullWorkoutOrderWithSupersetExercise(
						newResults[i]
					);
				resultsArray.push(fwoWithSupersetExercise);
			}
			
			let mysqlResults = new MySqlResults(
				"Succeeded at finding Workouts with params: " + 
					req.params.toString(),
				resultsArray, null
			);
			
			resolve(mysqlResults);
		}
		
		else
		{
			let mysqlResults = new MySqlResults(
				"Failed to find Workouts with params: " + 
					req.params.toString(),
				null, "Workouts not found"
			);
			reject(mysqlResults);
		}
	}
	
	static _onFailedGetWorkouts(req, err, reject)
	{
		let mysqlResults = new MySqlResults(
			"Failed to find Workouts with params: " + 
				req.params.toString(),
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
			WorkoutController.getUserByUsername(req)
				.then(function (result)
				{
					_tryLogin(formData.password, result[0][0], resolve,
							  reject)
						.then(function (user)
						{
							WorkoutController._onSuccessfulLogin(user, 
															  resolve);
						})
						.catch(function (err)
						{
							WorkoutController._onFailedLogin(err, reject);
						});
				})
				.catch(
					(err) => _onFailedLogin(err, reject)
				);
		});
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
}



module.exports = (function()
{
    return WorkoutController;
})();
