let Exercise = require("../tables/Exercise");
let ExerciseMuscleType = require("../tables/ExerciseMuscleType");
let ExerciseWeightType = require("../tables/ExerciseWeightType");
let ExerciseMovementType = require("../tables/ExerciseMovementType");


class ExerciseWithType
{
    constructor(exerciseId, exerciseName, exerciseDescription,
                exerciseWeightTypeName, exerciseMuscleTypeName,
                exerciseMovementTypeName)
    {
        this._exercise = new Exercise(exerciseId, exerciseName,
                                      exerciseDescription, null, null,
                                      null);
        this._exerciseMuscleType = new ExerciseMuscleType(null,
                                            exerciseMuscleTypeName);
        this._exerciseWeightType = new ExerciseWeightType(null,
                                            exerciseWeightTypeName);
        this._exerciseMovementType = new ExerciseMovementType(null,
                                            exerciseMovementTypeName);
    }

    get exerciseId()
    {
        return this._exercise.id;
    }

    get exerciseName()
    {
        return this._exercise.name;
    }

    get exerciseDescription()
    {
        return this._exercise.description;
    }

    get exerciseMuscleTypeName()
    {
        return this._exerciseMuscleType.name;
    }

    get exerciseWeightTypeName()
    {
        return this._exerciseWeightType.name;
    }

    get exerciseMovementTypeName()
    {
        return this._exerciseMovementType.name;
    }
}





module.exports = (function()
{
    return ExerciseWithType;
})();
