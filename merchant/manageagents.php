<?php
//set page vars
$title = "Manage Agents";

//include page header
include "templates/header.php";
?>

   <main id="main" class="container-fluid pt-2 mb-5">
        <div id="sub-heading" class="row">
            <div class="col-lg-12 col-md-12 col-sm-12"><div id="message"></div> </div>
        </div>

        <div class="row">

                    <div class="col-sm-12 col-md-5 col-lg-5 mb-5 order-lg-first">
                        <div class="card bg-white">
                            <div class="card-header bg-dark text-white">
                                <h5> Add New Agent
                                <span id="current-payment-info" class="float-right"> </span></h5>
                            </div>

                            <div class="card-body">
                        <form id="new-agent-form" method="POST" autocomplete="off">
                            <input type="hidden" id="business-id" value="<?php echo $_SESSION["businessId"];?>">
                            <div class="form-group">
                                <label for="agentid"> Agent ID </label>
                                <input class="form-control" id="agent-id" name="agentid" maxlength="32" type="text" placeholder="Internal Unique Identifier for your Company" required>
                            </div>

                            <div class="form-group">
                                <label for="agentname"> Agent Name </label>
                                <input class="form-control" id="agent-name" type="text" placeholder="Enter Agent's Name" required>
                            </div>

                            <div class="form-group">
                                <label for="agentpin"> PIN <span class="text-muted">(Must be 4 digits)</span></label>
                                <input class="form-control" id="agent-pin" type="number" min="0000" step="0001" max="9999" minlength="4" maxlength="4" name="agentpin" placeholder="0000" required>
                            </div>

                            <div class="form-group">
                                <label for="agentrole"> Role </label>
                                <select class="form-control" id="agent-role" name="agentrole">
                                    <option value="AGENT"> AGENT </option>
                                    <option value="ADMIN"> ADMIN </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <button type="reset" class="btn btn-secondary"> Cancel </button>
                                <button id="save-agent" type="submit" class="btn btn-success"> Save </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        <div class="col-sm-12 col-md-7 col-lg-7 mb-5">
                <div class="card bg-white">
                    <div class="card-header bg-light">
                        <h4> Current Agents </h4>
                    </div>

                    <div class="card-body ">

                        <!--<h3 class- "card-title"> Most Recent POS Payments</h3>-->
                        <br/>
                        <table id="agents-table" class="table table-responsive-sm agents-table table-borderless">
                            <thead class="border-top-0">
                                <tr>
                                    <th class="border-top-0" scope="col">ID</th>
                                    <th class="border-top-0" scope="col">Name</th>
                                    <!--<th class="border-top-0" scope="col">Status</th>-->
                                    <th class="border-top-0" scope="col">Role</th>
                                    <th class="border-top-0" scope="col"> &nbsp; </th>
                                    <th class="border-top-0" scope="col"> &nbsp; </th>
                                    <th class="border-top-0" scope="col"> &nbsp; </th>
                                    <!--<th class="border-top-0" scope="col">Added</th>-->
                                    <!--<th class="border-top-0" scope="col"></th>-->
                                </tr>
                            </thead>
                            <tbody id="agents-list">
                            <!--    <tr>
                                    <td>1234</td>
                                    <td>Che-Leslie Cox</td>
                                    <td> Active </td>
                                    <td>Agent</td>
                                    <td>2018-06-27</td>
                                    <td data-agent="1234"><i class="fa fa-edit edit-agent mr-2"></i> <i class="fa fa-times-circle text-danger delete-agent"></td>
                                </tr>
                                <tr>
                                    <td>0989</td>
                                    <td>Keisha Jones</td>
                                    <td> Active </td>
                                    <td>Admin</td>
                                    <td>2018-06-25</td>
                                    <td data-agent="0989"> <i class="fa fa-edit edit-agent mr-2"></i> <i class="fa fa-times-circle text-danger delete-agent"></i></td>
                                </tr> -->
                            </tbody>
                        </table>
                        <!--<a href="#" class="btn btn-success">View All</a>-->
                    </div>
                </div>
            </div>


            <div class="modal fade" id="edit-agent-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 id="edit-agent-modal-title" class="modal-title">Edit Agent</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="update-agent-form" method="POST" autocomplete="off">
                            <input type="hidden" id="update-agent-uid" value="">

                            <div class="form-group">
                                <label for="agentid"> Agent ID </label>
                                <input class="form-control" id="update-agent-id" name="agentid" maxlength="32" type="text" required>
                            </div>

                            <div class="form-group">
                                <label for="agentname"> Agent Name </label>
                                <input class="form-control" id="update-agent-name" type="text" placeholder="Enter Agent's Name" required>
                            </div>

                            <div class="form-group">
                                <label for="agentstatus"> Status </label>
                                <select class="form-control" id="update-agent-status" name="agentstatus">
                                    <option value="Active"> Active </option>
                                    <option value="Inactive"> Inactive </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="agentrole"> Role </label>
                                <select class="form-control" id="update-agent-role" name="agentrole">
                                    <option value="AGENT"> AGENT </option>
                                    <option value="ADMIN"> ADMIN </option>
                                </select>
                            </div>

                            <!--
                            <div class="form-group">
                                <button id="generateCode" type="submit" class="btn btn-success btn"> Add Agent </button>
                                <button type="reset" class="btn btn-default btn"> Clear </button>
                            </div> -->
                        </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button id="update-agent-submit" type="button" class="btn btn-success">Save changes</button>
                </div>
                </div> 
            </div>
            </div>




            <div class="modal fade" id="agent-pin-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 id="agent-pin-modal-title" class="modal-title">Edit Agent</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="agent-pin-form" method="POST" autocomplete="off">
                            <input type="hidden" id="agent-uid-pin-change" value="">

                            <div class="form-group">
                                <label for="agentid"> New Pin </label>
                                <input class="form-control" id="agent-pin-new" name="agentid" maxlength="4" type="password" required>
                            </div>

                        </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button id="agent-pin-submit" type="button" class="btn btn-success">Change Pin</button>
                </div>
                </div> 
            </div>
            </div>

        </div>
</main>
<script src="assets/js/agents.js"></script>
<?php 
    include "templates/footer.php";
?>