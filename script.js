startChar = "#";
shortcuts = [1,2,3,4,5,6,7,8,9];

startChars = "!@#$%^&*`~/.";

list = document.getElementById("shortcuts");

OLDSYMBOL = "";
OLDUNICODE = "";

prompt("Enter shortcut to copy its replacement to your clipboard:");

for (shortcut in shortcuts) {
	var listItem = document.createElement("li");
	
	var startSymbol = document.createElement("p");
	var shortcutInput = document.createElement("input");
	var symbolInput = document.createElement("input");
	
	shortcutInput.className = "shortcut";
	symbolInput.className = "symbol";
	
	shortcutInput.setAttribute("type", "text");
	symbolInput.setAttribute("type", "text");
	
	startSymbol.innerHTML = startChar;
	
	listItem.appendChild(startSymbol);
	listItem.appendChild(shortcutInput);
	listItem.appendChild(symbolInput);
	list.appendChild(listItem);
}