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
	},
	get SWITCH() {
		return getDirectiveProp('switch');
	},
	get CASE() {
		return getDirectiveProp('case');
	},
	get DEFAULT() {
		return getDirectiveProp('default');
	}
};

module.exports = Directive;