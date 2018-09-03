$(document).ready(function () {


    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'Ýþleme devam et'
    });

    //deal list  grid loading-image
    $("#loading-image-vehicleGrid").loadImager();

    

    /**
     * ddslick customer dropdown load imager
     * @author Mustafa Zeynel Daðlý
     * @since 15/08/2018
     */
    $('#loadingImage_DdslickCustomer').loadImager();

    /**
     * ddslick realization rate dropdown load imager
     * @author Mustafa Zeynel Daðlý
     * @since 15/08/2018
     */
    $('#loadingImage_DdslickRealizationRate').loadImager();

    /**
    * ddslick priority dropdown load imager
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickPriority').loadImager();

    /**
    * ddslick vehicle type dropdown(buyback) load imager
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickVehicleTypeBuyBack').loadImager();

    /**
    * ddslick vehicle type dropdown load imager
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickVehicleType').loadImager();

    /**
    * ddslick customer type dropdown load imager
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickCustomerTypeBuyBack').loadImager();

    /**
    * ddslick terrain type dropdown load imager
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickTerrainTypeBuyBack').loadImager();

    /**
    * ddslick R&M dropdown load imager
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickRepMainBuyBack').loadImager();

    /**
    * ddslick truck type dropdown load imager
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickTruckTypeBuyBack').loadImager();

    
    /**
    * ddslick hydraulics dropdown load imager
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickHydraBuyBack').loadImager();


    //tradeback
    /**
    * ddslick vehicle type dropdown(buyback) load imager
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickVehicleTypeTradeBack').loadImager();

    
    /**
    * ddslick customer type dropdown load imager
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickCustomerTypeTradeBack').loadImager();

    /**
    * ddslick terrain type dropdown load imager
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickTerrainTypeTradeBack').loadImager();

    /**
    * ddslick R&M dropdown load imager
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickRepMainTradeBack').loadImager();

    /**
    * ddslick truck type dropdown load imager
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickTruckTypeTradeBack').loadImager();


    /**
    * ddslick hydraulics dropdown load imager
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    $('#loadingImage_DdslickHydraTradeBack').loadImager();
   


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
        var socket = io.connect('http://localhost:3000', { reconnect: true });
        /*var $messageForm = $('#send-message');
        var $messageBox = $('#chat-input');*/

        /*$messageForm.submit(function (e) {
            e.preventDefault();
            socket.emit('send message', 'click message');
            //$messageBox.val('');
        })*/
        var msg = '{ "UserName" : "' + localStorage.getItem('userName') + '","Host" : "localhost:3000","Action": "' + $("#requestUriRegulated").val() + '","Controller":"' + $("#requestUriRegulated").val() + '","Port":"3000","UserAgent":"Chrome","UserIP":"127.0.0.1","Method":"Demo","SessionID": "' + localStorage.getItem('sessionID')+'","UserToken":"ssssss","UserPublicKey":"' + $("#publicKey").val() +'"}';
        //socket.emit('send message', 'click message');
        socket.emit('send message', msg);

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

  //bootstrap WYSIHTML5 - text editor
  $(".textarea").wysihtml5();

  $('.daterange').daterangepicker(
          {
            ranges: {
              'Today': [moment(), moment()],
              'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
              'Last 7 Days': [moment().subtract('days', 6), moment()],
              'Last 30 Days': [moment().subtract('days', 29), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
              'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
            },
            startDate: moment().subtract('days', 29),
            endDate: moment()
          },
  function (start, end) {
    alert("You chose: " + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  });

  /* jQueryKnob */
  //$(".knob").knob();

 
  

  

 



  //Fix for charts under tabs    
  $('.box ul.nav a').on('shown.bs.tab', function (e) {
    area.redraw();
    donut.redraw();
    });

    var tabOrganizer = $("#attached_deals_tab").organizeTabs({ tabID: "attached_deals_tab" });

    activateTabByOrder = function (order) {
        if ($('#attached_deals_tab li:eq('+parseInt(order)+')').find('a:first').hasClass('disabled')) {
            alert('next tab active order ');
        } else {
            alert('next tab active order 2 ');
            $('#attached_deals_tab li:eq('+parseInt(order)+')').removeClass("active").find('a:first').attr("aria-expanded", "false").parent("li").next('li').addClass("active").find("a:first").attr("aria-expanded", "true");
            $('#attached_deals_tab li:eq('+parseInt(order)+')').removeClass("active").find('a:first').tab('show');
        }

    }

    //tab 1_1 sonraki ytab butonu
    $('#tab_next_1').click(function (e) {
        $("#attached_deals_tab").organizeTabs('activateNextTab');
    });

    //tab 1_1 aktif yap butonu
    $('#tab_active_1').click(function () {
        $("#attached_deals_tab").organizeTabs('enableAllTabs');
    });

    //tab 1_1 order by aktif yap butonu
    $('#tab_active_order_1').click(function () {
        $("#attached_deals_tab").organizeTabs('activateTabByOrder', '2');
    });
    
    //tab 1_1 order by enable  yap butonu
    $('#tab_enable_order_1').click(function () {
        $("#attached_deals_tab").organizeTabs('enableTabByOrder', '1');
    });

    //tab 1_1 pasif yap butonu
    $('#tab_passive_1').click(function () {
        $("#attached_deals_tab").organizeTabs('disableAllTabs');
    });
    //tab 2_1 sonraki ytab butonu
    $('#tab_next_2').click(function (e) {
        $("#attached_deals_tab").organizeTabs('activateNextTab');
    });
    //tab 2_1 önceki tab butonu
    $('#tab_before_2').click(function (e) {
        $("#attached_deals_tab").organizeTabs('activatePrevTab');
    });
    //tab 2_1 aktif yap butonu
    $('#tab_active_2').click(function () {
        $("#attached_deals_tab").organizeTabs('enableAllTabs');
    });
    //tab 2_1 pasif yap butonu
    $('#tab_passive_2').click(function () {
        $("#attached_deals_tab").organizeTabs('disableAllTabsButOne');
    });


    $('#asideTestLeft').asideLeft({
        width: "900"
    });
    $('#asideTestLeft').asideLeft({
        onOpening: function (event, element) {
            console.log(element);
            console.log(element.css);
            alert(element);
            alert('onopening event left slider');
        }
    });
    $('#asideTestLeft').asideLeft({
        onOpened: function (event, element) {
            alert('onopened event left slider');
        }
    });
    $('#asideTestLeft').asideLeft({
        onClosing: function (event, element) {
            alert('onclosing event left slider');
        }
    });
    $('#asideTestLeft').asideLeft({
        onClosed: function (event, element) {
            alert('onclosed event left slider');
        }
    });
    //tab 2_1 side bar panel left toggle
   $("#sidebar_left_toggle").on("click", function () {
       // $(".sidebar.left").sidebar().trigger("sidebar:open");
       //alert('test');
       $('#asideTestLeft').asideLeft('toggle');
    });


    $('#asideTestRight').asideRight({
        width: "900"
    });
    $('#asideTestRight').asideRight({
        onOpening: function (event, element) {
            console.log(element);
            alert('onopening event right slider');
        }
    });
    $('#asideTestRight').asideRight({
        onOpened: function (event, element) {
            alert('onopened event right slider');
        }
    });
    $('#asideTestRight').asideRight({
        onClosing: function (event, element) {
            alert('onclosing event right slider');
        }
    });
    $('#asideTestRight').asideRight({
        onClosed: function (event, element) {
            alert('onclosed event right slider');
        }
    });
    //tab 2_1 side bar panel left toggle
    $("#sidebar_right_toggle").on("click", function () {
        // $(".sidebar.left").sidebar().trigger("sidebar:open");
        //alert('test');
        $('#asideTestRight').asideRight('toggle');
    });

    /**
     * ddslick customer dropdown 
     * @author Mustafa Zeynel Daðlý
     * @since 15/08/2018
     */
    var ddslickCustomerData = [
        {
            text: 'Please select...',
            value: 1,
            selected: true
        },
        {
            text: "South Africa Corp.",
            value: 2,
            selected: false
        },
        {
            text: "Pine Town Corp",
            value: 3,
            selected: false
        }
    ];
    $('#loadingImage_DdslickCustomer').loadImager('removeLoadImage');
    $("#loadingImage_DdslickCustomer").loadImager('appendImage');
    var ajax_DdslickCustomer = $('#ajax_DdslickCustomer').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickCustomer.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomer').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...'), window.lang.translate('Servis  bulunamamýþtýr...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickCustomer').ddslick({
                //height: 150,
                data: ddslickCustomerData,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickCustomer").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomer').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('vehiclekittype bulunamamýþtýr...'), window.lang.translate('vehiclekittype  bulunamamýþtýr...'));
        },
    })
    ajax_DdslickCustomer.ajaxCallWidget('call');


    /**
     * ddslick customer dropdown 
     * @author Mustafa Zeynel Daðlý
     * @since 15/08/2018
     */
    var ddslickRealizationRateData = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "<%25",
            value: 2,
            selected: false
        },
        {
            text: "%25-%50",
            value: 3,
            selected: false
        },
        {
            text: "%50-%75",
            value: 4,
            selected: false
        },
        {
            text: ">%75",
            value: 5,
            selected: false
        }
    ];
    $('#loadingImage_DdslickRealizationRate').loadImager('removeLoadImage');
    $("#loadingImage_DdslickRealizationRate").loadImager('appendImage');
    var ajax_DdslickRealizationRate = $('#ajax_DdslickRealizationRate').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickRealizationRate.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickRealizationRate').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Realization Rate data not found...'), window.lang.translate('Realization Rate data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickRealizationRate').ddslick({
                //height: 150,
                data: ddslickRealizationRateData,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickRealizationRate").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickRealizationRate').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Realization Rate data not found...'), window.lang.translate('Realization Rate data not found...'));
        },
    })
    ajax_DdslickRealizationRate.ajaxCallWidget('call');

    /**
     * ddslick priority dropdown 
     * @author Mustafa Zeynel Daðlý
     * @since 15/08/2018
     */
    var ddslickPriorityData = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "Normal",
            value: 2,
            selected: false
        },
        {
            text: "Strategic",
            value: 3,
            selected: false
        },
        {
            text: "Very Strategic",
            value: 4,
            selected: false
        },
        {
            text: "Ultimate Deal",
            value: 5,
            selected: false
        }
    ];
    $('#loadingImage_DdslickPriority').loadImager('removeLoadImage');
    $("#loadingImage_DdslickPriority").loadImager('appendImage');
    var ajax_DdslickPriority = $('#ajax_DdslickPriority').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickPriority.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickPriority').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Priority data not found...'), window.lang.translate('Priority data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickPriority').ddslick({
                //height: 150,
                data: ddslickPriorityData,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickPriority").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickPriority').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Priority data not found...'), window.lang.translate('Priority data not found...'));
        },
    })
    ajax_DdslickPriority.ajaxCallWidget('call');

    /**
     * ddslick vehicle type dropdown 
     * @author Mustafa Zeynel Daðlý
     * @since 15/08/2018
     */
    var ddslickVehicleTypeData = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26-4406X4BLS-LX-ALU-EL",
            value: 2,
            selected: false
        },
        {
            text: "TGS-26-4406X4BLS-LX-ALU-ELX",
            value: 3,
            selected: false
        },
        {
            text: "TGS-16-4406X4BLS-LX-ALU-EL",
            value: 4,
            selected: false
        },
        {
            text: "TGS-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        },
        {
            text: "TGX-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        },
        {
            text: "TGV-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        }
    ];
    $('#loadingImage_DdslickVehicleType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleType").loadImager('appendImage');
    var ajax_DdslickVehicleType = $('#ajax_DdslickVehicleType').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickVehicleType.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Priority data not found...'), window.lang.translate('Priority data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickVehicleType').ddslick({
                //height: 150,
                data: ddslickVehicleTypeData,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickVehicleType").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Vehicle Type data not found...'), window.lang.translate('Vehicle Type data not found...'));
        },
    })
    ajax_DdslickVehicleType.ajaxCallWidget('call');


    //Deal Vehicle typers tag cabin
    var tagdata = [{ "id": "120", "text": "TGS-26-4406X4BLS-LX-ALU-EL / 12 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "73", "privilege_name_eng": "Assign Consultant" } },
        { "id": "41", "text": "TGS-26-4406X4BLS-LX-ALU-ELX / 10 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "45", "privilege_name_eng": "You can list the database \/*table*\/." } },
        { "id": "47", "text": "TGS-16-4406X4BLS-LX-ALU-EL /8 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "51", "privilege_name_eng": "Menu Active \/  Passive" } },
        { "id": "46", "text": "TGS-26-5406X4BLS-LX-ALU-EL / 4 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "44", "privilege_name_eng": "Menu \/*Insert*\/" } },
        { "id": "48", "text": "TGX-26-5406X4BLS-LX-ALU-EL / 2 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "49", "privilege_name_eng": "Menu Update" } },
        { "id": "49", "text": "TGV-26-5406X4BLS-LX-ALU-EL / 1 piece", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "50", "privilege_name_eng": "Menu\/* delete*\/" } }];
    var tagBuilderDealVehicles = $('#tagcabin_DealVehicles').tagCabin({
        tagCopy: true,
        tagDeletable: true,
        tagDeletableAll: false,
        tagBox: $('.tag-container').find('ul'),
        //dataMapper: {attributes : Array('role_id', 'resource_id', 'privilege_id')}
        //dataMapper: Array('role_id', 'resource_id', 'privilege_id')

    });
    //var testArr = ['text', 'value'];
    tagBuilderDealVehicles.tagCabin('addTags', JSON.stringify(tagdata)/*, testArr*/);



    /**
     * ddslick vehicle type (buyback) dropdown 
     * @author Mustafa Zeynel Daðlý
     * @since 15/08/2018
     */
    var ddslickVehicleTypeDataBuyBack = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26-4406X4BLS-LX-ALU-EL",
            value: 2,
            selected: false
        },
        {
            text: "TGS-26-4406X4BLS-LX-ALU-ELX",
            value: 3,
            selected: false
        },
        {
            text: "TGS-16-4406X4BLS-LX-ALU-EL",
            value: 4,
            selected: false
        },
        {
            text: "TGS-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        },
        {
            text: "TGX-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        },
        {
            text: "TGV-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        }
    ];
    $('#loadingImage_DdslickVehicleTypeBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleTypeBuyBack").loadImager('appendImage');
    var ajax_DdslickVehicleTypeBuyBack = $('#ajax_DdslickVehicleTypeBuyBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickVehicleTypeBuyBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Vehicle type data not found...'), window.lang.translate('Vehiicle type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickVehicleTypeBuyBack').ddslick({
                //height: 150,
                data: ddslickVehicleTypeDataBuyBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickVehicleTypeBuyBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Vehicle Type data not found...'), window.lang.translate('Vehicle Type data not found...'));
        },
    })
    ajax_DdslickVehicleTypeBuyBack.ajaxCallWidget('call');


    /**
    * ddslick customer type (buyback) dropdown 
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    var ddslickCustomerTypeData = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "House Deal",
            value: 2,
            selected: false
        },
        {
            text: "New",
            value: 3,
            selected: false
        },
        {
            text: "Regular",
            value: 4,
            selected: false
        },
    ];
    $('#loadingImage_DdslickCustomerTypeBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickCustomerTypeBuyBack").loadImager('appendImage');
    var ajax_DdslickCustomerTypeBuyBack = $('#ajax_DdslickCustomerTypeBuyBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickCustomerTypeBuyBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomerTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Customer  type data not found...'), window.lang.translate('Customer type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickCustomerTypeBuyBack').ddslick({
                //height: 150,
                data: ddslickCustomerTypeData,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickCustomerTypeBuyBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomerTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Customer Type data not found...'), window.lang.translate('Customer Type data not found...'));
        },
    })
    ajax_DdslickCustomerTypeBuyBack.ajaxCallWidget('call');

    /**
    * ddslick terrain type (buyback) dropdown 
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    var ddslickTerrainTypeData = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "Off Road",
            value: 2,
            selected: false
        },
        {
            text: "on Road",
            value: 3,
            selected: false
        },
        
    ];
    $('#loadingImage_DdslickTerrainTypeBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTerrainTypeBuyBack").loadImager('appendImage');
    var ajax_DdslickTerrainTypeBuyBack = $('#ajax_DdslickTerrainTypeBuyBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickTerrainTypeBuyBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTerrainTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Terrain  type data not found...'), window.lang.translate('Terrain type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickTerrainTypeBuyBack').ddslick({
                //height: 150,
                data: ddslickTerrainTypeData,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickTerrainTypeBuyBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTerrainTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Terrain Type data not found...'), window.lang.translate('Terrain Type data not found...'));
        },
    })
    ajax_DdslickTerrainTypeBuyBack.ajaxCallWidget('call');


    /**
    * ddslick R&M (buyback) dropdown 
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    var ddslickRepMainData = [
        {
            text: 'Comfort Super',
            value: -1,
            selected: true
        },
        {
            text: "Comfort Mini",
            value: 2,
            selected: false
        },
        {
            text: "Comfort Detail",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickRepMainBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickRepMainBuyBack").loadImager('appendImage');
    var ajax_DdslickRepMainBuyBack = $('#ajax_DdslickRepMainBuyBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickRepMainBuyBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickRepMainBuyBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('R&M  type data not found...'), window.lang.translate('R&M type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickRepMainBuyBack').ddslick({
                //height: 150,
                data: ddslickRepMainData,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickRepMainBuyBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickRepMainBuyBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('R&M Type data not found...'), window.lang.translate('R&M Type data not found...'));
        },
    })
    ajax_DdslickRepMainBuyBack.ajaxCallWidget('call');

    /**
    * ddslick truck type (buyback) dropdown 
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    var ddslickTruckTypeData = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26",
            value: 2,
            selected: false
        },
        {
            text: "TGS-16",
            value: 3,
            selected: false
        },
        {
            text: "TGX-16",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickTruckTypeBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTruckTypeBuyBack").loadImager('appendImage');
    var ajax_DdslickTruckTypeBuyBack = $('#ajax_DdslickTruckTypeBuyBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickTruckTypeBuyBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTruckTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Truck  type data not found...'), window.lang.translate('Truck type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickTruckTypeBuyBack').ddslick({
                //height: 150,
                data: ddslickTruckTypeData,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickTruckTypeBuyBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTruckTypeBuyBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Truck Type data not found...'), window.lang.translate('Truck Type data not found...'));
        },
    })
    ajax_DdslickTruckTypeBuyBack.ajaxCallWidget('call');

    /**
   * ddslick hydraulics (buyback) dropdown 
   * @author Mustafa Zeynel Daðlý
   * @since 15/08/2018
   */
    var ddslickHydraData = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26 hydra",
            value: 2,
            selected: false
        },
        {
            text: "TGS-16 hydra",
            value: 3,
            selected: false
        },
        {
            text: "TGX-16 hydra",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickHydraBuyBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickHydraBuyBack").loadImager('appendImage');
    var ajax_DdslickHydraBuyBack = $('#ajax_DdslickHydraBuyBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickHydraBuyBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickHydraBuyBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Hydraulics  type data not found...'), window.lang.translate('Hydraulics type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickHydraBuyBack').ddslick({
                //height: 150,
                data: ddslickHydraData,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickHydraBuyBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickHydraBuyBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Hydraulics Type data not found...'), window.lang.translate('Hydraulics Type data not found...'));
        },
    })
    ajax_DdslickHydraBuyBack.ajaxCallWidget('call');


    // buyback list grid
    var buyBackGridDataSource = {
        store: {
            type: 'array',
            data: [{ "OrderNumber": "R35703", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/12" },
            { "OrderNumber": "R35706", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/14" },
            { "OrderNumber": "R35709", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/18" },
            { "OrderNumber": "R35711", "Customer": "R35703", "Salesman": "R35709", "Employee": "Jim Packard", "OrderDate": "2013/11/22" },
            { "OrderNumber": "R35714", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/30" },
            { "OrderNumber": "R35789", "Customer": "R35703", "Salesman": "R35709", "Employee": "Clark Morgan", "OrderDate": "2013/12/01" },
            { "OrderNumber": "R35983", "Customer": "R35703", "Salesman": "R35709", "Employee": "Todd Hoffman", "OrderDate": "2013/12/03" },
            { "OrderNumber": "R36488", "Customer": "R35703", "Salesman": "R35709", "Employee": "Todd Hoffman", "OrderDate": "2013/12/05" },
            { "OrderNumber": "R36987", "Customer": "R35703", "Salesman": "R35709", "Employee": "Clark Morgan", "OrderDate": "2013/12/07" },
            { "OrderNumber": "R37642", "Customer": "R35703", "Salesman": "R35709", "Employee": "Clark Morgan", "OrderDate": "2013/12/08" },
            { "OrderNumber": "R38466", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/12/10" },
            { "OrderNumber": "R38775", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/12/15" }]
        }
    };
    DevExpress.localization.locale("en");
    $("#gridContainer_BuyBack").dxDataGrid({
        showColumnLines: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        showBorders: true,
        // dataSource: orders,
        dataSource: buyBackGridDataSource,
        columnHidingEnabled: false,
        editing: {
            //mode: "batch"
            mode: "row",
            //allowAdding: false,
            allowUpdating: false,
            allowDeleting: false,
            useIcons: false
        },
        "export": {
            enabled: true,
            fileName: "Orders"
        },
        grouping: {
            contextMenuEnabled: true,
            expandMode: "rowClick"
        },
        groupPanel: {
            emptyPanelText: "Use the context menu of header columns to group data",
            visible: true
        },
        pager: {
            allowedPageSizes: [5, 8, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: {
            pageSize: 8
        },
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        },
        headerFilter: {
            visible: true
        },
        columnChooser: {
            enabled: true,
            mode: "select"
        },
        columns: [{
            allowGrouping: false,
            dataField: "OrderNumber",
            caption: "32 Mon.",
            //width: 130
        },
        {
            caption: "36 Mon.",
            dataField: "Customer"
        },
        {
            caption: "42 Mon.",
            dataField: "Salesman"
        }
        ],
        customizeColumns: function (columns) {
            //columns[5].format = { type: "currency", currency: "EUR" };
        },


    });


    //Deal Vehicle types tag cabin(buyback)
    var tagdataDealBuyBacks = [{ "id": "120", "text": "TGS-26-4406X4BLS-LX-ALU-EL / 12 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "73", "privilege_name_eng": "Assign Consultant" } },
    { "id": "41", "text": "TGS-26-4406X4BLS-LX-ALU-ELX / 10 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "45", "privilege_name_eng": "You can list the database \/*table*\/." } },
    { "id": "47", "text": "TGS-16-4406X4BLS-LX-ALU-EL /8 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "51", "privilege_name_eng": "Menu Active \/  Passive" } },
    { "id": "46", "text": "TGS-26-5406X4BLS-LX-ALU-EL / 4 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "44", "privilege_name_eng": "Menu \/*Insert*\/" } },
    { "id": "48", "text": "TGX-26-5406X4BLS-LX-ALU-EL / 2 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "49", "privilege_name_eng": "Menu Update" } },
    { "id": "49", "text": "TGV-26-5406X4BLS-LX-ALU-EL / 1 piece", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "50", "privilege_name_eng": "Menu\/* delete*\/" } }];
    var tagBuilderDealBuyBacks = $('#tagcabin_DealBuyBacks').tagCabin({
        tagCopy: true,
        tagDeletable: true,
        tagDeletableAll: false,
        tagBox: $('.tag-container-buybacks').find('ul'),
        //dataMapper: {attributes : Array('role_id', 'resource_id', 'privilege_id')}
        //dataMapper: Array('role_id', 'resource_id', 'privilege_id')

    });
    //var testArr = ['text', 'value'];
    tagBuilderDealBuyBacks.tagCabin('addTags', JSON.stringify(tagdataDealBuyBacks)/*, testArr*/);


    //tradeback tab

    /**
     * ddslick vehicle type (tradeback) dropdown 
     * @author Mustafa Zeynel Daðlý
     * @since 15/08/2018
     */
    var ddslickVehicleTypeDataTradeBack = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26-4406X4BLS-LX-ALU-EL",
            value: 2,
            selected: false
        },
        {
            text: "TGS-26-4406X4BLS-LX-ALU-ELX",
            value: 3,
            selected: false
        },
        {
            text: "TGS-16-4406X4BLS-LX-ALU-EL",
            value: 4,
            selected: false
        },
        {
            text: "TGS-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        },
        {
            text: "TGX-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        },
        {
            text: "TGV-26-5406X4BLS-LX-ALU-EL",
            value: 5,
            selected: false
        }
    ];
    $('#loadingImage_DdslickVehicleTypeTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleTypeTradeBack").loadImager('appendImage');
    var ajax_DdslickVehicleTypeTradeBack = $('#ajax_DdslickVehicleTypeTradeBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickVehicleTypeTradeBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Vehicle type data not found...'), window.lang.translate('Vehiicle type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickVehicleTypeTradeBack').ddslick({
                //height: 150,
                data: ddslickVehicleTypeDataTradeBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickVehicleTypeTradeBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Vehicle Type data not found...'), window.lang.translate('Vehicle Type data not found...'));
        },
    })
    ajax_DdslickVehicleTypeTradeBack.ajaxCallWidget('call');


    /**
    * ddslick customer type (tradeback) dropdown 
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    var ddslickCustomerTypeDataTradeBack = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "House Deal",
            value: 2,
            selected: false
        },
        {
            text: "New",
            value: 3,
            selected: false
        },
        {
            text: "Regular",
            value: 4,
            selected: false
        },
    ];
    $('#loadingImage_DdslickCustomerTypeTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickCustomerTypeTradeBack").loadImager('appendImage');
    var ajax_DdslickCustomerTypeTradeBack = $('#ajax_DdslickCustomerTypeTradeBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickCustomerTypeTradeBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomerTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Customer  type data not found...'), window.lang.translate('Customer type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickCustomerTypeTradeBack').ddslick({
                //height: 150,
                data: ddslickCustomerTypeDataTradeBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickCustomerTypeTradeBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCustomerTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Customer Type data not found...'), window.lang.translate('Customer Type data not found...'));
        },
    })
    ajax_DdslickCustomerTypeTradeBack.ajaxCallWidget('call');

    /**
    * ddslick terrain type (tradeback) dropdown 
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    var ddslickTerrainTypeDataTradeBack = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "Off Road",
            value: 2,
            selected: false
        },
        {
            text: "on Road",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickTerrainTypeTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTerrainTypeTradeBack").loadImager('appendImage');
    var ajax_DdslickTerrainTypeTradeBack = $('#ajax_DdslickTerrainTypeTradeBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickTerrainTypeTradeBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTerrainTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Terrain  type data not found...'), window.lang.translate('Terrain type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickTerrainTypeTradeBack').ddslick({
                //height: 150,
                data: ddslickTerrainTypeDataTradeBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickTerrainTypeTradeBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTerrainTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Terrain Type data not found...'), window.lang.translate('Terrain Type data not found...'));
        },
    })
    ajax_DdslickTerrainTypeTradeBack.ajaxCallWidget('call');


    /**
    * ddslick R&M (tradeback) dropdown 
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    var ddslickRepMainDataTradeBack = [
        {
            text: 'Comfort Super',
            value: -1,
            selected: true
        },
        {
            text: "Comfort Mini",
            value: 2,
            selected: false
        },
        {
            text: "Comfort Detail",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickRepMainTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickRepMainTradeBack").loadImager('appendImage');
    var ajax_DdslickRepMainTradeBack = $('#ajax_DdslickRepMainTradeBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickRepMainTradeBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickRepMainTradeBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('R&M  type data not found...'), window.lang.translate('R&M type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickRepMainTradeBack').ddslick({
                //height: 150,
                data: ddslickRepMainDataTradeBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickRepMainTradeBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickRepMainTradeBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('R&M Type data not found...'), window.lang.translate('R&M Type data not found...'));
        },
    })
    ajax_DdslickRepMainTradeBack.ajaxCallWidget('call');

    /**
    * ddslick truck type (tradeback) dropdown 
    * @author Mustafa Zeynel Daðlý
    * @since 15/08/2018
    */
    var ddslickTruckTypeDataTradeBack = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26",
            value: 2,
            selected: false
        },
        {
            text: "TGS-16",
            value: 3,
            selected: false
        },
        {
            text: "TGX-16",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickTruckTypeTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickTruckTypeTradeBack").loadImager('appendImage');
    var ajax_DdslickTruckTypeTradeBack = $('#ajax_DdslickTruckTypeTradeBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickTruckTypeTradeBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTruckTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Truck  type data not found...'), window.lang.translate('Truck type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickTruckTypeTradeBack').ddslick({
                //height: 150,
                data: ddslickTruckTypeDataTradeBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickTruckTypeTradeBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickTruckTypeTradeBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Truck Type data not found...'), window.lang.translate('Truck Type data not found...'));
        },
    })
    ajax_DdslickTruckTypeTradeBack.ajaxCallWidget('call');

    /**
   * ddslick hydraulics (tradeback) dropdown 
   * @author Mustafa Zeynel Daðlý
   * @since 15/08/2018
   */
    var ddslickHydraDataTradeBack = [
        {
            text: 'Please select',
            value: -1,
            selected: true
        },
        {
            text: "TGS-26 hydra",
            value: 2,
            selected: false
        },
        {
            text: "TGS-16 hydra",
            value: 3,
            selected: false
        },
        {
            text: "TGX-16 hydra",
            value: 3,
            selected: false
        },

    ];
    $('#loadingImage_DdslickHydraTradeBack').loadImager('removeLoadImage');
    $("#loadingImage_DdslickHydraTradeBack").loadImager('appendImage');
    var ajax_DdslickHydraTradeBack = $('#ajax_DdslickHydraTradeBack').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });
    ajax_DdslickHydraTradeBack.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickHydraTradeBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Hydraulics  type data not found...'), window.lang.translate('Hydraulics type data not found...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#ddslickHydraTradeBack').ddslick({
                //height: 150,
                data: ddslickHydraDataTradeBack,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickHydraTradeBack").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickHydraTradeBack').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Hydraulics Type data not found...'), window.lang.translate('Hydraulics Type data not found...'));
        },
    })
    ajax_DdslickHydraTradeBack.ajaxCallWidget('call');

    // tradeback list grid
    var tradeBackGridDataSource = {
        store: {
            type: 'array',
            data: [{ "OrderNumber": "R35703", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/12" },
                { "OrderNumber": "R35706", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/14" },
                { "OrderNumber": "R35709", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/18" },
                { "OrderNumber": "R35711", "Customer": "R35703", "Salesman": "R35709", "Employee": "Jim Packard", "OrderDate": "2013/11/22" },
                { "OrderNumber": "R35714", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/11/30" },
                { "OrderNumber": "R35789", "Customer": "R35703", "Salesman": "R35709", "Employee": "Clark Morgan", "OrderDate": "2013/12/01" },
                { "OrderNumber": "R35983", "Customer": "R35703", "Salesman": "R35709", "Employee": "Todd Hoffman", "OrderDate": "2013/12/03" },
                { "OrderNumber": "R36488", "Customer": "R35703", "Salesman": "R35709", "Employee": "Todd Hoffman", "OrderDate": "2013/12/05" },
                { "OrderNumber": "R36987", "Customer": "R35703", "Salesman": "R35709", "Employee": "Clark Morgan", "OrderDate": "2013/12/07" },
                { "OrderNumber": "R37642", "Customer": "R35703", "Salesman": "R35709", "Employee": "Clark Morgan", "OrderDate": "2013/12/08" },
                { "OrderNumber": "R38466", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/12/10" },
                { "OrderNumber": "R38775", "Customer": "R35703", "Salesman": "R35709", "Employee": "Harv Mudd", "OrderDate": "2013/12/15" }]
        }
    };
    DevExpress.localization.locale("en");
    $("#gridContainer_TradeBack").dxDataGrid({
        showColumnLines: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        showBorders: true,
        // dataSource: orders,
        dataSource: tradeBackGridDataSource,
        columnHidingEnabled: false,
        editing: {
            //mode: "batch"
            mode: "row",
            //allowAdding: false,
            allowUpdating: false,
            allowDeleting: false,
            useIcons: false
        },
        "export": {
            enabled: true,
            fileName: "Orders"
        },
        grouping: {
            contextMenuEnabled: true,
            expandMode: "rowClick"
        },
        groupPanel: {
            emptyPanelText: "Use the context menu of header columns to group data",
            visible: true
        },
        pager: {
            allowedPageSizes: [5, 8, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: {
            pageSize: 8
        },
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        },
        headerFilter: {
            visible: true
        },
        columnChooser: {
            enabled: true,
            mode: "select"
        },
        columns: [{
            allowGrouping: false,
            dataField: "OrderNumber",
            caption: "32 Mon.",
            //width: 130
        },
        {
            caption: "36 Mon.",
            dataField: "Customer"
        }, 
        {   caption: "42 Mon.",
            dataField: "Salesman"
        }
            ],
        customizeColumns: function (columns) {
            //columns[5].format = { type: "currency", currency: "EUR" };
        },
        

    });

    //Deal Vehicle types tag cabin(tradeback)
    var tagdataDealTradeBacks = [{ "id": "120", "text": "TGS-26-4406X4BLS-LX-ALU-EL / 12 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "73", "privilege_name_eng": "Assign Consultant" } },
    { "id": "41", "text": "TGS-26-4406X4BLS-LX-ALU-ELX / 10 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "45", "privilege_name_eng": "You can list the database \/*table*\/." } },
    { "id": "47", "text": "TGS-16-4406X4BLS-LX-ALU-EL /8 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "51", "privilege_name_eng": "Menu Active \/  Passive" } },
    { "id": "46", "text": "TGS-26-5406X4BLS-LX-ALU-EL / 4 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "44", "privilege_name_eng": "Menu \/*Insert*\/" } },
    { "id": "48", "text": "TGX-26-5406X4BLS-LX-ALU-EL / 2 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "49", "privilege_name_eng": "Menu Update" } },
    { "id": "49", "text": "TGV-26-5406X4BLS-LX-ALU-EL / 1 piece", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "50", "privilege_name_eng": "Menu\/* delete*\/" } }];
    var tagBuilderDealTradeBacks = $('#tagcabin_DealTradeBacks').tagCabin({
        tagCopy: true,
        tagDeletable: true,
        tagDeletableAll: false,
        tagBox: $('.tag-container-tradebacks').find('ul'),
        //dataMapper: {attributes : Array('role_id', 'resource_id', 'privilege_id')}
        //dataMapper: Array('role_id', 'resource_id', 'privilege_id')

    });
    //var testArr = ['text', 'value'];
    tagBuilderDealTradeBacks.tagCabin('addTags', JSON.stringify(tagdataDealTradeBacks)/*, testArr*/);
    

    /* devexgrid */
    /*var orders = new DevExpress.data.CustomStore({
        load: function (loadOptions) {
            var deferred = $.Deferred(),
                args = {};

            if (loadOptions.sort) {
                args.orderby = loadOptions.sort[0].selector;
                if (loadOptions.sort[0].desc)
                    args.orderby += " desc";
            }

            args.skip = loadOptions.skip || 0;
            args.take = loadOptions.take || 12;

            $.ajax({
                url: "https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems",
                dataType: "json",
                data: args,
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data Loading Error");
                },
                timeout: 5000
            });

            return deferred.promise();
        }
    });*/

    // deal list grid
    var dealGridDataSource = {
        store: {
            type: 'array',
            data: [{ "OrderNumber": 35703, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Harv Mudd", "OrderDate": "2013/11/12" },
            { "OrderNumber": 35706, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Harv Mudd", "OrderDate": "2013/11/14" },
            { "OrderNumber": 35709, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Harv Mudd", "OrderDate": "2013/11/18" },
            { "OrderNumber": 35711, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Jim Packard", "OrderDate": "2013/11/22" },
            { "OrderNumber": 35714, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Harv Mudd", "OrderDate": "2013/11/30" },
            { "OrderNumber": 35789, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Clark Morgan", "OrderDate": "2013/12/01" },
            { "OrderNumber": 35983, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Todd Hoffman", "OrderDate": "2013/12/03" },
            { "OrderNumber": 36488, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Todd Hoffman", "OrderDate": "2013/12/05" },
            { "OrderNumber": 36987, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Clark Morgan", "OrderDate": "2013/12/07" },
            { "OrderNumber": 37642, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Clark Morgan", "OrderDate": "2013/12/08" },
            { "OrderNumber": 38466, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Harv Mudd", "OrderDate": "2013/12/10" },
            { "OrderNumber": 38775, "Customer": "South Africa Corp.", "StoreCity": "Johannesburg", "Salesman": "Lucky Sanderson", "Employee": "Harv Mudd", "OrderDate": "2013/12/15" }]
        }
    };
    DevExpress.localization.locale("en");
    $("#gridContainer_vehicle").dxDataGrid({
        showColumnLines: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        showBorders: true,
       // dataSource: orders,
        dataSource: dealGridDataSource,
        columnHidingEnabled: true,
        editing: {
            //mode: "batch"
            mode: "row",
            //allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },
        "export": {
            enabled: true,
            fileName: "Orders"
        },
        grouping: {
            contextMenuEnabled: true,
            expandMode: "rowClick"
        },
        groupPanel: {
            emptyPanelText: "Use the context menu of header columns to group data",
            visible: true
        },
        pager: {
            allowedPageSizes: [5, 8, 15, 30],
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: {
            pageSize: 8
        },
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        },
        headerFilter: {
            visible: true
        },
        columnChooser: {
            enabled: true,
            mode: "select"
        },
        columns: [{
            allowGrouping: false,
            dataField: "OrderNumber",
            caption: "Invoice Number",
            width: 130
        }, {
            caption: "City",
            dataField: "StoreCity"
        }, {
            caption: "Salesman",
            dataField: "Salesman"
        },
            "Employee",
        {
            dataField: "OrderDate",
            dataType: "date"
        }, {
            dataField: "Customer",

        }],
        customizeColumns: function (columns) {
            //columns[5].format = { type: "currency", currency: "EUR" };
        },
        summary: {
            totalItems: [{
                column: "OrderNumber",
                summaryType: "count"
            }, /*{
                column: "SaleAmount",
                summaryType: "sum",
                valueFormat: "currency"
            }*/]
        }

    });




});