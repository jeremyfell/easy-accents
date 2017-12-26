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

COLORS = {
	green : "#00A65D"
}

SOURCE = {
	add			: "svg/add.svg",
	arrow		: "svg/arrow.svg",
	check		: "svg/check.svg",
	clipboard	: "svg/clipboard.svg",
	date		: "svg/date.svg",
	deleting	: "svg/delete.svg",
	equal		: "svg/equal.svg",
	key			: "svg/key.svg",
	manage		: "svg/manage.svg",
	name		: "svg/name.svg",
	options		: "svg/options.svg",
	settings	: "svg/settings.svg",
	use			: "svg/use.svg"
}

function clipboardTab() {
	var clipboardMenuDiv = document.createElement("div");
	var optionsButton = document.createElement("button");
	var optionsImage = document.createElement("img");
	var hashtagP = document.createElement("p");
	var shortcutInput = document.createElement("input");
	var clipboardButton = document.createElement("button");
	var clipboardImage = document.createElement("img");
	
	document.documentElement.className = "clipboard-tab";
	document.body.className = "clipboard-tab";
	
	clipboardMenuDiv.id = "clipboard-menu";
	optionsButton.id = "options-button";
	optionsImage.id = "options-image";
	hashtagP.id = "hashtag";
	shortcutInput.id = "shortcut-input";
	clipboardButton.id = "clipboard-button";
	clipboardImage.id = "clipboard-image";
	
	optionsButton.className = "copy-button";
	clipboardButton.className = "copy-button";
	optionsImage.className = "icon";
	clipboardImage.className = "icon";
	hashtagP.className = "hashtag";
	
	optionsButton.title = "Edit shortcuts";
	clipboardButton.title = "Copy shortcut's replacement to clipboard";
	hashtagP.innerHTML = "#";
	shortcutInput.setAttribute("type", "text");
	clipboardButton.disabled = true;
	
	clipboardMenuDiv.addEventListener("keydown", function(e) {
		if (e.which === 17) copyToClipboard();
	});
	
	optionsButton.addEventListener("click", function() {
		shortcutsTab();
	});
	
	shortcutInput.addEventListener("keypress", function(e) {
		e.which === 13 ? copyToClipboard() : validShortcut();
	});
	
	shortcutInput.addEventListener("keyup", function() {
		validShortcut();
	});
	
	clipboardButton.addEventListener("click", function(e) {
		copyToClipboard();
	});
	
	optionsImage.src = SOURCE.options;
	clipboardImage.src = SOURCE.clipboard;
	
	optionsButton.appendChild(optionsImage);
	clipboardButton.appendChild(clipboardImage);
	
	clipboardMenuDiv.appendChild(optionsButton);
	clipboardMenuDiv.appendChild(hashtagP);
	clipboardMenuDiv.appendChild(shortcutInput);
	clipboardMenuDiv.appendChild(clipboardButton);
	
	document.body.appendChild(clipboardMenuDiv);
	
	shortcutInput.focus();
}


function shortcutsTab() {
	var sorted = [];
	
	var clipboardMenuDiv = document.getElementById("clipboard-menu");
	
	var shortcutsMenuDiv = document.createElement("div");
	var sortingMenuDiv = document.createElement("div");
	
	var shortcutSortButton = document.createElement("button");
	var replacementSortButton = document.createElement("button");
	var dateSortButton = document.createElement("button");
	var usesSortButton = document.createElement("button");
	
	var shortcutSortImage = document.createElement("img");
	var replacementSortImage = document.createElement("img");
	var dateSortImage = document.createElement("img");
	var usesSortImage = document.createElement("img");
	
	var shortcutsList = document.createElement("list");
	var shortcutEntryDiv = document.createElement("div");
	
	clipboardMenuDiv.parentNode.removeChild(clipboardMenuDiv);
	
	shortcutsMenuDiv.id = "shortcuts-menu";
	sortingMenuDiv.id = "sorting-menu";
	
	shortcutSortButton.id = "shortcut-sort-button";
	replacementSortButton.id = "replacement-sort-button";
	dateSortButton.id = "date-sort-button";
	usesSortButton.id = "uses-sort-button";
	
	shortcutSortButton.className = "sort-button";
	replacementSortButton.className = "sort-button";
	dateSortButton.className = "sort-button";
	usesSortButton.className = "sort-button";
	
	shortcutSortButton.title = "";
	replacementSortButton.title = "";
	dateSortButton.title = "";
	usesSortButton.title = "";
	
	shortcutSortImage.className = "icon";
	replacementSortImage.className = "icon";
	dateSortImage.className = "icon";
	usesSortImage.className = "icon";
	
	shortcutSortImage.src = SOURCE.key;
	replacementSortImage.src = SOURCE.name;
	dateSortImage.src = SOURCE.date;
	usesSortImage.src = SOURCE.use
	
	for (shortcut in SHORTCUTS) {
		sorted.push(shortcut);
	}
	
	
	shortcutSortButton.appendChild(shortcutSortImage);
	replacementSortButton.appendChild(replacementSortImage);
	dateSortButton.appendChild(dateSortImage);
	usesSortButton.appendChild(usesSortImage);
	
	sortingMenuDiv.appendChild(shortcutSortButton);
	sortingMenuDiv.appendChild(replacementSortButton);
	sortingMenuDiv.appendChild(dateSortButton);
	sortingMenuDiv.appendChild(usesSortButton);
	
	
	shortcutsMenuDiv.appendChild(sortingMenuDiv);
	shortcutsMenuDiv.appendChild(shortcutsList);
	shortcutsMenuDiv.appendChild(shortcutEntryDiv);
	
	document.body.appendChild(shortcutsMenuDiv);
	
}

function validShortcut() {
	value = document.getElementById("shortcut-input").value;
	
	for (shortcut in SHORTCUTS) {
		if (value === shortcut) {
		
			document.getElementById("hashtag").style.borderColor = COLORS.green;
			document.getElementById("shortcut-input").style.borderColor = COLORS.green;
			document.getElementById("shortcut-input").title = SHORTCUTS[document.getElementById("shortcut-input").value];
			document.getElementById("clipboard-button").disabled = false;
			
			return;
		}
	
	document.getElementById("hashtag").style.borderColor = null;
	document.getElementById("shortcut-input").style.borderColor = null;
	document.getElementById("clipboard-button").disabled = true;
	document.getElementById("shortcut-input").title = "";
	
	}
}

function copyToClipboard() {
	if (document.getElementById("clipboard-button").disabled === false) {
		var temp = document.createElement("textarea");
		var match = document.getElementById("shortcut-input").value;
		
		document.body.appendChild(temp);
		temp.value = SHORTCUTS[match];
		
		temp.focus();
		temp.select();
		
		document.execCommand("Copy");
		temp.remove();
		
		window.close();
		
	}
}

clipboardTab();