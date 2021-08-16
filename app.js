const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');


const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(event){
  painting = false;
}
function startPainting(){
  painting = true;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    // Path 는 선을 생성하는 함수
    ctx.beginPath();
    // X, Y 에 선을 그려주는 함수
    ctx.moveTo(x,y);
  }else {
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}
const handleColorClick = (event) => {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = ctx.strokeStyle;
}
const handleRangeChange = (event) => {
  ctx.lineWidth = event.target.value;
}
const handleModeClick = () => {
  if(filling === true){
    filling = false;
    mode.innerText = "Fill"
  }else {
    filling = true;
    mode.innerText = "paint";
    ctx.fillStyle = ctx.strokeStyle;
  }
}
const handleCanvasClick = () => {
  if(filling){
    ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
  }
}
const handleCM = (event) => {
  event.preventDefault();
}
const handleSaveClick = () => {
  const image = canvas.toDataURL(); // 설정이 없다면 png로 저장
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS[EXPORT]';
  link.click();
}

if(canvas){
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM)
}
if(colors){
  Array.from(colors).forEach(color =>
    color.addEventListener('click', handleColorClick)
  );
}

if(range){
  range.addEventListener('input', handleRangeChange);
}

if(mode){
  mode.addEventListener('click', handleModeClick);
}
if(saveBtn){
  saveBtn.addEventListener('click', handleSaveClick);
}
