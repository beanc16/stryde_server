class Superset
{
    constructor(supersetId, userId, name)
    {
        this._supersetId = supersetId;
        this._userId = userId;
        this._name = name;
    }

    get supersetId()
    {
        return this._supersetId;
    }

    get userId()
    {
        return this._userId;
    }

    get name()
    {
        return this._name;
    }
}





module.exports = (function()
{
    return Superset;
})();
