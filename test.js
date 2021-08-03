

 /****** hangman game ********/
 //collect data
 const allLetters = "abcdefghijklmnopqrstuvwxyz";
 let arrayOfLetters = Array.from(allLetters);
 let lettersContainer = document.querySelector(".letters");
 //console.log(arrayOfLetters);
 arrayOfLetters.forEach(letters => {
     let letterSpan = document.createElement('span');
     let letterNode = document.createTextNode(letters);
     letterSpan.appendChild(letterNode);
     letterSpan.className = "letterBox";
     lettersContainer.appendChild(letterSpan);

 })
 
 //object of keys 
 const words = {
     programming : ['html' ,'css' ,'javascript' ,'jquery' ,'bootstrap' ,'php' ,'nodejs', 'laravel', 'python'],
     name : ['rania', 'dalia' ,'mohammed' ,'israa' ,'eman' ,'rahma' ,'kholod' ,'ahmed' ,'ella' ,'adam'],
     country :["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
     movie: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
 };
 let allKeys = Object.keys(words);
 let randomPropNum  = Math.floor(Math.random() * allKeys.length);
 let randomPropName = allKeys[randomPropNum]; //random key
 let randomPropValue = words[randomPropName]; //all values of this key
 let randomValueNum = Math.floor(Math.random() * randomPropValue.length);
 let randomValueWord = randomPropValue[randomValueNum];//one value of this key
 document.querySelector(".gameInfo .category span").textContent = randomPropName;
 //l goz2 bta3 l guess word
 let lettersGuess = document.querySelector(".lettersGuess");
 let lettersAndSpace = Array.from(randomValueWord);
 lettersAndSpace.forEach(letter => {
     let emptySpan = document.createElement("span");
     // If Letter Is Space
     if (letter === ' ') {
    // Add Class To The Span
    emptySpan.className = 'withSpace';
 }
 lettersGuess.appendChild(emptySpan);
});
//all span
let allSpan = document.querySelectorAll('.lettersGuess span');
//wrong attempt
let wrong = 0;
let draw = document.querySelector('.hangmanDraw');
//click on letter
document.addEventListener('click' ,(e) => {
    let status = false;
    if (e.target.className === 'letterBox') {
        e.target.classList.add('clicked');
        let clickedLetter = e.target.innerHTML.toLowerCase();
        let chosenLetter = Array.from(randomValueWord.toLowerCase());
        chosenLetter.forEach((element , wordIndex) => {
            if (clickedLetter == element) {
                status = true;
                allSpan.forEach((spann ,spanIndex) => {
                    if (wordIndex === spanIndex) {
                        spann.innerHTML = clickedLetter;
                    }
                })
            }
        });
        //ouside loop
        if (status !== true) {
            wrong ++;
            draw.classList.add(`wrong-${wrong}`);
        }
        if (wrong == 8) {
            endGame();
            lettersContainer.classList.add('finished');
        }
    }
});

function endGame() {
    let div = document.createElement("div");
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueWord}`);
    div.appendChild(divText);
    div.className = 'popup';
    document.body.appendChild(div);
}