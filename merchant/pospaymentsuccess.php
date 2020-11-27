
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
<?php if(isset($_GET["transactionId"])){ ?>
<div class='text-center mx-auto align-middle d-block' style='font-size:3em'>
<i class='fa fa-check-circle fa-5x text-success'></i> <p style='font-size:18px'>
<h2> Payment Successful </h2>
<h4> Transaction ID : <?php echo $_GET["transactionId"] ?> </h4>
<a href="createpayment.php" class="btn btn-success"> New Payment </a>
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