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
