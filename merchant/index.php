<?php

session_start();
include "helpers/settings.php";


if(!isset($_SESSION["token"])){
    header("location:".$baseUrl);
}

/* foreach($_SESSION["roles"] as $role){
    if(match_wildcard("*Admin",$role) && $role != "MerchantAdmin" || $role != "COBAdmin"){
        $ch = curl_init($apiBaseUrl.'api/Billers?adminRole=' . $role);                                                                      
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");                                                                   
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
		curl_setopt($ch, CURLOPT_CAINFO, getcwd() . $certPath);	
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
			'Authorization: Bearer ' . $_SESSION["token"])
		);	
		
        $billerResult = curl_exec($ch);
        $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if(strlen($billerResult) > 0 && $status_code == "200")
        {
            $biller = json_decode($billerResult);
            var_dump($biller);
            if($biller->BillerID != NULL){
                $_SESSION["billerId"] = $biller->BillerID;
                $_SESSION["billerName"] = $biller->Name;
                $_SESSION["billerDisplayName"] = $biller->DisplayName;
                
                $ch = curl_init($apiBaseUrl.'api/Agents?BillerID=' . $biller->BillerID);                                                                      
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");                                                                   
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
                curl_setopt($ch, CURLOPT_CAINFO, getcwd() . $certPath);	
                curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
                    'Authorization: Bearer ' . $_SESSION["token"])
                );	
                
                $agentsResult = curl_exec($ch);
                $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                curl_close($ch);

                if(strlen($agentsResult) > 1 && $status_code == "200")
                {
                    //$_SESSION["agents"] = json_decode($agentsResult);
                    header("location:agentaccess.php");
                }
                else{
                    header("location:agentaccess.php");
                }
            }
        }
    }
} */


        $ch = curl_init($apiBaseUrl.'Business/'.$_SESSION["BusinessId"]);                                                                      
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");                                                                   
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
		curl_setopt($ch, CURLOPT_CAINFO, getcwd() . $certPath);	
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
			'Authorization: Bearer ' . $_SESSION["token"])
		);	
		
        $businessResult = curl_exec($ch);
        $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if(strlen($businessResult) > 0 && $status_code == "200")
        {
            $business = json_decode($businessResult);
            //var_dump($business);
            $business = $business->data;
            if($business->BusinessId != NULL){
                $_SESSION["businessId"] = $business->BusinessId;
                $_SESSION["businessName"] = $business->DisplayName;
                $_SESSION["businessDisplayName"] = $business->AbbreviatedName;

                //var_dump($_SESSION);
                
                $ch = curl_init($apiBaseUrl.'BusinessAgent/Agents?BusinessId=' . $business->BusinessId);                                                                      
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");                                                                   
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
                curl_setopt($ch, CURLOPT_CAINFO, getcwd() . $certPath);	
                curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
                    'Authorization: Bearer ' . $_SESSION["token"])
                );	
                
                $agentsResult = curl_exec($ch);
                $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                curl_close($ch);

                if(strlen($agentsResult) > 1 && $status_code == "200")
                {
                    //var_dump($agentsResult);
                    //$_SESSION["agents"] = json_decode($agentsResult);

                    header("location:agentaccess.php");
                }
                else{
                    header("location:agentaccess.php");
                }
            }
        }

function match_wildcard( $wildcard_pattern, $haystack ) {
    $regex = str_replace(
      array("\*", "\?"), // wildcard chars
      array('.*','.'),   // regexp chars
      preg_quote($wildcard_pattern)
    );
 
    return preg_match('/^'.$regex.'$/is', $haystack);
 }

?>