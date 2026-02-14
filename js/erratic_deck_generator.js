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
    return img;
}

async function displayDeck() {
    deckTable.innerHTML = ""; // clear old cards
    deck = generateErraticDeck()

    for (let s = 0; s < suits.length; s++) {
        const suitRow = document.createElement("div");
        suitRow.classList.add("suit-row");
        deckTable.appendChild(suitRow)

        // Filter cards of this suit
        const suitCards = deck.filter(card => card.suit === s);

        if(animateCheckbox.checked){
            for(let card of suitCards){
                const img = createCardImage(card);
                suitRow.appendChild(img);
                await new Promise(r => setTimeout(r, 100)); // 100ms delay
            }
        }else{
            for(let card of suitCards){
                const img = createCardImage(card)
                suitRow.appendChild(img);
            }
        }

        
    }
    
    

    // for (let suit of suits) {
    //     for (let rank of ranks) {
    //         const img = document.createElement("img");
    //         img.src = `img/png/${rank}_of_${suit}.png`;
    //         img.alt = `img/png/${rank}${suit}.png`;
    //         //img.alt = `${capitalizeFirstLetter(rank)} of ${capitalizeFirstLetter(suit)}`;
    //         img.classList.add("card-img");
    //         console.log("card appended")

    //         deckTable.appendChild(img);
    //     }
    // }
}

document.getElementById("genButton").addEventListener("click", displayDeck);