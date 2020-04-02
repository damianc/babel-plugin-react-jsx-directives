const t = require('babel-types');
const u = require('../utils');
const Directive = require('./enum');

function transformIfDirective(path, state) {
	const arrowIIFE = t.arrowFunctionExpression(
		[],
		t.blockStatement([
			t.emptyStatement()
		])
	);

	let ifDirAttrs = path.node.openingElement.attributes;
	let ifAttrIdx = u.getDirectiveIndex(ifDirAttrs, Directive.IF);
	let ifCondition = ifDirAttrs[ifAttrIdx].value;

	if (t.isJSXExpressionContainer(ifCondition)) {
		/* if section */

		let element = u.createJSXElementFromNode(path.node, [Directive.IF]);
		let _if = t.ifStatement(
			ifCondition.expression,
			t.returnStatement(element)
		);

		arrowIIFE.body.body.push(_if);

		/* elseif section */

		let _else;
		let nextElement = u.getNextElementSibling(path);

		while (true) {
			if (!nextElement) break;

			if (
				u.hasDirective(nextElement.node, Directive.ELSE) ||
				u.hasDirective(nextElement.node, Directive.ELSEIF)
			) {
				if (u.hasDirective(nextElement.node, Directive.ELSE)) {
					_else = u.createJSXElementFromNode(nextElement.node, [Directive.ELSE]);
					nextElement.remove();
					break;
				} else if (u.hasDirective(nextElement.node, Directive.ELSEIF)) {
					let eiDirAttrs = nextElement.node.openingElement.attributes;
					let eiAttrIdx = u.getDirectiveIndex(eiDirAttrs, Directive.ELSEIF);
					let eiCondition = eiDirAttrs[eiAttrIdx].value;
					if (t.isJSXExpressionContainer(eiCondition)) {
						let element = u.createJSXElementFromNode(nextElement.node, [Directive.ELSEIF]);
						let _ei = t.ifStatement(
							eiCondition.expression,
							t.returnStatement(
								element
							)
						);

						nextElement.remove();
						arrowIIFE.body.body.push(
							_ei
						);

					}
				}

				nextElement = u.getNextElementSibling(nextElement);
			} else break;
		}

		/* else section */

		if (_else) {
			arrowIIFE.body.body.push(
				t.returnStatement(
					_else
				)
			);
		}

		path.replaceWith(t.callExpression(
			arrowIIFE,
			[]
		));
	}
}

module.exports = transformIfDirective;