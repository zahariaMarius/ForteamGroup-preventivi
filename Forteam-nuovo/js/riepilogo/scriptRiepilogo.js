/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-10-27T12:06:17+02:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: kebabCase
 * @Filename: scriptRiepilogo.js
<<<<<<< HEAD
 * @Last modified by:   Zaharia Laurentiu Jr Marius
 * @Last modified time: 2017-11-18T16:28:14+01:00
=======
 * @Last modified by:   Toqir Nasir
 * @Last modified time: 2017-11-18T16:28:30+01:00
>>>>>>> 1e8ee5e814b4d572534e4ce5fff0dd0559b45637
 */
 var app = angular.module('myApp', []);
 //varibile contenente tutti i dati provenienti dalla pagina preventivo in formato {obj assoc}
 var allDataFromPreventivi = JSON.parse(localStorage.getItem("allDataFromPreventivi"));
// console.log(allDataFromPreventivi);
 // suddivisione di tutti i dati nelle varie sezioni
 var user = [allDataFromPreventivi["user"]];
 var cliente = [allDataFromPreventivi["cliente"]];
 var distributoreSelected = allDataFromPreventivi["distributoreSelected"];
 var prodottiHardwareSelected = allDataFromPreventivi["prodottiHardwareSelected"];
 var licenzeSelected = allDataFromPreventivi["licenzeSelected"];
 var canoniSelected = allDataFromPreventivi["canoniSelected"];
 var localSelected = allDataFromPreventivi["localSelected"];
 var totalItemsSelected = allDataFromPreventivi["totalItemsSelected"];
 console.log(allDataFromPreventivi);

 var noteAggiuntive = {
 	aziendali: "",
 	cliente: ""
 }

 //actionlistener sul link per andare all'anteprima
 var link = document.getElementById("linkToAnteprima");

 if (link) {
 	link.addEventListener("click", goToAnteprima, false);
 }

 function goToAnteprima() {
 	var allDataFromRiepilogo = {user, cliente, distributoreSelected, prodottiHardwareSelected, licenzeSelected, canoniSelected, localSelected, totalItemsSelected, noteAggiuntive};
 	localStorage.setItem("allDataFromRiepilogo", JSON.stringify(allDataFromRiepilogo));
 	var local = JSON.parse(localStorage.getItem("allDataFromRiepilogo"));
 	console.log(local);
 }
 
 /**
  * [calculateTotalItemsSelected calculate the total of specified items in cart]
  * @param  {[Array]} items [items array of item]
  * @return {[Number]}       [return the total of specified selectedItems]
  */
 function calculateTotalItemsSelected(items) {
 	var total = 0;
 	for (var i = 0; i < items.length; i++) {
 		total += items[i].Prezzo_listino_quantita;
 	}
 	return total;
 }
 /**
  * [calculateRevenueItemsSelected calculate revenue of all selected items]
  * @param  {[Array]} items [array of items selected]
  * @return {[Number]}       [return total revenue]
  */
 function calculateRevenueItemsSelected(items) {
 	var total = 0;
 	for (var i = 0; i < items.length; i++) {
 		total += items[i].Ricavo;
 	}
 	return total;
 }
 /**
  * [calculatePercentageRevenueItemsSelected calculate percentage revenue of all selected items]
  * @param  {[Number]} totalItemsSelectedRevenue [total of all revenue items selected]
  * @param  {[Number]} totalItemsSelected        [total items selected]
  * @return {[Number]}                           [return total percentage revenue]
  */
 function calculatePercentageRevenueItemsSelected(totalItemsSelectedRevenue, totalItemsSelected) {
 	var total = 0;
 	total = (totalItemsSelectedRevenue * 100) / totalItemsSelected;
 	return total;
 }

  //tutte le card sono inizialmente non visibili
  document.getElementById('cardDistributore').style.display = 'none';
  document.getElementById('cardHardware').style.display = 'none';
  document.getElementById('cardLicenze').style.display = 'none';
  document.getElementById('cardCanoni').style.display = 'none';
  document.getElementById('cardServizi').style.display = 'none';
  //tutte le card anche della tabella cliente non sono visibili
  document.getElementById('cardDistributoreCliente').style.display = 'none';
  document.getElementById('cardHardwareCliente').style.display = 'none';
  document.getElementById('cardLicenzeCliente').style.display = 'none';
  document.getElementById('cardCanoniCliente').style.display = 'none';
  document.getElementById('cardServiziCliente').style.display = 'none';

  app.controller('allTabDataFromPreventivi', function($scope) {

  	if (allDataFromPreventivi["cliente"]) {
  		$scope.azienda = cliente;
  	}
    console.log(distributoreSelected);
  	if (allDataFromPreventivi["distributoreSelected"]) {
  		var checkIfDistributoreExist = Object.keys(distributoreSelected).length;
  		if ((checkIfDistributoreExist != 0) && (allDataFromPreventivi["distributoreSelected"][0].Codice != "null")) {
  			document.getElementById('cardDistributore').style.display = 'block';
  			document.getElementById('cardDistributoreCliente').style.display = 'block';
  			$scope.distributore = distributoreSelected;
  			$scope.Ricavo_distributore = totalItemsSelected.totalDistributoreSelected;
  			$scope.Guadagno_distributore = totalItemsSelected.distributoreSelectedRevenue;
  			$scope.Guadagno_distributore_percentuale = totalItemsSelected.distributoreSelectedPercentageRevenue;

  		}
  	}

    if (allDataFromPreventivi["prodottiHardwareSelected"]) {
 		var checkIfHardwareExist = Object.keys(prodottiHardwareSelected).length;
 		if (checkIfHardwareExist != 0) {
 			document.getElementById('cardHardware').style.display = 'block';
 			document.getElementById('cardHardwareCliente').style.display = 'block';
 			$scope.hardware = allDataFromPreventivi["prodottiHardwareSelected"];
            //calculate and assign to array the total overall of selected items
            totalItemsSelected.totalProdottiHardwareSelected = calculateTotalItemsSelected(prodottiHardwareSelected);
            //calculate and assign to array the total revenue of selected items
            totalItemsSelected.prodottiHardwareSelectedRevenue = calculateRevenueItemsSelected(prodottiHardwareSelected);
            //calculate and assign to array the total percentage revenue of selected items
 			totalItemsSelected.prodottiHardwareSelectedPercentageRevenue = calculatePercentageRevenueItemsSelected(totalItemsSelected["prodottiHardwareSelectedRevenue"], totalItemsSelected["totalProdottiHardwareSelected"]);
 			$scope.totalProdottiHardwareSelected = 	totalItemsSelected.totalProdottiHardwareSelected;
 			$scope.prodottiHardwareSelectedRevenue = totalItemsSelected.prodottiHardwareSelectedRevenue;
 			$scope.prodottiHardwareSelectedPercentageRevenue = totalItemsSelected.prodottiHardwareSelectedPercentageRevenue;
 		}
 	}

    if (allDataFromPreventivi["licenzeSelected"]) {
        var checkIfLicenzeExist = Object.keys(licenzeSelected).length;
        if (checkIfLicenzeExist != 0) {
            document.getElementById('cardLicenze').style.display = 'block';
            document.getElementById('cardLicenzeCliente').style.display = 'block';
            $scope.licenze = allDataFromPreventivi["licenzeSelected"];
            //calculate and assign to array the total overall of selected items
            totalItemsSelected["totalLicenzeSelected"] = calculateTotalItemsSelected(licenzeSelected);
            //calculate and assign to array the total revenue of selected items
            totalItemsSelected["licenzeSelectedRevenue"] = calculateRevenueItemsSelected(licenzeSelected);
            //calculate and assign to array the total percentage revenue of selected items
            totalItemsSelected["licenzeSelectedPercentageRevenue"] = calculatePercentageRevenueItemsSelected(totalItemsSelected["licenzeSelectedRevenue"], totalItemsSelected["totalLicenzeSelected"]);
            $scope.totalLicenzeSelected = totalItemsSelected.totalLicenzeSelected;
            $scope.licenzeSelectedRevenue = totalItemsSelected.licenzeSelectedRevenue;
            $scope.licenzeSelectedPercentageRevenue = totalItemsSelected.licenzeSelectedPercentageRevenue;
        }
    }

    if (allDataFromPreventivi["canoniSelected"]) {
        var checkIfCanoniExist = Object.keys(canoniSelected).length;
        if (checkIfCanoniExist != 0) {
            document.getElementById('cardCanoni').style.display = 'block';
            document.getElementById('cardCanoniCliente').style.display = 'block';
            $scope.canoni = allDataFromPreventivi["canoniSelected"];
            //calculate and assign to array the total overall of selected items
    		totalItemsSelected["totalLocalSelected"] = calculateTotalItemsSelected(localSelected);
    		//calculate and assign to array the total revenue of selected items
    		totalItemsSelected["localSelectedRevenue"] = calculateRevenueItemsSelected(localSelected);
    		//calculate and assign to array the total percentage revenue of selected items
    		totalItemsSelected["localSelectedPercentageRevenue"] = calculatePercentageRevenueItemsSelected(totalItemsSelected["localSelectedRevenue"], totalItemsSelected["totalLocalSelected"]);
            $scope.totalLicenzeSelected = totalItemsSelected.totalLicenzeSelected;
            $scope.licenzeSelectedRevenue = totalItemsSelected.licenzeSelectedRevenue;
            $scope.licenzeSelectedPercentageRevenue = totalItemsSelected.licenzeSelectedPercentageRevenue;
        }
    }
  });
