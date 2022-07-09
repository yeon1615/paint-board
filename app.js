const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');

ctx.strokeStyle = '#000000';
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

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleve', stopPainting);
}

function handleColorClick(event) {
  const selectedColor = event.target.style.backgroundColor;
  ctx.strokeStyle = selectedColor;
  function handleCanvasClick() {
    if (mode.innerText === 'PAINT') {
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

// fill 버튼 누르면 paint로 바뀌기
// 버튼 텍트가 paint인 상태에서 색상버튼 클릭감지
// 클릭한 색상버튼으로 캔버스 누르면 캔버스 전체 색상 채우기

const mode = document.getElementById('jsMode');
function handleModeClick() {
  if (mode.innerText === 'FILL') {
    mode.innerText = 'PAINT';
  } else {
    mode.innerText = 'FILL';
  }
}
mode.addEventListener('click', handleModeClick);
