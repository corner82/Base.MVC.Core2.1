$(document).ready(function () {

    "use strict";

    var filldropdown = false;

    var ddslick_countryId = 0;
    var ddslick_country_name = "";
    var ddslick_provinceId = 0;
    var ddslick_province_name = "";
    var ddslick_cityId = 0;
    var ddslick_city_name = "";


    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });


/*
* Price List Hos LoadImager
* @author Ceydacan Seyrek
* @since 14/10/2018
*/
//Price List Hos form
    $("#loadingImage_PriceListHos").loadImager();
//to price list hos grid loading-image
    $("#loadingImage_priceHosGrid").loadImager();

    $("#loadingImage_DdslickModel").loadImager();
    $("#loadingImage_DdslickVehicle").loadImager();
    $("#loadingImage_DdslickWarranty").loadImager();
    //$("#loading-image-country").loadImager();
    //$("#loading-image-province").loadImager();
    //$("#loading-image-city").loadImager();
    var filldropdown = false;

    var ddslick_modelId = 0;
    var ddslick_model_name = "";
    var ddslick_warrantyId = 0;
    var ddslick_warranty_name = "";
    var ddslick_vehicleId = 0;
    var ddslick_vehicle_name = "";

    var langCode = $("#langCode").val();
    var TrainingNameID;
    var priceHosID;
    //alert(langCode);

///*
//* datepicker format
//* @author Ceydacan Seyrek
//* @since  14/10/2018
//*/
//$('#start-datepicker').datepicker({
//    //autoclose: true,
//    locale: langCode,
//    format: 'yyyy/mm/dd'
//});

//$('#end-datepicker').datepicker({
//    //autoclose: true,
//    locale: langCode,
//    format: 'yyyy/mm/dd'
//});

/*
* datepicker format
* @author Ceydacan Seyrek
* @since 29/08/2016
*/


/*
* Price List Hos Info insert form validation engine attached to work
* @since 14/10/2018
*/
    $('#priceListHosForm').validationEngine();
 
    //Model Group --> warranty name --> Vehicle End Group
    $("#loadingImage_DdslickModel").loadImager('removeLoadImage');
    $("#loadingImage_DdslickModel").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehicleGroupsDdList_sysvehiclegroups&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_model = $('#ajax_DdslickModel').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickModel",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleGroups',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_model.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datamodel) {

            var cbdata_model = $.parseJSON(datamodel);
            cbdata_model.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickModel').ddslick({
                data: cbdata_model,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {

                    $('#ddslickWarranty').ddslick('destroy');
                    $('#ddslickVehicle').ddslick('destroy');

                    if (selectedData.selectedData.value > 0) {
                        ddslick_modelId = selectedData.selectedData.value;

                        //Vehicle
                        $("#loadingImage_DdslickVehicle").loadImager('removeLoadImage');
                        $("#loadingImage_DdslickVehicle").loadImager('appendImage');

                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups&language_code=en&pk=GsZVzEYe50uGgNM&vehicle_groups_id=1
                        var ajaxACLResources_vehicle = $('#ajax_DdslickVehicle').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_DdslickVehicle",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Vehicle/SysVehicleEndGroup',
                            type: "POST",
                            data: JSON.stringify({
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                url: "pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups",
                                vehicle_group_id: ddslick_modelId,
                                pkIdentity: $("#publicKey").val()
                            })
                        });

                        ajaxACLResources_vehicle.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onSuccess: function (event, datavehicle) {

                                var cbdata_vehicle = $.parseJSON(datavehicle);
                                cbdata_vehicle.splice(0, 0,
                                    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                );

                                $('#ddslickVehicle').ddslick({
                                    data: cbdata_vehicle,
                                    width: '100%',
                                    //search: true,
                                    //searchText: window.lang.translate('Search'),
                                })
                                if (filldropdown === true) {
                                    $('#ddslickVehicle').ddslick('selectByValue',
                                        {
                                            index: '' + ddslick_vehicleId + '',
                                            value: '' + ddslick_vehicle_name + ''
                                        });
                                    filldropdown = false;
                                }
                                $('#loadingImage_DdslickVehicle').loadImager('removeLoadImage');
                            },
                            onAfterSuccess: function (event, data) {
                                $('#loadingImage_DdslickVehicle').loadImager('removeLoadImage');
                            }
                        })
                        ajaxACLResources_vehicle.ajaxCallWidget('call');
                        //Vehicle End

                        //Warranty
                        $("#loadingImage_DdslickWarranty").loadImager('removeLoadImage');
                        $("#loadingImage_DdslickWarranty").loadImager('appendImage');

                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkWarrantiesParentsDdList_syswarranties&vehicle_group_id=8&language_code=en&pk=GsZVzEYe50uGgNM
                        var ajaxACLResources_vehicle = $('#ajax_DdslickWarranty').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_DdslickWarranty",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Warranty/SysVehicleWarranty',
                            type: "POST",
                            data: JSON.stringify({
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                url: "pkWarrantiesParentsDdList_syswarranties",
                                vehicle_group_id: ddslick_modelId,
                                pkIdentity: $("#publicKey").val()
                            })
                        });

                        ajaxACLResources_vehicle.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onSuccess: function (event, datawarranty) {

                                var cbdata_warranty = $.parseJSON(datawarranty);
                                cbdata_warranty.splice(0, 0,
                                    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                );

                                $('#ddslickWarranty').ddslick({
                                    data: cbdata_warranty,
                                    width: '100%',
                                    //search: true,
                                    //searchText: window.lang.translate('Search'),
                                })
                                if (filldropdown === true) {
                                    $('#ddslickWarranty').ddslick('selectByValue',
                                        {
                                            index: '' + ddslick_warrantyId + '',
                                            value: '' + ddslick_warranty_name + ''
                                        });
                                    filldropdown = false;
                                }
                                $('#loadingImage_DdslickWarranty').loadImager('removeLoadImage');
                            },
                            onAfterSuccess: function (event, data) {
                                $('#loadingImage_DdslickWarranty').loadImager('removeLoadImage');
                            }
                        })
                        ajaxACLResources_vehicle.ajaxCallWidget('call');
                        //Warranty End

                    }
                }
            })
            $('#loadingImage_DdslickModel').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickModel').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_model.ajaxCallWidget('call');
    //Model Group --> warranty name --> Vehicle End Group End

/* devexgrid */
    DevExpress.localization.locale(langCode);

    $('#priceHosRefresh').click(function () {
    //price hos grid
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillEducationsSalesmanGridx_syseducationssalesman&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var priceListHos = new DevExpress.data.CustomStore({
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
                    id: priceHosID,
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
        $("#gridContainer_priceHos").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: priceListHos,
        columnHidingEnabled: true,
        selection: {
            mode: "single"
        },
        hoverStateEnabled: true,
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
            fileName: "priceListHos"
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
                var prInfo_id = options.data.id;

                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-save fa-2x").on('click', function () {
                        updateACLRoleDialog(prInfo_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                    }).appendTo(container);
                
            }
        },

        {
            caption: window.lang.translate('Active/Passive'),
            width: 40,
            alignment: 'center',
            encodeHtml: false,

            cellTemplate: function (container, options) {
                var fieldHtml;
                var prInfo_id = options.data.id;

                if (options.data.active === 1) {
                    //active
                    $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                        activepasivePrInfo(prInfo_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                    }).appendTo(container);
                } else if (options.data.active === 0) {
                    //pasive
                    $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                        activepasivePrInfo(prInfo_id, options.data.active);
                        //dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                    }).appendTo(container);
                }
            }
        },{
            caption: window.lang.translate('retail price') + "...",
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
            //alert("RowRemoving - gridContainer_priceHos");
            logEvent("RowRemoving");
        },
        onRowRemoved: function (e) {
            //alert("RowRemoved - gridContainer_priceHos");
            logEvent("RowRemoved");
        },

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                priceHosID = data.id;
                filldropdown = true;
                fillPriceHosForm(data);
            }
        },
        onRowRemoving: function (e) {
            priceHosID = e.key.id;
           // deleteTrInfo(trInfo_id);
        },
        onRowRemoved: function (e) {
            $("#gridContainer_priceHos").dxDataGrid("instance").refresh();
        },
    });

    });

    $('#priceHosRefresh').click();


/////////////////////Price List Hos Info/////////////////////

/**
* insert Price List Hos
* @returns {undefined}
* @since 14/10/2018
*/

    $("#btn-trInfo-save").on("click", function (e) {
        e.preventDefault();
        //alert("geldim click");
        if ($("#trainingInfoForm").validationEngine('validate')) {

            //window.insertTrainingInfo = function () {
            $("#loading-image-truser").loadImager('removeLoadImage');
            $("#loading-image-truser").loadImager('appendImage');


            var ddDataUser = $('#dropdownTrainer').data('ddslick');
            if (!ddDataUser.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select salesman"),
                    window.lang.translate("Please select salesman"));
                $('#loading-image-truser').loadImager('removeLoadImage');
                return false;
            }
            var user_id = ddDataUser.selectedData.value;

            var ddDataCity = $('#dropdownCity').data('ddslick');
            if (!ddDataCity.selectedData.value > 0) {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', window.lang.translate("Please select City"),
                    window.lang.translate("Please select City"));
                $('#loading-image-truser').loadImager('removeLoadImage');
                return false;
            }
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
                    resetTraningInfoForm();
                },
            })
            ajax_InsertTrainingInfo.ajaxCallWidget('call');
            $('#trListRefresh').click();
            return false;
        }
    })

/*
* reset button function for Price List Hos form
* @returns null
* @since 14/10/2018
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

        ddslick_countryId = 0;
        ddslick_country_name = "";

        ddslick_provinceId = 0;
        ddslick_province_name = "";

        ddslick_cityId = 0;
        ddslick_city_name = "";
        $('#dropdownProvince').ddslick('destroy');
        $('#dropdownCity').ddslick('destroy');
        //$('#dropdownTrName').ddslick('select', { index: String(0) });
        $('#dropdownTrainer').ddslick('select', { index: String(0) });
        //$('#dropdownCountry').ddslick('select', { index: String(0) });
        //$('#dropdownRegion').ddslick('select', { index: String(0) });
        //$('#dropdownCity').ddslick('select', { index: String(0) });

        $("#loading-image-truser").loadImager('removeLoadImage');
        $("#training_tab").organizeTabs('activatePrevTab');
        return false;
    }

/*
* Fill function for Price List Hos form
* @returns null
* @since 14/10/2018
*/

    window.fillPriceHosForm = function (data) {

        //$("#loading-image-truser").loadImager('removeLoadImage');
        //$("#loading-image-truser").loadImager('appendImage');

        //$('#dropdownTrName').ddslick('select', { index: 2 });
        $('#dropdownTrainer').ddslick('selectByValue',
            {
                index: '' + data.user_id + '',
                text: '' + data.name_surname + ''
            }
        );

        ddslick_countryId = data.country_id;
        ddslick_country_name = data.country_name;

        ddslick_provinceId = data.region_id;
        ddslick_province_name = data.region_name;

        ddslick_cityId = data.city_id;
        ddslick_city_name = data.city_name;
        $('#dropdownCountry').ddslick('selectByValue',
            {
                index: '' + data.country_id + '',
                text: '' + data.country_name + ''
            }
        );

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

/*
* Active Passive function for Price List Hos form
* @returns null
* @since 14/10/2018
*/

    window.activepasivePrInfo = function (prInfo_id, active) {

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
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Training/SysDeleteTrInfo',
            type: "POST",
            data: JSON.stringify({
                id: prInfo_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syseducationssalesman"
            }),

        });
        ajax_activepasiveTrInfolist.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_priceHos").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepasiveTrInfolist.ajaxCallWidget('call');  
        $('#priceHosRefresh').click();
    }


    window.updateACLRoleDialog = function (id, row) {
        window.gridReloadController = false;
        //console.log(row);
        BootstrapDialog.show({
            title: '"' + row.name + '" ACL rolünü güncellemektesiniz...',
            message: function (dialogRef) {
                var dialogRef = dialogRef;
                var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="aclRoleFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Rol Eng.</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  class="tag-container-popup">\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+ row.name + '" name="name_popup" id="name_popup"   />\n\
                                                                     </div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group" style="margin-top: 20px;">\n\
                                                             <label class="col-sm-2 control-label">Rol</label>\n\
                                                             <div class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <div  class="tag-container-popup">\n\
                                                                         <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+ row.name_tr + '" name="name_tr_popup" id="name_tr_popup"   />\n\
                                                                     </div>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">ACL Resource</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div id="mach-prod-box-popup" class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div id="dropdownACLResourcesPopup" ></div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Açıklama</label>\n\
                                                             <div  class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control validate[required]" rows="3" name="description_popup" id="description_popup" placeholder="Açıklama ...">'+ row.description + '</textarea>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateACLRoleWrapper(event, '+ id + ');">\n\
                                                                 <i class="fa fa-save"></i> Güncelle </button>\n\
                                                             <!--<button id="resetForm" onclick="regulateButtonsPopupInsert();" class="btn btn-flat" type="reset" " >\n\
                                                                 <i class="fa fa-remove"></i> Reset </button>-->\n\
                                                         </div>\n\
                                                     </div>\n\
                                                 </form>\n\
                                             </div>\n\
                                         </div>\n\
                                     </div>');
                return $message;
            },
            type: BootstrapDialog.TYPE_PRIMARY,
            onshown: function () {
                $('#aclRoleFormPopup').validationEngine();

                $("#mach-prod-box-popup").loadImager();
                $("#mach-prod-box-popup").loadImager('appendImage');
                var ddData;
                var ajaxACLResourcesPopup = $(window).ajaxCallWidget({
                    proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
                    data: {
                        url: 'pkFillResourcesDdList_sysAclResources',
                        pk: $("#pk").val()
                    }
                })
                ajaxACLResourcesPopup.ajaxCallWidget({
                    onError: function (event, textStatus, errorThrown) {
                        dm.dangerMessage({
                            onShown: function () {
                                //$('#mach-prod-box').loadImager('removeLoadImage'); 
                            }
                        });
                        dm.dangerMessage('show', 'ACL Resource (Kaynak) Bulunamamıştır...',
                            'ACL resource (kaynak) bulunamamıştır...');
                    },
                    onSuccess: function (event, data) {
                        var data = $.parseJSON(data);
                        $('#mach-prod-box-popup').loadImager('removeLoadImage');
                        $('#dropdownACLResourcesPopup').ddslick({
                            height: 200,
                            data: data,
                            width: '98%',
                            search: true,
                            multiSelect: true,
                            multiSelectTagID: 'deneme',
                            tagBox: 'tag-container-pop',
                            //imagePosition:"right",
                            onSelected: function (selectedData) {
                                if (selectedData.selectedData.value > 0) {
                                }
                            }
                        });

                        ddData = $('#dropdownACLResourcesPopup').data('ddslick');
                        //var resources ='[{"id" : "23", "text" : "test"}, {"id" :"34", "text" : "test2"}]';
                        var multiSelectTagID = $('#dropdownACLResourcesPopup').ddslick('getMultiSelectTagID');
                        var tagBox = $('#dropdownACLResourcesPopup').ddslick('getTagBox');
                        $('#dropdownACLResourcesPopup').ddslick('selectByMultiValues',
                            {
                                id: multiSelectTagID,
                                tagBox: '' + tagBox + ''
                            },
                            data,
                            row.multiSelect
                        );
                    },
                    onErrorDataNull: function (event, data) {
                        dm.dangerMessage({
                            onShown: function () {
                                //$('#mach-prod-box-popup').loadImager('removeLoadImage'); 
                            }
                        });
                        dm.dangerMessage('show', 'ACL Resource (Kaynak) Bulunamamıştır...',
                            'ACL resource (kaynak) bulunamamıştır...');
                    },
                })
                ajaxACLResourcesPopup.ajaxCallWidget('call');

            },
            onhide: function () {
                if (window.gridReloadController == true) {
                    $('#tt_grid_dynamic').datagrid('reload');
                }

            },
        });
        return false;
    }
});


