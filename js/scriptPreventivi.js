/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-10-27T12:06:17+02:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: kebabCase
 * @Filename: scriptPreventivi.js
 * @Last modified by:   Zaharia Laurentiu Jr Marius
 * @Last modified time: 2017-10-28T18:35:25+02:00
 */



"use strict";
//variabile contenente la select dei distributori
var selectDistributori = document.getElementById('selectDistributori');
//variabile contenente la card - contenente le tabella
var card = document.getElementById('card').style.display = 'none';
//variabile conntenete il bottone del carrello
var btnCarrello = document.getElementById("btnCarrello").style.visibility  = "hidden";
var distri = document.getElementById("distributore").style.visibility = "visible";


if (selectDistributori) {
  selectDistributori.addEventListener('change', showTables, false);
}

function showTables() {
  document.getElementById("btnCarrello").style.visibility = "visible";
  var card = document.getElementById('card').style.display = 'block';
}

// angular start
var app = angular.module('myApp', []);
/**
 * [service per passare i dati da un controller all'altro]
 * @return {[type]} [description]
 */
app.service('cartData', function() {
var rowData = {};
	/**
	 * [salva i dati della riga]
	 * @param  {[type]} porductLis [description]
	 * @return {[type]}            [description]
	 */
	this.getRowData = function(productList,type) {
		rowData[type] = productList;
		console.log(rowData);
	}

	/**
	 * [passa i dati salvati al controlle desiderato]
	 * @return {[type]} [description]
	 */
	this.giveRowData = function() {
		return rowData;
	}
});

/** controller per la validazione dei dati dell'azienda richiedente preventivo*/
app.controller('validation', function($scope, cartData) {
	var user = {};

	var flagEntrata = false;

    $scope.change = function() {
		if($scope.myForm.$valid) {
			if(!flagEntrata){
				$('#collapseOne').collapse("hide");
			}
			document.getElementById("distributore").style.visibility = "visible";
			user["Nome_azienda"] = $scope.azienda;
			user["Indirizzo"] = $scope.indirizzo;
			user["Partita_iva"] = $scope.partitaIva;
			user["Codice_fiscale"] = $scope.codiceFiscale;
			cartData.getRowData(user, "azienda");
			flagEntrata = true;
		}else{
			document.getElementById("distributore").style.visibility = "visible";
			document.getElementById('card').style.display = 'none';
		}
		console.log(user);
    }

    });
/** [description]*/
app.controller('formSelectDistributore', function ($rootScope, $scope, $http, cartData) {
  var query = 'SELECT * FROM distributori';
  $http.post('DBM.php', { query: query })
  .then(function (response) {
   $scope.distributori = response.data;
  });

  var selectedDistributore = []

  $scope.change = function() {
	var arr = $scope.selectDistributore.split(',');
	var index = arr[2];
    if ($scope.distributori[index]) {
        selectedDistributore[0] = $scope.distributori[index];
		$rootScope.selectedDistributoreNome = selectedDistributore[0].Nome;
		$rootScope.selectedDistributorePrezzo = selectedDistributore[0].Prezzo_listino;
		selectedDistributore[0]["Quantita"] = 1;
		selectedDistributore[0]["Ricavo_scontato"] = selectedDistributore[0].Prezzo_listino;
		selectedDistributore[0]["Guadagno"] = selectedDistributore[0].Prezzo_listino - selectedDistributore[0].Prezzo_acquisto;
		selectedDistributore[0]["Guadagno_percentuale"] = selectedDistributore[0]["Guadagno"] / selectedDistributore[0].Prezzo_acquisto *100;
	}else{
		$rootScope.selectedDistributoreNome = "Nessun distributore selezionato";
		$rootScope.selectedDistributorePrezzo = null;

        selectedDistributore[0]["Ricavo_scontato"] = 0;
		selectedDistributore[0]["Guadagno"] = 0;
		selectedDistributore[0]["Guadagno_percentuale"] =0;
	}
	cartData.getRowData(selectedDistributore, "distributore");
  }

});

/** [controller per la tabella degli accessori] */
app.controller('formTabAccessori', function($scope, $http, cartData) {
	var query = 'SELECT * FROM accessori';
	$http.post ('DBM.php', {query: query})
	.then(function(response){
		$scope.accessori = response.data;
		sessionStorage.setItem("accessori", JSON.stringify(response.data));
	})

	$scope.$on('pushNewProductAccessori', function(event, product) {
		$scope.accessori.push(product);
  	});

	var productList = {};
	$scope.change = function(row, quantity, index) {
        if((quantity == 0) || (quantity == null)){
            delete productList[index];
    } else {
        row["Quantita"] = quantity;
        row["Totale"] = ( parseFloat(row.Prezzo_listino) * quantity);
        row["Ricavo_scontato"] = row.Totale;
        row["Guadagno"] = (row.Prezzo_listino - row.Prezzo_acquisto) * quantity;
        row["Guadagno_percentuale"] = row["Guadagno"]  *100 / row["Ricavo_scontato"];
		productList[index] = row;
    }
		cartData.getRowData(productList, "accessori");
	}

});

/** [controller per la tabella degli software] */
app.controller('formTabSoftware', function($scope, $http, cartData) {
	var query = 'SELECT * FROM software';
	$http.post('DBM.php', {query: query})
	.then(function(response){
		$scope.software = response.data;
		sessionStorage.setItem("software", JSON.stringify(response.data));
	})

	$scope.$on('pushNewProductSoftware', function(event, product) {
		$scope.software.push(product);
  	});

    var productList = {};
    $scope.change = function(row, quantity, index) {
        if((quantity == 0) || (quantity == null)){
            delete productList[index];
    } else {
        row["Quantita"] = quantity;
        row["Totale"] = ( parseFloat(row.Prezzo_listino) * quantity);
        row["Ricavo_scontato"] = row.Totale;
        row["Guadagno"] = (row.Prezzo_listino - row.Prezzo_acquisto) * quantity;
        row["Guadagno_percentuale"] = row["Guadagno"]  *100 / row["Ricavo_scontato"];
        productList[index] = row;
        // console.log(productList);
    }
        cartData.getRowData(productList, "software");
    }
});

/** [controller per la tabella licenze] */
app.controller('formTabLicenze', function($scope, $http, cartData) {
	var query = 'SELECT * FROM licenze';
	$http.post('DBM.php', {query: query})
	.then(function(response){
		$scope.licenze = response.data;
		sessionStorage.setItem("licenze", JSON.stringify(response.data));
	})

	$scope.$on('pushNewProductLicenze', function(event, product) {
		$scope.licenze.push(product);
  	});

    var productList = {};
    $scope.change = function(row, quantity, index) {
        if((quantity == 0) || (quantity == null)){
            delete productList[index];

    } else {
        row["Quantita"] = quantity;
        row["Totale"] = ( parseFloat(row.Prezzo_listino) * quantity);
        row["Ricavo_scontato"] = row.Totale;
        row["Guadagno"] = (row.Prezzo_listino - row.Prezzo_acquisto) * quantity;
        row["Guadagno_percentuale"] = row["Guadagno"]  *100 / row["Ricavo_scontato"];
        productList[index] = row;
    }
        cartData.getRowData(productList, "licenze");
    }
});

/** [controller per la tabella servizi] */
app.controller('formTabServizi', function($scope, $http, cartData) {
	var query = 'SELECT * FROM servizi';
	$http.post('DBM.php', {query: query})
	.then(function(response){
		$scope.servizi = response.data;
		sessionStorage.setItem("servizi", JSON.stringify(response.data));
	})

	$scope.$on('pushNewProductServizi', function(event, product) {
		$scope.servizi.push(product);
  	});

    var productList = {};
    $scope.change = function(row, quantity, index) {
        if((quantity == 0) || (quantity == null)){
            delete productList[index];

    } else {
        row["Quantita"] = quantity;
        row["Totale"] = ( parseFloat(row.Prezzo_listino) * quantity);
        row["Ricavo_scontato"] = row.Totale;
        row["Guadagno"] = (row.Prezzo_listino - row.Prezzo_acquisto) * quantity;
        row["Guadagno_percentuale"] = row["Guadagno"]  *100 / row["Ricavo_scontato"];
        productList[index] = row;
    }
        cartData.getRowData(productList, "servizi");
    }
});

//controller carrello - start
app.controller('carrello', function($scope, $http, cartData){
    $scope.myFunction = function(){
     var allSelectedData = cartData.giveRowData();
     console.log(allSelectedData);
	 var distributore = allSelectedData["distributore"];
     var accessori = allSelectedData["accessori"];
     var software = allSelectedData["software"];
     var licenze = allSelectedData["licenze"];
     var servizi = allSelectedData["servizi"];
     var card = document.getElementById('card').style.display = 'block';
     var selectDistributoriValue = selectDistributori.options[selectDistributori.selectedIndex].value;
    //   var arr = selectDistributoriValue.split(',');
    //  var nomeDistributore = document.getElementById('selectedDistributoreNome').innerHTML = arr[0];
    // var prezzoDistributore = document.getElementById('selectedDistributorePrezzo').innerHTML = arr[1];
     var totale = {
         distributori: parseFloat(distributore[0].Prezzo_listino),
         accessori: 0,
         software: 0,
         licenze: 0,
         servizi: 0,
         totalCarrello: 0
     }

	 console.log(distributore[0]);

	 var tot = angular.element( document.querySelector( '#collapseTotale' ) );
	 tot.addClass('show');

	 //popolamento dati nel card del distributore
     $scope.distributore = distributore;
 	 $scope.prezzoDistriCart = distributore[0].Prezzo_listino;
     totale.totalCarrello = totale.distributori +  totale.accessori + totale.software + totale.licenze + totale.servizi;
     $scope.totalCart = totale.totalCarrello;


     if (accessori){
         var myEl = angular.element( document.querySelector( '#collapseAccessori' ) );
         myEl.addClass('show');
         for (var index in accessori) {
            if (accessori.hasOwnProperty(index)) {
                totale.accessori += accessori[index].Totale;
            }
         }
		 console.log(accessori);
		 $scope.numeroAccessori = Object.keys(accessori).length;
         $scope.accessori = accessori;
         $scope.totalAccessori = totale.accessori;
         totale.totalCarrello = totale.distributori +  totale.accessori + totale.software + totale.licenze + totale.servizi;
         $scope.totalCart = totale.totalCarrello;
     }

    if(totale.accessori == 0)  {
         var myEl = angular.element( document.querySelector( '#collapseAccessori' ) );
         myEl.removeClass('show');
		 $scope.totalAccessori = null;
		 $scope.numeroAccessori = null;
     }

     if (software){
         var myEl = angular.element( document.querySelector( '#collapseSoftware' ) );
         myEl.addClass('show');
         for (var index in software) {
            if (software.hasOwnProperty(index)) {
                totale.software += software[index].Totale;
            }
         }
		 $scope.numeroSoftware = Object.keys(software).length;
         $scope.software = software;
         $scope.totalSoftware = totale.software;
         totale.totalCarrello = totale.distributori + totale.accessori + totale.software + totale.licenze + totale.servizi;
         $scope.totalCart = totale.totalCarrello;
     }
     if(totale.software == 0)  {
          var myEl = angular.element( document.querySelector( '#collapseSoftware' ) );
          myEl.removeClass('show');
		  $scope.totalSoftware = null;
		  $scope.numeroSoftware = null;
      }

     if (licenze){
         var myEl = angular.element( document.querySelector( '#collapseLicenze' ) );
         myEl.addClass('show');
         for (var index in licenze) {
            if (licenze.hasOwnProperty(index)) {
                totale.licenze += licenze[index].Totale;
            }
         }
		 $scope.numeroLicenze = Object.keys(licenze).length;
         $scope.licenze = licenze;
         $scope.totalLicenze = totale.licenze;
         totale.totalCarrello =totale.distributori +  totale.accessori + totale.software + totale.licenze + totale.servizi;
         $scope.totalCart = totale.totalCarrello;
     }
     if(totale.licenze == 0)  {
          var myEl = angular.element( document.querySelector( '#collapseLicenze' ) );
          myEl.removeClass('show');
		  $scope.totalLicenze = null;
		  $scope.numeroLicenze = null;
      }

     if (servizi){
         var myEl = angular.element( document.querySelector( '#collapseServizi' ) );
         myEl.addClass('show');
         for (var index in servizi) {
            if (servizi.hasOwnProperty(index)) {
                totale.servizi += servizi[index].Totale;
            }
         }
		 $scope.numeroServizi = Object.keys(servizi).length;
         $scope.servizi = servizi;
         $scope.totalServizi = totale.servizi;
         totale.totalCarrello =totale.distributori + totale.accessori + totale.software + totale.licenze + totale.servizi;
         $scope.totalCart = totale.totalCarrello;
     }
     if(totale.servizi == 0)  {
          var myEl = angular.element( document.querySelector( '#collapseServizi' ) );
          myEl.removeClass('show');
		  $scope.totalServizi = null;
		  $scope.numeroServizi = null;
	  }
    }

	$scope.goToRiepilogo = function() {
		var allSelectedData = cartData.giveRowData();
		localStorage.clear();
		localStorage.setItem("allDataFromPreventivi", JSON.stringify(allSelectedData));
		location.href = 'riepilogo.html';
		// console.log(allSelectedData);
	}

});
//controller carrello - end

//controller prodotto personalizzato - start
app.controller('newProduct', function($scope) {
	$scope.saveCustomizedProduct = function() {
		var codiceInput = angular.element(document.querySelector('#newProductCodice'));
		var accessori = JSON.parse(sessionStorage.getItem("accessori"));
		var software = JSON.parse(sessionStorage.getItem("software"));
		var licenze = JSON.parse(sessionStorage.getItem("licenze"));
		var servizi = JSON.parse(sessionStorage.getItem("servizi"));

		var codiceProdottoValido;
		var codiceProdotto = $scope.codiceProdotto;
		var categoria = $scope.categoria;

		switch(categoria) {
			case "accessori":
				codiceProdottoValido = checkIfCodiceProdottoIsValid(codiceProdotto, accessori);
				break;

			case "software":
				codiceProdottoValido = checkIfCodiceProdottoIsValid(codiceProdotto, software);
				break;

			case "licenze":
				codiceProdottoValido = checkIfCodiceProdottoIsValid(codiceProdotto, licenze);
				break;

			case "servizi":
				codiceProdottoValido = checkIfCodiceProdottoIsValid(codiceProdotto, servizi);
				break;
		}

        function checkIfCodiceProdottoIsValid(codiceProdotto, categoria) {
            var flagCheck = true;
            for (var index in categoria) {
                if (categoria[index].Codice == codiceProdotto) {
                    flagCheck = false;
                }
            }
            return flagCheck;
        }

		var newProductForm = $scope.newProductForm.$valid;


		if (newProductForm && codiceProdottoValido) {
			if($scope.categoria == "accessori") {
				var newProduct = {
					Codice: $scope.codiceProdotto,
					Nome: $scope.nomeOrTipologia,
					Descrizione: $scope.descrizioneProdotto,
					Prezzo_acquisto: $scope.prezzoAcquistoProdotto,
					Prezzo_listino: $scope.prezzoListinoProdotto
				}
			}
			var newProduct = {
				Codice: $scope.codiceProdotto,
				Tipologia: $scope.nomeOrTipologia,
				Descrizione: $scope.descrizioneProdotto,
				Prezzo_acquisto: $scope.prezzoAcquistoProdotto,
				Prezzo_listino: $scope.prezzoListinoProdotto
			}

			switch($scope.categoria) {
				case "accessori":
					$scope.$broadcast('pushNewProductAccessori', newProduct);
					break;
				case "software":
					$scope.$broadcast('pushNewProductSoftware', newProduct);
					break;
				case "licenze":
					$scope.$broadcast('pushNewProductLicenze', newProduct);
					break;
				case "servizi":
					$scope.$broadcast('pushNewProductServizi', newProduct);
					break;
			}

			$scope.categoria = null;
			$scope.codiceProdotto = null;
			$scope.nomeOrTipologia = null;
			$scope.descrizioneProdotto = null;
			$scope.prezzoAcquistoProdotto = null;
			$scope.prezzoListinoProdotto = null;

			$('#newElementModal').modal('hide');

			console.log(newProduct);
		}else {codiceInput.addClass('customeProductCodice');}
	}

});
// angular end
