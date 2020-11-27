$(document).ready(function() {
  $("#agent-login-form").submit(function(e) {
    e.preventDefault();

    var agentId = $("#agent-id").val();
    var agentName = $("#agent-name").val();
    var agentPin = $("#agent-pin").val();
    var businessId = $("#business-id").val();

    $.LoadingOverlay("show"); //show ajax loader
    $.ajax({url:apiBaseUrl + "BusinessAgent/Login?BusinessId="+businessId+"&AgentName="+agentName+"&PIN="+agentPin,
      type: "POST",
      crossDomain: true,
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: function(data) {
        if (data.status) {
          var agent = data.data;

          if (agent.Status == "Active") {
            var agent = {
              agentUid: agent.Id,
              agentName: agent.AgentName,
              agentId: agent.AgentId,
              agentRole: agent.Role
            };

            $.ajax({
              url: "helpers/agent.php",
              type: "POST",
              data: agent,
              success: function(data) {
                window.location = "createpayment.php";
              },
              error: function(err) {
                console.log(err);
              }
            });
          } else {
            alertify.error(
              "Your account is current inactive, please contact your administrator"
            );
          }
        } else {
          alertify.error(data.message);
        }
      },
      error: function(err) {
        alertify.error("Something went wrong, please try again");
      },
      complete: function() {
        $.LoadingOverlay("hide"); //hide ajax loader
      }
    });
  });

/*   $.LoadingOverlay("show"); //show ajax loader
  $.ajax({
    url: apiBaseUrl + "BusinessAgent/Agents?BusinessId="+businessId,
    crossDomain: true,
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    method: "GET",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function(data) {
      console.log(data);
      $("#agents-list").html(" ");
      for (i = 0; i < data.length; i++) {
        var agent = data[i];
        $("<option></option>")
          .attr({"value": agent.AgentID})
          .text(agent.AgentName)
          .appendTo("#agent-id");
      }
    },
    error: function(err){
      alertify.error("Something went wrong <br/>");
    },
    complete: function(){
      $.LoadingOverlay("hide"); //hide ajax loader
    }
  });*/

}); 

$(function() {
  $("#merchant-logout").click(function() {
    alertify.confirm(
      "E-Pay Merchant Services",
      "Are you sure you want to logout?",
      function() {
        window.location = "helpers/logout.php";
      },
      function() {}
    );
  });
});
