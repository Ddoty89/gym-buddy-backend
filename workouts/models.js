const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const WorkoutSchema = mongoose.Schema({
	username: {
		type: String
		// required: true
	},
	equipment: {
		type: String
		// required: true
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
		notes: this.notes || ''
	};
};

const Workouts = mongoose.model('Workouts', WorkoutSchema);

module.exports = {Workouts}