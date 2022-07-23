const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');

const colorInput = document.getElementById('jsColorInput');
const colorOptions = Array.from(document.getElementsByClassName('jsColor'));
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');
const clear = document.getElementById('jsClear');
const eraser = document.getElementById('jsEraser');
const fileInput = document.getElementById('jsFile');
const textInput = document.getElementById('jsText');

const INITIAL_COLOR = '#000000';

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = range.value;
ctx.lineCap = 'round';

let isPainting = false;
let isFilling = false;

function stopPainting() {
  isPainting = false;
}
function startPainting() {
  isPainting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!isPainting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleModeClick() {
  if (isFilling) {
    isFilling = false;
    mode.innerText = 'Fill';
  } else {
    isFilling = true;
    mode.innerText = 'Paint';
  }
}

function handleSaveClick() {
  const imgUrl = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = imgUrl;
  link.download = '내 그림';
  link.click();
}

function handleContextMenu(event) {
  event.preventDefault();
}

function handleColorInput(event) {
  ctx.fillStyle = event.target.value;
  ctx.strokeStyle = event.target.value;
}

function handleColorClick(event) {
  const selectedColor = event.target.dataset.color;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  colorInput.value = selectedColor;
  function handleCanvasClick() {
    if (isFilling) {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
  canvas.addEventListener('click', handleCanvasClick);
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size * 2;
}

function handleClearClick() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleEraserClick() {
  ctx.strokeStyle = 'white';
  isFilling = false;
  mode.innerText = 'Fill';
}

function handleFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== '') {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = '80px serif';
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseleave', stopPainting);
canvas.addEventListener('contextmenu', handleContextMenu);
canvas.addEventListener('dblclick', onDoubleClick);
mode.addEventListener('click', handleModeClick);
colorInput.addEventListener('input', handleColorInput);
colorOptions.forEach((color) =>
  color.addEventListener('click', handleColorClick)
);
range.addEventListener('input', handleRangeChange);
clear.addEventListener('click', handleClearClick);
eraser.addEventListener('click', handleEraserClick);
save.addEventListener('click', handleSaveClick);
fileInput.addEventListener('change', handleFileChange);
