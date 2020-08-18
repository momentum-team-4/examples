// FizzBuzz
// Go through the numbers from 1 to 100
// If the number is divisible by 15, print "FizzBuzz"
// If the number is divisible by 3, print "Fizz"
// If the number is divisible by 5, print "Buzz"
// Otherwise print the number

function fizzBuzz () {
  for (let num = 1; num <= 100; num++) {
    if (num % 15 === 0) {
      console.log('FizzBuzz')
    } else if (num % 3 === 0) {
      console.log('Fizz')
    } else if (num % 5 === 0) {
      console.log('Buzz')
    } else {
      console.log(num)
    }
  }
}
