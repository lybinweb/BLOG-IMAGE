import observe from "./observe";

function defineReactiveData (data, key, value) {
  // value 有可能还是对象或者数组
  observe(value); // 递归观察
  Object.defineProperty(data, key, {
    // 响应式数据获取
    get () {
      return value;
    },
    // 响应式数据设置
    set (newValue) {
      if (newValue === value) return;
      // newValue 也可能是对象或数组
      observe(newValue);
      value = newValue;
    }
  })
}

export default defineReactiveData;
