

// //D,M,T,W,S,I,L,R,U,Y,Q,N,K,F,E,J,C,A,Z,B,P,G,X,O,H,V
// //H,Q,Z,G,P,J,T,M,O,B,L,N,C,I,F,D,Y,A,W,V,E,U,S,R,K,X
// //U,Q,N,T,L,S,Z,F,M,R,E,H,D,P,X,K,I,B,V,Y,G,J,,C,W,O,A

// //-----------------------------------------------
// function Rotor(mapper){	
// 	this.arr = getAlphabets();	
// 	this.level = 1;	
// 	this.wheel = [];
// 	this.mapper	

// 	//input from outside
// 	//get the index and check what is in the index at wheel i.e. e
// 	//map e according to given code
// 	//check the difference
// 	//add the difference to the outside word according to wheel

// }

// Rotor.prototype.levelUp = function(){

// 	//save last value
// 	var last = this.arr[this.arr.length-1];

// 	//make new shuffled array
// 	var n = new Array();
// 	n.push(last);

// 	//bubble up all values
// 	for(var i=0; i<this.arr.length-1; i++){
// 		n.push(this.arr[i]);	
// 	}

// 	this.arr = n;
// 	this.level++;
// }

// Rotor.prototype.get = function(code){	
// 	return this.arr[getAlphabets().indexOf(code)];
// }

// Rotor.prototype.set = function(l){
// 	this.arr = getAlphabets();	
// 	this.level = 1;
// 	for(var i=0; i<l; i++) this.levelUp();
// 	this.level = l;

// 	console.log("level set to " + this.level + " : " + l);
// }
// //ROTOR END---------------------------------------


// //---------------------------------------------
// function Plugboard(){
// 	this.slots = {
// 		"A": "W",
// 		"B": "B", //
// 		"C": "V",
// 		"D": "F",
// 		"E": "Z",
// 		"F": "D",
// 		"G": "G", //
// 		"H": "U",
// 		"I": "S",
// 		"J": "Q",
// 		"K": "K", //
// 		"L": "O",
// 		"M": "M", //
// 		"N": "R",
// 		"O": "L",
// 		"P": "X",
// 		"Q": "J",
// 		"R": "N",
// 		"S": "I",
// 		"T": "T", //
// 		"U": "H",
// 		"V": "C",
// 		"W": "A",
// 		"X": "P",
// 		"Y": "Y", //
// 		"Z": "E",
// 	}

	
// }

// Plugboard.prototype.randomize = function(){
// 	//make random empty slots
// 	var a = getAlphabets();
// 	var b = getAlphabets();
// 	for(i=0; i<a.length; i++){	
// 		var index = random(0, b.length-1);
// 		this.slots[b[index]] = "";
// 		b.splice(index, 1);
// 	}

	
// 	//connect first 10 slots to another 10 random slots
// 	var a = getAlphabets();
// 	var b = getAlphabets();	
// 	for(i=0; i<10; i++){
// 		var e1 = a[random(0, a.length-1)];
// 		b.splice(b.indexOf(e1), 1);
// 		var e2 = b[random(0, b.length-1)];		
// 		this.slots[e1] = e2;
// 		this.slots[e2] = e1;
// 		a.splice(a.indexOf(e1), 1); //remove form a
// 		//also remove the match
// 		a.splice(a.indexOf(e2), 1);
// 		b.splice(b.indexOf(e2), 1);
// 	}

// 	//connect the rest unconnected to themselves
// 	for(key in this.slots){
// 		if(this.slots[key] === "") this.slots[key] = key;
// 	}
// }

// Plugboard.prototype.get = function(code){
// 	if(this.slots[code]) return(this.slots[code]);
// 	else{

//     for( var prop in this.slots ) {
//         if( this.slots.hasOwnProperty( prop ) ) {
//              if( this.slots[ prop ] === code )
//                  return prop;
//         }
//     }


// 	}
// }

// Plugboard.prototype.set = function(p1, p2){
// 	this.slots[p1] = p2;
// 	this.slots[p2] = p1;
// }
// //PLUGBOARD END---------------------------------


// //------------------------------------------------
// function Enigma(){

// 	//rotor 3
// 	this.r3 = new Rotor();
// 	this.r3.set(random(1,26));

// 	//rotor 2
// 	this.r2 = new Rotor();
// 	this.r2.set(random(1,26));

// 	//rotor 1
// 	this.r1 = new Rotor();
// 	this.r1.set(random(1,26));
	
// 	//rotor plugboard
// 	this.plugboard = new Plugboard();

	
// }

// Enigma.prototype.input = function(code){


// 	 var round1 = this.r3.get(this.r2.get(this.r1.get(this.plugboard.get(code))));

// 	 var round2 = this.plugboard.get(this.r1.get(this.r2.get(round1)));


// 	//rotate rotors
// 	this.r1.levelUp();
// 	if(this.r1.level > 26){
// 		this.r2.levelUp();
// 		this.r1.level = 1;
// 		if(this.r2.level > 26){
// 			this.r3.levelUp();
// 			this.r2.level = 1;
// 			if(this.r3.level > 26) this.r3.level = 1;
// 		}
// 	}
	
// 	console.log(typeof(code) + " : " + typeof(round2));
// 	if(code === round2){
// 		console.log("Recursion");
// 		return this.input(code);		
// 	}
// 	return round2;
// }
// //ENIGMA END---------------------------------------


// //3, 16, 7 : ICSGB

// function getAlphabets(){
// 	var arr = [];
// 	for(var i=65; i<=90; i++){
// 		arr.push(String.fromCharCode(i));
// 	}	
// 	return arr;
// }

// function random(min, max){        
// 	return (Math.floor(Math.random() * (max - min + 1)) + min);
// }





//D,M,T,W,S,I,L,R,U,Y,Q,N,K,F,E,J,C,A,Z,B,P,G,X,O,H,V
//H,Q,Z,G,P,J,T,M,O,B,L,N,C,I,F,D,Y,A,W,V,E,U,S,R,K,X
//U,Q,N,T,L,S,Z,F,M,R,E,H,D,P,X,K,I,B,V,Y,G,J,,C,W,O,A

//input from outside
//get the index and check what is in the index at wheel i.e. e
//map e according to given code
//check the difference
//add the difference to the outside word according to wheel

//-----------------------------------------------
function Rotor(mapper){	
	this.wheel = getAlphabets();	
	this.level = 1;		
	this.mapper = mapper;	
}

Rotor.prototype.levelUp = function(){
	var first = this.wheel[0];
	var n = new Array();
	for(var i=1; i<this.wheel.length; i++) n.push(this.wheel[i]);		
	n.push(first);
	this.wheel = n;
	this.level++;
}

Rotor.prototype.get = function(code){
	// var index = getAlphabets().indexOf(code);
	// var raw = this.wheel[index];
	// var mapped = this.mapper[getAlphabets().indexOf(raw)]; 
	// console.log(code + " -> " + raw + " -> " + mapped);
	// var diff = getDiff(raw, mapped);	
	// return (alpSum(code, diff));

	var i =  this.wheel.indexOf(code);
	return this.mapper[i];
}

Rotor.prototype.getRev = function(code){
	// var index = getAlphabets().indexOf(code);
	// var raw = this.wheel[index];
	// var mapped = getAlphabets()[this.mapper.indexOf(raw)]; 
	// console.log(code + " -> " + raw + " -> " + mapped);
	// var diff = getDiff(raw, mapped);
	// return (alpSum(code, diff));

	var i =  this.mapper.indexOf(code);
	return this.wheel[i];
}

Rotor.prototype.set = function(l){
	this.wheel = getAlphabets();	
	this.level = 1;
	for(var i=0; i<l; i++) this.levelUp();
	this.level = l;

}
//ROTOR END---------------------------------------


function Reflector(){

	var s = "EJMZALYXVBWFCRQUONTSPIKHGD";	
	this.mapping = [];

	for(var i=0; i<s.length; i++){
		this.mapping.push(s[i]);
	}
}

Reflector.prototype.reflect = function(code){
	var i = getAlphabets().indexOf(code);
	return this.mapping[i];
}




function Plugboard(){
	this.slots = {
		"A": "W",
		"B": "B", //
		"C": "V",
		"D": "F",
		"E": "Z",
		"F": "D",
		"G": "G", //
		"H": "U",
		"I": "S",
		"J": "Q",
		"K": "K", //
		"L": "O",
		"M": "M", //
		"N": "R",
		"O": "L",
		"P": "X",
		"Q": "J",
		"R": "N",
		"S": "I",
		"T": "T", //
		"U": "H",
		"V": "C",
		"W": "A",
		"X": "P",
		"Y": "Y", //
		"Z": "E",
	}
	
}

Plugboard.prototype.randomize = function(){
	//make random empty slots
	var a = getAlphabets();
	var b = getAlphabets();
	for(i=0; i<a.length; i++){	
		var index = random(0, b.length-1);
		this.slots[b[index]] = "";
		b.splice(index, 1);
	}

	
	//connect first 10 slots to another 10 random slots
	var a = getAlphabets();
	var b = getAlphabets();	
	for(i=0; i<10; i++){
		var e1 = a[random(0, a.length-1)];
		b.splice(b.indexOf(e1), 1);
		var e2 = b[random(0, b.length-1)];		
		this.slots[e1] = e2;
		this.slots[e2] = e1;
		a.splice(a.indexOf(e1), 1); //remove form a
		//also remove the match
		a.splice(a.indexOf(e2), 1);
		b.splice(b.indexOf(e2), 1);
	}

	//connect the rest unconnected to themselves
	for(key in this.slots){
		if(this.slots[key] === "") this.slots[key] = key;
	}
}

Plugboard.prototype.get = function(code){
	if(this.slots[code]) return(this.slots[code]);
	else{

    for( var prop in this.slots ) {
        if( this.slots.hasOwnProperty( prop ) ) {
             if( this.slots[ prop ] === code )
                 return prop;
        }
    }


	}
}



//------------------------------------------------
function Enigma(){

	//rotor 3
	this.r3 = new Rotor(["D","M","T","W","S","I","L","R","U","Y","Q","N","K","F","E","J","C","A","Z","B","P","G","X","O","H","V"]);
	
	//rotor 2 
	this.r2 = new Rotor(["H","Q","Z","G","P","J","T","M","O","B","L","N","C","I","F","D","Y","A","W","V","E","U","S","R","K","X"]);
	
	//rotor 1 
	//this.r1 = new Rotor(["U","Q","N","T","L","S","Z","F","M","R","E","H","D","P","X","K","I","B","V","Y","G","J","C","W","O","A"]);

	this.r1 = new Rotor(["E","K","M","F","L","G","D","Q","V","Z","N","T","O","W","Y","H","X","V","S","F","A","I","B","R","C","J"]);

	this.plugboard = new Plugboard();

	this.reflector = new Reflector();
	
}

Enigma.prototype.input = function(code){

	var plug1 = this.plugboard.get(code);
	var r11 = this.r1.get(plug1);
	var r21 = this.r2.get(r11);
	var r31 = this.r3.get(r21);



	// $("#rotor1 .input").text($("#rotor1 .input").text() + " - " + plug1);
	// $("#rotor1 .output").text($("#rotor1 .output").text() + " - " + r11);

	// $("#rotor2 .input").text($("#rotor2 .input").text() + " - " + r11);
	// $("#rotor2 .output").text($("#rotor2 .output").text() + " - " + r21);

	// $("#rotor3 .input").text($("#rotor3 .input").text() + " - " + r21);
	// $("#rotor3 .output").text($("#rotor3 .output").text() + " - " + r31);
	

	var reflected = this.reflector.reflect(r31)
	
	var r32 = this.r3.getRev(reflected);
	var r22 = this.r2.getRev(r32);
	var r12 = this.r1.getRev(r22);
	var plug2 = this.plugboard.get(r12);

	// $("#rotor3 .input").text($("#rotor3 .input").text() + " - " + r31);
	// $("#rotor3 .output").text($("#rotor3 .output").text() + " - " + r32);

	// $("#rotor2 .input").text($("#rotor2 .input").text() + " - " + r32);
	// $("#rotor2 .output").text($("#rotor2 .output").text() + " - " + r22);

	// $("#rotor1 .input").text($("#rotor1 .input").text() + " - " + r22);
	// $("#rotor1 .output").text($("#rotor1 .output").text() + " - " + r12);

	console.log(code + " - " + plug1 + " " + r11 + " " + r21 + " " + r31 + " " + r32 + " " + r22 + " " + r12 + " " + plug2);
	console.log("last : " + plug2);

	
	
	//rotate rotors
	this.r1.levelUp();
	if(this.r1.level > 26){
		this.r2.levelUp();
		this.r1.level = 1;
		if(this.r2.level > 26){
			this.r3.levelUp();
			this.r2.level = 1;
			if(this.r3.level > 26) this.r3.level = 1;
		}
	}

	console.log("r1 " + this.r1.level);

	return plug2;

}
//ENIGMA END---------------------------------------


//3, 16, 7 : ICSGB

function getAlphabets(){
	var arr = [];
	for(var i=65; i<=90; i++){
		arr.push(String.fromCharCode(i));
	}	
	return arr;
}

function random(min, max){        
	return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function alpSum(alp, toadd){
	var index = (getAlphabets().indexOf(alp) + toadd)%getAlphabets().length;	
	return getAlphabets()[index];
}

function alpDiff(alp, tosub){
	var index = (Math.abs(getAlphabets().indexOf(alp) - tosub))%getAlphabets().length;	
	return getAlphabets()[index];
}

function getDiff(alp1, alp2){
	return Math.abs(getAlphabets().indexOf(alp1)- getAlphabets().indexOf(alp2));
}






