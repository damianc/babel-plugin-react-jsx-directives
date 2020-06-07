const p = require('../directives/prefix');

function getDirectiveProp(directive) {
	return p.getPrefix() + '-' + directive;
}

function getPartialDirectiveProp(directive, suffix) {
	return p.getPrefix() + '-' + directive + '-' + suffix;
}

module.exports = {
	getDirectiveProp,
	getPartialDirectiveProp
};