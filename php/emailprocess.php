<?php 
$email = $_GET['email'];
$conn = new mysqli("njit.hosting.acm.org", "njithostingacm","Changethedoorcode!","njithost_hacknjit_website");

if ($conn->connect_error)
{
   echo $conn->connect_error;
}
else
{ 
	$result = $conn->query("insert into Emails values ('".$email."')");
	if($result == TRUE)
	{
		echo "Success";
	}
	else
	{
		echo $conn->error;
	}
}

$conn->close();
?>
