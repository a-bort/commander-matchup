interface Deck {
	player: string;
	commander: string;
	w: boolean;
	u: boolean;
	b: boolean;
	r: boolean;
	g: boolean;
	strategy: Array<string>;
	power: number;
};

let deck1: Deck = {player: "Andrew", commander: "Bahamut", w:true, u: false, b: false, r: false, g: false, strategy:["Initiative", "Tokens"], power: 5};
let deck2: Deck = {player: "Andrew", commander: "Sidar & Ikra", w:true, u: false, b: true, r: false, g: true, strategy:["Lifegain"], power: 6};
let deck3: Deck = {player: "Brian", commander: "Meren", w:false, u: false, b: true, r: false, g: true, strategy:["Reanimator"], power: 7};
let deck4: Deck = {player: "Brian", commander: "Perrie", w:true, u: true, b: false, r: false, g: true, strategy:["Counters", "Control"], power: 6};
let deck5: Deck = {player: "Stamm", commander: "Mazzy", w:true, u: false, b: false, r: true, g: true, strategy:["Enchantress"], power: 7};
let deck6: Deck = {player: "Stamm", commander: "Alexi", w:false, u: true, b: false, r: false, g: false, strategy:["Control"], power: 4};
let deck7: Deck = {player: "Olivier", commander: "Kamiz", w:true, u: true, b: true, r: false, g: false, strategy:["Reanimator"], power: 7};
let deck8: Deck = {player: "Olivier", commander: "Faldorn", w:false, u: false, b: false, r: true, g: true, strategy:["Exile", "Tokens"], power: 6};


let fullDeckList: Array<Deck> = [deck1, deck2, deck3, deck4, deck5, deck6, deck7, deck8];

let currentPlayers = ["Andrew", "Brian", "Stamm", "Olivier"];

interface PlayerIndexedDeckList {
	[key: string]: Array<Deck>;
}

let deckListByPlayer: PlayerIndexedDeckList = {};

for(var i = 0; i < fullDeckList.length; i++){
	var deck = fullDeckList[i];
	if(!currentPlayers.includes(deck.player)){ continue; }
	if(!deckListByPlayer[deck.player]){
		deckListByPlayer[deck.player] = new Array<Deck>();
	}
	deckListByPlayer[deck.player].push(deck);
}

//console.log(deckListByPlayer);

let players: Array<string> = Object.keys(deckListByPlayer);
let deckLists: Array<Array<Deck>> = Object.values(deckListByPlayer);

//console.log(deckLists);

function cartesian(set_a: Array<Array<Deck>>, set_b: Array<Deck>){
	let result: Array<Array<Deck>> = [];
	for(var i=0; i<set_a.length; i++){
		for(var j=0; j<set_b.length; j++){
			let temp: Array<Deck> = set_a[i].concat(set_b[j]);
			result.push(temp);
		}
	}
	return result;
}


let deckMatchups: Array<Array<Deck>> = [[]];
for(var i = 0; i < deckLists.length; i++){
	deckMatchups = cartesian(deckMatchups, deckLists[i]);
}

//console.log(deckMatchups);

const calculateMean = (values: number[]): number => {
  const mean = (values.reduce((sum, current) => sum + current)) / values.length;
  return mean;
}

// Calculate variance
const calculateVariance = (values: number[]): number => {
  const average = calculateMean(values);
  const squareDiffs = values.map((value: number): number => {
    const diff = value - average;
    return diff * diff;
  })

  const variance = calculateMean(squareDiffs);
  return variance;
}

// Calculate stand deviation
const calculateSD = (variance: number): number => {
  return  Math.sqrt(variance);
}

const commonArrayElements = (arr_1: Array<string>, arr_2: Array<string>): number => {
	let count = 0;
	for(var i = 0; i < arr_1.length; i++){
		for(var j = 0; j < arr_2.length; j++){
			if(arr_1[i] == arr_2[j]){
				count++;
			}
		}
	}
	return count;
}

class Matchup {
	matchupDecks: Array<Deck> = [];
	matchupName: string = "";
	colorCoverage: string = "";
	powerVariance: number = 0;
	strategyOverlap: number = 0;
	
	constructor(decks: Array<Deck>) {
		this.matchupDecks = decks;
		this.generateMatchupName();
		this.generateColorCoverage();
		this.generatePowerVariance();
		this.generateStrategyOverlap();
	}
	
	generateMatchupName() {
		if(this.matchupDecks.length == 0){return;}
		var name = this.matchupDecks[0].commander;
		for(var i = 1; i < this.matchupDecks.length; i++){
			name = `${name} vs. ${this.matchupDecks[i].commander}`;
		}
		this.matchupName = name;
	}
	
	generateColorCoverage() {
		let w: boolean = false;
		let u: boolean = false;
		let b: boolean = false;
		let r: boolean = false;
		let g: boolean = false;
		for(var i = 0; i < this.matchupDecks.length; i++){
			w = w || this.matchupDecks[i].w;
			u = u || this.matchupDecks[i].u;
			b = b || this.matchupDecks[i].b;
			r = r || this.matchupDecks[i].r;
			g = g || this.matchupDecks[i].g;
		}
		this.colorCoverage = (w ? "W" : "").concat(u ? "U" : "", b ? "B" : "", r ? "R" : "", g ? "G" : "");
	}
	
	generatePowerVariance() {
		let powers: Array<number> = [];
		for(var i = 0; i < this.matchupDecks.length; i++){
			powers.push(this.matchupDecks[i].power);
		}
		this.powerVariance = calculateSD(calculateVariance(powers));
	}
	
	generateStrategyOverlap() {
		let overlap: number = 0;
		for(var i = 0; i < this.matchupDecks.length - 1; i++){
			for(var j = i+1; j < this.matchupDecks.length; j++){
				overlap += commonArrayElements(this.matchupDecks[i].strategy, this.matchupDecks[j].strategy);
			}
		}
		this.strategyOverlap = overlap;
	}
}

let matchups: Array<Matchup> = [];
for(var i = 0; i < deckMatchups.length; i++){
	matchups.push(new Matchup(deckMatchups[i]));
}
console.log(matchups);