/*
* Branch Form
* @author Gül Özdemir
* @since 03/09/2018
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
    * Branch LoadImager
    * @author Gül Özdemir
    * @since 03/09/2018
    */
    //to branch form
    $("#loading-image-branch").loadImager();

    $("#loading-image-country").loadImager();
    $("#loading-image-city").loadImager();
    $("#loading-image-province").loadImager();
    $("#loading-image-manbranchoffice").loadImager();
    //to branch form grid loading-image
    $("#loading-image-branchGrid").loadImager();
    
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#branchForm').validationEngine();

    var cbdata_manbranchoffice = [
        {
            text: 'Search...',
            value: 1,
            selected: true
        },
        {
            text: "MAN Centurion",
            value: 2,
            selected: false
        },
        {
            text: "MAN RSA",
            value: 3,
            selected: false
        },
        {
            text: "Bloemfontein",
            value: 4,
            selected: false
        }
    ];


    $('#loading-image-manbranchoffice').loadImager('removeLoadImage');
    $("#loading-image-manbranchoffice").loadImager('appendImage');

    var ajaxACLResources_manbranchoffice = $('#ajaxACL-manbranchoffice').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_manbranchoffice.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-manbranchoffice').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('MANbranchoffice  bulunamamıştır...'), window.lang.translate('MANranchoffice  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownMANBranchOffice').ddslick({
                //height: 150,
                data: cbdata_manbranchoffice,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-manbranchoffice").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-manbranchoffice').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('MAN Bayi bulunamamıştır...'), window.lang.translate('Man Bayi  bulunamamıştır...'));
        },
    })
    ajaxACLResources_manbranchoffice.ajaxCallWidget('call');


    var cbdata_country = [
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



    $('#loading-image-country').loadImager('removeLoadImage');
    $("#loading-image-country").loadImager('appendImage');

    var ajaxACLResources_country = $('#ajaxACL-country').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_country.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-country').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCountry').ddslick({
                //height: 150,
                data: cbdata_country,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-country").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-country').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Ülke bulunamamıştır...'), window.lang.translate('Ülke  bulunamamıştır...'));
        },
    })
    ajaxACLResources_country.ajaxCallWidget('call');

    var cbdata_city = [
        {
            text: 'Search...',
            value: 1,
            selected: true
        },
        {
            text: "Western Cape",
            value: 2,
            selected: false
        },
        {
            text: "Northern Cape",
            value: 3,
            selected: false
        },
        {
            text: "North West",
            value: 4,
            selected: false
        },
        {
            text: "Mpumalanga",
            value: 5,
            selected: false
        },
        {
            text: "Free State",
            value: 6,
            selected: false
        },
        {
            text: "KwaZulu - Natal",
            value: 6,
            selected: false
        },
        {
            text: "Gauteng",
            value: 6,
            selected: false
        },
        {
            text: "Limpopo",
            value: 6,
            selected: false
        },
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
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCity').ddslick({
                //height: 150,
                data: cbdata_city,
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
            dm.dangerMessage('show', window.lang.translate('Şehir bulunamamıştır...'), window.lang.translate('Şehir  bulunamamıştır...'));
        },
    })
    ajaxACLResources_city.ajaxCallWidget('call');

    var cbdata_province = [
        {
            text: 'Search...',
            value: 1,
            selected: true
        },
        {
            text: "Bellville",
            value: 2,
            selected: false
        },
        {
            text: "Cape Town",
            value: 3,
            selected: false
        },
        {
            text: "Constantia",
            value: 4,
            selected: false
        },
        {
            text: 'George',
            value: 5,
            selected: false
        },
        {
            text: "Hopefield",
            value: 6,
            selected: false
        },
        {
            text: "Oudtshoorn",
            value: 7,
            selected: false
        },
        {
            text: "Paarl",
            value: 8,
            selected: false
        },
        {
            text: 'Simon’s Town',
            value: 9,
            selected: false
        },
        {
            text: "Stellenbosch",
            value: 10,
            selected: false
        },
        {
            text: "Swellendam",
            value:11,
            selected: false
        },
        {
            text: "Worcester",
            value: 12,
            selected: false
        },
        {
            text: "Vredenburg",
            value: 13,
            selected: false
        }  
    ];


    $('#loading-image-province').loadImager('removeLoadImage');
    $("#loading-image-province").loadImager('appendImage');

    var ajaxACLResources_province = $('#ajaxACL-province').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_province.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-province').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownProvince').ddslick({
                //height: 150,
                data: cbdata_province,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-province").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-province').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('İlçe bulunamamıştır...'), window.lang.translate('İlçe  bulunamamıştır...'));
        },
    })
    ajaxACLResources_province.ajaxCallWidget('call');


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


    $("#gridContainer_branch").dxDataGrid({

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
            mode: "form",
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },

        "export": {
            enabled: true,
            fileName: "Branchs"
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

        onCellPrepared: function (options) {
            var fieldData = options.value,
                fieldHtml = "";
            //alert(fieldData);

            //if (fieldData && fieldData.value) {
            //alert(fieldData.value);
            //alert(options.fieldData);

            //if (fieldData) {


            //    if (fieldData === "Las Vegas") {

                    //alert("eşit");
            //        options.cellElement.addClass("fa fa-check");
            //        fieldHtml += "<i class='fa fa-user'></i>";
            //    } else {
                    //alert("eşit değil");
            //        options.cellElement.addClass("fa fa-check-box-empty");
            //        fieldHtml += "<i class='fa fa-copyright'></i>";
            //        fieldHtml = fieldData;
            //    }

                //fieldHtml += "<div class='input-group-addon'><i class='fa fa-user'></i></div>";

                    //options.cellElement.addClass((fieldData.diff > 0) ? "inc" : "dec");
                    //fieldHtml += "<div class='current-value'>" +
                    //    Globalize.formatCurrency(fieldData.value, "USD") +
                    //    "</div> <div class='diff'>" +
                    //    Math.abs(fieldData.diff).toFixed(2) +
                    //    "  </div>";
             //   } else {
             //       fieldHtml = fieldData;
             //   }
             //   options.cellElement.html(fieldHtml);
            //}
        },

        columns: [
            {
                caption: "OrderNumber",
                dataField: "OrderNumber"
            },
            {
                caption: "StoreCity",
                dataField: "StoreCity"
            },
            {
                caption: "StoreState",
                dataField: "StoreState"
            },
            {
            caption:"Active/Passive",     
            //dataField: "active",
            dataType: "boolean"
            },
            {
                width: 40,
                alignment: 'center',
                cellTemplate: function (container, options) {

                    //options.cellElement.addClass("fa fa-user");

                    $('<img />').addClass('dx-link').attr('src',
                        "/adm/dist/img/icons.png").on('click', function () {
                            
                            //alert(JSON.stringify(options.data))
                            dm.dangerMessage('show', window.lang.translate('dangerMessage'), window.lang.translate('dangerMessage...'));
                        }).appendTo(container);                    
                }
            }

            //< div class= "input-group-addon" >
            //<i class="fa fa-calendar"></i>
            //</div >
        ],

        rowPrepared: function (rowElement, rowInfo) {
            if (rowInfo.data.key == 1)
                rowElement.css('background', 'green');
            else if (rowInfo.data.key == 0)
                rowElement.css('background', 'yellow');
            
        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillBranchForm(data);
            }
        }

    });
    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    /**
 * insertBranch
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 03/09/2018
 */

    window.insertBranch = function () {
        $("#loading-image-branch").loadImager('removeLoadImage');
        $("#loading-image-branch").loadImager('appendImage');

        var branch_name = $('#txt-branch-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysbranch',
                
                name: branch_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Branch Ekleme İşlemi Başarısız...',
                    'Branch Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-branch").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#branchForm')[0].reset();

                        $("#loading-image-branch").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Branch Kayıt İşlemi Başarılı...',
                    'Branch kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-branch").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Branch Kayıt İşlemi Başarısız...',
                    'Branch kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysBranch" servis datası boştur!!');
                $("#loading-image-branch").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Branch Kayıt İşlemi Başarısız...',
                    'Branch kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysBranch" servis datası boştur!!');
                $("#loading-image-branch").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-branch").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#branchForm')[0].reset();
                        $("#loading-image-branch").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Marka kaydı yapılmıştır, yeni bir Marka kaydı deneyiniz... ');
                $("#loading-image-branch").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
 /**
 * reset Branch Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 03/09/2018
 */

    window.resetBranchForm = function () {
        $("#loading-image-branch").loadImager('removeLoadImage');
        $("#loading-image-branch").loadImager('appendImage');

        $('#branchForm').validationEngine('hide');
        $('#dropdownMANBranchOffice').ddslick('select', { index: String(0) });
        $('#dropdownCountry').ddslick('select', { index: String(0) });
        $('#dropdownCity').ddslick('select', { index: String(0) });
        $('#dropdownProvince').ddslick('select', { index: String(0) });

        $("#loading-image-branch").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Branch Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 03/09/2018
    */

    window.insertBranchWrapper = function (e) {
        e.preventDefault();

        if ($("#branchForm").validationEngine('validate')) {

            insertBranch();
        }
        return false;
    }


    /**
    * Fill Branch form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 03/09/2018
    */

    window.fillBranchForm = function (data) {
        $("#loading-image-branch").loadImager('removeLoadImage');
        $("#loading-image-branch").loadImager('appendImage');

        document.getElementById("txt-branch-name").value = data.Employee;
        document.getElementById("txt-embrace-no").value = data.Employee;
        document.getElementById("txt-branch-address").value = data.Employee;
        //active
        //checkbox-branch-active

        $('#dropdownMANBranchOffice').ddslick('select', { index: 1 });
        //country name
        $('#dropdownCountry').ddslick('select', { index: 1 });
        //city
        $('#dropdownCity').ddslick('select', { index: 1 });
        //province
        $('#dropdownProvince').ddslick('select', { index: 1 });

        $("#loading-image-branch").loadImager('removeLoadImage');

        return false;
    }



    var weekData = [{
        "active": 1,
        "date": new Date("2013/12/23"),
        "open": {
            "value": 3563.19,
            "diff": 92.76
        },
        "high": {
            "value": 3591.31,
            "diff": 50.34
        },
        "low": {
            "value": 3552.3,
            "diff": 129.44
        },
        "close": {
            "value": 3574.02,
            "diff": 42.83
        },
        "volume": 1254340000,
        "adjClose": 3574.02,
        "dayClose": [{
            "close": 3569.4,
            "date": new Date("2013/12/23")
        }, {
            "close": 3572.8,
            "date": new Date("2013/12/24")
        }, {
            "close": 3584.58,
            "date": new Date("2013/12/26")
        }, {
            "close": 3574.02,
            "date": new Date("2013/12/27")
        }]
    }, {
        "active": 0,
        "date": new Date("2013/12/16"),
        "open": {
            "value": 3470.43,
            "diff": -45.24
        },
        "high": {
            "value": 3540.97,
            "diff": 16.96
        },
        "low": {
            "value": 3422.86,
            "diff": -26.88
        },
        "close": {
            "value": 3531.19,
            "diff": 74.79
        },
        "volume": 2261352000,
        "adjClose": 3531.19,
        "dayClose": [{
            "close": 3475.79,
            "date": new Date("2013/12/16")
        }, {
            "close": 3469.32,
            "date": new Date("2013/12/17")
        }, {
            "close": 3509.63,
            "date": new Date("2013/12/18")
        }, {
            "close": 3498.63,
            "date": new Date("2013/12/19")
        }, {
            "close": 3531.19,
            "date": new Date("2013/12/20")
        }]
    }, {
        "active": 0,
        "date": new Date("2013/12/09"),
        "open": {
            "value": 3515.67,
            "diff": 19.48
        },
        "high": {
            "value": 3524.01,
            "diff": 12.91
        },
        "low": {
            "value": 3449.74,
            "diff": -3.48
        },
        "close": {
            "value": 3456.4,
            "diff": -47.86
        },
        "volume": 1802822000,
        "adjClose": 3456.4,
        "dayClose": [{
            "close": 3516.17,
            "date": new Date("2013/12/09")
        }, {
            "close": 3514.2,
            "date": new Date("2013/12/10")
        }, {
            "close": 3468.99,
            "date": new Date("2013/12/11")
        }, {
            "close": 3460.29,
            "date": new Date("2013/12/12")
        }, {
            "close": 3456.4,
            "date": new Date("2013/12/13")
        }]
    }, {
        "active":0,
        "date": new Date("2013/12/02"),
        "open": {
            "value": 3496.19,
            "diff": 62.27
        },
        "high": {
            "value": 3511.1,
            "diff": 15.13
        },
        "low": {
            "value": 3453.22,
            "diff": 32.86
        },
        "close": {
            "value": 3504.26,
            "diff": 16.44
        },
        "volume": 1810088000,
        "adjClose": 3504.26,
        "dayClose": [{
            "close": 3481.15,
            "date": new Date("2013/12/02")
        }, {
            "close": 3479.34,
            "date": new Date("2013/12/03")
        }, {
            "close": 3483.01,
            "date": new Date("2013/12/04")
        }, {
            "close": 3477.73,
            "date": new Date("2013/12/05")
        }, {
            "close": 3504.26,
            "date": new Date("2013/12/06")
        }]
    }, {
        "active":1,
        "date": new Date("2013/11/25"),
        "open": {
            "value": 3433.92,
            "diff": 10.45
        },
        "high": {
            "value": 3495.97,
            "diff": 66.77
        },
        "low": {
            "value": 3420.36,
            "diff": 61.05
        },
        "close": {
            "value": 3487.82,
            "diff": 65.8
        },
        "volume": 1508490000,
        "adjClose": 3487.82,
        "dayClose": [{
            "close": 3427.49,
            "date": new Date("2013/11/25")
        }, {
            "close": 3445.76,
            "date": new Date("2013/11/26")
        }, {
            "close": 3470.48,
            "date": new Date("2013/11/27")
        }, {
            "close": 3487.82,
            "date": new Date("2013/11/29")
        }]
    }, {
        "active":1,
        "date": new Date("2013/11/18"),
        "open": {
            "value": 3423.47,
            "diff": 63.64
        },
        "high": {
            "value": 3429.2,
            "diff": 6.62
        },
        "low": {
            "value": 3359.31,
            "diff": 12.9
        },
        "close": {
            "value": 3422.02,
            "diff": -0.56
        },
        "volume": 1742680000,
        "adjClose": 3422.02,
        "dayClose": [{
            "close": 3388.87,
            "date": new Date("2013/11/18")
        }, {
            "close": 3378.13,
            "date": new Date("2013/11/19")
        }, {
            "close": 3367.17,
            "date": new Date("2013/11/20")
        }, {
            "close": 3402.74,
            "date": new Date("2013/11/21")
        }, {
            "close": 3422.02,
            "date": new Date("2013/11/22")
        }]
    }, {
        "active": 0,
        "date": new Date("2013/11/11"),
        "open": {
            "value": 3359.83,
            "diff": -28.87
        },
        "high": {
            "value": 3422.58,
            "diff": 21.31
        },
        "low": {
            "value": 3346.41,
            "diff": 28.01
        },
        "close": {
            "value": 3422.58,
            "diff": 55.74
        },
        "volume": 1812784000,
        "adjClose": 3422.58,
        "dayClose": [{
            "close": 3362.98,
            "date": new Date("2013/11/11")
        }, {
            "close": 3365.23,
            "date": new Date("2013/11/12")
        }, {
            "close": 3405.56,
            "date": new Date("2013/11/13")
        }, {
            "close": 3415.14,
            "date": new Date("2013/11/14")
        }, {
            "close": 3422.58,
            "date": new Date("2013/11/15")
        }]
    }, {
        "active": 0,
        "date": new Date("2013/11/04"),
        "open": {
            "value": 3388.7,
            "diff": 6.52
        },
        "high": {
            "value": 3401.27,
            "diff": -7.01
        },
        "low": {
            "value": 3318.4,
            "diff": -46.25
        },
        "close": {
            "value": 3366.84,
            "diff": -12.92
        },
        "volume": 2011546000,
        "adjClose": 3366.84,
        "dayClose": [{
            "close": 3384.75,
            "date": new Date("2013/11/04")
        }, {
            "close": 3388.82,
            "date": new Date("2013/11/05")
        }, {
            "close": 3385.38,
            "date": new Date("2013/11/06")
        }, {
            "close": 3321.41,
            "date": new Date("2013/11/07")
        }, {
            "close": 3366.84,
            "date": new Date("2013/11/08")
        }]
    }, {
        "active": 0,
        "date": new Date("2013/10/28"),
        "open": {
            "value": 3382.18,
            "diff": 20.42
        },
        "high": {
            "value": 3408.28,
            "diff": 8.24
        },
        "low": {
            "value": 3364.65,
            "diff": 34.45
        },
        "close": {
            "value": 3379.76,
            "diff": -4.07
        },
        "volume": 1962860000,
        "adjClose": 3379.76,
        "dayClose": [{
            "close": 3382.68,
            "date": new Date("2013/10/28")
        }, {
            "close": 3391.75,
            "date": new Date("2013/10/29")
        }, {
            "close": 3385.38,
            "date": new Date("2013/10/30")
        }, {
            "close": 3377.73,
            "date": new Date("2013/10/31")
        }, {
            "close": 3379.76,
            "date": new Date("2013/11/01")
        }]
    }, {
        "active": 1,
        "date": new Date("2013/10/21"),
        "open": {
            "value": 3361.76,
            "diff": 148.38
        },
        "high": {
            "value": 3400.04,
            "diff": 44.41
        },
        "low": {
            "value": 3330.2,
            "diff": 118.15
        },
        "close": {
            "value": 3383.83,
            "diff": 29.95
        },
        "volume": 1952026000,
        "adjClose": 3383.83,
        "dayClose": [{
            "close": 3361.18,
            "date": new Date("2013/10/21")
        }, {
            "close": 3366.93,
            "date": new Date("2013/10/22")
        }, {
            "close": 3346.05,
            "date": new Date("2013/10/23")
        }, {
            "close": 3362.38,
            "date": new Date("2013/10/24")
        }, {
            "close": 3383.83,
            "date": new Date("2013/10/25")
        }]
    }, {
        "active":0,
        "date": new Date("2013/10/14"),
        "open": {
            "value": 3213.38,
            "diff": -2.39
        },
        "high": {
            "value": 3355.63,
            "diff": 115.52
        },
        "low": {
            "value": 3212.05,
            "diff": 94.36
        },
        "close": {
            "value": 3353.88,
            "diff": 120.05
        },
        "volume": 1772590000,
        "adjClose": 3353.88,
        "dayClose": [{
            "close": 3256.02,
            "date": new Date("2013/10/14")
        }, {
            "close": 3244.66,
            "date": new Date("2013/10/15")
        }, {
            "close": 3281.67,
            "date": new Date("2013/10/16")
        }, {
            "close": 3301.28,
            "date": new Date("2013/10/17")
        }, {
            "close": 3353.88,
            "date": new Date("2013/10/18")
        }]
    }, {
        "active":0,
        "date": new Date("2013/10/07"),
        "open": {
            "value": 3215.77,
            "diff": 25.37
        },
        "high": {
            "value": 3240.11,
            "diff": -16.6
        },
        "low": {
            "value": 3117.69,
            "diff": -69.17
        },
        "close": {
            "value": 3233.83,
            "diff": -8.74
        },
        "volume": 1891806000,
        "adjClose": 3233.83,
        "dayClose": [{
            "close": 3215.69,
            "date": new Date("2013/10/07")
        }, {
            "close": 3153.87,
            "date": new Date("2013/10/08")
        }, {
            "close": 3142.54,
            "date": new Date("2013/10/09")
        }, {
            "close": 3210.84,
            "date": new Date("2013/10/10")
        }, {
            "close": 3233.83,
            "date": new Date("2013/10/11")
        }]
    }, {
        "active":1,
        "date": new Date("2013/09/30"),
        "open": {
            "value": 3190.4,
            "diff": -51.92
        },
        "high": {
            "value": 3256.71,
            "diff": 13.28
        },
        "low": {
            "value": 3186.86,
            "diff": -15.89
        },
        "close": {
            "value": 3242.57,
            "diff": 12.27
        },
        "volume": 1793200000,
        "adjClose": 3242.57,
        "dayClose": [{
            "close": 3218.2,
            "date": new Date("2013/09/30")
        }, {
            "close": 3253.05,
            "date": new Date("2013/10/01")
        }, {
            "close": 3253.26,
            "date": new Date("2013/10/02")
        }, {
            "close": 3213.83,
            "date": new Date("2013/10/03")
        }, {
            "close": 3242.57,
            "date": new Date("2013/10/04")
        }]
    }, {
        "active": 0,
        "date": new Date("2013/09/23"),
        "open": {
            "value": 3242.32,
            "diff": 39.13
        },
        "high": {
            "value": 3243.43,
            "diff": -5.09
        },
        "low": {
            "value": 3202.75,
            "diff": 39.62
        },
        "close": {
            "value": 3230.3,
            "diff": 5.57
        },
        "volume": 1775808000,
        "adjClose": 3230.3,
        "dayClose": [{
            "close": 3219.34,
            "date": new Date("2013/09/23")
        }, {
            "close": 3218.66,
            "date": new Date("2013/09/24")
        }, {
            "close": 3208.55,
            "date": new Date("2013/09/25")
        }, {
            "close": 3234.04,
            "date": new Date("2013/09/26")
        }, {
            "close": 3230.3,
            "date": new Date("2013/09/27")
        }]
    }, {
        "active":0,
        "date": new Date("2013/09/16"),
        "open": {
            "value": 3203.19,
            "diff": 57.17
        },
        "high": {
            "value": 3248.52,
            "diff": 59.28
        },
        "low": {
            "value": 3163.13,
            "diff": 17.11
        },
        "close": {
            "value": 3224.73,
            "diff": 46.45
        },
        "volume": 1839474000,
        "adjClose": 3224.73,
        "dayClose": [{
            "close": 3168.69,
            "date": new Date("2013/09/16")
        }, {
            "close": 3190.83,
            "date": new Date("2013/09/17")
        }, {
            "close": 3231.31,
            "date": new Date("2013/09/18")
        }, {
            "close": 3237.61,
            "date": new Date("2013/09/19")
        }, {
            "close": 3224.73,
            "date": new Date("2013/09/20")
        }]
    }, {
        "active":0,
        "date": new Date("2013/09/09"),
        "open": {
            "value": 3146.02,
            "diff": 48.37
        },
        "high": {
            "value": 3189.24,
            "diff": 40.25
        },
        "low": {
            "value": 3146.02,
            "diff": 68.89
        },
        "close": {
            "value": 3178.28,
            "diff": 44.9
        },
        "volume": 1668658000,
        "adjClose": 3178.28,
        "dayClose": [{
            "close": 3169.93,
            "date": new Date("2013/09/09")
        }, {
            "close": 3185.07,
            "date": new Date("2013/09/10")
        }, {
            "close": 3179.86,
            "date": new Date("2013/09/11")
        }, {
            "close": 3175.57,
            "date": new Date("2013/09/12")
        }, {
            "close": 3178.28,
            "date": new Date("2013/09/13")
        }]
    }, {
        "active": 0, 
        "date": new Date("2013/09/03"),
        "open": {
            "value": 3097.65,
            "diff": -29.36
        },
        "high": {
            "value": 3148.99,
            "diff": 1.12
        },
        "low": {
            "value": 3077.13,
            "diff": 23.87
        },
        "close": {
            "value": 3133.38,
            "diff": 59.57
        },
        "volume": 1670570000,
        "adjClose": 3133.38,
        "dayClose": [{
            "close": 3091.76,
            "date": new Date("2013/09/03")
        }, {
            "close": 3124.54,
            "date": new Date("2013/09/04")
        }, {
            "close": 3129.94,
            "date": new Date("2013/09/05")
        }, {
            "close": 3133.38,
            "date": new Date("2013/09/06")
        }]
    }, {
        "active":1,
        "date": new Date("2013/08/26"),
        "open": {
            "value": 3127.01,
            "diff": 52.63
        },
        "high": {
            "value": 3147.87,
            "diff": 20.82
        },
        "low": {
            "value": 3053.26,
            "diff": -8.16
        },
        "close": {
            "value": 3073.81,
            "diff": -50.46
        },
        "volume": 1417628000,
        "adjClose": 3073.81,
        "dayClose": [{
            "close": 3122.67,
            "date": new Date("2013/08/26")
        }, {
            "close": 3059.58,
            "date": new Date("2013/08/27")
        }, {
            "close": 3072.17,
            "date": new Date("2013/08/28")
        }, {
            "close": 3093.36,
            "date": new Date("2013/08/29")
        }, {
            "close": 3073.81,
            "date": new Date("2013/08/30")
        }]
    },
    {
        "active":1,
        "date": new Date("2013/01/07"),
        "open": {
            "value": 2713.44,
            "diff": -14.23
        },
        "high": {
            "value": 2749.36,
            "diff": -1.46
        },
        "low": {
            "value": 2703.75,
            "diff": -12.29
        },
        "close": {
            "value": 2748.26,
            "diff": 23.77
        },
        "volume": 1741254000,
        "adjClose": 2748.26,
        "dayClose": [{
            "close": 2724.22,
            "date": new Date("2013/01/07")
        }, {
            "close": 2718.72,
            "date": new Date("2013/01/08")
        }, {
            "close": 2727.65,
            "date": new Date("2013/01/09")
        }, {
            "close": 2744.18,
            "date": new Date("2013/01/10")
        }, {
            "close": 2748.26,
            "date": new Date("2013/01/11")
        }]
    }];

    $(function () {
        $("#gridContainer").dxDataGrid({
            dataSource: weekData,
            showRowLines: true,
            showBorders: true,
            showColumnLines: false,
            sorting: {
                mode: "none"
            },
            paging: {
                pageSize: 10
            },
            onCellPrepared: function (options) {

                //alert(options.value);

                var fieldData = options.value,
                    fieldHtml = "";
               

                if (fieldData && fieldData.value) {
                    if (fieldData.diff) {
                        options.cellElement.addClass((fieldData.diff > 0) ? "inc" : "dec");
                        fieldHtml += "<div class='current-value'>" + "USD " + fieldData.value +
                            //Globalize.formatCurrency(fieldData.value, "USD") +
                            "</div> <div class='diff'>" +
                            Math.abs(fieldData.diff).toFixed(2) +
                            "  </div>";
                    } else {
                        
                        fieldHtml = fieldData.value;
                    }
                    options.cellElement.html(fieldHtml);
                    //alert(fieldHtml);
                }
            },
            columns: [
                "active",
             {
                dataField: "active",
                dataType: "boolean",
                width: 110
            },{
                dataField: "date",
                dataType: "date",
                width: 110
            },
                "open",
                "close",
            {
                caption: "Dynamics",
                minWidth: 320,
                cellTemplate: function (container, options) {
                    container.addClass("chart-cell");
                    $("<div />").dxSparkline({
                        dataSource: options.data.dayClose,
                        argumentField: "date",
                        valueField: "close",
                        type: "line",
                        showMinMax: true,
                        minColor: "#f00",
                        maxColor: "#2ab71b",
                        pointSize: 6,
                        size: {
                            width: 290,
                            height: 40
                        },
                        tooltip: {
                            enabled: false
                        }
                    }).appendTo(container);
                }
            },
                "high",
                "low",
            {
                 caption: "Active/Passive",
                 width: 110,
                 alignment: 'center',
                 cellTemplate: function (container, options) {
                    //alert(options.data.active);
                    var fieldHtml;

                    if (options.data.active == 1)    
                    {
                        //Active
                
                        $('<div />').addClass('dx-link').attr('class',
                            "fa fa-check-square fa-2x").on('click', function () {

                                //$('<img />').addClass('dx-link').attr('src',
                                // "/adm/dist/img/icons.png").on('click', function () {

                                //alert(JSON.stringify(options.data))
                                dm.dangerMessage('show', window.lang.translate('dangerMessage'), window.lang.translate('dangerMessage...'));
                            }).appendTo(container);

                    } else if (options.data.active == 0) {

                        //Pasive
 
                        $('<div />').addClass('dx-link').attr('class',
                            "fa fa-minus-square fa-2x").on('click', function () {

                                //alert(JSON.stringify(options.data))
                                dm.dangerMessage('show', window.lang.translate('dangerMessage'), window.lang.translate('dangerMessage...'));
                            }).appendTo(container);
                    } 

                 }
            }]
        });

    });
});

