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

const ovPassengers = document.getElementById('ov-passengers');
const ovCabin = document.getElementById('ov-cabin');
const ovFare = document.getElementById('ov-fare');
const ovTotal = document.getElementById('ov-total');
const miniOverview = document.getElementById('miniOverview');

const sortBy = document.getElementById('sortBy');
const fareFilter = document.getElementById('fareFilter');

// 🆕 NEW: Cabin filter dropdown
const cabinFilter = document.getElementById('cabinFilter');

// ==============================
// Data
// ==============================
const AIRPORTS = [
  "Manila (MNL) — Ninoy Aquino Intl",
  "Cebu (CEB) — Mactan–Cebu Intl",
  "Davao (DVO) — Francisco Bangoy",
  "Clark (CRK) — Clark Intl",
  "Iloilo (ILO) — Iloilo Intl",
  "Bacolod (BCD) — Bacolod–Silay",
  "Bohol (TAG) — Panglao Intl",
  "Palawan (PPS) — Puerto Princesa",
  "Zamboanga (ZAM) — Zamboanga Intl",
  "Cagayan de Oro (CGY) — Laguindingan",
  "Boracay (MPH) — Godofredo P. Ramos"
];

const FLIGHTS = [
  { id: "F101", route: "Manila → Cebu", depart: "07:30", price: 3300, dur: "1h10m", fare: "Regular", cabin: "Economy" },
  { id: "F102", route: "Manila → Cebu", depart: "13:00", price: 2800, dur: "1h10m", fare: "Promo", cabin: "Economy" },
  { id: "F103", route: "Cebu → Manila", depart: "17:00", price: 3600, dur: "1h15m", fare: "Regular", cabin: "Economy" },
  { id: "F104", route: "Cebu → Palawan", depart: "09:00", price: 4000, dur: "1h30m", fare: "Regular", cabin: "Business" },
  { id: "F105", route: "Cebu → Palawan", depart: "14:00", price: 3300, dur: "1h30m", fare: "Promo", cabin: "Economy" },
  { id: "F106", route: "Manila → Boracay", depart: "11:00", price: 2500, dur: "1h00m", fare: "Promo", cabin: "Economy" },
  { id: "F107", route: "Manila → Boracay", depart: "18:00", price: 3000, dur: "1h00m", fare: "Regular", cabin: "Business" },
  { id: "F108", route: "Davao → Cebu", depart: "06:30", price: 3500, dur: "1h20m", fare: "Regular", cabin: "Economy" },
  { id: "F109", route: "Manila → Davao", depart: "08:00", price: 4200, dur: "1h40m", fare: "Regular", cabin: "Economy" },
  { id: "F110", route: "Manila → Davao", depart: "19:00", price: 3800, dur: "1h40m", fare: "Promo", cabin: "Economy" },
  { id: "F111", route: "Davao → Manila", depart: "10:00", price: 4600, dur: "1h45m", fare: "Regular", cabin: "Business" },
  { id: "F112", route: "Cebu → Davao", depart: "12:30", price: 3100, dur: "1h10m", fare: "Promo", cabin: "Economy" },
  { id: "F113", route: "Palawan → Cebu", depart: "15:45", price: 3700, dur: "1h25m", fare: "Regular", cabin: "Economy" },
  { id: "F114", route: "Boracay → Manila", depart: "09:30", price: 2900, dur: "1h05m", fare: "Promo", cabin: "Economy" },
  { id: "F115", route: "Boracay → Manila", depart: "17:30", price: 3500, dur: "1h05m", fare: "Regular", cabin: "Business" },
  { id: "F116", route: "Manila → Palawan", depart: "07:00", price: 4100, dur: "1h20m", fare: "Regular", cabin: "Economy" },
  { id: "F117", route: "Manila → Palawan", depart: "16:30", price: 3400, dur: "1h20m", fare: "Promo", cabin: "Economy" },
  { id: "F118", route: "Cebu → Boracay", depart: "10:15", price: 3200, dur: "1h05m", fare: "Regular", cabin: "Economy" },
  { id: "F119", route: "Cebu → Boracay", depart: "18:20", price: 2800, dur: "1h05m", fare: "Promo", cabin: "Economy" },
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

  if (!state.from || !state.to) return alert("Please complete From and To fields");

  const filtered = FLIGHTS.filter(f =>
    f.route.toLowerCase().includes(state.from.split(' ')[0].toLowerCase()) &&
    f.route.toLowerCase().includes(state.to.split(' ')[0].toLowerCase())
  );

  searchCard.style.display = 'none';
  flightsCard.style.display = 'block';
  setStep(2);

  renderFlights(filtered.length ? filtered : FLIGHTS);

  // 🆕 Apply filters (fare + cabin + sort) after search
  applyFilters();
  updateOverview();
});

// ==============================
// Render Flights (Airpaz layout)
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
cabinFilter.addEventListener('change', applyFilters); // 🆕 Cabin filter

function applyFilters() {
  let list = [...FLIGHTS];

  // Filter by fare type
  if (fareFilter.value !== 'all') {
    list = list.filter(f => f.fare === fareFilter.value);
  }

  // 🆕 Filter by cabin type
  if (cabinFilter.value !== 'all') {
    list = list.filter(f => f.cabin === cabinFilter.value);
  }

  // Sort by price
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
window.selectFlight = function(i) {
  state.selectedFlight = FLIGHTS[i];
  flightsCard.style.display = 'none';
  passengerCard.style.display = 'block';
  setStep(3);
  generatePassengerFields();
};

// ==============================
// Passenger Form
// ==============================
function generatePassengerFields() {
  passengerContainer.innerHTML = '';
  for (let i = 1; i <= state.passengers; i++) {
    passengerContainer.innerHTML += `
      <div class="passenger-info card" style="padding:16px;margin-bottom:12px;">
        <h4>Passenger ${i}</h4>
        <div class="two-col">
          <div class="field"><label>Name</label><input id="pname${i}" required></div>
          <div class="field"><label>Age</label><input id="page${i}" type="number" min="1" required></div>
        </div>
        <div class="two-col">
          <div class="field"><label>Gender</label>
            <select id="pgen${i}" required>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div class="field"><label>Email</label><input id="pemail${i}" type="email" required></div>
        </div>
      </div>`;
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
    <p><strong>Passenger ${i+1}:</strong> ${p.name}, ${p.age} yrs, ${p.gen}, ${p.email}</p>
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
