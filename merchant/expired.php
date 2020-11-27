
<?php
//set page vars
$title = "Operation Expired";

//include page header
include "templates/header.php";
?>

   <main id="main" class="container-fluid pt-2 mb-5">
        <div id="sub-heading" class="row">
            <div class="col-lg-12 col-md-12 col-sm-12"><div id="message"></div> </div>
        </div>

        <div class="row">
<div class="col-sm-12 col-md-12 col-lg-12">

<div class='text-center mx-auto align-middle d-block' style='font-size:3em'>
<i class='fa fa-exclamation-circle fa-5x text-danger'></i> <p style='font-size:18px'>
<h2> Operation Expired </h2>
<h4> The operation in progress has been idle for too long and expired.  </h4>
</div>

</div>
</div>
</main>
<?php 
    include "templates/footer.php";
?>