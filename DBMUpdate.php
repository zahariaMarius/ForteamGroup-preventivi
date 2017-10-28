<?php
# @Author: Zaharia Laurentiu Jr Marius
# @Date:   2017-10-27T18:06:47+02:00
# @Email:  laurentiu.zaharia@edu.itspiemonte.it
# @Project: kebabCase
# @Filename: DBMUpdate.php
# @Last modified by:   Zaharia Laurentiu Jr Marius
# @Last modified time: 2017-10-28T17:44:08+02:00



$postdata = file_get_contents("php://input");
//$request = json_decode($postdata);

$data = json_decode($postdata, true);

print_r($data);

//print_r($data->azienda);

// foreach ($data["accessori"] as $key => $value) {
// 	print_r($data["accessori"][$key]);
// 	foreach ($data["accessori"][$key] as $key2 => $value) {
// 		print_r($data["accessori"][$key][$key2]);
// 	}
// }

foreach ($data['azienda'][0] as $key => $value) {
	print_r($data['azienda'][0][$key]);
	print_r($i);
	$i++;
}
//print_r($data['azienda'][0]);

	function executeQuery($data) {
		$mysqli = new mysqli("localhost", "root", null, "preventivi_aziendali");
		if ($mysqli->connect_errno) {
			printf("Connect failed: %s\n", $mysqli->connect_error);
			exit();
		}

		foreach ($data['azienda'][0] as $key => $value) {
			print_r($data['azienda'][0][$key]);

			$query = "INSERT INTO aziende()";
		}

	}
?>
