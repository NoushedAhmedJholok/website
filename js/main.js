const today = new Date();
  let currentMonthOffset = 0;
  let selectedStartDate = null;
  let selectedEndDate = null;

  // Example icon configuration
  const dateIcons = {
    '2024-09-05': 'icon-down', // Specific date range with down arrow
    '2024-09-06': 'icon-down',
    '2024-09-07': 'icon-down',
    '2024-09-08': 'icon-down',
    '2024-09-09': 'icon-down',
    '2024-09-10': 'icon-down',
    '2024-09-15': 'icon-up', // Specific dates with up arrow
    '2024-09-20': 'icon-up'
  };

  function generateCalendar(monthOffset, elementId, titleId) {
    const date = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const month = date.getMonth();
    const year = date.getFullYear();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDayIndex = new Date(year, month, daysInMonth).getDay();
    
    const prevMonthDays = new Date(year, month, 0).getDate(); // Days in the previous month
    const nextMonthDays = 6 - lastDayIndex; // Days in the next month

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
      dayDiv.textContent = day;
      dayDiv.dataset.date = `${year}-${month + 1}-${day}`;
      
      const currentDate = new Date(year, month, day);

      if (currentDate < today) {
        dayDiv.classList.add('disabled-date'); // Disable past dates
      } else {
        dayDiv.addEventListener('click', function() {
          handleDateSelection(currentDate);
        });
      }

      // Add icon or no-icon class
      const iconDiv = document.createElement('div');
      iconDiv.classList.add('icon');
      const iconType = dateIcons[dayDiv.dataset.date];
      if (iconType) {
        iconDiv.classList.add(iconType);
        dayDiv.classList.add('icon-date');
      } else {
        dayDiv.classList.add('no-icon');
      }
      dayDiv.appendChild(iconDiv);
      calendarBody.appendChild(dayDiv);
    }

    // Fill the cells for next month's dates
    for (let day = 1; day <= nextMonthDays; day++) {
      const nextDateDiv = document.createElement('div');
      nextDateDiv.textContent = day;
      nextDateDiv.classList.add('prev-next-month');
      calendarBody.appendChild(nextDateDiv);
    }
  }

  function handleDateSelection(date) {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      selectedStartDate = date;
      selectedEndDate = null;
    } else if (selectedStartDate && !selectedEndDate && date > selectedStartDate) {
      selectedEndDate = date;
    } else {
      selectedStartDate = date;
      selectedEndDate = null;
    }

    updateCalendar();
    displayBookingInfo();
    updateFormFields();
  }

  function updateCalendar() {
    document.querySelectorAll('.calendar-body div').forEach(div => {
      const divDate = new Date(div.dataset.date);
      if (divDate) {
        if (divDate.getTime() === selectedStartDate?.getTime()) {
          div.classList.add('selected-start-end');
          div.classList.remove('selected-range');
        } else if (divDate.getTime() === selectedEndDate?.getTime()) {
          div.classList.add('selected-start-end');
          div.classList.remove('selected-range');
        } else if (selectedStartDate && selectedEndDate && divDate > selectedStartDate && divDate < selectedEndDate) {
          div.classList.add('selected-range');
        } else {
          div.classList.remove('selected-start-end', 'selected-range');
        }
      }
    });
  }

  function displayBookingInfo() {
    const infoDiv = document.getElementById('bookingInfo');
    if (selectedStartDate && selectedEndDate) {
      infoDiv.textContent = `Your booking is from ${selectedStartDate.toLocaleDateString()} to ${selectedEndDate.toLocaleDateString()}.`;
    } else if (selectedStartDate) {
      infoDiv.textContent = `You have selected ${selectedStartDate.toLocaleDateString()} as your start date.`;
    } else {
      infoDiv.textContent = 'Please select your booking dates.';
    }
  }

  function updateFormFields() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    if (selectedStartDate) {
      startDateInput.value = selectedStartDate.toLocaleDateString();
    }
    if (selectedEndDate) {
      endDateInput.value = selectedEndDate.toLocaleDateString();
    }
  }

  document.getElementById('prevMonth').addEventListener('click', function() {
    if (currentMonthOffset > 0) {
      currentMonthOffset--;
      generateCalendar(currentMonthOffset, 'currentMonthBody1', 'currentMonthTitle1');
      generateCalendar(currentMonthOffset + 1, 'currentMonthBody2', 'currentMonthTitle2');
    }
  });

  document.getElementById('nextMonth').addEventListener('click', function() {
    currentMonthOffset++;
    generateCalendar(currentMonthOffset, 'currentMonthBody1', 'currentMonthTitle1');
    generateCalendar(currentMonthOffset + 1, 'currentMonthBody2', 'currentMonthTitle2');
  });

  generateCalendar(0, 'currentMonthBody1', 'currentMonthTitle1'); // Generate current month
  generateCalendar(1, 'currentMonthBody2', 'currentMonthTitle2'); // Generate next month