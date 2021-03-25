/************
 * REQUIRES *
 ************/

// Routing
const express = require("express");
const app = express();


// Enable CORS
const cors = require("cors");
app.use(cors());


// Access req.body in post requests (USED FOR FORMS)
const bodyParser = require("body-parser");
app.use(bodyParser.json());                         // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// Read environment variables
const dotenv = require('dotenv');
dotenv.config();


// Allow working with paths
const path = require("path");

// Set default directory for resources
const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));

// Set default directory for views
//const viewsPath = path.join(__dirname, '/views');


// View Engine
app.set('view engine', 'pug');
app.set('views','./views');


// Custom modules && variables
const mysqlHelpers = require("./custom_modules/mysql_helpers");
const bcryptHelpers = require("./custom_modules/bcrypt_helpers");





/**************
 * MIDDLEWARE *
 **************/

/*
app.use("/user", function(req, res, next)
{
    if (isUserLoggedIn(req))
    {
        next();
    }

    else
    {
        res.render("loggedOut/login", {error: "You must log in first"});
    }
});
*/

/* 
 * Add middleware app.get & app.post to authenticate the login 
 * information of any user that tries to make a get or post request
 */





/*******************
 * EXTERNAL ROUTES *
 *******************/

// Must come after Middleware for Middleware to work
const mysqlGets = require("./external_routes/mysql_gets");			// Get routes for MySQL
const mysqlPosts = require("./external_routes/mysql_posts");		// Post routes for MySQL

app.use("/", mysqlGets);
app.use("/", mysqlPosts);





/********
 * GETS *
 ********/

/*
 * Views - Logged Out
 */

// Index
app.get("/", function(req, res)
{
	/*
    // Not logged in
    if (!isUserLoggedIn(req))
    {
        res.redirect("/login");
    }

    // Logged in
    else
    {
        res.redirect("/user/home");
    }
	*/
	res.redirect("/ping");
});

// Ping
app.get("/ping", function(req, res)
{
    res.send("pong");
});

/*
// Logout
app.get("/logout", function(req, res)
{
    req.session.destroy();
    res.redirect("/");
});
*/



/*
 * Miscellaneous
 */

// Error Page: any get URL that isn't seen above
app.get("*", function(req, res)
{
	/*
  let user = null;

  if (isUserLoggedIn(req))
  {
    user = req.session.user;
  }

  res.render("error", {
    title: "Error - <titleHere",
    error: "The URL you entered is invalid."
    user: user
  });
  */
  
  res.send("The URL you entered is invalid.");
});





/***********
 * HELPERS *
 ***********/

/*
 * Getters
 */

function getSessionUser(req)
{
    return req.session.user;
}

function getRandomString(strLength)
{
    // Helpers
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    let index = null;

    for (let i = 0; i < strLength; i++)
    {
        index = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(index);
    }

    return result;
}

function getCombinedJsonObjects(json1, json2)
{
    return Object.assign({}, json1, json2);
}



/*
 * Boolean
 */

/*
function isUserLoggedIn(req)
{
    if (req.session.user != null)
    {
        return true;
    }

    return false;
}
*/





/********
 * PORT *
 ********/

app.listen(process.env.STRYDE_PORT, function ()
{
  console.log("App listening on port " + process.env.STRYDE_PORT);
});