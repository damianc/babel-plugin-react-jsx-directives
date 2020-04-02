const d = require('./directives');
const p = require('./directives/prefix');
const Directive = require('./directives/enum');
const { hasDirective } = require('./utils');

function directiveParser(_, opts) {
	if (opts.prefix && opts.prefix != p.defaultPrefix) {
		if (/^[a-z]+$/.test(opts.prefix)) {
			p.setPrefix(opts.prefix);
		} else {
			throw new SyntaxError(
				'Prefix option for Babel plugin react-jsx-directives' +
				'should consist of one or more lowercase characters'
			);
		}
	}

	return {
		name: 'react-jsx-directives',
		visitor: {
			JSXElement(path, state) {

				if (hasDirective(path.node, Directive.IF)) {
					d.transformIfDirective(path, state);
					return;
				}

				if (hasDirective(path.node, Directive.FOR)) {
					d.transformForDirective(path, state);
					return;
				}

				if (hasDirective(path.node, Directive.SWITCH)) {
					d.transformSwitchDirective(path, state);
					return;
				}

			}
		}
	};
}

module.exports = directiveParser;