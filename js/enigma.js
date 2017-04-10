
//-----------------------------------------------
function Rotor(){	
	this.arr = getAlphabets();	
	this.level = 0;	
}

Rotor.prototype.levelUp = function(){

	//save last value
	var last = this.arr[this.arr.length-1];

	//make new shuffled array
	var n = new Array();
	n.push(last);

	//bubble up all values
	for(var i=0; i<this.arr.length-1; i++){
		n.push(this.arr[i]);	
	}

	this.arr = n;
	this.level++;

	if(this.level > this.arr.length) this.level = 0;
}

Rotor.prototype.get = function(code){
	this.levelUp();	
	return this.arr[getAlphabets().indexOf(code)];
}

Rotor.prototype.set = function(l){
	
	for(var i=0; i<l; i++){
		this.levelUp();
	}	
	console.log("level set to " + this.level + " : " + l);
}
//ROTOR END---------------------------------------


//---------------------------------------------
function Plugboard(){
	this.slots = {};

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
	return(this.slots[code]);
}

Plugboard.prototype.set = function(p1, p2){
	this.slots[p1] = p2;
	this.slots[p2] = p1;
}
//PLUGBOARD END---------------------------------


//------------------------------------------------
function Enigma(){

	//rotor 1
	this.r1 = new Rotor();
	this.r1.set(random(0,26));

	//rotor 2
	this.r2 = new Rotor();
	this.r2.set(random(0,26));

	//rotor 3
	this.r3 = new Rotor();
	this.r3.set(random(0,26));


	//rotor plugboard
	this.plugboard = new Plugboard();
}

Enigma.prototype.input = function(code){
	var round1 = this.plugboard.get(this.r3.get(this.r2.get(this.r1.get(code))));

	var round2 = this.plugboard.get(this.r1.get(this.r2.get(this.r3.get(round1))));

	return round2;
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


