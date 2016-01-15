function PrepareQuizAnswers () {
	'use strict';

	let selections = {};

	return {
		addSelectionToAnswers: addSelectionToAnswers,
		clearSelections: clearSelections,
		getSelections: getSelections,
		getSelectionsLength: getSelectionsLength
	};

	function addSelectionToAnswers(selection) {
		const pass = _checkIfExistsInSelection(selection.question, selections);

		if (!pass) {
			selections[selection.question] = selection.choice;
		}
	}

	function _checkIfExistsInSelection(question, collection) {
		const keys = Object.keys(collection);
		let inCollection = false;

		for(let i = 0; i < keys.length, i++;) {
			if (keys[i] === question) inCollection = true;
		}

		return inCollection;
	}

	function clearSelections() {
		selections = {};
	}

	function getSelections() {
		return selections;
	}

	function getSelectionsLength() {
		return Object.keys(selections).length;
	}
}

export default PrepareQuizAnswers;
