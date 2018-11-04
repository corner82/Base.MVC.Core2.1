/*
* user register Form
* @author Ceydacan Seyrek
* @since 04/11/2018
*/
$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });

    $('#loadingImage_DdslickRole').loadImager();
    $('#loadingImage_DdslickBranch').loadImager();



    $('#loadingImage_DdslickBranch').loadImager('removeLoadImage');
    $("#loadingImage_DdslickBranch").loadImager('appendImage');
    http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkBranchesDealersDeffDdList_sysbranchesdealersdeff&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_branch = $('#ajax_Branch').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickBranch",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkBranchesDealersDeffDdList_sysbranchesdealersdeff",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_branch.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataloc) {

            var cbdata_loc = $.parseJSON(dataloc);
            cbdata_loc.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickBranch').ddslick({
                data: cbdata_loc,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickBranch').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickBranch').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_branch.ajaxCallWidget('call');

    var cbdata_role = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 0,
            selected: true
        },
        {
            text: "Salesman",
            value: 1,
            selected: false
        },
        {
            text: "head of retail",
            value: 2,
            selected: false
        },
        {
            text: "head of pcd",
            value: 3,
            selected: false
        },
        {
            text: "head of product management",
            value: 4,
            selected: false
        },
        {
            text: "body builder specialist",
            value: 5,
            selected: false
        },
        {
            text: "sales admin manager",
            value: 6,
            selected: false
        },
        {
            text: "costing manager",
            value: 7,
            selected: false
        },
        {
            text: "head of order management",
            value: 8,
            selected: false
        },
        {
            text: "fd",
            value: 9,
            selected: false
        },
        {
            text: "md",
            value: 10,
            selected: false
        },
        {
            text: "master users",
            value: 11,
            selected: false
        },
        {
            text: "hos",
            value: 12,
            selected: false
        }];

    $('#loadingImage_DdslickRole').loadImager('removeLoadImage');
    $("#loadingImage_DdslickRole").loadImager('appendImage');

    $('#ddslickRole').ddslick({
        //height: 150,
        data: cbdata_role,
        width: '100%',

        onSelected: function (selectedData) {
            if (selectedData.selectedData.value > 0) {
                document.getElementById("txt_Role").value = selectedData.selectedData.text;
            }
        }
    });
    $('#loadingImage_DdslickRole').loadImager('removeLoadImage');



    //save user onclick
    $("#btn-registerUser-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        //if ($("#trainingIdentForm").validationEngine('validate')) {

            //window.insertTrainingName = function () {

        $("#loadingImage_DdslickRole").loadImager('removeLoadImage');
        $("#loadingImage_DdslickRole").loadImager('appendImage');

        var user_name = $('#txt_UserName').val();
        var user_email = $('#txt_UserName').val();
        var role = $('#txt_Role').val();
        var password = $('#txt_Password').val();
        var password_retype = $('#txt_PasswordRetype').val();
        var ddDataBranch = $('#ddslickBranch').data('ddslick');
        if (!ddDataBranch.selectedData.value > 0) {
            var branch = 0 ;
        }
        else {
            var branch = ddDataBranch.selectedData.value;
        }

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php? url= pkInsertAct_syseducationdefinitions &name=aracdescriptioni &pk=GsZVzEYe50uGgNM
            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateAct_syseducationdefinitions&name=appleee&pk=GsZVzEYe50uGgNM&id=3

                var ajax_InsertRegisterUser = $('#ajax_insert').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_DdslickRole",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                    proxy: '/Acc/AddRegisterUser',
                    type: 'POST',
                    data: JSON.stringify({
                        url: "pkInsertAct_syseducationdefinitions",
                        user_name: user_name,
                        user_email: user_email,
                        role: role,
                        branch: branch,
                        password: password,
                        password_retype: password_retype,
                        pk: "GsZVzEYe50uGgNM",
                    })
                });
                ajax_InsertRegisterUser.ajaxCallWidget({
                    onReset: function (event, data) {
                        //resetTrainingIdentForm();
                    },
                    onAfterSuccess: function (event, data) {
                        //$("#gridContainer_trainingName").dxDataGrid("instance").refresh();
                    }
                })
                ajax_InsertRegisterUser.ajaxCallWidget('call');

            return false;
        //}
    })


});
