document.addEventListener('DOMContentLoaded', function () {
  let currentMonthOffset = 0;
  let selectedStartDate = null;
  let selectedEndDate = null;

  const today = new Date();

  // Function to format the date as yyyy-mm-dd for comparison
  function formatDateForComparison(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }

  // Function to update the calendar with date selection
  function handleDateSelection(date) {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Set the start date if no dates are selected or both start and end dates are already selected
      selectedStartDate = date;
      selectedEndDate = null;
      document.getElementById('startDate').value = formatDateForComparison(selectedStartDate);
      document.getElementById('endDate').value = ''; // Clear end date
    } else if (selectedStartDate && !selectedEndDate && date > selectedStartDate) {
      // Set the end date if it's after the start date
      selectedEndDate = date;
      document.getElementById('endDate').value = formatDateForComparison(selectedEndDate);
    } else {
      // Reset if invalid selection
      selectedStartDate = date;
      selectedEndDate = null;
      document.getElementById('startDate').value = formatDateForComparison(selectedStartDate);
      document.getElementById('endDate').value = '';
    }

    updateCalendar(); // Update both months' calendars
    displayBookingInfo(); // Show the selected booking info
  }

  // Function to display booking info below the calendar
  function displayBookingInfo() {
    const infoDiv = document.getElementById('bookingInfo');
    if (selectedStartDate && selectedEndDate) {
      infoDiv.textContent = `Your booking is from ${formatDateForComparison(selectedStartDate)} to ${formatDateForComparison(selectedEndDate)}.`;
    } else if (selectedStartDate) {
      infoDiv.textContent = `You have selected ${formatDateForComparison(selectedStartDate)} as your check-in date.`;
    } else {
      infoDiv.textContent = 'Please select your booking dates.';
    }
  }

  // Generate the calendar for a specific month
  function generateCalendar(monthOffset, elementId, titleId) {
    const date = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const month = date.getMonth();
    const year = date.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDayIndex = new Date(year, month, daysInMonth).getDay();

    const prevMonthDays = new Date(year, month, 0).getDate();
    const nextMonthDays = 6 - lastDayIndex;

    document.getElementById(titleId).textContent = date.toLocaleDateString('default', { month: 'long', year: 'numeric' });

    const calendarBody = document.getElementById(elementId);
    calendarBody.innerHTML = '';

    // Fill the cells for previous month's dates
    for (let i = firstDayIndex; i > 0; i--) {
      const prevDateDiv = document.createElement('div');
      prevDateDiv.textContent = prevMonthDays - i + 1;
      prevDateDiv.classList.add('prev-next-month');
      calendarBody.appendChild(prevDateDiv);
    }

    // Fill the cells for the current month's dates
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = document.createElement('div');
      const dateParagraph = document.createElement('p');
      dateParagraph.textContent = day;
      dayDiv.appendChild(dateParagraph);

      const currentDate = new Date(year, month, day);
      dayDiv.dataset.date = `${year}-${month + 1}-${day}`;

      if (currentDate < today) {
        dayDiv.classList.add('disabled-date');
      } else {
        dayDiv.addEventListener('click', function() {
          handleDateSelection(currentDate);
        });
      }

      calendarBody.appendChild(dayDiv);
    }

    // Fill the cells for next month's dates
    for (let day = 1; day <= nextMonthDays; day++) {
      const nextDateDiv = document.createElement('div');
      nextDateDiv.textContent = day;
      nextDateDiv.classList.add('prev-next-month');
      calendarBody.appendChild(nextDateDiv);
    }

    updateCalendar(); // Update the selection styles
  }

  // Update the calendar selection UI, applied across all months
  function updateCalendar() {
    const allDivs = document.querySelectorAll('.calendar-body div');

    allDivs.forEach(div => {
      const divDate = new Date(div.dataset.date);

      // Clear all classes first
      div.classList.remove('selected-start-start', 'selected-start-end', 'selected-range');

      if (divDate) {
        // Apply selected-start-start class if it's the start date
        if (selectedStartDate && formatDateForComparison(divDate) === formatDateForComparison(selectedStartDate)) {
          div.classList.add('selected-start-start');
        }
        // Apply selected-start-end class if it's the end date
        if (selectedEndDate && formatDateForComparison(divDate) === formatDateForComparison(selectedEndDate)) {
          div.classList.add('selected-start-end');
        }
        // Apply selected-range class if the date is in between the start and end dates
        if (selectedStartDate && selectedEndDate && divDate > selectedStartDate && divDate < selectedEndDate) {
          div.classList.add('selected-range');
        }
      }
    });
  }

  // Event listeners for the previous and next month buttons
  document.getElementById('prevMonth').addEventListener('click', function() {
    currentMonthOffset--;
    generateCalendar(currentMonthOffset, 'currentMonthBody1', 'currentMonthTitle1');
    generateCalendar(currentMonthOffset + 1, 'currentMonthBody2', 'currentMonthTitle2');
  });

  document.getElementById('nextMonthDesktop').addEventListener('click', function() {
    currentMonthOffset++;
    generateCalendar(currentMonthOffset, 'currentMonthBody1', 'currentMonthTitle1');
    generateCalendar(currentMonthOffset + 1, 'currentMonthBody2', 'currentMonthTitle2');
  });

  document.getElementById('nextMonthMobile').addEventListener('click', function() {
    currentMonthOffset++;
    generateCalendar(currentMonthOffset, 'currentMonthBody1', 'currentMonthTitle1');
    generateCalendar(currentMonthOffset + 1, 'currentMonthBody2', 'currentMonthTitle2');
  });

  // Initial generation of calendars
  generateCalendar(0, 'currentMonthBody1', 'currentMonthTitle1');
  generateCalendar(1, 'currentMonthBody2', 'currentMonthTitle2');
});



// Toggle menu for .manu_profile_m
document.querySelector('.manu_profile_m').addEventListener('click', function() {
  this.classList.toggle('active');
});

// Toggle menu for .manu_profile
document.querySelector('.manu_profile').addEventListener('click', function(event) {
  event.stopPropagation();  // Prevents the click from propagating up
  this.classList.toggle('active');
});

// Close button to remove 'active' class
document.querySelector('.close-btn').addEventListener('click', function(event) {
  event.stopPropagation();  // Prevents bubbling to the .manu_profile click event
  document.querySelector('.manu_profile').classList.remove('active');
});

// Optional: Add a click listener to the document to close the menu when clicking outside
document.addEventListener('click', function(event) {
  const profileMenu = document.querySelector('.manu_profile');
  if (!profileMenu.contains(event.target)) {
    profileMenu.classList.remove('active');
  }
});