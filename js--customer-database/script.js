function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function createElement (tagName, options) {
  const element = document.createElement(tagName)
  if (options.className) {
    element.classList.add(options.className)
  }
  if (options.html) {
    element.innerHTML = options.html
  } else if (options.text) {
    element.textContent = options.text
  }

  return element
}

function createCustomerElement (customer) {
  const customerName = capitalizeFirstLetter(customer.name.first) + ' ' + capitalizeFirstLetter(customer.name.last)

  const customerDiv = document.createElement('div')
  customerDiv.classList.add('customer')

  const customerImgDiv = document.createElement('div')
  customerDiv.appendChild(customerImgDiv)

  const customerImg = document.createElement('img')
  customerImgDiv.appendChild(customerImg)

  customerImg.classList.add('customer__img')
  customerImg.src = customer.picture.large
  customerImg.alt = customerName

  const customerNameDiv = createElement('h2', {
    className: 'customer__name',
    text: customerName
  })
  customerDiv.appendChild(customerNameDiv)

  const customerEmail = createElement('div', {
    className: 'customer__email',
    text: customer.email
  })
  customerDiv.appendChild(customerEmail)

  const customerAddress = createElement('div', {
    className: 'customer__address',
    html: customer.location.street + '<br>' + customer.location.city + ', ' +
      nameToAbbr(customer.location.state) + ' ' + customer.location.postcode
  })
  customerDiv.appendChild(customerAddress)

  const customerDOB = moment(customer.dob)
  const customerDOBDiv = createElement('div', {
    text: 'DOB: ' + customerDOB.format('MMM D, YYYY')
  })
  customerDiv.appendChild(customerDOBDiv)

  const customerSince = moment(customer.registered)
  const customerSinceDiv = createElement('div', {
    text: 'Customer since: ' + customerSince.format('MMM D, YYYY')
  })
  customerDiv.appendChild(customerSinceDiv)

  return customerDiv
}

const customerList = document.querySelector('.customer-list')

for (const customer of customers) {
  const customerElement = createCustomerElement(customer)
  customerList.appendChild(customerElement)
}
