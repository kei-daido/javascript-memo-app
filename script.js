let memos = JSON.parse(localStorage.getItem("memos")) || [];

let currentSearch = "";

const addMemoButton = document.getElementById("addMemoButton");
const searchInput = document.getElementById("searchInput");

addMemoButton.addEventListener("click", function () {
  addMemo();
});

searchInput.addEventListener("input", function () {
  currentSearch = searchInput.value;
  renderMemos();
});

renderMemos();

function saveMemos() {
  localStorage.setItem("memos", JSON.stringify(memos));
}

function renderMemos() {
  const memoList = document.getElementById("memoList");
  const emptyMessage = document.querySelector(".empty-message");
  const searchText = currentSearch.toLowerCase();

  memoList.innerHTML = "";

  let displayCount = 0;

  memos.forEach(function (memo, index) {
    const titleMatch = memo.title.toLowerCase().includes(searchText);
    const bodyMatch = memo.body.toLowerCase().includes(searchText);

    if (!titleMatch && !bodyMatch) {
      return;
    }

    displayCount++;

    const memoItem = document.createElement("article");
    memoItem.className = "memo-item";

    const h3 = document.createElement("h3");
    h3.className = "memo-title";
    h3.textContent = memo.title;

    const p = document.createElement("p");
    p.className = "memo-body";
    p.textContent = memo.body;

    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.textContent = "編集";

    editButton.addEventListener("click", function () {
      const editBody = prompt("新しいメモを入力してください", memo.body);

      if (editBody === null) {
        return;
      }

      if (editBody.trim() === "") {
        return;
      }

      memos[index].body = editBody.trim();

      saveMemos();
      renderMemos();
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function () {
      memos.splice(index, 1);
      saveMemos();
      renderMemos();
    });

    memoItem.appendChild(h3);
    memoItem.appendChild(p);
    memoItem.appendChild(editButton);
    memoItem.appendChild(deleteButton);

    memoList.appendChild(memoItem);
  });

  if (memos.length === 0) {
    emptyMessage.textContent = "メモはまだありません";
    emptyMessage.style.display = "block";
  } else if (displayCount === 0) {
    emptyMessage.textContent = "検索結果がありません";
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
}

function addMemo() {
  const memoTitleInput = document.getElementById("memoTitleInput");
  const memoTitleText = memoTitleInput.value.trim();

  const memoBodyInput = document.getElementById("memoBodyInput");
  const memoBodyText = memoBodyInput.value.trim();

  if (memoTitleText === "" && memoBodyText === "") {
    return;
  }

  const newMemo = {
    title: memoTitleText,
    body: memoBodyText,
  };

  memos.push(newMemo);

  saveMemos();
  renderMemos();

  memoTitleInput.value = "";
  memoBodyInput.value = "";
}
