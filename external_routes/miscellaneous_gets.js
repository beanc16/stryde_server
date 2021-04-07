module.exports = (function()
{
    'use strict';



    /************
     * REQUIRES *
     ************/

    // Routing
    const express = require("express");
    const app = express();


    // Custom variable
	const urlsEnum = require("../private/js/enums/UrlsEnum");
	const deviceDetectorEnum = require("../private/js/enums/DeviceDetectorEnum");





    /********
     * GETS *
     ********/
	
	/*
	// All downloads
	app.get("/download", function (req, res)
    {
		if (deviceDetectorEnum.isDesktop)
		{
			res.redirect("/download/website");
		}
		
		else if (deviceDetectorEnum.isIOS)
		{
			res.redirect("/download/ios");
		}
		
		else if (deviceDetectorEnum.isAndroid)
		{
			res.redirect("/download/android");
		}
		
		else
		{
			res.redirect("/download/website");
		}
    });
	*/
	
	
	// Website Redirect
	app.get("/download/website", function (req, res)
    {
		res.redirect(urlsEnum.website);
    });
	
	app.get("/download/stryde", function (req, res)
    {
		res.redirect("/download/website");
    });
	

    // Apple App Store Download
    app.get("/download/ios", function (req, res)
    {
		res.redirect(urlsEnum.ios);
    });
	
    app.get("/download/apple", function (req, res)
    {
		res.redirect("/download/ios");
    });
	
    app.get("/download/itunes", function (req, res)
    {
		res.redirect("/download/ios");
    });
	
	
	// Google Play Download
    app.get("/download/android", function (req, res)
    {
		res.redirect(urlsEnum.android);
    });
	
    app.get("/download/googlePlay", function (req, res)
    {
		res.redirect("/download/android");
    });
	
	
	
	
	
    /**********
     * RETURN *
     **********/

    return app;
})();