const p = require('../directives/prefix');

function getDirectiveProp(directive) {
	let separation = p.getPrefixSeparation();
	let separator = separation ? '-' : '';
	return p.getPrefix() + separator + directive;
}

function getPartialDirectiveProp(directive, suffix) {
	let separation = p.getPrefixSeparation();
	let separator = separation ? '-' : '';
	return p.getPrefix() + separator + directive + '-' + suffix;
}

module.exports = {
	getDirectiveProp,
	getPartialDirectiveProp
};