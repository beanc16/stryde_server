let User = require("../tables/User");
let ExperienceLevel = require("../tables/ExperienceLevel");


class UserExperience
{
    constructor(userExperience)
    {
        this._user = new User(userExperience["user_id"], 
							  userExperience["user_username"], 
							  userExperience["user_password"], 
							  userExperience["user_goal"], 
							  null);
        this._experienceLevel = new ExperienceLevel(null, userExperience["experience_name"]);
		
		this.initializePublicVariables();
    }
	
	initializePublicVariables()
	{
		this.id = this._user.id;
		this.username = this._user.username;
		this.password = this._user.password;
		this.goal = this._user.goal;
		this.experienceName = this._experienceLevel.name;
	}
}





module.exports = (function()
{
    return UserExperience;
})();
