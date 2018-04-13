const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MuscleGroupSchema = mongoose.Schema({
	arms: Array,
	back: Array,
	chest: Array,
	legs: Array,
	core: Array,
	cardio: Array
});

MuscleGroupSchema.methods.serialize = function () {
	return {
		arms: this.arms || '',
		back: this.back || '',
		chest: this.chest || '',
		legs: this.legs || '',
		core: this.core || '',
		cardio: this.cardio || ''
	};
};

const MuscleGroups = mongoose.model('MuscleGroups', MuscleGroupSchema);


module.exports = {MuscleGroups}