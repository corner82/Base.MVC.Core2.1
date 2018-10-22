/*
* Vehicle Form
* @author Gül Özdemir
* @since 15/08/2016
*/
$(document).ready(function () {

    "use strict";

    var selectedVehicleId = 0;
    var selectedVehicleBTDescId = 0;
    //var selectedVehicleModelGrTonajId = 0;
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
    $("#loadingImage_DdslickVehicleModel").loadImager();
    $("#loadingImage_DdslickVehicleModelGr").loadImager();
    $("#loadingImage_DdslickVehicleModelGrTonaj").loadImager();
    $("#loadingImage_DdslickHorsepower").loadImager();
    $("#loadingImage_DdslickConfig").loadImager();
    $("#loadingImage_DdslickVehicleVariant").loadImager();
    $("#loadingImage_DdslickCab").loadImager();
    $("#loadingImage_DdslickKP").loadImager();
    $("#loadingImage_DdslickBTOBTS").loadImager();
    $("#loadingImage_DdslickApplicationType").loadImager();

    //to vehiclemodel form grid loading-image
    $("#loadingImage_GridVehicle").loadImager();
    $("#loadingImage_GridVehicleBuybackTradeback").loadImager();

    $('#vehicleForm').validationEngine(); 

    var langCode = $("#langCode").val();

    var vehicleModel = "";
    var vehicleType = "";

    $('#loadingImage_DdslickVehicleKitType').loadImager('removeLoadImage');
    $('#loadingImage_DdslickVehicleKitType').loadImager('appendImage');
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

    $('#loadingImage_DdslickVehicleModel').loadImager('removeLoadImage');
    $('#loadingImage_DdslickVehicleModel').loadImager('appendImage');

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

                        $('#loadingImage_DdslickVehicleModelGr').loadImager('removeLoadImage');
                        $('#loadingImage_DdslickVehicleModelGr').loadImager('appendImage');
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

                                            $('#loadingImage_DdslickVehicleModelGrTonaj').loadImager('removeLoadImage');
                                            $('#loadingImage_DdslickVehicleModelGrTonaj').loadImager('appendImage');

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
                                                                ddslick_vehicleModelGrTypeTonajId = selectedData.selectedData.value;
                                                                ddslick_vehicleModelGrTypeTonajName = selectedData.selectedData.text;
                                                                vehicleKitTypeForDefineFields(ddslick_vehicleModelGrTypeTonajName);

                                                            } else {
                                                                ddslick_vehicleModelGrTypeTonajId = 0; 
                                                                ddslick_vehicleModelGrTypeTonajName = "";
                                                            }
                                                            //selectedVehicleModelGrTonajId = 1;
                                                            //alert(selectedVehicleModelGrTonajId);
                                                            $('#vehicleBTDescList').click();
                                                        }
                                                       
                                                    });
                                                    if (filldropdown === true) {
                                                       
                                                        $('#ddslickVehicleModelGrTonaj').ddslick('selectByValue',
                                                            {
                                                                index: ddslick_vehicleModelGrTypeTonajId,
                                                                value: ddslick_vehicleModelGrTypeTonajName
                                                            });
                                                        filldropdown = false;
                                                    }
                                                    
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
                                if (filldropdown === true) {

                                    $('#ddslickVehicleModelGr').ddslick('selectByValue',
                                        {
                                            index: ddslick_vehicleModelGrTypeId,
                                            value: ddslick_vehicleModelGrTypeName
                                        }
                                    );
                                }
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
    //HorsePower

    $('#loadingImage_DdslickHorsepower').loadImager('removeLoadImage');
    $('#loadingImage_DdslickHorsepower').loadImager('appendImage');

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
    $('#loadingImage_DdslickVehicleVariant').loadImager('removeLoadImage');
    $('#loadingImage_DdslickVehicleVariant').loadImager('appendImage');

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

    $('#loadingImage_DdslickConfig').loadImager('removeLoadImage');
    $('#loadingImage_DdslickConfig').loadImager('appendImage');

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

    $('#loadingImage_DdslickCab').loadImager('removeLoadImage');
    $('#loadingImage_DdslickCab').loadImager('appendImage');

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
    $('#loadingImage_DdslickKP').loadImager('removeLoadImage');
    $('#loadingImage_DdslickKP').loadImager('appendImage');

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
    $('#loadingImage_DdslickBTOBTS').loadImager('removeLoadImage');
    $('#loadingImage_DdslickBTOBTS').loadImager('appendImage');

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
    $('#loadingImage_DdslickApplicationType').loadImager('removeLoadImage');
    $('#loadingImage_DdslickApplicationType').loadImager('appendImage');

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
                    url: '/Vehicle/VehicleGridList',
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
                //alert(selectedVehicleId);

                return $.ajax({
                    url: '/Vehicle/DeleteVehicle',
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

        //DevExpress.localization.locale(langCode);

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
                        dataField: "vehicle_groups_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Vehicle model type'),
                        dataField: "vehicle_group_types_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Vehicle model type tonaj'),
                        dataField: "gt_model_name",
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
                        fillVehicleForm(data);

                    }
                },

                onRowRemoving: function (e) {
                    selectedVehicleId = e.key.id;
    
                    //alert(selectedVehicleId);
                },

                onRowRemoved: function (e) {
                    $("#gridContainer_vehicle").dxDataGrid("instance").refresh();
                },

            });
        });
    })


    //////////////////////////////////////////////////////////////////////////////////////////////
    /**
    * vehicleBTDescList Refresh
    * @returns 
    * @author Gül Özdemir
    * @since 03/09/2018
    */
    
    $('#vehicleBTDescList').click(function () {

        /* devexgrid */
        var vehicleeBTDesc_data = new DevExpress.data.CustomStore({
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
                    url: '/Vehicle/VehicleBTDescGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillVehiclesTradeNamesGridx_sysvehiclestrade",
                        pkIdentity: $("#publicKey").val(),
                        page: "",
                        rows: "",
                        sort: "",
                        order: "", //args.orderby,
                        skip: args.skip,
                        take: args.take,
                        vehicle_gt_model_id: ddslick_vehicleModelGrTypeTonajId
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
                //alert(selectedVehicleId);

                return $.ajax({
                    url: '/Vehicle/DeleteVehicleBTDesc',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedVehicleBTDescId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysvehiclestrade"
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
            },

            insert: function (values) {
                var deferred = $.Deferred();

                return $.ajax({
                    url: '/Vehicle/InsertVehicleBTDesc',
                    dataType: "json",
                    data: JSON.stringify({
                        description: ddslick_vehicleModelGrTypeTonajName + " " + values["trade_name"],
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkInsertAct_sysvehiclestrade",
                        vehicle_gt_model_id: ddslick_vehicleModelGrTypeTonajId
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                        alert("success");
                    },
                    error: function () {
                        deferred.reject("Data insert Error");
                    },
                    timeout: 30000
                });
            },

            update: function (key, values) {
                var deferred = $.Deferred();

                //alert("update k" + key["id"]);
                var updatekeyId = key["id"];

                return $.ajax({
                    url: '/Vehicle/UpdateVehicleBTDesc',
                    dataType: "json",
                    data: JSON.stringify({
                        description: values["trade_name"],
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkUpdateAct_sysvehiclestrade",
                        id: updatekeyId,
                        vehicle_gt_model_id: ddslick_vehicleModelGrTypeTonajId
                    }),
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (result) {
                        deferred.resolve(result.items, { totalCount: result.totalCount });
                        alert("success");
                    },
                    error: function () {
                        deferred.reject("Data update Error");
                    },
                    timeout: 30000
                });
            }
        });

        DevExpress.localization.locale(langCode);

        $(function () {
            $("#gridContainer_vehicleBTDesc").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: vehicleeBTDesc_data,

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
                    fileName: window.lang.translate('VehicleBuybackTradebackDescriptionsList')
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
                            var vehiclebtdesc_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveVehicleBTDesc(vehiclebtdesc_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveVehicleBTDesc(vehiclebtdesc_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                    }, {
                        caption: window.lang.translate('Vehicle buyback tradeback description'),
                        dataField: "trade_name",
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
                        selectedVehicleBTDescId = data.id;
                        //alert("z " + selectedVehicleBTDescId);
                        //filldropdown = true;
                    }
                },

                onInitNewRow: function (e) {
                    //alert("InitNewRow");
                    //e.key.trade_name.value = "zzzzzzzzzzzzzzz";
                },

                onModifying: function () {
                    // Your code goes here
                    //selectedVehicleBTDescId = e.key.id;
                    //alert("m " + selectedVehicleBTDescId);
                },

                onRowRemoving: function (e) {
                    selectedVehicleBTDescId = e.key.id;
                    //alert("x " + selectedVehicleBTDescId);
                },

                onRowRemoved: function (e) {
                    $("#gridContainer_vehicleBTDesc").dxDataGrid("instance").refresh();
                },

                onRowEditing: function (e) {
                //    selectedVehicleBTDescId = e.key.id;
                //    alert("y " + selectedVehicleBTDescId);
                },

            });
        });
    })

    $('#vehicleBTDescList').click();

    $('#vehicleList').click();


    /**
 * insert / Update Vehicle Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 15/10/2018
 */

    $("#btn-vehicle-save").on("click", function (e) {
        e.preventDefault();

        if ($("#vehicleForm").validationEngine('validate')) {

            $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
            $("#loadingImage_FormVehicle").loadImager('appendImage');

            var vehicle_name = $('#txt-vehicle-name').val();
            var gfz = $('#txt-gfz').val();
            //var gfz-vehicletype = $('#txt-gfz-vehicletype').val();
            var modeldescription = $('#txt-modeldescription').val();

            var ddData_VehicleKitType = $('#ddslickVehicleKitType').data('ddslick');
            var vehicleKitTypeId = ddData_VehicleKitType.selectedData.value;

            var ddData_VehicleModel = $('#ddslickVehicleModel').data('ddslick');
            var vehicleModelId = ddData_VehicleModel.selectedData.value;

            var ddData_VehicleModelGr = $('#ddslickVehicleModelGr').data('ddslick');
            var vehicleModelGrId = ddData_VehicleModelGr.selectedData.value;

            var ddData_VehicleModelGrTonaj = $('#ddslickVehicleModelGrTonaj').data('ddslick');
            var vehicleModelGrTonajId = ddData_VehicleModelGrTonaj.selectedData.value;

            var ddData_Horsepower = $('#ddslickHorsepower').data('ddslick');
            var horsepowerId = ddData_Horsepower.selectedData.value;

            var ddData_Config = $('#ddslickConfig').data('ddslick');
            var configId = ddData_Config.selectedData.value;

            var ddData_VehicleVariant = $('#ddslickVehicleVariant').data('ddslick');
            var vehicleVariantId = ddData_VehicleVariant.selectedData.value;

            var ddData_Cab = $('#ddslickCab').data('ddslick');
            var cabId = ddData_Cab.selectedData.value;

            var ddData_KPNo = $('#ddslickKPNo').data('ddslick');
            var kpNoId = ddData_KPNo.selectedData.value;

            var ddData_BTOBTS = $('#ddslickBTOBTS').data('ddslick');
            var btobtsId = ddData_BTOBTS.selectedData.value;

            var ddData_ApplicationType = $('#ddslickApplicationType').data('ddslick');
            var applicationTypeId = ddData_ApplicationType.selectedData.value;

            //alert(selectedVehicleId);

            var ajax;
            if (selectedVehicleId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-vehicle').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loadingImage_FormVehicle",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                    proxy: '/Vehicle/InsertVehicle',
                    type: "POST",
                    data: JSON.stringify({
                        url: "pkInsertAct_sysvehicles",
                        description: modeldescription,
                        factorymodel_name: vehicle_name,
                        gfz: gfz,
                        ckdcbu_type_id: vehicleKitTypeId,
                        vehicle_gt_model_id: vehicleModelId,
                        model_variant_id: vehicleVariantId,
                        config_type_id: configId,
                        cap_type_id: cabId,
                        vehicle_app_type_id: applicationTypeId,
                        kpnumber_id: kpNoId,
                        btsbto_type_id: btobtsId,
                        roadtype_id: "0",
                        language_code: "en",
                        pk: "GsZVzEYe50uGgNM"
                    })
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_vehicle").dxDataGrid("instance").refresh();
                        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-vehicle').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_FormVehicle",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Vehicle/UpdateVehicle',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedVehicleId,
                                url: "pkUpdateAct_sysvehicles",
                                description: modeldescription,
                                factorymodel_name: vehicle_name,
                                gfz: gfz,
                                ckdcbu_type_id: vehicleKitTypeId,
                                vehicle_gt_model_id: vehicleModelId,
                                model_variant_id: vehicleVariantId,
                                config_type_id: configId,
                                cap_type_id: cabId,
                                vehicle_app_type_id: applicationTypeId,
                                kpnumber_id: kpNoId,
                                btsbto_type_id: btobtsId,
                                roadtype_id: "0",
                                language_code: "en",
                                pk: "GsZVzEYe50uGgNM"
                            })
                        });

                        ajax.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#gridContainer_vehicle").dxDataGrid("instance").refresh();
                                $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Vehicle is update! Are you sure?', 'Vehicle is update! Are you sure?');
            }
        }
        return false;

    })

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
        selectedVehicleBTDescId = 0;

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

        $("#gridContainer_vehicleBTDesc").dxDataGrid("instance").refresh();

        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');

        return false;
    }


    /**
    * Fill Vehicle form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 15/08/2018
    */
        
    //"id": "10", "apid": 10, 
    //"ckdcbu_type_id": 1, 
    //"cbuckd_name": "CBU", 
    //"vehicle_gt_model_id": 3, 
    //"gt_model_name": "19.360", 
    //"model_variant_id": 1, 
    //"variant_name": "Tipper", 
    //"config_type_id": 1, 
    //"config_type_name": "4 X 2", 
    //"cap_type_id": 2, 
    //"cap_type_name": "L", 
    //"vehicle_app_type_id": 1, 
    //"app_type_name": "Traction\/Distribution", 
    //"kpnumber_id": 1, 
    //"kp_name": "KP000404", 
    //"btsbto_type_id": 1, 
    //"btobts_name": "BTO", 
    //"gfz": "xxxx", 
    //"factorymodel_name": "TGS-mmmmm", 
    //"road_type_name": "mmmmm", 
    //"horsepower_id": 2, 
    //"horse_power": "19.360", 
    //vehicle_group_types_id: 4
    //vehicle_group_types_name: "L72W"
    //vehicle_groups_id: 3
    //vehicle_groups_name: "TGS"
    //vehicle_gt_model_id: 3 <<==================>> model type tonaj id
    //gt_model_name: "19.360"
    //"op_username": "mustafa.zeynel.admin@ostim.com.tr", "state_active": "Active", "date_saved": "2018-10-15 09:59:18", "date_modified": null, "language_code": "en", "active": 0, "op_user_id": 16, "language_id": "385", "language_name": "English"

        
    window.fillVehicleForm = function (data) {

        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
        $("#loadingImage_FormVehicle").loadImager('appendImage');

        resetVehicleForm();

        selectedVehicleId = data.id;

        document.getElementById("txt-vehicle-name").value = data.vehicle_name;
        document.getElementById("txt-gfz").value = data.gfz;
        document.getElementById("txt-gfz-vehicletype").value = data.gfz;
        document.getElementById("txt-modeldescription").value = data.factorymodel_name;

        $('#ddslickVehicleKitType').ddslick('selectByValue',
            {
                index: '' + data.ckdcbu_type_id + '',
                value: '' + data.cbuckd_name + ''
            }
        );

        ddslick_vehicleModelId = data.vehicle_groups_id;
        ddslick_vehicleModelName = data.vehicle_groups_name;

        ddslick_vehicleModelGrTypeId = data.vehicle_group_types_id;
        ddslick_vehicleModelGrTypeName = data.vehicle_group_types_name;

        ddslick_vehicleModelGrTypeTonajId = data.vehicle_gt_model_id;
        ddslick_vehicleModelGrTypeTonajName = data.gt_model_name;

        $('#ddslickVehicleModel').ddslick('selectByValue',
            {
                index: ddslick_vehicleModelId,
                value: ddslick_vehicleModelName
            }
        );
        //vehicleModelGrTyp ve vehicleModelGrTypeTonaj otomatik tetikleniyor.

        $('#ddslickHorsepower').ddslick('selectByValue',
            {
                index: data.horsepower_id,
                value: data.horse_power
            }
        );

        $('#ddslickConfig').ddslick('selectByValue',
            {
                index: data.config_type_id,
                value: data.config_type_name
            }
        );

        $('#ddslickVehicleVariant').ddslick('selectByValue',
            {
                index: data.model_variant_id,
                value: data.variant_name
            }
        );

        $('#ddslickCab').ddslick('selectByValue',
            {
                index: data.cap_type_id,
                value: data.cap_type_name
            }
        );

        $('#ddslickKPNo').ddslick('selectByValue',
            {
                index: data.kpnumber_id,
                value: data.kp_name
            }
        );

        $('#ddslickBTOBTS').ddslick('selectByValue',
            {
                index: data.btsbto_type_id,
                value: data.btobts_name
            }
        );

        $('#ddslickApplicationType').ddslick('selectByValue',
            {
                index: data.vehicle_app_type_id,
                value: data.app_type_name
            }
        );

        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');

        return false;
    }

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
            proxy: '/Vehicle/ActivePassiveVehicle',
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
                $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
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
            proxy: '/Vehicle/ActivePassiveVehicleBTDesc',
            type: "POST",
            data: JSON.stringify({
                id: vehicleBTDesc_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysvehiclestrade"
            }),

        });
        ajax_activepassivevehicleBTDesclist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {
            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_vehicleBTDesc").dxDataGrid("instance").refresh();
                $("#loading-image-vehicleBTDescGrid").loadImager('removeLoadImage');
            }
        })
        ajax_activepassivevehicleBTDesclist.ajaxCallWidget('call');

    }

});

