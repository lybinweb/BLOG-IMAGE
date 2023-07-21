// 1. 获取画布对象
const oCan = document.getElementById('can');
// 2. 获取绘制2d的渲染上下文
const ctx = oCan.getContext('2d'); // CanvasRenderingContext2D

// 保存客户端元素
const documentElement = document.documentElement;

// 3. 设置画布的宽高
oCan.width = documentElement.clientWidth;
oCan.height = documentElement.clientHeight;

let rectInfo = null; // [x, y, w, h]
const rectWrapper = []; // [ [x, y, w, h], [x, y, w, h], ... ]

let type = 'fill';

const init = () => {
  bindEvent();
}

function bindEvent () {
  oCan.addEventListener('mousedown', handleCanvasMouseDown, false);
}

function handleCanvasMouseDown (e) {

  rectInfo = [e.clientX, e.clientY];

  oCan.addEventListener('mousemove', handleCanvasMouseMove, false);
  oCan.addEventListener('mouseup', handleCanvasMouseUp, false);

}

function handleCanvasMouseMove (e) {
  createRect(rectInfo[0], rectInfo[1], e.clientX, e.clientY);
}

function handleCanvasMouseUp () {
  saveRect();
  oCan.removeEventListener('mousemove', handleCanvasMouseMove);
  oCan.removeEventListener('mouseup', handleCanvasMouseUp);
}

function createRect (x1, y1, x2, y2) {
  const w = Math.abs(x2 - x1);
  const h = Math.abs(y2 - y1);
  rectInfo = [x1, y1, w, h];

  clearRect(0, 0, oCan.width, oCan.height);

  switch (type) {
    case 'stroke':
      strokeRects();
      strokeRect(...rectInfo);
      break;
    case 'fill':
      fillRects();
      fillRect(...rectInfo);
      break;
    default:
      break;
  }
}

function clearRect (x, y, w, h) {
  ctx.clearRect(x, y, w, h);
}

function strokeRect (x, y, w, h) {
  ctx.strokeRect(x, y, w, h);
}

function fillRect (x, y, w, h) {
  ctx.fillRect(x, y, w, h);
}

function strokeRects () {
  rectWrapper.forEach(([ x, y, w, h]) => strokeRect(x, y, w, h));
}

function fillRects () {
  rectWrapper.forEach(([ x, y, w, h]) => fillRect(x, y, w, h));
}

function saveRect () {
  rectWrapper.push(rectInfo);
}

init();
