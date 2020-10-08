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
	const saltRounds = process.env.BCRYPT_SALT;


	// MySQL
	const connection = require("./mysql_connection");


    // Custom modules && variables
    const mysqlHelpers = require('../custom_modules/mysql_helpers');
    const bcryptHelpers = require('../custom_modules/bcrypt_helpers');





    /*********
     * POSTS *
     *********/
	 
	// Login
	app.post("/login", function(req, res)
	{
		// FOR req.body, MUST DO require(body-parser); AT TOP OF PAGE
		const formData = req.body;

		const storedProcedureToRun = "getUserByUsername";
		const keywordParameters = [formData.username];
		const successRoute = "/home";

		mysqlHelpers.storedProcedureWithParamsAsync(res, connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				tryLogin(req, res, formData.password, result[0])
					.then(
						(user) => onSuccessfulLogin(req, res, user)
					)
					.catch(
						(err) => onFailedLogin(res, err)
					);
			})
			.catch(function (err)
			{
				//res.render("loggedOut/login", {error: "An unknown error occurred while logging in."});
				console.log("An unknown error occurred while logging in.");
			});
		}
	});

	async function tryLogin(req, res, formPassword, user)
	{
		return new Promise(async function (resolve, reject)
		{
			try
			{
				// Username not found
				if (user.length <= 0)
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
	
	function onSuccessfulLogin(req, res, successRoute)
	{
		//req.session.user = result;
		res.redirect(successRoute);
	}
	
	function onFailedLogin(res, err)
	{
		if (err.includes("Invalid username"))
		{
			//res.render("loggedOut/login", {error: "Invalid username."});
		}
		
		else if (err.includes("Invalid password"))
		{
			//res.render("loggedOut/login", {error: "Invalid password."});
		}
		
		else
		{
			//res.render("loggedOut/login", {error: "User does not exist."});
		}
		
		//DELETE AFTER RES.RENDERS ARE DONE
		console.log(err);
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
		const errorMessage = "Failed to register user. A user with that username may already exist.";

		mysqlHelpers.storedProcedureWithParamsAsync(res, connection, storedProcedureToRun, keywordParameters)
			.then(function (result)
			{
				//res.redirect("/login");
				console.log("Registered successfully");
			})
			.catch(function (err)
			{
				//res.render("loggedOut/register", {error: errorMessage});
				console.log(errorMessage);
			});
		}
	});
	
	
	
	
	
    /**********
     * RETURN *
     **********/

    return app;
})();