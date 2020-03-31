function getNextElementSibling(path) {
	let nextElems = path.getAllNextSiblings();
	let nextElem = nextElems.find(e => e.type == 'JSXElement');
	return nextElem;
}

module.exports = getNextElementSibling;