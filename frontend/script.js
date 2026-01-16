const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 500;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// UI elements
const colorPicker = document.getElementById("colorPicker");
const penSize = document.getElementById("penSize");

// Default pen settings
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = penSize.value;
ctx.lineJoin = "round";
ctx.lineCap = "round";

// Update color
colorPicker.addEventListener("change", () => {
    ctx.strokeStyle = colorPicker.value;
});

// Update pen size
penSize.addEventListener("change", () => {
    ctx.lineWidth = penSize.value;
});

// Drawing logic
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);

// Clear button
document.getElementById("clearBtn").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
