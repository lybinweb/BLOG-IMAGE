import defineReactiveData from "./reactive";
import { arrMethods } from "./array";
import observeArr from "./observeArr";

function Observer (data) {
  if (Array.isArray(data)) {
    // Array方法会修改源数组，没法劫持，所以要重写Array方法
    data.__proto__ = arrMethods;
    observeArr(data);
  } else {
    this.walk(data);
  }
}

/**
 * {}
 * key - value 重新定义
 */
Observer.prototype.walk = function (data) {
  var keys = Object.keys(data);

  for (var i = 0; i < keys.length; i ++) {
    var key = keys[i],
        value = data[key];

    defineReactiveData(data, key, value);
  }
}

export default Observer;

/**
 * {} -> defineProperty
 * [] -> 自己去写方法
 */
