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
  $('#world-map').vectorMap({
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
  });

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

    activateTabByOrder = function () {
        if ($('#attached_deals_tab li.active').next('li').find('a:first').hasClass('disabled')) {
            alert('next tab deactive ');
        } else {
            $('#attached_deals_tab li.active').removeClass("active").find('a:first').attr("aria-expanded", "false").parent("li").next('li').addClass("active").find("a:first").attr("aria-expanded", "true");
            $('#attached_deals_tab li.active').removeClass("active").find('a:first').tab('show');
        }

    }

    activateNextTab = function () {
        if ($('#attached_deals_tab li.active').next('li').find('a:first').hasClass('disabled')) {
            alert('next tab deactive ');
        } else {
            $('#attached_deals_tab li.active').removeClass("active").find('a:first').attr("aria-expanded", "false").parent("li").next('li').addClass("active").find("a:first").attr("aria-expanded", "true");
            $('#attached_deals_tab li.active').removeClass("active").find('a:first').tab('show');
        }
       
    }

    activatePrevTab = function () {
        if ($('#attached_deals_tab li.active').prev('li').find('a:first').hasClass('disabled')) {
            alert('next tab active already ');
            
        } else {
            $('#attached_deals_tab li.active').removeClass("active").find('a:first').attr("aria-expanded", "false").parent("li").prev('li').addClass("active").find("a:first").attr("aria-expanded", "true");
            $('#attached_deals_tab li.active').removeClass("active").find('a:first').tab('show');
        }
    }

    $('#attached_deals_tab a').click(function (e) {
        //alert('click tag');
        if ($(this).hasClass("disabled")) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;

        }
    });

    disableActiveTabs = function () {
        $('#attached_deals_tab  li').not('.active').find("a:first").addClass('disabled');
        $('#attached_deals_tab  li').not('.active').find("a:first").removeAttr('data-toggle');
    }

    enableableNotActiveTabs = function () {
        /*if ($('#attached_deals_tab  li.dropdown-toggle').not('.active')) {
            alert("test1");
            $('#attached_deals_tab  li.dropdown-toggle').not('.active').find("a.disabled").removeClass('disabled').attr("data-toggle", "dropdown");
        } else {
            alert("test2");
            $('#attached_deals_tab  li').not('.active').find("a.disabled").removeClass('disabled').attr("data-toggle", "tab");
        }*/
        $('#attached_deals_tab li').not('.active').find("a.dropdown-toggle.disabled").removeClass('disabled').attr("data-toggle", "dropdown");
        $('#attached_deals_tab li').not('.active').find("a.disabled").removeClass('disabled').attr("data-toggle", "tab");
        //$('#attached_deals_tab  li').not('.active').find("a:first").removeAttr('data-toggle');
    }


    //tab 1_1 sonraki ytab butonu
    $('#tab_next_1').click(function (e) {
        alert("tab next 1_1");
        activateNextTab();
       
       /* $('#attached_deals_tab li.active').removeClass("active").find('a:first').attr("aria-expanded", "false").parent("li").next('li').addClass("active").find("a:first").attr("aria-expanded", "true");
        $('#attached_deals_tab li.active').removeClass("active").find('a:first').tab('show');*/
    });

    //tab 1_1 aktif yap butonu
    $('#tab_active_1').click(function () {
        alert("tab active 1_1");
        enableableNotActiveTabs();
    });

    //tab 1_1 pasif yap butonu
    $('#tab_passive_1').click(function () {
        alert("tab passive 1_1");
        disableActiveTabs();
    });

    //tab 2_1 sonraki ytab butonu
    $('#tab_next_2').click(function (e) {
        alert("tab next 2_2");
        activateNextTab();

        /* $('#attached_deals_tab li.active').removeClass("active").find('a:first').attr("aria-expanded", "false").parent("li").next('li').addClass("active").find("a:first").attr("aria-expanded", "true");
         $('#attached_deals_tab li.active').removeClass("active").find('a:first').tab('show');*/
    });

    //tab 2_1 önceki tab butonu
    $('#tab_before_2').click(function (e) {
        alert("tab before 2_2");
        activatePrevTab();

        /* $('#attached_deals_tab li.active').removeClass("active").find('a:first').attr("aria-expanded", "false").parent("li").next('li').addClass("active").find("a:first").attr("aria-expanded", "true");
         $('#attached_deals_tab li.active').removeClass("active").find('a:first').tab('show');*/
    });
    

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