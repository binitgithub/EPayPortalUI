<?php
//set page vars
$title = "Dashboard";
//include page header
include "templates/header.php";
?>

   <main id="main" class="container-fluid pt-2 mb-5">
    <!--    <div id="page-heading" class="row mb-4">
            <div class="col-sm-12 col-md-12 col-lg-12"><div id="message"> </div> </div>

            <div class="col-sm-12 col-md-6 col-lg-8">
                <h3 class="pt-0"> Dashboard </h3>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-4">
                <h5 class="pt-0"> Welcome back, 
                <?php/*
                    if(isset($_SESSION["fullName"])){ 
                        echo " ".$_SESSION["fullName"]; 
                    }
                    else{
                        echo " User";
                    }  */  
                ?>
                </h5>
            </div> 
        </div> -->

        <div class="row">
            <div class="col-sm-4 mb-5">
                <div class="card bg-success text-white">
                <div class="card-body">
                    <h1 id="transactionsmonth" class="card-title"><!--25 --></h1>
                    <p class="card-text">Total Transactions this month</p>
                    <!--<a href="#" class="btn btn-primary"></a>-->
                </div>
                </div>
            </div>

            <div class="col-sm-4 mb-5">
                <div class="card bg-info text-white">
                <div class="card-body">
                    <h1 id="transactionstodate" class="card-title"><!--109--></h1>
                    <p class="card-text">Total Transactions to date</p>
                    <!--<a href="#" class="btn btn-primary">Go somewhere</a>-->
                </div>
                </div>
            </div>

            <div class="col-sm-4 mb-5">
                <div class="card bg-primary text-white">
                <div class="card-body">
                    <h1 id="totalearnings" class="card-title"><!--4502.25--></h1>
                    <p class="card-text">Total earnings to date</p>
                    <!--<a href="#" class="btn btn-primary">Go somewhere</a>-->
                </div>
                </div>
            </div>
        </div>


        <div class="row">
            
        <div class="col-sm-12 col-md-12 col-lg-12 mb-5">
                <div class="card bg-white">
                    <div class="card-header bg-light">
                        <h4> Payment History </h4>
                    </div>

                    <div class="card-body ">

                        <!--<h3 class- "card-title"> Most Recent POS Payments</h3>-->
                        <br/>
                        <table id="payments-list" class="table table-responsive-sm table-striped table-borderless">
                            <thead class="border-top-0">
                                <tr>
                                    <th class="border-top-0" scope="col">TXN ID</th>
                                    <!--<th class="border-top-0" scope="col">Customer</th> -->
                                    <th class="border-top-0" scope="col">Order #</th>
                                    <th class="border-top-0" scope="col">Amount</th>
                                    <th class="border-top-0" scope="col">Desc</th>
                                    <th class="border-top-0" scope="col">Notes</th>
                                    <th class="border-top-0" scope="col">Agent</th>
                                    <th class="border-top-0" scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody id="paymentHistory">

                            </tbody>
                        </table>
                        <!--<a href="#" class="btn btn-success">View All</a>-->
                    </div>
                </div>
            </div>
        </div>
</main>
<script src="assets/js/dashboard.js"></script>
<?php 
    include "templates/footer.php";
?>