<?php
//set page vars
$title = "Dashboard";
//include page header
include "templates/header.php";
?>

	<main id="main" class="container-fluid pt-2 mb-5">

	<div class="row">
	<div class="col-sm-12 col-md-4 col-lg-4">
		<table class="table">
			<tr>
				<th>Order Number :</th>
				<td id="order-number"> </td>
			</tr>
			<tr>
				<th>Amount :</th>
				<td id="Amount"> </td>
			</tr>
			<tr>
				<th>Description :</th>
				<td id="Description"> </td>
			</tr>
			<tr>
				<th>Note :</th>
				<td id="Note"> </td>
			</tr>
			<!--<tr>
				<th>Agent :</th>
				<td id="Agent"> </td>
			</tr> -->
			<tr>
				<th>Date :</th>
				<td id="Date"> </td>
			</tr>
		</table>

        <div class="form-group">
            <button id="Cancel" type="submit" class="btn btn-success"> Cancel </button>
            <button id="Refund" type="submit" class="btn btn-danger"> Refund </button>
        </div>


		<div class="modal fade" id="edit-agent-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
					<div class="modal-header">
						<h5 id="edit-agent-modal-title" class="modal-title">Refund</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
                <div class="modal-body">
                    <form id="update-agent-form" method="POST" autocomplete="off">
                            <div class="form-group">
                                <label for="agentid"> Refund Description </label>
                                <input class="form-control" id="refund-description" name="agentid" maxlength="32" type="text" required>
                            </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                    <button id="refund-submit" type="button" class="btn btn-success">Yes</button>
                </div>

            </div> 
        </div>
		</div>
		</div>
	</main>


<script src="assets/js/refund.js"></script>
<?php 
	include "templates/footer.php";
?>