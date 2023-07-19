/**
 * 1. 每一次虚拟列表在更新的时候，每一项的视图可能都不一样
 * 2. 在快速滑动的时候，白屏怎么处理
 * 3. 在滑动的时候，会卡顿，不是性能导致的，是因为渲染不及时又进行了滚动导致的
 * 4. 滑动到底部的时候，你要预留的空间是通过微调来调出来的，不同的场景下微调的距离是不同的，是看你的列表的规划而定的
 *
 * - 核心：有限的DOM中去做无限的DOM渲染、结构渲染
 *
 * - 虚拟列表思路：
 *  列表在上下滚动的时候，通过给列表容器增加padding-top达到列表滚动的条件。列表第一项滚动离开可视区域列表外那一刻，增加padding，并且列表所有项索引+1,来更新列表，虚拟列表的核心是通过增加或减少padding-top且增加padding-bottom来实现的
 *  startIndex = scrollTop / itemHeight
 */

import {
  ITEM_HEIGHT
} from './config';

import { reactive, setCurrentData, setDataSource } from "./reactive";
import { render } from "./render";
import {setAnimationFrame} from "./utils";

;(() => {
  const oScroller = document.querySelector('#J_scrollWrapper');
  const oList = document.querySelector('.list-wrapper');
  const $state = reactive(oList);

  const init = () => {
    initData(1, 20);
    render($state.currentData, $state.paddingSet, oList);
    bindEvent();
  }

  function initData (init, count) {
    setDataSource(init, count);
    setCurrentData();
  }

  function bindEvent () {
    oScroller.addEventListener('scroll', handleScroll, false);
  }

  function handleScroll () {

    /**
     * - 需要考虑到时间问题跟上一次是否渲染完毕了，再去走下一步的程序：节流
     * - requestAnimationFrame：告诉浏览器你需要执行一个动画，并且要求浏览器在下一次重绘之前调用指定的回调函数更新动画执行。该方法接收一个回调函数作为参数，该回调函数会在下一次浏览器重绘之前执行
     * - 人能接受的最低帧数：30帧 => 1s设置3次
     */
    setAnimationFrame(() => {
      $state.startIndex = Math.floor(this.scrollTop / ITEM_HEIGHT);
    });
  }


  init();
})();
