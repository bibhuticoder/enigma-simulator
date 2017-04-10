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

function applyEvents(){	
	$(".key").unbind('click').bind('click', function(){
		var data = $(this).attr("data-data");
		
		raw += data;
		coded = enigma.input(data);
		encrypted += coded;

		$("div.light[data-data='"+coded+"']").addClass("light-on");
		setTimeout(function(){
			$("div.light[data-data='"+coded+"']").removeClass("light-on");			
		}, 150);
		output();
		

	});
}


function output(){
	$("#output").text(encrypted);


}

loadKeyboard("keyboard", "key");

loadKeyboard("lightboard", "light");

$("#info").html(`
	<label> Gears :  ${enigma.r1.level}, ${enigma.r2.level}, ${enigma.r3.level}
`);




