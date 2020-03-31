const t = require('babel-types');
const u = require('./utils');

const DirectiveVisitor = {
	JSXElement(path, state) {
		let attrs = path.node.openingElement.attributes;
		let ifAttrIdx = u.getDirectiveIndex(attrs, '$if');

		if (ifAttrIdx !== -1) {
			let ifCondition = attrs[ifAttrIdx].value;
			if (t.isJSXExpressionContainer(ifCondition)) {
				let alternateValue = t.nullLiteral();

				let nextElem = u.getNextElementSibling(path);
				if (nextElem) {
					let nextElemAttrs = nextElem.node.openingElement.attributes;
					let elseAttrIdx = u.getDirectiveIndex(nextElemAttrs, '$else');
					if (elseAttrIdx != -1) {
						let element = u.createJSXElementFromNode(nextElem.node, ['$else']);
						alternateValue = element;
						nextElem.remove();
					}
				}

		 		let element = u.createJSXElementFromNode(path.node, ['$if']);
				let condExpr = t.conditionalExpression(
					ifCondition.expression,
					element,
					alternateValue
				);

				path.replaceWith(condExpr);
			}
		}
	}
};

module.exports = () => ({
	name: 'react-directives',
	visitor: DirectiveVisitor
});