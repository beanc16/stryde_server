class WorkoutLog
{
    constructor(workoutLogId, workoutId, workoutStatusId, userId)
    {
        this._workoutLogId = workoutLogId;
        this._workoutId = workoutId;
        this._workoutStatusId = workoutStatusId;
        this._userId = userId;
    }

    get workoutLogId()
    {
        return this._workoutLogId;
    }

    get workoutId()
    {
        return this._workoutId;
    }

    get workoutStatusId()
    {
        return this._workoutStatusId;
    }

    get userId()
    {
        return this._userId;
    }
}





module.exports = (function()
{
    return WorkoutLog;
})();
