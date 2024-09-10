

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





