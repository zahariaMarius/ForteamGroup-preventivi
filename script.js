/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-11-04T11:48:25+01:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: ForteamGroup - Preventivi
 * @Filename: script.js
 * @Last modified by:   Zaharia Laurentiu Jr Marius
 * @Last modified time: 2017-11-05T23:16:06+01:00
 */
"use strict";
/**
 * [user contain user Object from DB]
 * @type {Object}
 */
var user;
/**
 * [cliente contain all cliente Objects from inputForm]
 * @type {[Array]}
 */
var cliente = [];
/**
 * [distributoreSelected contain all distributori Objects from table]
 * @type {[Array]}
 */
var distributoreSelected = [];
/**
 * [prodottiHardwareSelected contain all prodottiHardware Objects from table]
 * @type {[Array]}
 */
var prodottiHardwareSelected = [];
/**
 * [licenzeSelected contain all licenze Objects from table]
 * @type {[Array]}
 */
var licenzeSelected = [];
/**
 * [localSelected contain all local Objects from table]
 * @type {[Array]}
 */
var localSelected = [];
/**
 * [canoniSelected contain all canoni Objects form table]
 * @type {[Array]}
 */
var canoniSelected = [];
/**
 * [totalItemsSelected contains all total from selected items]
 * @type {Array}
 */
var totalItemsSelected = [];

/**
 * [checkIfNomeClienteIsValid control if nome cliente inserted is valid]
 * @param  {[String]} name [name inserted into input field]
 * @return {[Bool]}      [return true or false]
 */
function checkIfNomeClienteIsValid(name) {
	var flag = false;
	if (name.length > 5) {
		flag = true;
	}
	return flag;
}

/**
* [checkIfIndirizzoClienteIsValid control if indirizzo cliente inserted is valid]
* @param  {[String]} address [address inserted into input field]
* @return {[Bool]}      [return true or false]
 */
function checkIfIndirizzoClienteIsValid(address) {
	var flag = false;
	if (address.length > 5) {
		flag = true;
	}
	return flag;
}

/**
 * [checkIfPartitaIvaClienteIsValid control if partitaIVA inserted is valid]
 * @param  {[String]} pi [pi inserted into input field]
 * @return {[Bool]}    [return true or false]
 */
function checkIfPartitaIvaClienteIsValid(pi) {
	if( pi == '' )  return true;
	if( ! /^[0-9]{11}$/.test(pi) )
	return false;
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
			return false;
		return true;
}

/**
 * [checkIfCodiceFiscaleClienteIsValid control if codice fisacle inserted is valid]
 * @param  {[String]} cf [codice fiscale inserted into input field]
 * @return {[Bool]}    [return true or false]
 */
function checkIfCodiceFiscaleClienteIsValid(cf) {
	cf = cf.toUpperCase();
	if( cf == '' )  return true;
	if( ! /^[0-9A-Z]{16}$/.test(cf) )
		return false;
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
		return false;
	return true;
}

/**
 * [calculatePrezzoListinoForQuantity calculate the total of prezzo_listino*quantia]
 * @param  {[Object]} item [item selected from table]
 * @return {[type]}      [description]
 */
function calculatePrezzoListinoForQuantity(item) {
	item.Prezzo_listino_quantita = item.Prezzo_listino * item.Quantita;
}

/**
 * [addRemoveItemsFromArrayOfSelectedItem add and remove selected item from itemsArray]
 * @param {[Array]} selectedItems [array of  items]
 * @param {[Object]} item  [item selected]
 */
function addRemoveItemsFromArrayOfSelectedItem(selectedItems, item) {
	if (item.Quantita > 0) {
		selectedItems.push(item);
		for (var i = 0; i < selectedItems.length; i++) {
			if (selectedItems[i].Codice == item.Codice) {
				selectedItems.splice(i, 1);
				i--;
			}
		}
		selectedItems.push(item);
	}else {
		for (var i = 0; i < selectedItems.length; i++) {
			if (selectedItems[i].Codice == item.Codice) {
				selectedItems.splice(i, 1);
			}
		}
	}
	console.log(selectedItems);
}

/**
 * [calculateTotalItemsSelected calculate the total of specified items in cart]
 * @param  {[Array]} items [items array og items]
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
 * [addRemoveDistributoreFromDistributoriSelected add or remove the distubutore selected]
 * @param {[Object]} distributore [distributore selected from select]
 */
function addRemoveDistributoreFromDistributoriSelected(distributore) {
	//control if distributore is null
	if (distributore) {
		//create new Object property "quantita"
		distributore.Quantita = 1;
		if (distributoreSelected.length > 0) {
			distributoreSelected.splice(0, 1);
			distributoreSelected.push(distributore);
		}else {
			distributoreSelected.push(distributore);
		}
		totalItemsSelected["totalDistributoreSelected"] = distributore.Prezzo_listino;
	}else {
		distributoreSelected.splice(0, 1);
		totalItemsSelected["totalDistributoreSelected"] = 0;
	}
}

/**
 * [checkIfQuantitaIsNumber che if quantita is a number else transfrom into a number]
 * @param  {[Any]} qnt [qnt variable coming from input]
 * @return {[Number]}     [return a number variable]
 */
function checkIfQuantitaIsNumber(qnt) {
	//controll if quantita is null, if true became 0
	if (!Number.isInteger(qnt)) {
		qnt = 0;
	}
	return qnt;
}

/**
 * [angular app module]
 * @type {[Object]}
 */
var app = angular.module('preventivoAngularApp', []);

/**
 * [description]
 * @param  {[Object]} $scope [description]
 * @param  {[Object]} $http  [description]
 * @return {[type]}        [description]
 */
app.controller('preventivoController', function($scope, $http) {
	/**
	* [queryDistributori contain the query for SELECT all distributori]
	* @type {String}
	*/
	var queryDistributori = 'SELECT * FROM distributori'
	/**
	* [queryProdottiHardware contain the query for SELECT all prodottiHardware]
	* @type {String}
	*/
	var queryProdottiHardware = 'SELECT * FROM accessori';
	/**
	* [queryLicenze contain the query for SELECT all licenze]
	* @type {String}
	*/
	var queryLicenze = 'SELECT * FROM licenze';
	/**
	* [queryLocal contain the query for SELECT all local]
	* @type {String}
	*/
	var queryLocal = 'SELECT * FROM software';
	/**
	* [queryCanoni contain the query for SELECT all canoni]
	* @type {String}
	*/
	var queryCanoni = 'SELECT * FROM servizi';

	/**
	 * [userLoginAutentication scope retrive user Object from DB through autentication]
	 * @return {[type]} [description]
	 */
	$scope.userLoginAutentication = function() {
		var username = $scope.usernameLogin;
		var password = $scope.passwordLogin;
		var queryUserLogin = "SELECT * FROM utenti WHERE Username = '"+username+"' AND Password = '"+password+"'";
		$http.post('DBM.php', {query: queryUserLogin}).then(function (response) {
			sessionStorage.setItem("user", JSON.stringify(response.data));
		});
	}

	/**
	 * [http post service retrieve all data drom DB]
	 * @param  {[Object]} response [response data from DB]
	 * @return {[type]}          [description]
	 */
	$http.post('DBM.php', {query: queryDistributori}).then(function (response) {
		sessionStorage.setItem("distributori", JSON.stringify(response.data));
		$scope.distributori = response.data;
	});

	/**
	 * [http post service retrieve all data drom DB]
	 * @param  {[Object]} response [response data from DB]
	 * @return {[type]}          [description]
	 */
	 $http.post('DBM.php', {query: queryProdottiHardware}).then(function (response) {
		 sessionStorage.setItem("prodottiHardware", JSON.stringify(response.data));
		 $scope.prodottiHardware = response.data;
	 });

	/**
	 * [http post service retrieve all data drom DB]
	 * @param  {[Object]} response [response data from DB]
	 * @return {[type]}          [description]
	 */
	$http.post('DBM.php', {query: queryLicenze}).then(function (response) {
		sessionStorage.setItem("licenze", JSON.stringify(response.data));
		$scope.licenze = response.data;
	});

	/**
	 * [http post service retrieve all data drom DB]
	 * @param  {[Object]} response [response data from DB]
	 * @return {[type]}          [description]
	 */
	$http.post('DBM.php', {query: queryLocal}).then(function (response) {
		sessionStorage.setItem("local", JSON.stringify(response.data));
		$scope.local = response.data;
	});

	/**
	 * [http post service retrieve all data drom DB]
	 * @param  {[Object]} response [response data from DB]
	 * @return {[type]}          [description]
	 */
	$http.post('DBM.php', {query: queryCanoni}).then(function (response) {
		sessionStorage.setItem("canoni", JSON.stringify(response.data));
		$scope.canoni = response.data;
	});

	/**
	 * [getSelectedDistributore return the ID of selected distributore]
	 * @param  {[String]} distributoreID [id distributore]
	 * @return {[type]}                [description]
	 */
	$scope.getSelectedDistributore = function(distributore) {
		addRemoveDistributoreFromDistributoriSelected(distributore);
		//assign to in cart items scope all items selected
		$scope.cartDistributoreSelected = distributoreSelected;
		//assign to in cart total scope all total
		$scope.cartTotalDistributoreSelected = totalItemsSelected["totalDistributoreSelected"];
	}

	/**
	 * [getProdottiHardwareQuantita scope function that insert an remove prodottoHardware from prodottiHardwareSelected]
	 * @param  {[Number]} quantita         [quantita insert into input]
	 * @param  {[Object]} prodottoHardware [prodottoHardware selected]
	 * @return {[type]}                  [description]
	 */
	$scope.getProdottiHardwareQuantita = function(quantita, prodottoHardware) {
		quantita = checkIfQuantitaIsNumber(quantita);
		//create new Object property "quantita"
		prodottoHardware.Quantita = quantita;
		calculatePrezzoListinoForQuantity(prodottoHardware);
		addRemoveItemsFromArrayOfSelectedItem(prodottiHardwareSelected, prodottoHardware);
		//assign to in cart items scope all items selected
		$scope.cartProdottiHardwareSelected = prodottiHardwareSelected;
		//calculate and assign to array the total complessive of selected items
		totalItemsSelected["totalProdottiHardwareSelected"] = calculateTotalItemsSelected(prodottiHardwareSelected);
		//assign to in cart total scope all total
		$scope.cartTotalProdottiHardwareSelected = totalItemsSelected["totalProdottiHardwareSelected"];
	}

	/**
	 * [getLicenzeQuantita scope function that insert an remove licenza from licenzeSelected]
	 * @param  {[Number]} quantita [quantita insert into input]
	 * @param  {[Object]} licenza  [licenze selected]
	 * @return {[type]}          [description]
	 */
	$scope.getLicenzeQuantita = function(quantita, licenza) {
		quantita = checkIfQuantitaIsNumber(quantita);
		//create new Object property "quantita"
		licenza.Quantita = quantita;
		calculatePrezzoListinoForQuantity(licenza)
		addRemoveItemsFromArrayOfSelectedItem(licenzeSelected, licenza);
		//assign to in cart items scope all items selected
		$scope.cartLicenzeSelected = licenzeSelected;
		//calculate and assign to array the total complessive of selected items
		totalItemsSelected["totalLicenzeSelected"] = calculateTotalItemsSelected(licenzeSelected);
		//assign to in cart total scope all total
		$scope.cartTotalLicenzeSelected = totalItemsSelected["totalLicenzeSelected"];
	}

	/**
	 * [getLocalQuantita scope function that insert an remove local from localSelected]
	 * @param  {[Number]} quantita [quantita insert into input]
	 * @param  {[Object]} local  [local selected]
	 * @return {[type]}          [description]
	 */
	$scope.getLocalQuantita = function(quantita, local) {
		quantita = checkIfQuantitaIsNumber(quantita);
		//create new Object property "quantita"
		local.Quantita = quantita;
		calculatePrezzoListinoForQuantity(local)
		addRemoveItemsFromArrayOfSelectedItem(localSelected, local);
		//assign to in cart items scope all items selected
		$scope.cartLocalSelected = localSelected;
		//calculate and assign to array the total complessive of selected items
		totalItemsSelected["totalLocalSelected"] = calculateTotalItemsSelected(localSelected);
		//assign to in cart total scope all total
		$scope.cartTotalLocalSelected = totalItemsSelected["totalLocalSelected"];
	}

	/**
	 * [getCanoniQuantita scope function that insert an remove canoni from canoniSelected]
	 * @param  {[Number]} quantita [quantita insert into input]
	 * @param  {[Object]} canoni  [canoni selected]
	 * @return {[type]}          [description]
	 */
	$scope.getCanoniQuantita = function(quantita, canone) {
		quantita = checkIfQuantitaIsNumber(quantita);
		//create new Object property "quantita"
		canone.Quantita = quantita;
		calculatePrezzoListinoForQuantity(canone)
		addRemoveItemsFromArrayOfSelectedItem(canoniSelected, canone);
		//assign to in cart items scope all items selected
		$scope.cartCanoniSelected = canoniSelected;
		//calculate and assign to array the total complessive of selected items
		totalItemsSelected["totalCanoniSelected"] = calculateTotalItemsSelected(canoniSelected);
		//assign to in cart total scope all total
		$scope.cartTotalCanoniSelected = totalItemsSelected["totalCanoniSelected"];
	}
});