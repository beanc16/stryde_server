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


    // Custom modules && variables
    const mysqlHelpers = require('../custom_modules/mysql_helpers');





    /********
     * GETS *
     ********/

    // DELETE THIS LATER
    app.get("/allUsers", function (req, res)
    {
        const query = "select * from user";
		const errorMessage = "Failed to get all users";

		mysqlHelpers.queryNoParamsAsync(res, connection, query, errorMessage)
			.then(async function (result)
			{
				console.log(result);
				res.json(result);
			})
			.catch(function (err)
			{
				console.log(err);
				res.send(err);
			});
    });

    // getUserById
    app.get("/user/:userId", function (req, res)
    {
        const storedProcedureName = "getUserById";
		const keywordParameters = [ req.params["userId"] ];
		
		mysqlHelpers.storedProcedureWithParamsAsync(res, connection, storedProcedureName, keywordParameters)
			.then(async function (result)
			{
				console.log(result);
				res.json(result[0]);
			})
			.catch(function (err)
			{
				console.log(err);
				res.send(err);
			});
    });
	
	
	
	
	
    /**********
     * RETURN *
     **********/

    return app;
})();