<?php 
    session_start(); 
    include "helpers/settings.php";
    include "helpers/functions.php";

    $app = new App();//Instance of MerchantApp Class

    if(!isset($_SESSION["token"])){
        header("location:".$baseUrl."merchant/helpers/logout.php");
    }
    
    if(!($app->is_admin())){//check if user can access page
        $curr_page = basename($_SERVER['PHP_SELF']);
        if(in_array($curr_page, $admin_pages)){
            header("location:createpayment.php");
        }
    }


    $app->agent_login_redirect();//check if agent logged in
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>  
    <?php
        $default_header = "E-Pay Merchant Services";
        if (isset($title)) {
            echo "E-Pay Merchant Services - ".$title;
        } 
        else {
            echo $default_header;
        }
    ?>
    </title>

    <meta charset="utf-8">
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'/>
    <link rel="manifest" href="/manifest.json" />
    <!-- CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css">
    <link rel="stylesheet" href="assets/css/bootstrap.min.custom.css">
    <link rel="stylesheet" href="assets/css/custom.css">
    <link rel="stylesheet" href="assets/css/bsadmin.css">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.11.0/build/css/alertify.min.css" />
    <link rel="stylesheet" href="assets/css/alertify.min.custom.css" />
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.18/datatables.min.css"/>


    <!-- JavaScript -->
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.11.0/build/alertify.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://unpkg.com/popper.js/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.18/datatables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.4/dist/loadingoverlay.min.js"></script>
    <script src="assets/js/config.js"></script>
    <script src="assets/js/lib/bsadmin.js"></script>

    <script>
        var token = "<?php echo $_SESSION["token"]; ?>";
        var businessId = "<?php echo $_SESSION["businessId"]; ?>";
        var apiBaseUrl = "<?php echo $apiBaseUrl; ?>";

        var refreshSn = function ()
        {
            var time = 600000; // 10 mins
                setTimeout(
                    function ()
                    {
                    $.ajax({
                    url: 'helpers/refreshsession.php',
                    cache: false,
                    complete: function () {refreshSn();}
                    });
                },
                time
            );
        };

        refreshSn();
        
    </script>

    <?php if(isset($_SESSION["agentRole"]) && isset($_SESSION["agentUid"])){ ?>
        <script>
            var agentRole = "<?php echo $_SESSION["agentRole"]; ?>";
            var businessAgentId = "<?php echo $_SESSION["agentUid"]; ?>";
        </script>
    <?php } ?>

</head>

<body>
    <nav class="navbar navbar-light fixed-top bg-white">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <button class="navbar-toggler">
                    <?php if($app->is_agent_logged_in()){ ?>
                        <span  id="toggle-menu" class="navbar-toggler-icon mr-2"></span>
                    <?php } ?>
                    <img src="assets/images/logo-epay.png" class="ml-2 mr-2" height="24" alt="e-pay logo">
                    <span class="d-none d-md-inline-block d-lg-inline-block navbar-text text-secondary text-uppercase small">
                        E-Pay Agent Center
                    </span>
                    
                </button> 
            </a>

            <?php //if(isset($_SESSION["agentId"]))
            if($app->is_agent_logged_in())
            { ?>
            <div class="float-right text-muted">
                <span class="mr-2"> <?php echo $_SESSION["agentName"]; ?> </span>
                <a href="helpers/logoutagent.php" class="btn btn-danger btn-sm" style="margin-top:-2px;">
                    <i class="fa fa-fw fa-sign-out-alt"></i>
                    Exit Session
                </a>
            </div>
            <?php }
            else{ ?>
            <div class="float-right text-muted">
                <span class="mr-2"> <?php echo $_SESSION["businessDisplayName"]; ?> </span>
                <button id="merchant-logout" class="btn btn-danger btn-sm" style="margin-top:-2px;">
                    <i class="fa fa-fw fa-sign-out-alt"></i>
                    Logout
            </button>
            </div>
            <?php } ?>
        </div>
    </nav>

<!--<div class="d-flex">-->
<?php //if($app->is_agent_logged_in()){ ?>
<nav id="menu" class="menu bg-dark">
        <ul class="list-unstyled">
          <li>
                <a href="" class="inactive-link"><i class="fa fa-fw fa-user-circle"></i> <?php echo $_SESSION["businessDisplayName"]; ?></a>
            </li>

            <!-- Heading -->
            <?php if($app->is_merchant()){ ?>
                <li><a href="" class="inactive-link bg-darker"> Point Of Sale </a></li>      
                <li><a href="createpayment.php"><i class="fa fa-fw fa-qrcode"></i> Payment </a></li>
                <?php if(!$app->is_admin()){ ?><li><a href="agentposreport.php"><i class="fa fa-fw fa-history"></i> Payment Report </a></li><?php } ?>
                <?php if($app->is_admin()){ ?><li><a href="posreport.php"><i class="fa fa-fw fa-history"></i> Payment Report </a></li><?php } ?>
                <?php if($app->is_admin()){ ?><li><a href="refunds.php"><i class="fa fa-fw fa-undo"></i> Refunds  </a></li><?php } ?>
                <?php if($app->is_admin()){ ?><li><a href="refundreport.php"><i class="fa fa-fw fa-history"></i> Refund Report </a></li><?php } ?>
            <?php } ?>

            <!-- Heading -->
            <?php if($app->is_loading_center()){ ?>
                <li><a href="" class="inactive-link bg-darker"> Wallet </a></li>
                <li><a href="walletload.php"><i class="fa fa-fw fa-plus-square"></i> Load </a></li>
                <li><a href="loadreport.php"><i class="fa fa-fw fa-history"></i> Load Report </a></li>
                <li><a href="walletunload.php"><i class="fa fa-fw fa-minus-square"></i> Unload </a></li>
                <li><a href="unloadreport.php"><i class="fa fa-fw fa-history"></i> Unload Report </a></li>
            <?php } ?>

            <!-- Heading -->
            <?php if($app->is_admin()){ ?>
                <li><a href="" class="inactive-link bg-darker"> Manage </a></li>
                <li><a href="manageagents.php"><i class="fa fa-fw fa-user"></i> Agents </a></li>
            <?php } ?>

            <!-- User Manual -->
            <li><a href="" class="inactive-link bg-darker"> Help </a></li>
            <li><a href='<?php echo $baseUrl."merchant/epayagentmanual.pdf"?>' target="_blank"><i class="fa fa-fw fa-question-circle"></i> User Manual </a></li>

        </ul>
    </nav>
<?php //} ?>

    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">
                <?php 
                    if(isset($title)){
                    echo $title;
                    }else {
                    echo $default_header;
                    } 
                ?>
            </li>
        </ol>
    </nav>

<!-- Proccessing Task Spinner Modal -->
<!-- <div class="modal" id="processingTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body text-center">
        <i class="fa fa-circle-notch fa-spin fa-4x text-white"></i>
      </div>
    </div>
  </div>
</div> -->
