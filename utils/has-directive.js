const getDirectiveIndex = require('./get-directive-index');

function hasDirective(path, directive) {
	let attrs = path.node.openingElement.attributes;
	let attrIdx = getDirectiveIndex(attrs, directive);

	if (attrIdx === -1) {
		return false;
	} else {
		return true;
	}
}

module.exports = hasDirective;