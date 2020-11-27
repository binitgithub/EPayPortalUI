$(document).ready(function() {

  var paymentConfirmed = false;
  var checkPayment = "";
  $("#outputCode").hide();

  $("#codeGen").submit(function(e) {
    e.preventDefault();

    alertify.confirm(
      "E-Pay Merchant Services",
      "Are you sure you want to create a new code?",
      function() {
        //if user confirms
        $("#generateCode")
          .attr("disabled", "disabled")
          .text("Processing ")
          .append($("<i></i>").addClass("fa fa-spin fa-circle-notch"));

        $("#message")
          .children()
          .remove();
        $("#outputCode").hide();

        var canvas = $("#qrcode-canvas")[0]; //[0] required to access native object functions like -> getContext
        var blankCanvas = $("#blank-canvas")[0];
        var canvasContext = canvas.getContext("2d");
        var businessId = $("#businessid").val();
        var agentUid = $("#agentuid").val();
        var merchantName = $("#merchantname").val();
        var orderNumber = $("#ordernumber").val();
        var orderDescription = $("#orderdesc").val();
        var orderNote = $("#ordernote").val();
        var paymentAmount = $("#amount").val();
        paymentAmount = parseFloat(paymentAmount).toFixed(2);
        var merchantCode = $("#authcode").val();
        var playerId = $("#player").val();
        //var paymentCode = generateUUID().substr(0, 3)+generateUUID().substr(6,9).toUpperCase();
        var paymentCode = generateUID().toUpperCase();

        if(orderNumber == "-"){//check if order number field is blank and send in dash
          orderNumber = merchantName;
        }

        var paymentDetails = {
          BusinessId : businessId,
          BusinessAgentId : agentUid,
          OrderNumber	: orderNumber,
          InvoiceCode	: paymentCode,
          Note : orderNote,	
          Description	: orderDescription,
          Amount : paymentAmount
        };

        paymentDetails = JSON.stringify(paymentDetails);

        $.LoadingOverlay("show"); //show ajax loader
        $.ajax({
          url: apiBaseUrl + "Invoice",
          type: "POST",
          crossDomain: true,
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: paymentDetails,
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: function(data) {
            console.log(data);
            if(data.status){
              var invoice = data.data;
              
              var qrData = {//create JSON string to embed in QR Code
                encryptedString: invoice.EncryptedString, //invoice.InvoiceID,
                //code: invoice.Code,
                notifyPlayer: playerId
              };

              qrData = JSON.stringify(qrData);

              var QRC = qrcodegen.QrCode; //Setup QR code config and create
              var segs = qrcodegen.QrSegment.makeSegments(qrData); //Temporary placeholder
              var qr = qrcodegen.QrCode.encodeSegments(segs,QRC.Ecc.HIGH,1,40,-1,true); //encodeSegments(list<QrSegment> segs, QrCode.Ecc ecl,int minVersion=1, int maxVersion=40, mask=-1, boostEcl=true)

              canvasContext.clearRect(0, 0, canvas.width, canvas.height); //Clear current QR code image
              qr.drawCanvas(7, 2, canvas); //Redraw new QR image on canvas

              //Display the code to the user
              if (canvas.toDataURL() == blankCanvas.toDataURL()) {
                //if qr code output canvas is blank
                alertify.error("Something went wrong, please try again?");
                resetBtn("generateCode","Create Code");
              } else {
                $("#outputCode").slideDown(500);
                $("#current-payment-info").html(
                  "#" + orderNumber + " - $" + paymentAmount
                );
                $("#payment-code").html(
                  "<span style='font-weight:300'> Payment Code: </span>" +
                    paymentCode
                );
                $("#current-payment-info").fadeIn(200);
                alertify.success("New Code for Order " + orderNumber);
                $("html, body").animate({ scrollTop: 0 }, "fast");
                resetBtn("generateCode","Create Code");
              }

              setInterval(function() {
                $.ajax({
                  url:apiBaseUrl +"Invoice/QRSuccess?encryptedString=" +encodeURI(invoice.EncryptedString),
                  type: "GET",
                  crossDomain: true,
                  dataType: "json",
                  contentType: "application/json; charset=UTF-8",
                  beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                  },
                  success: function(data) {
                    console.log(data);
                    
                    //if (data.Status == "PAID" && data.TransferID == "") {
                    if (data.status) {
/*                       $("#outputCode")
                        .html(
                          "<div class='text-center mx-auto align-middle d-block' style='font-size:3em'><i class='fa fa-check-circle fa-5x text-success'></i> <p style='font-size:18px'><h2> Payment Successful </h2><h4> Transaction ID : "+data.data.TransactionId+"</h4></div>"
                        )
                        .fadeIn(1500);
                     // setTimeout(function() {
                     //   location.reload();
                      //}, 5000); */
                      $(location).attr('href', 'pospaymentsuccess.php?transactionId='+data.data.TransactionId);
                    }
                  }
                });
              }, 5000);
            }else{
              alertify.error(data.message);
            }
            resetBtn("generateCode","Create Code");
          },
          error: function(data) {
            console.log(data);
            alertify.error("There was a problem connecting to E-Pay");
            resetBtn("generateCode","Create Code");
          },
          complete: function() {
            $.LoadingOverlay("hide"); //hide ajax loader
          }
        });
      },
      function() {
        //if not confirmed cancel the operation
        resetBtn("generateCode","Create Code");
      }
    );
  });


  $(".price-val").click(function(){
    var presetPrice = parseFloat($(this).attr("data-price-value")).toFixed(2);
    var currentAmount = parseFloat($("#amount").val()).toFixed(2);
    var newAmount = parseFloat(currentAmount) + parseFloat(presetPrice);
    $("#amount").val(parseFloat(newAmount).toFixed(2));//add value of preset price to order amount
  });

  $('#reset-amount').click(function() {//reset amount field to 0 if user taps/click reset
    $("#amount").val("0.00");
  });

  $('#amount').blur(function() {//reset amount field to 0 if user delets amount and leaves it blank
    if($(this).val() == ""){
      $(this).val("0.00");
    }
  });

  $('#ordernumber').focus(function() {//clear the field if the user wants to add an order number
    if($(this).val() == "-"){
      $(this).val("");
    }
  });

  $('#ordernumber').blur(function() {//add dash if user leaves the field but doesn't add an order number
    if($(this).val() == ""){
      $(this).val("-");
    }
  });

});

function paymentStatus(checkPayment, orderNumber, paymentAmount) {
  console.log(checkPayment);
  $.ajax({
    url: "paymentconfirmed.php",
    success: function(data) {
      console.log("hello");
      if (data == "Successful") {
        alertify.alert(
          "Customer Payment Successful <br/>Order #:<b> " +
            orderNumber +
            "</b><br/>  Amount: <b>" +
            paymentAmount +
            "</b>"
        );
        //clearInterval(checkPayment);
      }
    }
  });
}