/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 //Setting up the Game class.
class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases()
        this.activePhrase = null;
    }

    /*
    I chose to create the phrases array in a method. It seems more module and cleaner to me.
    Creates the array that contains phrase objects and returns it.
    @return {array} an array of phrases that we will use in the game.
    */
    createPhrases() {
        const phraseList = [
            {phrase: 'The Jungle Book'},
            {phrase: 'Beauty and the Beast'},
            {phrase: 'Fox and the Hound'},
            {phrase: 'Dumbo'},
            {phrase: 'The Princess and the Frog'},
            {phrase: 'The Lady and the Tramp'}
        ];  
        return phraseList;      
    }

    /*
    Starts the game by hiding the overlay and setting up the activePhrase and displaying it.
    */
    startGame() {
        //hiding overlay
        selectElement('#overlay').style.display = 'none';
        //setting activePhrase and displaying it hidden.
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    /*
    Creates a random number then uses it to grab a random phrase object.
    @return {Random Phrase Object} This will be used to display for the game.
    */ 
    getRandomPhrase() {
        const randomNumber = Math.floor( Math.random() * this.phrases.length);
        const randomPhrase = new Phrase(this.phrases[randomNumber]);
        return randomPhrase;
    }

    /*
    Handles onscreen keyboard button clicks
    @param (HTMLButtonElement) button - The clicked button element
    */
    handleInteraction(button) {
        //disable the button that was clicked.
        button.disabled = true;
        if (this.activePhrase.checkLetter(button.textContent)) {
            //if phrase includes the guessed letter
            //set class to 'chosen'
            button.className = 'chosen';
            //call showMatchedLetter
            this.activePhrase.showMatchedLetter(button.textContent);
        } else {
            //if phrase does not include the guessed letter
            //set class to 'wrong'
            button.className = 'wrong';
            //call removeLife()
            this.removeLife();
        }

        //if all classes are set to show in the phrase - win
        if (this.checkForWin()) {
            //true - player has won!
            this.gameOver(true);
        }

    }

    /*
    Checks for winning move.
    @return {boolean} true if game has been won, false if game hasn't been won yet.
    */
    checkForWin() {
        //remove the spaces from the array
        const noSpaceLiList = convertToArray('#phrase li').filter(li => !li.classList.contains('space'));
        //looping through with .every. If all match will pass true if it gets one false will pass false.
        return noSpaceLiList.every(li => li.classList.contains('show'));
    }

    /*
    Increases missed property value.
    Removes a life from the scoreboard.
    Checks if player has remaining lives and ends game if player is out of lives.
    */
    removeLife() {
        //remove a heart life from the screen and replace it with the image for the lost heart life.
        const imgList = convertToArray('#scoreboard img');
        //replace the image with lostHeart.png.
        //loop through once each time this is matched
        for (let i = 0; i < imgList.length; i++) {
            //matching to the item in the list that hasn't been removed yet.
            if (imgList[i].getAttribute('src') === 'images/liveHeart.png') {
                //increase missed prop value.
                this.missed += 1;
                //resetting the img src
                imgList[i].src = 'images/lostHeart.png';
                //breaks after doing this once I think
                break;
            }
        }
        
        //if 5 hearts have been used, call game over and pass false into it. (5 missed)
        if (this.missed === 5) {
            this.gameOver(false);
        }

    }

    /*
    Displays game over message
    @param {boolean} gameWon - weather or not the user wont the game.
    */
    gameOver(gameWon) {
        //show overlay
        const overlay = selectElement('#overlay');
        //if gameWon is true display won message else display loss message.
        const gameOverMessage = selectElement('#game-over-message');
        if (gameWon === true) {
            gameOverMessage.textContent = 'Congrats! You are the WINNER! 🎉';
            overlay.className = 'win';
            overlay.style.display = 'block';
        } else if (gameWon === false) {
            gameOverMessage.textContent = 'YOU LOSE - TRY AGAIN!';
            overlay.className = 'lose';
            overlay.style.display = 'block';
        }
    }

    /*
    Resetting the keyboard, lives, phrase list items, and missed property.
    */
    resetGame() {
    //grab phrase UL and remove lis
    const phraseUL = selectElement('#phrase ul');
    while (phraseUL.firstChild) {
        phraseUL.removeChild(phraseUL.firstChild);
    };
    //enable all button letters - set back the key class
    convertToArray('#qwerty button').forEach(button => {
        button.disabled = false;
        button.className = 'key';
    });
    //reset heart lives?
    convertToArray('#scoreboard img').forEach(img => {
        img.src = 'images/liveHeart.png';
    });
    //resetting missed
    game.missed = 0;
    }
}