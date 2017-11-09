<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$query = $request->query;

if ($query) {
	echo executeQuery($query);
}


	function executeQuery($query) {
		$mysqli = new mysqli("localhost", "root", null, "preventivi_aziendali");
		if ($mysqli->connect_errno) {
			printf("Connect failed: %s\n", $mysqli->connect_error);
			exit();
		}
		$result = $mysqli->query($query);
		$arr = array();
		if($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$arr[] = $row;
			}
		}
		# JSON-encode the response
		$json_response = json_encode($arr);
		// # Return the response
		return $json_response;
	}
?>
