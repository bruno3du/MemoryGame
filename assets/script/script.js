const FRONT = "card-front" 
const BACK = "card-back"
const CARD = "card"
const ICON = "icon"


startgame()

function startgame() {

    inizializeCards(game.createCardsFromTechs())

}

function inizializeCards(cards) {
    
    let gameBoard = document.getElementsByClassName("gameBoard")[0];
    gameBoard.innerHTML = ""
    cards.forEach(card => {

        let cardElement = document.createElement("div");
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createFacesOfTechs(card, cardElement)

        gameBoard.appendChild(cardElement)

        cardElement.addEventListener("click", flipCard)

    })
}

function createFacesOfTechs(card, cardElement) {
    createFaceOfElement(FRONT, card, cardElement)
    createFaceOfElement(BACK, card, cardElement)

}

function createFaceOfElement(face, card, cardElement) {
    
    cardFaceElement = document.createElement("div");
    cardFaceElement.classList.add(face)

    if(face == FRONT) {
        let elementIcon = document.createElement("img")
        elementIcon.classList.add(ICON)
        elementIcon.src = "./assets/images/" + card.icon + ".png"
        cardFaceElement.appendChild(elementIcon)

    } else {
        cardFaceElement.innerHTML = "&lt;/&gt;"
    
    }

    cardElement.appendChild(cardFaceElement)

}

let count = 0;
let countText = document.getElementById("countText")

function flipCard() {

    if(game.setCard(this.id)) {
        this.classList.add("flip")
                
        if(game.secondCard) {
            count += 1;
            countText.innerHTML = count
        
            if(game.checkMatch()) {
                game.clearCards();
                if(game.checkGameOver()){
                    
                    let gameOverLayer = document.getElementsByClassName("gameOver")[0];
                    gameOverLayer.style.display = "flex";
                }
            }
            else {
                
            setTimeout(() => {
           
                let firstCardView = document.getElementById(game.firstCard.id)
                let secondCardView = document.getElementById(game.secondCard.id)
                
                firstCardView.classList.remove("flip")
                secondCardView.classList.remove("flip")
                game.unflipCard()
            }, 1200)

            }
        }
    }
}

function restart() {
    let gameOverLayer = document.getElementsByClassName("gameOver")[0];
    gameOverLayer.style.display = "none";
    count = 0;
    countText.innerHTML = count;
                
    game.clearCards()
    startgame()
}