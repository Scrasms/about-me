const map = document.querySelector('.world-map');
const svg = document.querySelector('svg');

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
        const leftMax = -(svgCoords.width / 4);
        const rightMax = svgCoords.width / 4; 
        const topMax = -(svgCoords.height / 4); 
        const bottomMax = svgCoords.height / 4;

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

function updateSVGTransform() {
    svg.style.transform = `translate(${panX}px, ${panY}px) scale(${scaleFactor})`;
}

