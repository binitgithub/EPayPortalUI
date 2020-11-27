
<?php
//set page vars
$title = "Payment Successful";

//include page header
include "templates/header.php";
?>

   <main id="main" class="container-fluid pt-2 mb-5">
        <div id="sub-heading" class="row">
            <div class="col-lg-12 col-md-12 col-sm-12"><div id="message"></div> </div>
        </div>

        <div class="row">
<div class="col-sm-12 col-md-12 col-lg-12">
<?php if(isset($_GET["walletNewBalance"]) && isset($_GET["walletName"])){ ?>
<div class='text-center mx-auto align-middle d-block' style='font-size:3em'>
<i class='fa fa-check-circle fa-5x text-success'></i> <p style='font-size:18px'>
<h2> Wallet Load Successful </h2>
<h4> <?php echo $_GET["walletName"] ?> </h4>
<h4> Amount <?php echo $_GET["walletNewBalance"] ?> </h4>
<a href="walletload.php" class="btn btn-success"> New Load </a>
</div>
<?php }else{ ?> 
    <h2> Invalid Attempt </h2>
 <?php   } ?>
</div>
</div>
</main>
<?php 
    include "templates/footer.php";
?>