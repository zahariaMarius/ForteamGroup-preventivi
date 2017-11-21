/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-10-27T12:06:17+02:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: kebabCase
 * @Filename: scriptRiepilogo.js
<<<<<<< HEAD
=======
 * @Last modified by:   Toqir Nasir
 * @Last modified time: 2017-11-19T21:07:07+01:00
>>>>>>> 5a461fe85b3aaa280db67c4042b355873866de8d
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
 /**
  * [calculateTotalAllItemsSelected calculate all items selected overall total]
  * @return {[Number]} [overall total]
  */
 function calculateOverallTotalAllItemsSelected() {
 	totalItemsSelected["overallTotalAllItemsSelected"] = totalItemsSelected["totalDistributoreSelected"] +
 	totalItemsSelected["totalProdottiHardwareSelected"] + totalItemsSelected["totalLicenzeSelected"] +
 	totalItemsSelected["totalLocalSelected"] + totalItemsSelected["totalCanoniSelected"];
 	return totalItemsSelected["overallTotalAllItemsSelected"];
 }
 /**
  * [calculateOverallRevenueAllItemsSelected calculate all items selected overall revenue total]
  * @return {[type]} [description]
  */
 function calculateOverallRevenueAllItemsSelected() {
 	totalItemsSelected["overallRevenueAllItemsSelected"] = totalItemsSelected["distributoreSelectedRevenue"] +
 	totalItemsSelected["prodottiHardwareSelectedRevenue"] + totalItemsSelected["licenzeSelectedRevenue"] +
 	totalItemsSelected["localSelectedRevenue"] + totalItemsSelected["canoniSelectedRevenue"];
 }

 /**
  * [calculateOverllPercentageRevenueAllItemsSelected calculate all items selected overall percentage revenue total]
  * @return {[type]} [description]
  */
 function calculateOverllPercentageRevenueAllItemsSelected() {
 	totalItemsSelected["overallPercentageRevenueAllItemsSelected"] = (totalItemsSelected["overallRevenueAllItemsSelected"] * 100) / totalItemsSelected["overallTotalAllItemsSelected"];
 }

  //tutte le card sono inizialmente non visibili
  document.getElementById('cardDistributore').style.display = 'none';
  document.getElementById('cardHardware').style.display = 'none';
  document.getElementById('cardLicenze').style.display = 'none';
  document.getElementById('cardCanoni').style.display = 'none';
  document.getElementById('cardLocal').style.display = 'none';
  //tutte le card anche della tabella cliente non sono visibili
  document.getElementById('cardDistributoreCliente').style.display = 'none';
  document.getElementById('cardHardwareCliente').style.display = 'none';
  document.getElementById('cardLicenzeCliente').style.display = 'none';
  document.getElementById('cardCanoniCliente').style.display = 'none';
  document.getElementById('cardLocalCliente').style.display = 'none';

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
  			$scope.Guadagno_distributore = totalItemsSelected.distributoreSelectedRevenue
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
            totalItemsSelected["totalCanoniSelected"] = calculateTotalItemsSelected(canoniSelected);
            //calculate and assign to array the total revenue of selected items
            totalItemsSelected["canoniSelectedRevenue"] = calculateRevenueItemsSelected(canoniSelected);
            //calculate and assign to array the total percentage revenue of selected items
            totalItemsSelected["canoniSelectedPercentageRevenue"] = calculatePercentageRevenueItemsSelected(totalItemsSelected["canoniSelectedRevenue"], totalItemsSelected["totalCanoniSelected"]);
            $scope.totalCanoniSelected = totalItemsSelected.totalCanoniSelected;
            $scope.canoniSelectedRevenue = totalItemsSelected.canoniSelectedRevenue;
            $scope.canoniSelectedPercentageRevenue = totalItemsSelected.canoniSelectedPercentageRevenue;
        }
    }

    if (allDataFromPreventivi["localSelected"]) {
        var checkIfLocalExist = Object.keys(localSelected).length;
        if (checkIfLocalExist != 0) {
            document.getElementById('cardLocal').style.display = 'block';
            document.getElementById('cardLocalCliente').style.display = 'block';
            $scope.local = allDataFromPreventivi["localSelected"];
            //calculate and assign to array the total overall of selected items
            totalItemsSelected["totalLocalSelected"] = calculateTotalItemsSelected(localSelected);
            //calculate and assign to array the total revenue of selected items
            totalItemsSelected["localSelectedRevenue"] = calculateRevenueItemsSelected(localSelected);
            //calculate and assign to array the total percentage revenue of selected items
            totalItemsSelected["localSelectedPercentageRevenue"] = calculatePercentageRevenueItemsSelected(totalItemsSelected["localSelectedRevenue"], totalItemsSelected["totalLocalSelected"]);
            $scope.totalLocalSelected = totalItemsSelected.totalLocalSelected;
            $scope.localSelectedRevenue = totalItemsSelected.localSelectedRevenue;
            $scope.localSelectedPercentageRevenue = totalItemsSelected.localSelectedPercentageRevenue;
        }
    }
    //setting the total prices of all items
   totalItemsSelected["overallTotalAllItemsSelected"] = calculateOverallTotalAllItemsSelected();
   $scope.overallTotalAllItemsSelected = totalItemsSelected.overallTotalAllItemsSelected;
   $scope.overallRevenueAllItemsSelected = totalItemsSelected.overallRevenueAllItemsSelected;
   $scope.overallPercentageRevenueAllItemsSelected = totalItemsSelected.overallPercentageRevenueAllItemsSelected;
   $scope.Percentuale_iva = totalItemsSelected.ivaPercentage;
   $scope.ivaTotalElemensselected = totalItemsSelected.overallTotalAllItemsSelected;

   /**
    * [calcoloScontoRicavoGuadagno description]
    * @param  {[type]} sconto  [description]
    * @param  {[type]} codice  [description]
    * @param  {[type]} sezione [description]
    * @return {[type]}         [description]
    */
   function calcoloScontoRicavoGuadagno(sconto, codice, sezione) {
       var index = 0;
       for (var indexFor in sezione) {
               if(sezione[indexFor].Codice == codice){
                   index = indexFor;
               }
       }
       sezione[index]["Sconto"] = sconto;
       var scontoAccessori = sconto * sezione[index].Prezzo_listino / 100;
       sezione[index].Prezzo_listino_quantita = (sezione[index].Prezzo_listino - scontoAccessori) * sezione[index].Quantita;
       sezione[index].Ricavo = sezione[index].Prezzo_listino_quantita - sezione[index].Prezzo_acquisto * sezione[index].Quantita;
       sezione[index].Ricavo_percentuale = sezione[index].Ricavo  * 100 / sezione[index].Prezzo_listino_quantita;
       return sezione;
   }

   /**
    * [evento change dello scontodistributore]
    * @param  {[object]} row    [the data of the row]
    * @param  {[int]} sconto [sconto]
    * @param  {[int]} index  [index of row]
    */
    $scope.changeScontoDistributore = function(sconto, index) {

        //setting changes on distributore
       distributoreSelected[index].Sconto = sconto;
       distributoreSelected[index].Prezzo_listino_quantita = distributoreSelected[index].Prezzo_listino - (sconto * distributoreSelected[index].Prezzo_listino / 100);
       distributoreSelected[index].Ricavo = distributoreSelected[index].Prezzo_listino_quantita - distributoreSelected[index].Prezzo_acquisto;
       distributoreSelected[index].Ricavo_percentuale = distributoreSelected[index].Ricavo * 100 / distributoreSelected[index].Prezzo_listino_quantita;
       totalItemsSelected.totalDistributoreSelected = distributoreSelected[index].Prezzo_listino_quantita;
       totalItemsSelected.distributoreSelectedRevenue = distributoreSelected[index].Ricavo;
       totalItemsSelected.distributoreSelectedPercentageRevenue = distributoreSelected[index].Ricavo_percentuale;
       $scope.distributore = distributoreSelected;
       $scope.Sconto_distributore = sconto;
       $scope.Ricavo_distributore = totalItemsSelected.totalDistributoreSelected;
       $scope.Guadagno_distributore = totalItemsSelected.distributoreSelectedRevenue;
       $scope.Guadagno_distributore_percentuale = totalItemsSelected.distributoreSelectedPercentageRevenue;
       // setting changes on totals
       totalItemsSelected["overallTotalAllItemsSelected"] = calculateOverallTotalAllItemsSelected();
       calculateOverallRevenueAllItemsSelected();
       calculateOverllPercentageRevenueAllItemsSelected();
       $scope.overallTotalAllItemsSelected = totalItemsSelected.overallTotalAllItemsSelected;
       $scope.overallRevenueAllItemsSelected = totalItemsSelected.overallRevenueAllItemsSelected;
       $scope.overallPercentageRevenueAllItemsSelected = totalItemsSelected.overallPercentageRevenueAllItemsSelected;

       //setting iva
       var percentualeIva = (totalItemsSelected.overallTotalAllItemsSelected * totalItemsSelected.ivaPercentage) / 100;
       totalItemsSelected.ivaTotalElemensselected = totalItemsSelected.overallTotalAllItemsSelected + percentualeIva;
       $scope.Percentuale_iva = totalItemsSelected.ivaPercentage;
       $scope.ivaTotalElemensselected = totalItemsSelected.ivaTotalElemensselected;
   }
   /**
    * [evento change dello scontoaccessori]
    * @param  {[int]} sconto [sconto]
    * @param  {[int]} index  [index of row]
    */
   $scope.changeScontoHardware = function(sconto, codice) {
       //setting changes on prodotti hardware
       $scope.hardware = calcoloScontoRicavoGuadagno(sconto, codice, prodottiHardwareSelected);
       //calculate and assign to array the total overall of selected items
       totalItemsSelected.totalProdottiHardwareSelected = calculateTotalItemsSelected(prodottiHardwareSelected);
       //calculate and assign to array the total revenue of selected items
       totalItemsSelected.prodottiHardwareSelectedRevenue = calculateRevenueItemsSelected(prodottiHardwareSelected);
       //calculate and assign to array the total percentage revenue of selected items
       totalItemsSelected.prodottiHardwareSelectedPercentageRevenue = calculatePercentageRevenueItemsSelected(totalItemsSelected["prodottiHardwareSelectedRevenue"], totalItemsSelected["totalProdottiHardwareSelected"]);
       $scope.totalProdottiHardwareSelected = 	totalItemsSelected.totalProdottiHardwareSelected;
       $scope.prodottiHardwareSelectedRevenue = totalItemsSelected.prodottiHardwareSelectedRevenue;
       $scope.prodottiHardwareSelectedPercentageRevenue = totalItemsSelected.prodottiHardwareSelectedPercentageRevenue;
       // setting changes on totals
       totalItemsSelected["overallTotalAllItemsSelected"] = calculateOverallTotalAllItemsSelected();
       calculateOverallRevenueAllItemsSelected();
       calculateOverllPercentageRevenueAllItemsSelected();
       $scope.overallTotalAllItemsSelected = totalItemsSelected.overallTotalAllItemsSelected;
       $scope.overallRevenueAllItemsSelected = totalItemsSelected.overallRevenueAllItemsSelected;
       $scope.overallPercentageRevenueAllItemsSelected = totalItemsSelected.overallPercentageRevenueAllItemsSelected;
       //setting iva
       var percentualeIva = (totalItemsSelected.overallTotalAllItemsSelected * totalItemsSelected.ivaPercentage) / 100;
       totalItemsSelected.ivaTotalElemensselected = totalItemsSelected.overallTotalAllItemsSelected + percentualeIva;
       $scope.Percentuale_iva = totalItemsSelected.ivaPercentage;
       $scope.ivaTotalElemensselected = totalItemsSelected.ivaTotalElemensselected;
    }
    $scope.changeScontoLicenze = function(sconto, codice) {
        //setting changes on Licenze
        $scope.licenze = calcoloScontoRicavoGuadagno(sconto, codice, licenzeSelected);
        //calculate and assign to array the total overall of selected items
        totalItemsSelected["totalLicenzeSelected"] = calculateTotalItemsSelected(licenzeSelected);
        //calculate and assign to array the total revenue of selected items
        totalItemsSelected["licenzeSelectedRevenue"] = calculateRevenueItemsSelected(licenzeSelected);
        //calculate and assign to array the total percentage revenue of selected items
        totalItemsSelected["licenzeSelectedPercentageRevenue"] = calculatePercentageRevenueItemsSelected(totalItemsSelected["licenzeSelectedRevenue"], totalItemsSelected["totalLicenzeSelected"]);
        $scope.totalLicenzeSelected = totalItemsSelected.totalLicenzeSelected;
        $scope.licenzeSelectedRevenue = totalItemsSelected.licenzeSelectedRevenue;
        $scope.licenzeSelectedPercentageRevenue = totalItemsSelected.licenzeSelectedPercentageRevenue;
        // setting changes on totals
        totalItemsSelected["overallTotalAllItemsSelected"] = calculateOverallTotalAllItemsSelected();
        calculateOverallRevenueAllItemsSelected();
        calculateOverllPercentageRevenueAllItemsSelected();
        $scope.overallTotalAllItemsSelected = totalItemsSelected.overallTotalAllItemsSelected;
        $scope.overallRevenueAllItemsSelected = totalItemsSelected.overallRevenueAllItemsSelected;
        $scope.overallPercentageRevenueAllItemsSelected = totalItemsSelected.overallPercentageRevenueAllItemsSelected;
        //setting iva
        var percentualeIva = (totalItemsSelected.overallTotalAllItemsSelected * totalItemsSelected.ivaPercentage) / 100;
        totalItemsSelected.ivaTotalElemensselected = totalItemsSelected.overallTotalAllItemsSelected + percentualeIva;
        $scope.Percentuale_iva = totalItemsSelected.ivaPercentage;
        $scope.ivaTotalElemensselected = totalItemsSelected.ivaTotalElemensselected;
    }

    $scope.changeScontoCanoni = function(sconto, codice) {
        //setting changes on canoni
        $scope.canoni = calcoloScontoRicavoGuadagno(sconto, codice, canoniSelected);
        //calculate and assign to array the total overall of selected items
        totalItemsSelected["totalCanoniSelected"] = calculateTotalItemsSelected(canoniSelected);
        //calculate and assign to array the total revenue of selected items
        totalItemsSelected["canoniSelectedRevenue"] = calculateRevenueItemsSelected(canoniSelected);
        //calculate and assign to array the total percentage revenue of selected items
        totalItemsSelected["canoniSelectedPercentageRevenue"] = calculatePercentageRevenueItemsSelected(totalItemsSelected["canoniSelectedRevenue"], totalItemsSelected["totalCanoniSelected"]);
        $scope.totalCanoniSelected = totalItemsSelected.totalCanoniSelected;
        $scope.canoniSelectedRevenue = totalItemsSelected.canoniSelectedRevenue;
        $scope.canoniSelectedPercentageRevenue = totalItemsSelected.canoniSelectedPercentageRevenue;
        // setting changes on totals
        totalItemsSelected["overallTotalAllItemsSelected"] = calculateOverallTotalAllItemsSelected();
        calculateOverallRevenueAllItemsSelected();
        calculateOverllPercentageRevenueAllItemsSelected();
        $scope.overallTotalAllItemsSelected = totalItemsSelected.overallTotalAllItemsSelected;
        $scope.overallRevenueAllItemsSelected = totalItemsSelected.overallRevenueAllItemsSelected;
        $scope.overallPercentageRevenueAllItemsSelected = totalItemsSelected.overallPercentageRevenueAllItemsSelected;
        //setting iva
        var percentualeIva = (totalItemsSelected.overallTotalAllItemsSelected * totalItemsSelected.ivaPercentage) / 100;
        totalItemsSelected.ivaTotalElemensselected = totalItemsSelected.overallTotalAllItemsSelected + percentualeIva;
        $scope.Percentuale_iva = totalItemsSelected.ivaPercentage;
        $scope.ivaTotalElemensselected = totalItemsSelected.ivaTotalElemensselected;
    }
    $scope.changeScontoLocal = function(sconto, codice) {
        //setting changes on canoni
        $scope.canoni = calcoloScontoRicavoGuadagno(sconto, codice, localSelected);
        //calculate and assign to array the total overall of selected items
        totalItemsSelected["totalLocalSelected"] = calculateTotalItemsSelected(localSelected);
        //calculate and assign to array the total revenue of selected items
        totalItemsSelected["localSelectedRevenue"] = calculateRevenueItemsSelected(localSelected);
        //calculate and assign to array the total percentage revenue of selected items
        totalItemsSelected["localSelectedPercentageRevenue"] = calculatePercentageRevenueItemsSelected(totalItemsSelected["localSelectedRevenue"], totalItemsSelected["totalLocalSelected"]);
        $scope.totalLocalSelected = totalItemsSelected.totalLocalSelected;
        $scope.localSelectedRevenue = totalItemsSelected.localSelectedRevenue;
        $scope.localSelectedPercentageRevenue = totalItemsSelected.localSelectedPercentageRevenue;
        // setting changes on totals
        totalItemsSelected["overallTotalAllItemsSelected"] = calculateOverallTotalAllItemsSelected();
        calculateOverallRevenueAllItemsSelected();
        calculateOverllPercentageRevenueAllItemsSelected();
        $scope.overallTotalAllItemsSelected = totalItemsSelected.overallTotalAllItemsSelected;
        $scope.overallRevenueAllItemsSelected = totalItemsSelected.overallRevenueAllItemsSelected;
        $scope.overallPercentageRevenueAllItemsSelected = totalItemsSelected.overallPercentageRevenueAllItemsSelected;
        //setting iva
        var percentualeIva = (totalItemsSelected.overallTotalAllItemsSelected * totalItemsSelected.ivaPercentage) / 100;
        totalItemsSelected.ivaTotalElemensselected = totalItemsSelected.overallTotalAllItemsSelected + percentualeIva;
        $scope.Percentuale_iva = totalItemsSelected.ivaPercentage;
        $scope.ivaTotalElemensselected = totalItemsSelected.ivaTotalElemensselected;
    }

    $scope.changeInputIVA = function(iva) {
        totalItemsSelected.ivaPercentage = iva;
        var percentualeIva = (totalItemsSelected.overallTotalAllItemsSelected * totalItemsSelected.ivaPercentage) / 100;
        totalItemsSelected.ivaTotalElemensselected = totalItemsSelected.overallTotalAllItemsSelected + percentualeIva;
        $scope.Percentuale_iva = totalItemsSelected.ivaPercentage;
        $scope.ivaTotalElemensselected = totalItemsSelected.ivaTotalElemensselected;
    }
	
    $scope.noteAggiuntiveAziendali = function() {
        noteAggiuntive.aziendali = $scope.noteAziendali;
    }

    $scope.noteAggiuntiveCliente = function() {
        noteAggiuntive.cliente = $scope.noteCliente;
    }

  });
