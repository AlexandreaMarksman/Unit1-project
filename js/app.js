//  As soon as the app loads, go request questions from Api
// Player presses start button, Quiz starts.
// "Show question" player picks answer if answer regradless of the correct answer, move on to the next question. 
// function called showQuestion with a parameter of the question it's showing. This function will show the number of the parameter
//(optional)** Player picks answer, if answer is wrong the correct answer would light up green, the wrong** 
//
// whenever they answer a question check to see if it's right or wrong and show next question.

// User/Question shows score and reset button. As soon as reset button is click on request more questions

// ** set up div structure for 1 question and 4 answers **
// ** write function to show any question, given the parameter.
// more: get object from array that has the same index of the parameter give data from that object to the correct places in the data structure
// dataArray[parameterName] 


/*-------------------------------- Constants --------------------------------*/


/*-------------------------------- Variables --------------------------------*/

let dataArray 
let score 
let currentQuestion


/*------------------------ Cached Element References ------------------------*/
const lightDarkBtn = document.querySelector("#light-dark-button")
const restartBtn = document.getElementById("reset");

const question = document.getElementById
("question");

const answers = document.querySelectorAll
("#answer");

const start = document.getElementById
("start");
/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("DOMContentLoaded",requestQuestions)

// restartBtn.addEventListener('click',function(){
//     requestQuestions()
//     // go back to start screen
// })

start.addEventListener('click', render)

answers.forEach(function (answerDiv) {
    answerDiv.addEventListener("click", checkResponse)
})
/*-------------------------------- Functions --------------------------------*/
init()
function init() {
    score = 0
    currentQuestion = 0

}

function requestQuestions() {
    fetch("https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple")
    .then((response) => {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
        dataArray = data.results
        console.log(dataArray)
    })
}

function getRandomQuestion() {
    const randomNum =  Math.floor(Math.random()*9) + 1
    console.log(dataArray[randomNum])
    console.log(randomNum)
    // render(dataArray[randomNum])
    currentQuestion=randomNum
}
function render() {
    // randoQ has a question and all the answers
    getRandomQuestion()
    question.innerText = dataArray[currentQuestion].question
    let answerArray = [dataArray[currentQuestion].correct_answer, ...dataArray[currentQuestion].incorrect_answers]
    shuffleArray(answerArray)
    console.log(answerArray)
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
    console.log(event.target.innerText)
    if (dataArray[currentQuestion].correct_answer === event.target.innerText) {
        score += 10;
    }
    currentQuestion++
    if(currentQuestion === 10){
        score()
    }else{
        render()
    }
    
}

// function score() {
    
// }

