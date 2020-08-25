const people = [
  { name: 'Autumn', city: 'Durham' },
  { name: 'Parker', city: 'Raleigh' },
  { name: 'Kerry', city: 'Durham' }
]

findPeopleByCity('Durham', people)
// [
//   {name: "Autumn", city: "Durham"},
//   {name: "Kerry", city: "Durham"},
// ]

findPeopleByCity('Raleigh', people)
// [{name: "Parker", city: "Raleigh"}]

function findPeopleByCity (city, people) {
  const peopleInCity = []
  // look through each person
  for (const person of people) {
  // look at the city for that person
  // if the person's city equals the city we're looking for
    if (person.city === city) {
      // keep that person
      peopleInCity.push(person)
    }
  }

  return peopleInCity
}

function getPeopleByCity (people) {
  // make an empty object
  const peopleByCity = {}

  // go through the list of people
  // for each person, get their city

  for (const person of people) {
    const city = person.city

    // if that city is in our object, put that person into that city
    // otherwise, add that city to our object with a new array and add that person to the array
    if (peopleByCity[city] === undefined) {
      peopleByCity[city] = []
    }
    peopleByCity[city].push(person)
  }

  return peopleByCity
}

// Jameel: "put it into a stack called Clayton b/c later we might want to find people in Clayton"
