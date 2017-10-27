var dataFromRiepilogo = JSON.parse(localStorage.getItem("allDataFromRiepilogo"));

var azienda = dataFromRiepilogo["azienda"];
var distributore = dataFromRiepilogo["distributore"];
var accessori = dataFromRiepilogo["accessori"];
var software = dataFromRiepilogo["software"];
var licenze = dataFromRiepilogo["licenze"];
var servizi = dataFromRiepilogo["servizi"];
var totali = dataFromRiepilogo["totale"];

var app = angular.module('myApp', []);

app.controller('stampa', function($scope) {

console.log(dataFromRiepilogo);

	// scope dati azienda
	$scope.azienda = azienda;

	// scope dati distributore
	$scope.distributore = distributore;
	$scope.Ricavo_distributore = distributore[0].Ricavo_scontato;
	$scope.Guadagno_distributore = distributore[0].Guadagno;
	$scope.Guadagno_distributore_percentuale = distributore[0].Guadagno_percentuale;

	// scope dati accessori
	$scope.accessori = accessori;
	$scope.Ricavo_accessori = totali.Ricavo_accessori;
	$scope.Guadagno_accessori = totali.Guadagno_accessori;
	$scope.Guadagno_accessori_percentuale = totali.Guadagno_accessori_percentuale;

	// scope dati software
	$scope.software = software;
	$scope.Ricavo_software = totali.Ricavo_software;
	$scope.Guadagno_software = totali.Guadagno_software;
	$scope.Guadagno_software_percentuale = totali.Guadagno_software_percentuale;

	// scope dati licenze
	$scope.licenze = licenze
	$scope.Ricavo_licenze = totali.Ricavo_licenze;
	$scope.Guadagno_licenze = totali.Guadagno_licenze;
	$scope.Guadagno_licenze_percentuale = totali.Guadagno_licenze_percentuale;

	// scope dati servizi
	$scope.servizi = servizi
	$scope.Ricavo_servizi = totali.Ricavo_servizi;
	$scope.Guadagno_servizi = totali.Guadagno_servizi;
	$scope.Guadagno_servizi_percentuale = totali.Guadagno_servizi_percentuale;

	// scope dati totale complessivo
	if (totali.Ricavo_totale_iva > totali.Ricavo_totale) {
		$scope.Ricavo_totale = totali.Ricavo_totale + (totali.Ricavo_totale_iva - totali.Ricavo_totale);
	}else {
		$scope.Ricavo_totale = totali.Ricavo_totale
	}
	$scope.Guadagno_totale = totali.Guadagno_totale;
	$scope.Guadagno_totale_percentuale = totali.Guadagno_totale_percentuale;

	$scope.generatePDF = function() {
  	kendo.drawing.drawDOM($("#stampa")).then(function(group) {
    kendo.drawing.pdf.saveAs(group, "Converted-PDF.pdf");
  });
}
});
