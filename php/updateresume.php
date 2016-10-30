<?php
	$id = htmlspecialchars($_POST["id"]);
	$resume = htmlspecialchars($_POST["resume"]);
	$conn = new mysqli("njit.hosting.acm.org","njithostingacm","WhereIsGehani?","njithost_hacknjit_website");
	if($conn->connect_error)
	{
		die("Error connecting to the database! ".$conn->connect_error);
	}
	$stmt = $conn->prepare("update Resumes set Resume=? where ID=?");
	$stmt->bind_param("ss", $resume, $id);
	$results = $stmt->execute();
	echo $results;
	$stmt->close();
	$conn->close();	
?>
