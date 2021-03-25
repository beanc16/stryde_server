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
	
	
	// MySQL
	const connection = require("./mysql_connection");
	let MySqlResults = require("./mysql_results");


    // Custom modules && variables
    const mysqlHelpers = require('../custom_modules/mysql_helpers');


    // Controllers
	const UserController = require("../private/js/controllers/UserController");





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
	
	
	
	
	
    /**********
     * RETURN *
     **********/

    return app;
})();