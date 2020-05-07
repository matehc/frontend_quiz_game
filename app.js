const options = document.querySelector('.options').children;
const answerTrackerContainer = document.querySelector(".answers-tracker")
const questionNum = document.querySelector(".q-num-value");
const totalQuestion = document.querySelector(".total-quest");
const question = document.querySelector(".question");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan2 = document.querySelector(".total-question2");
const percentage = document.querySelector(".percentage");
const opt1 = document.querySelector(".option1");
const opt2 = document.querySelector(".option2");
const opt3 = document.querySelector(".option3");
const opt4 = document.querySelector(".option4");
let qIndex = 0;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;

// array of questions and answers

const questions = [
    {
        quest: 'What is analogous to a waiter in a restaurant that takes the request from you the customer, then goes to the kitchen to fetch your request and then comes back with a response',
        options: ['PDP', 'API', 'SSH', 'TELNET'],
        answer: '1'
    },
    {
        quest: 'Which of the following Windows utilities would MOST likely be used to identify system errors',
        options: ['System Restore', 'Event Viewer', 'Security Center', 'Windows Defender'],
        answer: '1'
    },
    {
        quest: 'Which of the following is a security threat that disguises itself as legitimate software?',
        options: ['Trojan', 'Worm', 'Virus', 'Spyware'],
        answer: '0'
    },
    {
        quest: 'A technician needs to repurpose a hard drive that has confidential information on it. Which of the following methods is Most appropriate?',
        options: ['Incineration', 'Overwrite', 'Quick format', 'Degauss'],
        answer: '2'
    },
    {
        quest: 'Javascript is interpreted by _________',
        options: ['Server', 'Object', 'Linguistic', 'Client'],
        answer: '3'
    }
 
];


// display question and answer
totalQuestion.innerHTML = questions.length;

let displayQ = () => {
    questionNum.innerHTML = index + 1;
    question.innerHTML = questions[qIndex].quest;
    opt1.innerHTML = questions[qIndex].options[0];
    opt2.innerHTML = questions[qIndex].options[1];
    opt3.innerHTML = questions[qIndex].options[2];
    opt4.innerHTML = questions[qIndex].options[3];
    index++;
}

function check(element){
    if (element.id === questions[qIndex].answer) {
        element.classList.add("correct");
        updateAnswerTracker("correct");
        score++;
    } else {
        element.classList.add("wrong");
        updateAnswerTracker("wrong");

    }
    disabledOptions()
}
function disabledOptions() {
    for (let i=0; i < options.length; i++) { 
        options[i].classList.add('disabled');
        if (options[i].id == questions[qIndex].answer) {
        options[i].classList.add('correct');
        }
    } 
}

function enableOptions() {
    for(let i = 0; i < options.length; i++) {
        options[i].classList.remove("disabled", "correct", "wrong");
    }
}

let validate = () => {
    if (!options[0].classList.contains("disabled")) {
        alert("please select an option")
    }
    else {
        enableOptions()
        randomQuestion();
    }
}


// when a user clicks the next button
let next = () => {
    validate();
}

// display a random question
let randomQuestion = () => {
    let randomNum = Math.floor(Math.random() * questions.length);
    let hitDuplicate = 0;
    if(index == questions.length) {
        quizOver();
    } 
    else {
        if(myArray.length > 0) {
           for(let i = 0; i < myArray.length; i++) {
            if (myArray[i] == randomNum) {
                hitDuplicate = 1;
                break;
            }
           }
           if (hitDuplicate == 1) {
               randomQuestion();
           } else {
               qIndex = randomNum;
               displayQ();
               myArr.push(qIndex);
           }

        }
        if(myArray.length == 0) {
            qIndex = randomNum;
            displayQ(); 
            myArr.push(qIndex)
        }
        myArray.push(randomNum); 
    }
    
}

let answerTracker = () => {
    for(let i=0; i < questions.length; i++) {
        const div = document.createElement("div");
        answerTrackerContainer.appendChild(div);
    }
}

let updateAnswerTracker = (classNam) => {
    answerTrackerContainer.children[index-1].classList.add(classNam);
}

// when quiz finishes
let quizOver = () => {
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML = score;
    totalQuestionSpan2.innerHTML = questions.length;
    percentage.innerHTML = (score/questions.length) * 100 + '%' ;
}


let tryAgain = () => {
    window.location.reload();
}

window.onload = () => {
    randomQuestion();
    answerTracker();
}