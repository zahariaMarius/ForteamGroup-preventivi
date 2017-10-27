<?php
# @Author: Zaharia Laurentiu Jr Marius
# @Date:   2017-10-27T18:06:47+02:00
# @Email:  laurentiu.zaharia@edu.itspiemonte.it
# @Project: kebabCase
# @Filename: DBMUpdate.php
# @Last modified by:   Zaharia Laurentiu Jr Marius
# @Last modified time: 2017-10-27T19:14:32+02:00

$postdata = file_get_contents("php://input");
$data = json_decode($postdata, true);

//echo executeQuery($data);

var_dump($data);


	function executeQuery($data) {
		$mysqli = new mysqli("localhost", "root", null, "preventivi_aziendali");
		if ($mysqli->connect_errno) {
			printf("Connect failed: %s\n", $mysqli->connect_error);
			exit();
		}

		foreach ($data as $row) {
			$query = "INSERT INTO aziende(Codice, Nome, Indirizzo, Partita_iva, Ricavo, Codice_fiscale)
				      VALUES ('00258', '".$row[""]."')";
		}



	}
?>
