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

    // Home
	app.get("/user/home", function(req, res)
	{
		res.render("loggedIn/home", {
			title: "Home",
			error: null,
			username: null
		});
	});
	
	
	
	
	
    /**********
     * RETURN *
     **********/

    return app;
})();