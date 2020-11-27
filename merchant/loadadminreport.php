<?php
//set page vars
$title = "Load Report";
//include page header
include "templates/header.php";
?>

   <main id="main" class="container-fluid pt-2 mb-5">

        <div class="row">            
        <div class="col-sm-12 col-md-12 col-lg-12 mb-5">
                <div class="card bg-white">
                    <div class="card-header bg-light">
                        <h4> Loading History </h4>
                    </div>


                            <input type="hidden" id="agent-uid" value="<?php echo $_SESSION["agentUid"]; ?>">

                    <div class="card-body ">

                        <!--<h3 class- "card-title"> Most Recent POS Payments</h3>-->
                        <br/>
                        <table id="unload-list" class="table table-responsive-sm table-striped table-borderless">
                            <thead class="border-top-0">
                                <tr>
                                    <th class="border-top-0" scope="col">Transaction Id</th>
                                    <th class="border-top-0" scope="col">Type</th>
                                    <th class="border-top-0" scope="col">WalletName</th>
                                    <th class="border-top-0" scope="col">Amount</th>
                                    <th class="border-top-0" scope="col">Agent Name</th>
                                    <th class="border-top-0" scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody id="loadHistory">

                            </tbody>
                        </table>
                        <!--<a href="#" class="btn btn-success">View All</a>-->
                    </div>
                </div>
            </div>
        </div>
</main>
<script src="assets/js/loadadminreport.js"></script>
<?php 
    include "templates/footer.php";
?>