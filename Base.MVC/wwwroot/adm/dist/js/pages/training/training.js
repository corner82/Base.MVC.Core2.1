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
    * Training Ident Tab LoadImager
    * @author Ceydacan Seyrek
    * @since 29/08/2016
    */
    //to Training Ident form
    $("#loading-image-trInfo").loadImager();
    //to Training Ident grid loading-image
    $("#loading-image-trInfoGrid").loadImager();

    /*
    * Training Info Tab LoadImager
    * @author Ceydacan Seyrek
    * @since 29/08/2016
    */
    //to Training Indo form
    $("#loading-image-truser").loadImager();

    $("#loading-image-trName").loadImager();
    $("#loading-image-trainer").loadImager();
    $("#loading-image-city").loadImager();

    var langCode = $("#langCode").val();
    //alert(langCode);

    /*
    * datepicker format
    * @author Ceydacan Seyrek
    * @since 29/08/2016
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
    * @author Ceydacan Seyrek
    * @since 29/08/2016
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
    * training Info insert form validation engine attached to work
    * @since 29/08/2016
    */
    $('#trainingIdentForm').validationEngine();
    $('#trainingInfoForm').validationEngine();

    /* Geçici data */
    //Dropdown plugin data
    var cbdata_country = [{}];

    var cbdata = [
        {
            text: 'Search...',
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

    var data_trName = [{
        "value": 0,
        "text": "Select...",
        selected: true
    }, {
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

    var data_trainer = [{
        "value": 0,
        "text": "Select...",
        selected: true
        }, {
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

    $('#loading-image-trName').loadImager('removeLoadImage');
    $("#loading-image-trName").loadImager('appendImage');

    var ajaxACLResources_trName = $('#ajaxACL-trName').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }
    });

    ajaxACLResources_trName.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-trName').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownTrName').ddslick({
                //height: 150,
                data: data_trName,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-trName").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-trName').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'trName not show...', 'trName not show...');
        },
    })
    ajaxACLResources_trName.ajaxCallWidget('call');

    $('#loading-image-trainer').loadImager('removeLoadImage');
    $("#loading-image-trainer").loadImager('appendImage');

    var ajaxACLResources_trainer = $('#ajaxACL-trainer').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_trainer.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-trainer').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownTrainer').ddslick({
                //height: 150,
                data: data_trainer,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-trainer").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-trainer').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'trainer not show...', 'trainer not show...');
        },
    })
    ajaxACLResources_trainer.ajaxCallWidget('call');

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
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCity').ddslick({
                //height: 150,
                data: data_city,
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
            dm.dangerMessage('show', 'city not show...', 'city not show...');
        },
    })
    ajaxACLResources_city.ajaxCallWidget('call');


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


    $("#gridContainer_trainingName").dxDataGrid({

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

                fillTrainingIdentForm(data);

                //alert("gridContainer_trainingName - onSelectionChanged :" + data);
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


    //Training List Info dxDataGrid

    $("#gridContainer_trainingInfo").dxDataGrid({

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
            fileName: "ContactPerson"
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
            caption: "Training Name",
            dataField: "StoreState",
            width: 130
        }, {
            caption: "Trainer",
            dataField: "Employee",
        }, {
            caption: "Training City",
            dataField: "StoreCity"
        }, {
            caption: "Training Address",
            dataField: "StoreState",
        }, {
            caption: "Postal Code",
            dataField: "OrderNumber",
        }, {
            caption: "Explanation",
            dataField: "Employee",
        }, {
            caption: "Start Date",
            dataField: "OrderDate",
                dataType: "date",
        }, {
            caption: "End Date",
            dataField: "OrderDate",
                dataType: "date",
        }, {
            caption: "Grade",
            dataField: "OrderNumber",
        }],

        onRowRemoving: function (e) {
            //alert("RowRemoving - gridContainer_trainingInfo");
            logEvent("RowRemoving");
        },
        onRowRemoved: function (e) {
            //alert("RowRemoved - gridContainer_trainingInfo");
            logEvent("RowRemoved");
        },

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {

                fillTrainingInfoForm(data);

                //alert("gridContainer_trainingName - onSelectionChanged :" + data);
                //$(".employeeNotes").text(data.Notes);
                //$(".employeePhoto").attr("src", data.Picture);
            }
        }
    });



    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab

        if (target == "#tab_1") {
            //alert("#tab_1");
        }
        if (target == "#tab_2") {
            // grid refresh olması gerektiği için kullanıldı.
            $(gridContainer_trainingInfo).dxDataGrid("updateDimensions");
            //alert("#tab_2");
        }
    });



    /**
    * insert CustomerInfo Wrapper
    * @returns {Boolean}
    * @since 29/08/2018
    */

    window.insertCustomerInfoWrapper = function (e) {
        //e.preventDefault();

        if ($("#trainingIdentForm").validationEngine('validate')) {

            insertCustomerInfo();
        }
        return false;
    }

    /**
    * insert CustomerInfo
    * @returns {undefined}
    * @since 29/08/2018
    */

    window.insertCustomerInfo = function () {

        $("#loading-image-trInfo").loadImager('removeLoadImage');
        $("#loading-image-trInfo").loadImager('appendImage');

        var cst_name = $('#txt-cst-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://jsonplaceholder.typicode.com/todos/',
            data: {
                url: '1'
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
                $("#loading-image-trInfo").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#trainingIdentForm')[0].reset();

                        $("#loading-image-trInfo").loadImager('removeLoadImage');

                        $("#loading-image-trInfoGrid").loadImager('removeLoadImage');
                        $("#loading-image-trInfoGrid").loadImager('appendImage');

                        $('#gridContainer_trainingName').refresh();   //test edilecek!

                        $("#loading-image-trInfoGrid").loadImager('removeLoadImage');

                        /*
                         * devex grid refresh yapılacak
                         * 
                         * 
                        $('#gridContainer_trainingName').datagrid({
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
                $("#loading-image-trInfo").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kayıt İşlemi Başarısız...',
                    'Müşteri kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerInfo" servis datası boştur!!');
                $("#loading-image-trInfo").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kayıt İşlemi Başarısız...',
                    'Müşteri kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerInfo" servis datası boştur!!');
                $("#loading-image-trInfo").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-trInfo").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#trainingIdentForm')[0].reset();
                        $("#loading-image-trInfo").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'ACL Yetki Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Müşteri  kaydı yapılmıştır, yeni bir Müşteri kaydı deneyiniz... ');
                $("#loading-image-trInfo").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }


    /**
    * reset button function for Customer Info insert form
    * @returns null
    * @since 29/08/2016
    */
    window.resetTrainingIdentForm = function () {
        $("#loading-image-trInfo").loadImager('removeLoadImage');
        $("#loading-image-trInfo").loadImager('appendImage');

        $('#trainingIdentForm').validationEngine('hide');

        $("#loading-image-trInfo").loadImager('removeLoadImage');

        //yeni kayda açık, tablar kapatılıyor
        tab_disable();

        return false;
    }


    window.fillTrainingIdentForm = function (data) {
        $("#loading-image-trInfo").loadImager('removeLoadImage');
        $("#loading-image-trInfo").loadImager('appendImage');

        document.getElementById("txt-cst-name").value = data.Employee;

        $("#loading-image-trInfo").loadImager('removeLoadImage');
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
     * insert Training Info
     * @returns {undefined}
     * @since 07/08/2018
     */

    window.insertTrainingInfo = function () {
        $("#loading-image-truser").loadImager('removeLoadImage');
        $("#loading-image-truser").loadImager('appendImage');

        //training id alınacak
        var cst_id = 1;

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysCustomerPurchase',
                cst_id: cst_id,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Ekleme İşlemi Başarısız...',
                    'Müşteri Kontak Kişi Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-truser").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#trainingInfoForm')[0].reset();

                        $("#loading-image-truser").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarılı...',
                    'Müşteri Kontak Kişi kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-truser").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarısız...',
                    'Müşteri Kontak Kişi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-truser").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarısız...',
                    'Müşteri Kontak Kişi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-truser").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-truser").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#trainingInfoForm')[0].reset();
                        $("#loading-image-truser").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Müşteri Kontak Kişi kaydı yapılmıştır, yeni bir Müşteri Kontak Kişi kaydı deneyiniz... ');
                $("#loading-image-truser").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }

    //training info
    window.resetTraningInfoForm = function () {
        $("#loading-image-truser").loadImager('removeLoadImage');
        $("#loading-image-truser").loadImager('appendImage');

        $('#trainingInfoForm').validationEngine('hide');

        $('#dropdownTrName').ddslick('select', { index: String(0) });
        $('#dropdownTrainer').ddslick('select', { index: String(0) });
        $('#dropdownCity').ddslick('select', { index: String(0) });

        $("#loading-image-truser").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Training info Wrapper
    * @returns {Boolean}
    * @since 29/08/2018
    */

    window.insertTrainingInfoWrapper = function (e) {
        e.preventDefault();

        if ($("#trainingInfoForm").validationEngine('validate')) {

            insertTrainingInfo();
        }
        return false;
    }

    //Training info Form
    window.fillTrainingInfoForm = function (data) {

        $("#loading-image-truser").loadImager('removeLoadImage');
        $("#loading-image-truser").loadImager('appendImage');

        $('#dropdownTrName').ddslick('select', { index: 2 });
        $('#dropdownTrainer').ddslick('select', { index: 2 });
        $('#dropdownCity').ddslick('select', { index: 2 });
        document.getElementById("txt-cst-name").value = data.Employee;
        document.getElementById("txt-TrAdr-name").value = data.Employee;
        document.getElementById("txt-PtCode-name").value = data.Employee;
        document.getElementById("txt-Explanation-name").value = data.Employee;
        document.getElementById("start-datepicker").value = data.OrderDate;
        document.getElementById("end-datepicker").value = data.OrderDate;
        document.getElementById("txt-Grade-name").value = data.OrderNumber;
        $("#loading-image-truser").loadImager('removeLoadImage');

        return false;
    }
});

