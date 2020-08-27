let currentQuestion
let questions
let numOfQuestions = 0
let numCorrect = 0

window.addEventListener('load', function () {
  loadTriviaQuestion()

  const answersEl = document.querySelector('#answers')
  answersEl.addEventListener('click', function (event) {
    if (event.target.matches('.answer') && currentQuestion) {
      if (currentQuestion.correct_answer === event.target.innerHTML) {
        numCorrect += 1
      }
      numOfQuestions += 1
      updateScore()

      if (questions.length > 0) {
        showNextQuestion()
      } else {
        document.querySelector('#question').innerHTML = 'Game over!'
        document.querySelector('#answers').innerHTML = ''
      }
    }
  })
})

function shuffleArray (array) {
  array = array.slice()
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

function updateScore () {
  document.querySelector('#score').textContent = `${numCorrect} / ${numOfQuestions}`
}

function showNextQuestion () {
  currentQuestion = questions.pop()
  displayTriviaQuestion(currentQuestion)
}

function loadTriviaQuestion () {
  // `fetch` sends a request to another web server
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  fetch('https://opentdb.com/api.php?amount=10&category=18')
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      questions = data.results
      showNextQuestion()
    })
}

function displayTriviaQuestion (question) {
  const questionEl = document.querySelector('#question')
  questionEl.innerHTML = question.question

  const answersEl = document.querySelector('#answers')
  let answers = [makeAnswerHTML(question.correct_answer)]
  for (const answer of question.incorrect_answers) {
    answers.push(makeAnswerHTML(answer))
  }

  answers = shuffleArray(answers)

  answersEl.innerHTML = answers.join('')
}

function makeAnswerHTML (answer) {
  return '<div class="answer br2 pa3 f3 bg-light-blue grow mv1 hover-bg-light-green">' + answer + '</div>'
}
