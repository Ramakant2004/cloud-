const pages = {
  login: `
    <h2>Login or Sign Up</h2>
    <input type="text" id="emailOrPhone" placeholder="Phone number or Email">
    <input type="password" id="password" placeholder="Password">
    <button onclick="loginUser()">Login</button>
    <button onclick="signupUser()">Sign Up</button>
  `,
  ride: `
    <h2>Enter Ride Details</h2>
    <input type="text" id="pickup" placeholder="Pickup Location">
    <input type="text" id="dropoff" placeholder="Drop-off Location">
    <button onclick="proceedToMap()">Book Ride</button>
  `,
  map: `
    <h2>Live Ride Tracking</h2>
    <div id="map" class="map-view"></div>
    <p>Estimated Fare: ₹<span id="fare">0</span></p>
    <button onclick="goToPayment()">Proceed to Payment</button>
  `,
  payment: `
    <h2>Select Payment Method</h2>
    <button onclick="showSection('upi')">UPI</button>
    <button onclick="showSection('card')">Card</button>
    <button onclick="showSection('cash')">Cash</button>
    <div id="upi" class="pay-section">
      <img id="qrCode" class="qr-img" src="https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=example@upi&pn=RideApp&am=150&cu=INR&size=200x200" alt="UPI QR Code" />
    </div>
    <div id="card" class="pay-section">
      <input type="text" placeholder="Cardholder Name">
      <input type="text" placeholder="Card Last 4 Digits">
      <input type="password" placeholder="CVV">
    </div>
    <div id="cash" class="pay-section">
      <p>Wait for the driver to come and pay in cash.</p>
    </div>
    <button onclick="goToReview()">Confirm Payment</button>
  `,
  review: `
    <h2>Rate Your Ride</h2>
    <div class="stars">
      <span onclick="setRating(1)">&#9733;</span>
      <span onclick="setRating(2)">&#9733;</span>
      <span onclick="setRating(3)">&#9733;</span>
      <span onclick="setRating(4)">&#9733;</span>
      <span onclick="setRating(5)">&#9733;</span>
    </div>
    <textarea id="reviewInput" placeholder="Write your feedback here..."></textarea>
    <button onclick="submitReview()">Submit Review</button>
  `
};

let selectedRating = 0;

function loadPage(pageName) {
  document.getElementById('pageContainer').innerHTML = pages[pageName];
  if (pageName === 'map') initMap();
  if (pageName === 'payment') showSection('upi');
}

function loginUser() {
  const user = document.getElementById('emailOrPhone').value;
  const pass = document.getElementById('password').value;
  if (user && pass) loadPage('ride');
  else alert("Please enter credentials.");
}

function signupUser() {
  alert("Account created! Please login.");
}

function proceedToMap() {
  loadPage('map');
}

function initMap() {
  const map = L.map('map').setView([19.076, 72.8777], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  L.marker([19.076, 72.8777]).addTo(map).bindPopup('Driver here').openPopup();
  document.getElementById("fare").textContent = Math.floor(Math.random() * 300 + 100);
}

function goToPayment() {
  loadPage('payment');
}

function showSection(type) {
  document.querySelectorAll('.pay-section').forEach(el => el.style.display = 'none');
  const section = document.getElementById(type);
  if (section) section.style.display = 'block';
}

function goToReview() {
  loadPage('review');
}

function setRating(rating) {
  selectedRating = rating;
  document.querySelectorAll('.stars span').forEach((star, index) => {
    star.style.color = index < rating ? 'gold' : '#ccc';
  });
}

function submitReview() {
  const review = document.getElementById("reviewInput").value;
  alert(`Thanks for rating ${selectedRating} stars!\nFeedback: ${review}`);
  loadPage('login');
}

window.onload = () => loadPage('login');
