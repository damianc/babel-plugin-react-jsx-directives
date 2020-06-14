const transformIfDirective = require('./if.directive');
const transformForDirective = require('./for.directive');
const transformSwitchDirective = require('./switch.directive');
const transformClassDirective = require('./class.directive');
const transformPartialClassDirective = require('./partial-class.directive');
const transformPartialStyleDirective = require('./partial-style.directive');
const transformParamsDirective = require('./params.directive');
const transformDynamicPropDirective = require('./dynamic-prop.directive');
const transformDynamicEventDirective = require('./dynamic-event.directive');
const transformShowDirective = require('./show.directive');
const transformHideDirective = require('./hide.directive');
const transformHiddenDirective = require('./hidden.directive');
const transformModelDirective = require('./model.directive');

module.exports = {
	transformIfDirective,
	transformForDirective,
	transformSwitchDirective,
	transformClassDirective,
	transformPartialClassDirective,
	transformPartialStyleDirective,
	transformParamsDirective,
	transformDynamicPropDirective,
	transformDynamicEventDirective,
	transformShowDirective,
	transformHideDirective,
	transformHiddenDirective,
	transformModelDirective
};