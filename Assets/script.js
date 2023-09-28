// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {
  // Dynamically create time blocks
  // What I need to know about each container
  // past, present, future are classes
  // every hour has it's own id
  // things that are the same in every block
  // <div class="col-2 col-md-1 hour text-center py-3">
  // <textarea class="col-8 col-md-10 description" rows="3">
  // <button class="btn saveBtn col-2 col-md-1" aria-label="save"></button>
  var timeBlocksContainer = $('#timeBlocksContainer'); // Get the container
  // TODO:
  // Loop through all the hours 9-17 (24 hour format)
  // Start Loop
  // Create the time block for each hour
  // Create the hour text and determine AM or PM
  // Create the textarea
  // Create the save button
  // append all
  // End Loop
  
  // Loop through each hour from 9AM to 5PM
  for (var hour = 9; hour <= 17; hour++) {
    // Create the time block for each hour
    var timeBlock = $('<div>', {
      id: 'hour-' + hour,
      class: 'row time-block',
    });

    // Create the hour text and determine AM or PM
    var hourText;
    if (hour > 12) {
      hourText = hour - 12 + 'PM';
    } else {
      hourText = hour + 'AM';
    }
    
    var hourDiv = $('<div>', {
      class: 'col-2 col-md-1 hour text-center py-3',
      text: hourText,
    });
    hourDiv.text(hourText);

    // Create the textarea
    var textarea = $('<textarea>', {
      class: 'col-8 col-md-10 description',
      rows: 3,
    });

    // Create the save button
    var saveBtn = $('<button>', {
      class: 'btn saveBtn col-2 col-md-1',
      'aria-label': 'save',
      html: '<i class="fas fa-save" aria-hidden="true"></i>',
    });

    // Append elements to the time block
    timeBlock.append(hourDiv, textarea, saveBtn);

    // Append the time block to the container
    timeBlocksContainer.append(timeBlock);
  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // Need to save to the local storage
  // I need to save the location of the description as well as the description
  $('.saveBtn').on('click', function() {
    var id = $(this).closest('.time-block').attr('id'); // Get the time-block ID
    var description = $(this).siblings('.description').val(); // Get the user input
    localStorage.setItem(id, description); // Save to local storage
  });
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

    // Get the current hour in 24-hour format
    var currentHour = dayjs().hour();

    // Loop through each time block and update the time block depending on current hour
    $('.time-block').each(function() {
      // Convert the timeblock time into an integer
      // to find this i need to look for an id and split the hour-(int)
      var blockHour = parseInt($(this).attr('id').split('-')[1]);
      // add an if statement to compare the current hour to the block hour
      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // for each time-block ID I want to find every description class and pass the value of description which is the stored in storage
  $('.time-block').each(function() {
    var id = $(this).attr('id');
    var description = localStorage.getItem(id);
    $(this).find('.description').val(description);
  });
  //
  // TODO: Add code to display the current date in the header of the page.
  var currentDate = dayjs().format('MMMM D, YYYY');
  $('#currentDay').text('Today is ' + currentDate);
});
