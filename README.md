EasyAccents
======

A Chrome extension which allows you to easily insert Unicode characters in browser inputs and textboxes using shortcuts, without needing to remember Alt codes.  

Inserting a character
------
In an input box or a text box, type <kbd>#</kbd> followed by the shortcut for the shortcut defined for that character.  
Then press <kbd>Ctrl</kbd>, and this text will be replaced with the character.

Copying a character to the clipboard
------
Open the popup, type the shortcut for the character, then click the clipboard button or press <kbd>Enter</kbd> or <kbd>Ctrl</kbd>.  
You can now easily insert the character anywhere with <kbd>Ctrl</kbd>+<kbd>v</kbd>.  

![toolbar](https://user-images.githubusercontent.com/31748813/35211328-dd1f6424-ff0a-11e7-9968-4c5c0f522e3d.png)

Inserting a character using the <kbd>#</kbd> method will not work in some cases (such as in the URL box) due to limitations in the Chrome JavaScript APIs. In order to copy characters into alternate programs, use the clipboard method instead.

Adding shortcuts
------

![addblank](https://user-images.githubusercontent.com/31748813/35211321-dcb6d7ce-ff0a-11e7-9b17-700c3f7c58a1.png)

To add a new shortcut in the Add tab, simply type the shortcut into the first input, the character/text to replace it in the second input box, and then click the save button. 

![addfilled](https://user-images.githubusercontent.com/31748813/35211323-dcce58f4-ff0a-11e7-8a59-320c1d2df573.png)

Shortcuts must be unused, and not contain any uppercase letters.  
The reason no uppercase letters are allowed is because EasyAccents automatically generates an uppercase version of any shortcut.  
To use it, simply capitalize any letter in the shortcut when typing it, and its replacement will be capitalized as well.  

Shortcuts are not limited to just single characters.  
You can also create a shortcut that will insert a large amount of text (up to 1000 characters), which can be useful for sentences or paragraphs that you need to paste often.  

Editing shortcuts
To edit a shortcut in the Edit tab, simply change its shortcut or replacement value in its input box. As long as the change is valid, it will automatically be saved, otherwise it will revert to its previous value.  
Click the clipboard button to copy it, or the delete button to remove the shortcut.  

![edit](https://user-images.githubusercontent.com/31748813/35211325-dcf6c91a-ff0a-11e7-97bb-e209150fdf5b.png)

Starting out
------
If you haven't created any shortcuts and want some default shortcuts to use, go to the edit tab and click the button.  

![empty](https://user-images.githubusercontent.com/31748813/35211326-dd0af520-ff0a-11e7-8296-a88292dcf642.png)

Default shortcuts
------
| Shortcut | Character | Shortcut | Character | Shortcut | Character | Shortcut | Character
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
|#a'  |   á  | #i:  |   ï  | #>  |   ›  | #1/3  |   ⅓  |
|#e'  |   é  | #o:  |   ö  | #<<  |   «  | #2/3  |   ⅔  |
|#i'  |   í  | #u:  |   ü  | #>>  |   »  | #1/5  |   ⅕  |
|#o'  |   ó  | #y:  |   ÿ  | #.-  |   •  | #2/5  |   ⅖  |
|#u'  |   ú  | #a~  |   ã  | #m-  |   —  | #3/5  |   ⅗  |
|#y'  |   ý  | #n~  |   ñ  | #n-  |   –  | #4/5  |   ⅘  |
|#a`  |   à  | #o~  |   õ  | #.  |   °  | #1/6  |   ⅙  |
|#e`  |   è  | #c  |   ç  | #+-  |   ±  | #5/6  |   ⅚  |
|#i`  |   ì  | #ae  |   æ  | #!=  |   ≠  | #1/8  |   ⅛  |
|#o`  |   ò  | #oe  |   œ  | #<=  |   ≤  | #3/8  |   ⅜  |
|#u`  |   ù  | #d-  |   ð  | #>=  |   ≥  | #5/8  |   ⅝  |
|#a^  |   â  | #a.  |   å  | #/  |   ÷  | #7/8  |   ⅞  |
|#e^  |   ê  | #o/  |   ø  | #*  |   ×  | #pi  |   Π  |
|#i^  |   î  | #th  |   þ  | #^2  |   ²  | #mu  |   µ  |
|#o^  |   ô  | #ss  |   ß  | #^3  |   ³  | #$l  |   £  |
|#u^  |   û  | #!  |   ¡  | #1/2  |   ½  | #$e  |   €  |
|#a:  |   ä  | #?  |   ¿  | #1/4  |   ¼  | #$y  |   Ұ  |
|#e:  |   ë  | #<  |   ‹  | #3/4  |   ¾  | #$c  |   ¢  |

Popup Shortcut
------
The keylinks popup can also be opened quickly using <kbd>Ctrl</kbd>+<kbd>,</kbd>  

Using Extension
------
The extension is not yet released on the Chrome web store, but can still be used while in development.  
Download the zip of this project, and extract the main folder.  
Go to chrome://extensions, and enable developer mode.  
Click "Load unpacked extension" and select the folder.  
The extension is now ready to use.  
