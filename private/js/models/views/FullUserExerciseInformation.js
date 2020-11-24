let UserExercise = require("../tables/UserExercise");
let UserExerciseInformation = require("../tables/" +
                                      "UserExerciseInformation");


class FullUserExerciseInformation
{
    constructor(userExerciseId, userId, exerciseId, ueiDescription,
                ueiSets, ueiReps, ueiWeight, ueiDuration, ueiDistance,
                ueiResistance)
    {
        this._userExercise = new UserExercise(userExerciseId, userId,
                                              exerciseId);
        this._userExerciseInformation = new UserExerciseInformation(
                userExerciseId, ueiDescription, ueiSets, ueiReps,
                ueiWeight, ueiDuration, ueiDistance, ueiResistance);
    }

    get userExerciseId()
    {
        return this._userExercise.userExerciseId;
    }

    get userId()
    {
        return this._userExercise.userId;
    }

    get exerciseId()
    {
        return this._userExercise.exerciseId;
    }

    get ueiDescription()
    {
        return this._userExerciseInformation.description;
    }

    get ueiSets()
    {
        return this._userExerciseInformation.sets;
    }

    get ueiReps()
    {
        return this._userExerciseInformation.reps;
    }

    get ueiWeight()
    {
        return this._userExerciseInformation.weight;
    }

    get ueiDuration()
    {
        return this._userExerciseInformation.duration;
    }

    get ueiDistance()
    {
        return this._userExerciseInformation.distance;
    }

    get ueiResistance()
    {
        return this._userExerciseInformation.resistance;
    }
}





module.exports = (function()
{
    return FullUserExerciseInformation;
})();
