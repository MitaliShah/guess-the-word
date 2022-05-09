const guessedLettersElements = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const displayRemaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

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
    }
}

