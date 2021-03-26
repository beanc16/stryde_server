class Workout
{
    constructor(workout)
    {
        this._workoutId = workout["workout_id"];
        this._userId = workout["user_id"];
        this._name = workout["workout_name"];
        this._description = workout["workout_description"];
		
		this.initializePublicVariables();
    }
	
	initializePublicVariables()
	{
		this.workoutId = this._workoutId;
		this.userId = this._userId;
		this.name = this._name;
		this.description = this._description;
	}
}





module.exports = (function()
{
    return Workout;
})();
