<?php
//set page vars
$title = "Payment Report";
//include page header
include "templates/header.php";
?>

   <main id="main" class="container-fluid pt-2 mb-5">
      <!--  <div class="row">
            <div class="col-sm-4 mb-5">
                <div class="card bg-success text-white">
                <div class="card-body">
                    <h1 id="transactionsmonth" class="card-title"></h1>
                    <p class="card-text">Total Transactions this month</p>
                </div>
                </div>
            </div>

            <div class="col-sm-4 mb-5">
                <div class="card bg-info text-white">
                <div class="card-body">
                    <h1 id="transactionstodate" class="card-title"></h1>
                    <p class="card-text">Total Transactions to date</p>
                </div>
                </div>
            </div>

            <div class="col-sm-4 mb-5">
                <div class="card bg-primary text-white">
                <div class="card-body">
                    <h1 id="totalearnings" class="card-title"></h1>
                    <p class="card-text">Total earnings to date</p>
                </div>
                </div>
            </div>
        </div> -->


        <div class="row">
           
            <div class="col-sm-8 col-md-8 col-lg-8 mb-4">
                <h4> Filter Payments </h4>
                <div id="invoices-get-all" class="btn btn-success"> All </div>
                <div id="invoices-get-paid" class="btn btn-info"> Completed </div>
                <div id="invoices-get-pending" class="btn btn-warning"> Unpaid </div>
            </div>

            <div class="col-sm-4 col-md-4 col-lg-4 mb-4">
                <h4> &nbsp; </h4>
                <div class="float-right badge badge-danger p-2"> Refunded </div>
            </div>
        </div>
        <div class="row">            
        <div class="col-sm-12 col-md-12 col-lg-12 mb-5">
                <div class="card bg-white">
                    <div class="card-header bg-light">
                        <h4 id="payment-list-header"> Payment History </h4>
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
<script src="assets/js/agentposreport.js"></script>
<?php 
    include "templates/footer.php";
?>