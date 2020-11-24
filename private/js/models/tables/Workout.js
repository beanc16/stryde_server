class Workout
{
    constructor(workoutId, userId, name, description)
    {
        this._workoutId = workoutId;
        this._userId = userId;
        this._name = name;
        this._description = description;
    }

    get workoutId()
    {
        return this._workoutId;
    }

    get userId()
    {
        return this._userId;
    }

    get name()
    {
        return this._name;
    }

    get description()
    {
        return this._description;
    }
}





module.exports = (function()
{
    return Workout;
})();
