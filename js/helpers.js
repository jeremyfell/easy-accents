// If max write operations are exceeded, alert the user
function errorCheck(entry) {
	if (chrome.runtime.lastError) {
		if (chrome.runtime.lastError.message === "This request exceeds the MAX_WRITE_OPERATIONS_PER_MINUTE quota.") {
			alert("Too many save or delete operations have been performed in the last minute.\nChrome can only perform 120 operations a minute (2 per second).\nJust wait a minute, and try again.");
		} else if (chrome.runtime.lastError.message === "This request exceeds the MAX_WRITE_OPERATIONS_PER_HOUR quota.") {
			alert("Too many save or delete operations have been performed in the last hour.\nChrome can only perform 1800 operations an hour (1 every 2 seconds).\nUnfortunately, you must wait an hour, and try again.");
		}
	}
}

// Removes all child elements of an element
function trimElement(element) {
  while (element.lastChild) {
    element.lastChild.remove();
  }
}

// Returns true if word contains any uppercase letter
function containsUppercaseLetter(word) {
	for (var i = 0; i < word.length; i++) {
		var char = word[i];
			if (char.toUpperCase() === char && char.toLowerCase() !== char) {
				return true;
			}
	}
	return false;
}
