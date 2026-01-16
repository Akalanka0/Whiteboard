// ===== Canvas & Context =====
const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 500;

// ===== Drawing State =====
let isDrawing = false;
let lastX = 0;
let lastY = 0;
ctx.lineWidth = 2;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = "#000";

// ===== Drawing Data Array =====
let drawingData = []; // Stores all line segments

// ===== Mouse Events =====
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;

    // Draw line
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    // Save line to drawingData
    drawingData.push({
        startX: lastX,
        startY: lastY,
        endX: e.offsetX,
        endY: e.offsetY,
        color: ctx.strokeStyle,
        width: ctx.lineWidth
    });

    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

canvas.addEventListener("mouseout", () => {
    isDrawing = false;
});

// ===== Clear Board Button =====
document.getElementById("clearBtn").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawingData = []; // Reset saved data
});

// ===== Test Saving Data =====
// Press 'S' key to log JSON of drawing
document.addEventListener("keydown", (e) => {
    if (e.key === "s" || e.key === "S") {
        console.log(JSON.stringify(drawingData));
        alert("Drawing data copied to console!");
    }
});
