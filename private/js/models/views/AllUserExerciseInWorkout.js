let AllUserExerciseInformation = require("./" +
                                        "AllUserExerciseInformation");
let Workout = require("../tables/Workout");


class AllUserExerciseInWorkout
{
    constructor(userExerciseId, userId, exerciseId, ueiDescription,
                ueiSets, ueiReps, ueiWeight, ueiDuration, ueiDistance,
                ueiResistance, exerciseName, exerciseDescription,
                exerciseWeightTypeName, exerciseMuscleTypeName,
                exerciseMovementTypeName, mgName, mgTypeName,
                workoutId, workoutName, workoutDescription, orderInWorkout)
    {
        this._allUserExerciseInformation =
            new AllUserExerciseInformation(
                userExerciseId, userId, exerciseId, ueiDescription,
                ueiSets, ueiReps, ueiWeight, ueiDuration, ueiDistance,
                ueiResistance, exerciseName, exerciseDescription,
                exerciseWeightTypeName, exerciseMuscleTypeName,
                exerciseMovementTypeName, mgName, mgTypeName);
        this._workout = new Workout({
			"workout_id": workoutId, 
			"user_id": userId, 
			"workout_name": workoutName, 
			"workout_description": workoutDescription,
		});
        this._orderInWorkout = orderInWorkout;
    }

    get userExerciseId()
    {
        return this._allUserExerciseInformation.userExerciseId;
    }

    get userId()
    {
        return this._allUserExerciseInformation.userId;
    }

    get ueiDescription()
    {
        return this._allUserExerciseInformation.ueiDescription;
    }

    get ueiSets()
    {
        return this._allUserExerciseInformation.ueiSets;
    }

    get ueiReps()
    {
        return this._allUserExerciseInformation.ueiReps;
    }

    get ueiWeight()
    {
        return this._allUserExerciseInformation.ueiWeight;
    }

    get ueiDuration()
    {
        return this._allUserExerciseInformation.ueiDuration;
    }

    get ueiDistance()
    {
        return this._allUserExerciseInformation.ueiDistance;
    }

    get ueiResistance()
    {
        return this._allUserExerciseInformation.ueiResistance;
    }

    get exerciseId()
    {
        return this._allUserExerciseInformation.exerciseId;
    }

    get exerciseName()
    {
        return this._allUserExerciseInformation.exerciseName;
    }

    get exerciseDescription()
    {
        return this._allUserExerciseInformation.exerciseDescription;
    }

    get exerciseMuscleTypeName()
    {
        return this._allUserExerciseInformation.exerciseMuscleTypeName;
    }

    get exerciseWeightTypeName()
    {
        return this._allUserExerciseInformation.exerciseWeightTypeName;
    }

    get exerciseMovementTypeName()
    {
        return this._allUserExerciseInformation.exerciseMovementTypeName;
    }

    get mgName()
    {
        return this._allUserExerciseInformation.mgName;
    }

    get mgTypeName()
    {
        return this._allUserExerciseInformation.mgTypeName;
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
    return AllUserExerciseInWorkout;
})();
