$(document).ready(function () {

    

    var dealID;

   /* $.ajax({
        url: '/Home/IndexGet',
        type: 'POST',
        data: JSON.stringify({
            //missing brackets
                Address1: '423 Judy Road',
                Address2: '1001',
                City: 'New York',
                State: 'NY',
                ZipCode: '10301',
                Country: "USA"
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            alert(data.success);
        },
        error: function () {
            alert("error");
        }
    });*/

    var ajax_PostObjectTypeParameter = $(window).ajaxCallWidget({
        proxy: '/Home/IndexPostObjectParameter',
        type: 'POST',
        data: JSON.stringify({
            //missing brackets
            Address1: '423 Judy Road',
            Address2: '1001',
            City: 'New York',
            State: 'NY',
            ZipCode: '10301',
            Country: "USA"
        }),
    });
    ajax_PostObjectTypeParameter.ajaxCallWidget('call');


    var ajax_PostPrimitiveTypeParameterFromHeader = $(window).ajaxCallWidget({
        proxy: '/Home/IndexPostPrimitiveTypeParameterFromHeader',
        headers: {
            "myFirstHeader": "first value",
            "MySecondHeader": "second value"
        },
        type: 'POST',
    });
    ajax_PostPrimitiveTypeParameterFromHeader.ajaxCallWidget('call');

    var ajax_PostPrimitiveTypeParameter = $(window).ajaxCallWidget({
        proxy: '/Home/IndexPostPrimitiveTypeParameter',
        //contentType: "application/x-www-form-urlencoded",
        type: 'POST',
        //dataType: '*/*',
        //data: "addressInfo=test",
        data: JSON.stringify("www test")
    });
    ajax_PostPrimitiveTypeParameter.ajaxCallWidget('call');

    var ajax_GetObjectTypeParameter = $(window).ajaxCallWidget({
        proxy: '/Home/IndexGetObjectParameter',
        type: 'GET',
        data: {
            //missing brackets
            Address1: '423 Judy Road',
            Address2: '1001',
            City: 'New York',
            State: 'NY',
            ZipCode: '10301',
            Country: "USA"
        },
    });
    ajax_GetObjectTypeParameter.ajaxCallWidget('call');

    


    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });

    //offline loading-image
    //$("#offlineWrapperImager").loadImager();
    // offline up event handler
   /* Offline.on("up", function () {
        $("#offlineWrapperImager").loadImager('removeLoadImage');
    });*/
    // offline down event handler
    /*Offline.on("down", function () {
        $("#offlineWrapperImager").loadImager('appendImage');
    });*/

   // $.getScript({ url: "loadingImages.js", cache: true });
    
  //Make the dashboard widgets sortable Using jquery UI
  $(".connectedSortable").sortable({
    placeholder: "sort-highlight",
    connectWith: ".connectedSortable",
    handle: ".box-header, .nav-tabs",
    forcePlaceholderSize: true,
    zIndex: 999999
  });
    $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");

    $(document).click(function (event) {
        /*alert(event.target.nodeName);
        alert($(event.target).data('nodejs-log'));
        alert('session id =>' + localStorage.getItem('sessionID'));
        alert('user name =>' + localStorage.getItem('userName'));
        alert('user IP =>' + localStorage.getItem('userIP'));*/
        var test = event.target;
        //alert(test.attr('data-toggle'));

        //var socket = io.connect('https://localhost:8444');
        //var socket = io.connect('http://localhost:3000', { reconnect: true });
        /*var $messageForm = $('#send-message');
        var $messageBox = $('#chat-input');*/

        /*$messageForm.submit(function (e) {
            e.preventDefault();
            socket.emit('send message', 'click message');
            //$messageBox.val('');
        })*/
        var msg = '{ "UserName" : "' + localStorage.getItem('userName') + '","Host" : "localhost:3000","Action": "' + $("#requestUriRegulated").val() + '","Controller":"' + $("#requestUriRegulated").val() + '","Port":"3000","UserAgent":"Chrome","UserIP":"127.0.0.1","Method":"Demo","SessionID": "' + localStorage.getItem('sessionID')+'","UserToken":"ssssss","UserPublicKey":"' + $("#publicKey").val() +'"}';
        //socket.emit('send message', 'click message');
        //socket.emit('send message', msg);

        /*socket.on('new message', function (data) {
            $('.panel-body').append(data + '<br/>');
        })*/
    });
  
  //jQuery UI sortable for the todo list
  $(".todo-list").sortable({
    placeholder: "sort-highlight",
    handle: ".handle",
    forcePlaceholderSize: true,
    zIndex: 999999
    });

    // vehicle type date picker
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-1d'
    });


    // deal campaign asider 
    $('#campaignAddAside').asideRight({
        width: "900"
    });
    $('#campaignAddAside').asideRight({
        onOpening: function (event, element) {
            //console.log(element);
            //alert('onopening event right slider');
        }
    });

    $('#campaignAddAside').asideRight({
        onOpened: function (event, element) {
            //alert('onopened event right slider');
        }
    });

    $('#campaignAddAside').asideRight({
        onClosing: function (event, element) {
            //alert('onclosing event right slider');
        }
    });

    $('#campaignAddAside').asideRight({
        onClosed: function (event, element) {
            //alert('onclosed event right slider');
        }
    });
    //tab 2_1 side bar panel left toggle
    $("#toggle_CampaignAsider").on("click", function (e) {
        e.preventDefault();
        // $(".sidebar.left").sidebar().trigger("sidebar:open");
        //alert('test');
        
        //alert($(this).offset().top);
        $('#campaignAddAside').asideRight('setFromTop', (parseFloat($(this).offset().top))-500);
        $('#campaignAddAside').asideRight('toggle');
    });

    $("#toggle_closeCampaignAside").on("click", function () {
        $('#campaignAddAside').asideRight('toggle');
    });


//----------------------------------add  deal begin-------------------------------------------------

    /**
     * loading image for add deal process
     * */
    $('#tab_DealAttr').loadImager(); 

    /**
     * add deal form reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetDealAddForm = function () {
        $('#addDealForm').validationEngine('hide');
        $('#addDealForm')[0].reset(); 
        $('#ddslickCustomer').ddslick("select", { index: '0' });
        $('#ddslickPriority').ddslick("select", { index: '0' });
        $('#ddslickRealizationRate').ddslick("select", { index: '0' });
       /* $('#dropdownLicenseResult').ddslick('selectByValue',
            { index: '0' }*/
    }

    /**
     * add deal form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addDealForm").validationEngine();

    /**
     * add deal click event handler
     * @author Mustafa Zeynel Dağlı
     * @todo deal id js değişkene atılacak
     * @ajax call değişkeni standart lokal değişken yapılacak
     * */
    $("#add_deal").on("click", function (e) {
        e.preventDefault();
        $('#tab_DealAttr').loadImager('removeLoadImage');
        $("#tab_DealAttr").loadImager('appendImage');

        var ddDataCustomer = $('#ddslickCustomer').data('ddslick');
        var ddDataPriority = $('#ddslickPriority').data('ddslick');
        var ddDataRealizationRate = $('#ddslickRealizationRate').data('ddslick');
        
        if (!ddDataCustomer.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select customer"),
                window.lang.translate("Please select customer"));
            $('#tab_DealAttr').loadImager('removeLoadImage');
            return false;
        }

        var ajax_DdslickCustomer = $('#ajax_DdslickCustomer').ajaxCallWidget({
            proxy: '/Deal/AddDealProxyService',
            type: "POST",
            data: JSON.stringify({
                language_code: $("#langCode").val(),
                pk: "GsZVzEYe50uGgNM",
                url: "pkInsertAct_infoproject",
                pkIdentity: $("#publicKey").val(),
                customer_id: ddDataCustomer.selectedData.value,
                is_house_deal: 0,
                probability_id: ddDataPriority.selectedData.value,
                reliability_id: ddDataRealizationRate.selectedData.value,
                description: $("#description").val(),
                discount_rate: $("#description").val()

            })

        });
        ajax_DdslickCustomer.ajaxCallWidget({
            onError: function (event, textStatus, errorThrown) {

                $(window).dangerMessage({
                    onShown: function () {
                        $('#tab_DealAttr').loadImager('removeLoadImage');
                    }
                });
                $(window).dangerMessage('resetOnShown');
                $(window).dangerMessage('show', window.lang.translate('Unsuccessful transaction'),
                                                window.lang.translate('Unsuccessful transaction'));
                resetDealAddForm();
            },
            onSuccess: function (event, data) {

                sm.successMessage('show', window.lang.translate('Transaction successful'),
                                          window.lang.translate('Transaction successful'),
                                          data);
                $("#tab_DealAttr").loadImager('removeLoadImage');
                //dealID = data.
                //console.log(dealID);
                resetDealAddForm();
            },
            onErrorDataNull: function (event, data) {
                //console.log("Error : " + event + " -data :" + data);
                $(window).dangerMessage({
                    onShown: function () {
                        $('#tab_DealAttr').loadImager('removeLoadImage');
                    }
                });
                $(window).dangerMessage('show', window.lang.translate('Unsuccessful transaction'),
                    window.lang.translate('Unsuccessful transaction'));
                resetDealAddForm();
            },
        })
        ajax_DdslickCustomer.ajaxCallWidget('call');
        return false;
    })

    // add deal reset
    $("#add_deal_reset").on("click", function (e) {
        e.preventDefault();
        resetDealAddForm();
        return false;
    })

//----------------------------------add  deal end-------------------------------------------------


//----------------------------------add vehicle type to deal begin-------------------------------------------------

    /**
     * loading image for add vehicle type process
     * */
    $('#tab_VehicleType').loadImager();

    /**
     * add deal form reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetVehicleTypeAddDealForm = function () {
        $('#addVehicleTypeForm').validationEngine('hide');
        $('#addVehicleTypeForm')[0].reset();
        $('#ddslickVehicleType').ddslick("select", { index: '0' });

    }

    /**
     * add vehicle type form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addVehicleTypeForm").validationEngine();

    /**
     * add deal click event handler
     * @author Mustafa Zeynel Dağlı
     * @todo deal is js lokal değişkenden alınacak
     * */
    $("#add_vehicleType").on("click", function (e) {
        e.preventDefault();
        $('#tab_VehicleType').loadImager('removeLoadImage');
        $("#tab_VehicleType").loadImager('appendImage');

        var ddDataVehicleType = $('#ddslickVehicleType').data('ddslick');
        if (!ddDataVehicleType.selectedData.value > 0) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
                window.lang.translate("Please select vehicle type"));
            $('#tab_VehicleType').loadImager('removeLoadImage');
            return false;
        }

        var ajax = $('#ajax_DdslickVehicleType').ajaxCallWidget({
            proxy: '/Deal/AddVehicleTypeProxyService',
            type: "POST",
            data: JSON.stringify({
                language_code: $("#langCode").val(),
                pk: "GsZVzEYe50uGgNM",
                url: "pkInsertAct_infoprojectvehiclemodels",
                pkIdentity: $("#publicKey").val(),
                project_id: 1,
                is_house_deal: 0,
                vehicle_gt_model_id: ddDataVehicleType.selectedData.value,
                quantity: $("#quantity").val(),
                delivery_date: "10/10/2018",
            })

        });
        ajax.ajaxCallWidget({
            onError: function (event, textStatus, errorThrown) {

                $(window).dangerMessage({
                    onShown: function () {
                        $('#tab_VehicleType').loadImager('removeLoadImage');
                    }
                });
                $(window).dangerMessage('resetOnShown');
                $(window).dangerMessage('show', window.lang.translate('Unsuccessful transaction'),
                    window.lang.translate('Unsuccessful transaction'));
                resetVehicleTypeAddDealForm();
            },
            onSuccess: function (event, data) {
                var data = $.parseJSON(data);
                console.log(data);
                console.log(data.found);
                alert(data.found);
                
                if (data.found === 'true') {
                    $(window).successMessage('resetOnShown');
                    sm.successMessage('show', window.lang.translate('Transaction successful'),
                                              window.lang.translate('Transaction successful'),
                                              data);
                } else {
                    $(window).dangerMessage('resetOnShown');
                    $(window).dangerMessage('show', window.lang.translate('Unsuccessful transaction'),
                        window.lang.translate('Unsuccessful transaction'));
                }
                
                $("#tab_VehicleType").loadImager('removeLoadImage');
                //dealID = data.
                //console.log(dealID);
                resetVehicleTypeAddDealForm();
            },
            onError23505: function (event, data) {
                $(window).dangerMessage('resetOnShown');
                $(window).dangerMessage('show', window.lang.translate('Unsuccessful transaction'),
                    window.lang.translate('Unsuccessful transaction'));
                $("#tab_VehicleType").loadImager('removeLoadImage');
                //dealID = data.
                //console.log(dealID);
                resetVehicleTypeAddDealForm();
                
            },
            onErrorDataNull: function (event, data) {
                //console.log("Error : " + event + " -data :" + data);
                $(window).dangerMessage('resetOnShown');
                $(window).dangerMessage({
                    onShown: function () {
                        $('#tab_VehicleType').loadImager('removeLoadImage');
                    }
                });
                $(window).dangerMessage('show', window.lang.translate('Unsuccessful transaction'),
                                                window.lang.translate('Unsuccessful transaction'));
                resetVehicleTypeAddDealForm();
            },
        })
        ajax.ajaxCallWidget('call');
        return false;
    })

    // add deal reset
    $("#add_vehicleType_reset").on("click", function (e) {
        e.preventDefault();
        resetDealAddForm();
        return false;
    })
    
//----------------------------------add vehicle type to deal end-------------------------------------------------

    


});