<?php 
session_start();
try{
    $_SESSION["agentUid"] = $_POST["agentUid"];
    $_SESSION["agentId"] = $_POST["agentId"];
    $_SESSION["agentName"] = $_POST["agentName"];
    $_SESSION["agentRole"] = $_POST["agentRole"];
    
    header('Content-Type: application/json; charset=UTF-8');
    $result=array();
    $result['agentUid'] = $_SESSION["agentUid"];
    $result['agentId'] = $_SESSION["agentId"]; 
    $result['agentName'] = $_SESSION["agentName"]; 
    $result['agentRole'] = $_SESSION["agentRole"]; 
    print json_encode($result);
}catch(Exception $e){
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    $result=array();
    $result['messages'] = $e;
    //feel free to add other information like $result['errorcode']
    die(json_encode($result));
}
?>