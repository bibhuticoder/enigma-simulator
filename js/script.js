var enigma = new Enigma();
var raw = "";
var encrypted = "";
var coded;

function loadKeyboard(type, unit){
	var arr = ["-", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "|", "-", "A", "S", "D", "F", "G", "H", "J", "K", "L", "|", "-", "Z", "X", "C", "V", "B", "N", "M", "|"];

	var html = "";
	var row = 1;
	for(var i=0; i<arr.length; i++){
		if(arr[i] !== "-" && arr[i] !== "|"){
			html += `
				<div class="${unit}" data-data="${arr[i]}">
					${arr[i]}
				</div>
			`;
		}else if(arr[i] === '-'){
			html += `<div class="row${row}">`;
		}else if(arr[i] === '|'){
			html += `</div>`;
			row++;
		}
	}

	$("#" + type).html(html);

	applyEvents();
}

function loadPlugboard(){
	var html = "";
	var arr = [];
	for(var key in enigma.plugboard.slots){
		if(arr.indexOf(key) < 0 && arr.indexOf(enigma.plugboard.slots[key]) < 0){
			html += `
			<div class="plug">
				<div class="slot">${key}</div>
				<div class="slot">${enigma.plugboard.slots[key]}</div>
			</div>
			`;
			arr.push(key);
			arr.push(enigma.plugboard.slots[key]);
		}
		
	}

	$("#plugboard").html(html);
}

function applyEvents(){	
	$(".key").unbind('click').bind('click', function(){
		var data = $(this).attr("data-data");
		
		raw += data;
		coded = enigma.input(data);
		encrypted += coded;

		$("div.light[data-data='"+coded+"']").addClass("light-on");
		setTimeout(function(){
			$(".light").removeClass("light-on");	


			rotate(1, enigma.r1.level);			
			rotate(2, enigma.r2.level);
			rotate(3, enigma.r3.level);
			
		}, 200);
		output();

	});
}

$("#clear").click(function(){
	clear();
})

$("#config").click(function(){
	showConfigWindow();
})

$("#config-close").click(function(){
	hideConfigWindow();
})

$(".rotor-input").keyup(function(){
	var level = parseInt($(this).val());
	if(level > 26) level = 26;
	if(level <= 0 || isNaN(level)) level = 1;
	var id = $(this).attr("id");	
	enigma["r"+id].set(level);
	rotate(id, enigma["r"+id].level);
})

function rotate(rotor, level){
	var angle = level * 15;	
	$("#rotor"+rotor+" .outer").css({
		"-ms-transform":" rotate("+angle+"deg)",
	    "-webkit-transform": "rotate("+angle+"deg)",
	    "transform": "rotate("+angle+"deg)"
	});

	$("#rotor"+rotor+" .inner").text(level);
}

function output(){
	$("#output").text(encrypted);
}

function clear(){
	raw = "";
	encrypted = "";
	coded = "";
	$("#output").html("");
}

function showConfigWindow(){
	$("#back").fadeIn(200);
	$(".rotor-input[id=1]").val(enigma.r1.level);
	$(".rotor-input[id=2]").val(enigma.r2.level);
	$(".rotor-input[id=3]").val(enigma.r3.level);
}

function hideConfigWindow(){
	$("#back").fadeOut(100);
}

loadKeyboard("keyboard", "key");

loadKeyboard("lightboard", "light");

// $("#info").html(`
// 	<label> Gears :  ${enigma.r1.level}, ${enigma.r2.level}, ${enigma.r3.level}
// `);

loadPlugboard();

hideConfigWindow();

rotate(1, enigma.r1.level);
rotate(2, enigma.r2.level);
rotate(3, enigma.r3.level);




