SHORTCUTS = {};
chrome.storage.sync.get(null, function(storage) {
	for (var key in storage) {
		SHORTCUTS[key] = storage[key];
	}
});


SHORTCUTS = {
"a'": "á",
"e'": "é",
"i'": "í",
"o'": "ó",
"u'": "ú",
"y'": "ý",
"a`": "à",
"e`": "è",
"i`": "ì",
"o`": "ò",
"u`": "ù",
"a^": "â",
"e^": "ê",
"i^": "î",
"o^": "ô",
"u^": "û",
"a:": "ä",
"e:": "ë",
"i:": "ï",
"o:": "ö",
"u:": "ü",
"y:": "ÿ",
"a~": "ã",
"n~": "ñ",
"o~": "õ",
"c,": "ç",
"ae": "æ",
"oe": "œ",

"d-": "ð",
"a.": "å",
"o/": "ø",
"th": "þ",
"ss": "ß",

"!": "¡",
"?": "¿",
"<": "‹",
">": "›",
"<<": "«",
">>": "»",

".-": "•",
"m-": "—",
"n-": "–",
".": "°",

"+-": "±",
"!=": "≠",
"<=": "≤",
">=": "≥",
"/": "÷",
"*": "×",

"^2": "²",
"^3": "³",
"1/2": "½",
"1/4": "¼",
"3/4": "¾",
"1/3": "⅓",
"2/3": "⅔",
"1/5": "⅕",
"2/5": "⅖",
"3/5": "⅗",
"4/5": "⅘",
"1/6": "⅙",
"5/6": "⅚",
"1/8": "⅛",
"3/8": "⅜",
"5/8": "⅝",
"7/8": "⅞",
"pi": "Π",
"mu": "µ",

"$l": "£",
"$e": "€",
"$y": "Ұ",
"$c": "¢",
"$": "",
"cmd": "command",
}

document.addEventListener("keydown", function(e) {

	// If Ctrl is pressed, and the selected element is input or textarea
	if (e.which === 17) {

		// Gets the html tag of the currently selected element of the page
		var tag = document.activeElement.tagName;

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

					//Combines text before #, the new replace string, and text after the end of the # match
					text = text.substring(0, hashtagPosition) + replace + document.activeElement.value.substring(hashtagPosition + 1 + shortcut.length);

					//Sets current selected element's value to text
					document.activeElement.value = text;
					//Sets the start and end of cursor selection to right after the new replace string
					document.activeElement.selectionStart = hashtagPosition + replace.length;
					document.activeElement.selectionEnd = hashtagPosition + replace.length;

				}

			}

		}
	}
});
