﻿$(document).ready(function () {

    "use strict";

    /*
    * jquery lang master created dynamically
    */
    $("#langCode").jsLangMaster();


    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });


    window.tab_active = function () {
        //Update & View Mode
        //tablar açılacak

        $("a[data-toggle='tab'").prop('disabled', false);
        $("a[data-toggle='tab'").each(function () {
            $(this).attr('href', $(this).prop('data-href')); // restore original href
        });
        $("a[data-toggle='tab'").removeClass('disabled-link');
    }

    window.tab_disable = function () {
        //yeni kayda açık
        //tablar kapatılacak

        $("a[data-toggle='tab'").prop('disabled', true);
        $("a[data-toggle='tab'").each(function () {
            $(this).prop('data-href', $(this).attr('href')); // hold you original href
            $(this).attr('href', '#'); // clear href
        });
        $("a[data-toggle='tab'").addClass('disabled-link');

    }

    window.tab_disable();
    /*
    * Customer Info insert form validation engine attached to work
    * @since 02/08/2016
    */
    $('#customerInfoForm').validationEngine();
    $('#customerPurchaseForm').validationEngine();
    $('#customerContactPersonForm').validationEngine();

    /* Geçici data */
    //Dropdown plugin data

    var cbdata = [
        {
            text: "Select...",
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


    $("#loading-image-country").loadImager();
    $("#loading-image-country").loadImager('appendImage');  

    var ajaxACLResources_country = $('#loading-image-country').ajaxCallWidget({
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
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCountry').ddslick({
                //height: 150,
                data: cbdata,
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
            dm.dangerMessage('show', 'Ülke Bulunamamıştır...', 'Ülke  bulunamamıştır...');
        },
    })
    ajaxACLResources_country.ajaxCallWidget('call');

    $("#loading-image-city").loadImager();
    $("#loading-image-city").loadImager('appendImage');  

    var ajaxACLResources_city = $('#loading-image-city').ajaxCallWidget({
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
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCity').ddslick({
                //height: 150,
                data: cbdata,
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
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_city.ajaxCallWidget('call');


    $("#loading-image-reliabilityrate").loadImager();
    $("#loading-image-reliabilityrate").loadImager('appendImage');

    var ajaxACLResources_reliabilityRate = $('#loading-image-reliabilityrate').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_reliabilityRate.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-reliabilityrate').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownReliabilityRate').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-reliabilityrate").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-reliabilityrate').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_reliabilityRate.ajaxCallWidget('call');



    $("#loading-image-sector").loadImager();
    $("#loading-image-sector").loadImager('appendImage');

    var ajaxACLResources_sector = $('#loading-image-sector').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_sector.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-sector').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownSector').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-sector").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-sector').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_sector.ajaxCallWidget('call');


    $("#loading-image-segment").loadImager();
    $("#loading-image-segment").loadImager('appendImage');

    var ajaxACLResources_segment = $('#loading-image-segment').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_segment.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-segment').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownSegment').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-segment").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-segment').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_segment.ajaxCallWidget('call');

    $("#loading-image-customergroup").loadImager();
    $("#loading-image-customergroup").loadImager('appendImage');

    var ajaxACLResources_customergroup = $('#loading-image-customergroup').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_customergroup.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-customergroup').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCustomerGroup').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-customergroup").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-customergroup').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_customergroup.ajaxCallWidget('call');

    $("#loading-image-totalvehicles").loadImager();
    $("#loading-image-totalvehicles").loadImager('appendImage');

    var ajaxACLResources_totalvehicles = $('#loading-image-totalvehicles').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_totalvehicles.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-totalvehicles').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownTotalVehicles').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-totalvehicles").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-totalvehicles').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_totalvehicles.ajaxCallWidget('call');


    $("#loading-image-totalemployees").loadImager();
    $("#loading-image-totalemployees").loadImager('appendImage');

    var ajaxACLResources_totalemployees = $('#loading-image-totalemployees').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_totalemployees.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-totalemployees').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownTotalEmployees').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-totalemployees").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-totalemployees').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_totalemployees.ajaxCallWidget('call');


    $("#loading-image-annuelrevenue").loadImager();
    $("#loading-image-annuelrevenue").loadImager('appendImage');

    var ajaxACLResources_annuelrevenue = $('#loading-image-annuelrevenue').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_annuelrevenue.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-annuelrevenue').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownAnnuelRevenue').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-annuelrevenue").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-annuelrevenue').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_annuelrevenue.ajaxCallWidget('call');

    /* Purchase Plans loading services */


    $("#loading-image-lastpurchasedbrand").loadImager();
    $("#loading-image-lastpurchasedbrand").loadImager('appendImage');

    var ajaxACLResources_lastpurchasedbrand = $('#loading-image-lastpurchasedbrand').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_lastpurchasedbrand.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-lastpurchasedbrand').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownLastPurchaseBrand').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-lastpurchasedbrand").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-lastpurchasedbrand').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_lastpurchasedbrand.ajaxCallWidget('call');


    $("#loading-image-purchasedecision").loadImager();
    $("#loading-image-purchasedecision").loadImager('appendImage');

    var ajaxACLResources_purchasedecision = $('#loading-image-purchasedecision').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_purchasedecision.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-purchasedecision').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownPurchaseDecision').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-purchasedecision").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-purchasedecision').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_purchasedecision.ajaxCallWidget('call');


    $("#loading-image-dateofpurchaseplan").loadImager();
    $("#loading-image-dateofpurchaseplan").loadImager('appendImage');

    var ajaxACLResources_dateofpurchaseplan = $('#loading-image-dateofpurchaseplan').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_dateofpurchaseplan.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-dateofpurchaseplan').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownDateofPurchasePlan').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-dateofpurchaseplan").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-dateofpurchaseplan').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_dateofpurchaseplan.ajaxCallWidget('call');


    $("#loading-image-numberofvehiclestopurchase").loadImager();
    $("#loading-image-numberofvehiclestopurchase").loadImager('appendImage');

    var ajaxACLResources_numberofvehiclestopurchase = $('#loading-image-numberofvehiclestopurchase').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_numberofvehiclestopurchase.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-numberofvehiclestopurchase').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownNumberofVehiclestoP').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-numberofvehiclestopurchase").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-numberofvehiclestopurchase').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...', 'Rol  bulunamamıştır...');
        },
    })
    ajaxACLResources_numberofvehiclestopurchase.ajaxCallWidget('call');

    //ContactPerson

    var data_priority = [{
        "value": 0,
        "text": "Select...",
        selected: true
    },{
        "value": 1,
        "text": "High",
        selected: false
    }, {
        "value": 2,
        "text": "Normal",
        selected: false
    }, {
        "value": 3,
        "text": "Low",
        selected: false

    }];

    var data_role = [{
        "value": 0,
        "text": "Select.. .",
        selected: true
    },{
        "value": 1,
        "text": "CEO"
    }, {
        "value": 2,
        "text": "Owner"
    }, {
        "value": 3,
        "text": "Salesman"
    }, {
        "value": 4,
        "text": "Others"
    }];

    var data_title = [{
        "value": 0,
        "text": "Select...",
        selected: true
    }, {
        "value": 1,
        "text": "Mr."
    }, {
        "value": 2,
        "text": "Mrs."
    }];

    var data_brand = [{
        "value": 0,
        "text": "Select...",
        selected: true
    }, {
        "value": 1,
        "text": "MAN"
    }, {
        "value": 2,
        "text": "MERCEDES"
    }, {
        "value": 3,
        "text": "IVECO"
    }, {
        "value": 4,
        "text": "BMC"
    }, {
        "value": 5,
        "text": "FORD"
    }];

    var data_product = [{
        "value": 0,
        "text": "Select...",
        selected: true
    }, {
        "value": 1,
        "text": "T00001"
    }, {
        "value": 2,
        "text": "T00002"
    }, {
        "value": 3,
        "text": "T00003"
    }];
    //ContactPerson dropdown fill

    $("#loading-image-priority").loadImager();
    $("#loading-image-priority").loadImager('appendImage');

    var ajaxACLResources_priority = $('#loading-image-priority').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_priority.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-priority').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownPriority').ddslick({
                //height: 150,
                data: data_priority,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-priority").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-priority').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'priority not show...', 'priority not show...');
        },
    })
    ajaxACLResources_priority.ajaxCallWidget('call');


    $("#loading-image-title").loadImager();
    $("#loading-image-title").loadImager('appendImage');

    var ajaxACLResources_title = $('#loading-image-title').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_title.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-title').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownTitle').ddslick({
                //height: 150,
                data: data_title,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-title").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-title').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'title not show...', 'title not show...');
        },
    })
    ajaxACLResources_title.ajaxCallWidget('call');


    $("#loading-image-role").loadImager();
    $("#loading-image-role").loadImager('appendImage');

    var ajaxACLResources_role = $('#loading-image-role').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_role.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-role').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownRole').ddslick({
                //height: 150,
                data: data_role,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-role").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-role').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'role not show...', 'role not show...');
        },
    })
    ajaxACLResources_role.ajaxCallWidget('call');


    /**
 * Product Interest dropdown prepared
 * @type @call;$@call;ajaxCallWidget
 * @since 30/05/2018
 */
    var ajaxACLResources_productinterest = $('#loading-image-productinterest').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        },
        async: false
    });

    ajaxACLResources_productinterest.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-productinterest').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...',
                'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {

            $('#dropdownProductInterest').ddslick({
                //height: 150,
                data: data_product,
                width: '100%',
                multiSelect: true,
                height: 200,
                selectText: "Select your preferred social network",
                searchText: window.lang.translate('Search'),
                //showSelectedHTML : false,
                defaultSelectedIndex: 3,
                search: true,
                tagBox: 'tag-container',
                //multiSelectTagID : 'deneme',
                //imagePosition:"right",

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

/*
                        if (controller == true) {
                            console.log(selectedData.selectedData.text);
                            var data = '[{"text":"' + selectedData.selectedData.text + '","value":' + selectedData.selectedData.value + '}]';
                            console.log(data);
                            var testArr = ['text', 'value'];
                            var tagValues = $('#test-cabin').tagCabin('getAllTagsValues', 'data-value');
                            console.log(tagValues);
                            if (tagValues.length > 0) {
                                if (jQuery.inArray(selectedData.selectedData.value, tagValues) < 0) {
                                    $('#test-cabin').tagCabin('addTags', data, testArr);
                                } else {
                                    //alert('tag bulunmuştur');
                                }
                            } else if (tagValues.length == 0) {
                                $('#test-cabin').tagCabin('addTags', data, testArr);
                            }
                        }
                        controller = true;
  */                    
                    }
                }
            });

            $("#loading-image-role").loadImager('removeLoadImage');
            /*
            var data2 = data_product;
            //var data = $.parseJSON(data_product);

            var tagBuilderDealers = $('#test-cabin').tagCabin({
                tagCopy: false,
                tagDeletable: true,
                tagDeletableAll: false,
                tagBox: $('.tag-container').find('ul'),
                //dataMapper: {attributes : Array('role_id', 'resource_id', 'privilege_id')}
                dataMapper: Array('role_id', 'resource_id', 'privilege_id')
            });

            tagBuilderDealers.tagCabin({
                onTagRemoved: function (event, data) {
                    var self = $(this);
                    var elementData = data.element;
                    elementData.remove();
                    //window.deleteSoruKonu(elementData);
                }

            });
            var testArr = ['text', 'value'];
            tagBuilderDealers.tagCabin('addTags', data2, testArr);
            */
            /*data.splice(0, 1,
                                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                            );*/
            /*
            var controller = false;
            $('#loading-image-productinterest').loadImager('removeLoadImage');
            $('#dropdownProductInterest').ddslick({
                height: 200,
                data: data2,
                width: '98%',
                selectText: "Select your preferred social network",
                //searchText : window.lang.translate('Search'),
                searchText: '',
                //showSelectedHTML : false,
                defaultSelectedIndex: 3,
                search: true,
                //multiSelect : true,
                multiSelect: true,
                //tagBox : 'tag-container',
                //multiSelectTagID : 'deneme',
                //imagePosition:"right",

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        if (controller == true) {
                            //console.log(selectedData.selectedData.text);
                            var data = '[{"text":"' + selectedData.selectedData.text + '","value":' + selectedData.selectedData.value + '}]';
                            //console.log(data);
                            var testArr = ['text', 'value'];
                            var tagValues = $('#test-cabin').tagCabin('getAllTagsValues', 'data-value');
                            console.log(tagValues);
                            if (tagValues.length > 0) {
                                if (jQuery.inArray(selectedData.selectedData.value, tagValues) < 0) {
                                    $('#test-cabin').tagCabin('addTags', data, testArr);
                                } else {
                                    //alert('tag bulunmuştur');
                                }
                            } else if (tagValues.length == 0) {
                                $('#test-cabin').tagCabin('addTags', data, testArr);
                            }
                        }
                        controller = true;
                    }
                }
            
            });*/
        },
        onErrorDataNull: function (event, data) {
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-productinterest').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Bayi Bulunamamıştır...',
                'Bayi  bulunamamıştır...');
        },
    })
    ajaxACLResources_productinterest.ajaxCallWidget('call');



    $("#loading-image-compsatisfaction").loadImager();
    $("#loading-image-compsatisfaction").loadImager('appendImage');

    var ajaxACLResources_compsatisfaction = $('#loading-image-compsatisfaction').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_compsatisfaction.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-compsatisfaction').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCompSatisfaction').ddslick({
                //height: 150,
                data: data_priority,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-compsatisfaction").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-compsatisfaction').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'compsatisfaction not show...', 'compsatisfaction not show...');
        },
    })
    ajaxACLResources_compsatisfaction.ajaxCallWidget('call');


    $("#loading-image-mansatisfaction").loadImager();
    $("#loading-image-mansatisfaction").loadImager('appendImage');

    var ajaxACLResources_mansatisfaction = $('#loading-image-mansatisfaction').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_mansatisfaction.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-mansatisfaction').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownMANSatisfaction').ddslick({
                //height: 150,
                data: data_priority,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-mansatisfaction").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-mansatisfaction').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'mansatisfaction not show...', 'mansatisfaction not show...');
        },
    })
    ajaxACLResources_mansatisfaction.ajaxCallWidget('call');

    $("#loading-image-brandloyalty").loadImager();
    $("#loading-image-brandloyalty").loadImager('appendImage');

    var ajaxACLResources_brandloyalty = $('#loading-image-brandloyalty').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_brandloyalty.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-brandloyalty').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownBrandLoyalty').ddslick({
                //height: 150,
                data: data_priority,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-brandloyalty").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-brandloyalty').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'brandloyalty not show...', 'brandloyalty not show...');
        },
    })
    ajaxACLResources_brandloyalty.ajaxCallWidget('call');


    $("#loading-image-brand").loadImager();
    $("#loading-image-brand").loadImager('appendImage');

    var ajaxACLResources_brand = $('#loading-image-brand').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_brand.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-brand').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownBrand').ddslick({
                //height: 150,
                data: data_priority,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-brand").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-brand').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'brand not show...', 'brandloyalty not show...');
        },
    })
    ajaxACLResources_brand.ajaxCallWidget('call');


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

    DevExpress.localization.locale("en");


    $("#gridContainer_customer").dxDataGrid({

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
            mode: "row",
            //allowAdding: true,
            //allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },

        "export": {
            enabled: true,
            fileName: "Orders"
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
            placeholder: "Search..."
        },

        headerFilter: {
            visible: true
        },

        columnChooser: {
            enabled: true,
            mode: "select"
        },

        columns: [{
            allowGrouping: false,
            dataField: "OrderNumber",
            caption: "Invoice Number",
            width: 130
        }, {
            caption: "City",
            dataField: "StoreCity"
        }, {
            caption: "State",
            dataField: "StoreState"
        },
            "Employee", {
            dataField: "OrderDate",
            dataType: "date"
        }, {
            dataField: "SaleAmount", 
                
         }],

        customizeColumns: function (columns) {
            columns[5].format = { type: "currency", currency: "EUR" };
        },

        summary: {
            totalItems: [{
                column: "OrderNumber",
                summaryType: "count"
            }, {
                column: "SaleAmount",
                summaryType: "sum",
                valueFormat: "currency"
            }]
        },

        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {

                fillCustomerInfoForm(data);

                //alert("gridContainer_customer - onSelectionChanged :" + data);
                //$(".employeeNotes").text(data.Notes);
                //$(".employeePhoto").attr("src", data.Picture);
            }
        }

    });

    $("#gridContainer_contactaddress").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        rowAlternationEnabled: true,

        showBorders: true,

        dataSource: orders,

        columnHidingEnabled: true,
        editing: {
            mode: "form",
            allowUpdating: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },

        "export": {
            enabled: true,
            fileName: "Orders"
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
            placeholder: "Search..."
        },

        headerFilter: {
            visible: true
        },

        columnChooser: {
            enabled: true,
            mode: "select"
        },

        columns: [{
            allowGrouping: false,
            dataField: "OrderNumber",
            caption: "Invoice Number",
            width: 130
        }, {
            caption: "City",
            dataField: "StoreCity"
        }, {
            caption: "State",
            dataField: "StoreState"
        },
            "Employee", {
            dataField: "OrderDate",
            dataType: "date"
        }, {
            dataField: "SaleAmount",
            format: "currency"

        }],

        customizeColumns: function (columns) {
            columns[5].format = { type: "currency", currency: "EUR" };
        },

        summary: {
            totalItems: [{
                column: "OrderNumber",
                summaryType: "count"
            }, {
                column: "SaleAmount",
                summaryType: "sum",
                valueFormat: "currency"
            }]
        }

    });

    $("#gridContainer_contactphone").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        rowAlternationEnabled: true,

        showBorders: true,

        dataSource: orders,

        columnHidingEnabled: true,
        editing: {
            mode: "form",
            allowUpdating: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },

        "export": {
            enabled: true,
            fileName: "Orders"
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
            placeholder: "Search..."
        },

        headerFilter: {
            visible: true
        },

        columnChooser: {
            enabled: true,
            mode: "select"
        },

        columns: [{
            allowGrouping: false,
            dataField: "OrderNumber",
            caption: "Invoice Number",
            width: 130
        }, {
            caption: "City",
            dataField: "StoreCity"
        }, {
            caption: "State",
            dataField: "StoreState"
        },
            "Employee", {
            dataField: "OrderDate",
            dataType: "date"
        }, {
            dataField: "SaleAmount",
            format: "currency"

        }],

        customizeColumns: function (columns) {
            columns[5].format = { type: "currency", currency: "EUR" };
        },

        summary: {
            totalItems: [{
                column: "OrderNumber",
                summaryType: "count"
            }, {
                column: "SaleAmount",
                summaryType: "sum",
                valueFormat: "currency"
            }]
        }

    });


    
    function logEvent(eventName) {
         var logList = $("#events ul"),
             newItem = $("<li>", { text: eventName });

         logList.prepend(newItem);
     }


    //Contact Person dxDataGrid

    $("#gridContainer_contactperson").dxDataGrid({

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
            mode: "row",
            //allowAdding: true,
            //allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },

        "export": {
            enabled: true,
            fileName: "ContactPerson"
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
            placeholder: "Search..."
        },

        headerFilter: {
            visible: true
        },

        columnChooser: {
            enabled: true,
            mode: "select"
        },
        columns: [{
            //allowGrouping: false,
            caption: "First Name",
            dataField: "StoreState",      
            //validationRules: [{ type: "required" }],
            width: 130
        }, {
            caption: "Last Name",
            dataField: "StoreCity",
            //validationRules: [{ type: "required" }]
        }, {
            caption: "GSM",
            dataField: "OrderNumber"    
        }, {
            caption: "Phone",
            dataField: "OrderNumber"
        }, {
            caption: "E-mail",
            dataField: "StoreState",
            //validationRules: [{ type: "required" }, { type: "email" }]
        }, {
            caption: "Birth Date",
            dataField: "OrderDate",
            dataType: "date",
            //validationRules: [{ type: "date" }]
        }, {
            dataField: "PriorityID",
            caption: "Priority",
            width: 125,
            lookup: {
                dataSource: data_priority,
                displayExpr: "Name",
                valueExpr: "ID"
            }
        }, {
            dataField: "RoleID",
            caption: "Role",
            width: 125,
            lookup: {
                dataSource: data_role,
                displayExpr: "Name",
                valueExpr: "ID"
            }
        }, {
            caption: "Last Contact Date",
            dataField: "LastContactDate",
            dataType: "date",
            validationRules: [{ type: "date" }]
        }, {
            caption: "Reference",
            dataField: "Reference"
        }, {
            dataField: "TitleID",
            caption: "Title",
            width: 125,
            lookup: {
                dataSource: data_title,
                displayExpr: "Name",
                valueExpr: "ID"
            }
        }, {
            dataField: "CompetitorSatisfactionID",
            caption: "Competitor Satisfaction",
            width: 125,
            lookup: {
                dataSource: data_priority,
                displayExpr: "Name",
                valueExpr: "ID"
            }
        }, {
            dataField: "MANSatisfactionID",
            caption: "MAN Satisfaction",
            width: 125,
            lookup: {
                dataSource: data_priority,
                displayExpr: "Name",
                valueExpr: "ID"
            }
        }, {
            dataField: "BrandLoyaltyID",
            caption: "Brand Loyalty",
            width: 125,
            lookup: {
                dataSource: data_priority,
                displayExpr: "Name",
                valueExpr: "ID"
            }
        }, {
            dataField: "LastBrandID",
            caption: "Last Brand",
            width: 125,
            lookup: {
                dataSource: data_brand,
                displayExpr: "Name",
                valueExpr: "ID"
            }
        }, {
            caption: "Hobies",
            dataField: "Hobies"
        }, {
            caption: "Club",
            dataField: "Club"
        }],

        onRowRemoving: function (e) {
            //alert("RowRemoving - gridContainer_contactperson");
            logEvent("RowRemoving");
        },
        onRowRemoved: function (e) {
            //alert("RowRemoved - gridContainer_contactperson");
            logEvent("RowRemoved");
        },
        
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {

                fillCustomerContactPersonForm(data);

                //alert("gridContainer_customer - onSelectionChanged :" + data);
                //$(".employeeNotes").text(data.Notes);
                //$(".employeePhoto").attr("src", data.Picture);
            }
        }
    });


    //Seçili Müşteriye ait Aktiviteler Listelenir
    
    $("#gridContainer_activity").dxDataGrid({

        showColumnLines: true,

        showRowLines: true,

        rowAlternationEnabled: true,

        showBorders: true,

        dataSource: orders,

        columnHidingEnabled: true,
        editing: {
            mode: "form",
            allowUpdating: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },

        "export": {
            enabled: true,
            fileName: "Orders"
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
            placeholder: "Search..."
        },

        headerFilter: {
            visible: true
        },

        columnChooser: {
            enabled: true,
            mode: "select"
        },

        columns: [{
            allowGrouping: false,
            dataField: "City",
            caption: "First Name",
            width: 130
        }, {
            caption: "Last Name",
            dataField: "StoreCity"
        }, {
            caption: "GSM",
            dataField: "StoreState"
        },
            "Employee", {
            dataField: "OrderDate",
            dataType: "date"
        }, {
            dataField: "SaleAmount",
            format: "currency"

        }],

        customizeColumns: function (columns) {
            columns[5].format = { type: "currency", currency: "EUR" };
        },

        summary: {
            totalItems: [{
                column: "OrderNumber",
                summaryType: "count"
            }, {
                column: "SaleAmount",
                summaryType: "sum",
                valueFormat: "currency"
            }]
        }
    });


    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab
      
        if (target == "#tab_1") {
            
           
            //alert("#tab_1");
        }
        if (target == "#tab_2") {
            // grid refresh olması gerektiği için kullanıldı.
            $(gridContainer_contactaddress).dxDataGrid("updateDimensions");
            $(gridContainer_contactphone).dxDataGrid("updateDimensions");
            //alert("#tab_2");
        }
        if (target == "#tab_3") {
            //Müşteri seçili ise
            //PurchasePlan görüntüle
            //alert("#tab_3");
        }
        if (target == "#tab_4") {
            // grid refresh olması gerektiği için kullanıldı.
            $(gridContainer_contactperson).dxDataGrid("updateDimensions");
            //alert("#tab_4");
        }
        if (target == "#tab_5") {
            // grid refresh olması gerektiği için kullanıldı.
            $(gridContainer_activity).dxDataGrid("updateDimensions");
            //alert("#tab_5");
        }
    });


    $('#registration-datepicker').datepicker({
        //autoclose: true,
        locale: 'en',
        format : 'yyyy/mm/dd'
    });

    $('#lastpurchase-datepicker').datepicker({
        //autoclose: true,
        locale: 'en',
        format: 'yyyy/mm/dd'
    });

    $('#cp-birthdate-datepicker').datepicker({
        //autoclose: true,
        locale: 'en',
        format: 'yyyy/mm/dd'
    });


    /**
    * insert CustomerInfo Wrapper
    * @returns {Boolean}
    * @since 02/08/2018
    */

    window.insertCustomerInfoWrapper = function (e) {
        e.preventDefault();
        
        if ($("#customerInfoForm").validationEngine('validate')) {

            insertCustomerInfo();
        }
        return false;
    }

    /**
    * insert CustomerInfo
    * @returns {undefined}
    * @since 02/08/2018
    */

    window.insertCustomerInfo = function () {

        var loaderInsertBlock = $("#loading-image-cstInfo").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        var cst_name = $('#txt-cst-name').val();

        var ddData_country = $('#dropdownCountry').data('ddslick')
        var country_id = ddData_country.selectedData.value;

        var ddData_city = $('#dropdownCity').data('ddslick')
        var city_id = ddData_city.selectedData.value;

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysCustomerInfo',
                name: cst_name,
                country_id: country_id,
                city_id: city_id,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Ekleme İşlemi Başarısız...',
                    'Müşteri Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#customerInfoForm')[0].reset();

                        loaderInsertBlock.loadImager('removeLoadImage');

                        var loaderInsertBlock = $("#loading-image-cstInfoGrid").loadImager();
                        loaderInsertBlock.loadImager('appendImage');

                        $('#gridContainer_customer').refresh();   //test edilecek!

                        loaderInsertBlock.loadImager('removeLoadImage');

                        /*
                         * devex grid refresh yapılacak
                         * 
                         * 
                        $('#gridContainer_customer').datagrid({
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
                loaderInsertBlock.loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kayıt İşlemi Başarısız...',
                    'Müşteri kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerInfo" servis datası boştur!!');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kayıt İşlemi Başarısız...',
                    'Müşteri kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerInfo" servis datası boştur!!');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerInfoForm')[0].reset();
                        loaderInsertBlock.loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'ACL Yetki Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Müşteri  kaydı yapılmıştır, yeni bir Müşteri kaydı deneyiniz... ');
                loaderInsertBlock.loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }


    /**
    * reset button function for Customer Info insert form
    * @returns null
    * @since 14/07/2016
    */
    window.resetCustomerInfoForm = function () {

        var loaderInsertBlock = $("#loading-image-cstInfo").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        $('#customerInfoForm').validationEngine('hide');
        
        $('#dropdownCountry').ddslick('select', { index: String(0) });
        $('#dropdownCity').ddslick('select', { index: String(0) });
        $('#dropdownSector').ddslick('select', { index: String(0) });
        $('#dropdownSegment').ddslick('select', { index: String(0) });
        $('#dropdownReliabilityRate').ddslick('select', { index: String(0) });
        $('#dropdownCustomerGroup').ddslick('select', { index: String(0) });
        $('#dropdownTotalVehicles').ddslick('select', { index: String(0) });
        $('#dropdownTotalEmployees').ddslick('select', { index: String(0) });
        $('#dropdownAnnuelRevenue').ddslick('select', { index: String(0) });
        
        loaderInsertBlock.loadImager('removeLoadImage');
    
        //yeni kayda açık, tablar kapatılıyor
        window.tab_disable();

        return false;
    }


    window.fillCustomerInfoForm = function (data) {
        //örnektir...
        var loaderInsertBlock = $("#loading-image-cstInfo").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        document.getElementById("txt-cst-name").value = data.Employee;
        document.getElementById("txt-cst-email").value = data.Employee;
        document.getElementById("txt-cst-website").value = data.Employee;
        document.getElementById("txt-cst-phone").value = data.Employee;
        document.getElementById("txt-cst-vatnumber").value = data.Employee;
        document.getElementById("txt-cst-regnumber").value = data.Employee;

        document.getElementById("registration-datepicker").value = Date();
        
        $('#dropdownCountry').ddslick('select', { index: 3 });
        $('#dropdownCity').ddslick('select', { index: 2 });
        $('#dropdownSector').ddslick('select', { index: 3 });
        $('#dropdownSegment').ddslick('select', { index: 2 });
        $('#dropdownReliabilityRate').ddslick('select', { index: 3 });
        $('#dropdownCustomerGroup').ddslick('select', { index: 2 });
        $('#dropdownTotalVehicles').ddslick('select', { index: 3 });
        $('#dropdownTotalEmployees').ddslick('select', { index: 2 });
        $('#dropdownAnnuelRevenue').ddslick('select', { index: 2 });
        
        //document.getElementById("dropdownCity").SelectedIndex = 2; //data.cityId;
        //document.getElementById("dropdownSector").value = data.sectorId;
        //document.getElementById("dropdownSegment").value = data.segmentId;
        
        loaderInsertBlock.loadImager('removeLoadImage');
        window.tab_active();

        /*
        $("a[data-toggle='tab'").prop('disabled', false);
        $("a[data-toggle='tab'").each(function () {
            $(this).attr('href', $(this).prop('data-href')); // restore original href
        });
        $("a[data-toggle='tab'").removeClass('disabled-link');
        */
        //validated($('[data-toggle]').eq(1));
        //validated($('[data-toggle]').eq(2));
        //validated($('[data-toggle]').eq(3));
        //validated($('[data-toggle]').eq(4));

        //validated($('#tab_2').eq(1));
        //$('#tab_2').unbind('click').removeClass('text-muted').addClass('green');
        //$('#tab_3').unbind('click').removeClass('text-muted').addClass('green');

        return false;
    }



    window.insertCustomerPurchaseWrapper = function (e) {
        e.preventDefault();

        if ($("#customerPurchaseForm").validationEngine('validate')) {

            insertCustomerPurchase();
        }
        return false;
    }
    /**
 * insert CustomerPurchase
 * @returns {undefined}
 * @since 06/08/2018
 */

    window.insertCustomerPurchase = function () {

        var loaderInsertBlock = $("#loading-image-cstPurchase").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        //Customer_id alınacak
        var cst_id = 1;
        var cst_lastpurchase = $('#lastpurchase-datepicker').val();
        var cst_purchaselastupdate = $('#txt-cst-purchaselastupdate').val();

        var ddData_lastPurchaseBrand = $('#dropdownLastPurchaseBrand').data('ddslick')
        var lastPurchaseBrand_id = ddData_lastPurchaseBrand.selectedData.value;

        var ddData_purchaseDecision = $('#dropdownPurchaseDecision').data('ddslick')
        var purchaseDecision_id = ddData_purchaseDecision.selectedData.value;

        var ddData_dateofPurchasePlan = $('#dropdownDateofPurchasePlan').data('ddslick')
        var dateofPurchasePlan_id = ddData_dateofPurchasePlan.selectedData.value;

        var ddData_numberofVehiclestoP = $('#dropdownNumberofVehiclestoP').data('ddslick')
        var numberofVehiclestoP_id = ddData_numberofVehiclestoP.selectedData.value;


        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysCustomerPurchase',
                cst_id: cst_id,
                cst_lastpurchase: cst_lastpurchase,
                cst_purchaselastupdate: cst_purchaselastupdate,
                lastPurchaseBrand_id: lastPurchaseBrand_id,
                purchaseDecision_id: purchaseDecision_id,
                dateofPurchasePlan_id: dateofPurchasePlan_id,
                numberofVehiclestoP_id: numberofVehiclestoP_id,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Yatırım Planı Ekleme İşlemi Başarısız...',
                    'Müşteri Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#customerPurchaseForm')[0].reset();

                        loaderInsertBlock.loadImager('removeLoadImage');
                        
                    }
                });
                sm.successMessage('show', 'Müşteri Yatırım Planı Kayıt İşlemi Başarılı...',
                    'Müşteri kayıt işlemini gerçekleştirdiniz... ',
                    data);
                loaderInsertBlock.loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Yatırım Planı Kayıt İşlemi Başarısız...',
                    'Müşteri Yatırım Planı kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerPurchase" servis datası boştur!!');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Yatırım Planı Kayıt İşlemi Başarısız...',
                    'Müşteri Yatırım Planı kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerPurchase" servis datası boştur!!');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerPurchaseForm')[0].reset();
                        loaderInsertBlock.loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Müşteri  kaydı yapılmıştır, yeni bir Müşteri kaydı deneyiniz... ');
                loaderInsertBlock.loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }

    window.resetCustomerPurchaseForm = function () {

        var loaderInsertBlock = $("#loading-image-cstPurchase").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        $('#customerPurchaseForm').validationEngine('hide');

        $('#dropdownLastPurchaseBrand').ddslick('select', { index: String(0) });
        $('#dropdownPurchaseDecision').ddslick('select', { index: String(0) });
        $('#dropdownDateofPurchasePlan').ddslick('select', { index: String(0) });
        $('#dropdownNumberofVehiclestoP').ddslick('select', { index: String(0) });
  
        loaderInsertBlock.loadImager('removeLoadImage');

        return false;
    }

    window.fillCustomerPuchaseForm = function (data) {
        //örnektir...
        var loaderInsertBlock = $("#loading-image-cstPurchase").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        document.getElementById("lastpurchase-datepicker").value = Date();
        document.getElementById("txt-cst-purchaselastupdate").value = Date();

        $('#dropdownLastPurchaseBrand').ddslick('select', { index: 3 });
        $('#dropdownPurchaseDecision').ddslick('select', { index: 2 });
        $('#dropdownDateofPurchasePlan').ddslick('select', { index: 3 });
        $('#dropdownNumberofVehiclestoP').ddslick('select', { index: 2 });

        //document.getElementById("dropdownCity").SelectedIndex = 2; //data.cityId;
        //document.getElementById("dropdownSector").value = data.sectorId;
        //document.getElementById("dropdownSegment").value = data.segmentId;

        loaderInsertBlock.loadImager('removeLoadImage');
        return false;
    }


    /**
 * insert CustomerContactPerson
 * @returns {undefined}
 * @since 07/08/2018
 */

    window.insertCustomerPurchase = function () {

        var loaderInsertBlock = $("#loading-image-cstcp").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        //Customer_id alınacak
        var cst_id = 1;
        /*
        var cst_lastpurchase = $('#lastpurchase-datepicker').val();
        var cst_purchaselastupdate = $('#txt-cst-purchaselastupdate').val();

        var ddData_lastPurchaseBrand = $('#dropdownLastPurchaseBrand').data('ddslick')
        var lastPurchaseBrand_id = ddData_lastPurchaseBrand.selectedData.value;

        var ddData_purchaseDecision = $('#dropdownPurchaseDecision').data('ddslick')
        var purchaseDecision_id = ddData_purchaseDecision.selectedData.value;

        var ddData_dateofPurchasePlan = $('#dropdownDateofPurchasePlan').data('ddslick')
        var dateofPurchasePlan_id = ddData_dateofPurchasePlan.selectedData.value;

        var ddData_numberofVehiclestoP = $('#dropdownNumberofVehiclestoP').data('ddslick')
        var numberofVehiclestoP_id = ddData_numberofVehiclestoP.selectedData.value;
        */

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysCustomerPurchase',
                cst_id: cst_id,
                //cst_lastpurchase: cst_lastpurchase,
                //cst_purchaselastupdate: cst_purchaselastupdate,
                //lastPurchaseBrand_id: lastPurchaseBrand_id,
                //purchaseDecision_id: purchaseDecision_id,
                //dateofPurchasePlan_id: dateofPurchasePlan_id,
                //numberofVehiclestoP_id: numberofVehiclestoP_id,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Ekleme İşlemi Başarısız...',
                    'Müşteri Kontak Kişi Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();

                        loaderInsertBlock.loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarılı...',
                    'Müşteri Kontak Kişi kayıt işlemini gerçekleştirdiniz... ',
                    data);
                loaderInsertBlock.loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarısız...',
                    'Müşteri Kontak Kişi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarısız...',
                    'Müşteri Kontak Kişi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                loaderInsertBlock.loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        loaderInsertBlock.loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Müşteri Kontak Kişi kaydı yapılmıştır, yeni bir Müşteri Kontak Kişi kaydı deneyiniz... ');
                loaderInsertBlock.loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }

    //Contact Person
    window.resetContactPersonForm = function () {

        var loaderInsertBlock = $("#loading-image-cstcp").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        $('#customerContactPersonForm').validationEngine('hide');

        $('#dropdownLastPriority').ddslick('select', { index: String(0) });
       // $('#dropdownPurchaseDecision').ddslick('select', { index: String(0) });
       // $('#dropdownDateofPurchasePlan').ddslick('select', { index: String(0) });
       // $('#dropdownNumberofVehiclestoP').ddslick('select', { index: String(0) });

        loaderInsertBlock.loadImager('removeLoadImage');

        return false;
    }


/**
* insert CustomerContactPerson Wrapper
* @returns {Boolean}
* @since 02/08/2018
*/

    window.insertCustomerContactPersonWrapper = function (e) {
        e.preventDefault();

        if ($("#customerContactPersonForm").validationEngine('validate')) {

            insertCustomerContactPerson();
        }
        return false;
    }

    //Contact Person Form
    window.fillCustomerContactPersonForm = function (data) {
        
        var loaderInsertBlock = $("#loading-image-cstcp").loadImager();
        loaderInsertBlock.loadImager('appendImage');

        document.getElementById("txt-cp-firstname").value = data.Employee;
        document.getElementById("txt-cp-lastname").value = data.Employee;

        $('#dropdownPriority').ddslick('select', { index: 2 });

/*
        document.getElementById("txt-cp-email").value = data.Employee;
        document.getElementById("txt-cst-website").value = data.Employee;
        document.getElementById("txt-cst-phone").value = data.Employee;
        document.getElementById("txt-cst-vatnumber").value = data.Employee;
        document.getElementById("txt-cst-regnumber").value = data.Employee;

        document.getElementById("registration-datepicker").value = Date();

        $('#dropdownCountry').ddslick('select', { index: 3 });
        $('#dropdownCity').ddslick('select', { index: 2 });
        $('#dropdownSector').ddslick('select', { index: 3 });
        $('#dropdownSegment').ddslick('select', { index: 2 });
        $('#dropdownReliabilityRate').ddslick('select', { index: 3 });
        $('#dropdownCustomerGroup').ddslick('select', { index: 2 });
        $('#dropdownTotalVehicles').ddslick('select', { index: 3 });
        $('#dropdownTotalEmployees').ddslick('select', { index: 2 });
        $('#dropdownAnnuelRevenue').ddslick('select', { index: 2 });
*/
        loaderInsertBlock.loadImager('removeLoadImage');
        

        return false;
    }
});

