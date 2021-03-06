const d = require('./directives');
const p = require('./directives/prefix');
const Directive = require('./directives/enum');
const { hasDirective, hasPartialDirective } = require('./utils');

function directiveParser(_, opts) {
	if (opts.prefix && opts.prefix !== p.defaultPrefix) {
		if (/^(\$|[a-z])+$/.test(opts.prefix)) {
			p.setPrefix(opts.prefix);
		} else {
			throw new SyntaxError(
				'Prefix option for Babel plugin react-jsx-directives' +
				'should consist of one or more lowercase characters (including `$` character)'
			);
		}
	}

	if (typeof opts.prefixSeparation !== 'undefined' && opts.prefixSeparation !== p.defaultPrefixSeparation) {
		p.setPrefixSeparation(!!opts.prefixSeparation);
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

				if (hasDirective(path.node, Directive.CLASS)) {
					d.transformClassDirective(path, state);
					return;
				}

				if (hasPartialDirective(path.node, Directive.CLASS)) {
					d.transformPartialClassDirective(path, state);
					return;
				}

				if (hasPartialDirective(path.node, Directive.STYLE)) {
					d.transformPartialStyleDirective(path, state);
					return;
				}

				if (hasDirective(path.node, Directive.PARAMS)) {
					d.transformParamsDirective(path, state);
					return;
				}

				if (hasDirective(path.node, Directive.DYNAMIC_PROP)) {
					d.transformDynamicPropDirective(path, state);
					return;
				}

				if (hasDirective(path.node, Directive.DYNAMIC_EVENT)) {
					d.transformDynamicEventDirective(path, state);
					return;
				}

				if (hasDirective(path.node, Directive.SHOW)) {
					d.transformShowDirective(path, state);
					return;
				}

				if (hasDirective(path.node, Directive.HIDE)) {
					d.transformHideDirective(path, state);
					return;
				}

				if (hasDirective(path.node, Directive.HIDDEN)) {
					d.transformHiddenDirective(path, state);
					return;
				}

				if (hasDirective(path.node, Directive.MODEL)) {
					d.transformModelDirective(path, state);
					return;
				}

			}
		}
	};
}

module.exports = directiveParser;