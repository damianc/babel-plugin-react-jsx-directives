const { getDirectiveProp, getPartialDirectiveProp } = require('../utils');

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
	},
	get CLASS() {
		return getDirectiveProp('class');
	},
	PARTIAL_CLASS(suffix) {
		return getPartialDirectiveProp('class', suffix);
	},
	get STYLE() {
		return getDirectiveProp('style');
	},
	PARTIAL_STYLE(suffix) {
		return getPartialDirectiveProp('style', suffix);
	},
	get PARAMS() {
		return getDirectiveProp('params');
	},
	get DYNAMIC_PROP() {
		return getDirectiveProp('dynamic-prop');
	},
	get DYNAMIC_EVENT() {
		return getDirectiveProp('dynamic-event');
	},
	get SHOW() {
		return getDirectiveProp('show');
	},
	get HIDE() {
		return getDirectiveProp('hide');
	}
};

module.exports = Directive;