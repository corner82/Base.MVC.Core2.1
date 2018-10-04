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
                    //if (selectedData.selectedData.value > 0) {
                       
                    //}
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

/*
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

*/
    $('#loading-image-country').loadImager('removeLoadImage');
    $("#loading-image-country").loadImager('appendImage');

    var ajaxACLResources_country = $('#ajaxACL-country').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',
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
        onSuccess: function (event, datacountry) {
            var cbdata_country = $.parseJSON(datacountry);
            cbdata_country.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#dropdownCountry').ddslick({
                //height: 150,
                data: cbdata_country,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //var provinceInfo = new ProvinceInfo;
                        //provinceInfo.country_id = selectedData.selectedData.value;
                        var country_id = selectedData.selectedData.value;
                        //country_id = "107";
                        //////////////////////////////////////////////////////////
                        //alert(country_id);

                        $('#loading-image-province').loadImager('removeLoadImage');
                        $("#loading-image-province").loadImager('appendImage');

                        var ajaxACLResources_getprovince = $('#ajaxACL-province').ajaxCallWidget({
                            proxy: '/Sys/SysCountryRegions',
                            type: 'GET',
                            data: {
                                "country_id": country_id //country_id,                              
                            },
                        });

                        ajaxACLResources_getprovince.ajaxCallWidget({
                            onError: function (event, textStatus, errorThrown) {

                                dm.dangerMessage({
                                    onShown: function () {
                                        $('#loading-image-province').loadImager('removeLoadImage');
                                    }
                                });
                                dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
                            },
                            onSuccess: function (event, dataprovince) {
                                var cbdata_province = $.parseJSON(dataprovince);

                                //alert(cbdata_province);

                                $('#dropdownProvince').ddslick({
                                    //height: 150,
                                    data: cbdata_province,
                                    width: '100%',

                                    onSelected: function (selectedData) {
                                        if (selectedData.selectedData.value > 0) {
                                            var province_id = selectedData.selectedData.value;
                                            //province_id = "1";
                                            //******************************************

                                            $('#loading-image-city').loadImager('removeLoadImage');
                                            $("#loading-image-city").loadImager('appendImage');

                                            var ajaxACLResources_getcity = $('#ajaxACL-city').ajaxCallWidget({
                                                proxy: '/Sys/SysCity',
                                                type: 'GET',
                                                data: {
                                                    "country_id": country_id,  //country_id, 
                                                    "region_id": province_id     //province_id 
                                                },
                                            });

                                            ajaxACLResources_getcity.ajaxCallWidget({
                                                onError: function (event, textStatus, errorThrown) {

                                                    dm.dangerMessage({
                                                        onShown: function () {
                                                            $('#loading-image-city').loadImager('removeLoadImage');
                                                        }
                                                    });
                                                    dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
                                                },
                                                onSuccess: function (event, datacity) {
                                                    var cbdata_city = $.parseJSON(datacity);

                                                    $('#dropdownCity').ddslick({
                                                        data: cbdata_city,
                                                        width: '100%',

                                                        onSelected: function (selectedData) {
                                                            //if (selectedData.selectedData.value > 0) {


                                                            //}
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
                                                    dm.dangerMessage('show', window.lang.translate('City not found...'), window.lang.translate('Bölge  bulunamamıştır...'));
                                                },
                                            })
                                            ajaxACLResources_getcity.ajaxCallWidget('call');
                                            //******************************************
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
                                dm.dangerMessage('show', window.lang.translate('Bölge bulunamamıştır...'), window.lang.translate('Bölge  bulunamamıştır...'));
                            },
                        })
                        ajaxACLResources_getprovince.ajaxCallWidget('call');


                        //////////////////////////////////////////////////////////

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

        columns: [{
            caption: "Branch",
            dataField: "StoreCity"
            },
            {
            caption:"Active/Passive",     
            //dataField: "active",
            dataType: "boolean"
            }
        ],

        rowPrepared: function (rowElement, rowInfo) {
            if (rowInfo.data.key === 1)
                rowElement.css('background', 'green');
            else if (rowInfo.data.key === 0)
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
                //var mydata = data;
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
});

