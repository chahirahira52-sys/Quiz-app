

const Question = document.getElementById("question");
const Answer1 = document.getElementById("1");
const Answer2 = document.getElementById("2");
const Answer3 = document.getElementById("3");
const Answer4 = document.getElementById("4");
const NextQuestion = document.getElementById("next");
const scores = document.getElementById("scores");
const restart = document.getElementById("res");
const progress=document.getElementById("progress");
const timerDisplay =document.getElementById("timer");
const questions = [
    {
        question: "what is the capital of France?",
        options: ["Paris", "London", "Madrid", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which language is used to style web pages?",
        options: ["Python", "CSS", "Java", "SQL"],
        correctAnswer: "CSS"
    },
    {
        question: "What is JS?",
        options: ["JavaScript", "Java", "JSON", "JQuery"],
        correctAnswer: "JavaScript"
    },
    {
        question: "Which language is used to add interactivity to web pages?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        correctAnswer: "JavaScript"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["<!-- -->", "//", "#", "**"],
        correctAnswer: "//"
    }
];
let shuffledQuestions = [...questions];
let currentIndex = 0;
let score = 0;
let stillAnsweredQuestion = false;
let currentQuestion = shuffledQuestions[currentIndex];
let timer;
let time=10;
let i=0;
let temp;
function view() {
    clearInterval(timer);
    time=10;
    timerDisplay.textContent=time;
    timer=setInterval(function(){
        time--;
        timerDisplay.textContent=(`Time: ${time}s`);
        if(time===0){
            clearInterval(timer);
            if(currentIndex !== questions.length-1){
                NextQuestion.click();
            };
        }
    },1000);
    progress.textContent=(`Question: ${currentIndex+1}/${questions.length}`)
    Question.textContent = currentQuestion.question;
    Answer1.textContent = currentQuestion.options[0];
    Answer2.textContent = currentQuestion.options[1];
    Answer3.textContent = currentQuestion.options[2];
    Answer4.textContent = currentQuestion.options[3];
}

view();

function defaul() {
    Answer1.style.backgroundColor = "rgb(105, 105, 103)";
    Answer2.style.backgroundColor = "rgb(105, 105, 103)";
    Answer3.style.backgroundColor = "rgb(105, 105, 103)";
    Answer4.style.backgroundColor = "rgb(105, 105, 103)";
}

defaul();

NextQuestion.addEventListener("click", function () {
    defaul();
    stillAnsweredQuestion = false;
    currentIndex += 1;
    currentQuestion = shuffledQuestions[currentIndex];
    view();

    if (currentIndex === questions.length - 1) {
        scores.textContent=(`${score}/${questions.length}`)
        NextQuestion.style.display = "none";
        restart.style.display = "block";
    }
});

document.querySelectorAll(".answer").forEach(function (button) {
    button.addEventListener("click", function () {

        if (stillAnsweredQuestion === true) {
            return;
        }





        if (button.textContent === currentQuestion.correctAnswer) {
            button.style.backgroundColor = "green";
            score += 1;
        } else {
            button.style.backgroundColor = "red";
        }

        if (currentIndex === questions.length - 1) {
            scores.textContent = `Score: ${score}/${questions.length}`;
        }

        stillAnsweredQuestion = true;
    });
});

restart.style.display = "none";

restart.addEventListener("click", function () {
    shuffledQuestions=[...questions];
    i=0;
    while (i < shuffledQuestions.length) {
        let randomIndex = Math.floor(Math.random() * shuffledQuestions.length);
        temp=shuffledQuestions[i];
        shuffledQuestions[i]=shuffledQuestions[randomIndex];
        shuffledQuestions[randomIndex]=temp;
        i=i+1;
}

    currentIndex = 0;
    currentQuestion = shuffledQuestions[currentIndex];
    restart.style.display = "none";
    score = 0;
    stillAnsweredQuestion = false;
    NextQuestion.style.display = "block";
    view();
    defaul();
    scores.textContent = "";
});
