MAX_SHORTCUTS = 500;
MAX_CHARACTERS = 98000;
CURRENT_SHORTCUTS = 0;
CURRENT_CHARACTERS = 0;
SHORTCUT_OVERHEAD = 48;
BYTE_MULTIPLIER = 4;
STORAGE_KEY = "EASY_ACCENTS_STORAGE_COUNT";
DEFAULT_SHORTCUT_COUNT = 1;
DEFAULT_CHARACTER_COUNT = 65;

SHORTCUTS = {};

DATES_CREATED = {};

COLORS = {
	green : "#00A65D"
}

SOURCE = {
	add				: "svg/add.svg",
	arrow			: "svg/arrow.svg",
	check			: "svg/check.svg",
	clipboard	: "svg/clipboard.svg",
	date			: "svg/date.svg",
	deleting	: "svg/delete.svg",
	equal			: "svg/equal.svg",
	key				: "svg/key.svg",
	manage		: "svg/manage.svg",
	name			: "svg/name.svg",
	options		: "svg/options.svg",
	settings	: "svg/settings.svg",
	use				: "svg/use.svg"
}

function restoreDefaults() {
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

	var time = new Date().getTime();

	defaults = {};

	for (key in SHORTCUTS) {
		defaults[key] = {}
		defaults[key].replacement = SHORTCUTS[key].replacement;
		defaults[key].timeCreated = SHORTCUTS[key].timeCreated;
	}

	chrome.storage.sync.set(defaults);

	editTab();
}

function getShortcuts() {
	chrome.storage.sync.get(null, function(storage) {
		for (var key in storage) {
			if (key === STORAGE_KEY) {
				CURRENT_SHORTCUTS = storage[key].shortcutCount;
				CURRENT_CHARACTERS = storage[key].characterCount;
			} else {
				SHORTCUTS[key] = storage[key].replacement;
				DATES_CREATED[key] = storage[key].timeCreated;
			}
		}

		if (!storage[STORAGE_KEY]) {
			var storageCount = {}
			storageCount[STORAGE_KEY] = {
				shortcutCount: DEFAULT_SHORTCUT_COUNT,
				characterCount: DEFAULT_CHARACTER_COUNT
			}

			CURRENT_SHORTCUTS = DEFAULT_SHORTCUT_COUNT;
			CURRENT_CHARACTERS = DEFAULT_CHARACTER_COUNT;

			chrome.storage.sync.set(storageCount);
		}

	});
}

function toolbarTab() {
	var shortcutInput = document.getElementById("shortcut-input");

	document.getElementById("options").style.display = "none";
	document.body.id = "toolbar-body";

	shortcutInput.focus();
}

function addTab() {

	var addTabContainer = document.getElementById("add-tab-container");
	var storageCapacityReached = document.getElementById("storage-capacity-reached");

	var addShortcutIconContainer = document.getElementById("add-shortcut-icon-container");
	var addReplacementIconContainer = document.getElementById("add-replacement-icon-container");
	var addHashtag = document.getElementById("add-hashtag");
	var addShortcutInput = document.getElementById("add-shortcut-input");
	var addReplacementInput = document.getElementById("add-replacement-input");
	var addSaveButton = document.getElementById("add-save-button");


	document.body.id = "add-body";

	if (CURRENT_SHORTCUTS > MAX_SHORTCUTS || CURRENT_CHARACTERS > MAX_CHARACTERS) {
		addTabContainer.style.display = "none";
		storageCapacityReached.style.display = null;
		return;
	} else {
		addTabContainer.style.display = null;
		storageCapacityReached.style.display = "none";
	}

	addShortcutInput.value = "";
	addReplacementInput.value = "";

	addShortcutIconContainer.classList.remove("input-valid");
	addReplacementIconContainer.classList.remove("input-valid");
	addHashtag.classList.remove("input-valid");
	addShortcutInput.classList.remove("input-valid");
	addReplacementInput.classList.remove("input-valid");

	addShortcutIconContainer.classList.remove("input-invalid");
	addReplacementIconContainer.classList.remove("input-invalid");
	addHashtag.classList.remove("input-invalid");
	addShortcutInput.classList.remove("input-invalid");
	addReplacementInput.classList.remove("input-invalid");

	addSaveButton.disabled = true;

}

function addShortcut() {
	var shortcut = document.getElementById("add-shortcut-input").value;
	var replacement = document.getElementById("add-replacement-input").value;
	var characters = (shortcut.length + replacement.length) * BYTE_MULTIPLIER + SHORTCUT_OVERHEAD;
	var time = new Date().getTime();
	var storageChanges = {};

	if (shortcut === "" || SHORTCUTS[shortcut]) return;

	SHORTCUTS[shortcut] = replacement;

	CURRENT_SHORTCUTS++;
	CURRENT_CHARACTERS += characters;

	storageChanges[shortcut] = {"replacement": replacement, "timeCreated": time };
	storageChanges[STORAGE_KEY] = {"shortcutCount" : CURRENT_SHORTCUTS, "characterCount": CURRENT_CHARACTERS};

	chrome.storage.sync.set(storageChanges);

	addTab();
}

function editTab() {
	var editTabContainer = document.getElementById("edit-tab-container");
	var noSavedShortcuts = document.getElementById("no-saved-shortcuts");
	var defaultButton = document.getElementById("default-button");
	var editShortcutsContainer = document.getElementById("edit-shortcuts-container");

	trimElement(editShortcutsContainer);
	document.body.id = "edit-body";

	if (Object.keys(SHORTCUTS).length === 0) {
		editTabContainer.style.display = "none";
		noSavedShortcuts.style.display = null;
		return;
	} else {
		editTabContainer.style.display = null;
		noSavedShortcuts.style.display = "none";
	}

	sortedShortcuts = [];

	for (key in SHORTCUTS) {
		sortedShortcuts.push({"shortcut": key, "replacement": SHORTCUTS[key], "timeCreated": DATES_CREATED[key]});
	}

	sortedShortcuts.sort(function(a,b) {return (a.timeCreated < b.timeCreated) ? -1 : 1;});

	for (var i = 0; i < sortedShortcuts.length; i++) {

		var shortcutContainer = document.createElement("div");
		var hashtag = document.createElement("p");
		var shortcutInput = document.createElement("input");
		var equals = document.createElement("p");
		var replacementInput = document.createElement("input");
		var clipboardButton = document.createElement("button");
		var deleteButton = document.createElement("button");
		var clipboardIcon = document.createElement("img");
		var deleteIcon = document.createElement("img");

		shortcutContainer.className = "edit-shortcut";

		hashtag.className = "edit-hashtag";
		hashtag.innerHTML = "#";

		shortcutInput.className = "edit-shortcut-input";
		shortcutInput.setAttribute("type", "text");
		shortcutInput.setAttribute("spellcheck", "false");
		shortcutInput.value = sortedShortcuts[i].shortcut;
		shortcutInput.title = "Shortcut";

		equals.className = "edit-equals";
		equals.innerHTML = "=";


		replacementInput.className = "edit-replacement-input";
		replacementInput.setAttribute("type", "text");
		replacementInput.setAttribute("spellcheck", "false");
		replacementInput.value = sortedShortcuts[i].replacement;
		replacementInput.title = "Replacement";

		clipboardButton.className = "edit-button";
		deleteButton.className = "edit-button";
		clipboardButton.title = "Copy to clipboard";
		deleteButton.title = "Delete shortcut";

		clipboardIcon.className = "edit-icon";
		deleteIcon.className = "edit-icon";
		clipboardIcon.src = "svg/clipboard.svg";
		deleteIcon.src = "svg/delete.svg";
		clipboardIcon.draggable = false;
		deleteIcon.draggable = false;


		deleteButton.addEventListener("click", function() {
			deleteShortcut(this.parentNode.childNodes[1].value);
			var last = (this.parentNode.lastChild === this);
			this.parentNode.remove();
			if (last) editTab();
		});

		clipboardButton.addEventListener("click", function() {
			copyEditReplacement(this);
		});

		clipboardButton.appendChild(clipboardIcon);
		deleteButton.appendChild(deleteIcon);

		shortcutContainer.appendChild(hashtag);
		shortcutContainer.appendChild(shortcutInput);
		shortcutContainer.appendChild(equals);
		shortcutContainer.appendChild(replacementInput);
		shortcutContainer.appendChild(clipboardButton);
		shortcutContainer.appendChild(deleteButton);

		editShortcutsContainer.appendChild(shortcutContainer);

	}
}

function deleteShortcut(shortcut) {
	delete SHORTCUTS[shortcut];
	delete DATES_CREATED[shortcut];
	chrome.storage.sync.remove(shortcut);
}

// If shortcut in input is valid, enable clipboard button and color input border green
// Otherwise, disable clipboard button
function validShortcut() {
	value = document.getElementById("shortcut-input").value;

	if (SHORTCUTS[value] || SHORTCUTS[value.toLowerCase()]) {
		document.getElementById("toolbar-hashtag").classList.add("input-valid");
		document.getElementById("shortcut-input").classList.add("input-valid");
		document.getElementById("shortcut-input").title = SHORTCUTS[value];
		document.getElementById("clipboard-button").disabled = false;
	} else {
		document.getElementById("toolbar-hashtag").classList.remove("input-valid");
		document.getElementById("shortcut-input").classList.remove("input-valid");
		document.getElementById("shortcut-input").title = "";
		document.getElementById("clipboard-button").disabled = true;
	}
}


function copyToolbarReplacement() {
	if (document.getElementById("clipboard-button").disabled === false) {
		var shortcut = document.getElementById("shortcut-input").value;
		value = (SHORTCUTS[shortcut]) ? SHORTCUTS[shortcut] : SHORTCUTS[shortcut.toLowerCase()].toUpperCase();
		copyToClipboard(value);
		window.close();
	}
}

function copyEditReplacement(clipboardButton) {
	copyToClipboard(clipboardButton.parentNode.childNodes[3].value);
}

// Copies the shortcut replacement to the user's clipboard-button
// To do this, creates a temporary textarea and appends it to the popup, places the text in it,
// copies the text to the clipboard, and then deletes the textarea
function copyToClipboard(value) {
	var temp = document.createElement("textarea");

	temp.style.position = "absolute";
	temp.style.top = "0";
	temp.style.width = "0";
	temp.style.height = "0";

	document.body.appendChild(temp);
	temp.value = value;

	temp.focus();
	temp.select();

	document.execCommand("Copy");
	temp.remove();

}


function optionsPage() {
	var toolbarMenu = document.getElementById("toolbar-menu");
	var options = document.getElementById("options");
	var edit = document.getElementById("edit-tab");

	addTab();

	toolbarMenu.style.display = "none";
	options.style.display = null;
	edit.style.display = "none";

}

// Removes all child elements of an element
function trimElement(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
}

function validateAddShortcutInput() {

	var addShortcutIconContainer = document.getElementById("add-shortcut-icon-container");
	var addShortcutInput = document.getElementById("add-shortcut-input");
	var hashtag = document.getElementById("add-hashtag");

	if (addShortcutInput.value === "") {
		addShortcutIconContainer.classList.remove("input-valid");
    addShortcutIconContainer.classList.remove("input-invalid");
    addShortcutIconContainer.title = "";
    addShortcutInput.classList.remove("input-valid");
    addShortcutInput.classList.remove("input-invalid");
		hashtag.classList.remove("input-valid");
    hashtag.classList.remove("input-invalid");
  } else if (SHORTCUTS[addShortcutInput.value] || containsUppercaseLetter(addShortcutInput.value)) {
		addShortcutIconContainer.classList.add("input-invalid");
    addShortcutIconContainer.classList.remove("input-valid");
    addShortcutInput.classList.add("input-invalid");
    addShortcutInput.classList.remove("input-valid");
		hashtag.classList.add("input-invalid");
    hashtag.classList.remove("input-valid");

		addShortcutIconContainer.title = (SHORTCUTS[addShortcutInput.value] ? "Shortcut already exists" : "Cannot use uppercase letters in shortcut");

  } else {
		addShortcutIconContainer.classList.add("input-valid");
    addShortcutIconContainer.classList.remove("input-invalid");
    addShortcutIconContainer.title = "";
    addShortcutInput.classList.add("input-valid");
    addShortcutInput.classList.remove("input-invalid");
		hashtag.classList.add("input-valid");
    hashtag.classList.remove("input-invalid");
  }

	validateAddInputs();

}

function validateAddReplacementInput() {

	var addReplacementIconContainer = document.getElementById("add-replacement-icon-container");
	var addReplacementInput = document.getElementById("add-replacement-input");

	if (addReplacementInput.value.length > 0) {
		addReplacementIconContainer.classList.add("input-valid");
		addReplacementInput.classList.add("input-valid");
	} else {
		addReplacementIconContainer.classList.remove("input-valid");
		addReplacementInput.classList.remove("input-valid");
	}

	validateAddInputs();

}

function validateAddInputs() {
  var addShortcutInput = document.getElementById("add-shortcut-input");
  var addReplacementInput = document.getElementById("add-replacement-input");
  var addSaveButton = document.getElementById("add-save-button");

  if (addShortcutInput.classList.contains("input-valid") && addReplacementInput.classList.contains("input-valid")) {
    addSaveButton.disabled = false;
  } else {
    addSaveButton.disabled = true;
  }

}

function containsUppercaseLetter(word) {
	for (var i = 0; i < word.length; i++) {
		var c = word[i];
			if (c.toUpperCase() === c && c.toLowerCase() !== c) {
				return true;
			}
		}
		return false;
}

function addPopupEventListeners() {
	var addTabButton = document.getElementById("add-tab-button");
	var editTabButton = document.getElementById("edit-tab-button");

	var toolbarMenuDiv = document.getElementById("toolbar-menu");
	var optionsButton = document.getElementById("options-button");
	var shortcutInput = document.getElementById("shortcut-input");
	var clipboardButton = document.getElementById("clipboard-button");

	var addShortcutInput = document.getElementById("add-shortcut-input");
	var addReplacementInput = document.getElementById("add-replacement-input");
	var addSaveButton = document.getElementById("add-save-button");

	var defaultButton = document.getElementById("default-button");

	//
	// Options menu
	//
	addTabButton.addEventListener("click", function() {
		this.disabled = true;
		document.getElementById("edit-tab-button").disabled = false;
		document.getElementById("add-tab").style.display = null;
		document.getElementById("edit-tab").style.display = "none";
		addTab();
	});

	editTabButton.addEventListener("click", function() {
		this.disabled = true;
		document.getElementById("add-tab-button").disabled = false;
		document.getElementById("edit-tab").style.display = null;
		document.getElementById("add-tab").style.display = "none";
		editTab();
	});


	//
	// Toolbar tab
	//
	toolbarMenuDiv.addEventListener("keydown", function(e) {
		// If key is Ctrl
		if (e.which === 17) copyToolbarReplacement();
	});

	optionsButton.addEventListener("click", function() {
		optionsPage();
	});

	shortcutInput.addEventListener("keypress", function(e) {
		// If key is Enter
		e.which === 13 ? copyToolbarReplacement() : validShortcut();
	});

	shortcutInput.addEventListener("input", function() {
		validShortcut();
	});

	clipboardButton.addEventListener("click", function(e) {
		copyToolbarReplacement();
	});

	//
	// Add tab
	//
	addShortcutInput.addEventListener("input", function() {
		validateAddShortcutInput();
	});

	addReplacementInput.addEventListener("input", function() {
		validateAddReplacementInput();
	});

	addSaveButton.addEventListener("click", function() {
		addShortcut();
	});

	//
	// Edit tab
	//
	defaultButton.addEventListener("click", function() {
		restoreDefaults();
	});
}

addPopupEventListeners();
getShortcuts();
toolbarTab();
