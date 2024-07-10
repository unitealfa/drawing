const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let isTracking = false;
let points = [];
const maxPoints = 35;

window.addEventListener("resize", resizeCanvas);
window.addEventListener("mousedown", (e) => {
    isTracking = true;
    points.push({ x: e.pageX, y: e.pageY });
    drawLine();
});

window.addEventListener("mousemove", (e) => {
    if (isTracking) {
        points.push({ x: e.pageX, y: e.pageY });
        if (points.length > maxPoints) {
            points.shift();
        }
        drawLine();
    }
});

window.addEventListener("mouseup", () => {
    isTracking = false;
});

canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    isTracking = true;
    const touch = e.touches[0];
    points.push({ x: touch.pageX, y: touch.pageY });
    drawLine();
});

canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (isTracking) {
        const touch = e.touches[0];
        points.push({ x: touch.pageX, y: touch.pageY });
        if (points.length > maxPoints) {
            points.shift();
        }
        drawLine();
    }
});

canvas.addEventListener("touchend", () => {
    isTracking = false;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    clearCanvas();
    drawLine(); // Redessine après redimensionnement
}

function drawLine() {
  clearCanvas();
  if (points.length === 0) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.lineWidth = 8;

  // Premier coup de pinceau avec ombre violette
  ctx.strokeStyle = "white";
  ctx.shadowColor = "rgba(148, 0, 211, 1)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.stroke();

  // Deuxième coup de pinceau avec ombre blanche
  ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
  ctx.shadowBlur = 10;
  ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

resizeCanvas();
