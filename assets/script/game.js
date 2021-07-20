let game = {
    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react',
    ],
    
    cards: null,

    firstCard: null,
    secondCard: null,
    lockMode: false,

    setCard: function(id) {

        let card = this.cards.filter(card => card.id === id)[0];
      
        if(card.flipped || this.lockMode) {
            return false
        }

        if(!this.firstCard) {
            this.firstCard = card
            // this.firstCard.flipped = true;
            return true
        } else {
            this.secondCard = card
            // this.secondCard.flipped = true;
            this.lockMode = true
            return true
        }
        
       
    },

    checkMatch: function() {
        // if(!this.firstCard || !this.secondCard){
        //     return false
        // }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    createCardsFromTechs: function() {
        this.cards = [];
        this.techs.forEach(tech => {
            this.cards.push(this.createPairfromTechs(tech))
        }) 
        
        this.cards = this.cards.flatMap(push => push)
        this.shuffleCards()
        return this.cards
    },
    
    createPairfromTechs: function(tech) {
        return [ {
            id: this.createID(tech),
            flipped: false,
            icon: tech,
        },
        {
            id: this.createID(tech),
            flipped: false,
            icon: tech,
        }]
    },
    
    createID: function(tech) {
        return tech + parseInt(Math.random() * 1000)
    },

    shuffleCards: function() {
        const currentIndex = this.cards.length // 20
        let randomIndex = 0;
    
        for(let i = 0; i < currentIndex; i++) {
    
            randomIndex = Math.floor(Math.random() * i);
            
            [this.cards[i], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[i]]
        }
    }
}