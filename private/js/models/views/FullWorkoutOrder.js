let AllSupersetInWorkout = require("./AllSupersetInWorkout");
let AllUserExerciseInWorkout = require("./AllUserExerciseInWorkout");


class FullWorkoutOrder
{
    constructor(userExerciseId, userId, exerciseId, ueiDescription,
                ueiSets, ueiReps, ueiWeight, ueiDuration, ueiDistance,
                ueiResistance, exerciseName, exerciseDescription,
                exerciseWeightTypeName, exerciseMuscleTypeName,
                exerciseMovementTypeName, mgName, mgTypeName,
                workoutId, workoutName, workoutDescription,
                orderInWorkout, supersetId, supersetName)
    {
        this._allUserExerciseInWorkout = new AllUserExerciseInWorkout(
            userExerciseId, userId, exerciseId, ueiDescription,
            ueiSets, ueiReps, ueiWeight, ueiDuration, ueiDistance,
            ueiResistance, exerciseName, exerciseDescription,
            exerciseWeightTypeName, exerciseMuscleTypeName,
            exerciseMovementTypeName, mgName, mgTypeName,
            workoutId, workoutName, workoutDescription, orderInWorkout
        );
        this._allSupersetInWorkout = new AllSupersetInWorkout(
            userId, supersetId, supersetName, orderInWorkout,
            workoutId, workoutName, workoutDescription
        );
    }

    get userExerciseId()
    {
        return this._allUserExerciseInWorkout.userExerciseId;
    }

    get userId()
    {
        return this._allUserExerciseInWorkout.userId;
    }

    get exerciseId()
    {
        return this._allUserExerciseInWorkout.exerciseId;
    }

    get ueiDescription()
    {
        return this._allUserExerciseInWorkout.ueiDescription;
    }

    get ueiSets()
    {
        return this._allUserExerciseInWorkout.ueiSets;
    }

    get ueiReps()
    {
        return this._allUserExerciseInWorkout.ueiReps;
    }

    get ueiWeight()
    {
        return this._allUserExerciseInWorkout.ueiWeight;
    }

    get ueiDuration()
    {
        return this._allUserExerciseInWorkout.ueiDuration;
    }

    get ueiDistance()
    {
        return this._allUserExerciseInWorkout.ueiDistance;
    }

    get ueiResistance()
    {
        return this._allUserExerciseInWorkout.ueiResistance;
    }

    get exerciseName()
    {
        return this._allUserExerciseInWorkout.exerciseName;
    }

    get exerciseDescription()
    {
        return this._allUserExerciseInWorkout.exerciseDescription;
    }

    get exerciseMuscleTypeName()
    {
        return this._allUserExerciseInWorkout.exerciseMuscleTypeName;
    }

    get exerciseWeightTypeName()
    {
        return this._allUserExerciseInWorkout.exerciseWeightTypeName;
    }

    get exerciseMovementTypeName()
    {
        return this._allUserExerciseInWorkout.exerciseMovementTypeName;
    }

    get mgName()
    {
        return this._allUserExerciseInWorkout.mgName;
    }

    get mgTypeName()
    {
        return this._allUserExerciseInWorkout.mgTypeName;
    }

    get supersetId()
    {
        return this._allSupersetInWorkout.supersetId;
    }

    get supersetName()
    {
        return this._allSupersetInWorkout.supersetName;
    }

    get workoutId()
    {
        return this._allSupersetInWorkout.workoutId;
    }

    get workoutName()
    {
        return this._allSupersetInWorkout.workoutName;
    }

    get workoutDescription()
    {
        return this._allSupersetInWorkout.workoutDescription;
    }

    get orderInWorkout()
    {
        return this._allSupersetInWorkout.orderInWorkout;
    }
}





module.exports = (function()
{
    return FullWorkoutOrder;
})();
