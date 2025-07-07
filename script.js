// 定义牌值排序
const rankOrder = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const suitOrder = ["Club", "Diamond", "Heart", "Spade"];

// 原始牌名列表
const cardImages = [
  "Background.png",
  "Club10.png",
  "Club2.png",
  "Club3.png",
  "Club4.png",
  "Club5.png",
  "Club6.png",
  "Club7.png",
  "Club8.png",
  "Club9.png",
  "ClubA.png",
  "ClubJ.png",
  "ClubK.png",
  "ClubQ.png",
  "Diamond10.png",
  "Diamond2.png",
  "Diamond3.png",
  "Diamond4.png",
  "Diamond5.png",
  "Diamond6.png",
  "Diamond7.png",
  "Diamond8.png",
  "Diamond9.png",
  "DiamondA.png",
  "DiamondJ.png",
  "DiamondK.png",
  "DiamondQ.png",
  "Heart10.png",
  "Heart2.png",
  "Heart3.png",
  "Heart4.png",
  "Heart5.png",
  "Heart6.png",
  "Heart7.png",
  "Heart8.png",
  "Heart9.png",
  "HeartA.png",
  "HeartJ.png",
  "HeartK.png",
  "HeartQ.png",
  "Spade10.png",
  "Spade2.png",
  "Spade3.png",
  "Spade4.png",
  "Spade5.png",
  "Spade6.png",
  "Spade7.png",
  "Spade8.png",
  "Spade9.png",
  "SpadeA.png",
  "SpadeJ.png",
  "SpadeK.png",
  "SpadeQ.png",
];

let draggedCard = null;

// 解析牌名获取点数和花色
function parseCardName(name) {
  const match = name.match(/(Club|Diamond|Heart|Spade)([2-9]|10|J|Q|K|A)\.png/);
  if (!match) return { suit: "", rank: "" };
  return { suit: match[1], rank: match[2] };
}

// 自定义排序函数（按点数+花色排序）
function sortCards(cards) {
  return cards.sort((a, b) => {
    const cardA = parseCardName(a.dataset.name);
    const cardB = parseCardName(b.dataset.name);

    const rankA = rankOrder.indexOf(cardA.rank);
    const rankB = rankOrder.indexOf(cardB.rank);

    if (rankA !== rankB) return rankA - rankB;
    return suitOrder.indexOf(cardA.suit) - suitOrder.indexOf(cardB.suit);
  });
}

// 修改createCardElement函数，将ID显示在右上角
function createCardElement(imgName) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundImage = `url('PNG/${imgName}')`;
  card.dataset.name = imgName;
  card.draggable = true;

  const { suit, rank } = parseCardName(imgName);
  const { cardId, numericValue } = getCardInfo(suit, rank);

  // 创建右上角显示容器
  const idContainer = document.createElement("div");
  idContainer.className = "card-id-container";

  // 牌ID（第一行）
  const idElement = document.createElement("div");
  idElement.className = "card-id";
  idElement.textContent = cardId;
  idContainer.appendChild(idElement);

  // 数字值（第二行）
  const valueElement = document.createElement("div");
  valueElement.className = "card-value";
  valueElement.textContent = numericValue;
  idContainer.appendChild(valueElement);

  card.appendChild(idContainer);

  card.dataset.cardId = cardId;
  card.dataset.numericValue = numericValue;

  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);

  return card;
}

// 新增函数：获取牌ID和数字值
function getCardInfo(suit, rank) {
  if (!suit || !rank) return { cardId: "Invalid", numericValue: "0" };

  const suitPrefix =
    suit === "Spade"
      ? "S"
      : suit === "Heart"
      ? "H"
      : suit === "Club"
      ? "C"
      : "D";

  // 定义牌面值对应的数字
  const rankToValue = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  const numericValue = rankToValue[rank] || 0;

  // 生成牌ID
  let cardId;
  if (["A", "J", "Q", "K"].includes(rank)) {
    cardId = `${rank}${suitPrefix}`;
  } else {
    cardId = `R${rank}${suitPrefix}`;
  }

  return { cardId, numericValue };
}

function getCardInfo(suit, rank) {
  if (!suit || !rank) return { cardId: "Invalid", numericValue: "0" };

  const suitPrefix =
    suit === "Spade"
      ? "S"
      : suit === "Heart"
      ? "H"
      : suit === "Club"
      ? "C"
      : "D";

  // 生成牌ID
  let cardId;
  if (["A", "J", "Q", "K"].includes(rank)) {
    cardId = `${rank}${suitPrefix}`;
  } else {
    cardId = `R${rank}${suitPrefix}`;
  }

  // 计算对应的数字值
  const suitOrder = { D: 0, C: 1, H: 2, S: 3 };
  const rankOrder = {
    2: 1,
    3: 5,
    4: 9,
    5: 13,
    6: 17,
    7: 21,
    8: 25,
    9: 29,
    10: 33,
    J: 37,
    Q: 41,
    K: 45,
    A: 49,
  };

  const numericValue = rankOrder[rank] + suitOrder[suitPrefix];

  return { cardId, numericValue };
}

// 初始化所有牌并排序
function initAllCards() {
  const allCardsDiv = document.getElementById("all-cards");
  allCardsDiv.innerHTML = "";

  const sortedCards = [
    ...cardImages.filter((c) => c !== "Background.png"),
  ].sort((a, b) => {
    const aData = parseCardName(a);
    const bData = parseCardName(b);

    const rankA = rankOrder.indexOf(aData.rank);
    const rankB = rankOrder.indexOf(bData.rank);

    if (rankA !== rankB) return rankA - rankB;
    return suitOrder.indexOf(aData.suit) - suitOrder.indexOf(bData.suit);
  });

  // 创建并添加所有牌
  sortedCards.forEach((imgName) => {
    const card = createCardElement(imgName);
    allCardsDiv.appendChild(card);
  });

  updatePublicCardCount(); // 初始显示剩余牌数
}

// 创建公共牌背（不可拖动）
function createPublicBackground() {
  const background = document.createElement("div");
  background.classList.add("background-card");

  const countEl = document.createElement("div");
  countEl.classList.add("count");
  countEl.textContent = "剩余牌数";
  background.appendChild(countEl);

  return background;
}

// 更新公共牌区域的剩余牌数
function updatePublicCardCount() {
  const allCardsDiv = document.getElementById("all-cards");
  const publicZone = document.getElementById("public-cards");

  // 确保牌背存在
  if (publicZone.children.length === 0) {
    publicZone.appendChild(createPublicBackground());
  }

  const background = publicZone.querySelector(".background-card");
  const countEl = background.querySelector(".count");
  countEl.textContent = allCardsDiv.querySelectorAll(".card").length;
}

// 初始化公共牌区域
function initPublicCard() {
  const publicZone = document.getElementById("public-cards");
  publicZone.innerHTML = "";
  publicZone.appendChild(createPublicBackground());
}

// 初始化玩家
function initPlayers(count = 4) {
  const gameArea = document.getElementById("game-area");
  gameArea.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const playerDiv = document.createElement("div");
    playerDiv.className = "player";
    playerDiv.setAttribute("data-player", i);

    // 标题行（仅输入框）
    const header = document.createElement("div");
    header.className = "player-header";
    const input = document.createElement("input");
    input.type = "text";
    input.value = `玩家${i}`;
    input.onchange = () => {};
    header.appendChild(input);

    // 手牌区（只允许从 所有牌 拖入）
    const handZone = document.createElement("div");
    handZone.className = "hand-cards";
    handZone.setAttribute("data-player", i);
    const handLabel = document.createElement("div");
    handLabel.className = "zone-label";
    handLabel.textContent = "手牌区";

    // 出牌区（覆盖式更新）
    const discardZone = document.createElement("div");
    discardZone.className = "discard-zone";
    discardZone.setAttribute("data-player", i);
    const discardLabel = document.createElement("div");
    discardLabel.className = "zone-label";
    discardLabel.textContent = "出牌区";

    // 区域牌（多个组合区 + 加号按钮）
    const regionContainer = document.createElement("div");
    const regionTitle = document.createElement("div");
    regionTitle.className = "zone-label";
    regionTitle.textContent = "区域牌";

    // 加号按钮
    const addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.className = "add-region-btn";
    addBtn.onclick = () => addRegionGroup(regionContainer);

    regionTitle.appendChild(addBtn);
    regionContainer.appendChild(regionTitle);

    // 默认添加第一个区域牌组
    addRegionGroup(regionContainer);

    // 组装
    playerDiv.appendChild(header);
    playerDiv.appendChild(handLabel);
    playerDiv.appendChild(handZone);
    playerDiv.appendChild(discardLabel);
    playerDiv.appendChild(discardZone);
    playerDiv.appendChild(regionContainer);

    gameArea.appendChild(playerDiv);
  }

  setupDragAndDrop();
}

// 添加一组区域牌
function addRegionGroup(container) {
  const group = document.createElement("div");
  group.className = "region-group";
  group.addEventListener("dragover", (e) => e.preventDefault());
  group.addEventListener("drop", function (e) {
    e.preventDefault();
    handleDropOnRegionGroup.call(this, e);
  });

  container.appendChild(group);
}

// 处理区域牌 drop（拖入后校验是否为 Set 或 Run）
function handleDropOnRegionGroup(e) {
  if (!draggedCard) return;

  const group = this;
  const currentCards = Array.from(group.querySelectorAll(".card"));
  const newCards = [...currentCards, draggedCard];

  if (currentCards.length === 0) {
    group.appendChild(draggedCard); // 第一张无需校验
    sortRegionGroup(group); // 拖入后排序
  } else if (isSet(newCards) || isRun(newCards)) {
    group.appendChild(draggedCard);
    sortRegionGroup(group); // 拖入后排序
  } else {
    // alert("无效牌型！必须是 Set（同点数）或 Run（同花色连续）");
    const originalZone = draggedCard.dataset.originalZone;
    if (originalZone) {
      const [playerId, zoneType] = originalZone.split(":");
      const target = document.querySelector(
        `.player[data-player="${playerId}"] .${zoneType}`
      );
      if (target) target.appendChild(draggedCard);
    }
  }

  checkEmptyRegionGroup(group);
}

// 判断是否为 Set（同点数）
function isSet(cards) {
  if (cards.length === 0) return false;
  const firstRank = parseCardName(cards[0].dataset.name).rank;
  return cards.every(
    (card) => parseCardName(card.dataset.name).rank === firstRank
  );
}

// 判断是否为 Run（同花色连续）
function isRun(cards) {
  if (cards.length === 0) return false;

  const parsed = cards.map((card) => {
    const { rank, suit } = parseCardName(card.dataset.name);
    const rankIndex = rankOrder.indexOf(rank);
    return { rankIndex, suit };
  });

  const suits = new Set(parsed.map((p) => p.suit));
  if (suits.size !== 1) return false;

  const sorted = parsed.sort((a, b) => a.rankIndex - b.rankIndex);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].rankIndex !== sorted[i - 1].rankIndex + 1) {
      return false;
    }
  }
  return true;
}

// 区域牌组排序
function sortRegionGroup(group) {
  const cards = Array.from(group.querySelectorAll(".card"));
  const sorted = sortCards(cards);
  group.innerHTML = "";
  sorted.forEach((card) => group.appendChild(card));
}

// 检查区域牌组是否为空
function checkEmptyRegionGroup(group) {
  if (group.children.length === 0) {
    group.parentNode.removeChild(group);
  }
}

// 拖拽事件
function dragStart() {
  draggedCard = this;
  this.classList.add("dragging");
  this.dataset.originalZone = `${this.parentNode.dataset.player}:${this.parentNode.className}`;
}

function dragEnd() {
  this.classList.remove("dragging");
  draggedCard = null;

  // 如果拖出公共牌区域，移除底牌标记
  const publicZone = document.getElementById("public-cards");
  if (
    this.parentNode !== publicZone &&
    this.classList.contains("bottom-card")
  ) {
    const star = this.querySelector(".star");
    if (star) star.remove();
    this.classList.remove("bottom-card");
  }

  // 更新公共牌计数
  updatePublicCardCount();
}

// 设置拖放区域
function setupDragAndDrop() {
  // 手牌区只允许从“所有牌”拖入
  document.querySelectorAll(".hand-cards").forEach((zone) => {
    zone.addEventListener("dragover", (e) => e.preventDefault());
    zone.addEventListener("drop", function (e) {
      if (draggedCard && draggedCard.parentNode.id === "all-cards") {
        this.appendChild(draggedCard);
      }
    });
  });

  // 出牌区覆盖式更新，旧牌放回“所有牌”
  document.querySelectorAll(".discard-zone").forEach((zone) => {
    zone.addEventListener("dragover", (e) => e.preventDefault());
    zone.addEventListener("drop", function () {
      if (draggedCard) {
        if (this.children.length > 0) {
          const oldCard = this.firstChild;
          this.removeChild(oldCard);
          document.getElementById("all-cards").appendChild(oldCard);
          refreshAllCards(); // 旧牌放回后重新排序
        }
        this.appendChild(draggedCard);
      }
    });
  });

  // 区域牌组 drop 校验
  document.querySelectorAll(".region-group").forEach((group) => {
    group.addEventListener("dragover", (e) => e.preventDefault());
    group.addEventListener("drop", function (e) {
      e.preventDefault();
      handleDropOnRegionGroup.call(this, e);
    });
  });

  // 公共牌区域拖入支持
  const publicZone = document.getElementById("public-cards");
  publicZone.addEventListener("dragover", (e) => e.preventDefault());
  // 修改 publicZone 的 drop 事件处理函数
  publicZone.addEventListener("drop", function () {
    if (!draggedCard) return;

    // 1. 首次拖入时询问是否设为底牌
    if (this.children.length === 1 && this.querySelector(".background-card")) {
      const isBottom = confirm("是否将此牌设为底牌？");
      if (isBottom) {
        draggedCard.classList.add("bottom-card");
        const star = document.createElement("div");
        star.classList.add("star");
        star.textContent = "⭐️";
        draggedCard.appendChild(star);
      }
    }

    // 2. 定位插入位置（关键逻辑）
    const background = this.querySelector(".background-card");
    const bottomCard = this.querySelector(".bottom-card");
    this.appendChild(draggedCard);
    // // ==== 新逻辑：严格顺序控制 ====
    // if (bottomCard) {
    //   // 存在底牌：新牌插入到底牌之后
    //   this.insertBefore(draggedCard, bottomCard.nextSibling);
    // } else if (background) {
    //   // 无底牌：新牌插入到牌背之前
    //   this.insertBefore(draggedCard, background);
    // } else {
    //   // 极端情况：直接追加

    // }
    // ==== 结束新逻辑 ====

    // 3. 更新剩余牌数
    updatePublicCardCount();
  });

  // 拖回“所有牌”区域处理
  const allCardsZone = document.getElementById("all-cards");
  allCardsZone.addEventListener("dragover", (e) => e.preventDefault());
  allCardsZone.addEventListener("drop", function (e) {
    if (draggedCard) {
      this.appendChild(draggedCard);
      refreshAllCards(); // 拖回后重新排序
    }
  });
}

// 刷新“所有牌”区域并排序
function refreshAllCards() {
  const allCardsDiv = document.getElementById("all-cards");
  const allCards = Array.from(allCardsDiv.querySelectorAll(".card"));

  allCardsDiv.innerHTML = "";
  const sorted = sortCards(allCards);
  sorted.forEach((card) => {
    card.classList.remove("transparent");
    card.draggable = true;
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
    allCardsDiv.appendChild(card);
  });
}

// 页面加载初始化
window.onload = () => {
  initAllCards();
  initPublicCard(); // 初始化公共牌为牌背
  initPlayers(4); // 默认 4 个玩家
};
