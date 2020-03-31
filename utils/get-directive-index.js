function getDirectiveIndex(attrsArr, directive) {
	return attrsArr.findIndex(attr => attr.name.name === directive);
}

module.exports = getDirectiveIndex;