const form = document.querySelector('#tracker-form')

function makeTableRow (entries) {
  const row = document.createElement('tr')
  for (const entry of entries) {
    row.appendChild(makeTableCell(entry))
  }
  return row
}

function makeTableCell (text) {
  const cell = document.createElement('td')
  cell.textContent = text
  return cell
}

function addTimeEntry (client, startTime, endTime, description) {
  const entriesTableBody = document.querySelector('#time-entries tbody')
  const row = makeTableRow([client, startTime, endTime, description])
  entriesTableBody.appendChild(row)
}

function resetForm () {
  form.reset()
  document.querySelector('#client').focus()
}

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const client = document.querySelector('#client').value
  const startTime = document.querySelector('#start-time').value
  const endTime = document.querySelector('#end-time').value
  const description = document.querySelector('#description').value

  addTimeEntry(client, startTime, endTime, description)
  resetForm()
})

const endInput = document.querySelector('#end-time')
const timeInputs = document.querySelectorAll('.time-input')
for (const input of timeInputs) {
  input.addEventListener('change', function () {
    const startTime = document.querySelector('#start-time').value
    const endTime = document.querySelector('#end-time').value
    if (startTime !== '' && endTime !== '' && startTime >= endTime) {
      endInput.setCustomValidity('End time must be after start time.')
    } else {
      endInput.setCustomValidity('')
    }
  })
}
