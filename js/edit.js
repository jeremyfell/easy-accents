// Restores all shortcuts to a set of default shortcuts and replacements
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
		"keyword": "You can also create shortcuts for text containing up to 1000 characters",
		"emoji": "😃"
	}

	var time = new Date().getTime();
	var i = 0;

	defaults = {};

	for (key in SHORTCUTS) {
		defaults[key] = {};
		defaults[key].replacement = SHORTCUTS[key];
		defaults[key].timeCreated = time - i;
		TIME_CREATED[key] = time - i;
		CURRENT_SHORTCUTS++;
		CURRENT_CHARACTERS += (key.length + SHORTCUTS[key].length) * BYTE_MULTIPLIER + SHORTCUT_OVERHEAD;
		i++;
	}

	defaults[STORAGE_KEY] = {
		"shortcutCount" : CURRENT_SHORTCUTS,
		"characterCount": CURRENT_CHARACTERS
	};

	chrome.storage.sync.set(defaults, function(entry) {errorCheck(entry)});

	editTab();
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
		sortedShortcuts.push({"shortcut": key, "replacement": SHORTCUTS[key], "timeCreated": TIME_CREATED[key]});
	}

	sortedShortcuts.sort(function(a,b) {return (a.timeCreated > b.timeCreated) ? -1 : 1;});

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
		clipboardIcon.src = "../svg/clipboard.svg";
		deleteIcon.src = "../svg/delete.svg";
		clipboardIcon.draggable = false;
		deleteIcon.draggable = false;

		shortcutInput.addEventListener("focus", function() {
			this.dataset.oldShortcut = this.value;
		});

		shortcutInput.addEventListener("keypress", function(e) {
			if (e.which === 13) this.blur();
		});

		shortcutInput.addEventListener("input", function() {
			if (this.value === "") {
		    this.classList.remove("input-invalid");
				this.parentNode.childNodes[0].classList.remove("input-invalid");
				this.title = "Shortcut";

		  } else if ((this.value !== this.dataset.oldShortcut && SHORTCUTS[this.value]) || containsUppercaseLetter(this.value) || this.value.indexOf("#") !== -1) {

				this.classList.add("input-invalid");
				this.parentNode.childNodes[0].classList.add("input-invalid");
				this.title = (SHORTCUTS[this.value] ? "Shortcut already exists" : "Cannot use uppercase letters in shortcut.\nCapital letter versions of replacements are automatically created.\nSimply use the corresponding shortcut, with any letter capitalized.");

		  } else {
		    this.classList.remove("input-invalid");
				this.parentNode.childNodes[0].classList.remove("input-invalid");
		    this.title = "Shortcut";
		  }
		});

		shortcutInput.addEventListener("change", function() {
			if (this.value === "" || SHORTCUTS[this.value] || containsUppercaseLetter(this.value) || this.value.indexOf("#") !== -1) {

				// Shorcut is invalid, revert to previous shortcut
				this.value = this.dataset.oldShortcut;
				this.classList.remove("input-invalid");
				this.parentNode.childNodes[0].classList.remove("input-invalid");
				this.title = "Shortcut";

			} else {

				// Shortcut is valid, delete old shortcut and add new one
				var shortcut = this.value;
				var replacement = this.parentNode.childNodes[3].value;
				deleteShortcut(this.dataset.oldShortcut);
				saveShortcut(shortcut, replacement);

			}
		});


		replacementInput.addEventListener("focus", function() {
			this.dataset.oldReplacement = this.value;
		});

		replacementInput.addEventListener("keypress", function(e) {
			if (e.which === 13) this.blur();
		});

		replacementInput.addEventListener("change", function() {
			if (this.value === "") {
				this.value = this.dataset.oldReplacement;
			} else {
				var shortcut = this.parentNode.childNodes[1].value;
				var replacement = this.value;
				CURRENT_SHORTCUTS--;
				CURRENT_CHARACTERS -= (shortcut.length + this.dataset.oldReplacement.length) * BYTE_MULTIPLIER + SHORTCUT_OVERHEAD;
				saveShortcut(shortcut, replacement);
			}
		});


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
