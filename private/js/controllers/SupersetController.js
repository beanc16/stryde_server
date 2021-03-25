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



class SupersetController
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
					SupersetController._onSuccessfulGetSupersets(req, result, resolve, reject);
				})
				.catch(function (err)
				{
					SupersetController._onFailedGetSupersets(req, err, reject);
				});
		});
	}
	
	
	
	static _onSuccessfulGetSupersets(req, result, resolve, reject)
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
				
				if (fwoWithSupersetExercise.supersetId != null)
				{
					resultsArray.push(fwoWithSupersetExercise);
				}
			}
			
			let mysqlResults = new MySqlResults(
				"Succeeded at finding Supersets with params: " + 
					req.params.toString(),
				resultsArray, null
			);
			
			resolve(mysqlResults);
		}
		
		else
		{
			let mysqlResults = new MySqlResults(
				"Failed to find Supersets with params: " + 
					req.params.toString(),
				null, "Supersets not found"
			);
			reject(mysqlResults);
		}
	}
	
	static _onFailedGetSupersets(req, err, reject)
	{
		let mysqlResults = new MySqlResults(
			"Failed to find Supersets with params: " + 
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
			const storedProcedureToRun = "createSuperset";
			const keywordParameters = [formData.userId, formData.supersetName];

			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
				.then(function (result)
				{
					let results = 
						new MySqlResults("Successful Create Superset", 
										 "Created superset: " + 
											formdata.workoutName, 
										 null);
					resolve(results);
				})
				.catch(function (err)
				{
					let results = 
						new MySqlResults("Failed Create Superset", 
										 null, 
										 "Failed to create superset. " + 
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
			const storedProcedureToRun = "updateSuperset";
			const keywordParameters = [formData.workoutId, formData.supersetName];

			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
				.then(function (result)
				{
					let results = 
						new MySqlResults("Successful Update Superset", 
										 "Updated superset", 
										 null);
					resolve(results);
				})
				.catch(function (err)
				{
					let results = 
						new MySqlResults("Failed Create Superset", 
										 null, 
										 "Failed to update superset. " + 
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
			const storedProcedureToRun = "deleteSuperset";
			const keywordParameters = [formData.supersetId];

			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
				.then(function (result)
				{
					let results = 
						new MySqlResults("Successful Delete Superset", 
										 "Deleted superset", 
										 null);
					resolve(results);
				})
				.catch(function (err)
				{
					let results = 
						new MySqlResults("Failed Delete Superset", 
										 null, 
										 "Failed to delete superset. " + 
										 "Please try again.");
					reject(results);
				});
		});
	}
}



module.exports = (function()
{
    return SupersetController;
})();
