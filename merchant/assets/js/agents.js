$(document).ready(function() {
  //$("#agents-list").html("<i class='fa fa-spinner fa-spin'></i>");
  getAgents();

  $("#new-agent-form").submit(function(e) {
    e.preventDefault();

    alertify.confirm(
      "E-Pay Merchant Services",
      "Are you sure you want to add a new agent?",
      function() {
        //if user confirms
        $("#save-agent")
          .attr("disabled", "disabled")
          .text("Processing ")
          .append($("<i></i>").addClass("fa fa-spin fa-circle-notch"));

        /*         $("#message")
          .children()
          .remove();
        $("#outputCode").hide(); */

        var businessId = $("#business-id").val();
        var agentId = $("#agent-id").val();
        var agentName = $("#agent-name").val();
        var agentPin = $("#agent-pin").val();
        var agentRole = $("#agent-role").val();

        var agentDetails = {
          BusinessId: businessId,
          AgentId: agentId,
          AgentName: agentName,
          Pin: agentPin,
          Role: agentRole,
          Description: ""
        };

        agentDetails = JSON.stringify(agentDetails);

        $.LoadingOverlay("show");

        $.ajax({
          url: apiBaseUrl + "BusinessAgent",
          type: "POST",
          crossDomain: true,
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: agentDetails,
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: function(data) {
            if (data.status) {
              alertify.success(
                "Agent added successfully <br/> refreshing list ... "
              );
              setTimeout(function() {
                location.reload();
              }, 1500);
            } else {
              $.LoadingOverlay("hide");
              alertify.error(data.message);
            }
            resetBtn("save-agent", "Save");
          }
        });
      },
      function() {
        resetBtn("save-agent", "Save");
      }
    );
  });
});

$(function() {
  //EDIT AGENT (Populate Modal)
  $(document).on("click", ".edit-agent", function() {
    var agentId = $(this)
      //.parent()
      .parent().parent()
      .attr("data-agent-uid");

    $.ajax({
      url: apiBaseUrl + "BusinessAgent?businessAgentId=" + agentId,
      crossDomain: true,
      dataType: "json",
      method: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: function(data) {
        if (data.status) {
          data = data.data;
          console.log(data);
          $("#edit-agent-modal-title").text("Editing " + data.AgentName);
          $("#edit-agent-modal").modal("show");

          $("#update-agent-uid").val(data.BusinessAgentId);
          $("#update-agent-id").val(data.AgentId);
          $("#update-agent-name").val(data.AgentName);
          $("#update-agent-role").val(data.Role); //Select the current agent's role
          $("#update-agent-status").val(data.Status); //Select the current agent's status
        } else {
          alertify.error(data.message);
        }
      },
      error: function(err) {
        alertify.error("Something went wrong <br/>");
      },
      complete: function() {
        //$('#edit-agent-modal').modal('show');
      }
    });
  });

  //EDIT AGENT (Submit Update)
  $("#update-agent-submit").click(function() {
    var businessId = $("#business-id").val();
    var agentUid = $("#update-agent-uid").val();
    var agentId = $("#update-agent-id").val();
    var agentName = $("#update-agent-name").val();
    var agentStatus = $("#update-agent-status").val();
    var agentRole = $("#update-agent-role").val();

    var updateAgentDetails = {
      BusinessAgentId: agentUid,
      AgentId: agentId,
      AgentName: agentName,
      Status: agentStatus,
      Role: agentRole,
      Description: ""
    };

    updateAgentDetails = JSON.stringify(updateAgentDetails);

    $.ajax({
      url: apiBaseUrl + "BusinessAgent",
      type: "PUT",
      crossDomain: true,
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: updateAgentDetails,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: function(data) {
        if (data.status) {
          alertify.success(
            "Agent updated successfully <br/> refreshing list ... "
          );
          setTimeout(function() {
            location.reload();
          }, 1500);
        } else {
          alertify.error(data.message);
        }
      },
      error: function(err) {
        alertify.error("Something went wrong <br/>");
      },
      complete: function() {
        //$('#edit-agent-modal').modal('show');
      }
    });
  });

  //DELETE AGENT
  $(document).on("click", ".delete-agent", function() {
    var agentId = $(this)
      //.parent()//.parent()
      .parent().parent()
      .attr("data-agent-uid");
    var agentName = $(this)
      //.parent()
      .parent().parent()
      .attr("data-agent-name");
    alertify.confirm(
      "E-Pay Merchant Services",
      "Are you sure you want to delete " + agentName + "?",
      function() {
        $.LoadingOverlay("show");
        $.ajax({
          url: apiBaseUrl + "BusinessAgent/" + agentId,
          type: "DELETE",
          crossDomain: true,
          contentType: "application/json; charset=UTF-8",
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: function(data) {
            if (data.status) {
              alertify.success(
                "Agent deleted successfully <br/> Updating list ... "
              );
              setTimeout(function() {
                location.reload();
              }, 1500);
            } else {
              alertify.error(data.message);
            }
          },
          error: function(err) {
            alertify.error("Something went wrong <br/>");
          },
          complete: function() {
            $.LoadingOverlay("hide");
          }
        });
      },
      function() {
        //alertify.warning("Ok, we didn't do anything");
      }
    );
  });

  //CHANGE AGENT PIN
  $(document).on("click", ".edit-pin", function() {
    var agentId = $(this)
      //.parent()
      .parent().parent()
      .attr("data-agent-uid");
    var agentName = $(this)
      .parent().parent()
      .attr("data-agent-name");

    $("#agent-uid-pin-change").val(agentId);
    $("#agent-pin-modal-title").text("Changing Pin for " + agentName);
    $("#agent-pin-new").val("");
    $("#agent-pin-modal").modal("show");
  });

  //CHANGE AGENT PIN (Submit)
  $("#agent-pin-submit").click(function() {
    var agentId = $("#agent-uid-pin-change").val();
    var newPin = $("#agent-pin-new").val();

    if (newPin.length == 4) {
      $.ajax({
        url:
          apiBaseUrl +
          "BusinessAgent/PIN?businessAgentId=" +
          agentId +
          "&NewPin=" +
          newPin,
        crossDomain: true,
        dataType: "json",
        method: "PUT",
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function(data) {
          if (data.status) {
            alertify.success("Pin successfully changed");
            $("#agent-pin-modal").modal("hide");
          } else {
            alertify.error(data.message);
          }
        },
        error: function(err) {
          alertify.error("Something went wrong <br/>");
        },
        complete: function() {
          //$('#edit-agent-modal').modal('show');
        }
      });
    } else {
      alertify.error("Enter a valid pin");
    }
  });
});

function getAgents() {

  $.ajax({
    url: apiBaseUrl + "BusinessAgent/Agents?BusinessId=" + businessId,
    crossDomain: true,
    dataType: "json",
    method: "GET",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function(data) {

      var optionEdit = $("<td></td>").addClass("text-center")                
                        .append(
                          $("<i></i>").addClass(
                            "fa fa-edit d-inline-block mr-4 edit-agent"
                          )
                        );
      var optionDelete = $("<td></td>").addClass("text-center")
                        .append(
                          $("<i></i>").addClass(
                            "fa fa-times-circle d-inline-block text-danger delete-agent"
                          )
                        );
      var optionChangePin = $("<td></td>").addClass("text-center")                
                            .append(
                              $("<i></i>").addClass(
                                "fa fa-key d-inline-block mr-4 edit-pin"
                              )
                            );
      var optionNone = $("<td></td>");

      
      $("#agents-list").html(" ");
      if (data.status) {
        var data = data.data;
        
        for (i = 0; i < data.length; i++) {
          var agent = data[i];

          agentOptionsModified(agent);
        
/*           console.log(agentRole);
          var row;
          if(agent.Status == "Inactive"){
            row = $("<tr></tr>").addClass("bg-danger text-light");
           }else{
             row = $("<tr></tr>").addClass("bg-success text-light");
           }

           //var options = agentOptions(agent.Id, agent.AgentID, agent.AgentName, agent.Role);
          //Add Agent to Table
          row.attr({
            "data-agent-uid": agent.Id,
            "data-agent-id": agent.AgentID,
            "data-agent-name": agent.AgentName
          })
          .append(
            $("<td></td>").text(agent.AgentID),
            $("<td></td>").text(agent.AgentName),
            //$("<td></td>").text(agent.Status),
            $("<td></td>").text(agent.Role),
            
            //agentOptions(agent.Id, agent.AgentID, agent.AgentName, agent.Role)
            //$("<td></td>").text(agent.Created.substring(0, 10)), // Make date more user friendly
            )
            .appendTo("#agents-list")
            .hide()
            .fadeIn(500); */

//           if(agent.Role != "SADMIN"){ 
//             $("<tr></tr>").attr({"data-agent-uid": agent.Id})
//             .append(
//               $("<td></td>").text(agent.AgentID),
//               $("<td></td>").text(agent.AgentName),
//               $("<td></td>").text(agent.Status),
//               $("<td></td>").text(agent.Role),
//               $("<td></td>").text(agent.Created.substring(0, 10)), // Make date more user friendly
// /*               $("<td></td>")
//                 .attr({
//                   "data-agent-uid": agent.Id,
//                   "data-agent-id": agent.AgentID,
//                   "data-agent-name": agent.AgentName
//                 })
//                 .addClass("float-right")
//                 .append(
//                   $("<i></i>").addClass(
//                     "fa fa-edit d-inline-block mr-4 edit-agent"
//                   )
//                 )
//                 .append(
//                   $("<i></i>").addClass(
//                     "fa fa-key d-inline-block mr-4 edit-pin"
//                   )
//                 )
//                 .append(
//                   $("<i></i>").addClass(
//                     "fa fa-times-circle d-inline-block text-danger delete-agent"
//                   )
//                 ) */
//             )
//             .appendTo("#agents-list")
//             .hide()
//             .fadeIn(500);
            
//             $("<tr></tr>")
//                 .attr({
//                 "data-agent-uid": agent.Id,
//                 "data-agent-id": agent.AgentID,
//                 "data-agent-name": agent.AgentName
//               }).append(
//               $("<td></td>").addClass("text-center")                
//               .append(
//                 $("<i></i>").addClass(
//                   "fa fa-edit d-inline-block mr-4 edit-agent"
//                 )
//               ),
//               $("<td></td>"),
//               $("<td></td>").addClass("text-center")                
//               .append(
//                 $("<i></i>").addClass(
//                   "fa fa-key d-inline-block mr-4 edit-pin"
//                 )
//               ),
//               $("<td></td>"),
//               $("<td></td>").addClass("text-center")
//                   .append(
//                     $("<i></i>").addClass(
//                       "fa fa-times-circle d-inline-block text-danger delete-agent"
//                     )
//                   )
//             ).appendTo("#agents-list")
//             .hide()
//             .fadeIn(500);
//           }
          }             
      } else {
        alertify.error(data.message);
      }
    },
    error: function(err) {
      alertify.error("Something went wrong <br/>");
    },
    complete: function() {
      tableUtil();
    }
  });
}

function tableUtil() {
  $("#agents-table").DataTable({
    responsive: true,
    "bInfo" : false,
    "order": [],
/*    columnDefs: [
      {
        targets: [4],
        searchable: false,
        sortable: false
      }
    ] */ 
  });
}

/* function agentOptionsModified(agent) {

//   SADMIN:
//   •	Can change their own PIN
//   •	Can change all ADMIN PINs
//   •	Can change all AGENT PINs
//   •	Can edit all ADMIN info
//   •	Can edit all AGENT info
  
//   ADMIN:
//   •	Can change their own PIN
//   •	Can change all AGENT PINs
//   •	Can edit all AGENT info
  
//   AGENT:
//   •	Cannot Access Agent Management 
  
  var row;
  if (agent.Status == "Inactive") {
    row = $("<tr></tr>").addClass("text-danger");
  } else {
    row = $("<tr></tr>").addClass("");
  }

  if (agentRole == "ADMIN" && businessAgentId == agent.Id) {
    row.attr({
      "data-agent-uid": agent.Id,
      "data-agent-id": agent.AgentID,
      "data-agent-name": agent.AgentName
    })
      .append(
        $("<td></td>").text(agent.AgentID),
        $("<td></td>").text(agent.AgentName),
        $("<td></td>").text(agent.Role),
        $("<td></td>").addClass("text-center")
          .append(
            $("<i></i>").addClass(
              "fa fa-edit d-inline-block mr-4 edit-agent"
            )
          ),
        $("<td></td>").addClass("text-center")
          .append(
            $("<i></i>").addClass(
              "fa fa-key d-inline-block mr-4 edit-pin"
            )
          ),
        $("<td></td>").addClass("text-center")
          .append(
            $("<i></i>").addClass(
              "fa fa-times-circle d-inline-block text-danger delete-agent"
            )
          )
      )
      .appendTo("#agents-list")
      .hide()
      .fadeIn(500);
  }

  else if (agentRole == "ADMIN" && agent.Role == "ADMIN" && businessAgentId != agent.Id) {
    row.attr({
      "data-agent-uid": agent.Id,
      "data-agent-id": agent.AgentID,
      "data-agent-name": agent.AgentName
    })
      .append(
        $("<td></td>").text(agent.AgentID),
        $("<td></td>").text(agent.AgentName),
        $("<td></td>").text(agent.Role),
        $("<td></td>"),
        $("<td></td>"),
        $("<td></td>")
      )
      .appendTo("#agents-list")
      .hide()
      .fadeIn(500);
  }

  else if (agentRole == "SADMIN" && businessAgentId == agent.Id) {
    row.attr({
      "data-agent-uid": agent.Id,
      "data-agent-id": agent.AgentID,
      "data-agent-name": agent.AgentName
    })
      .append(
        $("<td></td>").text(agent.AgentID),
        $("<td></td>").text(agent.AgentName),
        $("<td></td>").text(agent.Role),
        $("<td></td>").addClass("text-center")
          .append(
            $("<i></i>").addClass(
              "fa fa-edit d-inline-block mr-4 edit-agent"
            )
          ),
        $("<td></td>").addClass("text-center")
          .append(
            $("<i></i>").addClass(
              "fa fa-key d-inline-block mr-4 edit-pin"
            )
          ),
        $("<td></td>")
      )
      .appendTo("#agents-list")
      .hide()
      .fadeIn(500);
  }

  else if (agentRole == "SADMIN" && agent.Role == "SADMIN" && businessAgentId != agent.Id) {
    row.attr({
      "data-agent-uid": agent.Id,
      "data-agent-id": agent.AgentID,
      "data-agent-name": agent.AgentName
    })
      .append(
        $("<td></td>").text(agent.AgentID),
        $("<td></td>").text(agent.AgentName),
        $("<td></td>").text(agent.Role),
        $("<td></td>"),
        $("<td></td>"),
        $("<td></td>")
      )
      .appendTo("#agents-list")
      .hide()
      .fadeIn(500);
  }

  else if (agentRole == "SADMIN" && agent.Role == "ADMIN" && businessAgentId != agent.Id) {
    row.attr({
      "data-agent-uid": agent.Id,
      "data-agent-id": agent.AgentID,
      "data-agent-name": agent.AgentName
    })
      .append(
        $("<td></td>").text(agent.AgentID),
        $("<td></td>").text(agent.AgentName),
        $("<td></td>").text(agent.Role),
        $("<td></td>").addClass("text-center")
          .append(
            $("<i></i>").addClass(
              "fa fa-edit d-inline-block mr-4 edit-agent"
            )
          ),
        $("<td></td>").addClass("text-center")
          .append(
            $("<i></i>").addClass(
              "fa fa-key d-inline-block mr-4 edit-pin"
            )
          ),
        $("<td></td>").addClass("text-center")
          .append(
            $("<i></i>").addClass(
              "fa fa-times-circle d-inline-block text-danger delete-agent"
            )
          )
      )
      .appendTo("#agents-list")
      .hide()
      .fadeIn(500);
  }

  else if (agent.Role != "SADMIN" && agent.Role != "ADMIN") {
    row.attr({
      "data-agent-uid": agent.Id,
      "data-agent-id": agent.AgentID,
      "data-agent-name": agent.AgentName
    })
      .append(
        $("<td></td>").text(agent.AgentID),
        $("<td></td>").text(agent.AgentName),
        $("<td></td>").text(agent.Role),
        $("<td></td>").addClass("text-center")
          .append(
            $("<i></i>").addClass(
              "fa fa-edit d-inline-block mr-4 edit-agent"
            )
          ),
        $("<td></td>").addClass("text-center")
          .append(
            $("<i></i>").addClass(
              "fa fa-key d-inline-block mr-4 edit-pin"
            )
          ),
        $("<td></td>").addClass("text-center")
          .append(
            $("<i></i>").addClass(
              "fa fa-times-circle d-inline-block text-danger delete-agent"
            )
          )
      )
      .appendTo("#agents-list")
      .hide()
      .fadeIn(500);
  }
} */


function agentOptionsModified(agent) {

  /*   SADMIN:
    •	Can change their own PIN
    •	Can change all ADMIN PINs
    •	Can change all AGENT PINs
    •	Can edit all ADMIN info
    •	Can edit all AGENT info
    
    ADMIN:
    •	Can change their own PIN
    •	Can change all AGENT PINs
    •	Can edit all AGENT info
    
    AGENT:
    •	Cannot Access Agent Management */
    
    var row;
    if (agent.Status == "Inactive") {
      row = $("<tr></tr>").addClass("text-danger");
    } else {
      row = $("<tr></tr>").addClass("");
    }
  
    if (agentRole == "ADMIN" && businessAgentId == agent.Id) {
      row.attr({
        "data-agent-uid": agent.Id,
        "data-agent-id": agent.AgentID,
        "data-agent-name": agent.AgentName
      })
        .append(
          $("<td></td>").text(agent.AgentID),
          $("<td></td>").text(agent.AgentName),
          $("<td></td>").text(agent.Role),
          $("<td></td>").addClass("text-center")
            .append(
              $("<button></button>").addClass(
                "btn btn-sm btn-success edit-agent"
              ).text("Edit")
            ),
          $("<td></td>").addClass("text-center")
            .append(
              $("<button></button>").addClass(
                "btn btn-sm btn-info edit-pin"
              ).text("Edit Pin")
            ),
          $("<td></td>").addClass("text-center")
            .append(
              $("<button></button>").addClass(
                "btn btn-sm btn-danger delete-agent"
              ).text("Delete")
            )
        )
        .appendTo("#agents-list")
        .hide()
        .fadeIn(500);
    }
  
    else if (agentRole == "ADMIN" && agent.Role == "ADMIN" && businessAgentId != agent.Id) {
      row.attr({
        "data-agent-uid": agent.Id,
        "data-agent-id": agent.AgentID,
        "data-agent-name": agent.AgentName
      })
        .append(
          $("<td></td>").text(agent.AgentID),
          $("<td></td>").text(agent.AgentName),
          $("<td></td>").text(agent.Role),
          $("<td></td>"),
          $("<td></td>"),
          $("<td></td>")
        )
        .appendTo("#agents-list")
        .hide()
        .fadeIn(500);
    }
  
    else if (agentRole == "SADMIN" && businessAgentId == agent.Id) {
      row.attr({
        "data-agent-uid": agent.Id,
        "data-agent-id": agent.AgentID,
        "data-agent-name": agent.AgentName
      })
        .append(
          $("<td></td>").text(agent.AgentID),
          $("<td></td>").text(agent.AgentName),
          $("<td></td>").text(agent.Role),
          $("<td></td>").addClass("text-center")
            .append(
              $("<button></button>").addClass(
                "btn btn-sm btn-success edit-agent"
              ).text("Edit")
            ),
          $("<td></td>").addClass("text-center")
            .append(
              $("<button></button>").addClass(
                "btn btn-sm btn-info edit-pin"
              ).text("Edit Pin")
            ),
          $("<td></td>")
        )
        .appendTo("#agents-list")
        .hide()
        .fadeIn(500);
    }
  
    else if (agentRole == "SADMIN" && agent.Role == "SADMIN" && businessAgentId != agent.Id) {
      row.attr({
        "data-agent-uid": agent.Id,
        "data-agent-id": agent.AgentID,
        "data-agent-name": agent.AgentName
      })
        .append(
          $("<td></td>").text(agent.AgentID),
          $("<td></td>").text(agent.AgentName),
          $("<td></td>").text(agent.Role),
          $("<td></td>"),
          $("<td></td>"),
          $("<td></td>")
        )
        .appendTo("#agents-list")
        .hide()
        .fadeIn(500);
    }
  
    else if (agentRole == "SADMIN" && agent.Role == "ADMIN" && businessAgentId != agent.Id) {
      row.attr({
        "data-agent-uid": agent.Id,
        "data-agent-id": agent.AgentID,
        "data-agent-name": agent.AgentName
      })
        .append(
          $("<td></td>").text(agent.AgentID),
          $("<td></td>").text(agent.AgentName),
          $("<td></td>").text(agent.Role),
          $("<td></td>").addClass("text-center")
            .append(
              $("<button></button>").addClass(
                "btn btn-sm btn-success edit-agent"
              ).text("Edit")
            ),
          $("<td></td>").addClass("text-center")
            .append(
              $("<button></button>").addClass(
                "btn btn-sm btn-info edit-pin"
              ).text("Edit Pin")
            ),
          $("<td></td>").addClass("text-center")
            .append(
              $("<button></button>").addClass(
                "btn btn-sm btn-danger delete-agent"
              ).text("Delete")
            )
        )
        .appendTo("#agents-list")
        .hide()
        .fadeIn(500);
    }
  
    else if (agent.Role != "SADMIN" && agent.Role != "ADMIN") {
      row.attr({
        "data-agent-uid": agent.Id,
        "data-agent-id": agent.AgentID,
        "data-agent-name": agent.AgentName
      })
        .append(
          $("<td></td>").text(agent.AgentID),
          $("<td></td>").text(agent.AgentName),
          $("<td></td>").text(agent.Role),
          $("<td></td>").addClass("text-center")
            .append(
              $("<button></button>").addClass(
                "btn btn-sm btn-success edit-agent"
              ).text("Edit")
            ),
          $("<td></td>").addClass("text-center")
            .append(
              $("<button></button>").addClass(
                "btn btn-sm btn-info edit-pin"
              ).text("Edit Pin")
            ),
          $("<td></td>").addClass("text-center")
            .append(
              $("<button></button>").addClass(
                "btn btn-sm btn-danger delete-agent"
              ).text("Delete")
            )
        )
        .appendTo("#agents-list")
        .hide()
        .fadeIn(500);
    }
  }