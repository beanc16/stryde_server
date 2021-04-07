let AllUserExerciseInformation = require("./" +
                                        "AllUserExerciseInformation");
let Superset = require("../tables/Superset");
let Workout = require("../tables/Workout");


class AllSupersetInWorkout
{
    constructor(userId, supersetId, supersetName, orderInWorkout,
                workoutId, workoutName, workoutDescription)
    {
        this._allUserExerciseInformation =
            new AllUserExerciseInformation(null, userId, null, null,
                                           null, null, null, null,
                                           null, null, null, null,
                                           null, null, null, null,
                                           null);
        this._superset = new Superset(supersetId, userId, supersetName);
        this._workout = new Workout({
			"workout_id": workoutId, 
			"user_id": userId, 
			"workout_name": workoutName, 
			"workout_description": workoutDescription,
		});
        this._orderInWorkout = orderInWorkout;
    }

    get userId()
    {
        return this._allUserExerciseInformation.userId;
    }

    get supersetId()
    {
        return this._superset.supersetId;
    }

    get supersetName()
    {
        return this._superset.name;
    }

    get workoutId()
    {
        return this._workout.workoutId;
    }

    get workoutName()
    {
        return this._workout.name;
    }

    get workoutDescription()
    {
        return this._workout.description;
    }

    get orderInWorkout()
    {
        return this._orderInWorkout;
    }
}





module.exports = (function()
{
    return AllSupersetInWorkout;
})();
