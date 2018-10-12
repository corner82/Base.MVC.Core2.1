$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });


    var selectedCustomerId;
    var filldropdown = false;

    var ddslick_countryId = 0;
    var ddslick_country_name = "";
    var ddslick_provinceId = 0;
    var ddslick_province_name = "";
    var ddslick_cityId = 0;
    var ddslick_city_name = "";

    /*
    * Customer Info Tab LoadImager
    * @author Gül Özdemir
    * @since 02/08/2016
    */
    //to customer info form
    $("#loading-image-cstInfo").loadImager();

    $("#loading-image-country").loadImager();
    $("#loading-image-province").loadImager();
    $("#loading-image-city").loadImager();
    $("#loading-image-reliabilityrate").loadImager();
    $("#loading-image-sector").loadImager();
    $("#loading-image-segment").loadImager();
    $("#loading-image-customergroup").loadImager();
    $("#loading-image-totalvehicles").loadImager();
    $("#loading-image-totalemployees").loadImager();
    $("#loading-image-annuelrevenue").loadImager();

    //to customer info grid loading-image
    $("#loading-image-cstInfoGrid").loadImager();
    /*
    * Customer Purchase Plan Tab LoadImager
    * @author Gül Özdemir
    * @since 02/08/2016
    */
    //to Customer Purchase Plan Form
    $("#loading-image-cstPurchase").loadImager();

    $("#loading-image-lastpurchasedbrand").loadImager();
    $("#loading-image-purchasedecision").loadImager();
    $("#loading-image-dateofpurchaseplan").loadImager();
    $("#loading-image-numberofvehiclestopurchase").loadImager();

    /*
    * Customer Contact Person Tab LoadImager
    * @author Gül Özdemir
    * @since 02/08/2016
    */
    //to contact person form
    $("#loading-image-cstcp").loadImager();

    $("#loading-image-priority").loadImager();
    $("#loading-image-title").loadImager();
    $("#loading-image-role").loadImager();
    $("#loading-image-productinterest").loadImager();
    $("#loading-image-compsatisfaction").loadImager();
    $("#loading-image-mansatisfaction").loadImager();
    $("#loading-image-brandloyalty").loadImager();
    $("#loading-image-brand").loadImager();

   
    var langCode = $("#langCode").val();
    //alert(langCode);

    /*
    * datepicker format
    * @author Gül Özdemir
    * @since 02/08/2016
    */
    $('#registration-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    $('#lastpurchase-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    $('#cp-birthdate-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });


    /*
    * datepicker format
    * @author Gül Özdemir
    * @since 06/08/2016
    */
    var tab_active = function () {
        //Update & View Mode
        //enabled tabs

        $("a[data-toggle='tab'").prop('disabled', false);
        $("a[data-toggle='tab'").each(function () {
            $(this).attr('href', $(this).prop('data-href')); // restore original href
        });
        $("a[data-toggle='tab'").removeClass('disabled-link');
    }

    var tab_disable = function () {
        //Add new record
        //tablar kapatılacak

        $("a[data-toggle='tab'").prop('disabled', true);
        $("a[data-toggle='tab'").each(function () {
            $(this).prop('data-href', $(this).attr('href')); // hold you original href
            $(this).attr('href', '#'); // clear href
        });
        $("a[data-toggle='tab'").addClass('disabled-link');

    }

    tab_disable();
    /*
    * Customer Info insert form validation engine attached to work
    * @since 02/08/2016
    */
    $('#customerInfoForm').validationEngine();
    $('#customerPurchaseForm').validationEngine();
    $('#customerContactPersonForm').validationEngine();

    /*
   * 
   * Country, Province, City ddSlick
   * Gül Özdemir
   * 09/10/2018
   */

    var ajaxACLResources_country = $('#ajaxACL-country').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-country",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Sys/SysCountrys',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCountryDdList_syscountrys",
            //pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_country.ajaxCallWidget({
        onReset: function (event, data) {
            //resetVehicleTypeAddDealForm();
        },
        onSuccess: function (event, datacountry) {
            var cbdata_country = $.parseJSON(datacountry);
            cbdata_country.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#dropdownCountry').ddslick({
                data: cbdata_country,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {

                    $('#dropdownProvince').ddslick('destroy');

                    if (selectedData.selectedData.value > 0) {

                        ddslick_countryId = selectedData.selectedData.value;

                        var ajaxACLResources_getprovince = $('#ajaxACL-province').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loading-image-province",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Sys/SysCountryRegions',
                            type: "POST",
                            data: JSON.stringify({
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                url: "pkCountryRegionsDdList_syscountryregions",
                                country_id: ddslick_countryId
                                //pkIdentity: $("#publicKey").val()
                            })
                        });

                        //province
                        ajaxACLResources_getprovince.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onSuccess: function (event, dataprovince) {

                                var cbdata_province = $.parseJSON(dataprovince);
                                cbdata_province.splice(0, 0,
                                    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                );

                                $('#dropdownProvince').ddslick({
                                    data: cbdata_province,
                                    width: '100%',
                                    search: true,
                                    searchText: window.lang.translate('Search'),
                                    onSelected: function (selectedData) {

                                        $('#dropdownCity').ddslick('destroy');

                                        if (selectedData.selectedData.value > 0) {
                                            ddslick_provinceId = selectedData.selectedData.value;

                                            //city
                                            var ajaxACLResources_getcity = $('#ajaxACL-city').ajaxCallWidget({
                                                failureLoadImage: true,
                                                loadingImageID: "loading-image-city",
                                                triggerSuccessAuto: true,
                                                transactionSuccessText: window.lang.translate('Transaction successful'),
                                                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                                                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                                                proxy: '/Sys/SysCity',
                                                type: "POST",
                                                data: JSON.stringify({
                                                    language_code: $("#langCode").val(),
                                                    pk: "GsZVzEYe50uGgNM",
                                                    url: "pkCityDdList_syscity",
                                                    country_id: ddslick_countryId,
                                                    region_id: ddslick_provinceId
                                                    //pkIdentity: $("#publicKey").val()
                                                })
                                            });

                                            ajaxACLResources_getcity.ajaxCallWidget({
                                                onReset: function (event, data) {

                                                },
                                                onSuccess: function (event, datacity) {

                                                    var cbdata_city = $.parseJSON(datacity);
                                                    cbdata_city.splice(0, 0,
                                                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                                    );

                                                    $('#dropdownCity').ddslick({
                                                        data: cbdata_city,
                                                        width: '100%',
                                                        search: true,
                                                        searchText: window.lang.translate('Search'),
                                                        //defaultSelectedIndex: ddslick_cityId, //$("#dropdownCity li:has(.dd-option-text:contains('" + ddslick_city_name + "'))").index()

                                                    })
                                                    if (filldropdown === true) {
                                                        $('#dropdownCity').ddslick('selectByValue',
                                                            {
                                                                index: '' + ddslick_cityId + '',
                                                                value: '' + ddslick_city_name + ''
                                                            });
                                                        filldropdown = false;
                                                    }
                                                    $('#loading-image-city').loadImager('removeLoadImage');
                                                },
                                                onAfterSuccess: function (event, data) {
                                                    $('#loading-image-city').loadImager('removeLoadImage');
                                                }
                                            })
                                            ajaxACLResources_getcity.ajaxCallWidget('call');
                                            //city bitti
                                        }
                                    }
                                })
                                if (filldropdown === true) {
                                    $('#dropdownProvince').ddslick('selectByValue',
                                        {
                                            index: '' + ddslick_provinceId + '',
                                            value: '' + ddslick_province_name + ''
                                        }
                                    );
                                }
                                $('#loading-image-province').loadImager('removeLoadImage');
                            },

                            onAfterSuccess: function (event, data) {
                                //alert('geldim AfterSuccess province');

                                $('#loading-image-province').loadImager('removeLoadImage');
                            }
                        })
                        ajaxACLResources_getprovince.ajaxCallWidget('call');
                        //province bitti


                    }
                }
            })
        },
        onAfterSuccess: function (event, data) {
            //alert('geldim AfterSuccess country');
            $('#loading-image-country').loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_country.ajaxCallWidget('call');


    var cbdata = [
        {
            text: 'Search...',
            value: 1,
            selected: true
        },
        {
            text: "Bellville",
            value: 2,
            selected: false
        },
        {
            text: "Cape Town",
            value: 3,
            selected: false
        },
        {
            text: "Constantia",
            value: 4,
            selected: false
        },
        {
            text: 'George',
            value: 5,
            selected: false
        },
        {
            text: "Hopefield",
            value: 6,
            selected: false
        },
        {
            text: "Oudtshoorn",
            value: 7,
            selected: false
        },
        {
            text: "Paarl",
            value: 8,
            selected: false
        },
        {
            text: 'Simon’s Town',
            value: 9,
            selected: false
        },
        {
            text: "Stellenbosch",
            value: 10,
            selected: false
        },
        {
            text: "Swellendam",
            value: 11,
            selected: false
        },
        {
            text: "Worcester",
            value: 12,
            selected: false
        },
        {
            text: "Vredenburg",
            value: 13,
            selected: false
        }
    ];

    $('#loading-image-reliabilityrate').loadImager('removeLoadImage');
    $("#loading-image-reliabilityrate").loadImager('appendImage');

    var ajaxACLResources_reliabilityRate = $('#ajaxACL-reliabilityrate').ajaxCallWidget({
        proxy: '/Customer/SysCustomerReliability/',
        type: 'POST',
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
            dm.dangerMessage('show', 'Servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, datareliability) {
            var cbdata_reliability = $.parseJSON(datareliability);
            cbdata_reliability.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#dropdownReliabilityRate').ddslick({
                //height: 150,
                data: cbdata_reliability,
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



    $('#loading-image-sector').loadImager('removeLoadImage');
    $("#loading-image-sector").loadImager('appendImage');

    var ajaxACLResources_sector = $('#ajaxACL-sector').ajaxCallWidget({
        proxy: '/Customer/SysCustomerSectorTypes/',
        type: 'POST',
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
        onSuccess: function (event, datasector) {
            var cbdata_sector = $.parseJSON(datasector);
            cbdata_sector.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownSector').ddslick({
                data: cbdata_sector,
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


    $('#loading-image-segment').loadImager('removeLoadImage');
    $("#loading-image-segment").loadImager('appendImage');

    var ajaxACLResources_segment = $('#ajaxACL-segment').ajaxCallWidget({
        proxy: '/Customer/SysCustomerSegmentTypes/',
        type: 'POST',
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
        onSuccess: function (event, datasegment) {
            var cbdata_segment = $.parseJSON(datasegment);
            cbdata_segment.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownSegment').ddslick({
                data: cbdata_segment,
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

    $('#loading-image-customergroup').loadImager('removeLoadImage');
    $("#loading-image-customergroup").loadImager('appendImage');

    var ajaxACLResources_customergroup = $('#ajaxACL-customergroup').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCountryDdList_syscountrys",
            pkIdentity: $("#publicKey").val()
        })
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

    $('#loading-image-totalvehicles').loadImager('removeLoadImage');
    $("#loading-image-totalvehicles").loadImager('appendImage');

    var ajaxACLResources_totalvehicles = $('#ajaxACL-totalvehicles').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',

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

    $('#loading-image-totalemployees').loadImager('removeLoadImage');
    $("#loading-image-totalemployees").loadImager('appendImage');

    var ajaxACLResources_totalemployees = $('#ajaxACL-totalemployees').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',
        //data: {
        //    url: '1'
        //    //pk: $("#pk").val()
        //}

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

    $('#loading-image-annuelrevenue').loadImager('removeLoadImage');
    $("#loading-image-annuelrevenue").loadImager('appendImage');

    var ajaxACLResources_annuelrevenue = $('#ajaxACL-annuelrevenue').ajaxCallWidget({
        proxy: '/Customer/SysCustomerAnnualRevenue/',
        type: 'POST',
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
        onSuccess: function (event, dataannuelrevenue) {
            var cbdata_annuelrevenue = $.parseJSON(dataannuelrevenue);
            cbdata_annuelrevenue.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownAnnuelRevenue').ddslick({
                data: cbdata_annuelrevenue,
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

    $('#loading-image-lastpurchasedbrand').loadImager('removeLoadImage');
    $("#loading-image-lastpurchasedbrand").loadImager('appendImage');

    var ajaxACLResources_lastpurchasedbrand = $('#ajaxACL-lastpurchasedbrand').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleBrand/',
        type: 'POST',
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
        onSuccess: function (event, datavehiclebrand) {
            var cbdata_vehiclebrand = $.parseJSON(datavehiclebrand);
            cbdata_vehiclebrand.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownLastPurchaseBrand').ddslick({
                data: cbdata_vehiclebrand,
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
            dm.dangerMessage('show', 'Brand Bulunamamıştır...', 'Brand  bulunamamıştır...');
        },
    })
    ajaxACLResources_lastpurchasedbrand.ajaxCallWidget('call');

    $('#loading-image-purchasedecision').loadImager('removeLoadImage');
    $("#loading-image-purchasedecision").loadImager('appendImage');

    var ajaxACLResources_purchasedecision = $('#ajaxACL-purchasedecision').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',

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

    $('#loading-image-dateofpurchaseplan').loadImager('removeLoadImage');
    $("#loading-image-dateofpurchaseplan").loadImager('appendImage');

    var ajaxACLResources_dateofpurchaseplan = $('#ajaxACL-dateofpurchaseplan').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',

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

    $('#loading-image-numberofvehiclestopurchase').loadImager('removeLoadImage');
    $("#loading-image-numberofvehiclestopurchase").loadImager('appendImage');

    var ajaxACLResources_numberofvehiclestopurchase = $('#ajaxACL-numberofvehiclestopurchase').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',

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

    var data_country = [{
        "value": 0,
        "text": "Select...",
        selected: true
    }, {
        "value": 1,
        "text": "South Africa",
        selected: false
    }, {
        "value": 2,
        "text": "Turkey",
        selected: false
    }, {
        "value": 3,
        "text": "Germany",
        selected: false
    }];

    var data_state = [{
        "value": 0,
        "text": "Select...",
        "countryID": 0,
        selected: true
    }, {
        "value": 1,
        "text": "1- State1",
        "countryID": 1,
        selected: false
    }, {
        "value": 2,
        "text": "1- State2",
        "countryID": 1,
        selected: false
    }, {
        "value": 3,
        "text": "2- State1",
        "countryID": 2,
        selected: false
    }, {
        "value": 4,
        "text": "2- State2",
        "countryID": 2,
        selected: false
    }];

    var data_city = [{
        "value": 0,
        "text": "Select...",
        "stateID": 0,
         selected: true
    }, {
        "value": 1,
        "text": "Pretoria",
        "stateID": 1,
        selected: false
    }, {
        "value": 2,
        "text": "Bloemfontein",
        "stateID": 1,
        selected: false
    }, {
        "value": 3,
        "text": "CapeTown",
        "stateID": 1,
        selected: false
    }, {
        "value": 4,
        "text": "Johannesburg",
        "stateID": 2,
        selected: false
    }];

//Contact Person 
    $('#loading-image-priority').loadImager('removeLoadImage');
    $("#loading-image-priority").loadImager('appendImage');

    var ajaxACLResources_priority = $('#ajaxACL-priority').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',
        //proxy: 'https://jsonplaceholder.typicode.com/todos/',
        //data: {
        //    url: '1'
        //    //pk: $("#pk").val()
        //}
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

    $('#loading-image-title').loadImager('removeLoadImage');
    $("#loading-image-title").loadImager('appendImage');

    var ajaxACLResources_title = $('#ajaxACL-title').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',

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

    $('#loading-image-role').loadImager('removeLoadImage');
    $("#loading-image-role").loadImager('appendImage');

    var ajaxACLResources_role = $('#ajaxACL-role').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',

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
    $('#loading-image-productinterest').loadImager('removeLoadImage');
    $("#loading-image-productinterest").loadImager('appendImage');

    var ajaxACLResources_productinterest = $('#ajaxACL-productinterest').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',
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

                height: 200,
                data: data_product,
                width:'100%',
                selectText: window.lang.translate('Please select') + "...",
                searchText: window.lang.translate('Search') + "...",
                //showSelectedHTML : false,
                defaultSelectedIndex: 3,
                search : true,
                multiSelect : true,
                tagBox : 'tag-container',
                //multiSelectTagID : 'deneme',
                //imagePosition:"right",
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }  
                
            });
            $('#loading-image-productinterest').loadImager('removeLoadImage');
        },
            onErrorDataNull : function (event, data) {
            dm.dangerMessage({
                onShown: function () {
                $('#loading-image-productinterest').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'Rol Bulunamamıştır...',
            'Rol  bulunamamıştır...');
        },
    }) 
    ajaxACLResources_productinterest.ajaxCallWidget('call');



    $('#loading-image-compsatisfaction').loadImager('removeLoadImage');
    $("#loading-image-compsatisfaction").loadImager('appendImage');

    var ajaxACLResources_compsatisfaction = $('#ajaxACL-compsatisfaction').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',

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

    $('#loading-image-mansatisfaction').loadImager('removeLoadImage');
    $("#loading-image-mansatisfaction").loadImager('appendImage');

    var ajaxACLResources_mansatisfaction = $('#ajaxACL-mansatisfaction').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',

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

    $('#loading-image-brandloyalty').loadImager('removeLoadImage');
    $("#loading-image-brandloyalty").loadImager('appendImage');

    var ajaxACLResources_brandloyalty = $('#ajaxACL-brandloyalty').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',
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

    $('#loading-image-brand').loadImager('removeLoadImage');
    $("#loading-image-brand").loadImager('appendImage');

    var ajaxACLResources_brand = $('#ajaxACL-brand').ajaxCallWidget({
        proxy: '/Vehicle/SysVehicleBrand/',
        type: 'POST',
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
        onSuccess: function (event, databrand) {
            var cbdata_brand = $.parseJSON(databrand);
            cbdata_brand.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#dropdownBrand').ddslick({
                //height: 150,
                data: cbdata_brand,
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

    DevExpress.localization.locale(langCode);


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
            fileName: window.lang.translate('Customer list')
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
            allowGrouping: false,
            dataField: "OrderNumber",
            caption: window.lang.translate('Country') + "...",
            width: 130
        }, {
            caption: window.lang.translate('State') + "...",
            dataField: "StoreState"
        }, {
            caption: window.lang.translate('City') + "...",
            dataField: "StoreCity"
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
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },

        "export": {
            enabled: true,
            fileName: window.lang.translate('CustomerAddress'),
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
            dataField: "CityID",
            caption: "City",
            width: 125,
            lookup: {
                    dataSource: data_city,
                    displayExpr: "text",
                    valueExpr: "value"
            }
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
            caption: window.lang.translate("Phone"),
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
            fileName: window.lang.translate('Activity'),
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



    /**
    * insert CustomerInfo Wrapper
    * @returns {Boolean}
    * @since 02/08/2018
    */

    window.insertCustomerInfoWrapper = function (e) {
        //e.preventDefault();
        
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

        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        $("#loading-image-cstInfo").loadImager('appendImage');

        var cst_name = $('#txt-cst-name').val();

        var ddData_country = $('#dropdownCountry').data('ddslick')
        var country_id = ddData_country.selectedData.value;

        var ddData_state = $('#dropdownState').data('ddslick')
        var state_id = ddData_state.selectedData.value;

        var ddData_city = $('#dropdownCity').data('ddslick')
        var city_id = ddData_city.selectedData.value;

        var aj = $(window).ajaxCall({
            proxy: '/Sys/SysCountrys/',
            type: 'POST',
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Ekleme İşlemi Başarısız...',
                    'Müşteri Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#customerInfoForm')[0].reset();

                        $("#loading-image-cstInfo").loadImager('removeLoadImage');

                        $("#loading-image-cstInfoGrid").loadImager('removeLoadImage');
                        $("#loading-image-cstInfoGrid").loadImager('appendImage');

                        $('#gridContainer_customer').refresh();   //test edilecek!

                        $("#loading-image-cstInfoGrid").loadImager('removeLoadImage');

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
                $("#loading-image-cstInfo").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kayıt İşlemi Başarısız...',
                    'Müşteri kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerInfo" servis datası boştur!!');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kayıt İşlemi Başarısız...',
                    'Müşteri kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerInfo" servis datası boştur!!');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerInfoForm')[0].reset();
                        $("#loading-image-cstInfo").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'ACL Yetki Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Müşteri  kaydı yapılmıştır, yeni bir Müşteri kaydı deneyiniz... ');
                $("#loading-image-cstInfo").loadImager('removeLoadImage');
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
        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        $("#loading-image-cstInfo").loadImager('appendImage');

        $('#customerInfoForm').validationEngine('hide');
        
        $('#dropdownCountry').ddslick('select', { index: String(0) });
        $('#dropdownState').ddslick('select', { index: String(0) });
        $('#dropdownCity').ddslick('select', { index: String(0) });
        $('#dropdownSector').ddslick('select', { index: String(0) });
        $('#dropdownSegment').ddslick('select', { index: String(0) });
        $('#dropdownReliabilityRate').ddslick('select', { index: String(0) });
        $('#dropdownCustomerGroup').ddslick('select', { index: String(0) });
        $('#dropdownTotalVehicles').ddslick('select', { index: String(0) });
        $('#dropdownTotalEmployees').ddslick('select', { index: String(0) });
        $('#dropdownAnnuelRevenue').ddslick('select', { index: String(0) });
        
        $("#loading-image-cstInfo").loadImager('removeLoadImage');
    
        //yeni kayda açık, tablar kapatılıyor
        tab_disable();

        return false;
    }


    window.fillCustomerInfoForm = function (data) {
        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        $("#loading-image-cstInfo").loadImager('appendImage');

        document.getElementById("txt-cst-name").value = data.Employee;
        document.getElementById("txt-cst-email").value = data.Employee;
        document.getElementById("txt-cst-website").value = data.Employee;
        document.getElementById("txt-cst-phone").value = data.Employee;
        document.getElementById("txt-cst-vatnumber").value = data.Employee;
        document.getElementById("txt-cst-regnumber").value = data.Employee;

        document.getElementById("registration-datepicker").value = Date();
        
        $('#dropdownCountry').ddslick('select', { index: 3 });
        $('#dropdownState').ddslick('select', { index: 2 });
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
        
        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        tab_active();

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

        $("#loading-image-cstPurchase").loadImager('removeLoadImage');
        $("#loading-image-cstPurchase").loadImager('appendImage');

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
                $("#loading-image-cstPurchase").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#customerPurchaseForm')[0].reset();

                        $("#loading-image-cstPurchase").loadImager('removeLoadImage');
                        
                    }
                });
                sm.successMessage('show', 'Müşteri Yatırım Planı Kayıt İşlemi Başarılı...',
                    'Müşteri kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-cstPurchase").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Yatırım Planı Kayıt İşlemi Başarısız...',
                    'Müşteri Yatırım Planı kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerPurchase" servis datası boştur!!');
                $("#loading-image-cstPurchase").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Yatırım Planı Kayıt İşlemi Başarısız...',
                    'Müşteri Yatırım Planı kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerPurchase" servis datası boştur!!');
                $("#loading-image-cstPurchase").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-cstPurchase").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerPurchaseForm')[0].reset();
                        $("#loading-image-cstPurchase").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Müşteri  kaydı yapılmıştır, yeni bir Müşteri kaydı deneyiniz... ');
                $("#loading-image-cstPurchase").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }

    window.resetCustomerPurchaseForm = function () {
        $("#loading-image-cstPurchase").loadImager('removeLoadImage');
        $("#loading-image-cstPurchase").loadImager('appendImage');

        $('#customerPurchaseForm').validationEngine('hide');

        $('#dropdownLastPurchaseBrand').ddslick('select', { index: String(0) });
        $('#dropdownPurchaseDecision').ddslick('select', { index: String(0) });
        $('#dropdownDateofPurchasePlan').ddslick('select', { index: String(0) });
        $('#dropdownNumberofVehiclestoP').ddslick('select', { index: String(0) });
  
        $("#loading-image-cstPurchase").loadImager('removeLoadImage');

        return false;
    }

    window.fillCustomerPuchaseForm = function (data) {
        $("#loading-image-cstPurchase").loadImager('removeLoadImage');
        $("#loading-image-cstPurchase").loadImager('appendImage');

        document.getElementById("lastpurchase-datepicker").value = Date();
        document.getElementById("txt-cst-purchaselastupdate").value = Date();

        $('#dropdownLastPurchaseBrand').ddslick('select', { index: 3 });
        $('#dropdownPurchaseDecision').ddslick('select', { index: 2 });
        $('#dropdownDateofPurchasePlan').ddslick('select', { index: 3 });
        $('#dropdownNumberofVehiclestoP').ddslick('select', { index: 2 });

        //document.getElementById("dropdownCity").SelectedIndex = 2; //data.cityId;
        //document.getElementById("dropdownSector").value = data.sectorId;
        //document.getElementById("dropdownSegment").value = data.segmentId;

        $("#loading-image-cstPurchase").loadImager('removeLoadImage');
        return false;
    }


/**
 * insert CustomerContactPerson
 * @returns {undefined}
 * @since 07/08/2018
 */

    window.insertCustomerContactPerson = function () {
        $("#loading-image-cstcp").loadImager('removeLoadImage');
        $("#loading-image-cstcp").loadImager('appendImage');

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
                $("#loading-image-cstcp").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();

                        $("#loading-image-cstcp").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarılı...',
                    'Müşteri Kontak Kişi kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-cstcp").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarısız...',
                    'Müşteri Kontak Kişi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-cstcp").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Müşteri Kontak Kişi Kayıt İşlemi Başarısız...',
                    'Müşteri Kontak Kişi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysCustomerContactPerson" servis datası boştur!!');
                $("#loading-image-cstcp").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-cstcp").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#customerContactPersonForm')[0].reset();
                        $("#loading-image-cstcp").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Müşteri Kontak Kişi kaydı yapılmıştır, yeni bir Müşteri Kontak Kişi kaydı deneyiniz... ');
                $("#loading-image-cstcp").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }

    //Contact Person
    window.resetContactPersonForm = function () {
        $("#loading-image-cstcp").loadImager('removeLoadImage');
        $("#loading-image-cstcp").loadImager('appendImage');

        $('#customerContactPersonForm').validationEngine('hide');

        $('#dropdownLastPriority').ddslick('select', { index: String(0) });
       // $('#dropdownPurchaseDecision').ddslick('select', { index: String(0) });
       // $('#dropdownDateofPurchasePlan').ddslick('select', { index: String(0) });
       // $('#dropdownNumberofVehiclestoP').ddslick('select', { index: String(0) });

        $("#loading-image-cstcp").loadImager('removeLoadImage');

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
        
        $("#loading-image-cstcp").loadImager('removeLoadImage');
        $("#loading-image-cstcp").loadImager('appendImage');

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
        $('#dropdownState').ddslick('select', { index: 2 });
        $('#dropdownCity').ddslick('select', { index: 2 });
        $('#dropdownSector').ddslick('select', { index: 3 });
        $('#dropdownSegment').ddslick('select', { index: 2 });
        $('#dropdownReliabilityRate').ddslick('select', { index: 3 });
        $('#dropdownCustomerGroup').ddslick('select', { index: 2 });
        $('#dropdownTotalVehicles').ddslick('select', { index: 3 });
        $('#dropdownTotalEmployees').ddslick('select', { index: 2 });
        $('#dropdownAnnuelRevenue').ddslick('select', { index: 2 });
*/
        $("#loading-image-cstcp").loadImager('removeLoadImage');
        

        return false;
    }
});

