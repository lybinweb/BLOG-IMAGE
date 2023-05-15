import { hasOwnProperty, isEqual, isObject } from "../shared/utils";
import { useReactive } from "./index";
import { update } from "../render";
import { statePool } from "../compiler/state";

const get = createGetter(),
      set = createSetter();

function createGetter () {
  return function get (target, key, receiver) {
    const res = Reflect.get(target, key, receiver);

    console.log('响应式获取', res);
    if (isObject(res)) {
      // 深度代理
      return useReactive(res);
    }

    return res;
  }
}

function createSetter () {
  return function set (target, key, value, receiver) {
    // 判断key是否是自身属性
    const isKeyExist = hasOwnProperty(target, key),
          oldValue = target[key],
          res = Reflect.set(target, key, value, receiver);

    if (!isKeyExist) {
      console.log('响应式新增', key, value);
    } else if(!isEqual(value, oldValue)) {
      console.log('响应式修改', key, value);
      // 视图更新
      // Vue做法：有虚拟节点；先模板编译，形成ast树，优化，形成虚拟节点，对比新老节点是否有差异性，如果有在更新，没有则不更新
      update(statePool, key, value);
    }

    return res;
  }
}

const mutableHandler = {
  get,
  set
}

export {
  mutableHandler
};
