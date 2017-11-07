/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-10-27T12:06:17+02:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: kebabCase
 * @Filename: scriptAnteprima.js
 * @Last modified by:   Zaharia Laurentiu Jr Marius
 * @Last modified time: 2017-11-07T23:22:10+01:00
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
//document.querySelectorAll('[id=table-accessori]')[1].style.display = 'none';
document.querySelectorAll('[id=table-software]')[0].style.display = 'none';
//document.querySelectorAll('[id=table-software]')[1].style.display = 'none';
document.querySelectorAll('[id=table-licenze]')[0].style.display = 'none';
//document.querySelectorAll('[id=table-licenze]')[1].style.display = 'none';
document.querySelectorAll('[id=table-servizi]')[0].style.display = 'none';
//document.querySelectorAll('[id=table-servizi]')[1].style.display = 'none';
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
			//document.querySelectorAll('[id=table-accessori]')[1].style.display = 'table';
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
			//document.querySelectorAll('[id=table-software]')[1].style.display = 'table';
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
			//document.querySelectorAll('[id=table-licenze]')[1].style.display = 'table';
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
			//document.querySelectorAll('[id=table-servizi]')[1].style.display = 'table';
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
