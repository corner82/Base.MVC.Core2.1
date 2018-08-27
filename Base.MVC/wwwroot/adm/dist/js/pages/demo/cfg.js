$(document).ready(function () {

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
        alert(event.target.nodeName);
        console.log($(this));
        alert($(this).attr('data-toggle'));
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
        socket.emit('send message', 'click message');

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

  //jvectormap data
  var visitorsData = {
    "US": 398, //USA
    "SA": 400, //Saudi Arabia
    "CA": 1000, //Canada
    "DE": 500, //Germany
    "FR": 760, //France
    "CN": 300, //China
    "AU": 700, //Australia
    "BR": 600, //Brazil
    "IN": 800, //India
    "GB": 320, //Great Britain
    "RU": 3000 //Russia
  };
  //World map by jvectormap
  /*$('#world-map').vectorMap({
    map: 'world_mill_en',
    backgroundColor: "transparent",
    regionStyle: {
      initial: {
        fill: '#e4e4e4',
        "fill-opacity": 1,
        stroke: 'none',
        "stroke-width": 0,
        "stroke-opacity": 1
      }
    },
    series: {
      regions: [{
          values: visitorsData,
          scale: ["#92c1dc", "#ebf4f9"],
          normalizeFunction: 'polynomial'
        }]
    },
    onRegionLabelShow: function (e, el, code) {
      if (typeof visitorsData[code] != "undefined")
        el.html(el.html() + ': ' + visitorsData[code] + ' new visitors');
    }
  });*/

  //Sparkline charts
  var myvalues = [1000, 1200, 920, 927, 931, 1027, 819, 930, 1021];
  $('#sparkline-1').sparkline(myvalues, {
    type: 'line',
    lineColor: '#92c1dc',
    fillColor: "#ebf4f9",
    height: '50',
    width: '80'
  });
  myvalues = [515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921];
  $('#sparkline-2').sparkline(myvalues, {
    type: 'line',
    lineColor: '#92c1dc',
    fillColor: "#ebf4f9",
    height: '50',
    width: '80'
  });
  myvalues = [15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21];
  $('#sparkline-3').sparkline(myvalues, {
    type: 'line',
    lineColor: '#92c1dc',
    fillColor: "#ebf4f9",
    height: '50',
    width: '80'
  });

  //The Calender
  $("#calendar").datepicker();

  //SLIMSCROLL FOR CHAT WIDGET
  $('#chat-box').slimScroll({
    height: '250px'
  });



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



    // Click handlers
    /*$(".sidebar").on("click", function () {
        var $this = $(this);
        var action = $this.attr("data-action");
        var side = $this.attr("data-side");
        $(".sidebar." + side).trigger("sidebar:" + action);
        return false;
    });*/


    //var sides = ["left", "top", "right", "bottom"];

    // Initialize sidebars
    /*for (var i = 0; i < sides.length; ++i) {
        var cSide = sides[i];
        $(".sidebar." + cSide).sidebar({ side: cSide }).hide().trigger("sidebar:close").on("sidebar:closed", function () {
            $(this).show();
        });
    }*/

    

    /* devexgrid */
    var orders = new DevExpress.data.CustomStore({
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
    });
    DevExpress.localization.locale("en");
    $("#gridContainer").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        rowAlternationEnabled: true,

        showBorders: true,

        dataSource: orders,

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
            caption: "State",
            dataField: "StoreState"
        },
            "Employee", {
            dataField: "OrderDate",
            dataType: "date"
        }, {
            dataField: "SaleAmount",

        }],

        customizeColumns: function (columns) {
            columns[5].format = { type: "currency", currency: "EUR" };
        },

        summary: {
            totalItems: [{
                column: "OrderNumber",
                summaryType: "count"
            }, {
                column: "SaleAmount",
                summaryType: "sum",
                valueFormat: "currency"
            }]
        }

    });


 

  /* The todo list plugin */
  /*$(".todo-list").todolist({
    onCheck: function (ele) {
      console.log("The element has been checked")
    },
    onUncheck: function (ele) {
      console.log("The element has been unchecked")
    }
  });*/

});