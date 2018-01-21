matches = {
"#a'": "á",
"#e'": "é",
"#i'": "í",
"#o'": "ó",
"#u'": "ú",
"#y'": "ý",
"#a`": "à",
"#e`": "è",
"#i`": "ì",
"#o`": "ò",
"#u`": "ù",
"#a^": "â",
"#e^": "ê",
"#i^": "î",
"#o^": "ô",
"#u^": "û",
"#a:": "ä",
"#e:": "ë",
"#i:": "ï",
"#o:": "ö",
"#u:": "ü",
"#y:": "ÿ",
"#a~": "ã",
"#n~": "ñ",
"#o~": "õ",
"#c,": "ç",
"#ae": "æ",
"#oe": "œ",

"#d-": "ð",
"#a.": "å",
"#o/": "ø",
"#th": "þ",
"#ss": "ß",

"#!": "¡",
"#?": "¿",
"#<": "‹",
"#>": "›",
"#<<": "«",
"#>>": "»",

"#.-": "•",
"#m-": "—",
"#n-": "–",
"#.": "°",

"#+-": "±",
"#!=": "≠",
"#<=": "≤",
"#>=": "≥",
"#/": "÷",
"#*": "×",

"#^2": "²",
"#^3": "³",
"#1/2": "½",
"#1/4": "¼",
"#3/4": "¾",
"#1/3": "⅓",
"#2/3": "⅔",
"#1/5": "⅕",
"#2/5": "⅖",
"#3/5": "⅗",
"#4/5": "⅘",
"#1/6": "⅙",
"#5/6": "⅚",
"#1/8": "⅛",
"#3/8": "⅜",
"#5/8": "⅝",
"#7/8": "⅞",
"#pi": "Π",
"#mu": "µ",

"#$l": "£",
"#$e": "€",
"#$y": "Ұ",
"#$c": "¢",
"#$": "",
"#cmd": "command",
}

sorted = [];

// Moves object properties to array
for (m in matches) {
	sorted.push(m);
}

//Sorts array by descending order
sorted.sort(function(a, b){
  return b.length - a.length;
});

document.addEventListener("keydown", function(e) {
	//Gets the html tag of the currently selected element of the page
	var tag = document.activeElement.tagName;

	//If Ctrl is pressed, and the selected element is input or textarea
	if (e.which === 17 && (tag === "INPUT" || tag === "TEXTAREA")) {

		//Gets text of selected element from start to current cursor position
		var text = document.activeElement.value.substring(0, document.activeElement.selectionStart);

		//Gets the position of the last # in the text
		var pos = text.lastIndexOf("#");

		//Gets string of text from start to position of #
		var search = text.substring(pos);

		for (var s = 0; s < sorted.length; s++) {
			var match = sorted[s];

			//If # exists in the text, and search lowercased contains the match at the very start, and the length of search and match are equal
			if (pos !== -1 && search.toLowerCase().indexOf(match) === 0 && search.length === match.length) {

				//Gets the string to replace match
				var replace = matches[match];

				//If the match in search has any uppercase letters, the replace becomes its uppercase counterpart
				if (isUpper(search.substr(0, match.length))) replace = replace.toUpperCase();

				//Combines text before #, the new replace string, and text after the end of the # match
				text = text.substring(0, pos) + replace + document.activeElement.value.substring(pos + match.length);

				//Sets current selected element's value to text
				document.activeElement.value = text;

				//Sets the start and end of cursor selection to right after the new replace string
				document.activeElement.selectionStart = pos + replace.length;
				document.activeElement.selectionEnd = pos + replace.length;

				break;
			}
		}
	}
});

// Checks each letter of a string, if any are uppercase, returns true
function isUpper(word) {
	for (var i = 0; i < word.length; i++) {
		var c = word[i];

		if (c.toUpperCase() === c && c.toLowerCase() !== c) {
			return true;
		}
	}
	return false;
}
