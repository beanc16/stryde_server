let MuscleGroup = require("../tables/MuscleGroup");
let MuscleGroupType = require("../tables/MuscleGroupType");


class MuscleGroupWithType
{
    constructor(mgId, mgName, mgTypeName)
    {
        this._muscleGroup = new MuscleGroup(mgId, mgName, null);
        this._muscleGroupType = new MuscleGroupType(null, mgTypeName);
    }

    get mgId()
    {
        return this._muscleGroup.mgId;
    }

    get mgName()
    {
        return this._muscleGroup.name;
    }

    get mgTypeName()
    {
        return this._muscleGroupType.name;
    }
}





module.exports = (function()
{
    return MuscleGroupWithType;
})();
