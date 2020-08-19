function fizzBuzz (max) {
  let nums = makeNumberList(max)
  nums = replaceDivisibleNumbersWithString(nums, 15, 'FizzBuzz')
  nums = replaceDivisibleNumbersWithString(nums, 3, 'Fizz')
  nums = replaceDivisibleNumbersWithString(nums, 5, 'Buzz')
  return nums
}

function replaceDivisibleNumbersWithString (numbers, divider, string) {
  const replace = function (num) {
    if (num % divider === 0) {
      return string
    } else {
      return num
    }
  }
  return numbers.map(replace)
}

function makeNumberList (max) {
  const nums = []
  for (let num = 1; num <= max; num++) {
    nums.push(num)
  }
  return nums
}

let runButton = document.querySelector('#run')
runButton.addEventListener('click', function () {
  let maxValue = document.querySelector('#max').value
  let numbers = fizzBuzz(maxValue)
  let output = document.querySelector('.output')
  output.innerHTML = ''
  for (let num of numbers) {
    output.innerHTML += '<p>' + num + '</p>'
  }
})
