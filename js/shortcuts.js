function getShortcuts() {
	chrome.storage.sync.get(null, function(storage) {
		for (var key in storage) {
			if (key === STORAGE_KEY) {
				CURRENT_SHORTCUTS = storage[key].shortcutCount;
				CURRENT_CHARACTERS = storage[key].characterCount;
			} else {
				SHORTCUTS[key] = storage[key].replacement;
				TIMES_CREATED[key] = storage[key].timeCreated;
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

			chrome.storage.sync.set(storageCount, function(entry) {errorCheck(entry)});
		}

	});
}

function saveShortcut(shortcut, replacement) {
	var characters = (shortcut.length + replacement.length) * BYTE_MULTIPLIER + SHORTCUT_OVERHEAD;
	var time = new Date().getTime();
	var storageChanges = {};

	if (shortcut === "") return;

	SHORTCUTS[shortcut] = replacement;
	TIMES_CREATED[shortcut] = time;

	CURRENT_SHORTCUTS++;
	CURRENT_CHARACTERS += characters;

	storageChanges[shortcut] = {"replacement": replacement, "timeCreated": time };
	storageChanges[STORAGE_KEY] = {"shortcutCount" : CURRENT_SHORTCUTS, "characterCount": CURRENT_CHARACTERS};

	chrome.storage.sync.set(storageChanges, function(entry) {errorCheck(entry)});

	addTab();
}

function deleteShortcut(shortcut) {
	var characters = (shortcut.length + SHORTCUTS[shortcut].length) * BYTE_MULTIPLIER + SHORTCUT_OVERHEAD;
	var storageChanges = {};
	delete SHORTCUTS[shortcut];
	delete TIMES_CREATED[shortcut];

	CURRENT_SHORTCUTS--;
	CURRENT_CHARACTERS -= characters;

	storageChanges[STORAGE_KEY] = {"shortcutCount" : CURRENT_SHORTCUTS, "characterCount": CURRENT_CHARACTERS};

	chrome.storage.sync.set(storageChanges);
	chrome.storage.sync.remove(shortcut, function(entry) {errorCheck(entry)});

}
