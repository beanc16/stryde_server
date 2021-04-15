let AllSupersetInWorkout = require("./AllSupersetInWorkout");
let AllUserExerciseInWorkout = require("./AllUserExerciseInWorkout");
let AllUserExerciseInSuperset = require("./AllUserExerciseInSuperset");


class FullWorkoutOrderWithSupersetExercise
{
    constructor(fwowse)
    {
		this.tempInitializePublicVariables(fwowse);
		
        this._allUserExerciseInWorkout = new AllUserExerciseInWorkout(
            this.userExerciseId, this.userId, this.exerciseId, this.ueiDescription,
            this.ueiSets, this.ueiReps, this.ueiWeight, this.ueiDuration, this.ueiDistance,
            this.ueiResistance, this.exerciseName, this.exerciseDescription,
            this.exerciseWeightTypeName, this.exerciseMuscleTypeName,
            this.exerciseMovementTypeName, this.mgName, this.mgTypeName,
            this.workoutId, this.workoutName, this.workoutDescription, this.orderInWorkout
        );
		
        this._allSupersetInWorkout = new AllSupersetInWorkout(
            this.userId, this.supersetId, this.supersetName, this.orderInWorkout,
            this.workoutId, this.workoutName, this.workoutDescription
        );
        this._allUserExerciseInSuperset =
            new AllUserExerciseInSuperset(
                this.userExerciseId, this.userId, this.exerciseId, this.ueiDescription,
                this.ueiSets, this.ueiReps, this.ueiWeight, this.ueiDuration, this.ueiDistance,
                this.ueiResistance, this.exerciseName, this.exerciseDescription,
                this.exerciseWeightTypeName, this.exerciseMuscleTypeName,
                this.exerciseMovementTypeName, this.mgName, this.mgTypeName,
                this.supersetId, this.supersetName, this.orderInSuperset
            );
		
		//this.reinitializePublicVariables();
    }
	
	tempInitializePublicVariables(fwowse)
	{
		this.userExerciseId = fwowse["user_exercise_id"];
		this.userId = fwowse["user_id"];
		this.exerciseId = fwowse["exercise_id"];
		this.ueiDescription = fwowse["uei_description"];
		this.ueiSets = fwowse["uei_sets"];
		this.ueiReps = fwowse["uei_reps"];
		this.ueiWeight = fwowse["uei_weight"];
		this.ueiDuration = fwowse["uei_duration"];
		this.ueiDescription = fwowse["uei_distance"];
		this.ueiResistance = fwowse["uei_resistance"];
		this.exerciseName = fwowse["exercise_name"];
		this.exerciseDescription = fwowse["exercise_description"];
		this.exerciseWeightTypeName = fwowse["exercise_weight_type_name"];
		this.exerciseMuscleTypeName = fwowse["exercise_muscle_type_name"];
		this.exerciseMovementTypeName = fwowse["exercise_movement_type_name"];
		this.mgName = fwowse["mg_name"];
		this.mgTypeName = fwowse["mg_type_name"];
		this.workoutId = fwowse["workout_id"];
		this.workoutName = fwowse["workout_name"];
		this.workoutDescription = fwowse["workout_description"];
		this.orderInWorkout = fwowse["order_in_workout"];
		this.supersetId = fwowse["superset_id"];
		this.supersetName = fwowse["superset_name"];
		this.orderInSuperset = fwowse["order_in_superset"];
	}
	
	reinitializePublicVariables()
	{
		this.userExerciseId = this._allUserExerciseInWorkout.userExerciseId;
		this.userId = this._allUserExerciseInWorkout.userId;
		this.exerciseId = this._allUserExerciseInWorkout.exerciseId;
		this.ueiDescription = this._allUserExerciseInWorkout.ueiDescription;
		this.ueiSets = this._allUserExerciseInWorkout.ueiSets;
		this.ueiReps = this._allUserExerciseInWorkout.ueiReps;
		this.ueiWeight = this._allUserExerciseInWorkout.ueiWeight;
		this.ueiDuration = this._allUserExerciseInWorkout.ueiDuration;
		this.ueiDescription = this._allUserExerciseInWorkout.ueiDistance;
		this.ueiResistance = this._allUserExerciseInWorkout.ueiResistance;
		this.exerciseName = this._allUserExerciseInWorkout.exerciseName;
		this.exerciseDescription = this._allUserExerciseInWorkout.exerciseDescription;
		this.exerciseWeightTypeName = this._allUserExerciseInWorkout.exerciseWeightTypeName;
		this.exerciseMuscleTypeName = this._allUserExerciseInWorkout.exerciseMuscleTypeName;
		this.exerciseMovementTypeName = this._allUserExerciseInWorkout.exerciseMovementTypeName;
		this.mgName = this._allUserExerciseInWorkout.mgName;
		this.mgTypeName = this._allUserExerciseInWorkout.mgTypeName;
		this.workoutId = this._allSupersetInWorkout.workoutId;
		this.workoutName = this._allSupersetInWorkout.workoutName;
		this.workoutDescription = this._allSupersetInWorkout.workoutDescription;
		this.orderInWorkout = this._allSupersetInWorkout.orderInWorkout;
		this.supersetId = this._allSupersetInWorkout.supersetId;
		this.supersetName = this._allSupersetInWorkout.supersetName;
		this.orderInSuperset = this._allSupersetInWorkout.orderInSuperset;
	}
}





module.exports = (function()
{
    return FullWorkoutOrderWithSupersetExercise;
})();
