const { getDirectiveIndex, getPartialDirectiveIndex } = require('./get-directive-index');

function hasDirective(node, directive) {
	let attrs = node.openingElement.attributes;
	let attrIdx = getDirectiveIndex(attrs, directive);

	if (attrIdx === -1) {
		return false;
	} else {
		return true;
	}
}

function hasPartialDirective(node, directive) {
	let attrs = node.openingElement.attributes;
	let attrIdx = getPartialDirectiveIndex(attrs, directive);

	if (attrIdx === -1) {
		return false;
	} else {
		return true;
	}
}

module.exports = {
	hasDirective,
	hasPartialDirective
};