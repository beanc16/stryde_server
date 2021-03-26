// MySQL
const connection = 
	require("../../../external_routes/mysql_connection");
let MySqlResults = require("../../../external_routes/mysql_results");

// Encryption
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.BCRYPT_SALT);


// Custom modules && variables
const mysqlHelpers = require('../../../custom_modules/mysql_helpers');

// Models
const FullWorkoutOrderWithSupersetExercise = 
	require("../models/views/FullWorkoutOrderWithSupersetExercise");
const Workout = require("../models/tables/Workout");



class WorkoutController
{
	/* 
	 * GETS
	 */
	
	static async getNonEmptyByUserId(req)
	{
		return new Promise(function (resolve, reject)
		{
			const storedProcedureName = "getNonEmptyWorkoutsByUserId";
			const keywordParameters = [ req.params["userId"] ];
			
			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureName, keywordParameters)
				.then(function (result)
				{
					WorkoutController._onSuccessfulGetNonEmptyWorkouts(req, result, resolve, reject);
				})
				.catch(function (err)
				{
					WorkoutController._onFailedGetNonEmptyWorkouts(req, err, reject);
				});
		});
	}
	
	static async getEmptyByUserId(req)
	{
		return new Promise(function (resolve, reject)
		{
			const storedProcedureName = "getEmptyWorkoutsByUserId";
			const keywordParameters = [ req.params["userId"] ];
			
			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureName, keywordParameters)
				.then(function (result)
				{
					WorkoutController._onSuccessfulGetEmptyWorkouts(req, result, resolve, reject);
				})
				.catch(function (err)
				{
					WorkoutController._onFailedGetEmptyWorkouts(req, err, reject);
				});
		});
	}
	
	
	
	static _onSuccessfulGetNonEmptyWorkouts(req, result, resolve, reject)
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
				"Succeeded at finding Non-Empty Workouts with params: " + 
					req.params.toString(),
				resultsArray, null
			);
			
			resolve(mysqlResults);
		}
		
		else if (newResults.length == 0)
		{
			let mysqlResults = new MySqlResults(
				"Succeeded at finding Non-Empty Workouts with params: " + 
					req.params.toString(),
				[], null
			);
			
			resolve(mysqlResults);
		}
		
		else
		{
			let mysqlResults = new MySqlResults(
				"Failed to find Non-Empty Workouts with params: " + 
					req.params.toString(),
				null, "Workouts not found"
			);
			reject(mysqlResults);
		}
	}
	
	static _onFailedGetNonEmptyWorkouts(req, err, reject)
	{
		let mysqlResults = new MySqlResults(
			"Failed to find Non-Empty Workouts with params: " + 
				req.params.toString(),
			null, err
		);
		
		reject(mysqlResults);
	}
	
	
	
	static _onSuccessfulGetEmptyWorkouts(req, result, resolve, reject)
	{
		let newResults = result[0];
		
		
		if (newResults != null && newResults.length > 0)
		{
			let resultsArray = [];
			
			for (let i = 0; i < newResults.length; i++)
			{
				let workout = new Workout(newResults[i]);
				resultsArray.push(workout);
			}
			
			let mysqlResults = new MySqlResults(
				"Succeeded at finding Empty Workouts with params: " + 
					req.params.toString(),
				resultsArray, null
			);
			
			resolve(mysqlResults);
		}
		
		else if (newResults.length == 0)
		{
			let mysqlResults = new MySqlResults(
				"Succeeded at finding Empty Workouts with params: " + 
					req.params.toString(),
				[], null
			);
			
			resolve(mysqlResults);
		}
		
		else
		{
			let mysqlResults = new MySqlResults(
				"Failed to find Empty Workouts with params: " + 
					req.params.toString(),
				null, "Workouts not found"
			);
			reject(mysqlResults);
		}
	}
	
	static _onFailedGetEmptyWorkouts(req, err, reject)
	{
		let mysqlResults = new MySqlResults(
			"Failed to find Empty Workouts with params: " + 
				req.params.toString(),
			null, err
		);
		
		reject(mysqlResults);
	}
	
	
	
	
	
	/* 
	 * POSTS
	 */
	
	// Create / Insert
	static async create(req, formData)
	{
		return new Promise(function (resolve, reject)
		{
			const storedProcedureToRun = "createWorkout";
			const keywordParameters = [formData.userId, formData.workoutName, formData.workoutDescription];

			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
				.then(function (result)
				{
					let results = 
						new MySqlResults("Successful Create Workout", 
										 "Created workout: " + 
											formData.workoutName, 
										 null);
					resolve(results);
				})
				.catch(function (err)
				{
					let results = 
						new MySqlResults("Failed Create Workout", 
										 null, 
										 "Failed to create workout. " + 
										 "Please try again.");
					reject(results);
				});
		});
	}
	
	// Update
	static async update(req, formData)
	{
		return new Promise(function (resolve, reject)
		{
			const storedProcedureToRun = "updateWorkout";
			const keywordParameters = [formData.workoutId, formData.workoutName, formData.workoutDescription];

			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
				.then(function (result)
				{
					let results = 
						new MySqlResults("Successful Update Workout", 
										 "Updated workout", 
										 null);
					resolve(results);
				})
				.catch(function (err)
				{
					let results = 
						new MySqlResults("Failed Create Workout", 
										 null, 
										 "Failed to update workout. " + 
										 "Please try again.");
					reject(results);
				});
		});
	}
	
	// Delete
	static async delete(req, formData)
	{
		return new Promise(function (resolve, reject)
		{
			const storedProcedureToRun = "deleteWorkout";
			const keywordParameters = [formData.workoutId];

			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
				.then(function (result)
				{
					let results = 
						new MySqlResults("Successful Delete Workout", 
										 "Deleted workout", 
										 null);
					resolve(results);
				})
				.catch(function (err)
				{
					let results = 
						new MySqlResults("Failed Delete Workout", 
										 null, 
										 "Failed to delete workout. " + 
										 "Please try again.");
					reject(results);
				});
		});
	}
}



module.exports = (function()
{
    return WorkoutController;
})();
