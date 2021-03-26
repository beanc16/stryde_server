// MySQL
const connection = require("../../../external_routes/mysql_connection");
let MySqlResults = require("../../../external_routes/mysql_results");


// Custom modules && variables
const mysqlHelpers = require('../../../custom_modules/mysql_helpers');

// Models
const UserExperience = require("../models/views/UserExperience");



class UserExerciseController
{
	/* 
	 * POSTS
	 */
	
	// Create / Insert
	static async create(req, formData)
	{
		return new Promise(function (resolve, reject)
		{
			const storedProcedureToRun = "createUserExercise";
			const keywordParameters = [
				formData.userId, formData.exerciseId, 
				formData.ueiDescription, formData.ueiSets, 
				formData.ueiReps, formData.ueiWeight, 
				formData.ueiDuration, formData.ueiDistance, 
				formData.ueiResistance
			];

			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
				.then(function (result)
				{
					let results = 
						new MySqlResults("Successful Create UserExercise", 
										 "Created UserExercise", 
										 null);
					resolve(results);
				})
				.catch(function (err)
				{
					let results = 
						new MySqlResults("Failed Create UserExercise", 
										 null, 
										 "Failed to create UserExercise. " + 
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
			const storedProcedureToRun = "updateUserExerciseInformation";
			const keywordParameters = [
				formData.userExerciseId, formData.ueiDescription, 
				formData.ueiSets, formData.ueiReps, formData.ueiWeight,
				formData.ueiDuration, formData.ueiDistance, 
				formData.ueiResistance
			];

			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
				.then(function (result)
				{
					let results = 
						new MySqlResults("Successful Update UserExerciseInformation", 
										 "Updated UserExerciseInformation", 
										 null);
					resolve(results);
				})
				.catch(function (err)
				{
					let results = 
						new MySqlResults("Failed Create UserExerciseInformation", 
										 null, 
										 "Failed to update UserExerciseInformation. " + 
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
			const storedProcedureToRun = "deleteUserExercise";
			const keywordParameters = [formData.userExerciseId];

			mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
				.then(function (result)
				{
					let results = 
						new MySqlResults("Successful Delete UserExerciseInformation", 
										 "Deleted UserExerciseInformation", 
										 null);
					resolve(results);
				})
				.catch(function (err)
				{
					let results = 
						new MySqlResults("Failed Delete UserExerciseInformation", 
										 null, 
										 "Failed to delete UserExerciseInformation. " + 
										 "Please try again.");
					reject(results);
				});
		});
	}
}



module.exports = (function()
{
    return UserExerciseController;
})();
