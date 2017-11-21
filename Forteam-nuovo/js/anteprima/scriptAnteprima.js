/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-10-27T12:06:17+02:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: kebabCase
 * @Filename: scriptAnteprima.js
<<<<<<< HEAD
 * @Last modified by:   Toqir Nasir
 * @Last modified time: 2017-11-21T12:40:02+01:00
=======
 * @Last modified by:   Zaharia Laurentiu Jr Marius
 * @Last modified time: 2017-11-21T12:13:07+01:00
>>>>>>> dd38c5ca94e43f23db18e8e8da2a33c667b59aae
 */

//richiamo di tutti i dati dalla pagina di riepilogo
var dataFromRiepilogo = JSON.parse(localStorage.getItem("allDataFromRiepilogo"));

//salavataggio di tutti i dati in varie variabili
var azienda = dataFromRiepilogo["cliente"];
var distributore = dataFromRiepilogo["distributoreSelected"];
var prodottiHardwareSelected = dataFromRiepilogo["prodottiHardwareSelected"];
var licenzeSelected = dataFromRiepilogo["licenzeSelected"];
var canoniSelected = dataFromRiepilogo["canoniSelected"];
var localSelected = dataFromRiepilogo["localSelected"];
var totalItemsSelected = dataFromRiepilogo["totalItemsSelected"];
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
//document.getElementById("tableCliente-note").style.display = 'none';
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
	// if (azienda[0].Codice_fiscale === undefined) {
	// 	azienda[0].Codice_fiscale = "NON FORNITO";
	// 	$scope.azienda = azienda;
	// }

	console.log(azienda);

	$scope.cliente = azienda;


	// scope dati distributore

	if(distributore.length != 0){
    	if (distributore[0].Codice != null) {
    		document.querySelectorAll('[id=table-distributore]')[0].style.display = 'table';
    		document.querySelectorAll('[id=table-distributore]')[1].style.display = 'table';
    		$scope.distributore = distributore;
            $scope.Ricavo_distributore = totalItemsSelected.totalDistributoreSelected;
            $scope.Guadagno_distributore = totalItemsSelected.distributoreSelectedRevenue
            $scope.Guadagno_distributore_percentuale = totalItemsSelected.distributoreSelectedPercentageRevenue;
    	}
<<<<<<< HEAD
    }*/

	// scope dati prodotti hardware
	if (prodottiHardwareSelected) {
		if (Object.keys(prodottiHardwareSelected).length != 0) {
			document.querySelectorAll('[id=table-accessori]')[0].style.display = 'table';
			$scope.hardware = prodottiHardwareSelected;
            $scope.totalProdottiHardwareSelected = 	totalItemsSelected.totalProdottiHardwareSelected;
            $scope.prodottiHardwareSelectedRevenue = totalItemsSelected.prodottiHardwareSelectedRevenue;
            $scope.prodottiHardwareSelectedPercentageRevenue = totalItemsSelected.prodottiHardwareSelectedPercentageRevenue;
		}
	}

	// scope dati licenze
	if (licenzeSelected) {
		if (Object.keys(licenzeSelected).length) {
			document.querySelectorAll('[id=table-software]')[0].style.display = 'table';
			$scope.licenze = licenzeSelected;
            $scope.totalLicenzeSelected = totalItemsSelected.totalLicenzeSelected;
            $scope.licenzeSelectedRevenue = totalItemsSelected.licenzeSelectedRevenue;
            $scope.licenzeSelectedPercentageRevenue = totalItemsSelected.licenzeSelectedPercentageRevenue;
		}
	}

	// scope dati canoni
	if (canoniSelected) {
		if (Object.keys(canoniSelected).length) {
			document.querySelectorAll('[id=table-licenze]')[0].style.display = 'table';
			$scope.canoni = canoniSelected
            $scope.totalCanoniSelected = totalItemsSelected.totalCanoniSelected;
            $scope.canoniSelectedRevenue = totalItemsSelected.canoniSelectedRevenue;
            $scope.canoniSelectedPercentageRevenue = totalItemsSelected.canoniSelectedPercentageRevenue;
		}
	}

	// scope dati local
	if (localSelected) {
		if (Object.keys(localSelected).length) {
			document.querySelectorAll('[id=table-servizi]')[0].style.display = 'table';
			$scope.local = localSelected
            $scope.totalLocalSelected = totalItemsSelected.totalLocalSelected;
            $scope.localSelectedRevenue = totalItemsSelected.localSelectedRevenue;
            $scope.localSelectedPercentageRevenue = totalItemsSelected.localSelectedPercentageRevenue;
        }
	}
=======
    }

	// // scope dati accessori
	// if (prodottiHardwareSelected) {
	// 	if (Object.keys(prodottiHardwareSelected).length != 0) {
	// 		document.querySelectorAll('[id=table-accessori]')[0].style.display = 'table';
	// 		//document.querySelectorAll('[id=table-accessori]')[1].style.display = 'table';
	// 		$scope.hardware = prodottiHardwareSelected;
	// 		$scope.Ricavo_accessori = totali.Ricavo_accessori;
	// 		$scope.Guadagno_accessori = totali.Guadagno_accessori;
	// 		$scope.Guadagno_accessori_percentuale = totali.Guadagno_accessori_percentuale;
	// 	}
	// }
	//
	// // scope dati software
	// if (software) {
	// 	if (Object.keys(software).length) {
	// 		document.querySelectorAll('[id=table-software]')[0].style.display = 'table';
	// 		//document.querySelectorAll('[id=table-software]')[1].style.display = 'table';
	// 		$scope.software = software;
	// 		$scope.Ricavo_software = totali.Ricavo_software;
	// 		$scope.Guadagno_software = totali.Guadagno_software;
	// 		$scope.Guadagno_software_percentuale = totali.Guadagno_software_percentuale;
	// 	}
	// }
	//
	// // scope dati licenze
	// if (licenze) {
	// 	if (Object.keys(licenze).length) {
	// 		document.querySelectorAll('[id=table-licenze]')[0].style.display = 'table';
	// 		//document.querySelectorAll('[id=table-licenze]')[1].style.display = 'table';
	// 		$scope.licenze = licenze
	// 		$scope.Ricavo_licenze = totali.Ricavo_licenze;
	// 		$scope.Guadagno_licenze = totali.Guadagno_licenze;
	// 		$scope.Guadagno_licenze_percentuale = totali.Guadagno_licenze_percentuale;
	// 	}
	// }
	//
	// // scope dati servizi
	// if (servizi) {
	// 	if (Object.keys(servizi).length) {
	// 		document.querySelectorAll('[id=table-servizi]')[0].style.display = 'table';
	// 		//document.querySelectorAll('[id=table-servizi]')[1].style.display = 'table';
	// 		$scope.servizi = servizi
	// 		$scope.Ricavo_servizi = totali.Ricavo_servizi;
	// 		$scope.Guadagno_servizi = totali.Guadagno_servizi;
	// 		$scope.Guadagno_servizi_percentuale = totali.Guadagno_servizi_percentuale;
	// 	}
	// }
>>>>>>> dd38c5ca94e43f23db18e8e8da2a33c667b59aae

	// scope dati totale complessivo azienda
	if (totalItemsSelected.ivaTotalElemensselected > totalItemsSelected.overallTotalAllItemsSelected) {
		$scope.overallTotalAllItemsSelected = totalItemsSelected.ivaTotalElemensselected;
	}else {
		$scope.overallTotalAllItemsSelected = totalItemsSelected.overallTotalAllItemsSelected;
	}
	$scope.overallRevenueAllItemsSelected = totalItemsSelected.overallRevenueAllItemsSelected;
	$scope.overallPercentageRevenueAllItemsSelected = totalItemsSelected.overallPercentageRevenueAllItemsSelected;

	//scope dati totale complessivo cliente
	$scope.Totale_imponibile = totalItemsSelected.overallTotalAllItemsSelected;
	$scope.Percentuale_iva = totalItemsSelected.ivaPercentage;
	if (totalItemsSelected.ivaTotalElemensselected > totalItemsSelected.overallTotalAllItemsSelected) {
		$scope.Totale_preventivo = totalItemsSelected.ivaTotalElemensselected;
	}else {
		$scope.Totale_preventivo = totalItemsSelected.overallTotalAllItemsSelected;
	}
/*
	//scope note aggiuntive aziendali
	if (noteAggiuntive.aziendali) {
		document.getElementById("tableAzienda-note").style.display = 'table';
		$scope.Note_aggiuntive_aziendali = noteAggiuntive.aziendali;
	}

	//scope note aggiuntive cliente
	if (noteAggiuntive.cliente) {
		//document.getElementById("tableCliente-note").style.display = 'table';
		$scope.Note_aggiuntive_cliente = noteAggiuntive.cliente;
	}

	$scope.db = function() {
		var data = localStorage.getItem("allDataFromRiepilogo");
		console.log(azienda);
		$http.post('DBMUpdate.php', {azienda: azienda, distributore: distributore, accessori: accessori, software: software, licenze: licenze, servizi: servizi, noteAggiuntive: noteAggiuntive})
	    .then(function (response) {
	     $scope.distributori = response.data;
	    });
	}*/
});
