"use strict"
const gameCards = document.querySelectorAll(".gameCard");
const cardType0 = `<img height="100px" src="img/classes/warricon.jpg"/>`
const cardType1 = `<img height="100px" src="img/classes/mageicon.jpg"/>`
const cardType2 = `<img height="100px" src="img/classes/dkicon.jpg"/>`
const cardType3 = `<img height="100px" src="img/classes/dhicon.jpg"/>`
const cardType4 = `<img height="100px" src="img/classes/druicon.jpg"/>`
const cardType5 = `<img height="100px" src="img/classes/priicon.jpg"/>`
const cardType6 = `<img height="100px" src="img/classes/palaicon.jpg"/>`
const cardType7 = `<img height="100px" src="img/classes/warlicon.jpg"/>`
const cardType8 = `<img height="100px" src="img/classes/rogicon.jpg"/>`
const cardType9 = `<img height="100px" src="img/classes/hunticon.jpg"/>`
const cardType10 = `<img height="100px" src="img/classes/monkicon.jpg"/>`
const cardType11 = `<img height="100px" src="img/classes/shaicon.jpg"/>`
var selectedCard1, selectedCard2, selectedCard1Index, selectedCard2Index;
var counter = 0;
var playable = true;
var imageArray = new Array;
var point = 0;

for (var i = 0; i < 24; i++) {
    imageArray[i] = i%12;
}
for (var i = 0; i < 24; i++) {
    var rand = Math.floor(Math.random() * imageArray.length);
    var currentIndex = imageArray[rand];
    gameCards[i].classList.add(`cardType${currentIndex}`)
    imageArray.splice(rand, 1);
}

gameCards.forEach(function (value, index) {
    value.addEventListener("click", function () {
        if (playable) {
            playable = false;
            showingFace(index);
            if (counter == 0) {
                selectedCard1Index = index;
                selectedCard1 = gameCards[index].className;
                gameCards[selectedCard1Index].disabled = true;
                counter++;
                playable = true;
            }
            else if (counter == 1) {
                selectedCard2Index = index;
                selectedCard2 = gameCards[index].className;
                if (selectedCard1 == selectedCard2) {
                    setTimeout(function () {
                        gameCards[selectedCard1Index].disabled = true;
                        gameCards[selectedCard1Index].style.backgroundColor = "green";
                        gameCards[selectedCard1Index].classList.add("blackWhite");
                        gameCards[selectedCard2Index].disabled = true;
                        gameCards[selectedCard2Index].style.backgroundColor = "green";
                        gameCards[selectedCard2Index].classList.add("blackWhite");
                        playable = true;
                        point++;
                    } ,1000)
                }
                else {
                    setTimeout(function () {
                        gameCards[selectedCard1Index].innerHTML = "";
                        gameCards[selectedCard2Index].innerHTML = "";
                        gameCards[selectedCard1Index].disabled = false;
                        playable = true;
                    } ,1000)
                }
                counter = 0;
                if (point == 11) {
                    setTimeout(function () {
                        alert("Congratulations!");
                        playable = false;
                    } ,1000)
                }
            }
        }
    })
})

var showingFace = function (cardNumber) {
    switch (gameCards[cardNumber].className) {
    case "gameCard cardType0":
        gameCards[cardNumber].innerHTML = cardType0;
        break;
    case "gameCard cardType1":
        gameCards[cardNumber].innerHTML = cardType1;
        break;
    case "gameCard cardType2":
        gameCards[cardNumber].innerHTML = cardType2;
        break;
    case "gameCard cardType3":
        gameCards[cardNumber].innerHTML = cardType3;
        break;
    case "gameCard cardType4":
        gameCards[cardNumber].innerHTML = cardType4;
        break;
    case "gameCard cardType5":
        gameCards[cardNumber].innerHTML = cardType5;
        break;
    case "gameCard cardType6":
        gameCards[cardNumber].innerHTML = cardType6;
        break;
    case "gameCard cardType7":
        gameCards[cardNumber].innerHTML = cardType7;
        break;
    case "gameCard cardType8":
        gameCards[cardNumber].innerHTML = cardType8;
        break;
    case "gameCard cardType9":
        gameCards[cardNumber].innerHTML = cardType9;
        break;
    case "gameCard cardType10":
        gameCards[cardNumber].innerHTML = cardType10;
        break;
    case "gameCard cardType11":
        gameCards[cardNumber].innerHTML = cardType11;
        break;
    }
} 

//style background = image so there can be transition duration from css.
