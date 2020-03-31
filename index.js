const { transformIfDirective } = require('./directives');
const { hasDirective } = require('./utils');

const DirectiveVisitor = {
	JSXElement(path, state) {

		if (hasDirective(path, '$if')) {
			transformIfDirective(path, state);
		}
		
	}
};

module.exports = () => ({
	name: 'react-directives',
	visitor: DirectiveVisitor
});