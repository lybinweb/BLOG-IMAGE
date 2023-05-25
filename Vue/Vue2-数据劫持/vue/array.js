import { ARRAY_METHODS } from "./config";
import observeArr from './observeArr';

var originArrMethods = Array.prototype,
    arrMethods = Object.create(originArrMethods);

ARRAY_METHODS.map(function (m) {
  arrMethods[m] = function () {
    // slice会返回一个数组，利用这点特性将类数组转换为数组
    var args = Array.prototype.slice.call(arguments),
        rt = originArrMethods[m].apply(this, args);

    var newArr;

    switch (m) {
      case 'push':
      case 'unshift':
        newArr = args;
        break;
      case 'splice':
        newArr = args.slice(2);
        break;
      default:
        break;
    }

    newArr && observeArr(newArr);
    return rt;
  }
});

export {
  arrMethods
}
