SHORTCUTS = {};
chrome.storage.sync.get(null, function(storage) {
	for (var key in storage) {
		SHORTCUTS[key] = storage[key].replacement;
	}
});

document.addEventListener("keydown", function(e) {

	// If the Ctrl key is pressed
	if (e.which === 17) {

		// Gets the html tag of the currently selected element of the page
		var tag = document.activeElement.tagName;

		// If the selected element is an input or textarea element
		if (tag === "INPUT" || tag === "TEXTAREA") {

			var activeElementText = document.activeElement.value;
			var activeElementSelection = document.activeElement.selectionStart;

			// Gets text of selected element from start to current cursor position
			var text = activeElementText.substring(0, activeElementSelection);
			// Gets the position of the last # in the text
			var hashtagPosition = text.lastIndexOf("#");

			if (hashtagPosition !== -1 && hashtagPosition !== text.length - 1) {

				// Gets string of text from start to position of #
				var shortcut = text.substring(hashtagPosition + 1);

				if (SHORTCUTS[shortcut] || SHORTCUTS[shortcut.toLowerCase()]) {

					// Gets the string to replace the shortcut
					// If the shortcut has any uppercase letters, its replacement becomes its uppercase counterpart
					var replace = (SHORTCUTS[shortcut] ? SHORTCUTS[shortcut] : SHORTCUTS[shortcut.toLowerCase()].toUpperCase());

					// Combines text before #, the new replace string, and text after the end of the # match
					text = text.substring(0, hashtagPosition) + replace + document.activeElement.value.substring(hashtagPosition + 1 + shortcut.length);

					// Sets current selected element's value to text
					document.activeElement.value = text;
					// Sets the start and end of cursor selection to right after the new replace string
					document.activeElement.selectionStart = hashtagPosition + replace.length;
					document.activeElement.selectionEnd = hashtagPosition + replace.length;

				}

			}

		}
	}
});
