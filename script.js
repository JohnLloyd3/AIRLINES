// ==============================
// DOM Elements
// ==============================
const steps = [...document.querySelectorAll('.step')];
const bookingForm = document.getElementById('bookingForm');
const flightsCard = document.getElementById('flightsCard');
const flightList = document.getElementById('flightList');
const searchCard = document.getElementById('searchCard');
const passengerCard = document.getElementById('passengerCard');
const passengerContainer = document.getElementById('passengerContainer');
const passengerForm = document.getElementById('passengerForm');
const summaryCard = document.getElementById('summaryCard');
const summaryContent = document.getElementById('summaryContent');

const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const flightType = document.getElementById('flightType');
const returnWrapper = document.getElementById('returnWrapper');
const passengersInput = document.getElementById('passengers');
const clearStorageBtn = document.getElementById('clearStorage');


const sortBy = document.getElementById('sortBy');
const fareFilter = document.getElementById('fareFilter');
const cabinFilter = document.getElementById('cabinFilter');

// 🏠 Home + Booking toggle
const homeSection = document.getElementById('homeSection');
const bookingSection = document.getElementById('bookingSection');
const bookFlightBtn = document.getElementById('bookFlightBtn');

// ==============================
// Home Section Event
// ==============================
if (bookFlightBtn) {
  bookFlightBtn.addEventListener('click', () => {
    homeSection.style.display = 'none';
    bookingSection.style.display = 'block';
    window.scrollTo(0, 0);
  });
}



const FLIGHTS = [
  // Manila → Cebu (5)
  { id: "F101", route: "Manila → Cebu", depart: "07:30", price: 3300, dur: "1h10m", fare: "Regular", cabin: "Economy" },
  { id: "F102", route: "Manila → Cebu", depart: "13:00", price: 2800, dur: "1h10m", fare: "Promo", cabin: "Economy" },
  { id: "F120", route: "Manila → Cebu", depart: "09:45", price: 3500, dur: "1h15m", fare: "Regular", cabin: "Business" },
  { id: "F121", route: "Manila → Cebu", depart: "15:20", price: 3000, dur: "1h10m", fare: "Promo", cabin: "Economy" },
  { id: "F122", route: "Manila → Cebu", depart: "20:00", price: 3700, dur: "1h10m", fare: "Regular", cabin: "Economy" },

  // Cebu → Manila (5)
  { id: "F103", route: "Cebu → Manila", depart: "17:00", price: 3600, dur: "1h15m", fare: "Regular", cabin: "Economy" },
  { id: "F123", route: "Cebu → Manila", depart: "06:30", price: 3300, dur: "1h10m", fare: "Promo", cabin: "Economy" },
  { id: "F124", route: "Cebu → Manila", depart: "11:45", price: 3900, dur: "1h10m", fare: "Regular", cabin: "Business" },
  { id: "F125", route: "Cebu → Manila", depart: "14:30", price: 3000, dur: "1h15m", fare: "Promo", cabin: "Economy" },
  { id: "F126", route: "Cebu → Manila", depart: "19:00", price: 3700, dur: "1h10m", fare: "Regular", cabin: "Economy" },

  // Cebu → Palawan (5)
  { id: "F104", route: "Cebu → Palawan", depart: "09:00", price: 4000, dur: "1h30m", fare: "Regular", cabin: "Business" },
  { id: "F105", route: "Cebu → Palawan", depart: "14:00", price: 3300, dur: "1h30m", fare: "Promo", cabin: "Economy" },
  { id: "F127", route: "Cebu → Palawan", depart: "07:45", price: 3700, dur: "1h25m", fare: "Regular", cabin: "Economy" },
  { id: "F128", route: "Cebu → Palawan", depart: "12:15", price: 3500, dur: "1h30m", fare: "Promo", cabin: "Economy" },
  { id: "F129", route: "Cebu → Palawan", depart: "17:30", price: 4200, dur: "1h30m", fare: "Regular", cabin: "Business" },

  // Manila → Boracay (5)
  { id: "F106", route: "Manila → Boracay", depart: "11:00", price: 2500, dur: "1h00m", fare: "Promo", cabin: "Economy" },
  { id: "F107", route: "Manila → Boracay", depart: "18:00", price: 3000, dur: "1h00m", fare: "Regular", cabin: "Business" },
  { id: "F130", route: "Manila → Boracay", depart: "06:15", price: 2800, dur: "1h00m", fare: "Promo", cabin: "Economy" },
  { id: "F131", route: "Manila → Boracay", depart: "13:20", price: 3100, dur: "1h00m", fare: "Regular", cabin: "Economy" },
  { id: "F132", route: "Manila → Boracay", depart: "20:30", price: 3400, dur: "1h00m", fare: "Regular", cabin: "Business" },

  // Manila → Davao (5)
  { id: "F109", route: "Manila → Davao", depart: "08:00", price: 4200, dur: "1h40m", fare: "Regular", cabin: "Economy" },
  { id: "F110", route: "Manila → Davao", depart: "19:00", price: 3800, dur: "1h40m", fare: "Promo", cabin: "Economy" },
  { id: "F133", route: "Manila → Davao", depart: "10:45", price: 4000, dur: "1h40m", fare: "Regular", cabin: "Business" },
  { id: "F134", route: "Manila → Davao", depart: "15:15", price: 3600, dur: "1h40m", fare: "Promo", cabin: "Economy" },
  { id: "F135", route: "Manila → Davao", depart: "21:10", price: 4300, dur: "1h40m", fare: "Regular", cabin: "Economy" },

  // Davao → Manila (5)
  { id: "F111", route: "Davao → Manila", depart: "10:00", price: 4600, dur: "1h45m", fare: "Regular", cabin: "Business" },
  { id: "F136", route: "Davao → Manila", depart: "07:00", price: 3900, dur: "1h45m", fare: "Promo", cabin: "Economy" },
  { id: "F137", route: "Davao → Manila", depart: "12:30", price: 4100, dur: "1h45m", fare: "Regular", cabin: "Economy" },
  { id: "F138", route: "Davao → Manila", depart: "16:50", price: 3700, dur: "1h45m", fare: "Promo", cabin: "Economy" },
  { id: "F139", route: "Davao → Manila", depart: "22:15", price: 4400, dur: "1h45m", fare: "Regular", cabin: "Business" },

  // Cebu → Boracay (5)
  { id: "F118", route: "Cebu → Boracay", depart: "10:15", price: 3200, dur: "1h05m", fare: "Regular", cabin: "Economy" },
  { id: "F119", route: "Cebu → Boracay", depart: "18:20", price: 2800, dur: "1h05m", fare: "Promo", cabin: "Economy" },
  { id: "F140", route: "Cebu → Boracay", depart: "08:10", price: 3100, dur: "1h05m", fare: "Regular", cabin: "Business" },
  { id: "F141", route: "Cebu → Boracay", depart: "14:45", price: 2900, dur: "1h05m", fare: "Promo", cabin: "Economy" },
  { id: "F142", route: "Cebu → Boracay", depart: "20:30", price: 3300, dur: "1h05m", fare: "Regular", cabin: "Economy" },

  // Palawan → Cebu (5)
  { id: "F113", route: "Palawan → Cebu", depart: "15:45", price: 3700, dur: "1h25m", fare: "Regular", cabin: "Economy" },
  { id: "F143", route: "Palawan → Cebu", depart: "07:20", price: 3400, dur: "1h25m", fare: "Promo", cabin: "Economy" },
  { id: "F144", route: "Palawan → Cebu", depart: "11:00", price: 3900, dur: "1h25m", fare: "Regular", cabin: "Business" },
  { id: "F145", route: "Palawan → Cebu", depart: "14:30", price: 3100, dur: "1h25m", fare: "Promo", cabin: "Economy" },
  { id: "F146", route: "Palawan → Cebu", depart: "19:40", price: 4000, dur: "1h25m", fare: "Regular", cabin: "Economy" },

  // Boracay → Manila (5)
  { id: "F114", route: "Boracay → Manila", depart: "09:30", price: 2900, dur: "1h05m", fare: "Promo", cabin: "Economy" },
  { id: "F115", route: "Boracay → Manila", depart: "17:30", price: 3500, dur: "1h05m", fare: "Regular", cabin: "Business" },
  { id: "F147", route: "Boracay → Manila", depart: "06:00", price: 2700, dur: "1h05m", fare: "Promo", cabin: "Economy" },
  { id: "F148", route: "Boracay → Manila", depart: "12:15", price: 3200, dur: "1h05m", fare: "Regular", cabin: "Economy" },
  { id: "F149", route: "Boracay → Manila", depart: "21:00", price: 3600, dur: "1h05m", fare: "Regular", cabin: "Business" },

  // Manila → Palawan (5)
  { id: "F116", route: "Manila → Palawan", depart: "07:00", price: 4100, dur: "1h20m", fare: "Regular", cabin: "Economy" },
  { id: "F117", route: "Manila → Palawan", depart: "16:30", price: 3400, dur: "1h20m", fare: "Promo", cabin: "Economy" },
  { id: "F150", route: "Manila → Palawan", depart: "10:10", price: 4300, dur: "1h20m", fare: "Regular", cabin: "Business" },
  { id: "F151", route: "Manila → Palawan", depart: "13:45", price: 3600, dur: "1h20m", fare: "Promo", cabin: "Economy" },
  { id: "F152", route: "Manila → Palawan", depart: "20:15", price: 3900, dur: "1h20m", fare: "Regular", cabin: "Economy" }
];


let state = {
  from: "",
  to: "",
  trip: "round",
  passengers: 1,
  selectedFlight: null,
  passengerData: []
};

// ==============================
// Helpers
// ==============================
function setStep(n) {
  steps.forEach(s => s.classList.toggle('active', +s.dataset.step === n));
}

function formatPHP(n) {
  return "₱" + n.toLocaleString();
}

// ==============================
// Initialization
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const fromList = document.getElementById("airportList");
  const toList = document.getElementById("airportListTo");
  AIRPORTS.forEach(a => {
    fromList.innerHTML += `<option value="${a}">`;
    toList.innerHTML += `<option value="${a}">`;
  });
});

// ==============================
// Flight Type (Return Toggle)
// ==============================
flightType.addEventListener('change', () => {
  returnWrapper.style.display = flightType.value === 'oneway' ? 'none' : 'block';
});

// ==============================
// Booking Form Submit
// ==============================
bookingForm.addEventListener('submit', e => {
  e.preventDefault();

  state.from = fromInput.value.trim();
  state.to = toInput.value.trim();
  state.trip = flightType.value;
  state.passengers = Math.max(1, +passengersInput.value || 1);

  if (!state.from || !state.to) {
    return alert("Please complete From and To fields");
  }

  const fromCity = state.from.split(' ')[0];
  const toCity = state.to.split(' ')[0];

  let filtered = FLIGHTS.filter(f =>
    f.route.toLowerCase() === `${fromCity.toLowerCase()} → ${toCity.toLowerCase()}`
  );

  if (filtered.length === 0) {
    searchCard.style.display = 'none';
    flightsCard.style.display = 'block';
    setStep(2);
    flightList.innerHTML = `
      <p style="text-align:center;padding:20px;">✈️ No flights found from ${fromCity} to ${toCity}.</p>
    `;
    return;
  }

  state.filteredFlights = filtered;

  searchCard.style.display = 'none';
  flightsCard.style.display = 'block';
  setStep(2);

  renderFlights(state.filteredFlights);
  updateOverview();
});

// ==============================
// Render Flights
// ==============================
function renderFlights(list) {
  flightList.innerHTML = '';
  list.forEach((f, i) => {
    const card = document.createElement('div');
    card.className = 'flight-card';
    card.innerHTML = `
      <div class="flight-info">
        <strong>${f.route}</strong>
        <div class="flight-meta">${f.depart} • ${f.dur} • ${f.fare} • ${f.cabin}</div>
      </div>
      <div class="flight-actions" style="text-align:right">
        <div class="flight-price">${formatPHP(f.price)}</div>
        <button class="btn-primary" onclick="selectFlight(${i})">Select</button>
      </div>
    `;
    flightList.appendChild(card);
  });
}

// ==============================
// Sorting and Filtering
// ==============================
sortBy.addEventListener('change', applyFilters);
fareFilter.addEventListener('change', applyFilters);
cabinFilter.addEventListener('change', applyFilters);

function applyFilters() {
  let list = [...(state.filteredFlights || FLIGHTS)];

  if (fareFilter.value !== 'all') {
    list = list.filter(f => f.fare === fareFilter.value);
  }
  if (cabinFilter.value !== 'all') {
    list = list.filter(f => f.cabin === cabinFilter.value);
  }
  if (sortBy.value === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  }

  renderFlights(list);
}

// ==============================
// Flight Selection
// ==============================
window.selectFlight = function (i) {
  state.selectedFlight = FLIGHTS[i];
  flightsCard.style.display = 'none';
  passengerCard.style.display = 'block';
  setStep(3);
  generatePassengerFields();
};
// ==============================
// Generate Passenger Fields
// ==============================
function generatePassengerFields() {
  passengerContainer.innerHTML = ''; // Clear old fields

  for (let i = 1; i <= state.passengers; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'passenger-block';
    wrapper.innerHTML = `
      <h4>Passenger ${i}</h4>
      <label for="pname${i}">Name:</label>
      <input type="text" id="pname${i}" name="pname${i}" required placeholder="Full Name" />

      <label for="page${i}">Age:</label>
      <input type="number" id="page${i}" name="page${i}" required min="0" placeholder="Age" />

      <label for="pgen${i}">Gender:</label>
      <select id="pgen${i}" name="pgen${i}" required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <label for="pemail${i}">Email:</label>
      <input type="email" id="pemail${i}" name="pemail${i}" required placeholder="example@email.com" />

      <hr>
    `;
    passengerContainer.appendChild(wrapper);
  }
}


// ==============================
// Passenger Form Submit
// ==============================
passengerForm.addEventListener('submit', e => {
  e.preventDefault();
  const list = [];

  for (let i = 1; i <= state.passengers; i++) {
    const name = document.getElementById(`pname${i}`).value.trim();
    const age = document.getElementById(`page${i}`).value;
    const gen = document.getElementById(`pgen${i}`).value;
    const email = document.getElementById(`pemail${i}`).value.trim();

    if (!name || !age || !gen || !email) return alert("Complete all passenger fields");
    list.push({ name, age, gen, email });
  }

  state.passengerData = list;
  passengerCard.style.display = 'none';
  summaryCard.style.display = 'block';
  setStep(4);
  renderSummary();
});

// ==============================
// Summary Render
// ==============================
function renderSummary() {
  const f = state.selectedFlight;
  const total = f.price * state.passengers;
  let passengersHTML = state.passengerData.map((p, i) => `
    <p><strong>Passenger ${i + 1}:</strong> ${p.name}, ${p.age} yrs, ${p.gen}, ${p.email}</p>
  `).join("");

  summaryContent.innerHTML = `
    <p><strong>Route:</strong> ${f.route}</p>
    <p><strong>Cabin:</strong> ${f.cabin}</p>
    <p><strong>Fare Type:</strong> ${f.fare}</p>
    <hr>
    ${passengersHTML}
    <p><strong>Total:</strong> ${formatPHP(total)}</p>
  `;
  updateOverview();
}

// ==============================
// Trip Overview
// ==============================
function updateOverview() {
  ovPassengers.textContent = state.passengers;
  ovCabin.textContent = cabinFilter ? cabinFilter.value : "—";
  ovFare.textContent = state.selectedFlight ? state.selectedFlight.fare : '—';
  ovTotal.textContent = state.selectedFlight ? formatPHP(state.selectedFlight.price * state.passengers) : '₱0';
  miniOverview.textContent = state.selectedFlight ? `${state.selectedFlight.id} • ${state.selectedFlight.route}` : 'No trip selected';
}

// ==============================
// Navigation
// ==============================
document.getElementById('backToFlights').addEventListener('click', () => {
  passengerCard.style.display = 'none';
  flightsCard.style.display = 'block';
  setStep(2);
});
document.getElementById('backToSearch').addEventListener('click', () => {
  flightsCard.style.display = 'none';
  searchCard.style.display = 'block';
  setStep(1);
});
document.getElementById('editBooking').addEventListener('click', () => {
  summaryCard.style.display = 'none';
  searchCard.style.display = 'block';
  setStep(1);
});
document.getElementById('bookNowBtn').addEventListener('click', () => {
  alert('✅ Booking confirmed!');
  location.reload();
});
clearStorageBtn.addEventListener('click', () => {
  localStorage.clear();
  alert('Saved data cleared');
});

// ==============================
// Initialize App
// ==============================
setStep(1);
updateOverview();

