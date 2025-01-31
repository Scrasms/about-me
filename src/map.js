const map = document.querySelector('.world-map');
const svg = document.querySelector('svg');

const sidebar = document.querySelector('.sidebar');
const closeSidebar = document.querySelector('.close.side');

const countryBox = document.querySelector('.country-container');
const countryTitle = document.querySelector('.country-container > h1');
let countryText;
const closeCountry = document.querySelector('.close.country');

// Constants to track the max and min zoom factor and the zoom speed
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 4;
const ZOOM_SPEED = 10;

// Global variables tracking how much the svg has been translated (panned)
let panX = 0;
let panY = 0;

// Global variable tracking how much the map has been zoomed
let scaleFactor = 1; 

// Global boolean to track whether the map is being dragged
let dragging = false;

// Map click-and-drag behaviour
map.addEventListener('mousedown', () => {
    dragging = true;
    map.classList.add('dragging');
});

map.addEventListener('mouseup', () => {
    dragging = false;
    map.classList.remove('dragging');
});

map.addEventListener('mousemove', (event) => {
    if (dragging) {
        const svgCoords = svg.getBoundingClientRect();

        // Set the pannable area for the map
        const leftMax = -(svgCoords.width / 2);
        const rightMax = svgCoords.width / 2; 
        const topMax = -(svgCoords.height / 2); 
        const bottomMax = svgCoords.height / 2;

        panX += event.movementX;
        panY += event.movementY;

        // Restrict panning
        panX = Math.min(Math.max(leftMax, panX), rightMax);
        panY = Math.min(Math.max(topMax, panY), bottomMax);

        updateSVGTransform();
    }
});

// Map zoom behaviour
map.addEventListener('wheel', (event) => {
    // Don't scroll the page
    event.preventDefault();

    scaleFactor += -ZOOM_SPEED / event.deltaY;

    // Restrict zoom 
    scaleFactor = Math.min(Math.max(MIN_ZOOM, scaleFactor), MAX_ZOOM);

    updateSVGTransform();
});

// Load contents of popup window when an interesting country is pressed
// Wait until svg is loaded by external-svg-loader library
window.addEventListener('iconload', () => {
    const countries = document.querySelectorAll('.interesting');
    for (const country of countries) {
        country.addEventListener('click', () => {
            hideSidebar();
            countryBox.classList.remove('hidden');

            // Set title of popup window to the name of the clicked country
            countryTitle.textContent = country.getAttribute('name');

            // Unhide text for that specific country
            countryText = document.querySelector('.' + countryTitle.textContent);
            countryText.classList.remove('hidden');
        }); 
    }
});

// Sidebar close button functionality
closeSidebar.addEventListener('click', () => {
    hideSidebar();
});

// Country close button functionality
closeCountry.addEventListener('click', () => {
    countryBox.classList.add('hidden');

    // Hide the country's text
    if (countryText) {
        countryText.classList.add('hidden');
    }

    pauseVideos();
});

// Country close with escape button functionality
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !countryBox.classList.contains('hidden')) {
        countryBox.classList.add('hidden');
        
         // Hide the country's text
        if (countryText) {
            countryText.classList.add('hidden');
        }

        pauseVideos();
    }
});

// Function to pan or scale the svg 
function updateSVGTransform() {
    svg.style.transform = `translate(${panX}px, ${panY}px) scale(${scaleFactor})`;
}

// Function to hide the sidebar
function hideSidebar() {
    if (!sidebar.classList.contains('hidden')) {
        sidebar.classList.add('hidden');
    }
}

// Function that pauses all videos in the document
function pauseVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
        video.pause();
    });
}