window.onload = function () {

  "use strict";

  /** Memory game: find matching pairs of cards and flip both of them. */

  const FOUND_MATCH_WAIT_MSECS = 1000;
  const COLORS = [
    "red", "blue", "green", "orange", "purple",
    "red", "blue", "green", "orange", "purple",
  ];

  const colors = shuffle(COLORS);

  createCards(colors);

  var counterFaceUp = 0;
  var counterSolved = 0;
  var counterTries = 0;
  let guesses = [];

  /** Shuffle array items in-place and return shuffled array. */

  function shuffle(items) {
    // This algorithm does a "perfect shuffle", where there won't be any
    // statistical bias in the shuffle (many naive attempts to shuffle end up not
    // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
    // you're interested, you can learn about it, but it's not important.

    for (let i = items.length - 1; i > 0; i--) {
      // generate a random index between 0 and i
      let j = Math.floor(Math.random() * i);
      // swap item at i <-> item at j
      [items[i], items[j]] = [items[j], items[i]];
    }

    return items;
  }

  /** Create card for every color in colors (each will appear twice)
   *
   * Each div DOM element will have:
   * - a class with the value of the color
   * - an click listener for each card to handleCardClick
   */

  function createCards(colors) {
    const gameBoard = document.getElementById("game");

    for (let color of colors) {
      var card = document.createElement("div");
      card.style.backgroundColor = "grey";
      card.classList.add("card", "faceDown");
      card.setAttribute("id", color);
      gameBoard.appendChild(card);
      card.addEventListener("click", handleCardClick);
    }

  };

  /** Flip a card face-up. */
  function flipCard(cardToFlip) {
    cardToFlip.style.backgroundColor = cardToFlip.id;
    cardToFlip.classList.remove("faceDown");
    cardToFlip.classList.add("faceUp");

  };

  /** Flip a card face-down. */

  function unFlipCard() {
    let myVar = setTimeout(function () {
      let listCards = document.getElementsByClassName("card");
      for (let i = 0; i < listCards.length; i++) {
        if (listCards[i].classList[1] == "faceUp") {
          listCards[i].style.backgroundColor = "grey";
          listCards[i].classList.add("faceDown");
          listCards[i].classList.remove("faceUp");
        }
      }
    }, 1000)
  }

  /** Handle clicking on a card: this could be first-card or second-card. */

  function handleCardClick(event) {
    console.log("counterUp before:" + counterFaceUp);
    let guessedCard = event.target;

    
    if (event.target.classList[1] == "faceDown") {
      console.log("1");
      flipCard(guessedCard);
      counterFaceUp += 1;
      guesses.push(event.target.id);
      console.log("counterUp after:" + counterFaceUp);
      console.log("guesses: " + guesses);

      if (counterFaceUp == 2) {
        if (guesses[0] == guesses[1]) {
          console.log("match");
          let listCards = document.getElementsByClassName("card");
          for (let i = 0; i < listCards.length; i++) {
            if (listCards[i].classList[1] == "faceUp") {
              listCards[i].classList.remove("faceUp");
              listCards[i].classList.add("solved");
              counterSolved += 1;
              console.log("Solved: " + counterSolved);
            }
          }
        }
        else {
          console.log("not match");
          unFlipCard();
          console.log("2");
        }
        counterTries += 1;
        counterFaceUp = 0;
        guesses = [];
      }
    }
    else if (event.target.classList[1] == "faceUp") {
      alert("Please make your second selection.")
    }
    if (counterSolved == 10) {
      let winner = setTimeout(function (){alert('Congratulations, you have solved it in' + counterTries+"guesses!");},500);
    }
  }
  counterTries += 1;
  
  
}

