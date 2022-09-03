"use strict";
const gameCards = [
  { id: 1, link: "./img/01.jpg", alt: "Black" },
  { id: 2, link: "./img/02.jpg", alt: "Raspberry" },
  { id: 3, link: "./img/03.jpg", alt: "Pu-erh" },
  { id: 4, link: "./img/04.jpg", alt: "Rooibos" },
  { id: 5, link: "./img/05.jpg", alt: "Lemon" },
  { id: 6, link: "./img/06.jpg", alt: "Hibiscus" },
];

const arrayOfCards = [...gameCards, ...gameCards];

const newGame = function () {
  arrayOfCards.sort(function () {
    return 0.5 - Math.random();
  });

  const gameArea = document.querySelector(".game");
  gameArea.innerHTML = "";

  for (let card of arrayOfCards) {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game__card");
    gameCard.style["transform"] = "rotateY(0deg)"; //// try to delete

    const cardFront = document.createElement("img");
    cardFront.classList.add("game__card-front");
    cardFront.setAttribute("alt", `${card.alt}`);
    cardFront.setAttribute("src", `${card.link}`);

    const cardBack = document.createElement("img");
    cardBack.classList.add("game__card-back");
    cardBack.setAttribute("alt", "???");
    cardBack.setAttribute("src", "./img/back.jpg");
    cardBack.setAttribute("data-id", `${card.id}`);

    gameCard.append(cardBack);
    gameCard.append(cardFront);
    gameArea.append(gameCard);
  }
};

const pressButton = document.querySelector(".container__new-game");
pressButton.addEventListener("click", newGame);
newGame();

const listOfCardsPositions = document.querySelector(".game");

let isSecondCard = false;
let lockGameProgress = false;
let firstCardID;

function flip(cardId) {
  console.log(cardId);

  console.log(listOfCardsPositions.childNodes[cardId]);

  listOfCardsPositions.childNodes[cardId].style["transform"] =
    listOfCardsPositions.childNodes[cardId].style["transform"] ===
    "rotateY(-180deg)"
      ? "rotateY(0deg)"
      : "rotateY(-180deg)";
}

function clickCard(event) {
  if (lockGameProgress) {
    return;
  }
  if (event.target.dataset.id === undefined) {
    return;
  }
  const currentCardId = Array.from(
    event.target.parentElement.parentElement.children
  ).indexOf(event.target.parentElement);

  if (isSecondCard) {
    flip(currentCardId);
    isSecondCard = false;
    lockGameProgress = true;

    if (compareCards(firstCardID, currentCardId)) {
      setTimeout(changeOpacity, 1000);
    } else {
      setTimeout(flipBack, 1000);
    }
  } else {
    isSecondCard = true;
    firstCardID = currentCardId;
    flip(currentCardId);
  }
}

function compareCards(firstCardID, currentCardId) {
  return listOfCardsPositions.childNodes[firstCardID].childNodes[0].dataset
    .id ===
    listOfCardsPositions.childNodes[currentCardId].childNodes[0].dataset.id
    ? true
    : false;
}
function changeOpacity() {
  const cardsArray = Array.from(listOfCardsPositions.childNodes);
  cardsArray.map((child) => {
    if (child.style["transform"] === "rotateY(-180deg)") {
      child.style["opacity"] = "0.5";
    }
  });
  lockGameProgress = false;
}

function flipBack() {
  const cardsArray = Array.from(listOfCardsPositions.childNodes);

  cardsArray.map((child, index) => {
    if (
      child.style["transform"] === "rotateY(-180deg)" &&
      child.style["opacity"] !== "0.5"
    ) {
      flip(index);
    }
  });
  lockGameProgress = false;
}

listOfCardsPositions.addEventListener("click", clickCard);
