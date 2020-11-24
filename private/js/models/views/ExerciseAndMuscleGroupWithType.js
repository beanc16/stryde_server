let ExerciseWithType = require("./ExerciseWithType");
let MuscleGroupWithType = require("./MuscleGroupWithType");


class ExerciseWithType
{
    constructor(exerciseId, exerciseName, exerciseDescription,
                exerciseWeightTypeName, exerciseMuscleTypeName,
                exerciseMovementTypeName, mgName, mgTypeName)
    {
        this._exerciseWithType = new ExerciseWithType(
            exerciseId, exerciseName, exerciseDescription,
            exerciseWeightTypeName, exerciseMuscleTypeName,
            exerciseMovementTypeName);
        this._muscleGroupWithType = new MuscleGroupWithType(
            null, mgName, mgTypeName);
    }

    get exerciseId()
    {
        return this._exerciseWithType.exerciseId;
    }

    get exerciseName()
    {
        return this._exerciseWithType.exerciseName;
    }

    get exerciseDescription()
    {
        return this._exerciseWithType.exerciseDescription;
    }

    get exerciseMuscleTypeName()
    {
        return this._exerciseWithType.exerciseMuscleTypeName;
    }

    get exerciseWeightTypeName()
    {
        return this._exerciseWithType.exerciseWeightTypeName;
    }

    get exerciseMovementTypeName()
    {
        return this._exerciseWithType.exerciseMovementTypeName;
    }

    get mgName()
    {
        return this._muscleGroupWithType.mgName;
    }

    get mgTypeName()
    {
        return this._muscleGroupWithType.mgTypeName;
    }
}





module.exports = (function()
{
    return ExerciseWithType;
})();
