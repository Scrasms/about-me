const map = document.querySelector('.world-map');
const svg = document.querySelector('svg');

// Global variables tracking how much the svg has been translated
let offsetX = 0;
let offsetY = 0;

// Global boolean to track whether the map is being dragged
let dragging = false;

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
        panImage(event);
    }
});

function panImage(event) {
    offsetX += event.movementX;
    offsetY += event.movementY;

    svg.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}
