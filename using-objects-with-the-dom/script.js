/* eslint-disable prefer-const, no-unused-vars */

function renderPageContent () {
  let ulElement = document.querySelector('#menu-items')

  for (let item of menuItems) {
    // 1. make li
    let listElement = document.createElement('li')

    // 2. make img
    let imageEl = createImageElement(item.imgUrl)

    // 3. put the img element inside the li element
    listElement.appendChild(imageEl)
    console.log(listElement)

    // 4. put the li (with the img inside it) into the ul element
    ulElement.appendChild(listElement)
  }
}

function createImageElement (url) {
  let imageEl = document.createElement('img')
  // give img a src attribute that is a url
  // we get that url from the first object in the array of objects
  imageEl.src = url
  return imageEl
}

renderPageContent()
