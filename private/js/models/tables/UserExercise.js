class UserExercise
{
    constructor(userExerciseId, userId, exerciseId)
    {
        this._userExerciseId = userExerciseId;
        this._userId = userId;
        this._exerciseId = exerciseId;
    }

    get userExerciseId()
    {
        return this._userExerciseId;
    }

    get userId()
    {
        return this._userId;
    }

    get exerciseId()
    {
        return this._exerciseId;
    }
}





module.exports = (function()
{
    return UserExercise;
})();
