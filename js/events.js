// Adds all event listeners for the toolbar tab
function addToolbarTabEventListeners() {
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

	shortcutInput.addEventListener("input", function() {
		validShortcut();
	});

	clipboardButton.addEventListener("click", function(e) {
		copyToolbarReplacement();
	});
}

// Adds all event listeners for the options menu
function addOptionsMenuEventListeners() {
	var addTabButton = document.getElementById("add-tab-button");
	var editTabButton = document.getElementById("edit-tab-button");

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

// Adds all event listeners for the Add tab
function addAddTabEventListeners() {
	var addShortcutInput = document.getElementById("add-shortcut-input");
	var addReplacementInput = document.getElementById("add-replacement-input");
	var addSaveButton = document.getElementById("add-save-button");

	addShortcutInput.addEventListener("input", function() {
		validateAddShortcutInput();
	});

	addReplacementInput.addEventListener("input", function() {
		validateAddReplacementInput();
	});

	addShortcutInput.addEventListener("keypress", function(e) {
		if (e.which === 13) document.getElementById("add-replacement-input").select();
	});

	addReplacementInput.addEventListener("keypress", function(e) {
		if (e.which === 13) document.getElementById("add-save-button").click();
	});

	addSaveButton.addEventListener("click", function() {
		var shortcut = document.getElementById("add-shortcut-input").value;
		var replacement = document.getElementById("add-replacement-input").value;
		saveShortcut(shortcut, replacement);
	});
}

// Adds all event listeners for the edit tab
function addEditTabEventListeners() {
	var defaultButton = document.getElementById("default-button");

	defaultButton.addEventListener("click", function() {
		restoreDefaults();
	});
}

// Adds all event listeners for the popup in the toolbar tab, options menu, add tab, and edit tab
function addPopupEventListeners() {
	addToolbarTabEventListeners();
	addOptionsMenuEventListeners();
	addAddTabEventListeners();
	addEditTabEventListeners();
}
