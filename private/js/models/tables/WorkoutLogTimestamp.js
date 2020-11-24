class WorkoutLogTimestamp
{
    constructor(workoutLogId, timestamp)
    {
        this._workoutLogId = workoutLogId;
        this._timestamp = timestamp;
    }

    get workoutLogId()
    {
        return this._workoutLogId;
    }

    get timestamp()
    {
        return this._timestamp;
    }
}





module.exports = (function()
{
    return WorkoutLogTimestamp;
})();
