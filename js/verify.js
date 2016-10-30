var resumeBox = document.getElementById("resumeBox");
var verifyButton = document.getElementById("verifyButton");
var homeButton = document.getElementById("homeButton");
var resumeLink = resumeBox.value;
var headerOne = document.getElementById("headerOne");
var headerTwo = document.getElementById("headerTwo");
var hash = window.location.hash;
hash = hash.substring(14);
var id = null;
var andIndex = hash.indexOf("&");
hash = hash.substring(0, andIndex);
var request = null;
function verify()
{
	headerOne.style.color = "white";
    verifyButton.style.display = "none";
    resumeBox.style.display = "none";
    headerOne.innerHTML = "Processing your request...";
    headerTwo.innerHTML = "";
    resumeLink = document.getElementById("resumeBox").value;
    if(validInput())
    {
	    request = new XMLHttpRequest();
	    try 
	    {
	    request.open("GET", "php/verify.php?access_token=" + hash, true);
	    request.onreadystatechange = function()
	    {
		if(request.readyState == XMLHttpRequest.DONE)
		{
			json_obj = JSON.parse(request.responseText);
			id = json_obj.data.id;		
			addOrUpdateResume();
		}
	    }
	    request.send();
	    }
	    catch(err)
	    {
	      handleError();
	    }
     }
     else
     {
        handleInputError();
     }
}

function addResume()
{
	request = new XMLHttpRequest();
 	try 
	{
	    request.open("POST", "php/addresume.php", true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    request.onreadystatechange = function()
	    {
		if(request.readyState == XMLHttpRequest.DONE)
		{
			headerOne.innerHTML = "Thank you for verifying your attendence!";
			headerTwo.innerHTML = "We can't wait to see you at HackNJIT 2016!";	
			homeButton.style.display = "inline";
		}
	    }
	    request.send("resume=" + resumeLink + "&id=" + id);
	 }
	 catch(err)
	 {
	      handleError();
	 }

}

function addOrUpdateResume()
{
	request = new XMLHttpRequest();
 	try 
	{
	    request.open("POST", "php/findresume.php", true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    request.onreadystatechange = function()
	    {
		if(request.readyState == XMLHttpRequest.DONE)
		{
			if(request.responseText == "1")
			{
				updateResume();
			}
			else
			{
				addResume();	
			}
		}
	    }
	    request.send("id=" + id);
	 }
	 catch(err)
	 {
	      handleError();
	 }
}

function updateResume()
{
	request = new XMLHttpRequest();
 	try 
	{
	    request.open("POST", "php/updateresume.php", true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    request.onreadystatechange = function()
	    {
		if(request.readyState == XMLHttpRequest.DONE)
		{
			headerOne.innerHTML = "Thank you for updating your resume!";
			headerTwo.innerHTML = "We can't wait to see you at HackNJIT 2016!";
			homeButton.style.display = "inline";	
		}
	    }
	    request.send("id=" + id + "&resume=" + resumeLink);
	 }
	 catch(err)
	 {
	      handleError();
	 }
}

function handleError()
{
	resumeBox.style.display = "inline-block";
	headerOne.style.color = "red";
	headerOne.innerHTML = "There was an error processing your request. Please try again.";	
	verifyButton.style.display = "inline";
}

function handleInputError()
{
	resumeBox.style.display = "inline-block";
	headerOne.style.color = "red";
	headerOne.innerHTML = "Please provide a valid link to your resume in the box below.";
	verifyButton.style.display = "inline";
}

function validInput()
{
	if(resumeLink == "")
		return false;
	var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	var regex = new RegExp(urlregex);
	return resumeLink.match(regex);
}
