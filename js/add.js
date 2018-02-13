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

	// If the maximum chrome sync storage has been reached, display a message, and disable adding new shortcuts
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
