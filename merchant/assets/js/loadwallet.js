var userVerified = false;
var maxLoad = 0;
var userLevel = 0;
var maxLoadAmount = 0;

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
      url: apiBaseUrl + "Wallet/UserLoadInfo?username=" + username,
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
          $("#wallet-max-load").text("$" + walletInfo.CurrentMaxLoadAmount.toFixed(2));
          $("#wallet-max-load-amount").text("$" + walletInfo.RemainingWalletMaxAmount.toFixed(2));
          $("#get-wallet-info").prepend(" " + $("<i></i>").addClass("fa fa-check-circle"));
          $("#verified-wallet-info").removeClass("d-none");
          $("#amount").removeAttr("disabled");

          userVerified = true;
          userLevel = walletInfo.WalletClearanceLevel;
          maxLoad = parseFloat(walletInfo.CurrentMaxLoadAmount).toFixed(2);
          maxLoadAmount = parseFloat(walletInfo.RemainingWalletMaxAmount).toFixed(2);

          if(userLevel == "2"){
            $("#verify-level-two").show();
          }

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

$("#wallet-load-form").submit(function(e) {
  e.preventDefault();//prevent default action on form submit

  if (!checkNriVerified("amount","nri-verified")) {
    alertify.error("Loading this amount requires ID Verification");
  } else {
    alertify.confirm(
      "E-Pay Merchant Services",
      "Are you sure you want to load this wallet",
      function() {

        //Disable Button 
        $("#load-wallet")
        .attr("disabled", "disabled")
        .text("Processing ")
        .append($("<i></i>").addClass("fa fa-spin fa-circle-notch"));

        var walletAccountName = $("#wallet-username").val();
        var walletLoadAmount = parseFloat($("#amount").val()).toFixed(2);
        var walletLoadNRI = $("#nri-verified").val();
        var deviceName = "computer";
        var agentUid = $("#agent-uid").val();

        var coordinates = getLocation();
        console.log(coordinates);
        var latitude = $("#wallet-account-name").val();
        var longitude = $("#wallet-account-name").val();

        if(walletLoadNRI == "on"){
          walletLoadNRI = true;
        }

        var loadData = {
          AccountName: walletAccountName,
          Amount: walletLoadAmount,
          AgentId: agentUid,
          NRIVerify: walletLoadNRI,
          DeviceName: deviceName,
          Longitude: -59.9342842,
          Latitude: 13.9382094
        };

        loadData = JSON.stringify(loadData);

        console.log(loadData);
        $.LoadingOverlay("show"); //show ajax loader
        //SUBMIT WALLET LOAD
        $.ajax({
          url: apiBaseUrl + "Wallet/Load",
          type: "PUT",
          crossDomain: true,
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: loadData,
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: function(data) {

            if(data.status){
            var wallet = data.data;
/*             alertify.alert(
              "<div class='text-center mx-auto align-middle d-block' style='font-size:3em'><i class='fa fa-check-circle fa-5x text-success'></i><h3> <b>" +
                wallet.WalletName +
                "</b> Loaded Successfully </h3><h4> New Balance: " +
                wallet.AvailableBalance.toFixed(2) + ""
                //"</h4><br/><a href='walletload.php' class='btn btn-success'> New Load </a> <a href='helpers/logoutagent.php' class='btn btn-danger'> Exit Session </a>"
            ); */
            $(location).attr('href', 'walletloadsuccess.php?walletName='+wallet.WalletName+"&walletNewBalance="+parseFloat(wallet.AvailableBalance).toFixed(2));

          }else{
            alertify.error(data.message);
            resetBtn("load-wallet", "Load Wallet");
          }
          },
          error: function(err) {
            alertify.error("Something went wrong");
            resetBtn("load-wallet", "Load Wallet");
          },
          complete: function() {
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

$("#amount").keyup(function(e) {
  var currAmount = parseFloat(this.value).toFixed(2);
  console.log(currAmount);

  if (parseFloat(currAmount) > parseFloat(maxLoad)) {//toFixed returns strings so we parse float to get a correct comparison
    //alertify.warning("Current amount exceeds max load amount");
  }
  if (parseFloat(currAmount) > 1.0 && parseFloat(currAmount) <= parseFloat(maxLoad) && parseFloat(currAmount) <= parseFloat(maxLoadAmount) && userVerified) {
    $("#load-wallet").removeAttr("disabled");
  } else {
    $("#load-wallet").attr("disabled", "disabled");
  }
});

function checkNriVerified(amountField, nriField) {
  var verified = false;
  if((parseFloat($("#"+amountField).val()).toFixed(2) > 4999.00) && userLevel == 2) {
    if($("#"+nriField).is(":checked")){
      verified = true;
    }else{
          verified = false;
    }
  }else{
    verified = true;
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
