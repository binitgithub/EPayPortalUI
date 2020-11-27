<?php
/*
|--------------------------------------------------------------------------
| Page Variables
|--------------------------------------------------------------------------
$merchant - merchant name 
$title - page and breadcrumb title
*/

//set page vars


$title = "Unload Wallet";

//include page header file
include "templates/header.php";
?>


    <main class="container-fluid pt-2 mb-5">
        <div id="sub-heading" class="row">
            <div class="col-lg-12 col-md-12 col-sm-12"><div id="message"> </div> </div>
        </div>

        <div class="row">
            <div class="col-sm-12 col-md-5 col-lg-5 mb-5">
                        <div class="card bg-white">
                            <div class="card-header bg-dark text-white">
                                <h5> Unload Wallet
                                <span id="current-payment-info" class="float-right"> </span></h5>
                            </div>

                            <div class="card-body">
                        <form id="wallet-unload-form" method="POST" autocomplete="off">
                            <input type="hidden" id="businessId" value="<?php echo $_SESSION["businessId"];?>">
                            <input type="hidden" id="agent-uid" value="<?php echo $_SESSION["agentUid"]; ?>">
                            <input type="hidden" id="agent-id" value="<?php echo $_SESSION["agentId"]; ?>">
                            <input type="hidden" id="player" value="">
                            <input type="hidden" id="level" value="">
                            <input type="hidden" id="max-load" value="">
                            

                        <div id="verified-wallet-info" class="bg-white d-none">
                        <!--<div class="text-center">
                            <img id="wallet-user-img" src="assets/images/placeholder.png" class="img-fluid rounded-circle" width="25%" alt="user image"/>
                        </div> -->
                        <div class="p-3 mt-3 mb-3 bg-success text-white">
                            <h4 id="wallet-owner-name" class="pb-1">  </h4>
                            <p id="wallet-owner-address"> </p>
                            <hr/>
                            <p> Wallet Name <span id="wallet-name" class="float-right font-weight-bold"> - </p>
                            <p> Available Balance <span id="wallet-balance" class="float-right font-weight-bold"> -  </span></p>
                            <p> Clearance Level <span id="wallet-level"class="float-right font-weight-bold"> - </span></p>                     
                            <p> Daily Unload Amount <span id="wallet-max-unload-amount" class="float-right font-weight-bold"> - </span></p>                         
                            <p> Total Unloadable Amount <span id="total-unload-amount" class="float-right font-weight-bold"> - </span></p>                         
                         </div>
                         </div>

                            <div class="form-group">
                            <label for="wallet-username"> Username OR Email <i class="text-muted"> Registered wallet name </i> </label>
                                <div class="input-group">
                                    <input class="form-control" id="wallet-username" maxlength="25" type="text" required>
                                    <div class="input-group-append">
                                        <button id="get-wallet-info" class="btn btn-info" type="button">Verify Wallet</button>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="load-amount"> Amount </label>
                                <input class="form-control" onchange="setTwoNumberDecimal" id="amount" type="number" min="1.00" step=".01" pattern="^\d+(?:\.\d{1,2})?$" max="9999" name="amount" placeholder="0.00" required disabled>
                            </div>

                            <div class="form-group">
                                <label class="text-muted"> Verify User Identity for unloads </label>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="nri-verified">
                                    <label class="form-check-label" for="nri-verified"> National Registration ID Verified </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="reset" class="btn btn-secondary"> Clear </button>
                                <button id="load-wallet" type="submit" class="btn btn-success" disabled> Unload Wallet </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            
<!--             <div id="wallet-user-info" class="col-sm-12 col-md-7 col-lg-7 mb-5">
            <div class="card bg-white">
                    <div class="card-header bg-light">
                        <h4 id="wallet-owner-name"> Verified User will show here </h4>
                    </div>

                    <div class="card-body ">

                    <div class="row">
                    <div class="col-4">
                        <p> <img/> </p>
                    </div>

                    <div class="col-8">
                        <p>Wallet <span id="wallet-name" class="float-right text-success"> - </p>
                        <hr/>
                        <p> Balance <span id="wallet-balance" class="float-right text-success"> -  </span></p>
                        <hr/>
                        <p> Clearance Level <span id="wallet-level"class="float-right text-success"> - </span></p>
                        <hr/>
                        <p> Current Max Load Amount <span id="wallet-max-load" class="float-right text-success"> - </span></p>
                    </div>
                    </div>
                    </div>
                </div>
            </div>

        </div> -->
    
</main>

<script src="assets/js/unloadwallet.js"></script>
<?php 
    include "templates/footer.php";
?>