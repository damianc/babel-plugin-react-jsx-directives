const t = require('babel-types');

function createJSXElement(name, attrs, children, excludedAttrs, node = null) {
	let elementIdentifier;

	if (name) {
		elementIdentifier = t.jSXIdentifier(name);
	} else {
		elementIdentifier = node && node.openingElement.name;
	}

	let elementAttrs = attrs.slice();
	if (excludedAttrs) {
		for (let attr of excludedAttrs) {
			let attrIndex = elementAttrs.findIndex(a => {
				return a.name ? a.name.name === attr : false;
			});
			if (attrIndex != -1) elementAttrs.splice(attrIndex, 1);
		}
	}

	let opening = t.jSXOpeningElement(elementIdentifier, elementAttrs, false);
	let closing = t.jSXClosingElement(elementIdentifier);
	let element = t.jSXElement(opening, closing, children, true);

	return element;
}

module.exports = createJSXElement;