document.getElementById('filter-btn').addEventListener('click', function () {
  var form = document.getElementById('mainForm');
  if (form.style.display === 'none' || form.style.display === '') {
      form.style.display = 'block'; // Show the form
  } else {
      form.style.display = 'none';  // Hide the form
  }
});

const minRange = document.getElementById('min-range');
const maxRange = document.getElementById('max-range');
const minAmount = document.getElementById('min-amount');
const maxAmount = document.getElementById('max-amount');
const minValueLabel = document.getElementById('min-value');
const maxValueLabel = document.getElementById('max-value');

// Update sliders and labels when dragged
minRange.addEventListener('input', updateFromSlider);
maxRange.addEventListener('input', updateFromSlider);

// Update the slider values when manually entered in the number input fields
minAmount.addEventListener('input', updateFromInput);
maxAmount.addEventListener('input', updateFromInput);

function updateFromSlider() {
    const minValue = parseInt(minRange.value);
    const maxValue = parseInt(maxRange.value);

    // Update the number input fields with the slider values
    minAmount.value = minValue;
    minValueLabel.innerText = `${minValue}`;

    maxAmount.value = maxValue;
    maxValueLabel.innerText = `${maxValue}`;

    // Ensure that minRange cannot exceed maxRange
    if (minValue >= maxValue) {
        minRange.value = maxValue - 1;
        minAmount.value = minRange.value;
        minValueLabel.innerText = `${minRange.value}`;
    }

    // Ensure that maxRange cannot be less than minRange
    if (maxValue <= minValue) {
        maxRange.value = minValue + 1;
        maxAmount.value = maxRange.value;
        maxValueLabel.innerText = `${maxRange.value}`;
    }
}

function updateFromInput() {
    let minValue = parseInt(minAmount.value);
    let maxValue = parseInt(maxAmount.value);

    // Ensure the minimum value does not exceed the maximum
    if (minValue >= maxValue) {
        minValue = maxValue - 1;
        minAmount.value = minValue;
    }

    // Update the sliders
    minRange.value = minValue;
    maxRange.value = maxValue;
    updateFromSlider();
}

// ++++++ range END 
// ========= calander start
document.addEventListener('DOMContentLoaded', function () {
  const dateInput = document.getElementById('date-input');
  const calendarPopup = document.getElementById('calendar-popup');
  const calendar = document.getElementById('calendar');
  const monthNameEl = document.getElementById('month-name');
  const prevMonthIcon = document.getElementById('prev-month');
  const nextMonthIcon = document.getElementById('next-month');

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Function to update the calendar header with the current month and year
  function updateMonthName() {
    monthNameEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
  }

  // Create a basic calendar
  function createCalendar(month, year) {
    calendar.innerHTML = '';
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Display the days of the week
    const headerRow = document.createElement('div');
    headerRow.style.display = 'flex';
    daysOfWeek.forEach(day => {
      const dayElement = document.createElement('div');
      dayElement.style.flex = '1';
      dayElement.style.textAlign = 'center';
      dayElement.textContent = day;
      calendar.appendChild(dayElement);
    });

    // Add empty slots for days before the first day
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      calendar.appendChild(emptyCell);
    }

    // Display the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement('div');
      dayCell.textContent = day;
      dayCell.classList.add('day-cell');
      dayCell.addEventListener('click', () => {
        dateInput.value = `${day}-${month + 1}-${year}`;
        calendarPopup.classList.add('hidden');
      });
      calendar.appendChild(dayCell);
    }
  }

  // Initialize the calendar with the current month
  function initializeCalendar() {
    createCalendar(currentMonth, currentYear);
    updateMonthName();
  }

  // Event to toggle the calendar popup visibility
  dateInput.addEventListener('click', function () {
    calendarPopup.classList.toggle('hidden');
    if (!calendarPopup.classList.contains('hidden')) {
      initializeCalendar();
    }
  });

  // Navigation for the previous and next month
  prevMonthIcon.addEventListener('click', function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    createCalendar(currentMonth, currentYear);
    updateMonthName();
  });

  nextMonthIcon.addEventListener('click', function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    createCalendar(currentMonth, currentYear);
    updateMonthName();
  });

  // Hide popup when clicking outside
  document.addEventListener('click', function (e) {
    if (!document.querySelector('.date-picker-wrapper').contains(e.target) && !calendarPopup.contains(e.target)) {
      calendarPopup.classList.add('hidden');
    }
  });
}); 
// ========= calander End






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



  var app = new Vue({
    name: 'Vue Price Range',
    el: '#app',
    data: {
      
       min: 10,
        max: 210,
        minValue: 40,
        maxValue: 150,
        step: 5,
        totalSteps: 0,
        percentPerStep: 1,
        trackWidth: null,
        isDragging: false,
        pos: {
          curTrack: null
        }
      
    },
  
    methods: {
      moveTrack(track, ev){
        
        let percentInPx = this.getPercentInPx();
        
        let trackX = Math.round(this.$refs._vpcTrack.getBoundingClientRect().left);
        let clientX = ev.clientX;
        let moveDiff = clientX-trackX;
  
        let moveInPct = moveDiff / percentInPx
        // console.log(moveInPct)
  
        if(moveInPct<1 || moveInPct>100) return;
        let value = ( Math.round(moveInPct / this.percentPerStep) * this.step ) + this.min;
        if(track==='track1'){
          if(value >= (this.maxValue - this.step)) return;
          this.minValue = value;
        }
  
        if(track==='track2'){
          if(value <= (this.minValue + this.step)) return;
          this.maxValue = value;
        }
        
        this.$refs[track].style.left = moveInPct + '%';
        this.setTrackHightlight()
              
      },
      mousedown(ev, track){
  
        if(this.isDragging) return;
        this.isDragging = true;
        this.pos.curTrack = track;
      },
  
      touchstart(ev, track){
        this.mousedown(ev, track)
      },
  
      mouseup(ev, track){
        if(!this.isDragging) return;
        this.isDragging = false
      },
  
      touchend(ev, track){
        this.mouseup(ev, track)
      },
  
      mousemove(ev, track){
        if(!this.isDragging) return;      
        this.moveTrack(track, ev)
      },
  
      touchmove(ev, track){
        this.mousemove(ev.changedTouches[0], track)
      },
  
      valueToPercent(value){
        return ((value - this.min) / this.step) * this.percentPerStep
      },
  
      setTrackHightlight(){
        this.$refs.trackHighlight.style.left = this.valueToPercent(this.minValue) + '%'
        this.$refs.trackHighlight.style.width = (this.valueToPercent(this.maxValue) - this.valueToPercent(this.minValue)) + '%'
      },
  
      getPercentInPx(){
        let trackWidth = this.$refs._vpcTrack.offsetWidth;
        let oneStepInPx = trackWidth / this.totalSteps;
        // 1 percent in px
        let percentInPx = oneStepInPx / this.percentPerStep;
        
        return percentInPx;
      },
  
      setClickMove(ev){
        let track1Left = this.$refs.track1.getBoundingClientRect().left;
        let track2Left = this.$refs.track2.getBoundingClientRect().left;
        // console.log('track1Left', track1Left)
        if(ev.clientX < track1Left){
          this.moveTrack('track1', ev)
        }else if((ev.clientX - track1Left) < (track2Left - ev.clientX) ){
          this.moveTrack('track1', ev)
        }else{
          this.moveTrack('track2', ev)
        }
      }
    },
  
    mounted() {
      // calc per step value
      this.totalSteps = (this.max - this.min) / this.step;
  
      // percent the track button to be moved on each step
      this.percentPerStep = 100 / this.totalSteps;
      // console.log('percentPerStep', this.percentPerStep)
  
      // set track1 initilal
      document.querySelector('.track1').style.left = this.valueToPercent(this.minValue) + '%'
      // track2 initial position
      document.querySelector('.track2').style.left = this.valueToPercent(this.maxValue) + '%'
      // set initila track highlight
      this.setTrackHightlight()
  
      var self = this;
  
      ['mouseup', 'mousemove'].forEach( type => {
        document.body.addEventListener(type, (ev) => {
          // ev.preventDefault();
          if(self.isDragging && self.pos.curTrack){
            self[type](ev, self.pos.curTrack)
          }
        })
      });
  
      ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchmove', 'touchend'].forEach( type => {
        document.querySelector('.track1').addEventListener(type, (ev) => {
          ev.stopPropagation();
          self[type](ev, 'track1')
        })
  
        document.querySelector('.track2').addEventListener(type, (ev) => {
          ev.stopPropagation();
          self[type](ev, 'track2')
        })
      })
  
      // on track clik
      // determine direction based on click proximity
      // determine percent to move based on track.clientX - click.clientX
      document.querySelector('.track').addEventListener('click', function(ev) {
        ev.stopPropagation();
        self.setClickMove(ev)
        
      })
  
      document.querySelector('.track-highlight').addEventListener('click', function(ev) {
        ev.stopPropagation();
        self.setClickMove(ev)
        
      })
    }
  })