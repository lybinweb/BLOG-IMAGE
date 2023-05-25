import proxy from "./proxy";
import observe from "./observe";

function initState (vm) {
  var options = vm.$options;

  if (options.data) {
    initData(vm);
  }
}

function initData (vm) {
  var data = vm.$options.data;

  vm._data = data = typeof data === 'function' ? data.call(vm) : data || {};

  for (var key in data) {
    // 数据劫持
    proxy(vm, '_data', key);
  }

  // 对data进行观察
  observe(vm._data);
}

export {
  initState
}
