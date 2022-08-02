// Dom elements
const colorEl = document.getElementById("color");
const size = document.getElementById("size");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const clear = document.getElementById("clear");
const undo = document.getElementById("undo");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let x, y;
let isPressed = false;
colorEl.value = "black";
let color = colorEl.value;
let width = +size.textContent;
let restore_array = [];
let index = -1;

//Event Listeners
clear.addEventListener("click", clearCanvas);

increase.addEventListener("click", increases);

decrease.addEventListener("click", decreases);

colorEl.addEventListener("change", changeColor);

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
  draw(e);
});

canvas.addEventListener("mouseup", () => {
  isPressed = false;
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

undo.addEventListener("click", undo_last);

// Functions
function draw(e) {
  if (!isPressed) return;
  const x = e.offsetX;
  const y = e.offsetY;
  ctx.lineTo(x, y);
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
   ctx.fillStyle = color;
  ctx.lineWidth = width * 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);

  restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  index += 1;
}

function changeColor(e) {
  color = e.target.value;
}

function increases() {
  if (width < 35) {
    size.innerText = width + 1;
    width = +size.innerText;
  } else {
    width = 35;
    size.innerText = 35;
  }
}

function decreases() {
  if (width > 1) {
    size.innerText = width - 1;
    width = +size.innerText;
  } else {
    width = 1;
    size.innerText = 1;
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.width);
}

function undo_last() {
  if (index <= 0) {
    clearCanvas();
  } else {
    index -= 1;
    restore_array.pop();
    ctx.putImageData(restore_array[index], 0, 0);
  }
}

// function drawCircle(x, y)  {
//   ctx.beginPath();
//   ctx.arc(x, y, size, 0, Math.PI * 2);
//   ctx.fillStyle = color;
//   ctx.fill();
// }

// function drawLine(x1, y1, x2, y2) {
//   ctx.beginPath();
//   ctx.moveTo(x1, y1);
//   ctx.lineTo(x2, y2);
//   ctx.strokeStyle = color;
//   ctx.lineWidth = size * 2;
//   ctx.stroke();
// }
