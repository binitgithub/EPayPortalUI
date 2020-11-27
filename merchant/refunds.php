<?php
//set page vars
$title = "Refund";
//include page header
include "templates/header.php";
?>

   <main id="main" class="container-fluid pt-2 mb-5">      
        <div class="row">            
        <div class="col-sm-12 col-md-12 col-lg-12 mb-5">
                <div class="card bg-white">
                    <div class="card-header bg-light">
                        <h4 id="payment-list-header"> Refund </h4>
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
<script src="assets/js/refunds.js"></script>
<?php 
    include "templates/footer.php";
?>