let Workout = require("../tables/Workout");
let WorkoutLog = require("../tables/WorkoutLog");
let WorkoutLogTimestamp = require("../tables/WorkoutLogTimestamp");
let WorkoutStatus = require("../tables/WorkoutStatus");
let User = require("../tables/User");


class AllWorkoutLog
{
    constructor(workoutId, userId, workoutName, workoutDescription,
                workoutLogId, workoutStatusId, timestamp,
                workoutStatusName, userUsername)
    {
        this._workout = new Workout(workoutId, userId, workoutName, workoutDescription);
        this._workoutLog = new WorkoutLog(workoutLogId, workoutId, workoutStatusId, userId);
        this._workoutLogTimestamp = new WorkoutLogTimestamp(workoutLogId, timestamp);
        this._workoutStatus = new WorkoutStatus(workoutStatusId, workoutStatusName);
        this._user = new User(userId, userUsername, null, null, null);
    }



    get workoutId()
    {
        return this._workout.workoutId;
    }

    get workoutName()
    {
        return this._workout.name;
    }

    get workoutDescription()
    {
        return this._workout.description;
    }

    get workoutLogId()
    {
        return this._workoutLog.workoutLogId;
    }

    get workoutLogTimestamp()
    {
        return this._workoutLogTimestamp.timestamp;
    }

    get workoutStatusId()
    {
        return this._workoutStatus.id;
    }

    get workoutStatusName()
    {
        return this._workoutStatus.name;
    }

    get userId()
    {
        return this._user.id;
    }

    get userUsername()
    {
        return this._user.username;
    }
}





module.exports = (function()
{
    return AllWorkoutLog;
})();
