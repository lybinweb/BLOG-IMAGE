

# 原生JS实现虚拟列表

## 什么是虚拟列表

- 概念：虚拟列表是一种优化长列表显示的技术。当列表数据量过大的时候，传统的做法是将每一项数据都会渲染到浏览器页面上，这样会导致页面加载过慢、卡顿、占用内存较高、影响用户体验的现象。而虚拟列表的做法是页面DOM列表的长度是固定的，动态的改变每一项，从而达到视觉上就是长列表的技术。

## 虚拟列表的注意事项跟实现思路

- 虚拟列表需要考虑的问题：
  1. 每一次虚拟列表在更新的时候，每一项的视图可能都不一样
  2. 在快速滑动的时候，白屏怎么处理
  3. 在滑动的时候，会卡顿，不是性能导致的，是因为渲染不及时又进行了滚动导致的
  4. 滑动到底部的时候，你要预留的空间是通过微调来调出来的，不同的场景下微调的距离是不同的，是看你的列表的规划而定的
 
- 虚拟列表的核心：**有限的DOM中去做无限的DOM渲染、结构渲染**

- 虚拟列表思路：
  1. 列表在上下滚动的时候，通过给列表容器增加padding-top达到列表滚动的条件。列表第一项滚动离开可视区域列表外那一刻，增加上padding，并且列表所有项索引+1了，来更新列表，他的核心是通过增加或减少padding-top且增加padding-bottom来实现的
  2. startIndex = scrollTop / itemHeight

- 实现虚拟列表需要弄清楚的前置条件：
  1. 列表数据dataSource（可能通过请求一次又一次动态获取）
  2. 可视区域列表数据currentData
  3. 列表项的高度ITEM_HEIGTH（定值）
  4. 可视区域列表最大容纳列表项个数MAX_ITEM_COUNT
  5. 可视区域列表的开始索引startIndex（核心）
  6. 可视区域列表的结束索引endIndex
  7. 可视区域列表的上下padding

## 实现

- 目录结构
  - index.html
  - app.js
  - config.js
  - utils.js
  - reactive.js
  - render.js

### index.html

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
    <style>
      body {
        margin: 0;
      }

      .scroll-wrapper {
        height: 100vh;
        overflow-y: auto;
      }

      .list-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        border-bottom: 1px solid #000;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="scroll-wrapper" id="J_scrollWrapper">
        <div class="list-wrapper"></div>
      </div>
    </div>
    
    <script type="module" src="./app.js"></script>
  </body>
</html>

```

### app.js

```js

```

### config.js

```js

export const ITEM_HEIGHT = 101;
export const MAX_ITEM_COUNT = Math.ceil(document.querySelector('#J_scrollWrapper').offsetHeight / ITEM_HEIGHT) + 1; //
export const TIME_PRE_FPS = 1000 / 30; // 1s更新的帧数次数

```

### utils.js

```js
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

```

### reactive.js

```js
import { ITEM_HEIGHT, MAX_ITEM_COUNT } from "./config";
import { getData } from "./utils";
import { update, updatePaddingSet } from "./render";

const $state = {};

const data = {
  dataSource: [],
  currentData: [],
  startIndex: 0,
  endIndex: 0,
  paddingSet: {
    paddingTop: 0,
    paddingBottom: 0
  }
};

export function reactive (oList) {
  Object.defineProperties($state, {
    dataSource: {
      get () {
        return data.dataSource;
      },
      set (newValue) {
        data.dataSource = newValue;
        // set currentData
        setCurrentData();
      }
    },
    currentData: {
      get () {
        return data.currentData;
      },
      set (newValue) {
        data.currentData = newValue;
        // update view
        update($state.currentData, oList);
      }
    },
    startIndex: {
      get () {
        return data.startIndex;
      },
      set (newValue) {
        if ($state.startIndex !== newValue) {
          data.startIndex = newValue;
          // set currentData
          setCurrentData();
          // set dataSource (endIndex >= dataSource.length - 1)
          $state.endIndex >= $state.dataSource.length - 1 && setDataSource($state.dataSource.length + 1, $state.dataSource.length * 2);
          // set padding
          setPaddingSet();
        }
      }
    },
    endIndex: {
      get () {
        return setEndIndex();
      },
    },
    paddingSet: {
      get () {
        return data.paddingSet;
      },
      set (newValue) {
        data.paddingSet = newValue;
        // update view padding
        updatePaddingSet($state.paddingSet, oList);
      }
    }
  });

  return $state;
}

function setEndIndex () {
  const endIndex = $state.startIndex + MAX_ITEM_COUNT * 2;

  return $state.dataSource[endIndex] ? endIndex : $state.dataSource.length - 1;
}

export function setDataSource (init, count) {
  $state.dataSource = [
    ...$state.dataSource,
    ...getData(init, count)
  ]
}

export function setCurrentData () {
  const startIndex = resetStartIndex();
  $state.currentData = $state.dataSource.slice(startIndex, $state.endIndex);
}

export function setPaddingSet () {
  const startIndex = resetStartIndex();
  $state.paddingSet = {
    paddingTop: startIndex * ITEM_HEIGHT,
    paddingBottom: ($state.dataSource.length - $state.endIndex) * ITEM_HEIGHT
  }
}

export function resetStartIndex () {
  return $state.startIndex <= MAX_ITEM_COUNT ? 0 : $state.startIndex - MAX_ITEM_COUNT;
}

```

### render.js

```js
export function render (currentData, paddingSet, list) {
  const oFragment = document.createDocumentFragment();

  currentData.forEach(item => {
    const oItem = document.createElement('div');
    oItem.className = 'list-item';
    oItem.innerText = item;

    oFragment.appendChild(oItem);
  });

  list.appendChild(oFragment);
  updatePaddingSet(paddingSet, list);
}

export function update (currentData, list) {
  const oItems = list.querySelectorAll('.list-item');

  oItems.forEach((item, index) => {
    item.innerText = currentData[index];
  })
}

export function updatePaddingSet (paddingSet, list) {
  for (let key in paddingSet) {
    list.style[key] = paddingSet[key] + 'px';
  }
}

```