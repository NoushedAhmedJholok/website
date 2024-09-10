
document.getElementById('filter-btn').addEventListener('click', function () {
  var form = document.getElementById('mainForm');
  if (form.style.display === 'none' || form.style.display === '') {
      form.style.display = 'block'; // Show the form
  } else {
      form.style.display = 'none';  // Hide the form
  }
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
