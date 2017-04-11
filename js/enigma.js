
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
	var i =  this.wheel.indexOf(code);
	return this.mapper[i];
}

Rotor.prototype.getRev = function(code){
	var i =  this.mapper.indexOf(code);
	return this.wheel[i];
}

Rotor.prototype.set = function(l){
	this.wheel = getAlphabets();	
	this.level = 1;
	for(var i=1; i<l; i++) this.levelUp();		
	this.level = l;
}
//ROTOR END---------------------------------------


//------------------------------------------------
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
// REFLECTOR END



//-------------------------------------------------
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
// PLUGBOARD END




//------------------------------------------------
function Enigma(){

	//rotor 3
	this.r3 = new Rotor(["D","M","T","W","S","I","L","R","U","Y","Q","N","K","F","E","J","C","A","Z","B","P","G","X","O","H","V"]);	
	//rotor 2 
	this.r2 = new Rotor(["H","Q","Z","G","P","J","T","M","O","B","L","N","C","I","F","D","Y","A","W","V","E","U","S","R","K","X"]);	
	//rotor 1 
	this.r1 = new Rotor(["E","K","M","P","L","G","D","Q","V","Z","N","T","O","W","Y","H","X","U","S","F","A","I","B","R","C","J"]);
	this.plugboard = new Plugboard();
	this.reflector = new Reflector();
	
}

Enigma.prototype.input = function(code){

	var plug1 = this.plugboard.get(code);
	var r11 = this.r1.get(plug1);
	var r21 = this.r2.get(r11);
	var r31 = this.r3.get(r21);

	var reflected = this.reflector.reflect(r31)
	
	var r32 = this.r3.getRev(reflected);
	var r22 = this.r2.getRev(r32);
	var r12 = this.r1.getRev(r22);
	var plug2 = this.plugboard.get(r12);

	console.log(code + " - plug1: " + plug1 + " r11: " + r11 + ", r21: " + r21 + ", r31: " + r31 + ", r32: " + r32 + ", r22: " + r22 + ", r12: " + r12 + ", plug2: " + plug2);
	
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
	
	return plug2;

}
//ENIGMA END---------------------------------------


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
