const t = require('babel-types');
const utils = require('./utils');

const DirectiveVisitor = {
	JSXElement(path, state) {
		let attrs = path.node.openingElement.attributes;
		let ifAttrIdx = attrs.findIndex(a => a.name.name === '$if');

		if (ifAttrIdx !== -1) {
			let ifCondition = attrs[ifAttrIdx].value;
			if (t.isJSXExpressionContainer(ifCondition)) {
				let alternate = t.stringLiteral('');

				let nextElems = path.getAllNextSiblings();
				let nextElem = nextElems.find(e => e.type == 'JSXElement');
				if (nextElem) {
					let nextElemAttrs = nextElem.node.openingElement.attributes;
					let elseAttrIdx = nextElemAttrs.findIndex(a => a.name.name == '$else');
					if (elseAttrIdx != -1) {
						let element = utils.createJSXElementFromNode(nextElem.node, ['$else']);
						alternate = element;
						nextElem.remove();
					}
				}

		 		let element = utils.createJSXElementFromNode(path.node, ['$if']);
				let condExpr = t.conditionalExpression(
					ifCondition.expression,
					element,
					alternate
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