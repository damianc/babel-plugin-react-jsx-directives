const t = require('babel-types');
const u = require('../utils');

function transformForDirective(path, state) {
	let forDirAttrs = path.node.openingElement.attributes;
	let forAttrIdx = u.getDirectiveIndex(forDirAttrs, 'rx-for');
	let forExpression = forDirAttrs[forAttrIdx].value;

	if (
		t.isJSXExpressionContainer(forExpression) &&
		forExpression.expression.operator === 'in'
	) {
		console.log('>>>>', forExpression);
		let forItem;
		let forIndex;
		let forArray = forExpression.expression.right;

		if (t.isSequenceExpression(forExpression.expression.left)) {
			[forItem, forIndex] = forExpression.expression.left.expressions;
		} else if (t.isIdentifier(forExpression.expression.left)) {
			forItem = forExpression.expression.left;
		}

		const mapCall = t.expressionStatement(
			t.callExpression(
				t.memberExpression(
					forArray,
					t.identifier('map')
				),
				[t.arrowFunctionExpression(
					forIndex ? [forItem, forIndex] : [forItem],
					t.blockStatement([
						t.returnStatement(
							u.createJSXElementFromNode(path.node, ['rx-for'])
						)
					])
				)]
			)
		);

		path.replaceWith(mapCall);
	}

}

module.exports = transformForDirective;