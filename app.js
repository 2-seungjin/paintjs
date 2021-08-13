const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const rgba = document.getElementById('jsRange');
const colors = document.getElementsByClassName('jsColor');

canvas.width = 700;
canvas.height = 700;
ctx.strokeStyle = '#2c2c2c';

ctx.lineWidth = rgba.value;
const linewidth = () => {
  ctx.lineWidth = rgba.value;
}


let painting = false;


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
}
if(canvas){
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  rgba.addEventListener('mouseup', linewidth)
}
Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick))
