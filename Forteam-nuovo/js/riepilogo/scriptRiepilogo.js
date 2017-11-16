/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-10-27T12:06:17+02:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: kebabCase
 * @Filename: scriptRiepilogo.js
 * @Last modified by:   Toqir Nasir
 * @Last modified time: 2017-11-15T10:28:50+01:00
 */
 var app = angular.module('myApp', []);
 //varibile contenente tutti i dati provenienti dalla pagina preventivo in formato {obj assoc}
 var allDataFromPreventivi = JSON.parse(localStorage.getItem("allDataFromPreventivi"));
// console.log(allDataFromPreventivi);
 // suddivisione di tutti i dati nelle varie sezioni
 var user = [allDataFromPreventivi["user"]];
 var cliente = [allDataFromPreventivi["cliente"]];
 var distributoreSelected = allDataFromPreventivi["distributoreSelected"][0];
 var prodottiHardwareSelected = allDataFromPreventivi["prodottiHardwareSelected"];
 var licenzeSelected = allDataFromPreventivi["licenzeSelected"];
 var canoniSelected = allDataFromPreventivi["canoniSelected"];
 var localSelected = allDataFromPreventivi["localSelected"];
 var totalItemsSelected = allDataFromPreventivi["totalItemsSelected"];
 var noteAggiuntive = {
 	aziendali: "",
 	cliente: ""
 }
console.log(distributoreSelected);
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

  //tutte le card sono inizialmente non visibili
  document.getElementById('cardDistributore').style.display = 'none';
  document.getElementById('cardAccessori').style.display = 'none';
  document.getElementById('cardSoftware').style.display = 'none';
  document.getElementById('cardLicenze').style.display = 'none';
  document.getElementById('cardServizi').style.display = 'none';
  //tutte le card anche della tabella cliente non sono visibili
  document.getElementById('cardDistributoreCliente').style.display = 'none';
  document.getElementById('cardAccessoriCliente').style.display = 'none';
  document.getElementById('cardSoftwareCliente').style.display = 'none';
  document.getElementById('cardLicenzeCliente').style.display = 'none';
  document.getElementById('cardServiziCliente').style.display = 'none';
  app.controller('allTabDataFromPreventivi', function($scope) {

  	if (allDataFromPreventivi["cliente"]) {
  		$scope.azienda = cliente;
  	}

  	if (allDataFromPreventivi["distributoreSelected"]) {
  		var checkIfDistributoreExist = Object.keys(distributoreSelected).length;
  		if ((checkIfDistributoreExist != 0) && (allDataFromPreventivi["ditributoreSelected"][0].Codice != "null")) {
  			document.getElementById('cardDistributore').style.display = 'block';
  			document.getElementById('cardDistributoreCliente').style.display = 'block';
  			$scope.distributore = distributoreSelected;
  			$scope.Ricavo_distributore = distributoreSelected[0].Prezzo_listino;
  			$scope.Guadagno_distributore = distributoreSelected[0].Ricavo;
  			$scope.Guadagno_distributore_percentuale = distributoreSelected[0].Ricavo_percentuale;

  		}
  	}
  });
