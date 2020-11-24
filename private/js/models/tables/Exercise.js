class Exercise
{
    constructor(id, name, description, weightTypeId, muscleTypeId, movementTypeId)
    {
        this._id = id;
        this._name = name;
        this._description = description;
        this._weightTypeId = weightTypeId;
        this._muscleTypeId = muscleTypeId;
        this._movementTypeId = movementTypeId;
    }

    get id()
    {
        return this._id;
    }

    get name()
    {
        return this._name;
    }

    get description()
    {
        return this._description;
    }

    get weightTypeId()
    {
        return this._weightTypeId;
    }

    get muscleTypeId()
    {
        return this._muscleTypeId;
    }

    get movementTypeId()
    {
        return this._movementTypeId;
    }
}





module.exports = (function()
{
    return Exercise;
})();
