function signup()
{
	var emailBox = document.getElementById("email");
	var emailButton = document.getElementById("signupbutton");
	var emailForm = document.getElementById("signupform");
	var info = document.getElementById("infotext");
	var email = emailBox.value;
	if(emailForm.checkValidity() && email != "")
	{
		var request = new XMLHttpRequest();
		request.open("get","/php/emailprocess.php?email=" + email,true);
		request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200)
			{
				if(request.responseText == "Success")
				{
					emailBox.value="";
					info.innerHTML = "Thank you for signing up for our newsletter! You will hear from us soon.";
					info.style.color = "green";
					info.style.display = "block";
				}
				else
				{
					info.innerHTML = "There was an error processing the request!";
					info.style.color = "red";
					info.style.display = "block";
				}
			}
			else if(request.readyState == 4)
			{
				info.innerHTML = "There was an error processing the request!";
				info.style.color = "red";
				info.style.display = "block";
			}
		}
		request.send();	
	}
	else
	{
		alert("Please enter a valid email address!");
		info.style.display = "none";
	}
}
