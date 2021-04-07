module.exports = (function()
{
    'use strict';



    /************
     * REQUIRES *
     ************/

    // Routing
    const express = require("express");
    const app = express();
	
	
	// MySQL
	const connection = require("./mysql_connection");
	let MySqlResults = require("./mysql_results");


    // Custom modules && variables
    const mysqlHelpers = require('../custom_modules/mysql_helpers');


    // Controllers
	const UserController = require("../private/js/controllers/UserController");
	const WorkoutController = require("../private/js/controllers/WorkoutController");
	const SupersetController = require("../private/js/controllers/SupersetController");
	const ExerciseController = require("../private/js/controllers/ExerciseController");





    /********
     * GETS *
     ********/

    // getUserById
    app.get("/user/id/:userId", async function (req, res)
    {
		UserController.getById(req)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
			});
    });

    // getUserByUsername
    app.get("/user/username/:username", async function (req, res)
    {
		UserController.getByUsername(req)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
			});
    });
	
	
	
	// getAllWorkoutsByUserId
    app.get("/user/workouts/:userId", async function (req, res)
    {
		WorkoutController.getNonEmptyByUserId(req)
			.then(function (mySqlResults)
			{
				WorkoutController.getEmptyByUserId(req)
					.then(function (mySqlResults2)
					{
						res.send(new MySqlResults(
							"Successfully obtained all workouts",
							{
								"nonEmptyWorkoutResults": mySqlResults,
								"emptyWorkoutResults": mySqlResults2,
							}, null
						));
					})
					.catch(function (mySqlResultsErr2)
					{
						res.send(mySqlResultsErr2);
					});
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
			});
    });
	
	// getAllSupersetsByUserId
    app.get("/user/supersets/:userId", async function (req, res)
    {
		SupersetController.getByUserId(req)
			.then(function (mySqlResults)
			{
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				res.send(mySqlResultsErr);
			});
    });
	
	// getAllExercises
    app.get("/user/exercises", async function (req, res)
    {
		ExerciseController.getAll()
			.then(function (mySqlResults)
			{
				console.log(mySqlResults["_results"]);
				res.send(mySqlResults);
			})
			.catch(function (mySqlResultsErr)
			{
				console.log(mySqlResultsErr);
				res.send(mySqlResultsErr);
			});
    });
	
	
	
	
	
    /**********
     * RETURN *
     **********/

    return app;
})();