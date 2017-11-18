/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-10-27T12:06:17+02:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: kebabCase
 * @Filename: scriptRiepilogo.js
 * @Last modified by:   Toqir Nasir
 * @Last modified time: 2017-11-18T14:52:46+01:00
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
  document.getElementById('cardSoftware').style.display = 'none';
  document.getElementById('cardLicenze').style.display = 'none';
  document.getElementById('cardServizi').style.display = 'none';
  //tutte le card anche della tabella cliente non sono visibili
  document.getElementById('cardDistributoreCliente').style.display = 'none';
  document.getElementById('cardHardwareCliente').style.display = 'none';
  document.getElementById('cardSoftwareCliente').style.display = 'none';
  document.getElementById('cardLicenzeCliente').style.display = 'none';
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
 		var checkIfAccessoriExist = Object.keys(prodottiHardwareSelected).length;
 		if (checkIfAccessoriExist != 0) {
 			document.getElementById('cardHardware').style.display = 'block';
 			document.getElementById('cardHardwareCliente').style.display = 'block';
 			$scope.hardware = allDataFromPreventivi["prodottiHardwareSelected"];
            totalItemsSelected.totalProdottiHardwareSelected = calculateTotalItemsSelected(prodottiHardwareSelected);
            totalItemsSelected.prodottiHardwareSelectedRevenue = calculateRevenueItemsSelected(prodottiHardwareSelected);
 			totalItemsSelected.prodottiHardwareSelectedPercentageRevenue = calculatePercentageRevenueItemsSelected(totalItemsSelected["prodottiHardwareSelectedRevenue"], totalItemsSelected["totalProdottiHardwareSelected"]);
 			$scope.totalProdottiHardwareSelected = 	totalItemsSelected.totalProdottiHardwareSelected;
 			$scope.prodottiHardwareSelectedRevenue = totalItemsSelected.prodottiHardwareSelectedRevenue;
 			$scope.prodottiHardwareSelectedPercentageRevenue = totalItemsSelected.prodottiHardwareSelectedPercentageRevenue;
 		}
 	}
  });
