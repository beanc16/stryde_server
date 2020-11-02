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


// Read environment variables
const dotenv = require('dotenv');
dotenv.config();


// Allow working with paths
const path = require("path");

// Set default directory for resources
const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));

// Set default directory for views
const viewsPath = path.join(__dirname, '/views');


// View Engine
app.set('view engine', 'pug');
app.set('views','./views');


// Express Sessions
/*
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);

let databaseOptions = {
    host: "localhost",
    port: port,
    user: "root",
    password: "dennisiscool",
    database: "a_really_dark_schema",
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};

let sessionStore = new mysqlStore(databaseOptions, connection);

app.use(session({
    key: "nWOD Final Project",
    secret: "Is Dennis really cool?",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}));
*/


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





/*******************
 * EXTERNAL ROUTES *
 *******************/

// Must come after Middleware for Middleware to work
const mysqlGets = require("./external_routes/mysql_gets");			// Get routes for MySQL
const mysqlPosts = require("./external_routes/mysql_posts");		// Post routes for MySQL
const publicViews = require("./external_routes/public_views");		// Public views
const privateViews = require("./external_routes/private_views");	// Private views

app.use("/", publicViews);
app.use("/", privateViews);
app.use("/", mysqlGets);
app.use("/", mysqlPosts);





/********
 * GETS *
 ********/

/*
 * Views - Logged Out
 */

// Index
/*
app.get("/", function(req, res)
{
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
});
*/

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
 * Views - Logged In
 */

// Home
// <viewHere



/*
 * Miscellaneous
 */

// Error Page: any get URL that isn't seen above
/*
app.get("*", function(req, res)
{
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
});
*/





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

app.listen(process.env.PORT, function ()
{
  console.log("App listening on port " + process.env.PORT);
});
