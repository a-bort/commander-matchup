"use strict";
;
let deck1 = { player: "Andrew", commander: "Bahamut", w: true, u: false, b: false, r: false, g: false, strategy: ["Initiative", "Tokens"], power: 5 };
let deck2 = { player: "Andrew", commander: "Sidar & Ikra", w: true, u: false, b: true, r: false, g: true, strategy: ["Lifegain"], power: 6 };
let deck3 = { player: "Brian", commander: "Meren", w: false, u: false, b: true, r: false, g: true, strategy: ["Reanimator"], power: 7 };
let deck4 = { player: "Brian", commander: "Perrie", w: true, u: true, b: false, r: false, g: true, strategy: ["Counters", "Control"], power: 6 };
let deck5 = { player: "Stamm", commander: "Mazzy", w: true, u: false, b: false, r: true, g: true, strategy: ["Enchantress"], power: 7 };
let deck6 = { player: "Stamm", commander: "Alexi", w: false, u: true, b: false, r: false, g: false, strategy: ["Control"], power: 4 };
let deck7 = { player: "Olivier", commander: "Kamiz", w: true, u: true, b: true, r: false, g: false, strategy: ["Reanimator"], power: 7 };
let deck8 = { player: "Olivier", commander: "Faldorn", w: false, u: false, b: false, r: true, g: true, strategy: ["Exile", "Tokens"], power: 6 };
let fullDeckList = [deck1, deck2, deck3, deck4, deck5, deck6, deck7, deck8];
let currentPlayers = ["Andrew", "Brian", "Stamm", "Olivier"];
let deckListByPlayer = {};
for (var i = 0; i < fullDeckList.length; i++) {
    var deck = fullDeckList[i];
    if (!currentPlayers.includes(deck.player)) {
        continue;
    }
    if (!deckListByPlayer[deck.player]) {
        deckListByPlayer[deck.player] = new Array();
    }
    deckListByPlayer[deck.player].push(deck);
}
//console.log(deckListByPlayer);
let players = Object.keys(deckListByPlayer);
let deckLists = Object.values(deckListByPlayer);
//console.log(deckLists);
function cartesian(set_a, set_b) {
    let result = [];
    for (var i = 0; i < set_a.length; i++) {
        for (var j = 0; j < set_b.length; j++) {
            let temp = set_a[i].concat(set_b[j]);
            result.push(temp);
        }
    }
    return result;
}
let deckMatchups = [[]];
for (var i = 0; i < deckLists.length; i++) {
    deckMatchups = cartesian(deckMatchups, deckLists[i]);
}
//console.log(deckMatchups);
const calculateMean = (values) => {
    const mean = (values.reduce((sum, current) => sum + current)) / values.length;
    return mean;
};
// Calculate variance
const calculateVariance = (values) => {
    const average = calculateMean(values);
    const squareDiffs = values.map((value) => {
        const diff = value - average;
        return diff * diff;
    });
    const variance = calculateMean(squareDiffs);
    return variance;
};
// Calculate stand deviation
const calculateSD = (variance) => {
    return Math.sqrt(variance);
};
const commonArrayElements = (arr_1, arr_2) => {
    let count = 0;
    for (var i = 0; i < arr_1.length; i++) {
        for (var j = 0; j < arr_2.length; j++) {
            if (arr_1[i] == arr_2[j]) {
                count++;
            }
        }
    }
    return count;
};
class Matchup {
    matchupDecks = [];
    matchupName = "";
    colorCoverage = "";
    powerVariance = 0;
    strategyOverlap = 0;
    constructor(decks) {
        this.matchupDecks = decks;
        this.generateMatchupName();
        this.generateColorCoverage();
        this.generatePowerVariance();
        this.generateStrategyOverlap();
    }
    generateMatchupName() {
        if (this.matchupDecks.length == 0) {
            return;
        }
        var name = this.matchupDecks[0].commander;
        for (var i = 1; i < this.matchupDecks.length; i++) {
            name = `${name} vs. ${this.matchupDecks[i].commander}`;
        }
        this.matchupName = name;
    }
    generateColorCoverage() {
        let w = false;
        let u = false;
        let b = false;
        let r = false;
        let g = false;
        for (var i = 0; i < this.matchupDecks.length; i++) {
            w = w || this.matchupDecks[i].w;
            u = u || this.matchupDecks[i].u;
            b = b || this.matchupDecks[i].b;
            r = r || this.matchupDecks[i].r;
            g = g || this.matchupDecks[i].g;
        }
        this.colorCoverage = (w ? "W" : "").concat(u ? "U" : "", b ? "B" : "", r ? "R" : "", g ? "G" : "");
    }
    generatePowerVariance() {
        let powers = [];
        for (var i = 0; i < this.matchupDecks.length; i++) {
            powers.push(this.matchupDecks[i].power);
        }
        this.powerVariance = calculateSD(calculateVariance(powers));
    }
    generateStrategyOverlap() {
        let overlap = 0;
        for (var i = 0; i < this.matchupDecks.length - 1; i++) {
            for (var j = i + 1; j < this.matchupDecks.length; j++) {
                overlap += commonArrayElements(this.matchupDecks[i].strategy, this.matchupDecks[j].strategy);
            }
        }
        this.strategyOverlap = overlap;
    }
}
let matchups = [];
for (var i = 0; i < deckMatchups.length; i++) {
    matchups.push(new Matchup(deckMatchups[i]));
}
console.log(matchups);
