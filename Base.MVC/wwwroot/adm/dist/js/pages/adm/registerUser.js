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

    /*
    * retyuLoadImager
    * @author Ceydacan Seyrek
    * @since 04/11/2018
    */
    //to user register form

    $("#loadingImage_DdslickBranch").loadImager();
    $("#loadingImage_DdslickRole").loadImager();


    //branch
    $('#loadingImage_DdslickBranch').loadImager('removeLoadImage');
    $("#loadingImage_DdslickBranch").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkBranchesDealersDeffDdList_sysbranchesdealersdeff&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_branch = $('#ajax_DdslickBranch').ajaxCallWidget({
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
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickBranch').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickBranch').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_branch.ajaxCallWidget('call');
    //branch End


    //role
    $('#loadingImage_DdslickRole').loadImager('removeLoadImage');
    $("#loadingImage_DdslickRole").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkBranchesDealersDeffDdList_sysbranchesdealersdeff&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_role = $('#Role').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickRole",
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

    ajaxACLResources_role.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datarole) {

            var cbdata_role = $.parseJSON(datarole);
            cbdata_role.splice(0, 0,
                { text: window.lang.translate('Salesman'), value: 0, selected: false, description: "" }
            );

            $('#Role').ddslick({
                data: cbdata_role,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickRole').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickRole').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_role.ajaxCallWidget('call');
    //role End

});

