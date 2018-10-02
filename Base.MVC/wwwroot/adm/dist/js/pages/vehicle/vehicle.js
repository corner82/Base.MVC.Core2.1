﻿/*
* Vehicle Form
* @author Gül Özdemir
* @since 15/08/2016
*/
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
    * Vehicle LoadImager
    * @author Gül Özdemir
    * @since 15/08/2016
    */
    //to vehicle form
    $("#loadingImage_FormVehicle").loadImager();
    
    $("#loadingImage_DdslickVehicleKitType").loadImager();
    $("#loadingImage_DdslickApplicationType").loadImager();
    $("#loadingImage_DdslickVehicleModel").loadImager();
    $("#loadingImage_DdslickVehicleVariant").loadImager();
    $("#loadingImage_DdslickVehicleType").loadImager();
    $("#loadingImage_DdslickVehicleTonaj").loadImager();
    $("#loadingImage_DdslickGvm").loadImager();
    $("#loadingImage_DdslickVehicleModelGr").loadImager();
    $("#loadingImage_DdslickConfig").loadImager();
    $("#loadingImage_DdslickCab").loadImager();
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


    $("#loadingImage_DdslickVehicleKitType").loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleKitType").loadImager('appendImage');

    var ajaxACLResources_vehiclekittype = $('#ajax_DdslickVehicleKitType').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleCKDCBU/',
        type: 'POST',
        data: {
            url: '1',
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_vehiclekittype.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $("#loadingImage_DdslickVehicleKitType").loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datackdcbu) {
            var cbdata_vehiclekittype = $.parseJSON(datackdcbu);
            cbdata_vehiclekittype.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickVehicleKitType').ddslick({
                //height: 150,
                data: cbdata_vehiclekittype,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loadingImage_DdslickVehicleKitType").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $("#loadingImage_DdslickVehicleKitType").loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('vehiclekittype bulunamamıştır...'), window.lang.translate('vehiclekittype  bulunamamıştır...'));
        },
    })
    ajaxACLResources_vehiclekittype.ajaxCallWidget('call');

/*
    //CLA, TGM, TGS, VW, XHCV
    var cbdata_model = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "CLA",
            value: 2,
            selected: false
        },
        {
            text: "TGM",
            value: 3,
            selected: false
        },
        {
            text: "TGS",
            value: 4,
            selected: false
        },
        {
            text: "VW",
            value: 5,
            selected: false
        },
        {
            text: "XHCV",
            value: 6,
            selected: false
        }
    ];
*/
    $("#loadingImage_DdslickVehicleModel").loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleModel").loadImager('appendImage');

    var ajaxACLResources_vehiclemodel = $('#ajax_DdslickVehicleModel').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleGroups/',
        type: 'POST',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_vehiclemodel.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $("#loadingImage_DdslickVehicleModel").loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datamodel) {
            var cbdata_model = $.parseJSON(datamodel);
            cbdata_model.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickVehicleModel').ddslick({
                //height: 150,
                data: cbdata_model,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 1) {
                        vehicleModel = selectedData.selectedData.text;
                    }
                    else
                    {
                        vehicleModel = "";
                    }
                    document.getElementById("txt-vehicle-name").value = vehicleModel + "-" + document.getElementById("txt-modeldescription").value;
                }
            });

            $("#loadingImage_DdslickVehicleModel").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleModel').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('vehiclemodel bulunamamıştır...'), window.lang.translate('vehiclemodel  bulunamamıştır...'));
        }
    })
    ajaxACLResources_vehiclemodel.ajaxCallWidget('call');


    //CLA CBU 2-axis , CLA CBU 3- & 4-axis, TGM < 16t non tract.
    var cbdata_modelgr = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "CLA CBU 2-axis",
            value: 2,
            selected: false
        },
        {
            text: "CLA CBU 3- & 4-axis",
            value: 3,
            selected: false
        },
        {
            text: "TGM < 16t non tract",
            value: 4,
            selected: false
        },
    ];

    $('#loadingImage_DdslickVehicleModelGr').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleModelGr").loadImager('appendImage');

    var ajaxACLResources_vehiclemodelgr = $('#ajax_DdslickVehicleModelGr').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleGroupTypes/',
        type: 'POST',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_vehiclemodelgr.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleModelGr').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datamodelgr) {
            //var cbdata_modelgr = $.parseJSON(datamodelgr);
            //cbdata_modelgr.splice(0, 0,
            //{ text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            //);
            $('#ddslickVehicleModelGr').ddslick({
                //height: 150,
                data: cbdata_modelgr,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickVehicleModelGr").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleModelGr').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('vehiclemodelgr bulunamamıştır...'), window.lang.translate('vehiclemodelgr  bulunamamıştır...'));
        },
    })
    ajaxACLResources_vehiclemodelgr.ajaxCallWidget('call');

/*
    //LMC6, LN62
    var cbdata_type = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "LMC6",
            value: 2,
            selected: false
        },
        {
            text: "LN62",
            value: 3,
            selected: false
        }
    ];
*/

    $("#loadingImage_DdslickVehicleType").loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleType").loadImager('appendImage');

    var ajaxACLResources_vehicletype = $('#ajax_DdslickVehicleType').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleGroupTypes/',
        type: 'POST',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_vehicletype.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $("#loadingImage_DdslickVehicleType").loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datavehicletype) {
            var cbdata_type = $.parseJSON(datavehicletype);
            cbdata_type.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickVehicleType').ddslick({
                //height: 150,
                data: cbdata_type,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 1) {
                        vehicleType = selectedData.selectedData.text;
                    }
                    else {
                        vehicleType = "";
                    }
                    document.getElementById("txt-gfz-vehicletype").value = vehicleType + document.getElementById("txt-gfz").value;
                }
            });

            $("#loadingImage_DdslickVehicleType").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $("#loadingImage_DdslickVehicleType").loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('vehicletype bulunamamıştır...'), window.lang.translate('vehicletype  bulunamamıştır...'));
        },
    })
    ajaxACLResources_vehicletype.ajaxCallWidget('call');

/*
    //26.280, 15.220
    var cbdata_vehicletonaj = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "26.280",
            value: 2,
            selected: false
        },
        {
            text: "15.220",
            value: 3,
            selected: false
        }
    ];

*/
    $('#loadingImage_DdslickVehicleTonaj').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleTonaj").loadImager('appendImage');

    var ajaxACLResources_vehicletonaj = $('#ajax_DdslickVehicleTonaj').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleGTModels/',
        type: 'POST',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_vehicletonaj.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleTonaj').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datatonaj) {
            var cbdata_vehicletonaj = $.parseJSON(datatonaj);
            cbdata_vehicletonaj.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickVehicleTonaj').ddslick({
                //height: 150,
                data: cbdata_vehicletonaj,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickVehicleTonaj").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleTonaj').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('vehicletonaj bulunamamıştır...'), window.lang.translate('vehicletonaj  bulunamamıştır...'));
        },
    })
    ajaxACLResources_vehicletonaj.ajaxCallWidget('call');


   //18.000, 17.000, 24.000
    var cbdata_gvm = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "17.000",
            value: 2,
            selected: false
        },
        {
            text: "18.000",
            value: 3,
            selected: false
        },
        {
            text: "24.000",
            value: 4,
            selected: false
        },
    ];

    $("#loadingImage_DdslickGvm").loadImager('removeLoadImage');
    $("#loadingImage_DdslickGvm").loadImager('appendImage');

    var ajaxACLResources_gvm = $('#ajax_DdslickGvm').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        //type: 'POST',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_gvm.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickGvm').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var cbdata_gvm = $.parseJSON(data);
            //cbdata_gvm.splice(0, 0,
            //    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            //);
            $('#ddslickGVM').ddslick({
                //height: 150,
                data: cbdata_gvm,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickGvm").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickGvm').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('gvm bulunamamıştır...'), window.lang.translate('gvm  bulunamamıştır...'));
        },
    })
    ajaxACLResources_gvm.ajaxCallWidget('call');
/*
    //T/T, F/C, TIP, MIX, Tipper
    var cbdata_variant = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "T/T",
            value: 2,
            selected: false
        },
        {
            text: "F/C",
            value: 3,
            selected: false
        },
        {
            text: "TIP",
            value: 4,
            selected: false
        },
        {
            text: "MIX",
            value: 5,
            selected: false
        },
        {
            text: "Tipper",
            value: 6,
            selected: false
        }
    ];
*/
    $('#loadingImage_DdslickVehicleVariant').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleVariant").loadImager('appendImage');

    var ajaxACLResources_vehiclevariant = $('#ajax_DdslickVehicleVariant').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleModelVariant/',
        type: 'POST',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_vehiclevariant.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleVariant').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datavariant) {
            var cbdata_variant = $.parseJSON(datavariant);
            cbdata_variant.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickVehicleVariant').ddslick({
                //height: 150,
                data: cbdata_variant,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickVehicleVariant").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickVehicleVariant').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('vehiclevariant bulunamamıştır...'), window.lang.translate('vehiclevariant  bulunamamıştır...'));
        },
    })
    ajaxACLResources_vehiclevariant.ajaxCallWidget('call');
 

/*
    //4x2, 4x4, 6x4, 8x4, 6x6, 8x8, 8x4/4
    var cbdata_config = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "4x2",
            value: 2,
            selected: false
        },
        {
            text: "4x4",
            value: 3,
            selected: false
        },
        {
            text: "6x4",
            value: 4,
            selected: false
        },
    ];
*/

    $('#loadingImage_DdslickConfig').loadImager('removeLoadImage');
    $("#loadingImage_DdslickConfig").loadImager('appendImage');

    var ajaxACLResources_config = $('#ajax_DdslickConfig').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleConfigTypes/',
        type: 'POST',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_config.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickConfig').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
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
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickConfig').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('config bulunamamıştır...'), window.lang.translate('config  bulunamamıştır...'));
        },
    })
    ajaxACLResources_config.ajaxCallWidget('call');

/*
    //4x2, 4x4, 6x4, 8x4, 6x6, 8x8, 8x4/4
    var cbdata_cab = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "C",
            value: 2,
            selected: false
        },
        {
            text: "L",
            value: 3,
            selected: false
        },
        {
            text: "LX",
            value: 4,
            selected: false
        },
    ];

*/

    $("#loadingImage_DdslickCab").loadImager('removeLoadImage');
    $("#loadingImage_DdslickCab").loadImager('appendImage');

    var ajaxACLResources_cab = $('#ajax_DdslickCab').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleCabTypes/',
        type: 'POST',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_cab.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $("#loadingImage_DdslickCab").loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datacab) {
            var cbdata_cab = $.parseJSON(datacab);
            cbdata_cab.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickCab').ddslick({
                //height: 150,
                data: cbdata_cab,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickCab").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickCab').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('cab bulunamamıştır...'), window.lang.translate('cab  bulunamamıştır...'));
        },
    })
    ajaxACLResources_cab.ajaxCallWidget('call');


/*
    var cbdata_kp = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "KP000637",
            value: 2,
            selected: false
        },
        {
            text: "KP000638",
            value: 3,
            selected: false
        },
        {
            text: "KP000639",
            value: 4,
            selected: false
        },
    ];
*/
    $('#loadingImage_DdslickKP').loadImager('removeLoadImage');
    $("#loadingImage_DdslickKP").loadImager('appendImage');

    var ajaxACLResources_kp = $('#ajax_DdslickKPNo').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleKPNumbers/',
        type: 'POST',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_kp.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickKP').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datakp) {
            var cbdata_kp = $.parseJSON(datakp);
            cbdata_kp.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickKPNo').ddslick({               
                data: cbdata_kp,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickKP").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickKP').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('KPNo bulunamamıştır...'), window.lang.translate('KpNo  bulunamamıştır...'));

            $('#ddslickKPNo').ddslick({
                data: cbdata,
                width: '100%',
            });
        },
    })
    ajaxACLResources_kp.ajaxCallWidget('call');

    /*
    //BTO, BTS
    var cbdata_stockinfo = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "BTO",
            value: 2,
            selected: false
        },
        {
            text: "BTS",
            value: 3,
            selected: false
        }
    ];
    */

    $('#loadingImage_DdslickBTOBTS').loadImager('removeLoadImage');
    $("#loadingImage_DdslickBTOBTS").loadImager('appendImage');

    var ajaxACLResources_stockinfo = $('#ajax_DdslickBTOBTS').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleBTOBTS/',
        type: 'POST',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_stockinfo.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-stockinfo').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, btobtsdata) {
            var cbdata_btobts = $.parseJSON(btobtsdata);
            cbdata_btobts.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickBTOBTS').ddslick({
                //height: 150,
                data: cbdata_btobts,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loadingImage_DdslickBTOBTS").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickBTOBTS').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('cab bulunamamıştır...'), window.lang.translate('cab  bulunamamıştır...'));
        },
    })
    ajaxACLResources_stockinfo.ajaxCallWidget('call');
/*
    var cbdata_app = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Longhaul",
            value: 2,
            selected: false
        },
        {
            text: "Traction/distribution",
            value: 3,
            selected: false
        },
        {
            text: "Hydrodrive",
            value: 4,
            selected: false
        },
        {
            text: "Heavy Duty",
            value: 5,
            selected: false
        }
    ];
*/
    $("#loadingImage_DdslickApplicationType").loadImager('removeLoadImage');
    $("#loadingImage_DdslickApplicationType").loadImager('appendImage');

    var ajaxACLResources_applicationtype = $('#ajax_DdslickApplicationType').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleAppTypes/',
        type: 'POST',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_applicationtype.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $("#loadingImage_DdslickApplicationType").loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, cbdata_app) {
            var cbdata_apptype = $.parseJSON(cbdata_app);
            cbdata_apptype.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickApplicationType').ddslick({
                //height: 150,
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
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loadingImage_DdslickApplicationType').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('applicationtype bulunamamıştır...'), window.lang.translate('applicationtype  bulunamamıştır...'));
        },
    })
    ajaxACLResources_applicationtype.ajaxCallWidget('call');


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
                url: "/Vehicle/SysVehicleList",
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

    DevExpress.localization.locale(langCode);


    $("#gridContainer_vehicle_buybacktradeback_desc").dxDataGrid({

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
            dataField: "StoreCity"
        }],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                //fillVehicleForm(data);
            }
        }

    });

    $("#gridContainer_vehicle").dxDataGrid({

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
                caption: window.lang.translate('Vehicle name'),
                dataField: "StoreState"
            }, {
                caption: window.lang.translate('Vehicle Kit Type'),
                dataField: "Employee"
            }, {
                caption: window.lang.translate('Vehicle Model Grouping'),
                dataField: "StoreCity"
            }, {
                caption: window.lang.translate('Vehicle type'),
                dataField: "Employee"
            }, {
                caption: window.lang.translate('Vehicle tonaj type'),
                dataField: "StoreState"
            }, {
                caption: window.lang.translate('GVM'),
                dataField: "Employee"
            }, {
                caption: window.lang.translate('Config'),
                dataField: "StoreState"
            }, {
                caption: window.lang.translate('Vehicle Variant'),
                dataField: "Employee"
            }, {
                caption: window.lang.translate('Vehicle Cab'),
                dataField: "StoreCity"
            }, {
                caption: window.lang.translate('GFZ'),
                dataField: "Employee"
            }, {
                caption: window.lang.translate('KP No'),
                dataField: "StoreState"
            }, {
                caption: window.lang.translate('BTO/BTS'),
                dataField: "Employee"
            }, {
                caption: window.lang.translate('Model Description'),
                dataField: "StoreState"
            }, {
                caption: window.lang.translate('Application Type'),
                dataField: "Employee"
            }, {
                caption: window.lang.translate('Property'),
                dataField: "StoreState"
            }            
        ],

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                fillVehicleForm(data);
            }
        }

    });    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }

    /**
 * insertVehicle
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 15/08/2018
 */

    window.insertVehicle= function () {
        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
        $("#loadingImage_FormVehicle").loadImager('appendImage');

        var vehicle_name = $('#txt-vehicle-name').val();
        var gfz = $('#txt-gfz').val();
        var gfz_vehicletype = $('#txt-gfz-vehicletype').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            type: 'POST',
            data: {
                url: 'pkInsert_sysvehicle',
                
                name: vehicle_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
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
        aj.ajaxCall('call');
    }
 /**
 * reset vehicle Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 15/08/2018
 */

    window.resetVehicleForm = function () {
        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
        $("#loadingImage_FormVehicle").loadImager('appendImage');

        $('#vehicleForm').validationEngine('hide');

        $('#ddslickVehicleKitType').ddslick('select', { index: String(0) });
        $('#ddslickApplicationType').ddslick('select', { index: String(0) });
        $('#ddslickVehicleModel').ddslick('select', { index: String(0) });
        $('#ddslickVehicleVariant').ddslick('select', { index: String(0) });
        $('#ddslickVehicleTonaj').ddslick('select', { index: String(0) });
        $('#ddslickVehicleType').ddslick('select', { index: String(0) });
        $('#ddslickGVM').ddslick('select', { index: String(0) });
        $('#ddslickVehicleModelGr').ddslick('select', { index: String(0) });
        $('#ddslickConfig').ddslick('select', { index: String(0) });
        $('#ddslickCab').ddslick('select', { index: String(0) });
        $('#ddslickKPNo').ddslick('select', { index: String(0) });
        $('#ddslickBTOBTS').ddslick('select', { index: String(0) });

        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');

        return false;
    }


    /**
    * insert Vehicle Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 15/08/2018
    */

    window.insertVehicleWrapper = function (e) {
        e.preventDefault();

        if ($("#vehicleForm").validationEngine('validate')) {

            insertVehicle();
        }
        return false;
    }


    /**
    * Fill Vehicle form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 15/08/2018
    */

    window.fillVehicleForm = function (data) {

        $("#loadingImage_FormVehicle").loadImager('removeLoadImage');
        $("#loadingImage_FormVehicle").loadImager('appendImage');

        document.getElementById("txt-vehicle-name").value = data.StoreCity;
        document.getElementById("txt-gfz").value = data.Employee;
        document.getElementById("txt-gfz-vehicletype").value = data.Employee; //data.VehicleType
        document.getElementById("txt-modeldescription").value = data.Employee; //data.VehicleType
        document.getElementById("txt-vehicle-property").value = data.Employee; //data.VehicleType

        $('#ddslickVehicleKitType').ddslick('select', { index: 2 });
        $('#ddslickApplicationType').ddslick('select', { index: 2 });
        $('#ddslickVehicleModel').ddslick('select', { index: 2 });
        $('#ddslickVehicleVariant').ddslick('select', { index: 2 });
        $('#ddslickVehicleType').ddslick('select', { index: 2 });
        $('#ddslickVehicleTonaj').ddslick('select', { index: 2 });
        $('#ddslickGVM').ddslick('select', { index: 2 });
        $('#ddslickVehicleModelGr').ddslick('select', { index: 2 });
        $('#ddslickConfig').ddslick('select', { index: 2 });
        $('#ddslickCab').ddslick('select', { index: 2 });
        $('#ddslickKPNo').ddslick('select', { index: 2 });
        $('#ddslickBTOBTS').ddslick('select', { index: 1 });

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

});

