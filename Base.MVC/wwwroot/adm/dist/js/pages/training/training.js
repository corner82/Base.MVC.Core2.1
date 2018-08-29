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
    * Customer Info Tab LoadImager
    * @author Gül Özdemir
    * @since 02/08/2016
    */
    //to customer info form
    $("#loading-image-cstInfo").loadImager();
    //to customer info grid loading-image
    $("#loading-image-cstInfoGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);

    /*
    * datepicker format
    * @author Gül Özdemir
    * @since 02/08/2016
    */
    $('#start-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    $('#end-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    /*
    * datepicker format
    * @author Gül Özdemir
    * @since 06/08/2016
    */
    var tab_active = function () {
        //Update & View Mode
        //enabled tabs

        $("a[data-toggle='tab'").prop('disabled', false);
        $("a[data-toggle='tab'").each(function () {
            $(this).attr('href', $(this).prop('data-href')); // restore original href
        });
        $("a[data-toggle='tab'").removeClass('disabled-link');
    }

    var tab_disable = function () {
        //Add new record
        //tablar kapatılacak

        $("a[data-toggle='tab'").prop('disabled', true);
        $("a[data-toggle='tab'").each(function () {
            $(this).prop('data-href', $(this).attr('href')); // hold you original href
            $(this).attr('href', '#'); // clear href
        });
        $("a[data-toggle='tab'").addClass('disabled-link');

    }

    tab_disable();
    /*
    * Customer Info insert form validation engine attached to work
    * @since 02/08/2016
    */
    $('#customerInfoForm').validationEngine();

    /* Geçici data */
    //Dropdown plugin data
    var cbdata_country = [{}];

    var cbdata = [
        {
            text:'Search...',
            value: 1,
            selected: true
        },
        {
            text: "South Africa",
            value: 2,
            selected: false
        },
        {
            text: "Turkey",
            value: 3,
            selected: false
        },
        {
            text: "Germany",
            value: 4,
            selected: false
        }
    ];

    $('#loading-image-city').loadImager('removeLoadImage');
    $("#loading-image-city").loadImager('appendImage');  

    var ajaxACLResources_city = $('#ajaxACL-city').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }
    });

    ajaxACLResources_city.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-city').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Activity'), 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCity').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-city").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-city').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Rol bulunamamıştır...'), 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_city.ajaxCallWidget('call');

 //ContactPerson

    var data_priority = [{
        "value": 0,
        "text": "Select...",
        selected: true
    },{
        "value": 1,
        "text": "High",
        selected: false
    }, {
        "value": 2,
        "text": "Normal",
        selected: false
    }, {
        "value": 3,
        "text": "Low",
        selected: false

    }];

    var data_role = [{
        "value": 0,
        "text": "Select.. .",
        selected: true
    },{
        "value": 1,
        "text": "CEO"
    }, {
        "value": 2,
        "text": "Owner"
    }, {
        "value": 3,
        "text": "Salesman"
    }, {
        "value": 4,
        "text": "Others"
    }];

    var data_title = [{
        "value": 0,
        "text": "Select...",
        selected: true
    }, {
        "value": 1,
        "text": "Mr."
    }, {
        "value": 2,
        "text": "Mrs."
    }];

    var data_brand = [{
        "value": 0,
        "text": "Select...",
        selected: true
    }, {
        "value": 1,
        "text": "MAN"
    }, {
        "value": 2,
        "text": "MERCEDES"
    }, {
        "value": 3,
        "text": "IVECO"
    }, {
        "value": 4,
        "text": "BMC"
    }, {
        "value": 5,
        "text": "FORD"
    }];

    var data_product = [{
        "value": 0,
        "text": "Select...",
        selected: true
    }, {
        "value": 1,
        "text": "T00001"
    }, {
        "value": 2,
        "text": "T00002"
    }, {
        "value": 3,
        "text": "T00003"
    }];

    var data_country = [{
        "value": 0,
        "text": "Select...",
        selected: true
    }, {
        "value": 1,
        "text": "South Africa",
        selected: false
    }, {
        "value": 2,
        "text": "Turkey",
        selected: false
    }, {
        "value": 3,
        "text": "Germany",
        selected: false
    }];

    var data_state = [{
        "value": 0,
        "text": "Select...",
        "countryID": 0,
        selected: true
    }, {
        "value": 1,
        "text": "1- State1",
        "countryID": 1,
        selected: false
    }, {
        "value": 2,
        "text": "1- State2",
        "countryID": 1,
        selected: false
    }, {
        "value": 3,
        "text": "2- State1",
        "countryID": 2,
        selected: false
    }, {
        "value": 4,
        "text": "2- State2",
        "countryID": 2,
        selected: false
    }];

    var data_city = [{
        "value": 0,
        "text": "Select...",
        "stateID": 0,
         selected: true
    }, {
        "value": 1,
        "text": "Pretoria",
        "stateID": 1,
        selected: false
    }, {
        "value": 2,
        "text": "Bloemfontein",
        "stateID": 1,
        selected: false
    }, {
        "value": 3,
        "text": "CapeTown",
        "stateID": 1,
        selected: false
    }, {
        "value": 4,
        "text": "Johannesburg",
        "stateID": 2,
        selected: false
    }];

//Contact Person 

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

    DevExpress.localization.locale(langCode);


    $("#gridContainer_customer").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        showBorders: true,

        dataSource: orders,

        columnHidingEnabled: true,

        selection: {
            mode: "single"
        },

        hoverStateEnabled: true,

        editing: {
            //mode: "batch"
            mode: "row",
            //allowAdding: true,
            //allowUpdating: true,
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
            placeholder: window.lang.translate('Search') + "...",
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
        },

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {

                fillCustomerInfoForm(data);

                //alert("gridContainer_customer - onSelectionChanged :" + data);
                //$(".employeeNotes").text(data.Notes);
                //$(".employeePhoto").attr("src", data.Picture);
            }
        }

    });

    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab
      
        if (target == "#tab_1") {
            
           
            //alert("#tab_1");
        }
        if (target == "#tab_2") {
            // grid refresh olması gerektiği için kullanıldı.
            $(gridContainer_contactaddress).dxDataGrid("updateDimensions");
            $(gridContainer_contactphone).dxDataGrid("updateDimensions");
            //alert("#tab_2");
        }
    });


    /**
    * insert CustomerInfo Wrapper
    * @returns {Boolean}
    * @since 02/08/2018
    */

    window.insertCustomerInfoWrapper = function (e) {
        //e.preventDefault();
        
        if ($("#customerInfoForm").validationEngine('validate')) {

            insertCustomerInfo();
        }
        return false;
    }

    /**
    * insert CustomerInfo
    * @returns {undefined}
    * @since 02/08/2018
    */

    window.insertCustomerInfo = function () {

        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        $("#loading-image-cstInfo").loadImager('appendImage');

        var cst_name = $('#txt-cst-name').val();

        var ddData_country = $('#dropdownCountry').data('ddslick')
        var country_id = ddData_country.selectedData.value;

        var ddData_city = $('#dropdownCity').data('ddslick')
        var city_id = ddData_city.selectedData.value;

        var aj = $(window).ajaxCall({
            proxy: 'https://jsonplaceholder.typicode.com/todos/',
            data: {
                url:'1'
                //url: 'pkInsert_sysCustomerInfo',
                //name: cst_name,
                //country_id: country_id,
                //city_id: city_id,
                //pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Ekleme İşlemi Başarısız...',
                    'Müşteri Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#customerInfoForm')[0].reset();

                        $("#loading-image-cstInfo").loadImager('removeLoadImage');

                        $("#loading-image-cstInfoGrid").loadImager('removeLoadImage');
                        $("#loading-image-cstInfoGrid").loadImager('appendImage');

                        $('#gridContainer_customer').refresh();   //test edilecek!

                        $("#loading-image-cstInfoGrid").loadImager('removeLoadImage');

                        /*
                         * devex grid refresh yapılacak
                         * 
                         * 
                        $('#gridContainer_customer').datagrid({
                            queryParams: {
                                pk: $('#pk').val(),
                                subject: 'datagrid',
                                url: 'pkFillPrivilegesList_sysAclPrivilege',
                                sort: 'id',
                                order: 'desc',
                            },
                        });
                        $('#tt_grid_dynamic').datagrid('enableFilter');
                        $('#tt_grid_dynamic').datagrid('reload');
                        */
                    }
                });
                sm.successMessage('show', 'Müşteri Kayıt İşlemi Başarılı...',
                    'Müşteri kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-cstInfo").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kayıt İşlemi Başarısız...',
                    'Müşteri kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerInfo" servis datası boştur!!');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kayıt İşlemi Başarısız...',
                    'Müşteri kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerInfo" servis datası boştur!!');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerInfoForm')[0].reset();
                        $("#loading-image-cstInfo").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'ACL Yetki Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Müşteri  kaydı yapılmıştır, yeni bir Müşteri kaydı deneyiniz... ');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }


    /**
    * reset button function for Customer Info insert form
    * @returns null
    * @since 14/07/2016
    */
    window.resetCustomerInfoForm = function () {
        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        $("#loading-image-cstInfo").loadImager('appendImage');

        $('#customerInfoForm').validationEngine('hide');
        
        $('#dropdownCountry').ddslick('select', { index: String(0) });
        $('#dropdownCity').ddslick('select', { index: String(0) });
        $('#dropdownSector').ddslick('select', { index: String(0) });
        $('#dropdownSegment').ddslick('select', { index: String(0) });
        $('#dropdownReliabilityRate').ddslick('select', { index: String(0) });
        $('#dropdownCustomerGroup').ddslick('select', { index: String(0) });
        $('#dropdownTotalVehicles').ddslick('select', { index: String(0) });
        $('#dropdownTotalEmployees').ddslick('select', { index: String(0) });
        $('#dropdownAnnuelRevenue').ddslick('select', { index: String(0) });
        
        $("#loading-image-cstInfo").loadImager('removeLoadImage');
    
        //yeni kayda açık, tablar kapatılıyor
        tab_disable();

        return false;
    }


    window.fillCustomerInfoForm = function (data) {
        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        $("#loading-image-cstInfo").loadImager('appendImage');

        document.getElementById("txt-cst-name").value = data.Employee;

        document.getElementById("registration-datepicker").value = Date();
        
        $('#dropdownCountry').ddslick('select', { index: 3 });
        $('#dropdownCity').ddslick('select', { index: 2 });
        $('#dropdownSector').ddslick('select', { index: 3 });
        $('#dropdownSegment').ddslick('select', { index: 2 });
        $('#dropdownReliabilityRate').ddslick('select', { index: 3 });
        $('#dropdownCustomerGroup').ddslick('select', { index: 2 });
        $('#dropdownTotalVehicles').ddslick('select', { index: 3 });
        $('#dropdownTotalEmployees').ddslick('select', { index: 2 });
        $('#dropdownAnnuelRevenue').ddslick('select', { index: 2 });
        
        //document.getElementById("dropdownCity").SelectedIndex = 2; //data.cityId;
        //document.getElementById("dropdownSector").value = data.sectorId;
        //document.getElementById("dropdownSegment").value = data.segmentId;
        
        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        tab_active();

        return false;
    }



    window.insertCustomerPurchaseWrapper = function (e) {
        e.preventDefault();

        if ($("#customerPurchaseForm").validationEngine('validate')) {

            insertCustomerPurchase();
        }
        return false;
    }
    /**
 * insert CustomerPurchase
 * @returns {undefined}
 * @since 06/08/2018
 */

    window.insertCustomerPurchase = function () {

        $("#loading-image-cstPurchase").loadImager('removeLoadImage');
        $("#loading-image-cstPurchase").loadImager('appendImage');

        //Customer_id alınacak
        var cst_id = 1;
        var cst_lastpurchase = $('#lastpurchase-datepicker').val();
        var cst_purchaselastupdate = $('#txt-cst-purchaselastupdate').val();

        var ddData_lastPurchaseBrand = $('#dropdownLastPurchaseBrand').data('ddslick')
        var lastPurchaseBrand_id = ddData_lastPurchaseBrand.selectedData.value;

        var ddData_purchaseDecision = $('#dropdownPurchaseDecision').data('ddslick')
        var purchaseDecision_id = ddData_purchaseDecision.selectedData.value;

        var ddData_dateofPurchasePlan = $('#dropdownDateofPurchasePlan').data('ddslick')
        var dateofPurchasePlan_id = ddData_dateofPurchasePlan.selectedData.value;

        var ddData_numberofVehiclestoP = $('#dropdownNumberofVehiclestoP').data('ddslick')
        var numberofVehiclestoP_id = ddData_numberofVehiclestoP.selectedData.value;


        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysCustomerPurchase',
                cst_id: cst_id,
                cst_lastpurchase: cst_lastpurchase,
                cst_purchaselastupdate: cst_purchaselastupdate,
                lastPurchaseBrand_id: lastPurchaseBrand_id,
                purchaseDecision_id: purchaseDecision_id,
                dateofPurchasePlan_id: dateofPurchasePlan_id,
                numberofVehiclestoP_id: numberofVehiclestoP_id,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Yatırım Planı Ekleme İşlemi Başarısız...',
                    'Müşteri Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-cstPurchase").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#customerPurchaseForm')[0].reset();

                        $("#loading-image-cstPurchase").loadImager('removeLoadImage');
                        
                    }
                });
                sm.successMessage('show', 'Müşteri Yatırım Planı Kayıt İşlemi Başarılı...',
                    'Müşteri kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-cstPurchase").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Yatırım Planı Kayıt İşlemi Başarısız...',
                    'Müşteri Yatırım Planı kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerPurchase" servis datası boştur!!');
                $("#loading-image-cstPurchase").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Yatırım Planı Kayıt İşlemi Başarısız...',
                    'Müşteri Yatırım Planı kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerPurchase" servis datası boştur!!');
                $("#loading-image-cstPurchase").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-cstPurchase").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerPurchaseForm')[0].reset();
                        $("#loading-image-cstPurchase").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Müşteri  kaydı yapılmıştır, yeni bir Müşteri kaydı deneyiniz... ');
                $("#loading-image-cstPurchase").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }

    window.resetCustomerPurchaseForm = function () {
        $("#loading-image-cstPurchase").loadImager('removeLoadImage');
        $("#loading-image-cstPurchase").loadImager('appendImage');

        $('#customerPurchaseForm').validationEngine('hide');

        $('#dropdownLastPurchaseBrand').ddslick('select', { index: String(0) });
        $('#dropdownPurchaseDecision').ddslick('select', { index: String(0) });
        $('#dropdownDateofPurchasePlan').ddslick('select', { index: String(0) });
        $('#dropdownNumberofVehiclestoP').ddslick('select', { index: String(0) });
  
        $("#loading-image-cstPurchase").loadImager('removeLoadImage');

        return false;
    }

    window.fillCustomerPuchaseForm = function (data) {
        $("#loading-image-cstPurchase").loadImager('removeLoadImage');
        $("#loading-image-cstPurchase").loadImager('appendImage');

        document.getElementById("lastpurchase-datepicker").value = Date();
        document.getElementById("txt-cst-purchaselastupdate").value = Date();

        $('#dropdownLastPurchaseBrand').ddslick('select', { index: 3 });
        $('#dropdownPurchaseDecision').ddslick('select', { index: 2 });
        $('#dropdownDateofPurchasePlan').ddslick('select', { index: 3 });
        $('#dropdownNumberofVehiclestoP').ddslick('select', { index: 2 });

        //document.getElementById("dropdownCity").SelectedIndex = 2; //data.cityId;
        //document.getElementById("dropdownSector").value = data.sectorId;
        //document.getElementById("dropdownSegment").value = data.segmentId;

        $("#loading-image-cstPurchase").loadImager('removeLoadImage');
        return false;
    }


/**
 * insert CustomerContactPerson
 * @returns {undefined}
 * @since 07/08/2018
 */

    window.insertCustomerContactPerson = function () {
        $("#loading-image-cstcp").loadImager('removeLoadImage');
        $("#loading-image-cstcp").loadImager('appendImage');

        //Customer_id alınacak
        var cst_id = 1;
        /*
        var cst_lastpurchase = $('#lastpurchase-datepicker').val();
        var cst_purchaselastupdate = $('#txt-cst-purchaselastupdate').val();

        var ddData_lastPurchaseBrand = $('#dropdownLastPurchaseBrand').data('ddslick')
        var lastPurchaseBrand_id = ddData_lastPurchaseBrand.selectedData.value;

        var ddData_purchaseDecision = $('#dropdownPurchaseDecision').data('ddslick')
        var purchaseDecision_id = ddData_purchaseDecision.selectedData.value;

        var ddData_dateofPurchasePlan = $('#dropdownDateofPurchasePlan').data('ddslick')
        var dateofPurchasePlan_id = ddData_dateofPurchasePlan.selectedData.value;

        var ddData_numberofVehiclestoP = $('#dropdownNumberofVehiclestoP').data('ddslick')
        var numberofVehiclestoP_id = ddData_numberofVehiclestoP.selectedData.value;
        */

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysCustomerPurchase',
                cst_id: cst_id,
                //cst_lastpurchase: cst_lastpurchase,
                //cst_purchaselastupdate: cst_purchaselastupdate,
                //lastPurchaseBrand_id: lastPurchaseBrand_id,
                //purchaseDecision_id: purchaseDecision_id,
                //dateofPurchasePlan_id: dateofPurchasePlan_id,
                //numberofVehiclestoP_id: numberofVehiclestoP_id,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Ekleme İşlemi Başarısız...',
                    'Müşteri Kontak Kişi Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-cstcp").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();

                        $("#loading-image-cstcp").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarılı...',
                    'Müşteri Kontak Kişi kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-cstcp").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarısız...',
                    'Müşteri Kontak Kişi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-cstcp").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarısız...',
                    'Müşteri Kontak Kişi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-cstcp").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-cstcp").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-cstcp").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Müşteri Kontak Kişi kaydı yapılmıştır, yeni bir Müşteri Kontak Kişi kaydı deneyiniz... ');
                $("#loading-image-cstcp").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }

    //Contact Person
    window.resetContactPersonForm = function () {
        $("#loading-image-cstcp").loadImager('removeLoadImage');
        $("#loading-image-cstcp").loadImager('appendImage');

        $('#customerContactPersonForm').validationEngine('hide');

        $('#dropdownLastPriority').ddslick('select', { index: String(0) });
       // $('#dropdownPurchaseDecision').ddslick('select', { index: String(0) });
       // $('#dropdownDateofPurchasePlan').ddslick('select', { index: String(0) });
       // $('#dropdownNumberofVehiclestoP').ddslick('select', { index: String(0) });

        $("#loading-image-cstcp").loadImager('removeLoadImage');

        return false;
    }


/**
* insert CustomerContactPerson Wrapper
* @returns {Boolean}
* @since 02/08/2018
*/

    window.insertCustomerContactPersonWrapper = function (e) {
        e.preventDefault();

        if ($("#customerContactPersonForm").validationEngine('validate')) {

            insertCustomerContactPerson();
        }
        return false;
    }

    //Contact Person Form
    window.fillCustomerContactPersonForm = function (data) {
        
        $("#loading-image-cstcp").loadImager('removeLoadImage');
        $("#loading-image-cstcp").loadImager('appendImage');

        document.getElementById("txt-cp-firstname").value = data.Employee;
        document.getElementById("txt-cp-lastname").value = data.Employee;

        $('#dropdownPriority').ddslick('select', { index: 2 });

/*
        document.getElementById("txt-cp-email").value = data.Employee;
        document.getElementById("txt-cst-website").value = data.Employee;
        document.getElementById("txt-cst-phone").value = data.Employee;
        document.getElementById("txt-cst-vatnumber").value = data.Employee;
        document.getElementById("txt-cst-regnumber").value = data.Employee;

        document.getElementById("registration-datepicker").value = Date();

        $('#dropdownCountry').ddslick('select', { index: 3 });
        $('#dropdownCity').ddslick('select', { index: 2 });
        $('#dropdownSector').ddslick('select', { index: 3 });
        $('#dropdownSegment').ddslick('select', { index: 2 });
        $('#dropdownReliabilityRate').ddslick('select', { index: 3 });
        $('#dropdownCustomerGroup').ddslick('select', { index: 2 });
        $('#dropdownTotalVehicles').ddslick('select', { index: 3 });
        $('#dropdownTotalEmployees').ddslick('select', { index: 2 });
        $('#dropdownAnnuelRevenue').ddslick('select', { index: 2 });
*/
        $("#loading-image-cstcp").loadImager('removeLoadImage');
        

        return false;
    }
});

