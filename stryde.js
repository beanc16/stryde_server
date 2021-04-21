/************
 * REQUIRES *
 ************/

// HTTPs
const https = require("https");
const fs = require("fs");

const options = {
	key: fs.readFileSync("../../../../etc/letsencrypt/live/stryde.app/privkey.pem"),
	cert: fs.readFileSync("../../../../etc/letsencrypt/live/stryde.app/fullchain.pem")
};


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
 * Error Pages
 */

app.get("*", function(req, res)
{
  res.send("Invalid URL.");
});

app.post("*", function(req, res)
{
  res.send("Invalid URL.");
});





/********
 * PORT *
 ********/

// Http Server
/*
app.listen(process.env.STRYDE_PORT, function ()
{
  console.log("App listening on port " + process.env.STRYDE_PORT);
});
*/

// Https Server
const httpsServer = https.createServer(options, app);

httpsServer.listen(process.env.STRYDE_PORT, () => 
{
	console.log("Https App listening on port " + process.env.STRYDE_PORT);
});
