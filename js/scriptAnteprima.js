/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-10-27T12:06:17+02:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: kebabCase
 * @Filename: scriptAnteprima.js
<<<<<<< HEAD
 * @Last modified by:   Zaharia Laurentiu Jr Marius
 * @Last modified time: 2017-10-31T12:16:31+01:00
=======
 * @Last modified by:   Toqir Nasir
 * @Last modified time: 2017-10-31T19:09:53+01:00
>>>>>>> 2bb4ae337ca013aa65e38bbd9232f20fc5ce73dd
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

<<<<<<< HEAD
//funzione che genera un ID unico per il id del preventivo
function generatePreventivoID() {
	var currentDate = new Date();
	var time = currentDate.getTime();
	var day = currentDate.getDate();
	var month = currentDate.getMonth()+1;
	var year = currentDate.getFullYear();
	day = day.toString();
	month = month.toString();
	year = year.toString();
	console.log(time);
	console.log(currentDate);
	console.log(day);
	console.log(month);
	console.log(year.substring(2));
}

generatePreventivoID();
=======
function printDiv(divName) {
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;
>>>>>>> 2bb4ae337ca013aa65e38bbd9232f20fc5ce73dd

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
}
var app = angular.module('myApp', []);

app.controller('stampa', function($scope, $http) {

console.log(dataFromRiepilogo);

	// scope dati azienda
	$scope.azienda = azienda;

	// scope dati distributore
	if (distributore.codice != null) {
		document.querySelectorAll('[id=table-distributore]')[0].style.display = 'table';
		document.querySelectorAll('[id=table-distributore]')[1].style.display = 'table';
		$scope.distributore = distributore;
		$scope.Ricavo_distributore = distributore[0].Ricavo_scontato;
		$scope.Guadagno_distributore = distributore[0].Guadagno;
		$scope.Guadagno_distributore_percentuale = distributore[0].Guadagno_percentuale;
	}

	// scope dati accessori
	if (accessori) {
		document.querySelectorAll('[id=table-accessori]')[0].style.display = 'table';
		document.querySelectorAll('[id=table-accessori]')[1].style.display = 'table';
		$scope.accessori = accessori;
		$scope.Ricavo_accessori = totali.Ricavo_accessori;
		$scope.Guadagno_accessori = totali.Guadagno_accessori;
		$scope.Guadagno_accessori_percentuale = totali.Guadagno_accessori_percentuale;
	}

	// scope dati software
	if (software) {
		document.querySelectorAll('[id=table-software]')[0].style.display = 'table';
		document.querySelectorAll('[id=table-software]')[1].style.display = 'table';
		$scope.software = software;
		$scope.Ricavo_software = totali.Ricavo_software;
		$scope.Guadagno_software = totali.Guadagno_software;
		$scope.Guadagno_software_percentuale = totali.Guadagno_software_percentuale;
	}

	// scope dati licenze
	if (licenze) {
		document.querySelectorAll('[id=table-licenze]')[0].style.display = 'table';
		document.querySelectorAll('[id=table-licenze]')[1].style.display = 'table';
		$scope.licenze = licenze
		$scope.Ricavo_licenze = totali.Ricavo_licenze;
		$scope.Guadagno_licenze = totali.Guadagno_licenze;
		$scope.Guadagno_licenze_percentuale = totali.Guadagno_licenze_percentuale;
	}

	// scope dati servizi
	if (servizi) {
		document.querySelectorAll('[id=table-servizi]')[0].style.display = 'table';
		document.querySelectorAll('[id=table-servizi]')[1].style.display = 'table';
		$scope.servizi = servizi
		$scope.Ricavo_servizi = totali.Ricavo_servizi;
		$scope.Guadagno_servizi = totali.Guadagno_servizi;
		$scope.Guadagno_servizi_percentuale = totali.Guadagno_servizi_percentuale;
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
