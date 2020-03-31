const t = require('babel-types');

function createJSXElement(name, attrs, children, excludedAttrs) {
	let elementIdentifier = t.jSXIdentifier(name);
	let elementAttrs = attrs.slice();

	if (excludedAttrs) {
		for (let attr of excludedAttrs) {
			let attrIndex = elementAttrs.findIndex(a => {
				return a.name.name === attr;
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