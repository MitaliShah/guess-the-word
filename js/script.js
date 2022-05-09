const guessedLettersElements = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const displayRemaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
let remainingGuesses = 8;

let word = "magnolia";
const guessedLetters = [];

async function getWord(){
    const response = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`)
    const data = await response.text();    
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    console.log(word);
    placeholder(word);
}

getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for(let letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
    
}

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guessedInput = guessInput.value;
    const goodGuess = checkPlayerInput(guessedInput);
    if(goodGuess){
        makeGuess(guessedInput);
    }
    guessInput.value = "";
});

const checkPlayerInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/
    if(input.length === 0){
        message.innerText = "Please enter a letter";
    } else if(input.length > 1){
        message.innerText = "Please enter a single letter.";
    } else if(!input.match(acceptedLetter)){
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
}

const makeGuess = function(letter) {
    letter = letter.toUpperCase();
    if(guessedLetters.includes(letter)){
        message.innerText = "You already guessed that letter. Try again.";
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
        updateGuessesRemaining(letter);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
}

const showGuessedLetters = function(){
    guessedLettersElements.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElements.append(li);
      }    
}

const updateWordInProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for(let letter of wordArray){
        if (guessedLetters.includes(letter)){
            revealWord.push(letter);
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    
    checkWinning();
}

const updateGuessesRemaining  = function(guess){
    const upperWord = word.toUpperCase();
    if(!upperWord.includes(guess)){
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
      }

      if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
      } else if (remainingGuesses === 1) {
        displayRemaining.innerText = `${remainingGuesses} guess`;
      } else {
        displayRemaining.innerText = `${remainingGuesses} guesses`;
      }
}

const checkWinning = function(){
    if(wordInProgress.innerText === word.toUpperCase()){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`
    }
}



