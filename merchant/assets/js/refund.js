var transactionId;
$(document).ready(function () {

    console.log(businessAgentId);

    transactionId = localStorage.getItem("transactionId");
    localStorage.removeItem("transactionId");

    $.LoadingOverlay("show");

    $.ajax({
        url: apiBaseUrl + "MerchantPortal/Transaction?id=" + transactionId,
        crossDomain: true,
        dataType: "json",
        method: "GET",
        beforeSend: function (xhr)
        {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function (data)
        {
            if (data.status)
            {
                var info = data.data;
                $("#order-number").text(info.OrderNumber);
                $("#Amount").text("$" + info.Amount.toFixed(2));
                $("#Description").text(info.Description);
                $("#Note").text(info.Note);
                $("#Agent").text(info.BusinessbusinessAgentId);
                $("#Date").text(info.Created);
            }
            else
            {
                alertify.warning("No transaction found");
            }
        },
        error: function (err)
        {
            alertify.error("Something went wrong, try again");
        },
        complete: function ()
        {
            $.LoadingOverlay("hide");//hide ajax loader
        }
    });
});

$(function () {

    //EDIT AGENT (Submit Update)
    $("#Cancel").click(function () {
        window.location.href = "refunds.php";
    });

    $("#Refund").click(function () {
        $("#edit-agent-modal").modal("show");
    });

    //EDIT AGENT (Submit Update)
    $("#refund-submit").click(function () {
        var Description = $("#refund-description").val();
        //TODO CHANGE BUSINESS AGENT ID TO VAL FROM SESSION 
        $.ajax({
            url: apiBaseUrl + "Transaction/Refund?BusinessAgentId=" + businessAgentId + "&TransactionId=" + transactionId+"&RefundDescription=" + Description+"&DeviceName=Computer&Longitude="+10+"&Latitude="+10,
            crossDomain: true,
            dataType: "json",
            method: "POST",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (data)
            {
                if (data.status)
                {
                    alertify.success("Transaction Refunded.");

                    window.location.href = "refundreport.php";
                }
                else
                {
                    alertify.error(data.message);
                }
            },
            error: function (err) {
                alertify.error("Something went wrong <br/>");
            },
            complete: function () {
                //$('#edit-agent-modal').modal('show');
            }
        });
    });
});