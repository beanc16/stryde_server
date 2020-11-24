class MuscleGroupType
{
    constructor(mgTypeId, name)
    {
        this._mgTypeId = mgTypeId;
        this._name = name;
    }

    get mgTypeId()
    {
        return this._mgTypeId;
    }

    get name()
    {
        return this._name;
    }
}





module.exports = (function()
{
    return MuscleGroupType;
})();
