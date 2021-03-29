let ExerciseWithType = require("./ExerciseWithType");
let MuscleGroupWithType = require("./MuscleGroupWithType");


class ExerciseAndMuscleGroupWithType
{
    constructor(exerciseWithMgAndType)
    {
        this._exerciseWithType = new ExerciseWithType(
            exerciseWithMgAndType["exercise_id"], 
			exerciseWithMgAndType["exercise_name"], 
			exerciseWithMgAndType["exercise_description"],
            exerciseWithMgAndType["exercise_weight_type_name"], 
			exerciseWithMgAndType["exercise_muscle_type_name"],
            exerciseWithMgAndType["exercise_movement_type_name"]
		);
		
        this._muscleGroupWithType = new MuscleGroupWithType(
            null, exerciseWithMgAndType["mg_name"], 
			exerciseWithMgAndType["mg_type_name"]
		);
		
		this.initializePublicVariables(exerciseWithMgAndType);
    }
	
	initializePublicVariables(exerciseWithMgAndType)
	{
		this.exerciseId = this._exerciseWithType.exerciseId;
		this.exerciseName = this._exerciseWithType.exerciseName;
		this.exerciseDescription = this._exerciseWithType.exerciseDescription;
		this.exerciseWeightTypeName = this._exerciseWithType.exerciseWeightTypeName;
		this.exerciseMuscleTypeName = this._exerciseWithType.exerciseMuscleTypeName;
		this.exerciseMovementTypeName = this._exerciseWithType.exerciseMovementTypeName;
		this.mgInfo = [];
		
		this.addMuscleGroupInfo(exerciseWithMgAndType["mg_name"], 
								exerciseWithMgAndType["mg_type_name"]);
	}
	
	addMuscleGroupInfo(mgName, mgTypeName)
	{
		this.mgInfo.push({
			"mgName": mgName,
			"mgTypeName": mgTypeName,
		});
	}
}





module.exports = (function()
{
    return ExerciseAndMuscleGroupWithType;
})();
