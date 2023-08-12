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

let decka1: Deck = {player: "Andrew", commander: "Bahamut", w:true, u: false, b: false, r: false, g: false, strategy:["Initiative", "Tokens"], power: 5};
let decka2: Deck = {player: "Andrew", commander: "Sidar & Ikra", w:true, u: false, b: true, r: false, g: true, strategy:["Lifegain"], power: 7};
let decka3: Deck = {player: "Andrew", commander: "Kamiz", w:true, u: true, b: true, r: false, g: false, strategy:["Reanimator", "Control", "Self Discard"], power: 6};
let decka4: Deck = {player: "Andrew", commander: "Slimefoot", w:false, u: false, b: true, r: false, g: true, strategy:["Gain & Drain", "Tokens"], power: 4};
let decka5: Deck = {player: "Andrew", commander: "Narset", w:true, u: true, b: false, r: true, g: false, strategy:["Tokens", "Go Wide", "Reanimator"], power: 7};
let decka6: Deck = {player: "Andrew", commander: "Aboshan", w:false, u: true, b: false, r: false, g: false, strategy:["Self Mill", "Tap Untap"], power: 4};
let deckb1: Deck = {player: "Brian", commander: "Meren", w:false, u: false, b: true, r: false, g: true, strategy:["Reanimator"], power: 6};
let deckb2: Deck = {player: "Brian", commander: "Perrie", w:true, u: true, b: false, r: false, g: true, strategy:["Counters", "Control"], power: 5};
let deckb3: Deck = {player: "Brian", commander: "Konrad", w:false, u: false, b: true, r: false, g: false, strategy:["Drain & Gain", "Self Mill"], power: 7};
let deckb4: Deck = {player: "Brian", commander: "Zegana", w:false, u: true, b: false, r: false, g: true, strategy:["Plus One Counters", "Stompy"], power: 5};
let deckb5: Deck = {player: "Brian", commander: "Aegar", w:false, u: true, b: false, r: true, g: false, strategy:["Burn"], power: 5};
let deckb6: Deck = {player: "Patrick", commander: "Leinore", w:true, u: false, b: false, r: false, g: true, strategy:["Plus One Counters", "Go Wide"], power: 5};
let deckb7: Deck = {player: "Patrick", commander: "Anje", w:false, u: false, b: true, r: true, g: false, strategy:["Drain & Gain"], power: 5};
let deckb8: Deck = {player: "Patrick", commander: "Marneus", w:true, u: true, b: true, r: false, g: false, strategy:["Tokens", "Go Wide"], power: 5};
let deckb9: Deck = {player: "Patrick", commander: "Lucea", w:false, u: true, b: false, r: true, g: true, strategy:["Plus One Counters", "Stompy", "Ramp"], power: 7};
let decks1: Deck = {player: "Stamm", commander: "Mazzy", w:true, u: false, b: false, r: true, g: true, strategy:["Enchantress"], power: 7};
let decks2: Deck = {player: "Stamm", commander: "Alexi", w:false, u: true, b: false, r: false, g: false, strategy:["Control"], power: 4};
let decks3: Deck = {player: "Stamm", commander: "Koll", w:true, u: false, b: false, r: true, g: false, strategy:["Equipment"], power: 4};
let decks4: Deck = {player: "Stamm", commander: "Magar", w:false, u: false, b: true, r: true, g: false, strategy:["Spell Recursion"], power: 5};
let decks5: Deck = {player: "Stamm", commander: "Myra", w:false, u: true, b: false, r: true, g: false, strategy:["Artifacts", "Spell Slinger"], power: 5};
let decko1: Deck = {player: "Olivier", commander: "Kamiz", w:true, u: true, b: true, r: false, g: false, strategy:["Reanimator"], power: 7};
let decko2: Deck = {player: "Olivier", commander: "Faldorn", w:false, u: false, b: false, r: true, g: true, strategy:["Exile", "Tokens"], power: 6};
let decko3: Deck = {player: "Olivier", commander: "Dimir Zombies", w:false, u: true, b: true, r: false, g: false, strategy:["Stompy", "Tokens"], power: 5};
let decko4: Deck = {player: "Olivier", commander: "Isperia", w:true, u: true, b: false, r: false, g: false, strategy:["Flyers", "Stompy"], power: 5};
let decko5: Deck = {player: "Olivier", commander: "Isperia", w:true, u: true, b: false, r: false, g: false, strategy:["Flyers", "Stompy"], power: 5};
let deckm1: Deck = {player: "Mark", commander: "Rafiq", w:true, u: true, b: false, r: false, g: true, strategy:["Voltron"], power: 5};
let deckm2: Deck = {player: "Mark", commander: "Kresh", w:false, u: true, b: true, r: true, g: true, strategy:["Voltron", "Plus One Counters"], power: 5};


let fullDeckList: Array<Deck> = [
//decka1,
decka2,
//decka3,
//decka4,
decka5,
//decka6,
//deckb1,
//deckb2,
//deckb3,
//deckb4,
deckb5,
deckb6,
deckb7,
deckb8,
deckb9,
//decks1,
//decks2,
//decks3,
//decks4,
//decks5,
//decko1,
//decko2,
//decko3,
//decko4,
//decko5,
//deckm1,
deckm2	
];

let currentPlayers = ["Andrew", "Brian", "Mark", "Patrick"];

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

const compareColorCoverageThenStratsThenPower = (m1: Matchup, m2: Matchup): number => {
	//Highest weight to color coverate
	if(m1.colorCoverage.length > m2.colorCoverage.length){
		return -1;
	} else if (m1.colorCoverage.length < m2.colorCoverage.length){
		return 1;
	}
	else {
		//Second weight to strategy overlap (full coverage isn't hard)
		if(m1.strategyOverlap > m2.strategyOverlap){
			return 1;
		} else if(m1.strategyOverlap < m2.strategyOverlap){
			return -1;
		} else {
			//Third weight to power variance, since it's arbitrary
			if(m1.powerVariance > m2.powerVariance){
				return 1;
			} else if(m1.powerVariance < m2.powerVariance){
				return -1;
			}
			return 0;	
		}
	}
}

console.log(matchups.sort(compareColorCoverageThenStratsThenPower));