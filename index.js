const { transformIfDirective } = require('./directives');
const { hasDirective } = require('./utils');

/**/ const t = require('babel-types');
/**/ const u = require('./utils');

const DirectiveVisitor = {
	JSXElement(path, state) {

		// if (hasDirective(path, '$if')) {
		// 	transformIfDirective(path, state);
		// }

		if (!hasDirective(path, '$if')) return;

		const arrowIIFE = t.arrowFunctionExpression(
			[],
			t.blockStatement([
				t.emptyStatement()
			])
		);

		let ifDirAttrs = path.node.openingElement.attributes;
		let ifAttrIdx = u.getDirectiveIndex(ifDirAttrs, '$if');
		let ifCondition = ifDirAttrs[ifAttrIdx].value;

		if (t.isJSXExpressionContainer(ifCondition)) {
			/* if section */

			let element = u.createJSXElementFromNode(path.node, ['$if']);
			let _if = t.ifStatement(
				ifCondition.expression,
				t.returnStatement(element)
			);

			arrowIIFE.body.body.push(_if);

			/* else-if and else section */

			let _else;

			let nextElement = u.getNextElementSibling(path);
			while (true) {
				if (!nextElement) break;

				if (u.hasDirective(nextElement, '$else') || u.hasDirective(nextElement, '$elseif')) {
					if (u.hasDirective(nextElement, '$else')) {
						_else = u.createJSXElementFromNode(nextElement.node, ['$else']);
						nextElement.remove();
						break;
					} else if (u.hasDirective(nextElement, '$elseif')) {
						let eiDirAttrs = nextElement.node.openingElement.attributes;
						let eiAttrIdx = u.getDirectiveIndex(eiDirAttrs, '$elseif');
						let eiCondition = eiDirAttrs[eiAttrIdx].value;
						if (t.isJSXExpressionContainer(eiCondition)) {
							let _ei = t.ifStatement(
								eiCondition.expression,
								t.returnStatement(
									u.createJSXElementFromNode(nextElement.node, ['$elseif'])
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
};

module.exports = () => ({
	name: 'react-jsx-directives',
	visitor: DirectiveVisitor
});