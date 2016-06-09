<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');  
include("functions.php");

if(isset($_POST['newRoomName']) && isset($_POST['tv']) && isset($_POST['beds']) && isset($_POST['kvadratura'])){
	
$newRoomName = $_POST['newRoomName'];
$tv = intval($_POST['tv']);
$beds = intval($_POST['beds']);
$kvadratura = intval($_POST['kvadratura']);

addRoom($newRoomName,$tv,$beds,$kvadratura);
}
?>