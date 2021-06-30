//  As soon as the app loads, go request questions from Api
// Player presses start button, Quiz starts.
// "Show question" player picks answer if answer regradless of the correct answer, move on to the next question. 
// function called showQuestion with a parameter of the question it's showing. This function will show the number of the parameter
//(optional)** Player picks answer, if answer is wrong the correct answer would light up green, the wrong** 
//
// whenever they answer a question check to see if it's right or wrong and show next question.

// User/Question shows score and reset button. As soon as reset button is click on request more questions

//  set up div structure for 1 question and 4 answers **
// write function to show any question, given the parameter.
// more: get object from array that has the same index of the parameter give data from that object to the correct places in the data structure
// dataArray[parameterName] 
// ** when data Array reaches a certian lenght we need some logic to end the game// 
// data array has a question removed everytime the user answer a question; so this game is currently breaking when there are no questions left


/*-------------------------------- Constants --------------------------------*/
const colorScheme = {
    dark: "",
    change: function() {
      colorScheme.dark = colorScheme.dark ? "" : "dark"
      document.querySelector("body").setAttribute("class", colorScheme.dark)
    }
}

/*-------------------------------- Variables --------------------------------*/

let dataArray 
let score
let currentQuestion
let randomNum
let questionsAnswered
/*------------------------ Cached Element References ------------------------*/

const darkModeBtn = document.querySelector("#dark-mode")
const restartBtn = document.getElementById("reset");

const question = document.getElementById
("question");

const answers = document.querySelectorAll
("#answer");

const answersEl = document.getElementById("answers")

const start = document.getElementById
("start");
const scoreBoard = document.getElementById
("score");

const finalScorescreen = document.querySelectorAll(".hide")
/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("DOMContentLoaded",requestQuestions)

// restartBtn.addEventListener('click',function(){
//     requestQuestions()
//     // go back to start screen
// })
darkModeBtn.addEventListener("click", colorScheme.change)
start.addEventListener('click', render)

answers.forEach(function (answerDiv) {
    answerDiv.addEventListener("click", checkResponse)
})
/*-------------------------------- Functions --------------------------------*/

init()
function init() {
    score = 0
    questionsAnswered = 0

}

function requestQuestions() {
    fetch("https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple")
    .then((response) => {
        return response.json()
    })
    .then(function(data) {
        
        dataArray = data.results
        
    })
}

function getRandomQuestion() {
    randomNum =  Math.floor(Math.random()*parseInt(dataArray.length-1)) 
    
    // render(dataArray[randomNum])
    currentQuestion = dataArray[randomNum].question
}
function render() {
    // randoQ has a question and all the answers
    scoreBoard.innerHTML = score
    getRandomQuestion()
    question.innerText = currentQuestion

    let answerArray = [dataArray[randomNum].correct_answer, ...dataArray[randomNum].incorrect_answers]
    shuffleArray(answerArray)
    
    answers.forEach((answerDiv, idx) => {
    answerDiv.innerText = answerArray[idx]
    });
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkResponse(event) {
    console.log(dataArray)
    console.log(currentQuestion)
    if (dataArray[randomNum].correct_answer === event.target.innerText) {
        score += 10;
    }

    ++questionsAnswered
    if(questionsAnswered === 10){
        scoreScreen()
    }else{
        dataArray.splice(randomNum, 1)
        render()
        
        // remove question thats already been asked
    }
    
}

function scoreScreen() {
    finalScorescreen.forEach(function(element){
        element.classList.remove("hide")
    })
    question.classList.add("hide")
    answersEl.classList.add("hide")
}