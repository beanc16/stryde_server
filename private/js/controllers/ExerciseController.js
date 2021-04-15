// MySQL
const connection = require("../../../external_routes/mysql_connection");
let MySqlResults = require("../../../external_routes/mysql_results");


// Custom modules && variables
const mysqlHelpers = require('../../../custom_modules/mysql_helpers');

// Models
const ExerciseAndMuscleGroupWithType = require("../models/views/ExerciseAndMuscleGroupWithType");



class ExerciseController
{
	/* 
	 * GETS
	 */
	
	static getAll()
	{
		return new Promise(function (resolve, reject)
		{
			const storedProcedureName = "getAllExercises";
			
			mysqlHelpers.storedProcedureNoParamsAsync(connection, storedProcedureName)
				.then(function (result)
				{
					ExerciseController._onSuccessfulGetExercises(result, resolve, reject);
				})
				.catch(function (err)
				{
					ExerciseController._onFailedGetExercises(err, reject);
				});
		});
	}
	
	static _onSuccessfulGetExercises(result, resolve, reject)
	{
		let newResults = result[0];
		
		if (newResults != null && newResults.length > 0)
		{
			let mysqlResults = ExerciseController._parseExerciseResults(newResults);
			resolve(mysqlResults);
		}
		
		else if (newResults.length == 0)
		{
			let mysqlResults = new MySqlResults(
				"Succeeded at finding Exercises",
				[], null
			);
			
			resolve(mysqlResults);
		}
		
		else
		{
			let mysqlResults = new MySqlResults(
				"Failed to find Exercises",
				null, "Exercises not found"
			);
			reject(mysqlResults);
		}
	}
	
	static _onFailedGetExercises(err, reject)
	{
		let mysqlResults = new MySqlResults(
			"Failed to find Exercises",
			null, err
		);
		
		reject(mysqlResults);
	}
	
	
	
	static _parseExerciseResults(newResults)
	{
		let resultsArray = [];
		let prevExerciseId = -1;
		let prevExercise = null;
		let curExercise = null;
		
		for (let i = 0; i < newResults.length; i++)
		{
			let curExercise = new ExerciseAndMuscleGroupWithType(
				newResults[i]
			);
			
			// The previous and current exercise ARE the same, 
			// just with different muscle group information
			if (i != 0 && 
				curExercise.exerciseId == prevExercise.exerciseId)
			{
				prevExercise.addMuscleGroupInfo(
					newResults[i]["mg_name"],
					newResults[i]["mg_type_name"]
				);
			}
			
			else if (prevExercise != null && 
					 curExercise.exerciseId != prevExercise.exerciseId)
			{
				resultsArray.push(prevExercise);
			}
			
			if (i == 0 || 
				curExercise.exerciseId != prevExercise.exerciseId)
			{
				prevExercise = curExercise;
			}
			
			// The final exercise hasn't been added to the results yet
			if (i == newResults.length - 1 && 
				resultsArray[resultsArray.length - 1].exerciseId != 
					prevExercise.exerciseId)
			{
				resultsArray.push(prevExercise);
			}
		}
		
		return new MySqlResults(
			"Succeeded at finding Exercises",
			resultsArray, null
		);
	}
	
	
	
	
	
	
	/* 
	 * POSTS
	 */
	
	// Create / Insert
	static async create(req, formData)
	{
		return new Promise(function (resolve, reject)
		{
		});
	}
}



module.exports = (function()
{
    return ExerciseController;
})();
