const t = require('babel-types');

module.exports = {

	createJSXElement(name, attrs, children, excludeAttrs) {
		let elementIdentifier = t.jSXIdentifier(name);
		let elementAttrs = attrs.slice();

		if (excludeAttrs) {
			for (let attr of excludeAttrs) {
				let attrIndex = elementAttrs.findIndex(a => {
					return a.name.name === attr;
				});
				elementAttrs.splice(attrIndex, 1);
			}
		}

		let opening = t.jSXOpeningElement(elementIdentifier, elementAttrs, false);
		let closing = t.jSXClosingElement(elementIdentifier);
		let element = t.jSXElement(opening, closing, children, true);

		return element;
	},

	createJSXElementFromNode(node, excludeAttrs) {
		return this.createJSXElement(
			node.openingElement.name.name,
			node.openingElement.attributes,
			node.children,
			excludeAttrs
		);
	}

};