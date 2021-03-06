/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-11-04T11:48:25+01:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: ForteamGroup - Preventivi
 * @Filename: script.js
 * @Last modified by:   Toqir Nasir
 * @Last modified time: 2017-11-22T15:53:19+01:00
*/

"use strict";

/**
 * [user contain user Object from DB]
 * @type {Object}
 */
var user = JSON.parse(localStorage.getItem("user"));
/**
 * [cliente contain all cliente Objects from inputForm]
 * @type {[Object]}
 */
var cliente = {};
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
var totalItemsSelected = {};
//all totalItemsSelected distributore variables
totalItemsSelected["totalDistributoreSelected"] = 0;
totalItemsSelected["distributoreSelectedRevenue"] = 0;
totalItemsSelected["distributoreSelectedPercentageRevenue"] = 0;
//all totalItemsSelected prodottiHardware variables
totalItemsSelected["totalProdottiHardwareSelected"] = 0;
totalItemsSelected["prodottiHardwareSelectedRevenue"] = 0;
totalItemsSelected["prodottiHardwareSelectedPercentageRevenue"] = 0;
//all totalItemsSelected licenze variables
totalItemsSelected["totalLicenzeSelected"] = 0;
totalItemsSelected["licenzeSelectedRevenue"] = 0;
totalItemsSelected["licenzeSelectedPercentageRevenue"] = 0;
//all totalItemsSelected local variables
totalItemsSelected["totalLocalSelected"] = 0;
totalItemsSelected["localSelectedRevenue"] = 0;
totalItemsSelected["localSelectedPercentageRevenue"] = 0;
//all totalItemsSelected canoni variables
totalItemsSelected["totalCanoniSelected"] = 0;
totalItemsSelected["canoniSelectedRevenue"] = 0;
totalItemsSelected["canoniSelectedPercentageRevenue"] = 0;
//totalItemsSelected overall total variable
totalItemsSelected["overallTotalAllItemsSelected"] = 0;
totalItemsSelected["overallRevenueAllItemsSelected"] = 0;
totalItemsSelected["overallPercentageRevenueAllItemsSelected"] = 0;
//totalIvaElements
totalItemsSelected["ivaPercentage"] = 0;
totalItemsSelected["ivaTotalElemensselected"] = 0;

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
 * [calculatePrezzoListinoForQuantity calculate the total of prezzo_listino*quantia]
 * @param  {[Object]} item [item selected from table]
 * @return {[type]}      [description]
 */
function calculatePrezzoListinoForQuantityAndRevenueAndPercentageRevenue(item) {
	item.Prezzo_listino_quantita = item.Prezzo_listino * item.Quantita;
	item.Ricavo = (item.Prezzo_listino - item.Prezzo_acquisto) * item.Quantita;
	item.Ricavo_percentuale = (item.Ricavo * 100) / item.Prezzo_listino_quantita;
	item.Sconto = 0;
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
		totalItemsSelected["totalDistributoreSelected"] = Number(distributore.Prezzo_listino);
		distributore.Ricavo = distributore.Prezzo_listino - distributore.Prezzo_acquisto;
		distributore.Ricavo_percentuale = (distributore.Ricavo * 100) / distributore.Prezzo_listino;
		distributore.Sconto = 0;
		distributore.Prezzo_listino_quantita = distributore.Prezzo_listino;
		totalItemsSelected["distributoreSelectedRevenue"] = distributore.Ricavo;
		totalItemsSelected["distributoreSelectedPercentageRevenue"] = distributore.Ricavo_percentuale;
	}else {
		distributoreSelected.splice(0, 1);
		totalItemsSelected["totalDistributoreSelected"] = 0;
		totalItemsSelected["distributoreSelectedRevenue"] = 0;
		totalItemsSelected["distributoreSelectedPercentageRevenue"] = 0;
	}
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
 * [checkUserPrivilegeForCustomizedProduct check if the user is qualified to create an customized product]
 * @param  {[Object]} user [user that is logged in]
 * @return {[Bool]}      [true or false]
 */
function checkUserPrivilegeForCustomizedProduct(user) {
	console.log(user.Privilegi);
	var flag = false
	if (user.Privilegi == "Amministratore") {flag = true;}
	return flag;
}

/**
 * [checkIfCodiceCustomizedProductAlreadyExist Check if inserted codice already exist]
 * @param  {[Char]} categoriaCustomizedProduct [char of selected category]
 * @param  {[String]} codiceCustomizedProduct    [codice inserted]
 * @return {[Bool]}                            [return true or false]
 */
function checkIfCodiceCustomizedProductAlreadyExist(categoriaCustomizedProduct, codiceCustomizedProduct, allCategory) {
	function checkIfCodiceCustomizedProductIsEqual(codiceCustomizedProduct, allCategoryProducts) {
		var flag = false;
		console.log(codiceCustomizedProduct);
		console.log(allCategoryProducts);
		for (var i = 0; i < allCategoryProducts.length; i++) {
			if (codiceCustomizedProduct == allCategoryProducts[i].Codice) {
				flag = true;
			}
		}
		return flag;
	}
	//declar return variable
	var flag;

	console.log(categoriaCustomizedProduct);

	switch (categoriaCustomizedProduct) {
		case '0':
			flag = checkIfCodiceCustomizedProductIsEqual(codiceCustomizedProduct, allCategory[0]);
			break;
		case '1':
			flag = checkIfCodiceCustomizedProductIsEqual(codiceCustomizedProduct, allCategory[1]);
			break;
		case '2':
			flag = checkIfCodiceCustomizedProductIsEqual(codiceCustomizedProduct, allCategory[2]);
			break;
		case '3':
			flag = checkIfCodiceCustomizedProductIsEqual(codiceCustomizedProduct, allCategory[3]);
			break;
	}
	return flag;
}

/**
 * [checkIfPartitaIvaClienteIsValid check if the partita iva inserted is valid]
 * @param  {[String]} value [partita iva]
 * @return {[Bool]}       [description]
 */
function checkIfPartitaIvaClienteIsValid(value) {
	if( value == '' ){
		return false;
	}
	if( ! /^[0-9]{11}$/.test(value) ){
		return false;
	}
	var s = 0;
	for( i = 0; i <= 9; i += 2 )
		s += value.charCodeAt(i) - '0'.charCodeAt(0);
		for(var i = 1; i <= 9; i += 2 ){
			var c = 2*( value.charCodeAt(i) - '0'.charCodeAt(0) );
			if( c > 9 )  c = c - 9;
				s += c;
		}
		var atteso = ( 10 - s%10 )%10;
		if( atteso != value.charCodeAt(10) - '0'.charCodeAt(0) ){
			return false;
		}else{
			return true;
		}
}

/**
 * [checkIfCodiceFiscaleClienteIsValid check if the codice fiscale inserted is valid]
 * @param  {[String]} value [codice fiscale]
 * @return {[Bool]}       [description]
 */
function checkIfCodiceFiscaleClienteIsValid(value) {
	value = value.toUpperCase();
	if( value == '' )  return false;
	if( ! /^[0-9A-Z]{16}$/.test(value) )
		return false;
	var map = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 1, 0, 5, 7, 9, 13, 15, 17,
		19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23];
	var s = 0;
	for(var i = 0; i < 15; i++){
		var c = value.charCodeAt(i);
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
	if( atteso != value.charAt(15) )
		return false;
	return true;
}

/**
 * [callBackAssingnUser function that assing the user value]
 * @return {[type]}      [description]
 */
function callBackAssingnUser() {
	user = JSON.parse(localStorage.getItem("user"));
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

	//assegno nome e cognome al DOM
	$scope.userCognomeNome = user.Cognome+ " " + user.Nome;

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
		$("i[id='errorAnimation']").removeClass('animated shake');
		var username = $scope.usernameLogin;
		var password = $scope.passwordLogin;
		var queryUserLogin = "SELECT * FROM utenti WHERE Username = '"+username+"' AND Password = '"+password+"'";
		$http.post('DataBase/DBM.php', {query: queryUserLogin}).then(function (response) {
			//craete user variable
			var user = response.data[0];
			//clear and set the localStorage
			localStorage.clear();
			localStorage.setItem("user", JSON.stringify(user));
			console.log(response.data[0]);
			//controll if user exist
			if (user) {
				console.log("esiste");
				//close login form
				$("i[id='errorAnimation']").removeClass('animated shake');
				$('#modalLogin').modal('hide');
				$scope.userCognomeNome = user.Cognome+ " " + user.Nome;
				callBackAssingnUser();
			}else {
				$("i[id='errorAnimation']").addClass('animated shake');
				console.log("username or password sbagliati");
			}
		});
	}

	/**
	 * [http post service retrieve all data drom DB]
	 * @param  {[Object]} response [response data from DB]
	 * @return {[type]}          [description]
	 */
	$http.post('DataBase/DBM.php', {query: queryDistributori}).then(function (response) {
		sessionStorage.setItem("distributori", JSON.stringify(response.data));
		$scope.distributori = response.data;
	});

	/**
	 * [http post service retrieve all data drom DB]
	 * @param  {[Object]} response [response data from DB]
	 * @return {[type]}          [description]
	 */
	 $http.post('DataBase/DBM.php', {query: queryProdottiHardware}).then(function (response) {
		 sessionStorage.setItem("prodottiHardware", JSON.stringify(response.data));
		 $scope.prodottiHardware = response.data;
	 });

	/**
	 * [http post service retrieve all data drom DB]
	 * @param  {[Object]} response [response data from DB]
	 * @return {[type]}          [description]
	 */
	$http.post('DataBase/DBM.php', {query: queryLicenze}).then(function (response) {
		sessionStorage.setItem("licenze", JSON.stringify(response.data));
		$scope.licenze = response.data;
	});

	/**
	 * [http post service retrieve all data drom DB]
	 * @param  {[Object]} response [response data from DB]
	 * @return {[type]}          [description]
	 */
	$http.post('DataBase/DBM.php', {query: queryLocal}).then(function (response) {
		sessionStorage.setItem("local", JSON.stringify(response.data));
		$scope.local = response.data;
	});

	/**
	 * [http post service retrieve all data drom DB]
	 * @param  {[Object]} response [response data from DB]
	 * @return {[type]}          [description]
	 */
	$http.post('DataBase/DBM.php', {query: queryCanoni}).then(function (response) {
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
		//calculate and assign the overall total of all items selected
		totalItemsSelected["overallTotalAllItemsSelected"] = calculateOverallTotalAllItemsSelected();
		$scope.cartOverallTotalAllItemsSelected = totalItemsSelected["overallTotalAllItemsSelected"];
		calculateOverallRevenueAllItemsSelected();
		calculateOverllPercentageRevenueAllItemsSelected();
		console.log(distributore);
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
		calculatePrezzoListinoForQuantityAndRevenueAndPercentageRevenue(prodottoHardware);
		addRemoveItemsFromArrayOfSelectedItem(prodottiHardwareSelected, prodottoHardware);
		//assign to in cart items scope all items selected
		$scope.cartProdottiHardwareSelected = prodottiHardwareSelected;
		//calculate and assign to array the overall total of selected items
		totalItemsSelected["totalProdottiHardwareSelected"] = calculateTotalItemsSelected(prodottiHardwareSelected);
		//calculate and assign to array the total revenue of selected items
		totalItemsSelected["prodottiHardwareSelectedRevenue"] = calculateRevenueItemsSelected(prodottiHardwareSelected);
		//calculate and assign to array the total percentage revenue of selected items
		totalItemsSelected["prodottiHardwareSelectedPercentageRevenue"] = calculatePercentageRevenueItemsSelected(totalItemsSelected["prodottiHardwareSelectedRevenue"], totalItemsSelected["totalProdottiHardwareSelected"]);
		//assign to in cart total scope all total
		$scope.cartTotalProdottiHardwareSelected = totalItemsSelected["totalProdottiHardwareSelected"];
		//calculate and assign the overall total of all items selected
		$scope.cartOverallTotalAllItemsSelected = calculateOverallTotalAllItemsSelected();
		calculateOverallRevenueAllItemsSelected();
		calculateOverllPercentageRevenueAllItemsSelected();
		console.log(totalItemsSelected);
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
		calculatePrezzoListinoForQuantityAndRevenueAndPercentageRevenue(licenza);
		addRemoveItemsFromArrayOfSelectedItem(licenzeSelected, licenza);
		//assign to in cart items scope all items selected
		$scope.cartLicenzeSelected = licenzeSelected;
		//calculate and assign to array the total overall of selected items
		totalItemsSelected["totalLicenzeSelected"] = calculateTotalItemsSelected(licenzeSelected);
		//calculate and assign to array the total revenue of selected items
		totalItemsSelected["licenzeSelectedRevenue"] = calculateRevenueItemsSelected(licenzeSelected);
		//calculate and assign to array the total percentage revenue of selected items
		totalItemsSelected["licenzeSelectedPercentageRevenue"] = calculatePercentageRevenueItemsSelected(totalItemsSelected["licenzeSelectedRevenue"], totalItemsSelected["totalLicenzeSelected"]);
		//assign to in cart total scope all total
		$scope.cartTotalLicenzeSelected = totalItemsSelected["totalLicenzeSelected"];
		//calculate and assign the overall total of all items selected
		$scope.cartOverallTotalAllItemsSelected = calculateOverallTotalAllItemsSelected();
		calculateOverallRevenueAllItemsSelected();
		calculateOverllPercentageRevenueAllItemsSelected();
		console.log(totalItemsSelected);
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
		calculatePrezzoListinoForQuantityAndRevenueAndPercentageRevenue(local);
		addRemoveItemsFromArrayOfSelectedItem(localSelected, local);
		//assign to in cart items scope all items selected
		$scope.cartLocalSelected = localSelected;
		//calculate and assign to array the total overall of selected items
		totalItemsSelected["totalLocalSelected"] = calculateTotalItemsSelected(localSelected);
		//calculate and assign to array the total revenue of selected items
		totalItemsSelected["localSelectedRevenue"] = calculateRevenueItemsSelected(localSelected);
		//calculate and assign to array the total percentage revenue of selected items
		totalItemsSelected["localSelectedPercentageRevenue"] = calculatePercentageRevenueItemsSelected(totalItemsSelected["localSelectedRevenue"], totalItemsSelected["totalLocalSelected"]);
		//assign to in cart total scope all total
		$scope.cartTotalLocalSelected = totalItemsSelected["totalLocalSelected"];
		//calculate and assign the overall total of all items selected
		$scope.cartOverallTotalAllItemsSelected = calculateOverallTotalAllItemsSelected();
		calculateOverallRevenueAllItemsSelected();
		calculateOverllPercentageRevenueAllItemsSelected();
		console.log(totalItemsSelected);
	}

	/**
	 * [getCanoniQuantita scope function that insert an remove canoni from canoniSelected]
	 * @param  {[Number]} quantita [quantita insert into input]
	 * @param  {[Object]} canoni  [canoni selected]
	 * @return {[type]}          [description]
	 */
	$scope.getCanoniQuantita = function(quantita, canone) {
		console.log(canone);
		quantita = checkIfQuantitaIsNumber(quantita);
		//create new Object property "quantita"
		canone.Quantita = quantita;
		calculatePrezzoListinoForQuantityAndRevenueAndPercentageRevenue(canone);
		addRemoveItemsFromArrayOfSelectedItem(canoniSelected, canone);
		//assign to in cart items scope all items selected
		$scope.cartCanoniSelected = canoniSelected;
		//calculate and assign to array the total overall of selected items
		totalItemsSelected["totalCanoniSelected"] = calculateTotalItemsSelected(canoniSelected);
		//calculate and assign to array the total revenue of selected items
		totalItemsSelected["canoniSelectedRevenue"] = calculateRevenueItemsSelected(canoniSelected);
		//calculate and assign to array the total percentage revenue of selected items
		totalItemsSelected["canoniSelectedPercentageRevenue"] = calculatePercentageRevenueItemsSelected(totalItemsSelected["canoniSelectedRevenue"], totalItemsSelected["totalCanoniSelected"]);
		//assign to in cart total scope all total
		$scope.cartTotalCanoniSelected = totalItemsSelected["totalCanoniSelected"];
		//calculate and assign the overall total of all items selected
		$scope.cartOverallTotalAllItemsSelected = calculateOverallTotalAllItemsSelected();
		calculateOverallRevenueAllItemsSelected();
		calculateOverllPercentageRevenueAllItemsSelected();
		console.log(totalItemsSelected);
	}

	/**
	 * [openCart scope function that open teh modal cart]
	 * @return {[type]} [description]
	 */
	$scope.openCart = function(){
		//close tab if nothing has been selected
		if (totalItemsSelected["totalDistributoreSelected"] == 0) {
			$('#collapseDistributore').removeClass('show');
		}else {
			$('#collapseDistributore').addClass('show');
		}

		//close tab if nothing has been selected
		if (totalItemsSelected["totalProdottiHardwareSelected"] == 0) {
			$('#collapseProdottiHardware').removeClass('show');
		}else {
			$('#collapseProdottiHardware').addClass('show');
		}

		//close tab if nothing has been selected
		if (totalItemsSelected["totalLicenzeSelected"] == 0) {
			$('#collapseLicenze').removeClass('show');
		}else {
			$('#collapseLicenze').addClass('show');
		}

		//close tab if nothing has been selected
		if (totalItemsSelected["totalLocalSelected"] == 0) {
			$('#collapseLocal').removeClass('show');
		}else {
			$('#collapseLocal').addClass('show');
		}

		//close tab if nothing has been selected
		if (totalItemsSelected["totalCanoniSelected"] == 0) {
			$('#collapseCanoni').removeClass('show');
		}else {
			$('#collapseCanoni').addClass('show');
		}

		//open the modal cart
		$('#modalCarrello').modal('show');
	}

	/**
	 * [openCustomizedProduct open the create customized product form]
	 * @return {[type]} [description]
	 */
	$scope.openCustomizedProduct = function() {
		//check if user is qualified to craete a customized product
		if (checkUserPrivilegeForCustomizedProduct(user)) {
			//open the create new element form
			$('#modalCustomizeProduct').modal('show');
			console.log("User qualified");
			$("i[id='codiceProdottoIcon']").removeClass('red-text');
		}else {
			//open the login form
			$('#modalLogin').modal('show');
			console.log("user not qualified");
		}
		console.log(user);
	}

	/**
	 * [createCustomizedProduct scope insert into table the new customized product]
	 * @return {[type]} [description]
	 */
	$scope.createCustomizedProduct = function() {
		//get all Object items from sessionStorage
		var prodottiHardware = $scope.prodottiHardware;
		var licenze = $scope.licenze;
		var local = $scope.local;
		var canoni = $scope.canoni;
		//get all input data from input form
		var categoriaCustomizedProduct = $scope.categoriaCustomizedProduct;
		var codiceCustomizedProduct = $scope.codiceCustomizedProduct;
		var nomeCustomizedProduct = $scope.nomeCustomizedProduct;
		var descrizioneCustomizedProduct = $scope.descrizioneCustomizedProduct;
		var prezzoAcquistoCustomizedProduct = $scope.prezzoAcquistoCustomizedProduct;
		var prezzoListinoCustomizedProduct = $scope.prezzoListinoCustomizedProduct;
		//insert all input data into array
		var allCategory = [prodottiHardware, licenze, local, canoni];
		var customizedProductData = [categoriaCustomizedProduct, codiceCustomizedProduct, nomeCustomizedProduct, descrizioneCustomizedProduct, prezzoAcquistoCustomizedProduct, prezzoListinoCustomizedProduct]
		//check if codice already exist

		if ($scope.customizedProductForm.$valid) {
			if (!checkIfCodiceCustomizedProductAlreadyExist(categoriaCustomizedProduct, codiceCustomizedProduct, allCategory)) {

				//create the new customized product
				var customizedProduct = {
					Codice: customizedProductData[1],
					Descrizione: customizedProductData[3],
					Prezzo_acquisto: customizedProductData[4],
					Prezzo_listino: customizedProductData[5]
				}

				//push the new customized product into specified table
				switch (customizedProductData[0]) {
					case '0':
					customizedProduct.Nome = customizedProductData[2];
					$scope.prodottiHardware.push(customizedProduct);
					break;
					case '1':
					customizedProduct.Tipologia = customizedProductData[2];
					$scope.licenze.push(customizedProduct);
					break;
					case '2':
					customizedProduct.Tipologia = customizedProductData[2];
					$scope.local.push(customizedProduct);
					break;
					case '3':
					customizedProduct.Tipologia = customizedProductData[2];
					$scope.canoni.push(customizedProduct);
					break;
				}

				//hide the modal
				$('#modalCustomizeProduct').modal('hide');
				//clear the form
			}else {
				//messaggio di errore che il codice esiste già
				console.log("esiste");
				$("i[id='codiceProdottoIcon']").addClass('red-text');
			}

		}
	}

	/**
	 * [scope checkClientePartitaIva get every change input and controll if is valid]
	 * @return {[type]} [description]
	 */
	$scope.checkClientePartitaIva = function() {
		//get if inout is valid
		var partitaIVA = $scope.clienteForm.partitaIVACliente.$valid;
		//if is valid input get value colors else get error colors
		if (partitaIVA) {
			document.getElementById("partitaIVACliente").classList.remove('textfield_input_error');
			document.getElementById("partitaIVAClienteLabel").classList.remove('textfield_floatinglabel_error');
		}else {
			document.getElementById("partitaIVACliente").classList.add('textfield_input_error');
			document.getElementById("partitaIVAClienteLabel").classList.add('textfield_floatinglabel_error');
		}
	}

	/**
	 * [goToRiepilogo function that bring the user to riepilogo.html page with all selected data]
	 * @return {[type]} [description]
	 */
	$scope.goToRiepilogo = function() {
		var allSelectedData = {
			user,
			cliente,
	        distributoreSelected,
		    prodottiHardwareSelected,
			licenzeSelected,
			localSelected,
			canoniSelected,
            totalItemsSelected
		};
	    localStorage.clear();
		localStorage.setItem("allDataFromPreventivi", JSON.stringify(allSelectedData));
		location.href = 'riepilogo.html';
		console.log(allSelectedData.totalItemsSelected);
		console.log(JSON.stringify(allSelectedData.distributoreSelected));
	}

	/**
	 * [showLogoutModal function that show the logout modal]
	 * @return {[type]} [description]
	 */
	$scope.showLogoutModal = function() {
		$('#logoutModal').modal('show');
	}

	/**
	 * [goToIndex function that bring the user to index.html page]
	 * @return {[type]} [description]
	 */
	$scope.goToIndex = function() {
		location.href = 'index.html';
	}

});

/**
 * [clienteFormValidation controller that check if the inputs are valid]
 * @param  {[type]} $scope [description]
 * @return {[type]}        [description]
 */
app.controller('clienteFormValidation', function($scope) {

	//hide the table section if the form is not valid
	document.getElementById('tabelleProdotti').style.display = 'none';


	/**
	 * [checkIfFormIsValid function that check if the form with data client is valid, and show the products item]
	 * @param  {[Array]} formInputs [contain the validity of inputs form]
	 * @return {[type]}            [description]
	 */
	function checkIfFormIsValid(formInputs) {
		if ((formInputs["nomeCliente"] == false) && (formInputs["indirizzoCliente"] == false) && (formInputs["partitaIVACliente"] == false) && (formInputs["emailCliente"] == true)) {
	 		document.getElementById('tabelleProdotti').style.display = 'block'
		}else {
			document.getElementById('tabelleProdotti').style.display = 'none';
		}
	}

	var formInputs = [];

	/**
	 * [nomeClienteChange scope that control all user input into Nome true=notValid]
	 * @return {[type]} [description]
	 */
	$scope.nomeClienteChange = function() {
		$scope.nomeClienteNotValid = true;
		formInputs["nomeCliente"] = true;
		if ($scope.nomeCliente) {
			if($scope.nomeCliente.length > 2) {
				$scope.nomeClienteNotValid = false;
				formInputs["nomeCliente"] = false;
				cliente.nomeCliente = $scope.nomeCliente;
			}
		}
		checkIfFormIsValid(formInputs);
	}

	/**
	 * [nomeClienteChange scope that control all user input into indirizzo true=notValid]
	 * @return {[type]} [description]
	 */
	$scope.indirizzoClienteChange = function() {
		$scope.indirizzoClienteNotValid = true;
		formInputs["indirizzoCliente"] = true;
		if ($scope.indirizzoCliente) {
			if ($scope.indirizzoCliente.length > 6) {
				$scope.indirizzoClienteNotValid = false;
				formInputs["indirizzoCliente"] = false;
				cliente.indirizzoCliente = $scope.indirizzoCliente;
			}
		}
		checkIfFormIsValid(formInputs);
	}

	$scope.emailClienteChange = function() {
		formInputs["emailCliente"] = $scope.clienteForm.emailCliente.$valid;
		if (formInputs["emailCliente"]) {
			cliente.emailCliente = $scope.emailCliente;
		}
		checkIfFormIsValid(formInputs);
	}

	/**
	 * [nomeClienteChange scope that control all user input into partita iva true=notValid]
	 * @return {[type]} [description]
	 */
	$scope.partitaIvaClienteChange = function() {
		$scope.partitaIvaClienteNotValid = true;
		formInputs["partitaIVACliente"] = true;
		if ($scope.partitaIVACliente) {
			if (checkIfPartitaIvaClienteIsValid($scope.partitaIVACliente)) {
				$scope.partitaIvaClienteNotValid = false;
				formInputs["partitaIVACliente"] = false;
				cliente.partitaIVACliente = $scope.partitaIVACliente;
			}
		}
		checkIfFormIsValid(formInputs);
	}

	/**
	 * [nomeClienteChange scope that control all user input into codice fiscale true=notValid]
	 * @return {[type]} [description]
	 */
	cliente.codiceFiscaleCliente = 'non fornito';
	$scope.codiceFiscaleChange = function() {
		cliente.codiceFiscaleCliente = 'non fornito';
		$scope.codiceFiscaleClienteNotValid = true;
		if ($scope.codiceFiscaleCliente) {
			if (checkIfCodiceFiscaleClienteIsValid($scope.codiceFiscaleCliente)) {
				$scope.codiceFiscaleClienteNotValid = false;
				cliente.codiceFiscaleCliente = $scope.codiceFiscaleCliente;
			}
		}

		if ($scope.codiceFiscaleCliente === '') {
			$scope.codiceFiscaleClienteNotValid = false;
			cliente.codiceFiscaleCliente = 'non fornito';
		}
	}

});
