import { randomNum } from "../shared/utils";

const reg_html = /\<.+?\>\{\{(.+?)\}\}\<\/.+?\>/g,
      reg_tag = /\<(.+?)\>/,
      reg_var = /\{\{(.+?)\}\}/g;


// 还需要在更新函数中用
export const statePool = [];
/**
 * statePool []
 * {
 *   mark: _mark,
 *   state: value
 * }
 */

let o = 0;
export function stateFormat (template, state) {

  let _state = {};

  template = template.replace(reg_html, function (node, key) {
    const matched = node.match(reg_tag);
    const _mark = randomNum();

    _state.mark = _mark;

    statePool.push(_state);

    _state = {};

    return `<${matched[1]} data-mark="${_mark}">{{${key}}}</${matched[1]}>`;
  });

  template = template.replace(reg_var, function (node, key) {
    let _var = key.trim();

    const _varArr = _var.split('.');

    let i = 0;
    while (i < _varArr.length) {
      _var = state[_varArr[i]];
      i ++;
    }

    _state.state = _varArr;

    statePool[o].state = _varArr;

    o++;

    return _var;
  });

  return template;
}
