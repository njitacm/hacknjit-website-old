<?php
	$resumeLink = htmlspecialchars($_POST["resume"]);
	$id = htmlspecialchars($_POST["id"]);
	$conn = new mysqli("njit.hosting.acm.org","njithostingacm","WhereIsGehani?","njithost_hacknjit_website");
	if($conn->connect_error)
	{
		die("Error connecting to the database! ".$conn->connect_error);
	}
	$stmt = $conn->prepare("insert into Resumes values (?,?)");
	$stmt->bind_param("ss", $id, $resumeLink);
	$results = $stmt->execute();
	echo $results;
	$stmt->close();
	$conn->close();	
?>
