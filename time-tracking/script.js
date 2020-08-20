const form = document.querySelector('#tracker-form')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const client = document.querySelector('#client').value
  const startTime = document.querySelector('#start-time').value
  const endTime = document.querySelector('#end-time').value
  const description = document.querySelector('#description').value

  const entriesList = document.querySelector('#entries ul')
  const listItem = '<li>' + client + ' - ' + startTime + '/' + endTime + '</li>'
  entriesList.innerHTML += listItem
})
