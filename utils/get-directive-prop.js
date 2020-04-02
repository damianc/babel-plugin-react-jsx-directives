const p = require('../directives/prefix');

function getDirectiveProp(directive) {
	return p.getPrefix() + '-' + directive;
}

module.exports = getDirectiveProp;