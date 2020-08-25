const moods = [
  {
    date: new Date('2020-02-14T09:00'),
    mood: 'sad',
    activities: ['eating alone', 'watching TV']
  },
  {
    date: new Date('2020-02-14T14:00'),
    mood: 'happy',
    activities: ['talking with friend']
  },
  {
    date: new Date('2020-02-13T10:10'),
    mood: 'nervous',
    activities: ['studying']
  },
  {
    date: new Date('2020-02-15T11:10'),
    mood: 'happy',
    activities: ['talking with friend']
  }
]

const moodsDiv = document.querySelector('#moods')

const moodsTable = document.createElement('table')
moodsDiv.appendChild(moodsTable)

const thead = document.createElement('thead')
moodsTable.appendChild(thead)

const headerRow = document.createElement('tr')
thead.appendChild(headerRow)

for (const heading of ['date', 'mood', 'activities']) {
  const headerCell = document.createElement('th')
  headerCell.textContent = heading
  headerRow.appendChild(headerCell)
}

const tbody = document.createElement('tbody')
moodsTable.appendChild(tbody)

for (const entry of moods) {
  const row = document.createElement('tr')
  tbody.appendChild(row)

  let cell
  cell = document.createElement('td')
  cell.textContent = entry.date.toString()
  row.appendChild(cell)

  cell = document.createElement('td')
  cell.textContent = entry.mood
  row.appendChild(cell)

  cell = document.createElement('td')
  cell.textContent = entry.activities.join(', ')
  row.appendChild(cell)
}
