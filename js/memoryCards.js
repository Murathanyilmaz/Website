"use strict"
const memoryGameArea = document.querySelector(".memoryCardsArea");
const cardType0 = `<img src="../img/classes/warricon.jpg"/>`
const cardType1 = `<img src="../img/classes/mageicon.jpg"/>`
const cardType2 = `<img src="../img/classes/dkicon.jpg"/>`
const cardType3 = `<img src="../img/classes/dhicon.jpg"/>`
const cardType4 = `<img src="../img/classes/druicon.jpg"/>`
const cardType5 = `<img src="../img/classes/priicon.jpg"/>`
const cardType6 = `<img src="../img/classes/palaicon.jpg"/>`
const cardType7 = `<img src="../img/classes/warlicon.jpg"/>`
const cardType8 = `<img src="../img/classes/rogicon.jpg"/>`
const cardType9 = `<img src="../img/classes/hunticon.jpg"/>`
const cardType10 = `<img src="../img/classes/monkicon.jpg"/>`
const cardType11 = `<img src="../img/classes/shaicon.jpg"/>`
var selectedCard1, selectedCard2, selectedCard1Index, selectedCard2Index;
var counter = 0;
var playable = true;
var point = 0;

let memoryCards = [];

let ShowFace = function (cardNumber) {
    switch (memoryCards[cardNumber].classList[1]) {
    case "cardType0":
        memoryCards[cardNumber].innerHTML = cardType0;
        break;
    case "cardType1":
        memoryCards[cardNumber].innerHTML = cardType1;
        break;
    case "cardType2":
        memoryCards[cardNumber].innerHTML = cardType2;
        break;
    case "cardType3":
        memoryCards[cardNumber].innerHTML = cardType3;
        break;
    case "cardType4":
        memoryCards[cardNumber].innerHTML = cardType4;
        break;
    case "cardType5":
        memoryCards[cardNumber].innerHTML = cardType5;
        break;
    case "cardType6":
        memoryCards[cardNumber].innerHTML = cardType6;
        break;
    case "cardType7":
        memoryCards[cardNumber].innerHTML = cardType7;
        break;
    case "cardType8":
        memoryCards[cardNumber].innerHTML = cardType8;
        break;
    case "cardType9":
        memoryCards[cardNumber].innerHTML = cardType9;
        break;
    case "cardType10":
        memoryCards[cardNumber].innerHTML = cardType10;
        break;
    case "cardType11":
        memoryCards[cardNumber].innerHTML = cardType11;
        break;
    }
} 

//style background = image so there can be transition duration from css.

function CreateMemoryGame() {
    for (let i = 0; i < 24; i++) {
        const button = document.createElement("button");
        button.className = "memoryCard";
        memoryGameArea.appendChild(button);
        memoryCards.push(button);
    }

    memoryCards.forEach(function (value, index) {
        value.addEventListener("click", function () {
            if (playable) {
                playable = false;
                ShowFace(index);
                if (counter == 0) {
                    selectedCard1Index = index;
                    selectedCard1 = memoryCards[index].className;
                    memoryCards[selectedCard1Index].disabled = true;
                    counter++;
                    playable = true;
                }
                else if (counter == 1) {
                    counter = 0;
                    selectedCard2Index = index;
                    selectedCard2 = memoryCards[index].className;
                    if (selectedCard1 == selectedCard2) {
                        memoryCards[selectedCard1Index].style.backgroundColor = "green";
                        memoryCards[selectedCard2Index].style.backgroundColor = "green";
                    }
                    setTimeout(function () {
                        if (selectedCard1 == selectedCard2) {
                            memoryCards[selectedCard1Index].disabled = true;
                            memoryCards[selectedCard1Index].classList.add("blackWhite");
                            memoryCards[selectedCard2Index].disabled = true;
                            memoryCards[selectedCard2Index].classList.add("blackWhite");
                            playable = true;
                            point++;
                            if (point == 12) {
                                setTimeout(function () {
                                    alert("Congratulations!");
                                    playable = false;
                                }, 1000);
                            }
                        }
                        else {
                            memoryCards[selectedCard1Index].innerHTML = "";
                            memoryCards[selectedCard2Index].innerHTML = "";
                            memoryCards[selectedCard1Index].disabled = false;
                            playable = true;
                        }
                    }, 1000);
                }
            }
        });
    });
    let imageArray = new Array;
    for (var i = 0; i < 24; i++) {
        imageArray[i] = i % 12;
    }
    for (var i = 0; i < 24; i++) {
        var rand = Math.floor(Math.random() * imageArray.length);
        var currentIndex = imageArray[rand];
        memoryCards[i].classList.add(`cardType${currentIndex}`)
        imageArray.splice(rand, 1);
    }
}