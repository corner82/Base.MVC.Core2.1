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

    $('#loading-image-vehiclekittype').loadImager();


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
  $(".knob").knob();

 
  

  

 



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


    var cbdata = [
        {
            text: 'Search...',
            value: 1,
            selected: true
        },
        {
            text: "CKD",
            value: 2,
            selected: false
        },
        {
            text: "CBU",
            value: 3,
            selected: false
        }
    ];

    $('#loading-image-vehiclekittype').loadImager('removeLoadImage');
    $("#loading-image-vehiclekittype").loadImager('appendImage');

    var ajaxACLResources_vehiclekittype = $('#ajaxACL-vehiclekittype').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_vehiclekittype.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehiclekittype').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamýþtýr...'), window.lang.translate('Servis  bulunamamýþtýr...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownVehicleKitType').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loading-image-vehiclekittype").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehiclekittype').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('vehiclekittype bulunamamýþtýr...'), window.lang.translate('vehiclekittype  bulunamamýþtýr...'));
        },
    })
    ajaxACLResources_vehiclekittype.ajaxCallWidget('call');

    

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


    var gridDataSource = {
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
        dataSource: gridDataSource,
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