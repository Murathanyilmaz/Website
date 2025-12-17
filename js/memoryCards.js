"use strict"

function CreateMemoryGame() {
    const memoryGameArea = document.querySelector(".memoryCardsArea");
    let selectedCard1, selectedCard2, selectedCard1Index, selectedCard2Index;
    let phase = 0;
    let playable = true;
    let point = 0;
    let memoryCards = [];
    let memoryImages = [];
    for (let i = 0; i < 24; i++) {
        const button = document.createElement("button");
        button.className = "memoryCard";
        memoryGameArea.appendChild(button);
        const img = document.createElement("img");
        img.setAttribute("draggable", false);
        button.appendChild(img);
        memoryImages.push(img);
        memoryCards.push(button);
    }
    memoryCards.forEach(function (value, index) {
        value.addEventListener("click", function () {
            if (playable) {
                playable = false;
                memoryImages[index].classList.remove("hide");
                memoryImages[index].classList.add("reveal");
                if (phase == 0) {
                    selectedCard1Index = index;
                    selectedCard1 = memoryImages[index].src;
                    memoryCards[selectedCard1Index].disabled = true;
                    phase++;
                    playable = true;
                }
                else if (phase == 1) {
                    phase = 0;
                    selectedCard2Index = index;
                    selectedCard2 = memoryImages[index].src;
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
                            memoryImages[selectedCard1Index].classList.remove("reveal");
                            memoryImages[selectedCard2Index].classList.remove("reveal");
                            memoryImages[selectedCard1Index].classList.add("hide");
                            memoryImages[selectedCard2Index].classList.add("hide");
                            memoryCards[selectedCard1Index].disabled = false;
                            playable = true;
                        }
                    }, 1000);
                }
            }
        });
    });
    let imageArray = [];
    for (let i = 0; i < 24; i++) {
        imageArray[i] = i % 12;
    }
    for (let i = 0; i < 24; i++) {
        const rand = Math.floor(Math.random() * imageArray.length);
        memoryImages[i].src = `../img/classes/cl${imageArray[rand]}.jpg`;
        memoryImages[i].ondragstart = "return false"
        imageArray.splice(rand, 1);
    }
}