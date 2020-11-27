var dataTable = null; //to store the datatable reference

$(document).ready(function() {

  var d = new Date();
  var mth = d.getMonth() + 1;
  var paymentListHeader = $("#payment-list-header");
  
  //GET All PAID INVOICES
  $("#invoices-get-paid").click(function(){
  $.LoadingOverlay("show");//show ajax loader
  $.ajax({
    url: apiBaseUrl + "Invoice/Business?BusinessId="+businessId+"&Status=PAID&QueryAmount=0&Month=0",
    crossDomain: true,
    dataType: "json",
    method: "GET",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function(data) {
      if(data.status){
        var invoices = data.data;
        clearTable();
        addTableData(invoices);
        addSummary(invoices);
        sortTableData(0);

        paymentListHeader.text("Completed Payments");
      }
    },
    error: function(err){
      alertify.error("Something went wrong, try again");
    },
    complete: function(){
      $.LoadingOverlay("hide");//hide ajax loader
    }
  });
});

  //GET ALL INVOICES
  $("#invoices-get-all").click(function(){
  $.LoadingOverlay("show");//show ajax loader
   $.ajax({
    url: apiBaseUrl + "Invoice/Business?BusinessId="+businessId+"&QueryAmount=0&Month=0",
    crossDomain: true,
    dataType: "json",
    method: "GET",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function(data) {
      if(data.status){
        var invoices = data.data;
        clearTable();
        addTableData(invoices);
        addSummary(invoices);
        sortTableData(0);

        paymentListHeader.text("All Payments");
      }
    },
    error: function(err){
      alertify.error("Something went wrong, try again");
    },
    complete: function(){
      $.LoadingOverlay("hide");//hide ajax loader
    }
  }); 
});

  //GET ALL PENDING INVOICES
  $("#invoices-get-pending").click(function(){
  $.LoadingOverlay("show");//show ajax loader
    $.ajax({
     url: apiBaseUrl + "Invoice/Business?BusinessId="+businessId+"&Status=Pending&QueryAmount=0&Month=0",
     crossDomain: true,
     dataType: "json",
     method: "GET",
     beforeSend: function(xhr) {
       xhr.setRequestHeader("Authorization", "Bearer " + token);
     },
     success: function(data) {
       if(data.status){
         var invoices = data.data;
         clearTable();
         addTableData(invoices);
         addSummary(invoices);
         sortTableData(0);

         paymentListHeader.text("Unpaid Payments");
       }
     },
     error: function(err){
       alertify.error("Something went wrong, try again");
     },
     complete: function(){
       $.LoadingOverlay("hide");//hide ajax loader
     }
   }); 
 });

 //Trigger all function
   $("#invoices-get-paid").trigger('click');

});

function addTableData(invoices){
  $("#paymentHistory").empty();

  for (i = 0; i < invoices.Invoice.length; i++) {
    var payment = invoices.Invoice[i];

    var row;//to store current table row

    if(payment.Status == "Refund"){
     row = $("<tr></tr>").addClass("bg-danger text-light");
    }else{
      row = $("<tr></tr>");
    }

    row.append(
        $("<td></td>").text(payment.TransactionId),
        $("<td></td>").text(payment.OrderNumber),
        $("<td></td>").text(payment.Amount.toFixed(2)),
        $("<td></td>").text(payment.Description),
        $("<td></td>").text(payment.Note),
        $("<td></td>").text(payment.AgentName),
        $("<td></td>").text(payment.Created.substring(0, 16).replace("T", " @ ")) // Make date more user friendly
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
