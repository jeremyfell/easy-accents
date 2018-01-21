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

function getShortcuts() {
	chrome.storage.sync.get(null, function(storage) {
		for (var key in storage) {
			SHORTCUTS[key] = storage[key].replacement;
			DATES_CREATED[key] = storage[key].timeCreated;
		}
	});
}

function toolbarTab() {

	document.getElementById("options").style.display = "none";
	document.body.id = "toolbar-body";

	var toolbarMenuDiv = document.getElementById("toolbar-menu");
	var optionsButton = document.getElementById("options-button");
	var shortcutInput = document.getElementById("shortcut-input");
	var clipboardButton = document.getElementById("clipboard-button");

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

	shortcutInput.addEventListener("keyup", function() {
		validShortcut();
	});

	clipboardButton.addEventListener("click", function(e) {
		copyToolbarReplacement();
	});

	shortcutInput.focus();
}

function addTab() {
	var addShortcutIconContainer = document.getElementById("add-shortcut-icon-container");
	var addReplacementIconContainer = document.getElementById("add-replacement-icon-container");
	var addHashtag = document.getElementById("add-hashtag");
	var addShortcutInput = document.getElementById("add-shortcut-input");
	var addReplacementInput = document.getElementById("add-replacement-input");
	var addSaveButton = document.getElementById("add-save-button");


	document.body.id = "add-body";

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


	addShortcutInput.addEventListener("keyup", function() {
		validateAddShortcutInput();
	});

	addShortcutInput.addEventListener("change", function() {
		validateAddShortcutInput();
	});

	addReplacementInput.addEventListener("keyup", function() {
		validateAddReplacementInput();
	});

	addReplacementInput.addEventListener("change", function() {
		validateAddReplacementInput();
	});

	addSaveButton.addEventListener("click", function() {
		addShortcut();
	});

}

function addShortcut() {
	var shortcut = document.getElementById("add-shortcut-input").value;
	var replacement = document.getElementById("add-replacement-input").value;
	var time = new Date().getTime();
	var newShortcut = {};

	if (shortcut === "" || SHORTCUTS[shortcut]) return;

	SHORTCUTS[shortcut] = replacement;

	newShortcut[shortcut] = {"replacement": replacement, "timeCreated": time };
	alert(newShortcut.timeCreated);
	chrome.storage.sync.set(newShortcut);

	addTab();
}

function editTab() {
	var editShortcutsContainer = document.getElementById("edit-shortcuts-container");
	trimElement(editShortcutsContainer);

	document.body.id = "edit-body";

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

		equals.className = "edit-equals";
		equals.innerHTML = "=";


		replacementInput.className = "edit-replacement-input";
		replacementInput.setAttribute("type", "text");
		replacementInput.setAttribute("spellcheck", "false");
		replacementInput.value = sortedShortcuts[i].replacement;

		clipboardButton.className = "edit-button";
		deleteButton.className = "edit-button";

		clipboardIcon.className = "edit-icon";
		deleteIcon.className = "edit-icon";
		clipboardIcon.src = "svg/clipboard.svg";
		deleteIcon.src = "svg/delete.svg";



		deleteButton.addEventListener("click", function() {
			var shortcut = this.parentNode.childNodes[1].value;
			delete SHORTCUTS[shortcut];
			delete DATES_CREATED[shortcut];
			this.parentNode.remove();
			chrome.storage.sync.remove(shortcut);
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

// If shortcut in input is valid, enable clipboard button and color input border green
// Otherwise, disable clipboard button
function validShortcut() {
	value = document.getElementById("shortcut-input").value;

	if (SHORTCUTS[value]) {
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
		var value = SHORTCUTS[document.getElementById("shortcut-input").value]
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
	var addTabButton = document.getElementById("add-tab-button");
	var editTabButton = document.getElementById("edit-tab-button");

	addTab();

	toolbarMenu.style.display = "none";
	options.style.display = null;
	edit.style.display = "none";


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
  } else {
		addShortcutIconContainer.classList.add("input-valid");
    addShortcutIconContainer.classList.remove("input-invalid");
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

getShortcuts();
toolbarTab();
