import {TIME_PRE_FPS} from "./config";

/** 模拟获取数据 */
export function getData (init, count) {
  const arr = [];

  for (let i = init; i <= count; i ++) {
    arr.push(i);
  }

  return arr;
}

export function setAnimationFrame (callback) {
  let beginTime = Date.now();

  requestAnimationFrame(function cb () {
    let endTime = Date.now();

    callback();

    if (endTime - beginTime >= TIME_PRE_FPS) {
      beginTime = endTime;
      requestAnimationFrame(cb);
    }
  });
}
