var app = angular.module('myApp', []);
//varibile contenente tutti i dati provenienti dalla pagina preventivo in formato {obj assoc}
var allDataFromPreventivi = JSON.parse(localStorage.getItem("allDataFromPreventivi"));
console.log(allDataFromPreventivi);
// suddivisione di tutti i dati nelle varie sezioni
var azienda = [allDataFromPreventivi["azienda"]];
var distributore = allDataFromPreventivi["distributore"];
var accessori = allDataFromPreventivi["accessori"];
var software = allDataFromPreventivi["software"];
var licenze = allDataFromPreventivi["licenze"];
var servizi = allDataFromPreventivi["servizi"];
var totale = {
	Ricavo_accessori:0,
	Guadagno_accessori:0,
	Guadagno_accessori_percentuale:0,
	Ricavo_software:0,
	Guadagno_software:0,
	Guadagno_software_percentuale:0,
	Ricavo_licenze:0,
	Guadagno_licenze:0,
	Guadagno_licenze_percentuale:0,
	Ricavo_servizi:0,
	Guadagno_servizi:0,
	Guadagno_servizi_percentuale:0,
	Ricavo_totale : 0,
	Percentuale_iva: 0,
	Ricavo_totale_iva:0,
	Guadagno_totale : 0,
	Guadagno_totale_percentuale:0
}

//actionlistener sul link per andare all'anteprima
var link = document.getElementById("linkToAnteprima");

if (link) {
	link.addEventListener("click", goToAnteprima, false);
}

function goToAnteprima() {
	var allDataFromRiepilogo = {azienda, distributore, accessori, software, licenze, servizi, totale};
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

	if (allDataFromPreventivi["azienda"]) {
		$scope.azienda = azienda;
	}

	console.log(allDataFromPreventivi["distributore"][0]);

	if (allDataFromPreventivi["distributore"]) {
		var checkIfDistributoreExist = Object.keys(distributore).length;
		if ((checkIfDistributoreExist != 0) && (allDataFromPreventivi["distributore"][0].Codice != "null")) {
			document.getElementById('cardDistributore').style.display = 'block';
			document.getElementById('cardDistributoreCliente').style.display = 'block';
			$scope.distributore = allDataFromPreventivi["distributore"];
			$scope.Ricavo_distributore = distributore[0].Ricavo_scontato;
			$scope.Guadagno_distributore = distributore[0].Guadagno;
			$scope.Guadagno_distributore_percentuale = distributore[0].Guadagno_percentuale;

		}
	}

	if (allDataFromPreventivi["accessori"]) {
		var checkIfAccessoriExist = Object.keys(accessori).length;
		if (checkIfAccessoriExist != 0) {
			document.getElementById('cardAccessori').style.display = 'block';
			document.getElementById('cardAccessoriCliente').style.display = 'block';
			$scope.accessori = allDataFromPreventivi["accessori"];
			for (var index in accessori) {
				if (accessori.hasOwnProperty(index)) {
					totale.Ricavo_accessori += accessori[index].Totale;
					totale.Guadagno_accessori += accessori[index].Guadagno;
				}
			}
			totale.Guadagno_accessori_percentuale = totale.Guadagno_accessori *100 / totale.Ricavo_accessori
			$scope.Ricavo_accessori = totale.Ricavo_accessori;
			$scope.Guadagno_accessori = totale.Guadagno_accessori;
			$scope.Guadagno_accessori_percentuale = totale.Guadagno_accessori_percentuale;
		}
	}

	if (allDataFromPreventivi["software"]) {
		var checkIfSoftwareExist = Object.keys(software).length;
		if (checkIfSoftwareExist != 0) {
			document.getElementById('cardSoftware').style.display = 'block';
			document.getElementById('cardSoftwareCliente').style.display = 'block';
			$scope.software = allDataFromPreventivi["software"];
			for (var index in software) {
				if (software.hasOwnProperty(index)) {
					totale.Ricavo_software += software[index].Totale;
					totale.Guadagno_software += software[index].Guadagno;
				}
			}
			totale.Guadagno_software_percentuale = totale.Guadagno_software *100 / totale.Ricavo_software;
			$scope.Ricavo_software = totale.Ricavo_software;
			$scope.Guadagno_software = totale.Guadagno_software;
			$scope.Guadagno_software_percentuale = totale.Guadagno_software_percentuale;
		}
	}

	if (allDataFromPreventivi["licenze"]) {
		var checkIfLicenzeExist = Object.keys(licenze).length;
		if (checkIfLicenzeExist != 0) {
			document.getElementById('cardLicenze').style.display = 'block';
			document.getElementById('cardLicenzeCliente').style.display = 'block';
			$scope.licenze = allDataFromPreventivi["licenze"];
			for (var index in licenze) {
				if (licenze.hasOwnProperty(index)) {
					totale.Ricavo_licenze += licenze[index].Totale;
					totale.Guadagno_licenze += licenze[index].Guadagno;
				}
			}
			totale.Guadagno_licenze_percentuale = totale.Guadagno_licenze *100 / totale.Ricavo_licenze;
			$scope.Ricavo_licenze = totale.Ricavo_licenze;
			$scope.Guadagno_licenze = totale.Guadagno_licenze;
			$scope.Guadagno_licenze_percentuale = totale.Guadagno_licenze_percentuale;
		}
	}

	if (allDataFromPreventivi["servizi"]) {
		var checkIfServiziExist = Object.keys(servizi).length;
		if (checkIfLicenzeExist != 0) {
			document.getElementById('cardServizi').style.display = 'block';
			document.getElementById('cardServiziCliente').style.display = 'none';
			$scope.servizi = allDataFromPreventivi["servizi"];
			for (var index in servizi) {
				if (servizi.hasOwnProperty(index)) {
					totale.Ricavo_servizi += servizi[index].Totale;
					totale.Guadagno_servizi += servizi[index].Guadagno;
				}
			}
			totale.Guadagno_servizi_percentuale = totale.Guadagno_servizi *100 / totale.Ricavo_servizi;
			$scope.Ricavo_servizi = totale.Ricavo_servizi;
			$scope.Guadagno_servizi = totale.Guadagno_servizi;
			$scope.Guadagno_servizi_percentuale = totale.Guadagno_servizi_percentuale;
		}
	}

     totale.Ricavo_totale = parseFloat(distributore[0].Ricavo_scontato) + totale.Ricavo_accessori + totale.Ricavo_software + totale.Ricavo_licenze + totale.Ricavo_servizi;
	 totale.Guadagno_totale = distributore[0].Guadagno + totale.Guadagno_accessori + totale.Guadagno_software + totale.Guadagno_licenze + totale.Guadagno_servizi;
	 totale.Guadagno_totale_percentuale = totale.Guadagno_totale *100 / totale.Ricavo_totale;
	 $scope.Ricavo_totale = totale.Ricavo_totale;
	 $scope.Guadagno_totale = totale.Guadagno_totale;
	 $scope.Guadagno_totale_percentuale = totale.Guadagno_totale_percentuale;
	 $scope.Percentuale_iva = totale.Percentuale_iva;
	 $scope.Ricavo_totale_iva = totale.Ricavo_totale;
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
		sezione[index].Ricavo_scontato = (sezione[index].Prezzo_listino - scontoAccessori) * sezione[index].Quantita;
		sezione[index].Guadagno = sezione[index].Ricavo_scontato - sezione[index].Prezzo_acquisto * sezione[index].Quantita;
		sezione[index].Guadagno_percentuale = sezione[index].Guadagno  * 100 / sezione[index].Ricavo_scontato;
		return sezione;
	}


	/**
	 * [evento change dello scontodistributore]
	 * @param  {[object]} row    [the data of the row]
	 * @param  {[int]} sconto [sconto]
	 * @param  {[int]} index  [index of row]
	 */
    $scope.changeScontoDistributore = function(sconto, index) {
		distributore[index]["Sconto"] = sconto;
		distributore[index].Ricavo_scontato = distributore[index].Prezzo_listino - (sconto * distributore[index].Prezzo_listino / 100);
		distributore[index].Guadagno = distributore[index].Ricavo_scontato - distributore[index].Prezzo_acquisto;
		distributore[index].Guadagno_percentuale = distributore[index].Guadagno * 100 / distributore[index].Ricavo_scontato;
		$scope.distributore = distributore;
		$scope.Ricavo_distributore = distributore[0].Ricavo_scontato;
		$scope.Guadagno_distributore = distributore[0].Guadagno;
		$scope.Guadagno_distributore_percentuale = distributore[0].Guadagno_percentuale;
		totale.Ricavo_totale = parseFloat(distributore[0].Ricavo_scontato) + totale.Ricavo_accessori + totale.Ricavo_software + totale.Ricavo_licenze + totale.Ricavo_servizi;
		totale.Guadagno_totale = distributore[0].Guadagno + totale.Guadagno_accessori + totale.Guadagno_software + totale.Guadagno_licenze + totale.Guadagno_servizi;
		totale.Guadagno_totale_percentuale = totale.Guadagno_totale *100 / totale.Ricavo_totale;
		$scope.Ricavo_totale = totale.Ricavo_totale;
		$scope.Guadagno_totale = totale.Guadagno_totale;
		$scope.Guadagno_totale_percentuale = totale.Guadagno_totale_percentuale;
		$scope.Sconto_distributore = sconto;
		var percentualeIva = (totale.Ricavo_totale * totale.Percentuale_iva) / 100;
	    totale.Ricavo_totale_iva = totale.Ricavo_totale + percentualeIva;
		$scope.Percentuale_iva = totale.Percentuale_iva;
		$scope.Ricavo_totale_iva = totale.Ricavo_totale_iva;
	}
	/**
	 * [evento change dello scontoaccessori]
	 * @param  {[int]} sconto [sconto]
	 * @param  {[int]} index  [index of row]
	 */
	$scope.changeScontoAccessori = function(sconto, codice) {
		$scope.accessori = calcoloScontoRicavoGuadagno(sconto, codice, accessori);
		totale.Guadagno_accessori = 0;
		totale.Ricavo_accessori = 0;
		for (var index in accessori) {
		   if (accessori.hasOwnProperty(index)) {
			   totale.Ricavo_accessori += accessori[index].Ricavo_scontato;
			   totale.Guadagno_accessori += accessori[index].Guadagno;
		   }
		}
		totale.Guadagno_accessori_percentuale = totale.Guadagno_accessori *100 / totale.Ricavo_accessori
		$scope.Ricavo_accessori = totale.Ricavo_accessori;
		$scope.Guadagno_accessori = totale.Guadagno_accessori;
		$scope.Guadagno_accessori_percentuale = totale.Guadagno_accessori_percentuale;
		totale.Ricavo_totale = parseFloat(distributore[0].Ricavo_scontato) + totale.Ricavo_accessori + totale.Ricavo_software + totale.Ricavo_licenze + totale.Ricavo_servizi;
		totale.Guadagno_totale = distributore[0].Guadagno + totale.Guadagno_accessori + totale.Guadagno_software + totale.Guadagno_licenze + totale.Guadagno_servizi;
		totale.Guadagno_totale_percentuale = totale.Guadagno_totale *100 / totale.Ricavo_totale;
		$scope.Ricavo_totale = totale.Ricavo_totale;
		$scope.Guadagno_totale = totale.Guadagno_totale;
		$scope.Guadagno_totale_percentuale = totale.Guadagno_totale_percentuale;
		var percentualeIva = (totale.Ricavo_totale * totale.Percentuale_iva) / 100;
	    totale.Ricavo_totale_iva = totale.Ricavo_totale + percentualeIva;
		$scope.Percentuale_iva = totale.Percentuale_iva;
		$scope.Ricavo_totale_iva = totale.Ricavo_totale_iva;
    }

	/**
	 * [evento change dello scontosoftware]
	 * @param  {[int]} sconto [sconto]
	 * @param  {[int]} index  [index of row]
	 */
	$scope.changeScontoSoftware = function(sconto, codice) {
		$scope.software = calcoloScontoRicavoGuadagno(sconto, codice, software);
		totale.Guadagno_software = 0;
		totale.Ricavo_software = 0;
		for (var index in software) {
		   if (software.hasOwnProperty(index)) {
			   totale.Ricavo_software += software[index].Ricavo_scontato;
			   totale.Guadagno_software += software[index].Guadagno;
		   }
		}
		totale.Guadagno_software_percentuale = totale.Guadagno_software *100 / totale.Ricavo_software;
		$scope.Ricavo_software = totale.Ricavo_software;
		$scope.Guadagno_software = totale.Guadagno_software;
		$scope.Guadagno_software_percentuale = totale.Guadagno_software_percentuale;
		totale.Ricavo_totale = parseFloat(distributore[0].Ricavo_scontato) + totale.Ricavo_accessori + totale.Ricavo_software + totale.Ricavo_licenze + totale.Ricavo_servizi;
		totale.Guadagno_totale = distributore[0].Guadagno + totale.Guadagno_accessori + totale.Guadagno_software + totale.Guadagno_licenze + totale.Guadagno_servizi;
		totale.Guadagno_totale_percentuale = totale.Guadagno_totale *100 / totale.Ricavo_totale;
		$scope.Ricavo_totale = totale.Ricavo_totale;
		$scope.Guadagno_totale = totale.Guadagno_totale;
		$scope.Guadagno_totale_percentuale = totale.Guadagno_totale_percentuale;
		var percentualeIva = (totale.Ricavo_totale * totale.Percentuale_iva) / 100;
	    totale.Ricavo_totale_iva = totale.Ricavo_totale + percentualeIva;
		$scope.Percentuale_iva = totale.Percentuale_iva;
		$scope.Ricavo_totale_iva = totale.Ricavo_totale_iva;
	}
	/**
	 * [evento change dello scontolicenze]
	 * @param  {[int]} sconto [sconto]
	 * @param  {[int]} index  [index of row]
	 */
	$scope.changeScontoLicenze = function(sconto, codice) {
		$scope.licenze = calcoloScontoRicavoGuadagno(sconto, codice, licenze);
		totale.Guadagno_licenze = 0;
		totale.Ricavo_licenze = 0;
		for (var index in licenze) {
		   if (licenze.hasOwnProperty(index)) {
			   totale.Ricavo_licenze += licenze[index].Ricavo_scontato;
			   totale.Guadagno_licenze += licenze[index].Guadagno;
		   }
		}
		totale.Guadagno_licenze_percentuale = totale.Guadagno_licenze *100 / totale.Ricavo_licenze;
		$scope.Ricavo_licenze = totale.Ricavo_licenze;
		$scope.Guadagno_licenze = totale.Guadagno_licenze;
		$scope.Guadagno_licenze_percentuale = totale.Guadagno_licenze_percentuale;
		totale.Ricavo_totale = parseFloat(distributore[0].Ricavo_scontato) + totale.Ricavo_accessori + totale.Ricavo_software + totale.Ricavo_licenze + totale.Ricavo_servizi;
		totale.Guadagno_totale = distributore[0].Guadagno + totale.Guadagno_accessori + totale.Guadagno_software + totale.Guadagno_licenze + totale.Guadagno_servizi;
		totale.Guadagno_totale_percentuale = totale.Guadagno_totale *100 / totale.Ricavo_totale;
		$scope.Ricavo_totale = totale.Ricavo_totale;
		$scope.Guadagno_totale = totale.Guadagno_totale;
		$scope.Guadagno_totale_percentuale = totale.Guadagno_totale_percentuale;
		var percentualeIva = (totale.Ricavo_totale * totale.Percentuale_iva) / 100;
	    totale.Ricavo_totale_iva = totale.Ricavo_totale + percentualeIva;
		$scope.Percentuale_iva = totale.Percentuale_iva;
		$scope.Ricavo_totale_iva = totale.Ricavo_totale_iva;
	}
	/**
	 * [evento change dello scontolicenze]
	 * @param  {[int]} sconto [sconto]
	 * @param  {[int]} index  [index of row]
	 */
	$scope.changeScontoServizi = function(sconto, codice) {
		$scope.servizi = calcoloScontoRicavoGuadagno(sconto, codice, servizi);
		totale.Guadagno_servizi = 0;
		totale.Ricavo_servizi = 0;
		for (var index in servizi) {
		   if (servizi.hasOwnProperty(index)) {
			   totale.Ricavo_servizi += servizi[index].Ricavo_scontato;
			   totale.Guadagno_servizi += servizi[index].Guadagno;
		   }
		}
		totale.Guadagno_servizi_percentuale = totale.Guadagno_servizi *100 / totale.Ricavo_servizi;
		$scope.Ricavo_servizi = totale.Ricavo_servizi;
		$scope.Guadagno_servizi = totale.Guadagno_servizi;
		$scope.Guadagno_servizi_percentuale = totale.Guadagno_servizi_percentuale;
		totale.Ricavo_totale = parseFloat(distributore[0].Ricavo_scontato) + totale.Ricavo_accessori + totale.Ricavo_software + totale.Ricavo_licenze + totale.Ricavo_servizi;
		totale.Guadagno_totale = distributore[0].Guadagno + totale.Guadagno_accessori + totale.Guadagno_software + totale.Guadagno_licenze + totale.Guadagno_servizi;
		totale.Guadagno_totale_percentuale = totale.Guadagno_totale *100 / totale.Ricavo_totale;
		$scope.Ricavo_totale = totale.Ricavo_totale;
		$scope.Guadagno_totale = totale.Guadagno_totale;
		$scope.Guadagno_totale_percentuale = totale.Guadagno_totale_percentuale;
		var percentualeIva = (totale.Ricavo_totale * totale.Percentuale_iva) / 100;
	    totale.Ricavo_totale_iva = totale.Ricavo_totale + percentualeIva;
		$scope.Percentuale_iva = totale.Percentuale_iva;
		$scope.Ricavo_totale_iva = totale.Ricavo_totale_iva;
	}

	$scope.changeInputIVA = function(iva) {
		totale.Percentuale_iva = iva;
		var percentualeIva = (totale.Ricavo_totale * totale.Percentuale_iva) / 100;
	    totale.Ricavo_totale_iva = totale.Ricavo_totale + percentualeIva;
		$scope.Percentuale_iva = totale.Percentuale_iva;
		$scope.Ricavo_totale_iva = totale.Ricavo_totale_iva;
	}
});
