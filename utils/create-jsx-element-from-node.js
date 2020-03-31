const createJSXElement = require('./create-jsx-element');

function createJSXElementFromNode(node, excludedAttrs) {
	return createJSXElement(
		node.openingElement.name.name,
		node.openingElement.attributes,
		node.children,
		excludedAttrs
	);
}

module.exports = createJSXElementFromNode;