const mongoose = require('mongoose');

mongoose.Promise = global.Promis

const workedMuscleSchema = new mongoose.Schema({muscle: String})

workedMuscleSchema.methods.serialize = function () {
	return {
		muscle: this.muscle || ''
	};
};

module.exports = {workedMuscleSchema}