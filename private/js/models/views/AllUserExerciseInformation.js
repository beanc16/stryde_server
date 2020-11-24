let FullUserExerciseInformation = require("./" +
                                        "FullUserExerciseInformation");
let ExerciseAndMuscleGroupWithType = require("./" +
                                     "ExerciseAndMuscleGroupWithType");


class AllUserExerciseInformation
{
    constructor(userExerciseId, userId, exerciseId, ueiDescription,
                ueiSets, ueiReps, ueiWeight, ueiDuration, ueiDistance,
                ueiResistance, exerciseName, exerciseDescription,
                exerciseWeightTypeName, exerciseMuscleTypeName,
                exerciseMovementTypeName, mgName, mgTypeName)
    {
        this._fullUserExerciseInformation = new FullUserExerciseInformation(
            userExerciseId, userId, exerciseId, ueiDescription,
            ueiSets, ueiReps, ueiWeight, ueiDuration, ueiDistance,
            ueiResistance);
        this._exerciseAndMuscleGroupWithType = new ExerciseAndMuscleGroupWithType(
            exerciseId, exerciseName, exerciseDescription,
            exerciseWeightTypeName, exerciseMuscleTypeName,
            exerciseMovementTypeName, mgName, mgTypeName);
    }

    get userExerciseId()
    {
        return this._fullUserExerciseInformation.userExerciseId;
    }

    get userId()
    {
        return this._fullUserExerciseInformation.userId;
    }

    get exerciseId()
    {
        return this._fullUserExerciseInformation.exerciseId;
    }

    get ueiDescription()
    {
        return this._fullUserExerciseInformation.description;
    }

    get ueiSets()
    {
        return this._fullUserExerciseInformation.sets;
    }

    get ueiReps()
    {
        return this._fullUserExerciseInformation.reps;
    }

    get ueiWeight()
    {
        return this._fullUserExerciseInformation.weight;
    }

    get ueiDuration()
    {
        return this._fullUserExerciseInformation.duration;
    }

    get ueiDistance()
    {
        return this._fullUserExerciseInformation.distance;
    }

    get ueiResistance()
    {
        return this._fullUserExerciseInformation.resistance;
    }

    get exerciseName()
    {
        return this._exerciseAndMuscleGroupWithType.exerciseName;
    }

    get exerciseDescription()
    {
        return this._exerciseAndMuscleGroupWithType.exerciseDescription;
    }

    get exerciseMuscleTypeName()
    {
        return this._exerciseAndMuscleGroupWithType.exerciseMuscleTypeName;
    }

    get exerciseWeightTypeName()
    {
        return this._exerciseAndMuscleGroupWithType.exerciseWeightTypeName;
    }

    get exerciseMovementTypeName()
    {
        return this._exerciseAndMuscleGroupWithType.exerciseMovementTypeName;
    }

    get mgName()
    {
        return this._exerciseAndMuscleGroupWithType.mgName;
    }

    get mgTypeName()
    {
        return this._exerciseAndMuscleGroupWithType.mgTypeName;
    }
}





module.exports = (function()
{
    return AllUserExerciseInformation;
})();
