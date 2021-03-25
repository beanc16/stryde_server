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
	
	// Create / Insert
	static async create(req)
	{
		return new Promise(function (resolve, reject)
		{
			// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
			const formData = req.body;
			
			const storedProcedureToRun = "createWorkout";
			const keywordParameters = [formData.userId, formData.workoutName, formData.workoutDescription];

			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
				.then(function (result)
				{
					let results = 
						new MySqlResults("Successful Create Workout", 
										 "Created workout: " + 
											formdata.workoutName, 
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
	static async update(req)
	{
		return new Promise(function (resolve, reject)
		{
			// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
			const formData = req.body;

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
		}
	}
	
	// Delete
	static async delete(req)
	{
		return new Promise(function (resolve, reject)
		{
			// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
			const formData = req.body;

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
		}
	}
}



module.exports = (function()
{
    return WorkoutController;
})();
