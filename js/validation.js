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

		addShortcutIconContainer.title = (SHORTCUTS[addShortcutInput.value] ? "Shortcut already exists" : "Cannot use uppercase letters in shortcut.\nCapital letter versions of replacements are automatically created.\nSimply use the corresponding shortcut, with any letter capitalized.");

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
