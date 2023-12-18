let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Justin Bieber",
        "answer_4": "Tim Berners-Lee",
        "right_answer": 4
    },
    {
        "question": "Was heißt HTML ausgesprochen?",
        "answer_1": "Horse Toe",
        "answer_2": "HotMail",
        "answer_3": "HyperText Markup Language",
        "answer_4": "How to Make Lasagna",
        "right_answer": 3
    },
    {
        "question": "Was macht der Tag < br >?",
        "answer_1": "Text kursiv",
        "answer_2": "Die Zeile brechen",
        "answer_3": "Ein Input Feld",
        "answer_4": "Text Fett",
        "right_answer": 2
    },
    {
        "question": "Was macht der Tag < br >?",
        "answer_1": "Text kursiv",
        "answer_2": "Die Zeile brechen",
        "answer_3": "Ein Input Feld",
        "answer_4": "Text Fett",
        "right_answer": 2
    },
    {
        "question": "Was macht der Tag < br >?",
        "answer_1": "Text kursiv",
        "answer_2": "Die Zeile brechen",
        "answer_3": "Ein Input Feld",
        "answer_4": "Text Fett",
        "right_answer": 2
    },
    {
        "question": "Was macht der Tag < br >?",
        "answer_1": "Text kursiv",
        "answer_2": "Die Zeile brechen",
        "answer_3": "Ein Input Feld",
        "answer_4": "Text Fett",
        "right_answer": 2
    }
];


let currentQuestion = 0;
let correctQuestion = 0;
let soundSuccess = new Audio('sounds/success.mp3');
let soundWrong = new Audio('sounds/wrong.mp3');


function init() {
    document.getElementById('question-length').innerHTML = questions.length;
    document.getElementById('current-question').innerHTML = currentQuestion + 1;

    showQuestion();
}


function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    } else {
        updateProgressbar();
        showNextQuestion();
    }
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}


function showEndscreen() {
    document.getElementById('card-content-quiz').classList.add('hide');
    document.getElementById('card-content-endscreen').classList.remove('hide');
    document.getElementById('final-score').innerHTML = `${correctQuestion}/${questions.length}`;
}


function updateProgressbar() {
    let percent = (currentQuestion + 1) / questions.length * 100;

    document.getElementById('progress-bar').innerHTML = `${percent.toFixed(0)}%`;
    document.getElementById('progress-bar').style = `width: ${percent.toFixed(0)}%;`;
}


function showNextQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('question-text').innerHTML = question.question;
    document.getElementById('answer_1').innerHTML = question.answer_1;
    document.getElementById('answer_2').innerHTML = question.answer_2;
    document.getElementById('answer_3').innerHTML = question.answer_3;
    document.getElementById('answer_4').innerHTML = question.answer_4;
}


function answer(answer) {
    let answerNumber = answer.slice(-1); // nimmt nur den letzten Character aus dem String
    let question = questions[currentQuestion];
    let rightAnswer = `answer_${question.right_answer}`

    if (answerNumber == question.right_answer) {
        showRightAnswer(answer);
    } else {
        showWrongAnswer(rightAnswer, answer);
    }
    enableButtonNext();
    disableAnswer();
}


function showRightAnswer(answer) {
    document.getElementById(answer).parentNode.classList.add('bg-success');
    soundSuccess.play();
    correctQuestion++;
}


function showWrongAnswer(rightAnswer, answer) {
    document.getElementById(answer).parentNode.classList.add('bg-danger');
    document.getElementById(rightAnswer).parentNode.classList.add('bg-success');
    soundWrong.play();
}


function enableButtonNext() {
    document.getElementById('next-button').disabled = false;
}


function disableButtonNext() {
    document.getElementById('next-button').disabled = true;
}


function disableAnswer() {
    document.getElementById('answer_1').parentNode.onclick = null;
    document.getElementById('answer_2').parentNode.onclick = null;
    document.getElementById('answer_3').parentNode.onclick = null;
    document.getElementById('answer_4').parentNode.onclick = null;
    document.getElementById('answer-1').classList.remove('answer-container-hover')
    document.getElementById('answer-2').classList.remove('answer-container-hover')
    document.getElementById('answer-3').classList.remove('answer-container-hover')
    document.getElementById('answer-4').classList.remove('answer-container-hover')
}


function enableAnswer() {
    document.getElementById('answer_1').parentNode.onclick = () => { answer('answer_1'); };
    document.getElementById('answer_2').parentNode.onclick = () => { answer('answer_2'); };
    document.getElementById('answer_3').parentNode.onclick = () => { answer('answer_3'); };
    document.getElementById('answer_4').parentNode.onclick = () => { answer('answer_4'); };
    document.getElementById('answer-1').classList.add('answer-container-hover')
    document.getElementById('answer-2').classList.add('answer-container-hover')
    document.getElementById('answer-3').classList.add('answer-container-hover')
    document.getElementById('answer-4').classList.add('answer-container-hover')
}


function nextQuestion() {
    currentQuestion++;
    disableButtonNext();
    resetAnswer();
    enableAnswer();
    init();
}


function resetAnswer() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restartGame() {
    currentQuestion = 0;
    correctQuestion = 0;
    document.getElementById('card-content-quiz').classList.remove('hide');
    document.getElementById('card-content-endscreen').classList.add('hide');
    init();
}