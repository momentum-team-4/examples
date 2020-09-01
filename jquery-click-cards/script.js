// add two cards to page
// when a card is clicked, check if both have been clicked
// if not, do nothing
// if so, let me know both have been clicked

$(document).ready(function () {
  $('#cards')
    .append("<div id='card-1' data-animal='antelope' class='card'></div>")
    .append("<div id='card-2' data-animal='possum' class='card'></div>")

  $('.card').on('click', function (event) {
    $(event.target).toggleClass('clicked')

    if ($('.clicked').length === 2) {
      console.log("both clicked!")
    }
  })
})
