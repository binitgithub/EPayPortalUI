$(document).ready(function() {

  var d = new Date();
  var mth = d.getMonth() + 1;

  console.log(mth);
  console.log(businessId);

  $.LoadingOverlay("show");//show ajax loader
  $.ajax({
    url: apiBaseUrl + "Invoice/Business?BusinessId="+businessId+"&Status=PAID&QueryAmount=0&Month="+mth,

    crossDomain: true,
    dataType: "json",
    method: "GET",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function(data) {
      if(data.status){
        var invoices = data.data;
        for (i = 0; i < invoices.Invoice.length; i++) {
          var payment = invoices.Invoice[i];
          $("<tr></tr>")
            .append(
              $("<td></td>").text(payment.TransactionId),
              $("<td></td>").text(payment.OrderNumber),
              $("<td></td>").text(payment.Amount.toFixed(2)),
              $("<td></td>").text(payment.Description),
              $("<td></td>").text(payment.Note),
              $("<td></td>").text(payment.AgentName),
              $("<td></td>").text(payment.Created.substring(0, 16).replace("T", " @ ")) // Make date more user friendly
            )
            .appendTo("#paymentHistory")
            .hide()
            .fadeIn(500);
        }

        totalmonth = invoices.InvoiceSummary.TransactionsForMonth;
        totaltodate = invoices.InvoiceSummary.AllTransactions;
        totalearnings = Number(invoices.InvoiceSummary.Total);

        $("#transactionsmonth").html(totalmonth);
        $("#transactionstodate").html(totaltodate);
        $("#totalearnings").html(parseFloat(totalearnings).toFixed(2));

        $("#payments-list").DataTable({
          "aaSorting": [[ 0, "desc" ]]
        });
      }
    },
    error: function(err){
      alertify.error(data.message);
    },
    complete: function(){
      $.LoadingOverlay("hide");//hide ajax loader
    }
  });
});
