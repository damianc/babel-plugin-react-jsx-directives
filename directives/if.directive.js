const t = require('babel-types');
const u = require('../utils');

function transformIfDirective(path, state) {
	const arrowIIFE = t.arrowFunctionExpression(
		[],
		t.blockStatement([
			t.emptyStatement()
		])
	);

	let ifDirAttrs = path.node.openingElement.attributes;
	let ifAttrIdx = u.getDirectiveIndex(ifDirAttrs, 'rx-if');
	let ifCondition = ifDirAttrs[ifAttrIdx].value;

	if (t.isJSXExpressionContainer(ifCondition)) {
		/* if section */

		let element = u.createJSXElementFromNode(path.node, ['rx-if']);
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

			if (u.hasDirective(nextElement, 'rx-else') || u.hasDirective(nextElement, 'rx-elseif')) {
				if (u.hasDirective(nextElement, 'rx-else')) {
					_else = u.createJSXElementFromNode(nextElement.node, ['rx-else']);
					nextElement.remove();
					break;
				} else if (u.hasDirective(nextElement, 'rx-elseif')) {
					let eiDirAttrs = nextElement.node.openingElement.attributes;
					let eiAttrIdx = u.getDirectiveIndex(eiDirAttrs, 'rx-elseif');
					let eiCondition = eiDirAttrs[eiAttrIdx].value;
					if (t.isJSXExpressionContainer(eiCondition)) {
						let element = u.createJSXElementFromNode(nextElement.node, ['rx-elseif']);
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