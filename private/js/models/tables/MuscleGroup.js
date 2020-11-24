class MuscleGroup
{
    constructor(mgId, name, mgTypeId)
    {
        this._mgId = mgId;
        this._name = name;
        this._mgTypeId = mgTypeId;
    }

    get mgId()
    {
        return this._mgId;
    }

    get name()
    {
        return this._name;
    }

    get mgTypeId()
    {
        return this._mgTypeId;
    }
}





module.exports = (function()
{
    return MuscleGroup;
})();
