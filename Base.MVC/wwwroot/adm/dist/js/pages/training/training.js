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
    $("#loading-image-trNameGrid").loadImager();

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
    var TrainingNameID;
    var TrainingInfoID;
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
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCountryDdList_syscountrys",
            //pkIdentity: $("#publicKey").val()
        }),
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

                    $('#dropdownRegion').ddslick('destroy');

                    if (selectedData.selectedData.value > 0) {
                        var country_id = selectedData.selectedData.value;
                        //region
                        $('#loading-image-region').loadImager('removeLoadImage');
                        $("#loading-image-region").loadImager('appendImage');

                        var ajaxACLResources_region = $('#ajaxACL-region').ajaxCallWidget({
                            proxy: '/Sys/SysCountryRegions',
                            type: 'POST',
                            data: JSON.stringify({
                                //"country_id": country_id //country_id,url: pkCountryRegionsDdList_syscountryregions
                                url: "pkCountryRegionsDdList_syscountryregions",
                                country_id: country_id,
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                //pkIdentity: $("#publicKey").val()
                            }),
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

                                        $('#dropdownCity').ddslick('destroy');

                                        if (selectedData.selectedData.value > 0) {
                                            var region_id = selectedData.selectedData.value;
                 //city
                                            $('#loading-image-city').loadImager('removeLoadImage');
                                            $("#loading-image-city").loadImager('appendImage');

                                            var ajaxACLResources_city = $('#ajaxACL-city').ajaxCallWidget({
                                                proxy: '/Sys/SysCity',
                                                type: 'POST',
                                                data: JSON.stringify({
                                                    //"country_id": country_id,  //country_id, 
                                                    //"region_id": region_id     //province_id url: pkCityDdList_syscity
                                                    language_code: $("#langCode").val(),
                                                    pk: "GsZVzEYe50uGgNM",
                                                    url: "pkCityDdList_syscity",
                                                    country_id: country_id,
                                                    region_id: region_id,
                                                    //pkIdentity: $("#publicKey").val()
                                                }),
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
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillEducationDefinitionsGridx_syseducationdefinitions&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
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
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillEducationDefinitionsGridx_syseducationdefinitions",
                    pkIdentity: $("#publicKey").val(),
                    page: "",
                    rows: "",
                    sort: "",
                    order: "", //args.orderby,
                    skip: args.skip,
                    take: args.take
                }),
                type: 'POST',
                contentType: 'application/json',
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data Loading Error");
                },
                timeout: 10000
            });
            return deferred.promise();
        },
        remove: function (key) {
            var deferred = $.Deferred();

            return $.ajax({
                url: '/Training/SysDeleteTrName',
                dataType: "json",
                data: JSON.stringify({
                    id: TrainingNameID,
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDeletedAct_syseducationdefinitions"
                }),
                type: 'POST',
                contentType: 'application/json',
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data remove Error");
                },
                timeout: 10000
            });
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
        OnCellPrepared: function (options) {

            var fieldData = options.value;
            fieldHtml = "";

            fieldHtml = fieldData.value;
            options.cellElement.html(fieldHtml);

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
            dataField: "name",
            encodeHtml: false
        }, {
            caption: window.lang.translate('Active/Passive') + "...",
            dataField: "state_active",
            encodeHtml: false
        },{
            caption: window.lang.translate('Active/Passive'),
            width: 40,
            alignment: 'center',
            encodeHtml: false,

            cellTemplate: function (container, options) {
                var fieldHtml;
                var trName_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepasiveTrName(trName_id, options.data.active);
                        dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepasiveTrName(trName_id, options.data.active);
                        dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                    }).appendTo(container);
                }
            }
            //dataField: "active"
            }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                TrainingNameID = data.id;
                fillTrainingIdentForm(data);
            }
        },
        onRowRemoving: function (e) {
             TrainingNameID = e.key.id;
            //deleteTrName(trName_id);
        },
        onRowRemoved: function (e) {
            $("#gridContainer_trainingName").dxDataGrid("instance").refresh();
        },
    });
});

    $('#trListRefresh').click(function () {
    //Traning Info grid
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillEducationsSalesmanGridx_syseducationssalesman&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
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
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillEducationsSalesmanGridx_syseducationssalesman",
                    pkIdentity: $("#publicKey").val(),
                    page: "",
                    rows: "",
                    sort: "",
                    order: "", //args.orderby,
                    skip: args.skip,
                    take: args.take
                }),
                type: 'POST',
                contentType: 'application/json',
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data Loading Error");
                },
                timeout: 10000
            });
            return deferred.promise();
        },
        remove: function (key) {
            var deferred = $.Deferred();

            return $.ajax({
                url: '/Training/SysDeleteTrName',
                dataType: "json",
                data: JSON.stringify({
                    id: TrainingInfoID,
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkDeletedAct_syseducationssalesman"
                }),
                type: 'POST',
                contentType: 'application/json',
                success: function (result) {
                    deferred.resolve(result.items, { totalCount: result.totalCount });
                },
                error: function () {
                    deferred.reject("Data remove Error");
                },
                timeout: 10000
            });
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
        OnCellPrepared: function (options) {

            var fieldData = options.value;
            fieldHtml = "";

            fieldHtml = fieldData.value;
            options.cellElement.html(fieldHtml);

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
        columnWidth: {
            autoWidth: false
        },
        columns: [{
            caption: window.lang.translate('Active/Passive'),
            width: 40,
            alignment: 'center',
            encodeHtml: false,

            cellTemplate: function (container, options) {
                var fieldHtml;
                var trInfo_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepasiveTrInfo(trInfo_id, options.data.active);
                        dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepasiveTrInfo(trInfo_id, options.data.active);
                        dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                    }).appendTo(container);
                }
            }
        },{
            caption: window.lang.translate('Training Name') + "...",
            encodeHtml: false,
            dataField: "name"
        }, {
            caption: window.lang.translate('Trainer') + "...",
            encodeHtml: false,
            dataField: "name_surname"
        }, {
            caption: window.lang.translate('Training City') + "...",
            encodeHtml: false,
            dataField: "city_name"
        }, {
            caption: window.lang.translate('Training Address') + "1...",
            encodeHtml: false,
            dataField: "address1"
        }, {
            caption: window.lang.translate('Training Address') + "2...",
            encodeHtml: false,
            dataField: "address2"
        }, {
            caption: window.lang.translate('Training Address') + "3...",
            encodeHtml: false,
            dataField: "address3"
        }, {
            caption: window.lang.translate('Postal Code') + "...",
            encodeHtml: false,
            dataField: "postalcode"
        }, {
            caption: window.lang.translate('Explanation') + "...",
            encodeHtml: false,
            dataField: "description"
        }, {
            caption: window.lang.translate('Training start date') + "...",
            encodeHtml: false,
            dataField: "edu_start_date",
            dataType: "date"
        }, {
            caption: window.lang.translate('Training end date') + "...",
            encodeHtml: false,
            dataField: "edu_end_date",
            dataType: "date"
        }, {
            caption: window.lang.translate('Grade') + "...",
            encodeHtml: false,
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
                TrainingInfoID = data.id;
                fillTrainingInfoForm(data);
            }
        },
        onRowRemoving: function (e) {
            TrainingInfoID = e.key.id;
           // deleteTrInfo(trInfo_id);
        },
        onRowRemoved: function (e) {
            $("#gridContainer_trainingInfo").dxDataGrid("instance").refresh();
        },
    });

    });

    $('#trNameListRefresh').click();

    $('#trListRefresh').click();

/////////////////////Training Name/////////////////////

    /**
    * insert traning name
    * @returns {undefined}
    * @since 29/08/2018
    */
    $("#btn-trName-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#trainingIdentForm").validationEngine('validate')) {

            //window.insertTrainingName = function () {

            $("#loading-image-trInfo").loadImager('removeLoadImage');
            $("#loading-image-trInfo").loadImager('appendImage');

            var trainingname = $('#txt-trn-name').val();
            //if (!ddDataVehicleType.selectedData.value > 0) {
            //    wm.warningMessage('resetOnShown');
            //    wm.warningMessage('show', window.lang.translate("Please select vehicle type"),
            //        window.lang.translate("Please select vehicle type"));
            //    $('#tab_VehicleType').loadImager('removeLoadImage');
            //    return false;
            //}
            //alert(trainingname);

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php? url= pkInsertAct_syseducationdefinitions &name=aracdescriptioni &pk=GsZVzEYe50uGgNM

            var ajax_InsertTrainingName = $('#ajaxACL-insertTrainingName').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "loading-image-trInfo",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                proxy: '/Training/AddTrainingName',
                type: 'POST',
                data: JSON.stringify({
                    url: "pkInsertAct_syseducationdefinitions",
                    name: trainingname,
                    pk: "GsZVzEYe50uGgNM",
                })
            });
            ajax_InsertTrainingName.ajaxCallWidget({
                onReset: function (event, data) {
                    resetTrainingIdentForm();
                },
            })
            ajax_InsertTrainingName.ajaxCallWidget('call');
            $('#trNameListRefresh').click();
            return false;
        }
    })

    /*
    * reset button function for Training name form
    * @returns null
    * @since 29/08/2018
    */
    $("#btn-trName-clear").on("click", function (e) {
        e.preventDefault();
        resetTrainingIdentForm();
        return false;
    })

    var resetTrainingIdentForm = function () {
        $("#loading-image-trInfo").loadImager('removeLoadImage');
        $("#loading-image-trInfo").loadImager('appendImage');

        $('#trainingIdentForm')[0].reset(); 
        $('#trainingIdentForm').validationEngine('hide');

        $("#loading-image-trInfo").loadImager('removeLoadImage');

        //yeni kayda açık, tablar kapatılıyor
        //tab_disable();
        $("#training_tab").organizeTabs('disableAllTabs');
        return false;
    }


    //ActivePasive Training Name

    window.activepasiveTrName = function (trName_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syseducationdefinitions&id=29&pk=GsZVzEYe50uGgNM
        var ajax_activepasiveTrName = $('#ajaxACL-trNameList').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-trNameGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Training/SysActivePasiveTrName',
            type: "POST",
            data: JSON.stringify({
                id: trName_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syseducationdefinitions"
            }),

        });
        ajax_activepasiveTrName.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_trainingName").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasiveTrName.ajaxCallWidget('call');  
        $('#trListRefresh').click();
    }

    var trNameId = '';
    //Fill Training Name
    window.fillTrainingIdentForm = function (data) {
        $("#loading-image-trInfo").loadImager('removeLoadImage');
        $("#loading-image-trInfo").loadImager('appendImage');
        document.getElementById("txt-trn-name").value = data.name;
        //var trnametest = data.name;
        //var test = unescape(trnametest);
        //document.getElementById("txt-trn-name").value = test;
        document.getElementById("txt-training-trName").value = data.name;
        trNameId = data.id;
        $("#loading-image-trInfo").loadImager('removeLoadImage');
        $("#training_tab").organizeTabs('enableAllTabs');
        return false;
    }


/////////////////////Training Info/////////////////////

    /**
     * insert Training Info
     * @returns {undefined}
     * @since 07/08/2018
     */

    $("#btn-trInfo-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#trainingInfoForm").validationEngine('validate')) {

            //window.insertTrainingInfo = function () {
            $("#loading-image-truser").loadImager('removeLoadImage');
            $("#loading-image-truser").loadImager('appendImage');


            var ddDataUser = $('#dropdownTrainer').data('ddslick');
            var user_id = ddDataUser.selectedData.value;

            var ddDataCity = $('#dropdownCity').data('ddslick');
            var city_id = ddDataCity.selectedData.value;

            var address1 = $('#txt-TrAdr1-name').val();
            var address2 = $('#txt-TrAdr2-name').val();
            var address3 = $('#txt-TrAdr3-name').val();
            var postalcode = $('#txt-PtCode-name').val();
            var description = $('#txt-Explanation-name').val();
            var education_value = $('#txt-Grade-name').val();
            var edu_start_date = $('#start-datepicker').val();
            var edu_end_date = $('#end-datepicker').val();

            //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url= pkInsertAct_syseducationssalesman &=asd%20sok &address2=no%2011 &address3=dai%205 &postalcode=061010
            //& description=asdaasdasdasd &education_definition_id=1 &user_id=1 & city_id=1 &education_value=10 &edu_start_date=11/10/2018 &$eduEndDate=12/10/2018 &pk=GsZVzEYe50uGgN

            var ajax_InsertTrainingInfo = $('#ajaxACL-insertTrainingInfo').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "loading-image-truser",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),

                proxy: '/Training/AddTrainingInfo',
                type: 'POST',
                data: JSON.stringify({
                    url: "pkInsertAct_syseducationssalesman",
                    address1: address1, //$('#txt-TrAdr1-name').val(),
                    address2: address2, //$('#txt-TrAdr2-name').val(),
                    address3: address3, //$('#txt-TrAdr3-name').val(),
                    postalcode: postalcode, //$('#txt-PtCode-name').val(),
                    description: description, //$('#txt-Explanation-name').val(),
                    education_definition_id: trNameId,
                    user_id: user_id, //ddDataUser.selectedData.value,
                    city_id: city_id,//ddDataCity.selectedData.value,
                    education_value: education_value,// $('#txt-Grade-name').val(),
                    edu_start_date: edu_start_date, //"10/10/2018", //$('#start-datepicker').val(),
                    edu_end_date: edu_end_date,//"10/10/2018", //$('#end-datepicker').val(),
                    pk: "GsZVzEYe50uGgNM"
                })
            });

            ajax_InsertTrainingInfo.ajaxCallWidget({
                onReset: function (event, data) {
                    resetTrainingIdentForm();
                },
            })

            ajax_InsertTrainingInfo.ajaxCallWidget('call');

            return false;
        }
        $('#trListRefresh').click();
    })

     /*
    * reset button function for Training info form
    * @returns null
    * @since 29/08/2018
    */

    $("#btn-trInfo-clear").on("click", function (e) {
        e.preventDefault();
        resetTraningInfoForm();
        return false;
    })

    var resetTraningInfoForm = function () {
        $("#loading-image-truser").loadImager('removeLoadImage');
        $("#loading-image-truser").loadImager('appendImage');

        $('#trainingInfoForm')[0].reset(); 
        $('#trainingInfoForm').validationEngine('hide');

        //$('#dropdownTrName').ddslick('select', { index: String(0) });
        $('#dropdownTrainer').ddslick('select', { index: String(0) });
        $('#dropdownCountry').ddslick('select', { index: String(0) });
        //$('#dropdownRegion').ddslick('select', { index: String(0) });
        //$('#dropdownCity').ddslick('select', { index: String(0) });

        $("#loading-image-truser").loadImager('removeLoadImage');
        $("#training_tab").organizeTabs('activatePrevTab');
        return false;
    }

    //Fill Training info Form 
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

    //ActivePasive Training Info

    window.activepasiveTrInfo = function (trInfo_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Pasive successful');
        }

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_syseducationssalesman&id=29&pk=GsZVzEYe50uGgNM
        var ajax_activepasiveTrInfolist = $('#ajaxACL-trInfoList').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-trInfoGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Training/SysDeleteTrInfo',
            type: "POST",
            data: JSON.stringify({
                id: trInfo_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syseducationssalesman"
            }),

        });
        ajax_activepasiveTrInfolist.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_trainingName").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasiveTrInfolist.ajaxCallWidget('call');  
    }

});


