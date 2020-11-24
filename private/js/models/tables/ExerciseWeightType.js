class ExerciseWeightType
{
    constructor(id, name)
    {
        this._id = id;
        this._name = name;
    }

    get id()
    {
        return this._id;
    }

    get name()
    {
        return this._name;
    }
}





module.exports = (function()
{
    return ExerciseWeightType;
})();
