/* globals fetch, moment */

// === constant selected elements ===
const moodLabel = document.querySelector('#mood-label')
const moodInput = document.querySelector('#mood')
const moodsDiv = document.querySelector('#moods')
const newMoodForm = document.querySelector('#new-mood-form')

// === event listeners ===

window.addEventListener('load', function () {
  // set initial mood label emoji
  setMoodLabel()

  // when I load the page, get the list of moods from the API
  //  - then display them at the bottom of the page
  fetch('http://localhost:3000/moods/')
    .then(res => res.json())
    .then(moodRecords => {
      console.log(moodRecords)
      const moodEls = moodRecords.map(mood => createMoodEl(mood))
      console.log(moodEls)

      for (const el of moodEls) {
        addToMoodsDiv(el)
      }
    })
})

// make emoji on label change when I change the mood input
moodInput.addEventListener('input', setMoodLabel)

// store mood when I submit the new mood form

//  - update the list of previous moods at the bottom of page
// STOP HERE
newMoodForm.addEventListener('submit', function (event) {
  event.preventDefault()
  //  - send a request to the API to save the mood
  fetch('http://localhost:3000/moods/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mood: moodInput.value,
      datetime: moment().format('YYYY-MM-DD HH:mm')
    })
  })
    .then(r => r.json())
    .then(newMoodEntry => {
      const newMoodEl = createMoodEl(newMoodEntry)
      addToMoodsDiv(newMoodEl)
    })
})

// ==== helper functions ===

function getMoodEmoji (moodLevel) {
  const moodEmojis = [
    '😢', // 1
    '🙁', // 2
    '😐', // 3
    '🙂', // 4
    '😁' // 5
  ]

  return moodEmojis[moodLevel - 1]
}

function setMoodLabel () {
  const currentMoodLevel = moodInput.value
  moodLabel.textContent = getMoodEmoji(currentMoodLevel)
}

function createMoodEl (mood) {
  /* mood is an object like:
  {
    id: 7,
    mood: 3,
    datetime: "2020-08-27 16:29"
  }

  The final element looks like
  <div id="mood-7" class="pa2 bg-light-blue f3 flex justify-between mv2">
    <div>Aug 27 4:29 PM</div>
    <div>
      <button class="f5 bg-red white br3 ph3 pv2 mb2 pointer">Delete</button>
    </div>
    <div>😐</div>
  </div>
  */
  const el = document.createElement('div')
  el.id = 'mood-' + mood.id
  el.classList.add('pa2', 'bg-light-blue', 'f3', 'flex', 'justify-between', 'mv2')

  let div = document.createElement('div')
  div.textContent = moment(mood.datetime).format('MMM D h:mm A')
  el.appendChild(div)

  div = document.createElement('div')
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('f5', 'bg-red', 'white', 'br3', 'ph3', 'pv2', 'mb2', 'white', 'pointer')
  deleteButton.textContent = 'Delete'

  deleteButton.addEventListener('click', function () {
    deleteMoodEntry(mood.id)
  })

  div.appendChild(deleteButton)
  el.appendChild(div)

  div = document.createElement('div')
  div.textContent = getMoodEmoji(mood.mood)
  el.appendChild(div)

  return el
}

function addToMoodsDiv (moodEl) {
  moodsDiv.appendChild(moodEl)
}

function deleteMoodEntry (moodId) {
  // send a request to the API to delete this entry
  fetch('http://localhost:3000/moods/' + moodId, {
    method: 'DELETE'
  })
    .then(res => {
    // then remove the element with the id mood-(moodId) from the DOM
      if (res.status === 200) {
        const moodEl = document.querySelector('#mood-' + moodId)
        moodEl.remove()
      }
    })
}
