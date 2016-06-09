<?php
include("config.php");


function getRooms(){
global $conn;
$rarray = array();

$result = mysqli_query($conn, "SELECT * FROM rooms");
$num_rows = mysqli_num_rows($result);
$rooms = array();
if($num_rows > 0)
{
while($row = mysqli_fetch_assoc($result)) {
$one_room = array();
$one_room['id'] = $row['id'];
$one_room['roomname'] = $row['roomname'];
$one_room['tv'] = $row['tv'];
$one_room['beds'] = $row['beds'];
$one_room['kvadratura'] = $row['kvadratura'];
array_push($rooms,$one_room);
}
}
$rarray['rooms'] = $rooms;
return json_encode($rarray);
} 

function addRoom($newRoomName, $tv, $beds, $kvadratura){
	global $conn;
	$rarray = array();
	$stmt = $conn->prepare("INSERT INTO rooms (roomname, tv, beds, kvadratura) VALUES (?, ?, ?, ?)");
	$stmt->bind_param("ssss", $newRoomName, $tv, $beds, $kvadratura);
	if($stmt->execute()){
		$rarray['sucess'] = "ok";
	}else{
		$rarray['error'] = "Database connection error";
	}
	return json_encode($rarray);
}

function login($email, $password){
	global $conn;
	$rarray = array();
	if(checkLogin($email,$password)){
		$id = sha1(uniqid());
		$result2 = mysqli_query($conn,"UPDATE korisnik SET token='$id' WHERE email='$email'");
		$rarray['token'] = $id;
	} else{
		$rarray['error'] = "Invalid email/password";
	}
	return json_encode($rarray);
}
function checkLogin($email, $password){
	global $conn;
	$email = mysqli_real_escape_string($conn,$email);
	$password = md5(mysqli_real_escape_string($conn,$password));
	$result = mysqli_query($conn, "SELECT * FROM korisnik WHERE email='$email' AND password='$password'");
	$num_rows = mysqli_num_rows($result);
	if($num_rows > 0)
	{
		return true;
	}
	else{	
		return false;
	}
}

function register($email, $password, $firstname, $lastname){
	global $conn;
	$rarray = array();
	$errors = "";
	if(checkIfUserExists($email)){
		$errors .= "Email already exists\r\n";
	}
	if(strlen($email) < 5){
		$errors .= "Email must have at least 5 characters\r\n";
	}
	if(strlen($password) < 5){
		$errors .= "Password must have at least 5 characters\r\n";
	}
	if(strlen($firstname) < 3){
		$errors .= "First name must have at least 3 characters\r\n";
	}
	if(strlen($password) < 3){
		$errors .= "Last name must have at least 3 characters\r\n";
	}
	if($errors == ""){
		$stmt = $conn->prepare("INSERT INTO korisnik (ime, prezime, email, password) VALUES (?, ?, ?, ?)");
		$stmt->bind_param("ssss", $firstname, $lastname, $email, md5($password));
		if($stmt->execute()){
			$id = sha1(uniqid());
			$result2 = mysqli_query($conn,"UPDATE korisnik SET token='$id' WHERE email='$email'");
			$rarray['token'] = $id;
		}else{
			$rarray['error'] = "Database connection error";
		}
	} else{
		$rarray['error'] = json_encode($errors);
	}
	
	return json_encode($rarray);
}
function checkIfUserExists($email){
	global $conn;
	$result = mysqli_query($conn, "SELECT * FROM korisnik WHERE email='$email'");
	$num_rows = mysqli_num_rows($result);
	if($num_rows > 0)
	{
		return true;
	}
	else{	
		return false;
	}
}


?>