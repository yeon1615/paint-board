const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');

const INITIAL_COLOR = '#000000';

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

let filling = false;

function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
}
mode.addEventListener('click', handleModeClick);

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = '내 그림';
  link.click();
}
save.addEventListener('click', handleSaveClick);

function handleContextMenu(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('contextmenu', handleContextMenu);
}

function handleColorClick(event) {
  const selectedColor = event.target.style.backgroundColor;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  function handleCanvasClick() {
    if (filling) {
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      canvas.style.backgroundColor = selectedColor;
    }
  }
  canvas.addEventListener('click', handleCanvasClick);
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size * 2;
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', handleColorClick)
);

range.addEventListener('input', handleRangeChange);
