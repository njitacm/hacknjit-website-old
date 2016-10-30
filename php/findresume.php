<?php
	$id = htmlspecialchars($_POST["id"]);
	$conn = new mysqli("njit.hosting.acm.org","njithostingacm","WhereIsGehani?","njithost_hacknjit_website");
	if($conn->connect_error)
	{
		die("Error connecting to the database! ".$conn->connect_error);
	}
	$stmt = $conn->prepare("select Resume from Resumes where ID=?");
	$stmt->bind_param("s", $id);
	$stmt->execute();
	$stmt->store_result();
	echo $stmt->num_rows;
	$stmt->close();
	$conn->close();	
?>
