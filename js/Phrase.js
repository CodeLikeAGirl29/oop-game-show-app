/* Treehouse FSJS Techdegree
 / * Project 4 - OOP Game App
 /* Phrase.js */

 //Setting up the Phrase class. Phrases can only be letters and spaces.
class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

    /*
    Displays the chosen phrase to the game board.
    */
    addPhraseToDisplay() {
        //loop through the char array and for every char create a list item with the given html styling
        //append it to where it should go
        const phraseUL = selectElement('#phrase ul');
        const isSpace = /^ $/;
        //Using a function I created, it can be found in app.js
        convertCurrentPhrase(this.phrase).forEach(char => {
            //creating an li and appending it
            const li = document.createElement('li');
            phraseUL.appendChild(li);

            //deciding which class/textcontent should go to which li
            if (isSpace.test(char)) {
                //if the char is white space
                li.className = 'space';
            } else {
                //if the char isn't white space
                li.className = `class="hide letter ${char}">`;
                li.textContent = `${char}`;
            }
        });
    }

    /*
    Checks if the chosen letter is in the current phrase.
    @param (string) letter we need to check.
    */
    checkLetter(letter) {
        //Checks to see if the letter selected by the player mathces a letter in the phrase.'
        //need to return true or false.
        const matchedLetter = convertCurrentPhrase(this.phrase).find(char => char === letter);
        if (matchedLetter !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    /*
    Displays letter returned from checkLetter, matches to class and changes matched class to show
    @param (string) letter - The letter to display.
    */
    showMatchedLetter(letter) {
        convertToArray('#phrase li').forEach(li => {
        //if they match --> change class to the show class
        //if they don't match do nothing.
            if (li.textContent === letter) {
                li.className = 'show';
            }
        });
    }
}