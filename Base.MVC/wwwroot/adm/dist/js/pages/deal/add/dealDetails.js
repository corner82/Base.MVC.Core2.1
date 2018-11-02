$(document).ready(function () {

    //----------------------------------loadImager begin-------------------------------------------------
    
    //----------------------------------loadImager end-------------------------------------------------

    
    window.openSummary = function (data) {
        var rowData = data;
        var dealID = $("#deal_hidden").deal("getDealID");
        
        if ($("#row_hidden").css('display') == 'none') {
            /*alert('hidden');
            alert(dataID);*/
            hidden_block1_controller = 2;
            $("#row_hidden").animate({ height: 'toggle' }, 1000);
            $("#row_hidden_title").html(window.lang.translate('Deal summ.'));

            var ajax = $('#row_hidden').ajaxCallWidget({
                failureLoadImage: true,
                triggerSuccessAuto: false,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillDealMainShortGridx_infoproject",
                    pkIdentity: $("#publicKey").val(),
                    project_id: parseInt(dealID),
                })

            });
            ajax.ajaxCallWidget({
                onSuccess: function (event, data) {
                    //console.log(data);
                    var data = $.parseJSON(data);
                    //console.log(data.items);
                    //console.log(data.items[0].value1);
                    $("#sumNum1").html(data.items[0].value1);
                    $("#sumNum2").html(data.items[0].value2);
                    $("#sumNum3").html(data.items[0].value3);

                    $("#sumA1").html(data.items[0].text1);
                    $("#sumA2").html(data.items[0].text2);
                    $("#sumA3").html(data.items[0].text3);
                }
            })
            ajax.ajaxCallWidget('call');



        } else {
            /*alert('not hidden');
            alert(dataID);*/
            $("#row_hidden").css('display', 'none');
            $("#row_hidden").animate({ height: 'toggle' }, 1000);
            //$("#gridContainer_det1").dxDataGrid('instance').refresh();

            var ajax = $('#row_hidden').ajaxCallWidget({
                failureLoadImage: true,
                triggerSuccessAuto: false,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                proxy: '/DefaultPost/DefaultPostModel',
                type: "POST",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillDealMainShortGridx_infoproject",
                    pkIdentity: $("#publicKey").val(),
                    project_id: parseInt(dealID),
                })

            });
            ajax.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    //console.log(data.items);
                    //console.log(data.items[0].value1);
                    $("#sumNum1").html(data.items[0].value1);
                    $("#sumNum2").html(data.items[0].value2);
                    $("#sumNum3").html(data.items[0].value3);

                    $("#sumA1").html(data.items[0].text1);
                    $("#sumA2").html(data.items[0].text2);
                    $("#sumA3").html(data.items[0].text3);
                }
            })
            ajax.ajaxCallWidget('call');


        }

    }

});