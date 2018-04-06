const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const WorkoutSchema = mongoose.Schema({
	username: String,
	workoutTitle: {
		type: String,
		default: 'Not Titled'
	},
	exerciseList: Array
});

WorkoutSchema.methods.serialize = function () {
	return {
		username: this.username || '',
		workoutTitle: this.workoutTitle || '',
		exerciseList: this.exerciseList || ''
	};
};

const MuscleSchema = mongoose.Schema({
	barbellSquat: Array,
	benchPress: Array,
	dumbellCurl: Array,
	gymMatCrunch: Array,
	inclineBenchPress: Array,
	pullUpBar: Array
});

MuscleSchema.methods.serialize = function () {
	return {
		barbellSquat: this.barbellSquat || '',
		benchPress: this.benchPress || '',
		dumbellCurl: this.dumbellCurl || '',
		gymMatCrunch: this.gymMatCrunch || '',
		inclineBenchPress: this.inclineBenchPress || '',
		pullUpBar: this.pullUpBar || ''
	};
};

const Muscles = mongoose.model('Muscles', MuscleSchema);
const Workouts = mongoose.model('Workouts', WorkoutSchema);

module.exports = {Workouts, Muscles}