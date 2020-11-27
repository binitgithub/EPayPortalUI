$(document).ready(function() {

    var agentUid = $("#agent-uid").val();

    $.LoadingOverlay("show");//show ajax loader
    $.ajax({
        url: apiBaseUrl + "Wallet/Admin/History?businessAgentId="+agentUid+"&type=Unload",
        crossDomain: true,
        dataType: "json",
        method: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function (data) {
            if (data.status) {
                var info = data.data;
                addTableData(info);

                $("#unload-list").DataTable({
                    "aaSorting": [[0, "desc"]]
                });
            }
            else {
                alertify.warning("No unloads found");
            }
        },
        error: function (err) {
            alertify.error("Something went wrong, try again");
        },
        complete: function () {
            $.LoadingOverlay("hide");//hide ajax loader
        }
    });
});

function addTableData(data){
    $("#loadHistory").empty();

    for (i = 0; i < data.length; i++) {
        var trans = data[i];
        $("<tr></tr>")
            .append(
            $("<td></td>").text(trans.LoadingLogId),
            $("<td></td>").text(trans.Type),
            $("<td></td>").text(trans.WalletName),
            $("<td></td>").text(trans.Amount.toFixed(2)),
            $("<td></td>").text(trans.AgentName),
            $("<td></td>").text(trans.Created.substring(0, 16).replace("T", " @ ")) // Make date more user friendly
            )
      .appendTo("#loadHistory")
      //.hide()
            .fadeIn(500);
  }
}

function sortTableData(row){
  if ( $.fn.dataTable.isDataTable( '#payment-list' ) ) {
    table = $('#example').DataTable();
  }
  else {
      table = $('#example').DataTable( {
          paging: false
      } );
  }
}
