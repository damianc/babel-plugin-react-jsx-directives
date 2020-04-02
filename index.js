const d = require('./directives');
const { hasDirective } = require('./utils');

const DirectiveVisitor = {
	JSXElement(path, state) {

		if (hasDirective(path, 'rx-if')) {
			d.transformIfDirective(path, state);
			return;
		}

		if (hasDirective(path, 'rx-for')) {
			d.transformForDirective(path, state);
			return;
		}

	}
};

module.exports = () => ({
	name: 'react-jsx-directives',
	visitor: DirectiveVisitor
});