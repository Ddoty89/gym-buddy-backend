const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const StatsSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		default: ''
	},
	height: { 
		type: String
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
	notes: {
		type: String,
		default: ''
	}
});

StatsSchema.methods.serialize = function () {
	return {
		username: this.username || '',
		gender: this.gender || '',
		height: this.height || '',
		weight: this.weight || '',
		goals: this.goals || '',
		mileTime: this.mileTime || '',
		notes: this.notes || ''
	};
};

const Stats = mongoose.model('Stats', StatsSchema);

module.exports = {Stats}