<?php
header('Access-Control-Allow-Methods: GET'); 
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');
if($_SERVER['REQUEST_METHOD'] == "OPTIONS"){
	exit();	
} 
include("functions.php");


echo getRooms();


?>