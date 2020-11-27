var dataTable = null; //to store the datatable reference

$(document).ready(function() {

  var d = new Date();
  var mth = d.getMonth() + 1;
  var paymentListHeader = $("#payment-list-header");
  
    $.LoadingOverlay("show");//show ajax loader
    $.ajax({
        url: apiBaseUrl + "Invoice/Business?BusinessId=" + businessId + "&Status=PAID&QueryAmount=0&Month=0",
        crossDomain: true,
        dataType: "json",
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function (data) {
            if (data.status) {
                var invoices = data.data;
                clearTable();
                addTableData(invoices);
                addSummary(invoices);
                sortTableData(0);

                paymentListHeader.text("Refund");
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


$(document).on("click", "td", function () {
    var id = $(this).attr("data-transaction-id");
    console.log(id);
    localStorage.setItem("transactionId", id);
    window.location.href = "refund.php";
});

function addTableData(invoices){
  $("#paymentHistory").empty();

  for (i = 0; i < invoices.Invoice.length; i++) {
    var payment = invoices.Invoice[i];
    $("<tr></tr>")
      .append(
        $("<td></td>").text(payment.TransactionId)
            .addClass("transaction-info-link")
            .attr("data-transaction-id", payment.TransactionId),
        $("<td></td>").text(payment.OrderNumber)
            .addClass("transaction-info-link")
            .attr("data-transaction-id", payment.TransactionId),
        $("<td></td>").text(payment.Amount.toFixed(2))
            .addClass("transaction-info-link")
            .attr("data-transaction-id", payment.TransactionId),
        $("<td></td>").text(payment.Description)
            .addClass("transaction-info-link")
            .attr("data-transaction-id", payment.TransactionId),
        $("<td></td>").text(payment.Note)
            .addClass("transaction-info-link")
            .attr("data-transaction-id", payment.TransactionId),
        $("<td></td>").text(payment.AgentName)
            .addClass("transaction-info-link")
            .attr("data-transaction-id", payment.TransactionId),
        $("<td></td>").text(payment.Created.substring(0, 16).replace("T", " @ "))
            .addClass("transaction-info-link")
            .attr("data-transaction-id", payment.TransactionId) // Make date more user friendly
    )
      .appendTo("#paymentHistory")
      //.hide()
      .fadeIn(500);
  }
}

function addSummary(invoices){

  var totalmonth = invoices.InvoiceSummary.TransactionsForMonth;
  var totaltodate = invoices.InvoiceSummary.AllTransactions;
  var totalearnings = Number(invoices.InvoiceSummary.Total);

  $("#transactionsmonth").html(totalmonth);
  $("#transactionstodate").html(totaltodate);
  $("#totalearnings").html(parseFloat(totalearnings).toFixed(2));
}

function sortTableData(row){
   if(!$.fn.dataTable.isDataTable("#payments-list")){
    dataTable = $("#payments-list").DataTable({
      "aaSorting": [[row, "desc"]]
    }); 
  }
}

function clearTable(){
  if($.fn.dataTable.isDataTable("#payments-list")) {
    dataTable.destroy();
  } 
}
