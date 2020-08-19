function fizzBuzz (max) {
  let nums = makeNumberList(max)
  nums = replaceDivisibleNumbersWithString(nums, 15, 'FizzBuzz')
  nums = replaceDivisibleNumbersWithString(nums, 3, 'Fizz')
  nums = replaceDivisibleNumbersWithString(nums, 5, 'Buzz')
  return nums
}

function replaceDivisibleNumbersWithString (numbers, divider, string) {
  let replace = function (num) {
    if (num % divider === 0) {
      return string
    } else {
      return num
    }
  }
  return numbers.map(replace)
}

function makeNumberList (max) {
  let nums = []
  for (let num = 1; num <= max; num++) {
    nums.push(num)
  }
  return nums
}

console.log(fizzBuzz(100))
