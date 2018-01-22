function toolbarTab() {
	var shortcutInput = document.getElementById("shortcut-input");

	document.getElementById("options").style.display = "none";
	document.body.id = "toolbar-body";

	shortcutInput.focus();
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
