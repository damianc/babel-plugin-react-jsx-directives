const d = require('./directives');
const { hasDirective } = require('./utils');

const DirectiveVisitor = {
	JSXElement(path, state) {

		if (hasDirective(path, '$if')) {
			d.transformIfDirective(path, state);
			return;
		}

		if (hasDirective(path, '$for')) {
			d.transformForDirective(path, state);
			return;
		}

	}
};

module.exports = () => ({
	name: 'react-jsx-directives',
	visitor: DirectiveVisitor
});