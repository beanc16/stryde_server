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





    /********
     * GETS *
     ********/

    // Login
	app.get("/login", function(req, res)
	{
		res.render("loggedOut/login", {
			title: "Login",
			error: null
		});
	});

	// Register
	app.get("/register", function(req, res)
	{
		res.render("loggedOut/register", {
			title: "Register",
			error: null
		});
	});
	
	// Error
	app.get("/error/:title/:errorMsg", function(req, res)
	{
		const formData = req.params;
		
		res.render("error", {
			title: "Error - " + formData.title,
			error: formData.errorMsg,
			user: null
		});
	});
	
	// COLOR BLIND TEST (DELETE LATER)
	app.get("/colorBlind", function(req, res)
	{
		res.render("colorBlind", {
			title: "Color Blind Test"
		});
	});
	
	
	
	
	
    /**********
     * RETURN *
     **********/

    return app;
})();