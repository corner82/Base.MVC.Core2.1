/*
* Activity Form
* @author Gül Özdemir
* @since 10/09/2018
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
    * Activity LoadImager
    * @author Gül Özdemir
    * @since 10/09/2018
    */
    //to activity form
    $("#loading-image-activity").loadImager();

    $("#loading-image-customername").loadImager();
    $("#loading-image-contactperson").loadImager();
    $("#loading-image-activitytype").loadImager();
    $("#loading-image-activitystatus").loadImager();
    $("#loading-image-activityplaned").loadImager();
    $("#loading-image-applicationgrup").loadImager();
    $("#loading-image-concernedvehicletype").loadImager();
    $("#loading-image-activitytrackingtype").loadImager();
    $('#loading-image-activityplaned').loadImager();

    //to activity form grid loading-image
    $("#loading-image-activityGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#activityForm').validationEngine();

    $('#activity-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    $('#activity-tracking-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    var cbdata_customer = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Customer 1",
            value: 2,
            selected: false
        },
        {
            text: "Customer 2",
            value: 3,
            selected: false
        },
        {
            text: "Customer 3",
            value: 4,
            selected: false
        }
    ];

    $('#loading-image-customername').loadImager('removeLoadImage');
    $("#loading-image-customername").loadImager('appendImage');

    var ajaxACLResources_customername = $('#ajaxACL-customername').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_customername.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-customername').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCustomerName').ddslick({
                //height: 150,
                data: cbdata_customer,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-customername").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-customername').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Customer bulunamamıştır...'), window.lang.translate('Customer  bulunamamıştır...'));
        },
    })
    ajaxACLResources_customername.ajaxCallWidget('call');


    var cbdata_contactperson = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Contact Person 1",
            value: 2,
            selected: false
        },
        {
            text: "Contact Person 2",
            value: 3,
            selected: false
        },
        {
            text: "Contact Person 3",
            value: 4,
            selected: false
        }
    ];

    $('#loading-image-contactperson').loadImager('removeLoadImage');
    $("#loading-image-contactperson").loadImager('appendImage');

    var ajaxACLResources_contactperson = $('#ajaxACL-contactperson').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_contactperson.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-contactperson').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownContactPerson').ddslick({
                //height: 150,
                data: cbdata_contactperson,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-contactperson").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-contactperson').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Contact Person bulunamamıştır...'), window.lang.translate('Contact Person  bulunamamıştır...'));
        },
    })
    ajaxACLResources_contactperson.ajaxCallWidget('call');

/*
    var cbdata_activitytype = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Fair Visit",
            value: 2,
            selected: false
        },
        {
            text: "Customer support interview",
            value: 3,
            selected: false
        },
        {
            text: "Customer Visit(Inbound)",
            value: 4,
            selected: false
        },
        {
            text: "Customer Visit(Outbound)",
            value: 4,
            selected: false
        },
        {
            text: "Phone Interview(Incoming)",
            value: 4,
            selected: false
        },
        {
            text: "Telephone Interview(Outgoing)",
            value: 4,
            selected: false
        },
    ];
    */
    $('#loading-image-activitytype').loadImager('removeLoadImage');
    $("#loading-image-activitytype").loadImager('appendImage');

    var ajaxACLResources_activitytype = $('#ajaxACL-activitytype').ajaxCallWidget({
        proxy: '/Customer/SysCsActivityTypes/',
        type: 'POST',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_activitytype.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-activitytype').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('activitytype  bulunamamıştır...'), window.lang.translate('activitytype  bulunamamıştır...'));
        },
        onSuccess: function (event, dataacttyp) {
            var cbdata_activitytype = $.parseJSON(dataacttyp);
            cbdata_activitytype.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#dropdownActivityType').ddslick({
                //height: 150,
                data: cbdata_activitytype,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-activitytype").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-activitytype').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('activitytype bulunamamıştır...'), window.lang.translate('activitytype bulunamamıştır...'));
        },
    })
    ajaxACLResources_activitytype.ajaxCallWidget('call');


    $('#loading-image-activityplaned').loadImager('removeLoadImage');
    $("#loading-image-activityplaned").loadImager('appendImage');

    var ajaxACLResources_activityplaned = $('#ajaxACL-activityplaned').ajaxCallWidget({
        proxy: '/Customer/SysCsActStatuTypess/',
        type: 'POST',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_activityplaned.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-activityplaned').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, dataactpln) {
            var cbdata_activityplaned = $.parseJSON(dataactpln);
            cbdata_activityplaned.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownActivityPlaned').ddslick({
                data: cbdata_activityplaned,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-activityplaned").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-activityplaned').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('activityplaned bulunamamıştır...'), window.lang.translate('activityplaned  bulunamamıştır...'));
        },
    })
    ajaxACLResources_activityplaned.ajaxCallWidget('call');


    /* devexgrid */
    var data_activity = new DevExpress.data.CustomStore({
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


    $("#gridContainer_activity").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        showBorders: true,

        dataSource: data_activity,

        columnHidingEnabled: true,

        selection: {
            mode: "single"
        },

        hoverStateEnabled: true,

        editing: {
            //mode: "batch"
            mode: "form",
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },

        "export": {
            enabled: true,
            fileName: "Activity"
        },

        grouping: {
            contextMenuEnabled: true,
            expandMode: "rowClick"
        },

        groupPanel: {
            emptyPanelText: window.lang.translate('Use the context menu of header columns to group data'),
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
            caption: "Activity",
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillActivityForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertActivity
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 10/09/2018
 */

    window.insertActivity = function () {
        $("#loading-image-activity").loadImager('removeLoadImage');
        $("#loading-image-activity").loadImager('appendImage');

        var activity_name = $('#txt-activity-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysactivity',
                
                name: activity_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Activity Ekleme İşlemi Başarısız...',
                    'Activity Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-activity").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#activityForm')[0].reset();

                        $("#loading-image-activity").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Activity Kayıt İşlemi Başarılı...',
                    'Activity kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-activity").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Activity Kayıt İşlemi Başarısız...',
                    'Activity kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysActivity" servis datası boştur!!');
                $("#loading-image-activity").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Activity Kayıt İşlemi Başarısız...',
                    'Activity kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysActivity" servis datası boştur!!');
                $("#loading-image-activity").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-activity").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#activityForm')[0].reset();
                        $("#loading-image-activity").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Marka kaydı yapılmıştır, yeni bir Marka kaydı deneyiniz... ');
                $("#loading-image-activity").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset Activity Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 10/09/2018
 */

    window.resetActivityForm = function () {
        $("#loading-image-activity").loadImager('removeLoadImage');
        $("#loading-image-activity").loadImager('appendImage');

        $('#activityForm').validationEngine('hide');
        
        $("#loading-image-activity").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Activity Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 10/09/2018
    */

    window.insertActivityWrapper = function (e) {
        e.preventDefault();

        if ($("#activityForm").validationEngine('validate')) {

            insertActivity();
        }
        return false;
    }


    /**
    * Fill Activity form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 10/09/2018
    */

    window.fillActivityForm = function (data) {
        $("#loading-image-activity").loadImager('removeLoadImage');
        $("#loading-image-activity").loadImager('appendImage');

        //document.getElementById("txt-activity-name").value = data.Employee;
    
        $("#loading-image-activity").loadImager('removeLoadImage');

        return false;
    }
});

