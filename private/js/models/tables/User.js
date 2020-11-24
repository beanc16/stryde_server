class User
{
    constructor(id, username, password, goal, experienceId)
    {
        this._id = id;
        this._username = username;
        this._password = password;
        this._goal = goal;
		this._experienceId = experienceId;
    }

    // ID
    get id()
    {
        return this._id;
    }


    // Username
    get username()
    {
        return this._username;
    }


    // Password
    get password()
    {
        return this._password;
    }


    // Goal
    get goal()
    {
        return this._goal;
    }


    // Experience
    get experienceId()
    {
        return this._experienceId;
    }
}





module.exports = (function()
{
    return User;
})();
