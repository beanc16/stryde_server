class UserExerciseInformation
{
    constructor(userExerciseId, description, sets, reps, weight,
                duration, distance, resistance)
    {
        this._userExerciseId = userExerciseId;
        this._description = description;
        this._sets = sets;
        this._reps = reps;
        this._weight = weight;
        this._duration = duration;
        this._distance = distance;
        this._resistance = resistance;
    }

    get userExerciseId()
    {
        return this._userExerciseId;
    }

    get description()
    {
        return this._description;
    }

    get sets()
    {
        return this._sets;
    }

    get reps()
    {
        return this._reps;
    }

    get weight()
    {
        return this._weight;
    }

    get duration()
    {
        return this._duration;
    }

    get distance()
    {
        return this._distance;
    }

    get resistance()
    {
        return this._resistance;
    }
}





module.exports = (function()
{
    return UserExerciseInformation;
})();
