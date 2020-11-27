<?php
/*
|--------------------------------------------------------------------------
| Page Variables
|--------------------------------------------------------------------------
$merchant - merchant name 
$title - page and breadcrumb title
*/

//set page vars


$title = "Create Payment";

//include page header file
include "templates/header.php";
?>


    <main class="container-fluid pt-2 mb-5">
        <div id="sub-heading" class="row">
            <div class="col-lg-12 col-md-12 col-sm-12"><div id="message"> </div> </div>
        </div>

        <div class="row">

            <div id="outputCode" class="col-sm-12 col-md-7 col-lg-7 order-lg-last mb-5">
                <canvas id="qrcode-canvas" class="mx-auto align-middle d-block img-fluid"></canvas>
                <p class="text-center">Scan the QR Code or input the payment code below to pay via E-Pay</p>
                <h2 class="text-center"><span id="payment-code" class="badge badge-warning"> </span></h2>
                
               <!-- <h4 id="current-payment-info" class="text-center"> </h4> -->
                <canvas id="blank-canvas" class="mx-auto align-middle d-block img-fluid" style="display:none; height:0px"></canvas>
            </div>

            <div class="col-sm-12 col-md-5 col-lg-5 mb-5 order-lg-first">
                        <div class="card bg-white">
                            <div class="card-header bg-dark text-white">
                                <h5> Create Payment 
                                <span id="current-payment-info" class="float-right"> </span></h5>
                            </div>

                            <div class="card-body">
                        <form id="codeGen" method="POST" autocomplete="off">
                            <input type="hidden" id="businessid" value="<?php echo $_SESSION["businessId"];?>">
                            <input type="hidden" id="agentuid" value="<?php echo $_SESSION["agentUid"]; ?>">
                            <input type="hidden" id="player" value="">

                            <div class="form-group">
                                <label for="merchantname"> Merchant </label>
                                <input class="form-control form-control" id="merchantname" type="text" value="<?php echo $_SESSION["businessDisplayName"]; ?>" readonly>
                            </div>

                            
                            <div id="price-buttons" class="form-group text-center mt-0"> 
                                <div class="btn btn-info price-val" data-price-value="0.01"> $0.01 </div>
                                <div class="btn btn-info price-val" data-price-value="0.05"> $0.05 </div>
                                <div class="btn btn-info price-val" data-price-value="0.25"> $0.25 </div>
                                <div class="btn btn-info price-val" data-price-value="0.50"> $0.50 </div>
                                <div class="btn btn-info price-val" data-price-value="1.00"> $1.00 </div>
                                <div class="btn btn-info price-val" data-price-value="5.00"> $5.00 </div>
                                <div class="btn btn-info price-val" data-price-value="10.00"> $10.00 </div>
                                <div id="reset-amount" class="btn btn-danger"> Reset </div>
                            </div>

                            <div class="row">
                            <div class="form-group col-6">
                                <label for="orderid"> Order # <i class="text-muted"> Optional </i></label>
                                <input class="form-control form-control" id="ordernumber" maxlength="32" type="text" value="-">
                            </div>

                            <div class="form-group col-6">
                                <label for="amount"> Amount </label>
                                <input class="form-control form-control" id="amount" type="number" min="0.05" step=".01" pattern="^\d+(?:\.\d{1,2})?$" max="9999" name="paymentAmount" value="0.00" placeholder="0.00" required>
                            </div>
                            </div>

                            <div class="form-group">
                                <label for="orderid"> Order Description <i class="text-muted"> Optional </i></label>
                                <input class="form-control form-control" id="orderdesc" name="orderdesc" maxlength="32" type="text">
                            </div>

                            <div class="form-group">
                                <label for="orderid"> Notes <i class="text-muted"> Optional </i></label>
                                <input class="form-control form-control" id="ordernote" name="ordernote" type="text">
                            </div>
                            

                            <!--<div class="form-group">
                                <label for="authcode"> Verification Code </label>
                                <div class="input-group">
                                    <input class="form-control form-control" maxlength="4" id="authcode" type="number" name="paymentAuthCode" aria-describedby="codeHelp" required>
                                    <div class="input-group-append">
                                        <span class="input-group-text"><a href="#" class="text-muted"> Forgot code? </a></span>
                                    </div>
                                </div>
                                <small id="codeHelp" class="text-muted"> Type your 4 digit verfication code in the field above </small>
                            </div>
                            -->

                            <div class="form-group">
                                <button type="reset" class="btn btn-secondary"> Cancel </button>
                                <button id="generateCode" type="submit" class="btn btn-success"> Create Code </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    
</main>

<script src="assets/js/lib/qrcodegen.js"></script>
<script src="assets/js/payment.js"></script>
<!-- <script>
    var string;
    for(i=0; i < 50000; i++){
        var id = generateUUID();
        //console.log(i+" UUID:"+id.substr(0,7));
        //console.log(id.substr(0,7));

        string +=" ";        
        string +=id.substr(0,6).toUpperCase();        
        if(i > 1){
            if(id == oldId){
                //console.log("Duplicate");
            }
            //else console.log(i+" Unique");
        }
        var oldId=id;
    }

    console.log(string);
</script> -->
<?php 
    include "templates/footer.php";
?>