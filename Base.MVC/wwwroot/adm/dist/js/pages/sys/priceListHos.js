$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Continue')
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
    $("#loadingImage_DdslickBodyOptionE").loadImager();
    $("#loadingImage_DdslickBodyOptionF").loadImager();
    $("#loadingImage_DdslickVehicleList").loadImager();
    $("#loadingImage_DdslickChassisNumber").loadImager();
    $("#loadingImage_DdslickPriceForRole").loadImager();
    $("#loadingImage_DdslickYear").loadImager();
    $("#loadingImage_DdslickMonth").loadImager();
    $("#loadingImage_DdslickCampaign1").loadImager();
    $("#loadingImage_DdslickCampaign2").loadImager();
    $("#loadingImage_DdslickCampaign3").loadImager();

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
    var roleId = 0;
    //(list, vhModel, vhEndModel, body, warranty, chassis)
    var list = "";
    var vhModel = "";
    var vhEndModel = "";
    var body = "";
    var warranty = "";
    var chassis = "";
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

    var tabOrganizer = $("#priceForRole_tab").organizeTabs({ tabID: "priceForRole_tab" });
    $("#priceForRole_tab").organizeTabs('disableAllTabs');

/*
* Price List Hos Info insert form validation engine attached to work
* @since 14/10/2018
*/
    $('#priceListHosForm').validationEngine();

    //PriceForRole
    $('#loadingImage_DdslickPriceForRole').loadImager('removeLoadImage');
    $("#loadingImage_DdslickPriceForRole").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkAccBodyDeffDdList_sysaccbodydeff&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_PriceForRole = $('#ajax_DdslickPriceForRole').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickPriceForRole",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkCommissionRolesDdList_syscommissionroles)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkCommissionRolesDdList_syscommissionroles)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCommissionRolesDdList_syscommissionroles",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_PriceForRole.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataquotayear) {

            var cbdata_quotayear = $.parseJSON(dataquotayear);
            //cbdata_quotayear.splice(0, 0,
            //    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            //);

            $('#ddslickPriceForRole').ddslick({
                data: cbdata_quotayear,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    var tab = "";
                    tab = selectedData.selectedData.value;
                    roleId = selectedData.selectedData.value;
                    if (tab == 0) {//Salesman
                        $("#priceForRole_tab").organizeTabs('activateTabByOrder', '0');
                        refreshGridSM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    }
                    else if (tab == 1) {//ASM
                        $("#priceForRole_tab").organizeTabs('activateTabByOrder', '1');
                        refreshGridASM();//(list, vhModel, vhEndModel, body, warranty, chassis);                        
                    }
                    else if (tab == 2) {//PCD
                        $("#priceForRole_tab").organizeTabs('activateTabByOrder', '2');
                        refreshGridPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);                        
                    }
                    else if (tab == 3) {//KAM
                        $("#priceForRole_tab").organizeTabs('activateTabByOrder', '3');
                        refreshGridKAM();//(list, vhModel, vhEndModel, body, warranty, chassis);                       
                    }
                    else if (tab == 4) {//PCD VW
                        $("#priceForRole_tab").organizeTabs('activateTabByOrder', '4');
                        refreshGridPCDVW();//(list, vhModel, vhEndModel, body, warranty, chassis);                       
                    }
                    else if (tab == 5) {//CH
                        $("#priceForRole_tab").organizeTabs('activateTabByOrder', '5');
                        refreshGridCH();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    }
                    else if (tab == 6) {//MAN PCD
                        $("#priceForRole_tab").organizeTabs('activateTabByOrder', '6');
                        refreshGridMANPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    }

                }
            })
            $('#loadingImage_DdslickPriceForRole').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickPriceForRole').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_PriceForRole.ajaxCallWidget('call');
    //PriceForRole End

    //vehicle list
    $('#loadingImage_DdslickVehicleList').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleList").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkAccBodyDeffDdList_sysaccbodydeff&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_VehicleList = $('#ajax_DdslickVehicleList').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleList",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkCommissionRolesDdList_syscommissionroles)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkCommissionRolesDdList_syscommissionroles)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkAccBodyDeffDdList_sysaccbodydeff",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_VehicleList.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataquotayear) {

            var cbdata_quotayear = $.parseJSON(dataquotayear);
            cbdata_quotayear.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickVehicleList').ddslick({
                data: cbdata_quotayear,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                 onSelected: function (selectedData) {
                    list = selectedData.selectedData.value;
                   
                    //if (roleId == 0) {//Salesman                        
                    //    refreshGridSM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 1) {//AS
                    //    refreshGridASM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 2) {//PCD
                    //    refreshGridPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 3) {//KAM
                    //    refreshGridKAM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 4) {//PCD VW
                    //    refreshGridPCDVW();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 5) {//CH
                    //    refreshGridCH();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 6) {//MAN PCD
                    //    refreshGridMANPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}

                }
            })
            $('#loadingImage_DdslickVehicleList').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickVehicleList').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_VehicleList.ajaxCallWidget('call');
    //vehicle list End

    //Model Group --> warranty name --> Vehicle End Group
    $("#loadingImage_DdslickModel").loadImager('removeLoadImage');
    $("#loadingImage_DdslickModel").loadImager('appendImage');

    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehicleGroupsDdList_sysvehiclegroups&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_model = $('#ajax_DdslickModel').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickModel",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkVehicleGroupsDdList_sysvehiclegroups)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkVehicleGroupsDdList_sysvehiclegroups)"),
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

                        vhModel = selectedData.selectedData.value;

                        //if (roleId == 0) {//Salesman                        
                        //    refreshGridSM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                        //}
                        //else if (roleId == 1) {//AS
                        //    refreshGridASM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                        //}
                        //else if (roleId == 2) {//PCD
                        //    refreshGridPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                        //}
                        //else if (roleId == 3) {//KAM
                        //    refreshGridKAM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                        //}
                        //else if (roleId == 4) {//PCD VW
                        //    refreshGridPCDVW();//(list, vhModel, vhEndModel, body, warranty, chassis);
                        //}
                        //else if (roleId == 5) {//CH
                        //    refreshGridCH();//(list, vhModel, vhEndModel, body, warranty, chassis);
                        //}
                        //else if (roleId == 6) {//MAN PCD
                        //    refreshGridMANPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                        //}

                        //Vehicle
                        $("#loadingImage_DdslickVehicle").loadImager('removeLoadImage');
                        $("#loadingImage_DdslickVehicle").loadImager('appendImage');

                        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups&language_code=en&pk=GsZVzEYe50uGgNM&vehicle_groups_id=1
                        var ajaxACLResources_vehicle = $('#ajax_DdslickVehicle').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loadingImage_DdslickVehicle",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups)"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkVehiclesEndgroupsFixCostDdList_sysvehiclesendgroups)"),
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
                                    onSelected: function (selectedData) {
                                        vhEndModel = selectedData.selectedData.value;

                                        //if (roleId == 0) {//Salesman                        
                                        //    refreshGridSM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                                        //}
                                        //else if (roleId == 1) {//AS
                                        //    refreshGridASM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                                        //}
                                        //else if (roleId == 2) {//PCD
                                        //    refreshGridPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                                        //}
                                        //else if (roleId == 3) {//KAM
                                        //    refreshGridKAM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                                        //}
                                        //else if (roleId == 4) {//PCD VW
                                        //    refreshGridPCDVW();//(list, vhModel, vhEndModel, body, warranty, chassis);
                                        //}
                                        //else if (roleId == 5) {//CH
                                        //    refreshGridCH();//(list, vhModel, vhEndModel, body, warranty, chassis);
                                        //}
                                        //else if (roleId == 6) {//MAN PCD
                                        //    refreshGridMANPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                                        //}
                                    }
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
                            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkWarrantiesParentsDdList_syswarranties)"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkWarrantiesParentsDdList_syswarranties)"),
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
                                    onSelected: function (selectedData) {
                                        warranty = selectedData.selectedData.value;

                                        //if (roleId == 0) {//Salesman                        
                                        //    refreshGridSM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                                        //}
                                        //else if (roleId == 1) {//AS
                                        //    refreshGridASM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                                        //}
                                        //else if (roleId == 2) {//PCD
                                        //    refreshGridPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                                        //}
                                        //else if (roleId == 3) {//KAM
                                        //    refreshGridKAM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                                        //}
                                        //else if (roleId == 4) {//PCD VW
                                        //    refreshGridPCDVW();//(list, vhModel, vhEndModel, body, warranty, chassis);
                                        //}
                                        //else if (roleId == 5) {//CH
                                        //    refreshGridCH();//(list, vhModel, vhEndModel, body, warranty, chassis);
                                        //}
                                        //else if (roleId == 6) {//MAN PCD
                                        //    refreshGridMANPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                                        //}
                                    }
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

    //Body Extras
    $('#loadingImage_DdslickBodyOptionE').loadImager('removeLoadImage');
    $("#loadingImage_DdslickBodyOptionE").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkAccBodyExtrasDeffDdList_sysaccbodydeff&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_BodyOptionE = $('#ajax_DdslickBodyOptionE').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickBodyOptionE",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkAccBodyExtrasDeffDdList_sysaccbodydeff)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkAccBodyExtrasDeffDdList_sysaccbodydeff)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkAccBodyExtrasDeffDdList_sysaccbodydeff",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_BodyOptionE.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, databodyE) {

            var cbdata_bodyE = $.parseJSON(databodyE);
            cbdata_bodyE.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickBodyOptionE').ddslick({
                data: cbdata_bodyE,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    body = selectedData.selectedData.value;

                    //if (roleId == 0) {//Salesman                        
                    //    refreshGridSM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 1) {//AS
                    //    refreshGridASM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 2) {//PCD
                    //    refreshGridPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 3) {//KAM
                    //    refreshGridKAM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 4) {//PCD VW
                    //    refreshGridPCDVW();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 5) {//CH
                    //    refreshGridCH();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 6) {//MAN PCD
                    //    refreshGridMANPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                }
            })
            $('#loadingImage_DdslickBodyOptionE').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickBodyOptionE').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_BodyOptionE.ajaxCallWidget('call');
    //Body End

    //Body Feature
    $('#loadingImage_DdslickBodyOptionF').loadImager('removeLoadImage');
    $("#loadingImage_DdslickBodyOptionF").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkAccBodyDeffDdList_sysaccbodydeff&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_BodyOptionF = $('#ajax_DdslickBodyOptionF').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickBodyOptionF",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkAccBodyDeffDdList_sysaccbodydeff)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkAccBodyDeffDdList_sysaccbodydeff)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkAccBodyDeffDdList_sysaccbodydeff",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_BodyOptionF.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, databodyF) {

            var cbdata_bodyF = $.parseJSON(databodyF);
            cbdata_bodyF.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickBodyOptionF').ddslick({
                data: cbdata_bodyF,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    body = selectedData.selectedData.value;

                    //if (roleId == 0) {//Salesman                        
                    //    refreshGridSM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 1) {//AS
                    //    refreshGridASM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 2) {//PCD
                    //    refreshGridPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 3) {//KAM
                    //    refreshGridKAM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 4) {//PCD VW
                    //    refreshGridPCDVW();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 5) {//CH
                    //    refreshGridCH();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 6) {//MAN PCD
                    //    refreshGridMANPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                }
            })
            $('#loadingImage_DdslickBodyOptionF').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickBodyOptionF').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_BodyOptionF.ajaxCallWidget('call');
    //Body Feature End


    //ChassisNumber
    $('#loadingImage_DdslickChassisNumber').loadImager('removeLoadImage');
    $("#loadingImage_DdslickChassisNumber").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkAccBodyDeffDdList_sysaccbodydeff&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_ChassisNumber = $('#ajax_DdslickChassisNumber').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickChassisNumber",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkAccBodyDeffDdList_sysaccbodydeff)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkAccBodyDeffDdList_sysaccbodydeff)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkAccBodyDeffDdList_sysaccbodydeff",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_ChassisNumber.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataquotayear) {

            var cbdata_quotayear = $.parseJSON(dataquotayear);
            cbdata_quotayear.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickChassisNumber').ddslick({
                data: cbdata_quotayear,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    chassis = selectedData.selectedData.value;

                    //if (roleId == 0) {//Salesman                        
                    //    refreshGridSM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 1) {//AS
                    //    refreshGridASM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 2) {//PCD
                    //    refreshGridPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 3) {//KAM
                    //    refreshGridKAM();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 4) {//PCD VW
                    //    refreshGridPCDVW();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 5) {//CH
                    //    refreshGridCH();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                    //else if (roleId == 6) {//MAN PCD
                    //    refreshGridMANPCD();//(list, vhModel, vhEndModel, body, warranty, chassis);
                    //}
                }

            })
            $('#loadingImage_DdslickChassisNumber').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickChassisNumber').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_ChassisNumber.ajaxCallWidget('call');
    //ChassisNumber End

    //Year
    $('#loadingImage_DdslickYear').loadImager('removeLoadImage');
    $("#loadingImage_DdslickYear").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustYearsDdList_sysmonths&pk=GsZVzEYe50uGgNM&id=55
    var ajaxACLResources_Year = $('#ajax_DdslickYear').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickYear",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkJustYearsDdList_sysmonths)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkJustYearsDdList_sysmonths)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkJustYearsDdList_sysmonths",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_Year.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datayear) {

            var cbdata_year = $.parseJSON(datayear);
            cbdata_year.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickYear').ddslick({
                data: cbdata_year,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickYear').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickYear').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Year.ajaxCallWidget('call');
    //Year End

    //Month
    $('#loadingImage_DdslickMonth').loadImager('removeLoadImage');
    $("#loadingImage_DdslickMonth").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkJustMonthsDdList_sysmonths&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_Month = $('#ajax_DdslickMonth').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickMonth",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkJustMonthsDdList_sysmonths)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkJustMonthsDdList_sysmonths)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkJustMonthsDdList_sysmonths",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_Month.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datayear) {

            var cbdata_year = $.parseJSON(datayear);
            cbdata_year.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickMonth').ddslick({
                data: cbdata_year,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickMonth').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickMonth').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Month.ajaxCallWidget('call');
    //Month End

    //Campaign 1
    $('#loadingImage_DdslickCampaign1').loadImager('removeLoadImage');
    $("#loadingImage_DdslickCampaign1").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCampaignsDdList_syscampaigns&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_Campaign1 = $('#ajax_DdslickCampaign1').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickCampaign1",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkCampaignsDdList_syscampaigns)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkCampaignsDdList_syscampaigns)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCampaignsDdList_syscampaigns",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_Campaign1.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataCampaign1) {

            var cbdata_Campaign1 = $.parseJSON(dataCampaign1);
            cbdata_Campaign1.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickCampaign1').ddslick({
                data: cbdata_Campaign1,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickCampaign1').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickCampaign1').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Campaign1.ajaxCallWidget('call');
    //Campaign 1 End

    //Campaign 2
    $('#loadingImage_DdslickCampaign2').loadImager('removeLoadImage');
    $("#loadingImage_DdslickCampaign2").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCampaignsDdList_syscampaigns&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_Campaign2 = $('#ajax_DdslickCampaign2').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickCampaign2",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkCampaignsDdList_syscampaigns)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkCampaignsDdList_syscampaigns)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCampaignsDdList_syscampaigns",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_Campaign2.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataCampaign2) {

            var cbdata_Campaign2 = $.parseJSON(dataCampaign2);
            cbdata_Campaign2.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickCampaign2').ddslick({
                data: cbdata_Campaign2,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickCampaign2').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickCampaign2').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Campaign2.ajaxCallWidget('call');
    //Campaign 2 End

    //Campaign 3
    $('#loadingImage_DdslickCampaign3').loadImager('removeLoadImage');
    $("#loadingImage_DdslickCampaign3").loadImager('appendImage');
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkCampaignsDdList_syscampaigns&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_Campaign3 = $('#ajax_DdslickCampaign3').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickCampaign3",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkCampaignsDdList_syscampaigns)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkCampaignsDdList_syscampaigns)"),
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCampaignsDdList_syscampaigns",
            pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_Campaign3.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, dataCampaign3) {

            var cbdata_Campaign3 = $.parseJSON(dataCampaign3);
            cbdata_Campaign3.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#ddslickCampaign3').ddslick({
                data: cbdata_Campaign3,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
            })
            $('#loadingImage_DdslickCampaign3').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            $('#loadingImage_DdslickCampaign3').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_Campaign3.ajaxCallWidget('call');
    //Campaign 3 End




/* devexgrid */
    DevExpress.localization.locale(langCode);
    // stock vehicle grid service
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillPriceListGridx_syspricelist&language_code=en&pk=GsZVzEYe50uGgNM&project_id=80
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?&url=pkDeletedAct_syspricelist&pk=GsZVzEYe50uGgNM&id=19
//Salesman grid data
    var stockSalesman = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
    var demoSalesman = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
    var truckstogoSalesman = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
//Salesman Grid data end

//ASM grid data
    var stockASM = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
    var demoASM = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
    var truckstogoASM = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
//ASM Grid data end 

//PCD grid data
    var stockPCD = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
    var demoPCD = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
    var truckstogoPCD = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
//PCD Grid data end 

//KAM grid data
    var stockKAM = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
    var demoKAM = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
    var truckstogoKAM = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
//KAM Grid data end 

//PCD VW grid data
    var stockPCDVW = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
    var demoPCDVW = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
    var truckstogoPCDVW = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
//PCD VW Grid data end 

//CH grid data
    var stockCH = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
    var demoCH = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
    var truckstogoCH = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
//CH Grid data end 

//MAN PCD grid data
    var stockMANPCD = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
    var demoMANPCD = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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
    var truckstogoMANPCD = new DevExpress.data.CustomStore({
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
                    url: "pkFillPriceListGridx_syspricelist",
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
                    url: "pkDeletedAct_syspricelist"
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

//MAN PCD Grid data end 

//stock
    $('#priceHosStockRefresh').click(function () {
    //price hos grid
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillEducationsSalesmanGridx_syseducationssalesman&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
    var stock = new DevExpress.data.CustomStore({
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
                    url: "pkDeletedAct_syspricelist"
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
        $("#gridContainer_priceHosStock").dxDataGrid({

        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        dataSource: stock,
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
      
        columns: [{
        //    caption: window.lang.translate('Active/Passive'),
        //    width: 40,
        //    alignment: 'center',
        //    encodeHtml: false,

        //    cellTemplate: function (container, options) {
        //        var fieldHtml;
        //        var prInfo_id = options.data.id;

        //            //active
        //            $('<div />').addClass('dx-link').attr('class', "fa fa-save fa-2x").on('click', function () {
        //                updateACLRoleDialog(prInfo_id, options.data.active);
        //                //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
        //            }).appendTo(container);
                
        //    }
        //},

        //{
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
                dataField: "retail_price"
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

    $('#priceHosStockRefresh').click();

//demo
    $('#priceHosDemoRefresh').click(function () {
        //price hos grid
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillEducationsSalesmanGridx_syseducationssalesman&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        var demo = new DevExpress.data.CustomStore({
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
                        url: "pkDeletedAct_syspricelist"
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
        $("#gridContainer_priceHosDemo").dxDataGrid({

            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            dataSource: demo,
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
            columns: [{
                //    caption: window.lang.translate('Active/Passive'),
                //    width: 40,
                //    alignment: 'center',
                //    encodeHtml: false,

                //    cellTemplate: function (container, options) {
                //        var fieldHtml;
                //        var prInfo_id = options.data.id;

                //            //active
                //            $('<div />').addClass('dx-link').attr('class', "fa fa-save fa-2x").on('click', function () {
                //                updateACLRoleDialog(prInfo_id, options.data.active);
                //                //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                //            }).appendTo(container);

                //    }
                //},

                //{
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
            }, {
                caption: window.lang.translate('retail price') + "...",
                encodeHtml: false,
                    dataField: "retail_price"
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
                $("#gridContainer_priceHosDemo").dxDataGrid("instance").refresh();
            },
        });

    });

    $('#priceHosDemoRefresh').click();

//Truckstogo
    $('#priceHosTruckstogoRefresh').click(function () {
        //price hos grid
        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkFillEducationsSalesmanGridx_syseducationssalesman&page=&rows=&sort=&order=&language_code=en&pk=GsZVzEYe50uGgNM
        var truckstogo = new DevExpress.data.CustomStore({
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
                        url: "pkDeletedAct_syspricelist"
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
        $("#gridContainer_priceHosTruckstogo").dxDataGrid({

            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            dataSource: truckstogo,
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
            columns: [{
                //    caption: window.lang.translate('Active/Passive'),
                //    width: 40,
                //    alignment: 'center',
                //    encodeHtml: false,

                //    cellTemplate: function (container, options) {
                //        var fieldHtml;
                //        var prInfo_id = options.data.id;

                //            //active
                //            $('<div />').addClass('dx-link').attr('class', "fa fa-save fa-2x").on('click', function () {
                //                updateACLRoleDialog(prInfo_id, options.data.active);
                //                //dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                //            }).appendTo(container);

                //    }
                //},

                //{
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
            }, {
                caption: window.lang.translate('retail price') + "...",
                encodeHtml: false,
                    dataField: "retail_price"
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
                $("#gridContainer_priceHosTruckstogo").dxDataGrid("instance").refresh();
            },
        });

    });

    $('#priceHosTruckstogoRefresh').click();

/////////////////////Price List Hos Info/////////////////////

/**
* insert Price List Hos
* @returns {undefined}
* @since 14/10/2018
*/

    $("#btn-priceHos-save").on("click", function (e) {
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
                transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_syseducationssalesman)"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_syseducationssalesman)"),

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

    $("#btn-priceHos-clear").on("click", function (e) {
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
            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateMakeActiveOrPassive_syseducationssalesman)"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateMakeActiveOrPassive_syseducationssalesman)"),
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


//grid refresh ROL

    var refreshGridSM = function () {//(list, vhModel, vhEndModel, body, warranty, chassis) {
        var instanceStockSM = $("#gridContainer_priceHosStock").dxDataGrid("instance");
        instanceStockSM.option({
            dataSource: stockSalesman,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Salesman Limit') + "...",
                    encodeHtml: false,
                    dataField: "salesman_limit"
                }, {
                    caption: window.lang.translate('Additional salesman commission') + "...",
                    encodeHtml: false,
                    dataField: "add_salesman_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
        var instanceDemoSM = $("#gridContainer_priceHosDemo").dxDataGrid("instance");
        instanceDemoSM.option({
            dataSource: demoSalesman,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Salesman Limit') + "...",
                    encodeHtml: false,
                    dataField: "salesman_limit"
                }, {
                    caption: window.lang.translate('Additional salesman commission') + "...",
                    encodeHtml: false,
                    dataField: "add_salesman_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
        var instanceTruckstogoSM = $("#gridContainer_priceHosTruckstogo").dxDataGrid("instance");
        instanceTruckstogoSM.option({
            dataSource: truckstogoSalesman,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Salesman Limit') + "...",
                    encodeHtml: false,
                    dataField: "salesman_limit"
                }, {
                    caption: window.lang.translate('Additional salesman commission') + "...",
                    encodeHtml: false,
                    dataField: "add_salesman_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
    }

    var refreshGridASM = function () {//(list, vhModel, vhEndModel, body, warranty, chassis) {
        var instanceStockASM = $("#gridContainer_priceHosStock").dxDataGrid("instance");
        instanceStockASM.option({
            dataSource: stockASM,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Salesman Limit') + "...",
                    encodeHtml: false,
                    dataField: "salesman_limit"
                }, {
                    caption: window.lang.translate('ASM Limit') + "...",
                    encodeHtml: false,
                    dataField: "asm_limit"
                }, {
                    caption: window.lang.translate('Additional salesman commission') + "...",
                    encodeHtml: false,
                    dataField: "add_salesman_comm"
                }, {
                    caption: window.lang.translate('Additional ASM commission') + "...",
                    encodeHtml: false,
                    dataField: "add_asm_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
        var instanceDemoASM = $("#gridContainer_priceHosDemo").dxDataGrid("instance");
        instanceDemoASM.option({
            dataSource: demoASM,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Salesman Limit') + "...",
                    encodeHtml: false,
                    dataField: "salesman_limit"
                }, {
                    caption: window.lang.translate('ASM Limit') + "...",
                    encodeHtml: false,
                    dataField: "asm_limit"
                }, {
                    caption: window.lang.translate('Additional salesman commission') + "...",
                    encodeHtml: false,
                    dataField: "add_salesman_comm"
                }, {
                    caption: window.lang.translate('Additional ASM commission') + "...",
                    encodeHtml: false,
                    dataField: "add_asm_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
        var instanceTruckstogoASM = $("#gridContainer_priceHosTruckstogo").dxDataGrid("instance");
        instanceTruckstogoASM.option({
            dataSource: truckstogoASM,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Salesman Limit') + "...",
                    encodeHtml: false,
                    dataField: "salesman_limit"
                }, {
                    caption: window.lang.translate('ASM Limit') + "...",
                    encodeHtml: false,
                    dataField: "asm_limit"
                }, {
                    caption: window.lang.translate('Additional salesman commission') + "...",
                    encodeHtml: false,
                    dataField: "add_salesman_comm"
                }, {
                    caption: window.lang.translate('Additional ASM commission') + "...",
                    encodeHtml: false,
                    dataField: "add_asm_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
    }

    var refreshGridPCD = function () {//(list, vhModel, vhEndModel, body, warranty, chassis) {
        var instanceStockPCD = $("#gridContainer_priceHosStock").dxDataGrid("instance");
        instanceStockPCD.option({
            dataSource: stockPCD,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Salesman Limit') + "...",
                    encodeHtml: false,
                    dataField: "salesman_limit"
                }, {
                    caption: window.lang.translate('Dealer billing') + "...",
                    encodeHtml: false,
                    dataField: "dealler_billing"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
        var instanceDemoPCD = $("#gridContainer_priceHosDemo").dxDataGrid("instance");
        instanceDemoPCD.option({
            dataSource: demoPCD,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Salesman Limit') + "...",
                    encodeHtml: false,
                    dataField: "salesman_limit"
                }, {
                    caption: window.lang.translate('Dealer billing') + "...",
                    encodeHtml: false,
                    dataField: "dealer_billing"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
        var instanceTruckstogoPCD = $("#gridContainer_priceHosTruckstogo").dxDataGrid("instance");
        instanceTruckstogoPCD.option({
            dataSource: truckstogoPCD,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Salesman Limit') + "...",
                    encodeHtml: false,
                    dataField: "salesman_limit"
                }, {
                    caption: window.lang.translate('Dealer billing') + "...",
                    encodeHtml: false,
                    dataField: "dealer_billing"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
    }

    var refreshGridKAM = function () {//(list, vhModel, vhEndModel, body, warranty, chassis) {
        var instanceStockKAM = $("#gridContainer_priceHosStock").dxDataGrid("instance");
        instanceStockKAM.option({
            dataSource: stockKAM,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Salesman Limit') + "...",
                    encodeHtml: false,
                    dataField: "salesman_limit"
                }, {
                    caption: window.lang.translate('KAM limit') + "...",
                    encodeHtml: false,
                    dataField: "kam_limit"
                }, {
                    caption: window.lang.translate('Additional KAM commission') + "...",
                    encodeHtml: false,
                    dataField: "add_kam_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
        var instanceDemoKAM = $("#gridContainer_priceHosDemo").dxDataGrid("instance");
        instanceDemoKAM.option({
            dataSource: demoKAM,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Salesman Limit') + "...",
                    encodeHtml: false,
                    dataField: "salesman_limit"
                }, {
                    caption: window.lang.translate('KAM limit') + "...",
                    encodeHtml: false,
                    dataField: "kam_limit"
                }, {
                    caption: window.lang.translate('Additional KAM commission') + "...",
                    encodeHtml: false,
                    dataField: "add_kam_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
        var instanceTruckstogoKAM = $("#gridContainer_priceHosTruckstogo").dxDataGrid("instance");
        instanceTruckstogoKAM.option({
            dataSource: truckstogoKAM,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Salesman Limit') + "...",
                    encodeHtml: false,
                    dataField: "salesman_limit"
                }, {
                    caption: window.lang.translate('KAM limit') + "...",
                    encodeHtml: false,
                    dataField: "kam_limit"
                }, {
                    caption: window.lang.translate('Additional KAM commission') + "...",
                    encodeHtml: false,
                    dataField: "add_kam_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
    }

    var refreshGridPCDVW = function () {//(list, vhModel, vhEndModel, body, warranty, chassis) {
        var instanceStockPCDVW = $("#gridContainer_priceHosStock").dxDataGrid("instance");
        instanceStockPCDVW.option({
            dataSource: stockPCDVW,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Dealer billing') + "...",
                    encodeHtml: false,
                    dataField: "dealer_billing"
                }, {
                    caption: window.lang.translate('Additional salesman commission') + "...",
                    encodeHtml: false,
                    dataField: "add_salesman_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
        var instanceDemoPCDVW = $("#gridContainer_priceHosDemo").dxDataGrid("instance");
        instanceDemoPCDVW.option({
            dataSource: demoPCDVW,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Dealer billing') + "...",
                    encodeHtml: false,
                    dataField: "dealer_billing"
                }, {
                    caption: window.lang.translate('Additional salesman commission') + "...",
                    encodeHtml: false,
                    dataField: "add_salesman_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
        var instanceTruckstogoPCDVW = $("#gridContainer_priceHosTruckstogo").dxDataGrid("instance");
        instanceTruckstogoPCDVW.option({
            dataSource: truckstogoPCDVW,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Dealer billing') + "...",
                    encodeHtml: false,
                    dataField: "dealer_billing"
                }, {
                    caption: window.lang.translate('Additional salesman commission') + "...",
                    encodeHtml: false,
                    dataField: "add_salesman_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
    }

    var refreshGridCH = function () {//(list, vhModel, vhEndModel, body, warranty, chassis) {

        var instanceStockCH = $("#gridContainer_priceHosStock").dxDataGrid("instance");
        instanceStockCH.option({
            dataSource: stockCH,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('ASM Limit') + "...",
                    encodeHtml: false,
                    dataField: "asm_limit"
                }, {
                    caption: window.lang.translate('CH Limit') + "...",
                    encodeHtml: false,
                    dataField: "ch_limit"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
        var instanceDemoCH = $("#gridContainer_priceHosDemo").dxDataGrid("instance");
        instanceDemoCH.option({
            dataSource: demoCH,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('ASM Limit') + "...",
                    encodeHtml: false,
                    dataField: "asm_limit"
                }, {
                    caption: window.lang.translate('CH Limit') + "...",
                    encodeHtml: false,
                    dataField: "ch_limit"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
        var instanceTruckstogoCH = $("#gridContainer_priceHosTruckstogo").dxDataGrid("instance");
        instanceTruckstogoCH.option({
            dataSource: truckstogoCH,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('ASM Limit') + "...",
                    encodeHtml: false,
                    dataField: "asm_limit"
                }, {
                    caption: window.lang.translate('CH Limit') + "...",
                    encodeHtml: false,
                    dataField: "ch_limit"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
    }

    var refreshGridMANPCD = function () {// (list, vhModel, vhEndModel, body, warranty, chassis) {

        var instanceStockMANPCD = $("#gridContainer_priceHosStock").dxDataGrid("instance");
        instanceStockMANPCD.option({
            dataSource: stockMANPCD,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Dealer billing') + "...",
                    encodeHtml: false,
                    dataField: "dealer_billing"
                }, {
                    caption: window.lang.translate('Additional salesman commission') + "...",
                    encodeHtml: false,
                    dataField: "add_salesman_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
        var instanceDemoMANPCD = $("#gridContainer_priceHosDemo").dxDataGrid("instance");
        instanceDemoMANPCD.option({
            dataSource: demoMANPCD,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Dealer billing') + "...",
                    encodeHtml: false,
                    dataField: "dealer_billing"
                }, {
                    caption: window.lang.translate('Additional salesman commission') + "...",
                    encodeHtml: false,
                    dataField: "add_salesman_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
        var instanceTruckstogoMANPCD = $("#gridContainer_priceHosTruckstogo").dxDataGrid("instance");
        instanceTruckstogoMANPCD.option({
            dataSource: truckstogoMANPCD,
            showSubmenuMode: {
                name: 'onClick'
            },
            columns: [
                {
                    caption: window.lang.translate('Chassis number') + "...",
                    encodeHtml: false,
                    dataField: "chassis_no"
                }, {
                    caption: window.lang.translate('Vehicle model') + "...",
                    encodeHtml: false,
                    dataField: "vehicle_model_name"
                }, {
                    caption: window.lang.translate('Retail price') + "...",
                    encodeHtml: false,
                    dataField: "retail_price"
                }, {
                    caption: window.lang.translate('Dealer billing') + "...",
                    encodeHtml: false,
                    dataField: "dealer_billing"
                }, {
                    caption: window.lang.translate('Additional salesman commission') + "...",
                    encodeHtml: false,
                    dataField: "add_salesman_comm"
                }, {
                    caption: window.lang.translate('Campaign 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_name"
                }, {
                    caption: window.lang.translate('Campaign price 1') + "...",
                    encodeHtml: false,
                    dataField: "campaign1_price"
                }, {
                    caption: window.lang.translate('Campaign 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_name"
                }, {
                    caption: window.lang.translate('Campaign price 2') + "...",
                    encodeHtml: false,
                    dataField: "campaign2_price"
                }, {
                    caption: window.lang.translate('Campaign 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_name"
                }, {
                    caption: window.lang.translate('Campaign price 3') + "...",
                    encodeHtml: false,
                    dataField: "campaign3_price"
                }, {
                    caption: window.lang.translate('Body(extras)') + "...",
                    encodeHtml: false,
                    dataField: "body_extras_name"
                }, {
                    caption: window.lang.translate('Body(feature)') + "...",
                    encodeHtml: false,
                    dataField: "body_feature_name"
                }, {
                    caption: window.lang.translate('Month') + "...",
                    encodeHtml: false,
                    dataField: "month"
                }, {
                    caption: window.lang.translate('Year') + "...",
                    encodeHtml: false,
                    dataField: "year"
                }, {
                    caption: window.lang.translate('Warranty') + "...",
                    encodeHtml: false,
                    dataField: "warranty_name"
                }, {
                    caption: window.lang.translate('Stock Day') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('CBU date') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }, {
                    caption: window.lang.translate('Customer') + "...",
                    encodeHtml: false,
                    dataField: "name"
                }],

        });
    }

});


