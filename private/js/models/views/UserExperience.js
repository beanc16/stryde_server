let User = require("../tables/User");
let ExperienceLevel = require("../tables/ExperienceLevel");


class UserExperience
{
    constructor(id, username, password, goal, experienceName)
    {
        this._user = new User(id, username, password, goal, null);
        this._experienceLevel = new ExperienceLevel(null, experienceName);
    }

    // ID
    get id()
    {
        return this._user.id;
    }


    // Username
    get username()
    {
        return this._user.username;
    }


    // Password
    get password()
    {
        return this._user.password;
    }


    // Goal
    get goal()
    {
        return this._user.goal;
    }


    // Experience Name
    get experienceName()
	{
		return this._experienceLevel.name;
	}
}





module.exports = (function()
{
    return UserExperience;
})();
