var Letters = 'twhzkdfvcjxlrnqmgpsb';
var stylePrimary ="col-xs-12 col-md-6  alert alert-primary border-primary" ;
var styleSucess ="col-xs-12 col-md-6 alert alert-success border-success" ;

function getResultNumberRegex(regex,elemento){
	
	var str=  document.getElementById(elemento).value.toLowerCase();//pega texto do text area
	var result  = str.match(regex); // buscar combinações da regex no texto e numera quantidade de ocorrencias
	if(result == null){
		var arr = [];
		return  arr;
	}
	return result;
}

function getPreposition() {
	// envia para funcao expressao regular de preposições + campo a ser lido
	var result = getResultNumberRegex(/\b[a-km-z]{4}[^rtcdbl ]\b/g,'texto');
	var d = document.getElementById("resultado");
	d.innerHTML =  "<p><h1>Temos "+result.length+" Preposições</h1></p>";
	d.className = stylePrimary;
}

function getVerbs(){
	// envia para funcao expressao regular de verbos e verbos subjantivos  + campo a ser lido
	var result1 = getResultNumberRegex(/\b[a-z]{7,}[^rtcdb ]\b/g,'texto');
	var result2 = getResultNumberRegex(/\b[^rtcdb ][a-z]{6,}[^rtcdb ]\b/g,'texto');
	var d = document.getElementById("resultado");
	d.innerHTML =  "<p><h1>Temos "+result1.length+"  verbos  e destes "+result2.length+" estão na forma subjuntiva</h1></p>";
	d.className = stylePrimary;
}


function prettyNumbers(){
	var arNumber=  document.getElementById("texto").value.split(' ');// transforma texto em array de psudo numeros
	var finalnumber=[];
	var i =0;

	while(arNumber.length> i){ //percorrendo array numeros
		var number = 0;
		for(var j =0;j<arNumber[i].length;j++){//percorre caracteres do pseudo numero
			var booglanNumber = Letters.indexOf(arNumber[i].charAt(j)); // retorna o valor do caracter baseado no indice 
			number += Math.pow(20,j) * booglanNumber; // calculo de conversao base 20  20^indice * valor caracter
		}
	if(finalnumber.indexOf(number) == -1 && number >= 422224 && number%3 ==0){// valida  numero bonito nao repetido
			finalnumber.push(number);
		}
	i++;
	}
	var d = document.getElementById("resultado");
	d.className = styleSucess;
	d.innerHTML = finalnumber.length+ " Numeros Bonitos";
}

function alphabeticSort(){
	var arWords = getResultNumberRegex(/\w+/g,'texto');;// transforma texto em array de psudo numeros
	
	for(var i = 0;i<arWords.length-1; i++){//palavra
		
		for(var j =i+1; j <arWords.length; j++ ){
		
			if(arWords[i] ==arWords[j]){// caso  ja exista  remove do array
				arWords.splice(j);
				break;
			}
			
			var principal = arWords[i].length < arWords[j].length? arWords[i].length : arWords[j].length;// pega menor paralvra
			for(var k = 0;k <principal; k++ ){//varrendo string
				
				var letter1 = Letters.indexOf(arWords[i].charAt(k))
				var letter2 = Letters.indexOf(arWords[j].charAt(k));
				var aux = 0;
						
				if(letter1 > letter2){
					aux = arWords[i];
					arWords[i] = arWords[j];	
					arWords[j] =aux;
					break;					
				} else if(letter1 < letter2){
					break;
				}
			}
		}
	}
	var regex = /\,/g;
	var d = document.getElementById("resultado");
	d.className = stylePrimary;
	d.innerHTML  = String(arWords).replace(regex, " ");
}


