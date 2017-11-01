/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-10-27T12:06:17+02:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: kebabCase
 * @Filename: scriptPreventivi.js
 * @Last modified by:   Zaharia Laurentiu Jr Marius
 * @Last modified time: 2017-11-01T23:33:56+01:00
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

//funzione che mostra le tabelle con gli accessori ecc....
function showTables() {
  document.getElementById("btnCarrello").style.visibility = "visible";
  var card = document.getElementById('card').style.display = 'block';
}

//funzione che controlla la validità della partivaIVA
function controlIfPartitaIVAisValid(pi) {
	if( pi == '' )  return true;
	if( ! /^[0-9]{11}$/.test(pi) )
	return "La partita IVA deve contenere 11 cifre.";
	var s = 0;
	for( i = 0; i <= 9; i += 2 )
		s += pi.charCodeAt(i) - '0'.charCodeAt(0);
		for(var i = 1; i <= 9; i += 2 ){
			var c = 2*( pi.charCodeAt(i) - '0'.charCodeAt(0) );
			if( c > 9 )  c = c - 9;
				s += c;
		}
		var atteso = ( 10 - s%10 )%10;
		if( atteso != pi.charCodeAt(10) - '0'.charCodeAt(0) )
			return "La partita IVA non è valida:\n" +
				"il codice di controllo non corrisponde.\n";
		return true;
}

//funzione che controlla se il codice fiscale inserito è valido
function controlIfCodiceFiscaleIsValid(cf) {
	cf = cf.toUpperCase();
	if( cf == '' )  return true;
	if( ! /^[0-9A-Z]{16}$/.test(cf) )
		return "Il codice fiscale deve contenere 16 tra lettere e cifre.";
	var map = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 1, 0, 5, 7, 9, 13, 15, 17,
		19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23];
	var s = 0;
	for(var i = 0; i < 15; i++){
		var c = cf.charCodeAt(i);
		if( c < 65 )
			c = c - 48;
		else
			c = c - 55;
		if( i % 2 == 0 )
			s += map[c];
		else
			s += c < 10? c : c - 10;
	}
	var atteso = String.fromCharCode(65 + s % 26);
	if( atteso != cf.charAt(15) )
		return "Il codice fiscale non è valido:\n" +
			"il codice di controllo non corrisponde.\n";
	return true;
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
		var partitaIva = $scope.partitaIva;
		var codiceFiscale = $scope.codiceFiscale;
		partitaIva = partitaIva.toString();
		var checkIfPartitaIVAisValid = controlIfPartitaIVAisValid(partitaIva);
		var checkIfCodiceFiscaleIsValid = controlIfCodiceFiscaleIsValid(codiceFiscale);
		if($scope.myForm.$valid && checkIfPartitaIVAisValid && checkIfCodiceFiscaleIsValid) {
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


    // detect if IE : from http://stackoverflow.com/a/16657946
    var ie = (function(){
        var undef,rv = -1; // Return value assumes failure.
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');

        if (msie > 0) {
            // IE 10 or older => return version number
            rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        } else if (trident > 0) {
            // IE 11 (or newer) => return version number
            var rvNum = ua.indexOf('rv:');
            rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
        }

        return ((rv > -1) ? rv : undef);
    }());


    // disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = [32, 37, 38, 39, 40], wheelIter = 0;

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
        e.preventDefault();
        e.returnValue = false;
    }

    function keydown(e) {
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                preventDefault(e);
                return;
            }
        }
    }

    function touchmove(e) {
        preventDefault(e);
    }

    function wheel(e) {
        // for IE
        //if( ie ) {
            //preventDefault(e);
        //}
    }

    function disable_scroll() {
        window.onmousewheel = document.onmousewheel = wheel;
        document.onkeydown = keydown;
        document.body.ontouchmove = touchmove;
    }

    function enable_scroll() {
        window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
    }

    var docElem = window.document.documentElement,
        scrollVal,
        isRevealed,
        noscroll,
        isAnimating,
        container = document.getElementById( 'container' ),
        trigger = container.querySelector( 'button.trigger' );

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    function scrollPage() {
        scrollVal = scrollY();

        if( noscroll && !ie ) {
            if( scrollVal < 0 ) return false;
            // keep it that way
            window.scrollTo( 0, 0 );
        }

        if( classie.has( container, 'notrans' ) ) {
            classie.remove( container, 'notrans' );
            return false;
        }

        if( isAnimating ) {
            return false;
        }

        if( scrollVal <= 0 && isRevealed ) {
            toggle(0);
        }
        else if( scrollVal > 0 && !isRevealed ){
            toggle(1);
        }
    }
 function openFormAzienda(){
     console.log(" MOOK ");
      noscroll = true;
      disable_scroll();
      classie.remove( container, 'modify' );
     setTimeout( function() {
         isRevealed = !isRevealed;
         isAnimating = false;
     }, 1200 );
 }
    function toggle( reveal ) {
        isAnimating = true;

        if( reveal ) {
            classie.add( container, 'modify' );
        }
            // noscroll = true;
            // disable_scroll();
            //classie.remove( container, 'modify' );
        // simulating the end of the transition:
        setTimeout( function() {
            isRevealed = !isRevealed;
            isAnimating = false;
            if( reveal ) {
                noscroll = false;
                enable_scroll();
            }
        }, 1200 );
    }

    // refreshing the page...
    var pageScroll = scrollY();
    noscroll = pageScroll === 0;

    disable_scroll();

    if( pageScroll ) {
        isRevealed = true;
        classie.add( container, 'notrans' );
        classie.add( container, 'modify' );
    }

    window.addEventListener( 'scroll', scrollPage );
    trigger.addEventListener( 'click', function() { toggle( 'reveal' ); } );


var textInput = document.querySelector('input');
var inputWrap = textInput.parentElement ;
var inputWidth = parseInt(getComputedStyle(inputWrap).width);
var svgText = Snap('.line');
var qCurve = inputWidth / 2;  // For correct curving on diff screen sizes
var textPath = svgText.path("M0 0 " + inputWidth + " 0");
var textDown = function(){
    textPath.animate({d:"M0 0 Q" + qCurve + " 40 " + inputWidth + " 0"},150,mina.easeout);
};
var textUp = function(){
  textPath.animate({d:"M0 0 Q" + qCurve + " -30 " + inputWidth + " 0"},150,mina.easeout);
};
var textSame = function(){
  textPath.animate({d:"M0 0 " + inputWidth + " 0"},200,mina.easein);
};
var textRun = function(){
  setTimeout(textDown, 200 );
  setTimeout(textUp, 400 );
  setTimeout(textSame, 600 );
};

(function(){
    textInput.addEventListener('focus', function(){
      var parentDiv = this.parentElement;
      parentDiv.classList.add('active');
      textRun();
      this.addEventListener('blur', function(){
        var rg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.]{3,9})+\.([A-Za-z]{2,4})$/;
        this.value == 0 ? parentDiv.classList.remove('active') : null;
        !rg.test(this.value) && this.value != 0 ?
         (parentDiv.classList.remove('valid'), parentDiv.classList.add('invalid'), parentDiv.style.transformOrigin="center")
         : rg.test(this.value) && this.value != 0 ?
        (parentDiv.classList.add('valid'), parentDiv.classList.remove('invalid'), parentDiv.style.transformOrigin="bottom") :null;
        });
     parentDiv.classList.remove('valid', 'invalid')
    });
})();
