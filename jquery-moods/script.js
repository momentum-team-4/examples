/* globals fetch, $, moment */

// when I load the page, get the list of moods from the API
//  - then display them at the bottom of the page

// // === constant selected elements ===
const $moodLabel = $('#mood-label')
const $moodInput = $('#mood')
const $moodsDiv = $('#moods')
const $newMoodForm = $('#new-mood-form')

$(document).ready(function () {
  $('#activities').selectize()

  setMoodLabel()
  $moodInput.on('input', setMoodLabel)

  fetch('http://localhost:3000/moods')
    .then(res => res.json())
    .then(moodRecords => {
      // take each record and add it to the page
      const moodEls = moodRecords.map(mood => createMoodEl(mood))
      moodEls.reverse()
      $moodsDiv.append(moodEls)
    })
})

$newMoodForm.on('submit', function (event) {
  event.preventDefault()
  //  - send a request to the API to save the mood
  fetch('http://localhost:3000/moods/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mood: $moodInput.val(),
      datetime: moment().format('YYYY-MM-DD HH:mm')
    })
  })
    .then(r => r.json())
    .then(newMoodEntry => {
      const newMoodEl = createMoodEl(newMoodEntry)
      $moodsDiv.prepend(newMoodEl)
    })
})

function setMoodLabel () {
  $moodLabel.html(getMoodEmoji($moodInput.val()))
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

  const deleteButton = $('<button class="f5 bg-red white br3 ph3 pv2 mb2 pointer">Delete</button>')
    .on('click', function () {
      deleteMoodEntry(mood.id)
    })

  const el = $('<div></div>')
    .addClass('pa2 bg-light-blue f3 flex justify-between mv2')
    .attr('id', 'mood-' + mood.id)
    .append($('<div>' + moment(mood.datetime).format('MMM D h:mm A') + '</div>'))
    .append($('<div></div>').append(deleteButton))
    .append($('<div>' + getMoodEmoji(mood.mood) + '</div>'))

  return el
}

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
