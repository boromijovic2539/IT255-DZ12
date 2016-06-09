<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');  
include("functions.php");

if(isset($_POST['email']) && isset($_POST['password'])){
	
$email = $_POST['email'];
$password = $_POST['password'];
echo login($email,$password);

}
?>