function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Card{
    constructor(rank, suit){
        this.rank = rank
        this.suit = suit
    }
}

ranks = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]
suits = ["hearts", "clubs", "diamonds", "spades"]


const deckTable = document.getElementById("decktable");
const animateCheckbox = document.getElementById("animateCheckbox");


function generateErraticDeck(){
    erraticDeck = []
    for(let i = 0; i < 52; i++){
        rndRank = randomInt(0,12)
        rndSuit = randomInt(0,3)
        erraticDeck.push(new Card(rndRank, rndSuit))
    }

    erraticDeck.sort((a, b) => {
    if (a.suit !== b.suit) {
        return a.suit - b.suit;
         // sort by first element
    } else {
        return a.rank - b.rank;
         // first elements equal → sort by second
    }});
    return erraticDeck
}

function createCardImage(card) {
    const img = document.createElement("img");
    img.src = `img/balatroCards/${ranks[card.rank]}_of_${suits[card.suit]}.png`;;
    img.alt = `${capitalizeFirstLetter(ranks[card.rank])} of ${capitalizeFirstLetter(suits[card.suit])}`;
    img.classList.add("card-img");
    img.rel = "prefetch"
    return img;
}

async function preloadFullDeck() {
    const promises = [];

    for (let suit of suits) {
        for (let rank of ranks) {
            const src = `img/balatroCards/${rank}_of_${suit}.png`;

            promises.push(new Promise(resolve => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = resolve; // avoid hanging if one fails
            }));
        }
    }

    await Promise.all(promises);

    console.log("Full deck preloaded.");
}

function animateDeckSequential(deck) {
    const suitsInOrder = [0, 1, 2, 3]; // hearts, clubs, diamonds, spades
    let suitIndex = 0;

    function animateNextSuit() {
        if (suitIndex >= suitsInOrder.length) return; // done

        const s = suitsInOrder[suitIndex];
        
        const suitRow = document.createElement("div");
        suitRow.classList.add("suit-row");
        deckTable.appendChild(suitRow);

        const suitCards = deck.filter(card => card.suit === s);

        let cardIndex = 0;
        function animateCard() {
            if (cardIndex >= suitCards.length) {
                suitIndex++;           // move to next suit
                setTimeout(animateNextSuit, 100); // optional delay between suits
                return;
            }

            const card = suitCards[cardIndex];
            const img = createCardImage(card);
            suitRow.appendChild(img);
            cardIndex++;
            setTimeout(animateCard, 100); // delay between cards
        }

        animateCard(); // start animating current suit
    }

    animateNextSuit(); // start animation
}

async function displayDeck() {
    deckTable.innerHTML = ""; // clear old cards
    deck = generateErraticDeck()

    if(animateCheckbox.checked){
            animateDeckSequential(deck);
    }else{
        for (let s = 0; s < suits.length; s++) {
            const suitRow = document.createElement("div");
            suitRow.classList.add("suit-row");
            deckTable.appendChild(suitRow);

            const suitCards = deck.filter(card => card.suit === s);
            for (let card of suitCards) {
                suitRow.appendChild(createCardImage(card));
            }
        }
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    await preloadFullDeck();
});

document.getElementById("genButton").addEventListener("click", () => {displayDeck()});