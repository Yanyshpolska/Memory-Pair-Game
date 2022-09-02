"use strict";
const gameCards = [
  { id: 1, link: "./img/01.jpg", alt: "Black" },
  { id: 2, link: "./img/02.jpg", alt: "Raspberry" },
  { id: 3, link: "./img/03.jpg", alt: "Pu-erh" },
  { id: 4, link: "./img/04.jpg", alt: "Rooibos" },
  { id: 5, link: "./img/05.jpg", alt: "Lemon" },
  { id: 6, link: "./img/06.jpg", alt: "Hibiscus" },
];

const newGame = function () {
  const arrayOfCards = [...gameCards, ...gameCards].sort(function () {
    return 0.5 - Math.random();
  });

  const gameArea = document.querySelector(".game");
  gameArea.innerHTML = "";

  for (let card of arrayOfCards) {
    const cardHolder = document.createElement("div");
    cardHolder.classList.add("game__card__holder");

    const gameCard = document.createElement("div");
    gameCard.classList.add("game__card");

    const cardFront = document.createElement("img");
    cardFront.classList.add("game__card-front");
    cardFront.setAttribute("alt", `${card.alt}`);
    cardFront.setAttribute("src", `${card.link}`);

    const cardBack = document.createElement("img");
    cardBack.classList.add("game__card-back");
    cardBack.setAttribute("alt", "???");
    cardBack.setAttribute("src", "./img/origin3.jpg");
    cardBack.setAttribute("data-id", `${card.id}`);

    gameCard.append(cardBack);
    gameCard.append(cardFront);
    cardHolder.append(gameCard);
    gameArea.append(cardHolder);
  }
};

const pressButton = document.querySelector(".container__new-game");
pressButton.addEventListener("click", newGame);

const listOfCardsPositions = document.querySelector(".game");

// console.log(listOfCardsPositions);
let numberOpenedCards = 0;

const flipCard = function (event) {
  if (event.target.dataset.id === undefined) {
    return;
  }
  //   if (numberOpenedCards >= 2) {
  //     return;
  //   }
  //   numberOpenedCards += 1;
  const objectTea = gameCards.find(
    (obj) => obj.id === Number(event.target.dataset.id)
  );
  event.target.parentElement.style["transform"] = "rotateY(-180deg)";
  //   console.log(event.target.parentElement);
  //   console.log(event.target);
  //   console.log(objectTea);

  //   createContent(objectTea);
};

listOfCardsPositions.addEventListener("click", flipCard);
