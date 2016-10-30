<?php 
	$token = htmlspecialchars($_GET["access_token"]);
	echo file_get_contents("https://my.mlh.io/api/v2/user.json?access_token=".$token);
?>
