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


    // Controllers
	const UserController = require("../private/js/controllers/UserController");
	const WorkoutController = require("../private/js/controllers/WorkoutController");
	const SupersetController = require("../private/js/controllers/SupersetController");
	const UserExerciseController = require("../private/js/controllers/UserExerciseController");





    /********
     * USER *
     ********/
	 
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
		
		UserController.register(formData)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
			});
	});
	
	// Update goal
    app.post("/user/update/goal", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;
		
		UserController.updateGoal(formData)
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
		
		WorkoutController.create(req, formData)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
			});
	});
	
	// Update workout
    app.post("/user/update/workout", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;
		
		WorkoutController.update(req, formData)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
			});
	});
	
	// Delete workout
    app.post("/user/delete/workout", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;
		
		WorkoutController.delete(req, formData)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
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
		
		SupersetController.create(req, formData)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
			});
	});
	 
	// Update superset
    app.post("/user/update/superset", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;
		
		SupersetController.update(req, formData)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
			});
	});
	
	// Delete superset
    app.post("/user/delete/superset", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;
		
		SupersetController.delete(req, formData)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
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
	/*
    app.post("/user/create/userExercise", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;
		
		UserExerciseController.create(req, formData)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
			});
	});
	
	// Update user exercise
    app.post("/user/update/userExercise", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;
		
		UserExerciseController.update(req, formData)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
			});
	});
	
	// Delete user exercise
    app.post("/user/delete/userExercise", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;
		
		UserExerciseController.delete(req, formData)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
			});
	});
	*/
	
	
	
	
	
    /**********
     * RETURN *
     **********/

    return app;
})();