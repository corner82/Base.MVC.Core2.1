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
    $("#loading-image-vehicle").loadImager();

    $("#loading-image-vehiclekittype").loadImager();
    $("#loading-image-applicationtype").loadImager();
    $("#loading-image-vehiclemodel").loadImager();
    $("#loading-image-vehiclevariant").loadImager();
    $("#loading-image-vehicletype").loadImager();
    $("#loading-image-vehicletonaj").loadImager();
    $("#loading-image-gvm").loadImager();
    $("#loading-image-vehiclemodelgr").loadImager();
    $("#loading-image-config").loadImager();
    $("#loading-image-cab").loadImager();
    $("#loading-image-kp").loadImager();
    $("#loading-image-stockinfo").loadImager();

    //to vehiclemodel form grid loading-image
    $("#loading-image-vehicleGrid").loadImager();
   
    var langCode = $("#langCode").val();

    var vehicleModel = "";
    var vehicleType = "";
    //alert(langCode);


    $('#vehicleForm').validationEngine();

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

    $('#loading-image-vehiclekittype').loadImager('removeLoadImage');
    $("#loading-image-vehiclekittype").loadImager('appendImage');

    var ajaxACLResources_vehiclekittype = $('#ajaxACL-vehiclekittype').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleCKDCBU/',
        data: {
            url: '1',
            //pk: $("#pk").val()
            dataType: 'json'
        }

    });

    ajaxACLResources_vehiclekittype.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehiclekittype').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datackdcbu) {
            var cbdata_vehiclekittype = $.parseJSON(datackdcbu);

            $('#dropdownVehicleKitType').ddslick({
                //height: 150,
                data: cbdata_vehiclekittype,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });

            $("#loading-image-vehiclekittype").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehiclekittype').loadImager('removeLoadImage');
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
    $('#loading-image-vehiclemodel').loadImager('removeLoadImage');
    $("#loading-image-vehiclemodel").loadImager('appendImage');

    var ajaxACLResources_vehiclemodel = $('#ajaxACL-vehiclemodel').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleGroups/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_vehiclemodel.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehiclemodel').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datamodel) {
            var cbdata_model = $.parseJSON(datamodel);

            $('#dropdownVehicleModel').ddslick({
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

            $("#loading-image-vehiclemodel").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehiclemodel').loadImager('removeLoadImage');
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

    $('#loading-image-vehiclemodelgr').loadImager('removeLoadImage');
    $("#loading-image-vehiclemodelgr").loadImager('appendImage');

    var ajaxACLResources_vehiclemodelgr = $('#ajaxACL-vehiclemodelgr').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleGroupTypes/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_vehiclemodelgr.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehiclemodelgr').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datamodelgr) {
            //var cbdata_modelgr = $.parseJSON(datamodelgr);

            $('#dropdownVehicleModelGr').ddslick({
                //height: 150,
                data: cbdata_modelgr,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-vehiclemodelgr").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehiclemodelgr').loadImager('removeLoadImage');
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

    $('#loading-image-vehicletype').loadImager('removeLoadImage');
    $("#loading-image-vehicletype").loadImager('appendImage');

    var ajaxACLResources_vehicletype = $('#ajaxACL-vehicletype').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleGroupTypes/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_vehicletype.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehicletype').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datavehicletype) {
            var cbdata_type = $.parseJSON(datavehicletype);

            $('#dropdownVehicleType').ddslick({
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

            $("#loading-image-vehicletype").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehicletype').loadImager('removeLoadImage');
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
    $('#loading-image-vehicletonaj').loadImager('removeLoadImage');
    $("#loading-image-vehicletonaj").loadImager('appendImage');

    var ajaxACLResources_vehicletonaj = $('#ajaxACL-vehicletonaj').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleGTModels/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_vehicletonaj.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehicletonaj').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datatonaj) {
            var cbdata_vehicletonaj = $.parseJSON(datatonaj);

            $('#dropdownVehicleTonaj').ddslick({
                //height: 150,
                data: cbdata_vehicletonaj,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-vehicletonaj").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehicletonaj').loadImager('removeLoadImage');
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

    $('#loading-image-gvm').loadImager('removeLoadImage');
    $("#loading-image-gvm").loadImager('appendImage');

    var ajaxACLResources_gvm = $('#ajaxACL-gvm').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_gvm.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-gvm').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownGVM').ddslick({
                //height: 150,
                data: cbdata_gvm,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-gvm").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-gvm').loadImager('removeLoadImage');
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
    $('#loading-image-vehiclevariant').loadImager('removeLoadImage');
    $("#loading-image-vehiclevariant").loadImager('appendImage');

    var ajaxACLResources_vehiclevariant = $('#ajaxACL-vehiclevariant').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleModelVariant/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_vehiclevariant.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehiclevariant').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datavariant) {
            var cbdata_variant = $.parseJSON(datavariant);

            $('#dropdownVehicleVariant').ddslick({
                //height: 150,
                data: cbdata_variant,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-vehiclevariant").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-vehiclevariant').loadImager('removeLoadImage');
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

    $('#loading-image-config').loadImager('removeLoadImage');
    $("#loading-image-config").loadImager('appendImage');

    var ajaxACLResources_config = $('#ajaxACL-config').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleConfigTypes/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_config.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-config').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, dataconfig) {
            var cbdata_config = $.parseJSON(dataconfig);

            $('#dropdownConfig').ddslick({
                //height: 150,
                data: cbdata_config,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-config").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-config').loadImager('removeLoadImage');
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

    $('#loading-image-cab').loadImager('removeLoadImage');
    $("#loading-image-cab").loadImager('appendImage');

    var ajaxACLResources_cab = $('#ajaxACL-cab').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleCabTypes/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_cab.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-cab').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datacab) {
            var cbdata_cab = $.parseJSON(datacab);

            $('#dropdownCab').ddslick({
                //height: 150,
                data: cbdata_cab,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-cab").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-cab').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('cab bulunamamıştır...'), window.lang.translate('cab  bulunamamıştır...'));
        },
    })
    ajaxACLResources_cab.ajaxCallWidget('call');


    //4x2, 4x4, 6x4, 8x4, 6x6, 8x8, 8x4/4
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

    $('#loading-image-kp').loadImager('removeLoadImage');
    $("#loading-image-kp").loadImager('appendImage');

    var ajaxACLResources_kp = $('#ajaxACL-kp').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_kp.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-kp').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownKPNo').ddslick({
                //height: 150,
                data: cbdata_kp,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-kp").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-kp').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('KPNo bulunamamıştır...'), window.lang.translate('KpNo  bulunamamıştır...'));
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

    $('#loading-image-stockinfo').loadImager('removeLoadImage');
    $("#loading-image-stockinfo").loadImager('appendImage');

    var ajaxACLResources_stockinfo = $('#ajaxACL-stockinfo').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
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

            $('#dropdownStockInfo').ddslick({
                //height: 150,
                data: cbdata_btobts,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-stockinfo").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-stockinfo').loadImager('removeLoadImage');
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
    $('#loading-image-applicationtype').loadImager('removeLoadImage');
    $("#loading-image-applicationtype").loadImager('appendImage');

    var ajaxACLResources_applicationtype = $('#ajaxACL-applicationtype').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleAppTypes/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_applicationtype.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-applicationtype').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, cbdata_app) {
            var cbdata = $.parseJSON(cbdata_app);

            $('#dropdownApplicationType').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            //$('#dropdownApplicationType').ddslick('disable');
            //$('#dropdownApplicationType').ddslick('enable');

            $("#loading-image-applicationtype").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-applicationtype').loadImager('removeLoadImage');
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
            dataField: "StoreCity"
        }],

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
        $("#loading-image-vehicle").loadImager('removeLoadImage');
        $("#loading-image-vehicle").loadImager('appendImage');

        var vehicle_name = $('#txt-vehicle-name').val();
        var gfz = $('#txt-gfz').val();
        var gfz_vehicletype = $('#txt-gfz-vehicletype').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
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
                $("#loading-image-vehicle").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#vehicleForm')[0].reset();

                        $("#loading-image-vehicle").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'vehicle Kayıt İşlemi Başarılı...',
                    'vehicle kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-vehicle").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'vehicle Kayıt İşlemi Başarısız...',
                    'vehicle kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysvehiclemodel" servis datası boştur!!');
                $("#loading-image-vehicle").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'vehiclemodel Kayıt İşlemi Başarısız...',
                    'vehiclemodel kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysvehiclemodel" servis datası boştur!!');
                $("#loading-image-vehicle").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-vehicle").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#vehicleForm')[0].reset();
                        $("#loading-image-vehicle").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Araç kaydı yapılmıştır, yeni bir araç kaydı deneyiniz... ');
                $("#loading-image-vehicle").loadImager('removeLoadImage');
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
        $("#loading-image-vehicle").loadImager('removeLoadImage');
        $("#loading-image-vehicle").loadImager('appendImage');

        $('#vehicleForm').validationEngine('hide');

        $('#dropdownVehicleKitType').ddslick('select', { index: String(0) });
        $('#dropdownApplicationType').ddslick('select', { index: String(0) });
        $('#dropdownVehicleModel').ddslick('select', { index: String(0) });
        $('#dropdownVehicleVariant').ddslick('select', { index: String(0) });
        $('#dropdownVehicleTonaj').ddslick('select', { index: String(0) });
        $('#dropdownVehicleType').ddslick('select', { index: String(0) });
        $('#dropdownGVM').ddslick('select', { index: String(0) });
        $('#dropdownVehicleModelGr').ddslick('select', { index: String(0) });
        $('#dropdownConfig').ddslick('select', { index: String(0) });
        $('#dropdownCab').ddslick('select', { index: String(0) });
        $('#dropdownKPNo').ddslick('select', { index: String(0) });
        $('#dropdownStockInfo').ddslick('select', { index: String(0) });

        $("#loading-image-vehicle").loadImager('removeLoadImage');

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

        $("#loading-image-vehicle").loadImager('removeLoadImage');
        $("#loading-image-vehicle").loadImager('appendImage');

        document.getElementById("txt-vehicle-name").value = data.StoreCity;
        document.getElementById("txt-gfz").value = data.Employee;
        document.getElementById("txt-gfz-vehicletype").value = data.Employee; //data.VehicleType
        document.getElementById("txt-modeldescription").value = data.Employee; //data.VehicleType
        document.getElementById("txt-vehicle-property").value = data.Employee; //data.VehicleType

        $('#dropdownVehicleKitType').ddslick('select', { index: 2 });
        $('#dropdownApplicationType').ddslick('select', { index: 2 });
        $('#dropdownVehicleModel').ddslick('select', { index: 2 });
        $('#dropdownVehicleVariant').ddslick('select', { index: 2 });
        $('#dropdownVehicleType').ddslick('select', { index: 2 });
        $('#dropdownVehicleTonaj').ddslick('select', { index: 2 });
        $('#dropdownGVM').ddslick('select', { index: 2 });
        $('#dropdownVehicleModelGr').ddslick('select', { index: 2 });
        $('#dropdownConfig').ddslick('select', { index: 2 });
        $('#dropdownCab').ddslick('select', { index: 2 });
        $('#dropdownKPNo').ddslick('select', { index: 2 });
        $('#dropdownStockInfo').ddslick('select', { index: 1 });

        $("#loading-image-vehicle").loadImager('removeLoadImage');

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
            
            $('#dropdownKPNo').ddslick('select', { index: String(0) });
            /* $('#dropdownKPNo').ddslick('disable');*/
            $('#dropdownStockInfo').ddslick('select', { index: String(0) });
           /* $('#dropdownStockInfo').ddslick('disable');*/
        }
        else 
        {
            document.getElementById("txt-gfz").disabled = false;
            //document.getElementById("dropdownKPNo").disabled = false;
            //document.getElementById("dropdownStockInfo").disabled = false;
            //$('#dropdownStockInfo').ddslick('enable');
        }
    }

});

