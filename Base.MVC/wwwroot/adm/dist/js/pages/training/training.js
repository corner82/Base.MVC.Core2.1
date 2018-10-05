﻿$(document).ready(function () {

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
    $("#loading-image-country").loadImager();
    $("#loading-image-region").loadImager();
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
    var tabOrganizer = $("#training_tab").organizeTabs({ tabID: "training_tab" });
    $("#training_tab").organizeTabs('disableAllTabs');

    /*
    * training Info insert form validation engine attached to work
    * @since 29/08/2016
    */
    $('#trainingIdentForm').validationEngine();
    $('#trainingInfoForm').validationEngine();

    /* Geçici data */
    //Dropdown plugin data
    var cbdata_country = [{}];
    var cbdata_select = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 0,
            selected: true
        }]
    //$('#dropdownRegion').ddslick({ data: cbdata_select });
    //$('#dropdownCity').ddslick({ data: cbdata_select });

    

    //trainee
    $('#loading-image-trainer').loadImager('removeLoadImage');
    $("#loading-image-trainer").loadImager('appendImage');

    var ajaxACLResources_trainer = $('#ajaxACL-trainer').ajaxCallWidget({
        proxy: '/Training/SysSalesman/',
        type: 'POST'
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
        onSuccess: function (event, data_trainer) {
            //var data = $.parseJSON(cbdata);
            var cbdata_trainer = $.parseJSON(data_trainer);
            cbdata_trainer.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownTrainer').ddslick({
                //height: 150,
                data: cbdata_trainer,
                width: '100%',

                onSelected: function (selectedData) {
                    //if (selectedData.selectedData.value > 0) {

                    //}
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
    //end trainee

    //country --> region--> city
    $('#loading-image-country').loadImager('removeLoadImage');
    $("#loading-image-country").loadImager('appendImage');

    var ajaxACLResources_country = $('#ajaxACL-country').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST'
    });

    ajaxACLResources_country.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-country').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, datacountry) {
            //var data = $.parseJSON(cbdata);
            var cbdata_country = $.parseJSON(datacountry);
            //cbdata_country.splice(0, 0,
            //    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            //);
            $('#dropdownCountry').ddslick({
                //height: 150,
                data: cbdata_country,
                search: true,
                searchText: window.lang.translate('Search'),
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        var country_id = selectedData.selectedData.value;
                        //region
                        $('#loading-image-region').loadImager('removeLoadImage');
                        $("#loading-image-region").loadImager('appendImage');

                        var ajaxACLResources_region = $('#ajaxACL-region').ajaxCallWidget({
                            proxy: '/Sys/SysCountryRegions',
                            type: 'GET',
                            data: {
                                "country_id": country_id //country_id,                              
                            },
                        });

                        ajaxACLResources_region.ajaxCallWidget({
                            onError: function (event, textStatus, errorThrown) {

                                dm.dangerMessage({
                                    onShown: function () {
                                        $('#loading-image-region').loadImager('removeLoadImage');
                                    }
                                });
                                dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
                            },
                            onSuccess: function (event, dataregion) {
                                //var data = $.parseJSON(cbdata);
                                var cbdata_region = $.parseJSON(dataregion);
                                //cbdata_region.splice(0, 0,
                                //    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                //);
                                $('#dropdownRegion').ddslick('destroy');
                                $('#dropdownRegion').ddslick({
                                    //height: 150,
                                    data: cbdata_region,
                                    search: true,
                                    searchText: window.lang.translate('Search'),
                                    width: '100%',
                                    
                                    onSelected: function (selectedData) {
                                        if (selectedData.selectedData.value > 0) {
                                            var region_id = selectedData.selectedData.value;
                 //city
                                            $('#loading-image-city').loadImager('removeLoadImage');
                                            $("#loading-image-city").loadImager('appendImage');

                                            var ajaxACLResources_city = $('#ajaxACL-city').ajaxCallWidget({
                                                proxy: '/Sys/SysCity',
                                                type: 'GET',
                                                data: {
                                                    "country_id": country_id,  //country_id, 
                                                    "region_id": region_id     //province_id 
                                                },

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
                                                onSuccess: function (event, data_city) {
                                                    //var data = $.parseJSON(cbdata);
                                                    var cbdata_city = $.parseJSON(data_city);
                                                    //cbdata_city.splice(0, 0,
                                                    //    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                                    //);
                                                    $('#dropdownCity').ddslick('destroy');
                                                    $('#dropdownCity').ddslick({
                                                        //height: 150,
                                                        data: cbdata_city,
                                                        search: true,
                                                        searchText: window.lang.translate('Search'),
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
                                                    dm.dangerMessage('show', 'city not show...', 'city not show...');
                                                },
                                            })
                                            ajaxACLResources_city.ajaxCallWidget('call');
    //end city

                                        }
                                    }
                                });

                                $("#loading-image-region").loadImager('removeLoadImage');
                            },

                            onErrorDataNull: function (event, data) {
                                console.log("Error : " + event + " -data :" + data);
                                dm.dangerMessage({
                                    onShown: function () {
                                        $('#loading-image-region').loadImager('removeLoadImage');
                                    }
                                });
                                dm.dangerMessage('show', 'region not show...', 'region not show...');
                            },
                        })
                        ajaxACLResources_region.ajaxCallWidget('call');
    //end region
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
            dm.dangerMessage('show', 'country not show...', 'country not show...');
        },
    })
    ajaxACLResources_country.ajaxCallWidget('call');
    //end country


    /* devexgrid */
    DevExpress.localization.locale(langCode);

    $('#trNameListRefresh').click(function () {
    //Training Name Grid
    var trainingDef = new DevExpress.data.CustomStore({
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
                url: '/Training/SysTrainingDefGrid',
                dataType: "json",
                data: args,
                type: 'POST',
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
    //Traning name Grid
    $("#gridContainer_trainingName").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: trainingDef,
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
            fileName: "trainingDef"
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
            caption: window.lang.translate('Training name') + "...",
            dataField: "name"
        }, {
            caption: window.lang.translate('Active/Passive') + "...",
            dataField: "state_active"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {

                fillTrainingIdentForm(data);
            }
        }
        });
    });


    $('#trListRefresh').click(function () {
    //Traning Info grid
    var trainingSalesman = new DevExpress.data.CustomStore({
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
                    url: '/Training/SysTraningSalesmanGrid',
                    dataType: "json",
                    type: 'POST',
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

    //Training List Info dxDataGrid
    $("#gridContainer_trainingInfo").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: trainingSalesman,
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
            fileName: "trainingSalesman"
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
            caption: window.lang.translate('Training Name') + "...",
            dataField: "name"
        }, {
            caption: window.lang.translate('Trainer') + "...",
            dataField: "name_surname"
        }, {
            caption: window.lang.translate('Training City') + "...",
            dataField: "city_name"
        }, {
            caption: window.lang.translate('Training Address') + "1...",
            dataField: "address1"
        }, {
            caption: window.lang.translate('Training Address') + "2...",
            dataField: "address2"
        }, {
            caption: window.lang.translate('Training Address') + "3...",
            dataField: "address3"
        }, {
            caption: window.lang.translate('Postal Code') + "...",
            dataField: "postalcode"
        }, {
            caption: window.lang.translate('Explanation') + "...",
            dataField: "description"
        }, {
            caption: window.lang.translate('Training start date') + "...",
            dataField: "edu_start_date",
            dataType: "date"
        }, {
            caption: window.lang.translate('Training end date') + "...",
            dataField: "edu_end_date",
            dataType: "date"
        }, {
            caption:window.lang.translate('Grade') + "...",
            dataField: "education_value"
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

    });

    $('#trNameListRefresh').click();

    $('#trListRefresh').click();

    //function logEvent(eventName) {
    //    var logList = $("#events ul"),
    //        newItem = $("<li>", { text: eventName });

    //    logList.prepend(newItem);
    //}

    /**
    * insert training name Wrapper
    * @returns {Boolean}
    * @since 29/08/2018
    */

    window.insertTrainingIdentWrapper = function (e) {
        //e.preventDefault();

        if ($("#trainingIdentForm").validationEngine('validate')) {

            insertTrainingName();
        }
        return false;
    }

    /**
    * insert traning name
    * @returns {undefined}
    * @since 29/08/2018
    */

    window.insertTrainingName = function () {

        $("#loading-image-trInfo").loadImager('removeLoadImage');
        $("#loading-image-trInfo").loadImager('appendImage');

        //var cst_name = $('#txt-trn-name').val();

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

    /*
    * reset button function for Training insert form
    * @returns null
    * @since 29/08/2018
    */
    window.resetTrainingIdentForm = function () {
        $("#loading-image-trInfo").loadImager('removeLoadImage');
        $("#loading-image-trInfo").loadImager('appendImage');

        $('#trainingIdentForm').validationEngine('hide');

        $("#loading-image-trInfo").loadImager('removeLoadImage');

        //yeni kayda açık, tablar kapatılıyor
        //tab_disable();
        $("#training_tab").organizeTabs('disableAllTabs');
        return false;
    }

    window.fillTrainingIdentForm = function (data) {
        $("#loading-image-trInfo").loadImager('removeLoadImage');
        $("#loading-image-trInfo").loadImager('appendImage');

        document.getElementById("txt-trn-name").value = data.name;
        document.getElementById("txt-training-trName").value = data.name;

        $("#loading-image-trInfo").loadImager('removeLoadImage');
        $("#training_tab").organizeTabs('enableAllTabs');
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

    /**
     * insert Training Info
     * @returns {undefined}
     * @since 07/08/2018
     */

    window.insertTrainingInfo = function () {
        $("#loading-image-truser").loadImager('removeLoadImage');
        $("#loading-image-truser").loadImager('appendImage');

        //training id alınacak
       // var cst_id = 1;

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

        //$('#dropdownTrName').ddslick('select', { index: String(0) });
        $('#dropdownTrainer').ddslick('select', { index: String(0) });
        $('#dropdownCountry').ddslick('select', { index: String(0) });
        $('#dropdownRegion').ddslick('select', { index: String(0) });
        $('#dropdownCity').ddslick('select', { index: String(0) });

        $("#loading-image-truser").loadImager('removeLoadImage');
        $("#training_tab").organizeTabs('activatePrevTab');
        return false;
    }

    //Training info Form
    window.fillTrainingInfoForm = function (data) {

        //$("#loading-image-truser").loadImager('removeLoadImage');
        //$("#loading-image-truser").loadImager('appendImage');

        //$('#dropdownTrName').ddslick('select', { index: 2 });
        //$('#dropdownTrainer').ddslick('selectByValue',
        //    {
        //        index: '' + data.user_id + '',
        //        text: '' + data.name_surname + ''
        //    }
        //);
        $('#dropdownCountry').ddslick('selectByValue',
            {
                index: '' + data.country_id + '',
                text: '' + data.country_name + ''
            }
        );

        //$('#dropdownRegion').ddslick('selectByValue',
        //    {
        //        index: '' + data.region_id + '',
        //        text: '' + data.region_name + ''
        //    }
        //);

        //$('#dropdownCity').ddslick('selectByValue',
        //    {
        //        index: '' + data.city_id + '',
        //        text: '' + data.city_name + ''
        //    }
        //);
        document.getElementById("txt-TrAdr1-name").value = data.address1;
        document.getElementById("txt-TrAdr2-name").value = data.address2;
        document.getElementById("txt-TrAdr3-name").value = data.address3;
        document.getElementById("txt-PtCode-name").value = data.postalcode;
        document.getElementById("txt-Explanation-name").value = data.description;
        document.getElementById("start-datepicker").value = data.edu_start_date;
        document.getElementById("end-datepicker").value = data.edu_end_date;
        document.getElementById("txt-Grade-name").value = data.education_value;
        //$("#loading-image-truser").loadImager('removeLoadImage');

        return false;
    }
});

