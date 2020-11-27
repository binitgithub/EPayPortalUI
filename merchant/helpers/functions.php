<?php 
class App{
    function is_admin(){
        if(isset($_SESSION["agentRole"])){
            if(($_SESSION["agentRole"] == "ADMIN") || ($_SESSION["agentRole"] == "SADMIN"))  
            {
                return true;
            }
            else{
                return false;
            }
        }
    }

    function agent_login_redirect(){    
        if(basename($_SERVER['PHP_SELF']) != "agentaccess.php"){
            if(!isset($_SESSION["agentId"])){
                header("location:agentaccess.php");
            }
        }
    }

    function is_agent_logged_in(){    
        if(isset($_SESSION["agentId"])){
            return true;
        }else{
            return false;
        }
    }

    function is_merchant(){
        if(isset($_SESSION["isMerchant"])){
            if($_SESSION["isMerchant"] == true)  
            {
                return true;
            }
            else{
                return false;
            }
        }
    }

    function is_loading_center(){
        if(isset($_SESSION["isLoadingCenterAdmin"]))
        {
            if($_SESSION["isLoadingCenterAdmin"] == true){
                return true;
            }else{
                return false;
            }
        }
    }

    function is_unloading_center(){
        if(isset($_SESSION["isUnloadingCenterAdmin"]))
        {
            if($_SESSION["isUnloadingCenterAdmin"] == true){
                return true;
            }else{
                return false;
            }
        }
    }
}
?>