/*
* Vehicle Form
* @author Gül Özdemir
* @since 15/08/2016
*/
$(document).ready(function () {

    "use strict";

    var selectedVehicleId;
    var filldropdown = false;

    var ddslick_vehicleModelId = 0;
    var ddslick_vehicleModelName = "";
    var ddslick_vehicleModelGrTypeId = 0;
    var ddslick_vehicleModelGrTypeName = "";
    var ddslick_vehicleModelGrTypeTonajId = 0;
    var ddslick_vehicleModelGrTypeTonajName = "";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Continue')
    });


    /*
    * Vehicle LoadImager
    * @author Gül Özdemir
    * @since 15/08/2016
    */
    //to vehicle form
    $("#loadingImage_FormVehicle").loadImager();
    
    $("#loadingImage_DdslickVehicleKitType").loadImager();
    $("#loadingImage_DdslickApplicationType").loadImager();
    $("#loadingImage_DdslickVehicleModel").loadImager();
    $("#loadingImage_DdslickVehicleModelGr").loadImager();
    $("#loadingImage_DdslickVehicleType").loadImager();
    $("#loadingImage_DdslickVehicleVariant").loadImager();
    $("#loadingImage_DdslickVehicleTonaj").loadImager();
    $("#loadingImage_DdslickHorsepower").loadImager();
    $("#loadingImage_DdslickCab").loadImager();
    $("#loadingImage_DdslickConfig").loadImager();
    $("#loadingImage_DdslickKP").loadImager();
    $("#loadingImage_DdslickBTOBTS").loadImager();

    //to vehiclemodel form grid loading-image
    $("#loadingImage_GridVehicle").loadImager();
    $("#loadingImage_GridVehicleBuybackTradeback").loadImager();

    $('#vehicleForm').validationEngine(); 

    var langCode = $("#langCode").val();

    var vehicleModel = "";
    var vehicleType = "";
    //alert(langCode);

//KP NO gelmediği için geçici olarak cbdata açıldı.
/*
    var cbdata = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "CKD",
            value: 2,
            selected: false
        },
        {
            text: "CBU",
            value: 3,
            selected: false
        }
    ];
*/
    //CKD / CBU
    var ajaxACLResources_vehiclekittype = $('#ajax_DdslickVehicleKitType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleKitType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleCKDCBU/',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleCkdCbuDdList_sysvehicleckdcbu",
            pkIdentity: $("#publicKey").val()   
        })
    });
    ajaxACLResources_vehiclekittype.ajaxCallWidget({
        onSuccess: function (event, datakittype) {
            var cbdata_kittype = $.parseJSON(datakittype);
            cbdata_kittype.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickVehicleKitType').ddslick({
                data: cbdata_kittype,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);
                        vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }

                }
            });

            $("#loadingImage_DdslickVehicleKitType").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {
            
        },
        onAfterSuccess: function (event, data) {
            $("#loadingImage_DdslickVehicleKitType").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_vehiclekittype.ajaxCallWidget('call');


    //Vehicle Model/Groups
    //CLA, TGM, TGS, VW, XHCV
    var ajaxACLResources_vehiclemodel = $('#ajax_DdslickVehicleModel').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleModel",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleGroups/',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_vehiclemodel.ajaxCallWidget({
        onSuccess: function (event, datamodel) {
            var cbdata_model = $.parseJSON(datamodel);
            cbdata_model.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickVehicleModel').ddslick({
                data: cbdata_model,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {

                    $('#ddslickVehicleModelGr').ddslick('destroy');
                    
                    if(selectedData.selectedData.value > 0) {
                        vehicleModel = selectedData.selectedData.text;

                        ddslick_vehicleModelId = selectedData.selectedData.value;

                        //CLA CBU 2-axis , CLA CBU 3- & 4-axis, TGM < 16t non tract.
                        var ajaxACLResources_vehiclemodelgr = $('#ajax_DdslickVehicleModel').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_DdslickVehicleModelGr",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Vehicle/SysVehicleGroupTypes/',
                            type: 'POST',
                            data: JSON.stringify({
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                url: "pkVehicleGroupTypesDdList_sysvehiclegrouptypes",
                                pkIdentity: $("#publicKey").val(),
                                vehicle_groups_id: ddslick_vehicleModelId
                            })
                        });
                        ajaxACLResources_vehiclemodelgr.ajaxCallWidget({
                            onSuccess: function (event, datamodelgr) {
                                var cbdata_modelgr = $.parseJSON(datamodelgr);
                                cbdata_modelgr.splice(0, 0,{ text: window.lang.translate('Please select'), value: 0, selected: false, description: "" });
                                $('#ddslickVehicleModelGr').ddslick({
                                    data: cbdata_modelgr,
                                    width: '100%',
                                    search: true,
                                    searchText: window.lang.translate('Search'),
                                    onSelected: function (selectedData) {
                                        if (selectedData.selectedData.value > 0) {
                                            //Vehicle model group type ///////////////////////////////////////////
                                            //
                                            ddslick_vehicleModelGrTypeId = selectedData.selectedData.value;

                                            var ajaxACLResources_vehiclemodelgrtonaj = $('#ajax_DdslickVehicleModelGrTonaj').ajaxCallWidget({
                                                failureLoadImage: true,
                                                loadingImageID: "loadingImage_DdslickVehicleModelGrTonaj",
                                                triggerSuccessAuto: true,
                                                transactionSuccessText: window.lang.translate('Transaction successful'),
                                                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                                                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                                                proxy: '/Vehicle/SysVehicleGTModels/',
                                                type: 'POST',
                                                data: JSON.stringify({
                                                    language_code: $("#langCode").val(),
                                                    pk: "GsZVzEYe50uGgNM",
                                                    url: "pkVehicleGtModelsDdList_sysvehiclegtmodels",
                                                    pkIdentity: $("#publicKey").val(),
                                                    vehicle_group_types_id: ddslick_vehicleModelGrTypeId
                                                })
                                            });
                                            ajaxACLResources_vehiclemodelgrtonaj.ajaxCallWidget({
                                                onSuccess: function (event, datamodelgrtypetonaj) {
                                                    var cbdata_modelgrtypetonaj = $.parseJSON(datamodelgrtypetonaj);
                                                    cbdata_modelgrtypetonaj.splice(0, 0,
                                                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                                    );
                                                    $('#ddslickVehicleModelGrTonaj').ddslick({
                                                        data: cbdata_modelgrtypetonaj,
                                                        width: '100%',

                                                        onSelected: function (selectedData) {
                                                            if (selectedData.selectedData.value > 0) {
                                                                //alert(selectedData.selectedData.text);
                                                                vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                                                            }

                                                        }
                                                    });

                                                    $("#loadingImage_DdslickVehicleModelGrTonaj").loadImager('removeLoadImage');
                                                },
                                                onReset: function (event, data) {

                                                },
                                                onAfterSuccess: function (event, data) {
                                                    $("#loadingImage_DdslickVehicleModelGrTonaj").loadImager('removeLoadImage');
                                                }
                                            })
                                            ajaxACLResources_vehiclemodelgrtonaj.ajaxCallWidget('call');
                                            //Vehicle Type bitti ///////////////////////////////////////////

                                        }
                                    }
                                });

                                $("#loadingImage_DdslickVehicleModelGr").loadImager('removeLoadImage');
                            },
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#loadingImage_DdslickVehicleModelGr").loadImager('removeLoadImage');
                            }
                        })
                        ajaxACLResources_vehiclemodelgr.ajaxCallWidget('call');

                    }
                    else {
                        vehicleModel = "";
                    }
                    document.getElementById("txt-vehicle-name").value = vehicleModel + "-" + document.getElementById("txt-modeldescription").value;


                }
            });

            $("#loadingImage_DdslickVehicleModel").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {
            
        },
        onAfterSuccess: function (event, data) {
            $("#loadingImage_DdslickVehicleModel").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_vehiclemodel.ajaxCallWidget('call');

    /////////////////////////////////////////////////////////////////////////
//http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkHorsePowerDdList_syshorsepower&language_code=en&project_id=1&pk=GsZVzEYe50uGgNM
//HorsePower
    var ajaxACLResources_vehiclehorsepower = $('#ajax_DdslickHorsepower').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickHorsepower",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleHorsepower/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkHorsePowerDdList_syshorsepower",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_vehiclehorsepower.ajaxCallWidget({
        onSuccess: function (event, datahorsepower) {
            var cbdata_horsepower = $.parseJSON(datahorsepower);
            cbdata_horsepower.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickHorsepower').ddslick({
                data: cbdata_horsepower,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);
                        
                    }

                }
            });

            $("#loadingImage_DdslickHorsepower").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loadingImage_DdslickHorsepower").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_vehiclehorsepower.ajaxCallWidget('call');

    //Vehicle Variant
    //T/T, F/C, TIP, MIX, Tipper
    var ajaxACLResources_vehiclevariant = $('#ajax_DdslickVehicleVariant').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleVariant",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleModelVariant/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleModelVariantsDdList_sysvehiclemodelvariants",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_vehiclevariant.ajaxCallWidget({
        onSuccess: function (event, datavariant) {
            var cbdata_variant = $.parseJSON(datavariant);
            cbdata_variant.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickVehicleVariant').ddslick({
                data: cbdata_variant,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickVehicleVariant").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loadingImage_DdslickVehicleVariant").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_vehiclevariant.ajaxCallWidget('call');

    //Config bilgileri
    //4x2, 4x4, 6x4, 8x4, 6x6, 8x8, 8x4/4

    var ajaxACLResources_config = $('#ajax_DdslickConfig').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickConfig",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleConfigTypes/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleConfigTypesDdList_sysvehicleconfigtypes",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_config.ajaxCallWidget({
        onSuccess: function (event, dataconfig) {
            var cbdata_config = $.parseJSON(dataconfig);
            cbdata_config.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickConfig').ddslick({
                //height: 150,
                data: cbdata_config,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickConfig").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loadingImage_DdslickVehicleKitType").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_config.ajaxCallWidget('call');



    //4x2, 4x4, 6x4, 8x4, 6x6, 8x8, 8x4/4

    //CAB
    var ajaxACLResources_cab = $('#ajax_DdslickCab').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickCab",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleCabTypes/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleCapTypesDdList_sysvehiclecaptypes",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_cab.ajaxCallWidget({
        onSuccess: function (event, datacab) {
            var cbdata_cab = $.parseJSON(datacab);
            cbdata_cab.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickCab').ddslick({
                data: cbdata_cab,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickCab").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loadingImage_DdslickCab").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_cab.ajaxCallWidget('call');

    //KP

    var ajaxACLResources_kp = $('#ajax_DdslickKPNo').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickKP",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleKPNumbers/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkKpnumbersDdList_syskpnumbers",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_kp.ajaxCallWidget({
        onSuccess: function (event, datakp) {
            var cbdata_kp = $.parseJSON(datakp);
            cbdata_kp.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickKPNo').ddslick({
                data: cbdata_kp,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickKP").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loadingImage_DdslickKP").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_kp.ajaxCallWidget('call');


    //BTO / BTS
    var ajaxACLResources_btobts = $('#ajax_DdslickBTOBTS').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickBTOBTS",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleBTOBTS/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleBtoBtsTypesDdList_sysvehiclebtobts",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_btobts.ajaxCallWidget({
        onSuccess: function (event, btobtsdata) {
            var cbdata_btobts = $.parseJSON(btobtsdata);
            cbdata_btobts.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickBTOBTS').ddslick({
                data: cbdata_btobts,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickBTOBTS").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loadingImage_DdslickVehicleKitType").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_btobts.ajaxCallWidget('call');

    //Longhaul, Traction/distribution, Hydrodrive, Heavy Duty

    var ajaxACLResources_applicationtype = $('#ajax_DdslickApplicationType').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickApplicationType",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleAppTypes/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleAppTypesDdList_sysvehicleapptypes",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_applicationtype.ajaxCallWidget({
        onSuccess: function (event, cbdata_app) {
            var cbdata_apptype = $.parseJSON(cbdata_app);
            cbdata_apptype.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickApplicationType').ddslick({
                data: cbdata_apptype,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            //$('#ddslickApplicationType').ddslick('disable');
            //$('#ddslickApplicationType').ddslick('enable');

            $("#loadingImage_DdslickApplicationType").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loadingImage_DdslickApplicationType").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_applicationtype.ajaxCallWidget('call');

    DevExpress.localization.locale(langCode);

    /**
*.vehicleList Refresh
* @returns 
* @author Gül Özdemir
* @since 03/09/2018
*/
    $('#vehicleList').click(function () {

        /* devexgrid */
        var vehicle_data = new DevExpress.data.CustomStore({
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
                    url: '/Vehicle/SysVehicleGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillVehiclesGridx_sysvehicles",
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
                    timeout: 30000
                });

                return deferred.promise();
            },
            remove: function (key) {
                var deferred = $.Deferred();
                alert(selectedVehicleId);

                return $.ajax({
                    url: '/Vehicle/SysDeleteVehicle',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedVehicleId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysvehicles"
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data remove Error");
                    },
                    timeout: 30000
                });
            }
        });

        DevExpress.localization.locale(langCode);

        $(function () {
            $("#gridContainer_vehicle").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: vehicle_data,

                columnHidingEnabled: true,

                selection: {
                    mode: "single"
                },

                hoverStateEnabled: true,

                editing: {
                    //mode: "batch"
                    mode: "form",
                    //allowAdding: true,
                    //allowUpdating: true,
                    allowDeleting: true,
                    useIcons: true
                },

                "export": {
                    enabled: true,
                    fileName: window.lang.translate('VehicleList')
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


                columns: [
                    {
                        caption: window.lang.translate('Active/Passive'),
                        width: 40,
                        alignment: 'center',

                        cellTemplate: function (container, options) {
                            var fieldHtml;
                            var vehicle_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveVehicle(vehicle_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveVehicle(vehicle_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                    },
                // {"id":"1","apid":1,"ckdcbu_type_id":1,"cbuckd_name":"CBU",
            // "vehicle_gt_model_id":1,
            // "gt_model_name":"26.280",
            // "model_variant_id":1,
            // "variant_name":"Tipper",
            // "config_type_id":1,
            // "config_type_name":"4 X 2",
            // "cap_type_id": 1,
            // "cap_type_name": "C",
            // "vehicle_app_type_id": 1,
            // "app_type_name":"Longhaul",
            // "kpnumber_id": 1,
            // "kp_name": "KP000404",
            // "btsbto_type_id": 1,
            // "btobts_name":"BTO",
            // "roadtype_id": 1,
            // "road_type_name": "dsdfsdf",
            // "gfz": "4r34r3",
            // "factorymodel_name":"sdfsfsdf","op_username":"admin@gmail.com",
            // "state_active":"Active","date_saved":"2018-08-31 20:21:35","date_modified":null,
                    // "language_code":"en","active":0,"op_user_id":0,"language_id":"385","language_name":"English"}
                    {
                        caption: window.lang.translate('Vehicle name'),
                        dataField: "factorymodel_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Vehicle kit type'),
                        dataField: "cbuckd_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Vehicle model'),
                        dataField: "gt_model_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Vehicle model type'),
                        dataField: "factorymodel_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Vehicle model type tonaj'),
                        dataField: "factorymodel_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Horsepower'),
                        dataField: "factorymodel_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Config'),
                        dataField: "config_type_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Vehicle Variant'),
                        dataField: "variant_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Vehicle Cab'),
                        dataField: "cap_type_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('GFZ'),
                        dataField: "gfz",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('KP No'),
                        dataField: "kp_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('BTO/BTS'),
                        dataField: "btobts_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Model Description'),
                        dataField: "factorymodel_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Application Type'),
                        dataField: "app_type_name",
                        encodeHtml: false
                    }
                ], 
                rowPrepared: function (rowElement, rowInfo) {
                    return false;
                    //if (rowInfo.data.key === 1)
                    //    rowElement.css('background', 'green');
                    //else if (rowInfo.data.key === 0)
                    //    rowElement.css('background', 'yellow');

                },

                onSelectionChanged: function (selectedItems) {
                    var data = selectedItems.selectedRowsData[0];
                    if (data) {
                        selectedVehicleId = data.id;
                        filldropdown = true;
                        //fillVehicleForm(data);

                    }
                },

                onRowRemoving: function (e) {
                    selectedVehicleId = e.key.id;
    
                    alert(selectedVehicleId);
                },

                onRowRemoved: function (e) {
                    $("#gridContainer_vehicle").dxDataGrid("instance").refresh();
                },

            });
        });
    })
/*
 *$('#vehicleList').click(function () {

        var vehicle_dxGridListData = new DevExpress.data.CustomStore({
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
                    url: '/Vehicle/SysVehicleList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillVehiclesGridx_sysvehicles",
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
                    timeout: 30000
                });

                return deferred.promise();
            },
            remove: function (key) {
                var deferred = $.Deferred();

                return $.ajax({
                    url: '/Sys/SysDeleteVehicle',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedBranchId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysvehicles"
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data remove Error");
                    },
                    timeout: 30000
                });
            }
        });

        $("#gridContainer_vehicle").dxDataGrid({

            showColumnLines: true,

            showRowLines: true,

            showBorders: true,

            dataSource: vehicle_dxGridListData,

            columnHidingEnabled: true,

            selection: {
                mode: "single"
            },

            hoverStateEnabled: true,

            editing: {
                //mode: "batch"
                mode: "form",
                //allowAdding: true,
                //allowUpdating: true,
                allowDeleting: true,
                useIcons: true
            },

            "export": {
                enabled: true,
                fileName: window.lang.translate('Vehicle list'),
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

            
            // {"id":"1","apid":1,"ckdcbu_type_id":1,"cbuckd_name":"CBU",
            // "vehicle_gt_model_id":1,
            // "gt_model_name":"26.280",
            // "model_variant_id":1,
            // "variant_name":"Tipper",
            // "config_type_id":1,
            // "config_type_name":"4 X 2","cap_type_id":1,"cap_type_name":"C","vehicle_app_type_id":1,
            // "app_type_name":"Longhaul","kpnumber_id":1,"kp_name":"KP000404","btsbto_type_id":1,
            // "btobts_name":"BTO","roadtype_id":1,"road_type_name":"dsdfsdf","gfz":"4r34r3",
            // "factorymodel_name":"sdfsfsdf","op_username":"admin@gmail.com",
            // "state_active":"Active","date_saved":"2018-08-31 20:21:35","date_modified":null,
            // "language_code":"en","active":0,"op_user_id":0,"language_id":"385","language_name":"English"}
             

            columns: [
            {
                caption: window.lang.translate('Active/Passive'),
                width: 40,
                alignment: 'center',

                cellTemplate: function (container, options) {
                    var fieldHtml;
                    var vehicle_id = options.data.id;

                    if (options.data.active === 1) {
                        //active
                        $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                            activepassiveVehicle(vehicle_id, options.data.active);

                        }).appendTo(container);
                    } else if (options.data.active === 0) {

                        //passive
                        $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                            activepassiveVehicle(vehicle_id, options.data.active);

                        }).appendTo(container);
                    }

                    //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                    //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                    //}).appendTo(container); 

                }

            },{
                caption: window.lang.translate('Vehicle name'),
                dataField: "factorymodel_name"
            }, {
                caption: window.lang.translate('Vehicle Kit Type'),
                dataField: "cbuckd_name"
            }, {
                caption: window.lang.translate('Vehicle Model Grouping'),
                dataField: "gt_model_name"
            }, {
                caption: window.lang.translate('Vehicle type'),
                dataField: "factorymodel_name"
            }, {
                caption: window.lang.translate('Vehicle tonaj type'),
                dataField: "factorymodel_name"
            }, {
                caption: window.lang.translate('GVM'),
                dataField: "factorymodel_name"
            }, {
                caption: window.lang.translate('Config'),
                dataField: "config_type_name"
            }, {
                caption: window.lang.translate('Vehicle Variant'),
                dataField: "variant_name"
            }, {
                caption: window.lang.translate('Vehicle Cab'),
                dataField: "cap_type_name"
            }, {
                caption: window.lang.translate('GFZ'),
                dataField: "gfz"
            }, {
                caption: window.lang.translate('KP No'),
                dataField: "kp_name"
            }, {
                caption: window.lang.translate('BTO/BTS'),
                dataField: "btobts_name"
            }, {
                caption: window.lang.translate('Model Description'),
                dataField: "factorymodel_name"
            }, {
                caption: window.lang.translate('Application Type'),
                dataField: "app_type_name"
            }, {
                caption: window.lang.translate('Property'),
                dataField: "factorymodel_name"
            }
            ],
            rowPrepared: function (rowElement, rowInfo) {
                return false;
                //if (rowInfo.data.key === 1)
                //    rowElement.css('background', 'green');
                //else if (rowInfo.data.key === 0)
                //    rowElement.css('background', 'yellow');

            },

            onSelectionChanged: function (selectedItems) {
                var data = selectedItems.selectedRowsData[0];
                if (data) {
                    selectedVehicleId = data.vehicle_id;
                    filldropdown = true;
                    fillVehicleForm(data);
                }
            },

            onRowRemoving: function (e) {
                selectedVehicleId = e.key.id;
                //alert(selectedBranchId);
            },

            onRowRemoved: function (e) {
                $("#gridContainer_vehicle").dxDataGrid("instance").refresh();
            },
        });
    });
    */
    /**
    *.vehicleBTDescList Refresh
    * @returns 
    * @author Gül Özdemir
    * @since 03/09/2018
    */
/*
    $('#vehicleBTDescList').click(function () {
       // devexgrid 
        var vehicleBTDesc_dxGridListData = new DevExpress.data.CustomStore({
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
                    url: '/Vehicle/SysVehicleList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillVehiclesGridx_sysvehicles",
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
                    timeout: 30000
                }); 

                return deferred.promise();
            },
            remove: function (key) {
                var deferred = $.Deferred();

                return $.ajax({
                    url: '/Sys/SysDeleteVehicle',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedBranchId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysvehicles"
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                    },
                    error: function () {
                        deferred.reject("Data remove Error");
                    },
                    timeout: 30000
                });
            }
        });


        $("#gridContainer_vehicle_buybacktradeback_desc").dxDataGrid({

            showColumnLines: true,

            showRowLines: true,

            showBorders: true,

            dataSource: vehicleBTDesc_dxGridListData,

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

            pager: {
                allowedPageSizes: [3, 6, 9, 12],
                showInfo: true,
                showNavigationButtons: true,
                showPageSizeSelector: true,
                visible: true
            },

            paging: {
                pageSize: 3
            },

            columns: [{
                caption: window.lang.translate('Buyback & Tradeback descriptions'),
                dataField: "factorymodel_name"
            }],

            onSelectionChanged: function (selectedItems) {
                var data = selectedItems.selectedRowsData[0];
                if (data) {
                    //fillVehicleForm(data);
                }
            }

        });

    });

*/
/*
    $('#vehicleBTDescList').click();

   
*/

    $('#vehicleList').click();

    /**
 * insertVehicle
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 15/08/2018
 */
/*
    window.insertVehicle= function () {
        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
        $("#loadingImage_FormVehicle").loadImager('appendImage');

        var vehicle_name = $('#txt-vehicle-name').val();
        var gfz = $('#txt-gfz').val();
        var gfz_vehicletype = $('#txt-gfz-vehicletype').val();

        alert("insertVehicle");

        var ajax_GetVehicleInsert = $(ajax_FormVehicle).ajaxCallWidget({
            proxy: '/Vehicle/SysInsertVehicle',
            type: 'GET',
            data: {
                //url=pkInsertAct_sysvehicles & description=aracdescriptioni& factorymodel_name=xcv& gfz=ggttrr& ckdcbu_type_id=1& vehicle_gt_model_id=2& model_variant_id=1& config_type_id=2& cap_type_id=3& vehicle_app_type_id=1& kpnumber_id=5& btsbto_type_id=1& roadtype_id=2& pk=GsZVzEYe50uGgNM
                url: "pkInsertAct_sysvehicles",
                description: "TEST1",
                factorymodel_name: "fm1",
                gfz: "gfz1",
                ckdcbu_type_id: "2",
                vehicle_gt_model_id: "3",
                model_variant_id: "2",
                config_type_id: "3",
                cap_type_id: "2",
                vehicle_app_type_id: "1",
                kpnumber_id: "55",
                btsbto_type_id: "1",
                roadtype_id: "2",
                language_code:"en",
                pk: "GsZVzEYe50uGgNM"
            },
        });

        ajax_GetVehicleInsert.ajaxCallWidget({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'vehicle Ekleme İşlemi Başarısız...',
                    'vehicle Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysVehicle" servis hatası->' + textStatus);
                $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#vehicleForm')[0].reset();

                        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'vehicle Kayıt İşlemi Başarılı...',
                    'vehicle kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loadingImage_FormVehicle").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'vehicle Kayıt İşlemi Başarısız...',
                    'vehicle kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysvehiclemodel" servis datası boştur!!');
                $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'vehiclemodel Kayıt İşlemi Başarısız...',
                    'vehiclemodel kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysvehiclemodel" servis datası boştur!!');
                $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#vehicleForm')[0].reset();
                        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Araç kaydı yapılmıştır, yeni bir araç kaydı deneyiniz... ');
                $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
            }
        })
        ajax_GetVehicleInsert.ajaxCallWidget('call');
    }
*/
 /**
 * reset vehicle Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 15/08/2018
 */

    window.resetVehicleForm = function () {
        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
        $("#loadingImage_FormVehicle").loadImager('appendImage');

        selectedVehicleId = 0;

        ddslick_vehicleModelId = 0;
        ddslick_vehicleModelName = "";

        ddslick_vehicleModelGrTypeId = 0;
        ddslick_vehicleModelGrTypeName = "";

        ddslick_vehicleModelGrTypeTonajId = 0;
        ddslick_vehicleModelGrTypeTonajName = "";

        $('#vehicleForm').validationEngine('hide');

        $('#ddslickVehicleKitType').ddslick('select', { index: String(0) });
        $('#ddslickVehicleModel').ddslick('select', { index: String(0) });
        $('#ddslickVehicleModelGr').ddslick('destroy');
        $('#ddslickVehicleModelGrTonaj').ddslick('destroy');
        $('#ddslickHorsepower').ddslick('select', { index: String(0) });
        $('#ddslickConfig').ddslick('select', { index: String(0) });
        $('#ddslickVehicleVariant').ddslick('select', { index: String(0) });
        $('#ddslickCab').ddslick('select', { index: String(0) });
        $('#ddslickKPNo').ddslick('select', { index: String(0) });
        $('#ddslickBTOBTS').ddslick('select', { index: String(0) });
        $('#ddslickApplicationType').ddslick('select', { index: String(0) });

        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');

        return false;
    }

    /**
    * insert Vehicle Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 15/08/2018
    */
/*
    window.insertVehicleWrapper = function (e) {
        alert("GELDİM 1");
        insertVehicle();
        alert("BİTTİ 2");

        //e.preventDefault();

        //if ($("#vehicleForm").validationEngine('validate')) {

        //    insertVehicle();
        //}
        return false;
    }

*/
    /**
    * Fill Vehicle form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 15/08/2018
    */
/*
    window.fillVehicleForm = function (data) {

        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
        $("#loadingImage_FormVehicle").loadImager('appendImage');

        document.getElementById("txt-vehicle-name").value = data.vehicle_name;
        document.getElementById("txt-gfz").value = data.gfz;
        document.getElementById("txt-gfz-vehicletype").value = data.gfz_vehicletype;
        document.getElementById("txt-modeldescription").value = data.modeldescription;

        
        //{"totalCount":"1","items":[{"id":"1","apid":1,
        //"ckdcbu_type_id":1,"cbuckd_name":"CBU",
        //"vehicle_gt_model_id":1,"gt_model_name":"26.280",
        //"model_variant_id":1,"variant_name":"Tipper",
        //"config_type_id":1,"config_type_name":"4 X 2",
        //"cap_type_id":1,"cap_type_name":"C",
        //"vehicle_app_type_id":1,"app_type_name":"Longhaul",
        //"kpnumber_id":1,"kp_name":"KP000404",
        //"btsbto_type_id":1,"btobts_name":"BTO",
        //"roadtype_id":1,"road_type_name":"dsdfsdf",
        //"gfz":"4r34r3","factorymodel_name":"sdfsfsdf",
        //"op_username":"admin@gmail.com","state_active":"Active","date_saved":"2018-08-31 20:21:35","date_modified":null,"language_code":"en","active":0,"op_user_id":0,"language_id":"385","language_name":"English"}]}
        
        //$('#ddslickVehicleKitType').ddslick('select', { index: 2 });
        $('#ddslickVehicleKitType').ddslick('selectByValue',
            {
                index: '' + data.ckdcbu_type_id + '',
                value: '' + data.cbuckd_name + ''
            }
        );

        //$('#ddslickApplicationType').ddslick('select', { index: 2 });
        $('#ddslickApplicationType').ddslick('selectByValue',
            {
                index: '' + data.vehicle_app_type_id + '',
                value: '' + data.app_type_name + ''
            }
        );

        //$('#ddslickVehicleModel').ddslick('select', { index: 2 });

        //$('#ddslickVehicleVariant').ddslick('select', { index: 2 });
        $('#ddslickVehicleVariant').ddslick('selectByValue',
            {
                index: '' + data.model_variant_id + '',
                value: '' + data.variant_name + ''
            }
        );

        //$('#ddslickVehicleType').ddslick('select', { index: 2 });
        //$('#ddslickVehicleTonaj').ddslick('select', { index: 2 });
        //$('#ddslickGVM').ddslick('select', { index: 2 });

        //$('#ddslickVehicleModelGr').ddslick('select', { index: 2 });
        $('#ddslickVehicleModelGr').ddslick('selectByValue',
            {
                index: '' + data.vehicle_gt_model_id + '',
                value: '' + data.gt_model_name + ''
            }
        );
        //$('#ddslickConfig').ddslick('select', { index: 2 });
        $('#ddslickConfig').ddslick('selectByValue',
            {
                index: '' + data.config_type_id + '',
                value: '' + data.config_type_name + ''
            }
        );

        //$('#ddslickCab').ddslick('select', { index: 2 });
        //$('#ddslickCab').ddslick('selectByValue',
        //    {
        //        index: '' + data.cap_type_id + '',
        //        text: '' + data.cap_type_name + ''
        //    }
        //);
        //$('#ddslickKPNo').ddslick('select', { index: 2 });
        //$('#ddslickKPNo').ddslick('selectByValue',
        //    {
        //        index: '' + data.kpnumber_id + '',
        //        text: '' + data.kp_name + ''
        //    }
        //);

        //$('#ddslickBTOBTS').ddslick('select', { index: 1 });
        $('#ddslickVehicleBTOBTS').ddslick('selectByValue',
            {
                index: '' + data.btsbto_type_id + '',
                value: '' + data.btobts_name + ''
            }
        );

        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');

        return false;
    }
*/
    /**
    * Model Description On Change
    * @returns 
    * @author Gül Özdemir
    * @since 17/08/2018
    */

    window.modelDescOnChange = function () {
        
        document.getElementById("txt-vehicle-name").value = vehicleModel + "-" + document.getElementById("txt-modeldescription").value;
    }

    /**
    * GFZ text value On Change
    * @returns 
    * @author Gül Özdemir
    * @since 17/08/2018
    */
    window.gfzOnChange = function () {

        document.getElementById("txt-gfz-vehicletype").value = vehicleType + document.getElementById("txt-gfz").value;
    }


    /**
    *.vehicleKitType On Change - CBU / CKD
    * @returns 
    * @author Gül Özdemir
    * @since 17/08/2018
    */
    window.vehicleKitTypeForDefineFields = function (kittype) {

        //alert(kittype);

        if (kittype === "CBU") {
            document.getElementById("txt-gfz").value = "";
            document.getElementById("txt-gfz").disabled = true;
            
            $('#ddslickKPNo').ddslick('select', { index: String(0) });
            /* $('#ddslickKPNo').ddslick('disable');*/
            $('#ddslickBTOBTS').ddslick('select', { index: String(0) });
           /* $('#ddslickStockInfo').ddslick('disable');*/
        }
        else 
        {
            document.getElementById("txt-gfz").disabled = false;
            //document.getElementById("ddslickKPNo").disabled = false;
            //document.getElementById("ddslickStockInfo").disabled = false;
            //$('#ddslickStockInfo').ddslick('enable');
        }
    }

    //Vehicle active/passive
    window.activepassiveVehicle = function (vehicle_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassivevehiclelist = $('#ajaxACL-vehiclelist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-vehiclegrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Vehicle/SysActivePassiveVehicle',
            type: "POST",
            data: JSON.stringify({
                id: vehicle_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysvehicles"
            }),

        });
        ajax_activepassivevehiclelist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {
            },

            onAfterSuccess: function (event, data) {
                $("#gridContainer_vehicle").dxDataGrid("instance").refresh();
            }

        })
        ajax_activepassivevehiclelist.ajaxCallWidget('call');

    }


    window.activepassiveVehicleBTDesc = function (vehicleBTDesc_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassivevehicleBTDesclist = $('#ajaxACL-vehicleBTDesclist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-vehicleBTDescGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Vehicle/SysActivePassiveVehicleBTDesc',
            type: "POST",
            data: JSON.stringify({
                id: vehicleBTDesc_id,
                pk: "GsZVzEYe50uGgNM",
                //url: "pkUpdateMakeActiveOrPassive_sysvehicles"
            }),

        });
        ajax_activepassivevehicleBTDesclist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {
            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_vehicle_buybacktradeback_desc").dxDataGrid("instance").refresh();
            }
        })
        ajax_activepassivevehicleBTDesclist.ajaxCallWidget('call');

    }

});

