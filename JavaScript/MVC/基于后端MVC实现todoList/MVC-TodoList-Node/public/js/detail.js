import {
  httpPost
} from "./http.js";

;(() => {

  const oRemoveBtn = document.querySelector('.remove-btn');

  const init = () => {
    bindEvent();
  }

  function bindEvent () {
    oRemoveBtn.addEventListener('click', handleRemoveBtnClick, false);
  }

  function handleRemoveBtnClick (e) {
    const tar = e.target;
    const id = tar.dataset.id;

    removeTodo(id).then(res => {
      if (res.code === 0) {
        location.href = 'http://localhost:8080';
      }
    });
  }

  async function removeTodo (id) {
    return await httpPost(
      'http://localhost:8081/remove_todo',
      { id }
    )
  }

  init();
})();
