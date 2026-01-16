// ===== Canvas & Context =====
const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 500;

// ===== UI Elements =====
const colorPicker = document.getElementById("colorPicker");
const penSize = document.getElementById("penSize");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");

// ===== Drawing State =====
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let drawingData = [];

// ===== Pen Settings =====
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

// ===== Drawing Logic =====
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

    // Save stroke
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

canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);

// ===== Clear Board =====
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawingData = [];
});

// ===== SAVE TO BACKEND =====
saveBtn.addEventListener("click", async () => {
    const response = await fetch("http://localhost:5000/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(drawingData)
    });

    const result = await response.json();
    alert(result.message);
});

// ===== LOAD FROM BACKEND =====
loadBtn.addEventListener("click", async () => {
    const response = await fetch("http://localhost:5000/load");
    const data = await response.json();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawingData = data;

    // Redraw saved drawing
    data.forEach(line => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.stroke();
    });
});
