<?php
/*
|--------------------------------------------------------------------------
| Page Variables
|--------------------------------------------------------------------------
$merchant - merchant name 
$title - page and breadcrumb title
*/

//set page vars
$title = "Agent Access";

//include page header
include "templates/header.php";
?>

   <main id="main" class="container-fluid pt-2 mb-5">
        <div id="sub-heading" class="row">
            <div class="col-lg-12 col-md-12 col-sm-12"><div id="message"></div> </div>
        </div>

        <div class="row">

                    <div class="col-sm-12 col-md-5 col-lg-5 mb-5 ml-auto mr-auto">
                        <div class="card bg-white">
                            <div class="card-header bg-dark text-white">
                                <h5> Enter Agent Credentials
                                <span id="current-payment-info" class="float-right"> </span></h5>
                            </div>

                            <div class="card-body">
                        <form id="agent-login-form" method="POST" autocomplete="off">
                            <input type="hidden" id="business-id" value="<?php echo $_SESSION["businessId"];?>">
                            <!-- <div class="form-group">
                                <label for="agentid"> Agent Name </label>
                                <select id="agent-id" class="form-control" name="agentid">
                                    <?php 
                                            // $agents = $_SESSION["agents"];
                                            // foreach($agents as $agent){
                                            //     echo "<option value='".$agent->AgentID."'>".$agent->AgentName."</option>";
                                            // }
                                    ?>
                                <select>
                            </div> -->           
                            <div class="form-group">
                                <label for="agentpin"> Agent Name </label>
                                <input class="form-control" id="agent-name" type="text" placeholder="name" required>
                            </div>

                            <div class="form-group">
                                <label for="agentpin"> PIN </label>
                                <input class="form-control" id="agent-pin" type="password" pattern="[0-9]*" inputmode="numeric" minlength="4" maxlength="4" name="agentpin" placeholder="0000" required>
                            </div>
                                                   
                            <div class="form-group">
                                <button type="reset" class="btn btn-secondary"> Cancel </button>
                                <button id="agent-access-submit" type="submit" class="btn btn-success"> Continue </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
</main>
<script src="assets/js/agentaccess.js"></script>
<?php 
    include "templates/footer.php";
?>