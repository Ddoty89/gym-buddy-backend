const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const StatsSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	weight: {
		type: String,
		default: ''
	},
	goals: {
		type: String,
		default: ''
	},
	mileTime: {
		type: String,
		default: ''
	},
	date: {
		type: String,
		default: ''
	},
	notes: {
		type: String,
		default: ''
	}
});

StatsSchema.methods.serialize = function () {
	return {
		username: this.username || '',
		weight: this.weight || '',
		goals: this.goals || '',
		mileTime: this.mileTime || '',
		notes: this.notes || ''
	};
};

const Stats = mongoose.model('Stats', StatsSchema);

module.exports = {Stats}