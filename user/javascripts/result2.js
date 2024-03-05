const quizData = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Paris',
    },
    {
        question: 'What is the largest planet in our solar system?',
        options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'],
        answer: 'Jupiter',
      },
      {
        question: 'Which country won the FIFA World Cup in 2018?',
        options: ['Brazil', 'Germany', 'France', 'Argentina'],
        answer: 'France',
      },
      {
        question: 'What is the tallest mountain in the world?',
        options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
        answer: 'Mount Everest',
      },
      {
        question: 'Which is the largest ocean on Earth?',
        options: [
          'Pacific Ocean',
          'Indian Ocean',
          'Atlantic Ocean',
          'Arctic Ocean',
        ],
        answer: 'Pacific Ocean',
      },
      {
        question: 'What is the chemical symbol for gold?',
        options: ['Au', 'Ag', 'Cu', 'Fe'],
        answer: 'Au',
      },
      {
        question: 'Who painted the Mona Lisa?',
        options: [
          'Pablo Picasso',
          'Vincent van Gogh',
          'Leonardo da Vinci',
          'Michelangelo',
        ],
        answer: 'Leonardo da Vinci',
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
        answer: 'Mars',
      },
      {
        question: 'What is the largest species of shark?',
        options: [
          'Great White Shark',
          'Whale Shark',
          'Tiger Shark',
          'Hammerhead Shark',
        ],
        answer: 'Whale Shark',
      },
      {
        question: 'Which animal is known as the King of the Jungle?',
        options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
        answer: 'Lion',
      },
    // Các câu hỏi khác ở đây...
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
const timerDisplay = document.getElementById('timer');
const goHomeButton = document.getElementById('goHome');
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
let timeLeft = 1500; // 25 minutes in seconds

let showAnswerState = false;

// function showAnswer() {
//   if (showAnswerState) {
//     hideAnswer();
//   } else {
//     displayAnswer();
//   }
// }

function displayAnswer() {
  checkAnswer();
  showAnswerButton.textContent = 'Hide Answer';
  showAnswerState = true;
}

function hideAnswer() {
  resultContainer.innerHTML = '';
  showAnswerButton.textContent = 'Show Answer';
  showAnswerState = false;
}

function startTimer() {
  const timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerDisplay.textContent = `${minutes}:${seconds}`;
    
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      checkAnswer();
      alert('Hết giờ làm bài')
    } else {
      timeLeft--;
    }
  }, 1000);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestions() {
  quizContainer.innerHTML = ''; // Xóa nội dung hiện tại của container
  for (let i = 0; i < quizData.length; i++) {
    const questionData = quizData[i];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let j = 0; j < shuffledOptions.length; j++) {
      const option = document.createElement('label');
      option.className = 'option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `quiz_${i}`; // Mỗi nhóm radio buttons có một tên duy nhất
      radio.value = shuffledOptions[j];

      const optionText = document.createTextNode(shuffledOptions[j]);

      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }

    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
}

function checkAnswer() {
  // alert("Hết giờ làm bài");
  if(!showAnswerState){
    const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');

    selectedOptions.forEach(selectedOption => {
      const questionIndex = parseInt(selectedOption.name.split('_')[1]);
      const answer = selectedOption.value;

      if (answer === quizData[questionIndex].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[questionIndex].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[questionIndex].answer,
        });
      }
    });
  }
  showAnswerState = true;
  displayResult();
}

function displayResult() {
  if(showAnswerState){
    document.getElementById("timer").style.display="none"
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    goHomeButton.style.display = 'inline-block'
    // Document.getElementById('goHome').style.display = 'inline-block';
    // retryButton.style.display = 'inline-block';
    // showAnswerButton.style.display = 'inline-block';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < quizData.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${quizData[i].question}<br>
          <strong>Correct Answer:</strong> ${quizData[i].correctAnswer}
        </p>
      `;
    }
    // resultContainer.innerHTML = `
    //   <p>You scored ${score} out of ${quizData.length}!</p>
    // `;
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
}
function showAnswer() {
  checkAnswer();
  showAnswerState = true;
  // displayResult2();
  displayResult();
}

submitButton.addEventListener('click', checkAnswer);
// retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestions();
startTimer();




function displayResult2() {
  if(showAnswerState){
    document.getElementById("timer").style.display="none"
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    goHomeButton.style.display = 'inline-block'
    // Document.getElementById('goHome').style.display = 'inline-block';
    // retryButton.style.display = 'inline-block';
    // showAnswerButton.style.display = 'inline-block';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
    // resultContainer.innerHTML = `
    //   <p>You scored ${score} out of ${quizData.length}!</p>
    // `;
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
}