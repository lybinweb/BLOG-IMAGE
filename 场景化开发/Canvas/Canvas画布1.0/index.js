// 获取画布DOM对象
const oCan = document.getElementById('can');

// 获取画布上下文
const ctx = oCan.getContext('2d'); // CanvasRenderingContext2D

const oColorInput = document.getElementById('colorInput');
const oLineWidthRange = document.getElementById('lineWidthRange');
const oLineWidthValue = document.getElementById('lineWidthValue');
const oClearAllBtn = document.getElementById('clearAllBtn');
const oEraserBtn = document.getElementById('eraserBtn');
const oEraserLineWidthRange = document.getElementById('eraserLineWidthRange');
const oEraserLineWidthValue = document.getElementById('eraserLineWidthValue');
const oEraserCircle = document.getElementById('eraserCircle');

const clientWidth = document.documentElement.clientWidth;
const clientHeight = document.documentElement.clientHeight;

// 不是给canvas标签增加样式，而是给画布增加样式
oCan.width = clientWidth;
oCan.height = clientHeight;

const state = {
  initPos: null,
  eraserStatus: false, // 橡皮擦启动状态
  drewData: [], // 画过的容器
  revokedData: [], // 撤销的时候将drewDate最后一项输入移入到revokedData里去
}

const DATA_FIELD = {
  DREW: 'drewData',
  REVOKED: 'revokedData'
}

const DATA_TYPE = {
  MOVE_TO: 'moveTo',
  LINE_TO: 'lineTo'
}

const CANVAS_VALUES = {
  DEFAULT_COLOR: '#000',
  DEFAULT_LINE_STYLE: 'round',
  DEFAULT_LINE_WIDTH: 1,
  ERASER_COLOR: '#FFF'
}

const KEYBOARD = {
  UNDO: 'z', // 撤销
  REDO: 'b', // 还原
}

const clearAll = () => {
  ctx.clearRect(0, 0, oCan.offsetWidth, oCan.offsetHeight);
}

oEraserCircle.setVisible = function (visible) {
  this.style.display = visible ? 'block' : 'none';
}

oEraserCircle.setSize = function (size) {
  this.style.width = size + 'px';
  this.style.height = size + 'px';
}

oEraserCircle.setPosition = function (x, y) {
  this.style.left = x - this.offsetWidth / 2 + 'px';
  this.style.top = y - this.offsetHeight / 2 + 'px';
}

const init = () => {
  initStyle();
  bindEvent();
}

const bindEvent = () => {
  oCan.addEventListener('mousedown', handleCanvasMouseDown, false);
  oColorInput.addEventListener('click', handleColorInput, false);
  oColorInput.addEventListener('input', handleColorInput, false);
  oLineWidthRange.addEventListener('input', handleLineWidthRangeInput, false);
  oClearAllBtn.addEventListener('click', handleClearAllBtnClick, false);
  oEraserBtn.addEventListener('click', handleEraserBtnClick, false);
  oEraserLineWidthRange.addEventListener('input', handleEraserLineWidthRangeInput, false);
  document.addEventListener('keydown', handleKeyDown, false);
}

function handleKeyDown (e) {
  const key = e.key;

  // if (e.metaKey && (Object.values(KEYBOARD)).includes(key)) {
  if (!e.metaKey && (Object.values(KEYBOARD)).includes(key)) {
    doDrewRecord(key);
    drawBatchLine();
  }

  if (!state[DATA_FIELD.DREW].length || !state[DATA_FIELD.REVOKED].length) {
    ctx.setColor(oColorInput.value);
    ctx.setLineWidth(oLineWidthRange.value);
  }
}

function handleEraserBtnClick (e) {
  const lineWidthValue = oEraserLineWidthRange.value;
  state.eraserStatus = true;

  ctx.setColor(CANVAS_VALUES.ERASER_COLOR);
  ctx.setLineWidth(lineWidthValue);
  oEraserCircle.setSize(lineWidthValue);
}

function handleEraserLineWidthRangeInput (e) {
  const lineWidth = this.value;
  oEraserLineWidthValue.textContent = lineWidth;
  oEraserCircle.setSize(lineWidth);
  state.eraserStatus && ctx.setLineWidth(lineWidth);
}

function handleClearAllBtnClick () {
  clearAll();
}

function handleLineWidthRangeInput () {
  const lineWidth = this.value;

  oLineWidthValue.textContent = lineWidth;
  ctx.setLineWidth(lineWidth);
}

function handleColorInput () {
  const color = this.value;
  ctx.setLineWidth(oLineWidthRange.value);
  ctx.setColor(color);
  oEraserCircle.setVisible(false);
  state.eraserStatus = false;
}

function handleCanvasMouseDown (e) {
  const x1 = e.clientX;
  const y1 = e.clientY;

  state.initPos = { x1, y1 };
  setDrewRecord(DATA_TYPE.MOVE_TO, [ x1, y1 ]);
  drawPoint(x1, y1);

  oCan.addEventListener('mousemove', handleCanvasMouseMove, false);
  oCan.addEventListener('mouseup', handleCanvasMouseUp, false);

  if (state.eraserStatus) {
    oEraserCircle.setVisible(true);
    oEraserCircle.setPosition(x1, y1);
    oEraserCircle.addEventListener('mouseup', handleEraserCircleMouseUp, false);
  }
}

function handleEraserCircleMouseUp (e) {
  oEraserCircle.setVisible(false);
  oEraserCircle.removeEventListener('mouseup', handleEraserCircleMouseUp, false);
  handleCanvasMouseUp();
}

function drawPoint (x, y) {
  ctx.beginPath();
  ctx.arc(x, y, ctx.lineWidth / 2, 0, 2 * Math.PI, false);
  ctx.fill();
}

function handleCanvasMouseMove (e) {
  const x2 = e.clientX;
  const y2 = e.clientY;

  drawLine({ ...state.initPos, x2, y2 });
  setDrewRecord(DATA_TYPE.LINE_TO, [ x2, y2 ]);
  state.eraserStatus && oEraserCircle.setPosition(x2, y2);
  state.initPos = { x1: x2, y1: y2 };
}

function drawLine ({ x1, y1, x2, y2 }) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawBatchLine () {
  clearAll();

  state[DATA_FIELD.DREW].forEach(item => {
    ctx.beginPath();
    const {
      moveTo: [ x1, y1 ],
      lineTo,
      info: {
        color,
        width
      }
    } = item;

    ctx.setColor(color);
    ctx.setLineWidth(width);
    ctx.moveTo(x1, y1);

    lineTo.forEach(line => {
      ctx.lineTo(...line);
    });

    ctx.stroke();
  })
}

function handleCanvasMouseUp (e) {
  oCan.removeEventListener('mousemove', handleCanvasMouseMove, false);
  oCan.removeEventListener('mouseup', handleCanvasMouseUp, false);
}

const initStyle = () => {
  ctx.setColor(CANVAS_VALUES.DEFAULT_COLOR);
  ctx.setLineStyle(CANVAS_VALUES.DEFAULT_LINE_STYLE);
  ctx.setLineWidth(CANVAS_VALUES.DEFAULT_LINE_WIDTH);
}

ctx.setColor = function (color) {
  this.strokeStyle = color;
  this.fillStyle = color;
}

ctx.getColor = function () {
  return this.strokeStyle;
}

ctx.setLineStyle = function (style) {
  this.lineCap = style;
  this.lineJoin = style;
}

ctx.setLineWidth = function (width) {
  this.lineWidth = width;
}

ctx.getLineWidth = function () {
  return this.lineWidth;
}

function setDrewRecord (type, data) {
  switch (type) {
    case DATA_TYPE.MOVE_TO:
      state[DATA_FIELD.DREW].push({
        [DATA_TYPE.MOVE_TO]: [ ...data ], // x y
        [DATA_TYPE.LINE_TO]: [],
        info: {
          color: ctx.getColor(),
          width: ctx.getLineWidth()
        }
      });
      break;
    case DATA_TYPE.LINE_TO:
      const drewData = state[DATA_FIELD.DREW];
      drewData[drewData.length - 1][DATA_TYPE.LINE_TO].push([ ...data ]);
      break;
    default:
      break;
  }
}

function doDrewRecord (key) {
  switch (key) {
    case KEYBOARD.UNDO:
      state[DATA_FIELD.DREW].length > 0
        &&
        state[DATA_FIELD.REVOKED].push(state[DATA_FIELD.DREW].pop());
      break;
    case KEYBOARD.REDO:
      state[DATA_FIELD.REVOKED].length > 0
        &&
        state[DATA_FIELD.DREW].push(state[DATA_FIELD.REVOKED].pop());
      break;
    default:
      break;
  }
}

init();

