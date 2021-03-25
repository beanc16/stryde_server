module.exports = (function()
{
    'use strict';



    /************
     * REQUIRES *
     ************/

    // Routing
    const express = require("express");
    const app = express();


    // Access req.body in post requests (USED FOR FORMS)
    const bodyParser = require("body-parser");
    app.use(bodyParser.json());                         // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
	
	
	// Encryption
	const bcrypt = require("bcrypt");
	const saltRounds = parseInt(process.env.BCRYPT_SALT);


	// MySQL
	const connection = require("./mysql_connection");
	let MySqlResults = require("./mysql_results");


    // Custom modules && variables
    const mysqlHelpers = require('../custom_modules/mysql_helpers');
    const bcryptHelpers = require('../custom_modules/bcrypt_helpers');





    /************************
     * LOGIN / REGISTRATION *
     ************************/
	 
	// Login
	app.post("/login", function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;
		
		UserController.login(req, formData)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
			});
	});
	
    
	// Register
    app.post("/register", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;
		
		UserController.register(req, formData)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
			});
	});
	
	
	
	/************
     * WORKOUTS *
     ************/
	
	// Create workout
    app.post("/user/create/workout", async function(req, res)
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
				res.send(results);
			})
			.catch(function (err)
			{
				let results = 
					new MySqlResults("Failed Create Workout", 
									 null, 
									 "Failed to create workout. " + 
									 "Please try again.");
				res.send(results);
			});
	});
	
	// Update workout
    app.post("/user/update/workout", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;

		const storedProcedureToRun = "updateWorkout";
		const keywordParameters = [formData.workoutId, formData.workoutName, formData.workoutDescription];
		const errorMessage = "Failed to update workout. Please try again.";

		mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				let results = 
					new MySqlResults("Successful Update Workout", 
									 "Updated workout", 
									 null);
				res.send(results);
			})
			.catch(function (err)
			{
				let results = 
					new MySqlResults("Failed Create Workout", 
									 null, 
									 "Failed to update workout. " + 
									 "Please try again.");
				res.send(results);
			});
	});
	
	// Delete workout
    app.post("/user/delete/workout", async function(req, res)
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
				res.send(results);
			})
			.catch(function (err)
			{
				let results = 
					new MySqlResults("Failed Delete Workout", 
									 null, 
									 "Failed to delete workout. " + 
									 "Please try again.");
				res.send(results);
			});
	});
	
	
	
	/*************
     * SUPERSETS *
     *************/
	 
	// Create superset
    app.post("/user/create/superset", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;

		const storedProcedureToRun = "createSuperset";
		const keywordParameters = [formData.userId, formData.supersetName];

		mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				let results = 
					new MySqlResults("Successful Create Superset", 
									 "Created superset: " + 
										formData.supersetName, 
									 null);
				res.send(results);
			})
			.catch(function (err)
			{
				let results = 
					new MySqlResults("Failed Create Superset", 
									 null, 
									 "Failed to create superset. " + 
									 "Please try again.");
				res.send(results);
			});
	});
	 
	// Update superset
    app.post("/user/update/superset", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;

		const storedProcedureToRun = "updateSuperset";
		const keywordParameters = [formData.supersetId, formData.supersetName];

		mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				let results = 
					new MySqlResults("Successful Update Superset", 
									 "Updated superset: " + 
										formData.supersetName, 
									 null);
				res.send(results);
			})
			.catch(function (err)
			{
				let results = 
					new MySqlResults("Failed Update Superset", 
									 null, 
									 "Failed to update superset. " + 
									 "Please try again.");
				res.send(results);
			});
	});
	
	// Delete superset
    app.post("/user/delete/superset", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;

		const storedProcedureToRun = "deleteSuperset";
		const keywordParameters = [formData.supersetId];

		mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				let results = 
					new MySqlResults("Successful Delete Superset", 
									 "Deleted superset", 
									 null);
				res.send(results);
			})
			.catch(function (err)
			{
				let results = 
					new MySqlResults("Failed Delete Superset", 
									 null, 
									 "Failed to delete superset. " + 
									 "Please try again.");
				res.send(results);
			});
	});
	
	
	
	/*************
     * EXERCISES *
     *************/
	
	//
	
	
	
	/******************
     * USER EXERCISES *
     ******************/
	
	// Create user exercise
    app.post("/user/create/userExercise", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;

		const storedProcedureToRun = "createUserExercise";
		const keywordParameters = [formData.userId, formData.exerciseId, formData.description,
								   formData.sets, formData.reps, formData.weight, 
								   formData.duration, formData.distance, formData.resistance];

		mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				let results = 
					new MySqlResults("Successful Create User Exercise", 
									 "Created user exercise", 
									 null);
				res.send(results);
			})
			.catch(function (err)
			{
				let results = 
					new MySqlResults("Failed Create User Exercise", 
									 null, 
									 "Failed to create user exercise. " + 
									 "Please try again.");
				res.send(results);
			});
	});
	
	// Update user exercise
    app.post("/user/update/userExerciseInformation", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;

		const storedProcedureToRun = "updateUserExerciseInformation";
		const keywordParameters = [formData.userExerciseId, formData.description, 
								   formData.sets, formData.reps, formData.weight,
								   formData.duration, formData.distance, 
								   formData.resistance];

		mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				let results = 
					new MySqlResults("Successful Update User Exercise", 
									 "Updated user exercise", 
									 null);
				res.send(results);
			})
			.catch(function (err)
			{
				let results = 
					new MySqlResults("Failed Update User Exercise", 
									 null, 
									 "Failed to update user exercise. " + 
									 "Please try again.");
				res.send(results);
			});
	});
	
	// Delete user exercise
    app.post("/user/delete/userExercise", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;

		const storedProcedureToRun = "deleteUserExercise";
		const keywordParameters = [formData.userExerciseId];

		mysqlHelpers.storedProcedureWithParamsAsync(connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				let results = 
					new MySqlResults("Successful Delete User Exercise", 
									 "Deleted user exercise", 
									 null);
				res.send(results);
			})
			.catch(function (err)
			{
				let results = 
					new MySqlResults("Failed Delete User Exercise", 
									 null, 
									 "Failed to delete user exercise. " + 
									 "Please try again.");
				res.send(results);
			});
	});
	
	
	
	
	
    /**********
     * RETURN *
     **********/

    return app;
})();