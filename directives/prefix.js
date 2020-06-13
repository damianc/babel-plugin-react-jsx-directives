const DEFAULT_PREFIX = '$';
const DEFAULT_PREFIX_SEPARATION = false;

let _prefix = DEFAULT_PREFIX;
let _prefixSeparation = DEFAULT_PREFIX_SEPARATION;

module.exports = {
	getPrefix() {
		return _prefix;
	},
	setPrefix(prfx) {
		_prefix = prfx;
	},
	getPrefixSeparation() {
		return _prefixSeparation;
	},
	setPrefixSeparation(separated) {
		_prefixSeparation = separated === true ? '-' : null;
	}
};

module.exports.defaultPrefix = DEFAULT_PREFIX;
module.exports.defaultPrefixSeparation = DEFAULT_PREFIX_SEPARATION;