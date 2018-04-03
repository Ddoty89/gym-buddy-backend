const mongoose = require('mongoose');

// const { workedMuscleSchema } = require('./childSchema')

mongoose.Promise = global.Promise;

const WorkoutSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	equipment: { 
		type: String,
		required: true
	},
	muscle: {
		type: String,
		default: ''
	},
	sets: {
		type: String,
		default: ''
	},
	repetitions: {
		type: String,
		default: ''
	},
	weight: {
		type: String,
		default: ''
	},
	notes: {
		type: String,
		default: ''
	}
});

WorkoutSchema.methods.serialize = function () {
	return {
		username: this.username || '',
		equipment: this.equipment || '',
		muscle: this.muscle || '',
		sets: this.sets || '',
		repetitions: this.repetitions || '',
		weight: this.weight || '',
		notes: this.notes || ''
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