<<<<<<< HEAD

var _$_c3bc=["allDataFromRiepilogo","getItem","parse","azienda","distributore","accessori","software","licenze","servizi","totale","noteAggiuntive","display","style","[id=table-distributore]","querySelectorAll","none","[id=table-accessori]","[id=table-software]","[id=table-licenze]","[id=table-servizi]","tableCliente-note","getElementById","tableAzienda-note","innerHTML","body","print","reload","myApp","module","stampa","log","Codice","table","Ricavo_distributore","Ricavo_scontato","Guadagno_distributore","Guadagno","Guadagno_distributore_percentuale","Guadagno_percentuale","Ricavo_accessori","Guadagno_accessori","Guadagno_accessori_percentuale","Ricavo_software","Guadagno_software","Guadagno_software_percentuale","Ricavo_licenze","Guadagno_licenze","Guadagno_licenze_percentuale","Ricavo_servizi","Guadagno_servizi","Guadagno_servizi_percentuale","Ricavo_totale_iva","Ricavo_totale","Guadagno_totale","Guadagno_totale_percentuale","Totale_imponibile","Percentuale_iva","Totale_preventivo","aziendali","Note_aggiuntive_aziendali","cliente","Note_aggiuntive_cliente","db","distributori","data","then","DBMUpdate.php","post","controller"];var dataFromRiepilogo=JSON[_$_c3bc[2]](localStorage[_$_c3bc[1]](_$_c3bc[0]));var azienda=dataFromRiepilogo[_$_c3bc[3]];var distributore=dataFromRiepilogo[_$_c3bc[4]];var accessori=dataFromRiepilogo[_$_c3bc[5]];var software=dataFromRiepilogo[_$_c3bc[6]];var licenze=dataFromRiepilogo[_$_c3bc[7]];var servizi=dataFromRiepilogo[_$_c3bc[8]];var totali=dataFromRiepilogo[_$_c3bc[9]];var noteAggiuntive=dataFromRiepilogo[_$_c3bc[10]];document[_$_c3bc[14]](_$_c3bc[13])[0][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[15];document[_$_c3bc[14]](_$_c3bc[13])[1][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[15];document[_$_c3bc[14]](_$_c3bc[16])[0][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[15];document[_$_c3bc[14]](_$_c3bc[16])[1][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[15];document[_$_c3bc[14]](_$_c3bc[17])[0][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[15];document[_$_c3bc[14]](_$_c3bc[17])[1][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[15];document[_$_c3bc[14]](_$_c3bc[18])[0][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[15];document[_$_c3bc[14]](_$_c3bc[18])[1][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[15];document[_$_c3bc[14]](_$_c3bc[19])[0][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[15];document[_$_c3bc[14]](_$_c3bc[19])[1][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[15];document[_$_c3bc[21]](_$_c3bc[20])[_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[15];document[_$_c3bc[21]](_$_c3bc[22])[_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[15];function printDiv(_0x3A4B){var _0x3AEB=document[_$_c3bc[21]](_0x3A4B)[_$_c3bc[23]];var _0x3A9B=document[_$_c3bc[24]][_$_c3bc[23]];document[_$_c3bc[24]][_$_c3bc[23]]= _0x3AEB;window[_$_c3bc[25]]();document[_$_c3bc[24]][_$_c3bc[23]]= _0x3A9B;location[_$_c3bc[26]]()}var app=angular[_$_c3bc[28]](_$_c3bc[27],[]);app[_$_c3bc[68]](_$_c3bc[29],function($scope,$http){console[_$_c3bc[30]](dataFromRiepilogo);$scope[_$_c3bc[3]]= azienda;if(distributore[0][_$_c3bc[31]]!= null){document[_$_c3bc[14]](_$_c3bc[13])[0][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[32];document[_$_c3bc[14]](_$_c3bc[13])[1][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[32];$scope[_$_c3bc[4]]= distributore;$scope[_$_c3bc[33]]= distributore[0][_$_c3bc[34]];$scope[_$_c3bc[35]]= distributore[0][_$_c3bc[36]];$scope[_$_c3bc[37]]= distributore[0][_$_c3bc[38]]};if(accessori){document[_$_c3bc[14]](_$_c3bc[16])[0][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[32];document[_$_c3bc[14]](_$_c3bc[16])[1][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[32];$scope[_$_c3bc[5]]= accessori;$scope[_$_c3bc[39]]= totali[_$_c3bc[39]];$scope[_$_c3bc[40]]= totali[_$_c3bc[40]];$scope[_$_c3bc[41]]= totali[_$_c3bc[41]]};if(software){document[_$_c3bc[14]](_$_c3bc[17])[0][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[32];document[_$_c3bc[14]](_$_c3bc[17])[1][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[32];$scope[_$_c3bc[6]]= software;$scope[_$_c3bc[42]]= totali[_$_c3bc[42]];$scope[_$_c3bc[43]]= totali[_$_c3bc[43]];$scope[_$_c3bc[44]]= totali[_$_c3bc[44]]};if(licenze){document[_$_c3bc[14]](_$_c3bc[18])[0][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[32];document[_$_c3bc[14]](_$_c3bc[18])[1][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[32];$scope[_$_c3bc[7]]= licenze;$scope[_$_c3bc[45]]= totali[_$_c3bc[45]];$scope[_$_c3bc[46]]= totali[_$_c3bc[46]];$scope[_$_c3bc[47]]= totali[_$_c3bc[47]]};if(servizi){document[_$_c3bc[14]](_$_c3bc[19])[0][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[32];document[_$_c3bc[14]](_$_c3bc[19])[1][_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[32];$scope[_$_c3bc[8]]= servizi;$scope[_$_c3bc[48]]= totali[_$_c3bc[48]];$scope[_$_c3bc[49]]= totali[_$_c3bc[49]];$scope[_$_c3bc[50]]= totali[_$_c3bc[50]]};if(totali[_$_c3bc[51]]> totali[_$_c3bc[52]]){$scope[_$_c3bc[52]]= totali[_$_c3bc[52]]+ (totali[_$_c3bc[51]]- totali[_$_c3bc[52]])}else {$scope[_$_c3bc[52]]= totali[_$_c3bc[52]]};$scope[_$_c3bc[53]]= totali[_$_c3bc[53]];$scope[_$_c3bc[54]]= totali[_$_c3bc[54]];$scope[_$_c3bc[55]]= totali[_$_c3bc[52]];$scope[_$_c3bc[56]]= totali[_$_c3bc[56]];if(totali[_$_c3bc[51]]> totali[_$_c3bc[52]]){$scope[_$_c3bc[57]]= totali[_$_c3bc[52]]+ (totali[_$_c3bc[51]]- totali[_$_c3bc[52]])}else {$scope[_$_c3bc[57]]= totali[_$_c3bc[52]]};if(noteAggiuntive[_$_c3bc[58]]){document[_$_c3bc[21]](_$_c3bc[22])[_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[32];$scope[_$_c3bc[59]]= noteAggiuntive[_$_c3bc[58]]};if(noteAggiuntive[_$_c3bc[60]]){document[_$_c3bc[21]](_$_c3bc[20])[_$_c3bc[12]][_$_c3bc[11]]= _$_c3bc[32];$scope[_$_c3bc[61]]= noteAggiuntive[_$_c3bc[60]]};$scope[_$_c3bc[62]]= function(){var _0x39AB=localStorage[_$_c3bc[1]](_$_c3bc[0]);console[_$_c3bc[30]](azienda);$http[_$_c3bc[67]](_$_c3bc[66],{azienda:azienda,distributore:distributore,accessori:accessori,software:software,licenze:licenze,servizi:servizi,noteAggiuntive:noteAggiuntive})[_$_c3bc[65]](function(_0x39FB){$scope[_$_c3bc[63]]= _0x39FB[_$_c3bc[64]]})}})
=======
/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-10-27T12:06:17+02:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: kebabCase
 * @Filename: scriptAnteprima.js
 * @Last modified by:   Zaharia Laurentiu Jr Marius
 * @Last modified time: 2017-11-02T17:51:23+01:00
 */

//richiamo di tutti i dati dalla pagina di riepilogo
var dataFromRiepilogo = JSON.parse(localStorage.getItem("allDataFromRiepilogo"));

//salavataggio di tutti i dati in varie variabili
var azienda = dataFromRiepilogo["azienda"];
var distributore = dataFromRiepilogo["distributore"];
var accessori = dataFromRiepilogo["accessori"];
var software = dataFromRiepilogo["software"];
var licenze = dataFromRiepilogo["licenze"];
var servizi = dataFromRiepilogo["servizi"];
var totali = dataFromRiepilogo["totale"];
var noteAggiuntive = dataFromRiepilogo["noteAggiuntive"];

//inizialmente tutte le tabelle dell'antepirma cliente non sono visibili
document.querySelectorAll('[id=table-distributore]')[0].style.display = 'none';
document.querySelectorAll('[id=table-distributore]')[1].style.display = 'none';
document.querySelectorAll('[id=table-accessori]')[0].style.display = 'none';
document.querySelectorAll('[id=table-accessori]')[1].style.display = 'none';
document.querySelectorAll('[id=table-software]')[0].style.display = 'none';
document.querySelectorAll('[id=table-software]')[1].style.display = 'none';
document.querySelectorAll('[id=table-licenze]')[0].style.display = 'none';
document.querySelectorAll('[id=table-licenze]')[1].style.display = 'none';
document.querySelectorAll('[id=table-servizi]')[0].style.display = 'none';
document.querySelectorAll('[id=table-servizi]')[1].style.display = 'none';
document.getElementById("tableCliente-note").style.display = 'none';
document.getElementById("tableAzienda-note").style.display = 'none';

function printDiv(divName) {
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;

     location.reload();
}
var app = angular.module('myApp', []);

app.controller('stampa', function($scope, $http) {

console.log(dataFromRiepilogo);


	// scope dati azienda
	if (azienda[0].Codice_fiscale === undefined) {
		azienda[0].Codice_fiscale = "NON FORNITO";
		$scope.azienda = azienda;
	}

	// scope dati distributore
	if (distributore[0].Codice != null) {
		document.querySelectorAll('[id=table-distributore]')[0].style.display = 'table';
		document.querySelectorAll('[id=table-distributore]')[1].style.display = 'table';
		$scope.distributore = distributore;
		$scope.Ricavo_distributore = distributore[0].Ricavo_scontato;
		$scope.Guadagno_distributore = distributore[0].Guadagno;
		$scope.Guadagno_distributore_percentuale = distributore[0].Guadagno_percentuale;
	}

	// scope dati accessori
	if (accessori) {
		if (Object.keys(accessori).length != 0) {
			document.querySelectorAll('[id=table-accessori]')[0].style.display = 'table';
			document.querySelectorAll('[id=table-accessori]')[1].style.display = 'table';
			$scope.accessori = accessori;
			$scope.Ricavo_accessori = totali.Ricavo_accessori;
			$scope.Guadagno_accessori = totali.Guadagno_accessori;
			$scope.Guadagno_accessori_percentuale = totali.Guadagno_accessori_percentuale;
		}
	}

	// scope dati software
	if (software) {
		if (Object.keys(software).length) {
			document.querySelectorAll('[id=table-software]')[0].style.display = 'table';
			document.querySelectorAll('[id=table-software]')[1].style.display = 'table';
			$scope.software = software;
			$scope.Ricavo_software = totali.Ricavo_software;
			$scope.Guadagno_software = totali.Guadagno_software;
			$scope.Guadagno_software_percentuale = totali.Guadagno_software_percentuale;
		}
	}

	// scope dati licenze
	if (licenze) {
		if (Object.keys(licenze).length) {
			document.querySelectorAll('[id=table-licenze]')[0].style.display = 'table';
			document.querySelectorAll('[id=table-licenze]')[1].style.display = 'table';
			$scope.licenze = licenze
			$scope.Ricavo_licenze = totali.Ricavo_licenze;
			$scope.Guadagno_licenze = totali.Guadagno_licenze;
			$scope.Guadagno_licenze_percentuale = totali.Guadagno_licenze_percentuale;
		}
	}

	// scope dati servizi
	if (servizi) {
		if (Object.keys(servizi).length) {
			document.querySelectorAll('[id=table-servizi]')[0].style.display = 'table';
			document.querySelectorAll('[id=table-servizi]')[1].style.display = 'table';
			$scope.servizi = servizi
			$scope.Ricavo_servizi = totali.Ricavo_servizi;
			$scope.Guadagno_servizi = totali.Guadagno_servizi;
			$scope.Guadagno_servizi_percentuale = totali.Guadagno_servizi_percentuale;
		}
	}

	// scope dati totale complessivo azienda
	if (totali.Ricavo_totale_iva > totali.Ricavo_totale) {
		$scope.Ricavo_totale = totali.Ricavo_totale + (totali.Ricavo_totale_iva - totali.Ricavo_totale);
	}else {
		$scope.Ricavo_totale = totali.Ricavo_totale
	}
	$scope.Guadagno_totale = totali.Guadagno_totale;
	$scope.Guadagno_totale_percentuale = totali.Guadagno_totale_percentuale;

	//scope dati totale complessivo cliente
	$scope.Totale_imponibile = totali.Ricavo_totale;
	$scope.Percentuale_iva = totali.Percentuale_iva;
	if (totali.Ricavo_totale_iva > totali.Ricavo_totale) {
		$scope.Totale_preventivo = totali.Ricavo_totale + (totali.Ricavo_totale_iva - totali.Ricavo_totale);
	}else {
		$scope.Totale_preventivo = totali.Ricavo_totale
	}

	//scope note aggiuntive aziendali
	if (noteAggiuntive.aziendali) {
		document.getElementById("tableAzienda-note").style.display = 'table';
		$scope.Note_aggiuntive_aziendali = noteAggiuntive.aziendali;
	}

	//scope note aggiuntive cliente
	if (noteAggiuntive.cliente) {
		document.getElementById("tableCliente-note").style.display = 'table';
		$scope.Note_aggiuntive_cliente = noteAggiuntive.cliente;
	}

	$scope.db = function() {
		var data = localStorage.getItem("allDataFromRiepilogo");
		console.log(azienda);
		$http.post('DBMUpdate.php', {azienda: azienda, distributore: distributore, accessori: accessori, software: software, licenze: licenze, servizi: servizi, noteAggiuntive: noteAggiuntive})
	    .then(function (response) {
	     $scope.distributori = response.data;
	    });
	}
});
>>>>>>> 34684008e6959bbd16aa2268a89006d3ce6a2548
