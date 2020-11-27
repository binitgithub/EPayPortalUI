<?php 
require "../helpers/settings.php";
session_start();
unset($_SESSION['agentUid']);
unset($_SESSION['agentId']);
unset($_SESSION['agentName']);
unset($_SESSION['agentRole']);
header("location:".$baseUrl."merchant/agentaccess.php");
?>