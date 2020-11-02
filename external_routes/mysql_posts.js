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

		const storedProcedureToRun = "getUserByUsername";
		const keywordParameters = [formData.username];
		const successRoute = "/user/home";

		mysqlHelpers.storedProcedureWithParamsAsync(res, connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				tryLogin(req, res, formData.password, result[0][0])
					.then(
						(user) => onSuccessfulLogin(req, res, user, successRoute)
					)
					.catch(
						(err) => onFailedLogin(res, err)
					);
			})
			.catch(function (err)
			{
				res.render("loggedOut/login", {
					title: "Login",
					error: "An unknown error occurred while logging in."
				});
			});
	});

	async function tryLogin(req, res, formPassword, user)
	{
		return new Promise(async function (resolve, reject)
		{
			try
			{
				// Username not found
				if (user["user_username"] == null)
				{
					reject("Invalid username.");
				}

				bcryptHelpers.encryptedPasswordMatches(bcrypt, formPassword, user.user_password)
					.then(function (doesPasswordMatch)
					{
						if (doesPasswordMatch)
						{
							resolve(user);
						}

						else
						{
							reject("Invalid password.");
						}
					})
					.catch(function (err)
					{
						reject(err);
					});
			}

			catch (err)
			{
				reject(err);
			}
		});
	}
	
	function onSuccessfulLogin(req, res, user, successRoute)
	{
		//req.session.user = result;
		res.redirect(successRoute);
	}
	
	function onFailedLogin(res, err)
	{
		try
		{
			if (err.includes("Invalid username"))
			{
				res.render("loggedOut/login", {
					title: "Login",
					error: "Invalid username."
				});
			}
			
			else if (err.includes("Invalid password"))
			{
				res.render("loggedOut/login", {
					title: "Login",
					error: "Invalid password."
				});
			}
			
			else
			{
				res.render("loggedOut/login", {
					title: "Login",
					error: "User does not exist."
				});
			}
		}
		
		catch (err2)
		{
			res.render("loggedOut/login", {
				title: "Login",
				error: "An unknown error occurred while logging in."
			});
			console.log(err);
		}
	}

    
	// Register
    app.post("/register", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;

		const encryptedPassword = await bcryptHelpers.encryptPassword(
			bcrypt, formData.password, saltRounds
		);

		const storedProcedureToRun = "registerUser";
		const keywordParameters = [formData.username, encryptedPassword];
		const errorMessage = "Failed to register. A user with that username may already exist.";

		mysqlHelpers.storedProcedureWithParamsAsync(res, connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				res.redirect("/user/home");
			})
			.catch(function (err)
			{
				res.render("loggedOut/register", {
					title: "Register",
					error: errorMessage
				});
			});
	});
	
	
	/************
     * WORKOUTS *
     ************/
	
	// Create workout
    app.post("/user/createWorkout", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;

		const storedProcedureToRun = "createWorkout";
		const keywordParameters = [formData.userId, formData.workoutName, formData.workoutDescription];
		const errorMessage = "Failed to create workout. Please try again.";

		mysqlHelpers.storedProcedureWithParamsAsync(res, connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				//res.redirect("/user/home");
				res.send("Created workout: " + formdata.workoutName);
			})
			.catch(function (err)
			{
				/*
				res.render("loggedOut/register", {
					title: "Register",
					error: errorMessage
				});
				*/
				res.send(err);
			});
	});
	
	// Update workout
    app.post("/user/updateWorkout", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;

		const storedProcedureToRun = "updateWorkout";
		const keywordParameters = [formData.workoutId, formData.workoutName, formData.workoutDescription];
		const errorMessage = "Failed to update workout. Please try again.";

		mysqlHelpers.storedProcedureWithParamsAsync(res, connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				//res.redirect("/user/home");
				res.send("Updated workout: " + formdata.workoutName);
			})
			.catch(function (err)
			{
				/*
				res.render("loggedOut/register", {
					title: "Register",
					error: errorMessage
				});
				*/
				res.send(err);
			});
	});
	
		
	
	/*************
     * SUPERSETS *
     *************/
	 
	// Create superset
    app.post("/user/createSuperset", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;

		const storedProcedureToRun = "createSuperset";
		const keywordParameters = [formData.userId, formData.supersetName];
		const errorMessage = "Failed to create superset. Please try again.";

		mysqlHelpers.storedProcedureWithParamsAsync(res, connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				//res.redirect("/user/home");
				res.send("Created superset: " + formdata.supersetName);
			})
			.catch(function (err)
			{
				/*
				res.render("loggedOut/register", {
					title: "Register",
					error: errorMessage
				});
				*/
				res.send(err);
			});
	});
	 
	// Update superset
    app.post("/user/updateSuperset", async function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;

		const storedProcedureToRun = "updateSuperset";
		const keywordParameters = [formData.supersetId, formData.supersetName];
		const errorMessage = "Failed to update superset. Please try again.";

		mysqlHelpers.storedProcedureWithParamsAsync(res, connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				//res.redirect("/user/home");
				res.send("Updated superset: " + formdata.supersetName);
			})
			.catch(function (err)
			{
				/*
				res.render("loggedOut/register", {
					title: "Register",
					error: errorMessage
				});
				*/
				res.send(err);
			});
	});
	
	
	
	
	
    /**********
     * RETURN *
     **********/

    return app;
})();