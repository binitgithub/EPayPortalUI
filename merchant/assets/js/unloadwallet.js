var userVerified = false;
var maxUnload = 0;
var userLevel = 0;
var maxUnLoadAmount = 0;

$("#get-wallet-info").click(function() {
  userVerified = false;
  if ($("#wallet-username").val().length > 1) {
    var username = $("#wallet-username").val();
    $(this)
      .attr("disabled", "disabled")
      .text("Verifying ")
      .append($("<i></i>").addClass("fa fa-spin fa-circle-notch"));

    $("#amount").removeAttr("disabled");

    if (!$("#verfied-wallet-info").hasClass("d-none")) {
      $("#verified-wallet-info").addClass("d-none");
    }

    $.ajax({
        url: apiBaseUrl + "Wallet/UserUnloadInfo?username=" + username,
      type: "GET",
      crossDomain: true,
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: function(data) {
        if (data.status) {
          var walletInfo = data.data;
          $("#wallet-owner-name").text(walletInfo.FirstName + " " + walletInfo.LastName);
          if (walletInfo.Address != null) {
            $("#wallet-owner-address").text(walletInfo.Address);
            $("#wallet-owner-address").show();
          } else {
            $("#wallet-owner-address").hide();
          }

          //$("#wallet-user-img").attr("src","https://homepages.cae.wisc.edu/~ece533/images/zelda.png");
          $("#wallet-name").text(walletInfo.WalletName);
          $("#wallet-balance").text("$" + walletInfo.AvailableBalance.toFixed(2));
          $("#wallet-level").text("Level " + walletInfo.WalletClearanceLevel);
            $("#wallet-max-unload-amount").text("$" + walletInfo.CurrentMaxUnloadAmount.toFixed(2));
            $("#total-unload-amount").text("$" + walletInfo.TotalUnloadableAmount.toFixed(2));
          $("#get-wallet-info").prepend(" " + $("<i></i>").addClass("fa fa-check-circle"));
          $("#verified-wallet-info").removeClass("d-none");
          $("#amount").removeAttr("disabled");

          userVerified = true;
          userLevel = walletInfo.WalletClearanceLevel;
          maxUnloadAmount = parseFloat(walletInfo.TotalUnloadableAmount).toFixed(2);

        } else {
          alertify.error(data.message);
        }
      },
      error: function(err) {
        alertify.error("Something went wrong");
      },
      complete: function() {
        $("#get-wallet-info")
          .removeAttr("disabled")
          .text("Verify Wallet");
      }
    });
  } else {
    alertify.warning("No wallet name entered");
  }
});

$("#wallet-unload-form").submit(function(e) {
  e.preventDefault();//prevent default action on form submit

    if (!checkNriVerifiedUnload("nri-verified")) {
    alertify.error("Unloading requires ID Verification");
  } else {
    alertify.confirm(
      "E-Pay Merchant Services",
      "Are you sure you want to unload this wallet",
      function() {
        var walletAccountName = $("#wallet-username").val();
        var walletUnloadAmount = parseFloat($("#amount").val()).toFixed(2);
        var walletUnloadNRI = $("#nri-verified").val();
        var deviceName = "computer";
        var agentUid = $("#agent-uid").val();
        var agentId = $("#agent-id").val();
        var businessId = $("#businessId").val();

          var coordinates = getLocation();
          console.log(coordinates);
        var latitude = $("#wallet-account-name").val();
        var longitude = $("#wallet-account-name").val();

        if(walletUnloadNRI == "on"){
          walletUnloadNRI = true;
        }

        var unloadData = {
          AccountName: walletAccountName,
          Amount: walletUnloadAmount,
          BusinessId: businessId,
          AgentId: agentId,
          NRIVerify: walletUnloadNRI,
          DeviceName: deviceName,
          Longitude: -59.9342842,
          Latitude: 13.9382094
        };

        unloadData = JSON.stringify(unloadData);

        console.log(unloadData);
        $.LoadingOverlay("show"); //show ajax loader
        //SUBMIT WALLET LOAD
        $.ajax({
          url: apiBaseUrl + "Wallet/UnLoad",
          type: "POST",
          crossDomain: true,
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
            data: unloadData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (data) {

                if (data.status) {
                    console.log(data);
                    var unload = data.data;
                    console.log(unload);
                    alertify.alert(
                        "<div class='text-center mx-auto align-middle d-block' style='font-size:3em'><i class='fa fa-check-circle fa-5x text-success'></i><h3> <b>" +
                        "</b> Unload Request Created Successfully <br/><span class='text-danger'> Will Expire In 5 Minutes </span> </h3>" 
                        //ADD WALLET UNLOAD CONFIRMED CALL
                    );

                    var isUnloadAccepted = setInterval(function() {
                      $.ajax({
                        url:apiBaseUrl +"LoadInvoice?loadInvoiceId=" +unload.LoadInvoiceId,
                        type: "GET",
                        crossDomain: true,
                        dataType: "json",
                        contentType: "application/json; charset=UTF-8",
                        beforeSend: function(xhr) {
                          xhr.setRequestHeader("Authorization", "Bearer " + token);
                        },
                        success: function(data) {
                          console.log(data);
                          if (data.status) {
                            var unloadInvoice = data.data;
                            if(unloadInvoice.Status == "Completed" && unloadInvoice.Type == "Unload"){
                              $(location).attr('href', 'unloadconfirmed.php?amount='+parseFloat(unloadInvoice.Amount).toFixed(2));
                            }
                          }else{
                            if(data.message == "Invalid Invoice"){
                              $(location).attr('href', 'expired.php');
                            }
                          }
                        }
                      });
                    }, 5000);

                } else {
                    alertify.error(data.message);
                }
            },
            error: function (err) {
                alertify.error("Something went wrong");
            },
            complete: function () {
                $.LoadingOverlay("hide");
            }
        });
      },
      function() {
        //if action not confirmed
      }
    );
  }
});

$("#amount").keyup(function (e) {
    var currAmount = parseFloat(this.value).toFixed(2);
    console.log(currAmount);

    //if (parseFloat(currAmount) != null || parseFloat(currAmount) == null) {
    if(parseFloat(currAmount) > 1.0 && parseFloat(currAmount) <= parseFloat(maxUnloadAmount)){
        $("#load-wallet").removeAttr("disabled");
    } else {
        $("#load-wallet").attr("disabled", "disabled");
    }
});

function checkNriVerifiedUnload(nriField) {
  var verified = false;
    if($("#"+nriField).is(":checked")){
      verified = true;
    }else{
          verified = false;
    }
  return verified;
}

function resetLoadData() {}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  return coords[(position.coords.latitude, position.coords.longitude)];
}

function setTwoNumberDecimal(event) {
  this.value = parseFloat(this.value).toFixed(2);
}
