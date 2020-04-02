const { getDirectiveProp } = require('../utils');

const Directive = {
	get IF() {
		return getDirectiveProp('if');
	},
	get ELSEIF() {
		return getDirectiveProp('elseif');
	},
	get ELSE() {
		return getDirectiveProp('else');
	},
	get FOR() {
		return getDirectiveProp('for');
	}
};

module.exports = Directive;