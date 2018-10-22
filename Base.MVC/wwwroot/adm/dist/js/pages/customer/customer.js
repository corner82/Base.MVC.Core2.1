$(document).ready(function () {

    "use strict";

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });


    var selectedCustomerId = 0;
    var selectedPurchasePlanId = 0;
    var selectedCustomerActivityId = 0;
    var selectedContactPersonId = 0;
    var selectedContactPersonProductId = 0;
    var SelectedProductInterestId = 0;

    var filldropdown = false;

    var ddslick_countryId = 1;
    var ddslick_country_name = "South Africa";
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
    $("#loading-image-credibility").loadImager();
    $("#loading-image-customercategory").loadImager();
    $("#loading-image-applicationtype").loadImager();
    $("#loading-image-turnoverrate").loadImager();


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
    $("#loading-image-cstcppi").loadImager();
    $("#loading-image-priority").loadImager();
    $("#loading-image-title").loadImager();
    $("#loading-image-role").loadImager();
    $("#loading-image-sourceoflead").loadImager();
    $("#loading-image-productinterest").loadImager();
    $("#loading-image-compsatisfaction").loadImager();
    $("#loading-image-mansatisfaction").loadImager();
    $("#loading-image-brandloyalty").loadImager();
    $("#loading-image-lastbrand").loadImager(); 

   
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

    $('#lastcontactdate-datepicker').datepicker({
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



    //var tabOrganizer = $("#customer_tab").organizeTabs({ tabID: "customer_tab" });
    //$("#customer_tab").organizeTabs('disableAllTabs');

    /*
    * Customer Info insert form validation engine attached to work
    * @since 02/08/2016
    */
/*
    jQuery.validator.addMethod(
        "regNumber",
        function (value, element) {
            return value.match(/^(d\d\d\d)[\/](d\d\d\d\d\d)[\/](d\d)$/);
        },
        "Please enter a date in the format mm/dd/yyyy  NNNN/NNNNNN/NN"
    );

    ///////

    $("#customerInfoForm").validate({
        rules: {
            dob: {
                required: true,
                date: true,
                regnumber: true
            },
        }
    });
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

    $('#loading-image-country').loadImager('removeLoadImage');
    $('#loading-image-country').loadImager('appendImage');

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
        }),
        timeout: 30000
    });
    ajaxACLResources_country.ajaxCallWidget({
        onReset: function (event, data) {

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


                        $('#loading-image-province').loadImager('removeLoadImage');
                        $('#loading-image-province').loadImager('appendImage');

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
                            }),
                            timeout: 30000
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

                                            $('#loading-image-city').loadImager('removeLoadImage');
                                            $('#loading-image-city').loadImager('appendImage');

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
                                                }),
                                                timeout: 30000
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
                                                                index: ddslick_cityId,
                                                                value: ddslick_city_name
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
                                            index: ddslick_provinceId,
                                            value: ddslick_province_name
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



///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Segment
    $('#loading-image-segment').loadImager('removeLoadImage');
    $('#loading-image-segment').loadImager('appendImage');

    var ajaxACLResources_segment = $('#ajaxACL-segment').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-segment",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysCustomerSegmentTypes',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerSegmentTypesDdList_syscustomersegmenttypes",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });
    ajaxACLResources_segment.ajaxCallWidget({
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
                        //alert(selectedData.selectedData.text);

                    }

                }
            });

            $("#loading-image-segment").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-segment").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_segment.ajaxCallWidget('call');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Sector

    $('#loading-image-sector').loadImager('removeLoadImage');
    $('#loading-image-sector').loadImager('appendImage');

    var ajaxACLResources_sector = $('#ajaxACL-sector').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-sector",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysCustomerSectorTypes',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerSectorTypesDdList_syscustomersectortypes",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });
    ajaxACLResources_sector.ajaxCallWidget({
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
                        //alert(selectedData.selectedData.text);

                    }

                }
            });

            $("#loading-image-sector").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-sector").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_sector.ajaxCallWidget('call');


////////////////////////////////////////////////////////////////////////////////////////////////////////
//credibility
    $('#loading-image-credibility').loadImager('removeLoadImage');
    $('#loading-image-credibility').loadImager('appendImage');

    var ajaxACLResources_credibility = $('#ajaxACL-credibility').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-credibility",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysCustomerCredibility',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerReliabilityDdList_syscustomerreliability",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });
    ajaxACLResources_credibility.ajaxCallWidget({
        onSuccess: function (event, datacredibility) {
            var cbdata_credibility = $.parseJSON(datacredibility);
            cbdata_credibility.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownCredibility').ddslick({
                data: cbdata_credibility,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });
            
            $("#loading-image-credibility").loadImager('removeLoadImage');

            //contact Person Form
            $("#loading-image-compsatisfaction").loadImager('removeLoadImage');
            $("#loading-image-compsatisfaction").loadImager('appendImage');
            
            $('#dropdownCompSatisfaction').ddslick({
                data: cbdata_credibility,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });
            $("#loading-image-compsatisfaction").loadImager('removeLoadImage');


            $("#loading-image-mansatisfaction").loadImager('removeLoadImage');
            $("#loading-image-mansatisfaction").loadImager('appendImage');
            $('#dropdownMANSatisfaction').ddslick({
                data: cbdata_credibility,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });
            $("#loading-image-mansatisfaction").loadImager('removeLoadImage');


            $("#loading-image-brandloyalty").loadImager('removeLoadImage');
            $("#loading-image-brandloyalty").loadImager('appendImage');
            $('#dropdownBrandLoyalty').ddslick({
                data: cbdata_credibility,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });
            $("#loading-image-brandloyalty").loadImager('removeLoadImage');


            $("#loading-image-priority").loadImager('removeLoadImage');
            $("#loading-image-priority").loadImager('appendImage');
            $('#dropdownPriority').ddslick({
                data: cbdata_credibility,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });
            $("#loading-image-priority").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-credibility").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_credibility.ajaxCallWidget('call');

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//customercategory

    $("#loading-image-customercategory").loadImager('removeLoadImage');
    $("#loading-image-customercategory").loadImager('appendImage');

    var ajaxACLResources_customercategory = $('#ajaxACL-customercategory').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-customercategory",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysCustomerCategories',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerCategoriesDdList_syscustomercategories",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_customercategory.ajaxCallWidget({
        onSuccess: function (event, datacustomercategory) {
            var cbdata_customercategory = $.parseJSON(datacustomercategory);
            cbdata_customercategory.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownCustomerCategory').ddslick({
                data: cbdata_customercategory,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }
                }
            });

            $("#loading-image-customercategory").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-customercategory").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_customercategory.ajaxCallWidget('call');


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//customer Application Type
    $("#loading-image-applicationtype").loadImager('removeLoadImage');
    $("#loading-image-applicationtype").loadImager('appendImage');

    var ajaxACLResources_applicationtype = $('#ajaxACL-applicationtype').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-applicationtype",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysCustomerApplicationType',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerApplicationMainTypesDdList_syscustomerapplicationtypes",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });
    ajaxACLResources_applicationtype.ajaxCallWidget({
        onSuccess: function (event, dataapplicationtype) {
            var cbdata_applicationtype = $.parseJSON(dataapplicationtype);
            cbdata_applicationtype.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownApplicationType').ddslick({
                data: cbdata_applicationtype,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });

            $("#loading-image-applicationtype").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-applicationtype").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_applicationtype.ajaxCallWidget('call');


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//totalvehicles
    $("#loading-image-totalvehicles").loadImager('removeLoadImage');
    $("#loading-image-totalvehicles").loadImager('appendImage');

    var ajaxACLResources_totalvehicles = $('#ajaxACL-totalvehicles').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-totalvehicles",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysCustomerTotalVehicles',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkNumericalRangesVeichlesDdList_sysnumericalranges",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });
    ajaxACLResources_totalvehicles.ajaxCallWidget({
        onSuccess: function (event, datatotalvehicles) {
            var cbdata_customertotalvehicles = $.parseJSON(datatotalvehicles);
            cbdata_customertotalvehicles.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownTotalVehicles').ddslick({
                data: cbdata_customertotalvehicles,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });

            $("#loading-image-totalvehicles").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-totalvehicles").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_totalvehicles.ajaxCallWidget('call');


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //totalvehicles
    $("#loading-image-totalemployes").loadImager('removeLoadImage');
    $("#loading-image-totalemployes").loadImager('appendImage');

    var ajaxACLResources_totalemployees = $('#ajaxACL-totalemployees').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-totalemployes",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysCustomerTotalEmployes',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkNumericalRangesEmployeesDdList_sysnumericalranges",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_totalemployees.ajaxCallWidget({
        onSuccess: function (event, datatotalemployes) {
            var cbdata_customertotalemployes = $.parseJSON(datatotalemployes);
            cbdata_customertotalemployes.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownTotalEmployees').ddslick({
                data: cbdata_customertotalemployes,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });

            $("#loading-image-totalemployes").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-totalemployes").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_totalemployees.ajaxCallWidget('call');

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //annuelrevenue

    $("#loading-image-annuelrevenue").loadImager('removeLoadImage');
    $("#loading-image-annuelrevenue").loadImager('appendImage');

    var ajaxACLResources_annuelrevenue = $('#ajaxACL-annuelrevenue').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-annuelrevenue",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysCustomerAnnualRevenue',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerTurnoverRatesDdList_syscustomerturnoverrates",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });
    ajaxACLResources_annuelrevenue.ajaxCallWidget({
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
                        //alert(selectedData.selectedData.text);

                    }

                }
            });

            $("#loading-image-annuelrevenue").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-annuelrevenue").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_annuelrevenue.ajaxCallWidget('call');




    /* Purchase Plans loading services */

    //Vehicle brand
    $("#loading-image-lastpurchasedbrand").loadImager('removeLoadImage');
    $("#loading-image-lastpurchasedbrand").loadImager('appendImage');

    var ajaxACLResources_vehiclebrand = $('#ajaxACL-lastpurchasedbrand').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-lastpurchasedbrand",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleBrand/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleBrandDdList_sysvehiclebrand",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });
    ajaxACLResources_vehiclebrand.ajaxCallWidget({
        onSuccess: function (event, databrand) {
            var cbdata_brand = $.parseJSON(databrand);
            cbdata_brand.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownLastPurchaseBrand').ddslick({
                data: cbdata_brand,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-lastpurchasedbrand").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-lastpurchasedbrand").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_vehiclebrand.ajaxCallWidget('call');

//Date of purchase plan - SysRangesQuarters

    $("#loading-image-dateofpurchaseplan").loadImager('removeLoadImage');
    $("#loading-image-dateofpurchaseplan").loadImager('appendImage');

    var ajaxACLResources_dateofpurchaseplan = $('#ajaxACL-dateofpurchaseplan').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-dateofpurchaseplan",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Sys/SysRangesQuarters/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkNumericalRangesQuartersDdList_sysnumericalranges",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });
    ajaxACLResources_dateofpurchaseplan.ajaxCallWidget({
        onSuccess: function (event, datarangesquarters) {
            var cbdata_rangesquarters = $.parseJSON(datarangesquarters);
            cbdata_rangesquarters.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownDateofPurchasePlan').ddslick({
                data: cbdata_rangesquarters,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-dateofpurchaseplan").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-dateofpurchaseplan").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_dateofpurchaseplan.ajaxCallWidget('call');


    // Maybe/Yes/No - SysMaybeYesNo
    $("#loading-image-purchasedecision").loadImager('removeLoadImage');
    $("#loading-image-purchasedecision").loadImager('appendImage');

    var ajaxACLResources_purchasedecision = $('#ajaxACL-purchasedecision').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-purchasedecision",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Sys/SysMaybeYesNo/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "fillMaybeYesNoTypes_sysSpecificDefinitions",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });
    ajaxACLResources_purchasedecision.ajaxCallWidget({
        onSuccess: function (event, datadecision) {
            var cbdata_decision = $.parseJSON(datadecision);
            cbdata_decision.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownPurchaseDecision').ddslick({
                data: cbdata_decision,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-purchasedecision").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-purchasedecision").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_purchasedecision.ajaxCallWidget('call');

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //totalvehicles
    //purchaseplan 
    $("#loading-image-totalvehicles").loadImager('removeLoadImage');
    $("#loading-image-totalvehicles").loadImager('appendImage');

    var ajaxACLResources_numberofvehiclestopurchase = $('#ajaxACL-numberofvehiclestopurchase').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-totalvehicles",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysCustomerTotalVehicles',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkNumericalRangesVeichlesDdList_sysnumericalranges",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });
    ajaxACLResources_numberofvehiclestopurchase.ajaxCallWidget({
        onSuccess: function (event, dataptotalvehicles) {
            var cbdata_ptotalvehicles = $.parseJSON(dataptotalvehicles);
            cbdata_ptotalvehicles.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownNumberofVehiclestoP').ddslick({
                data: cbdata_ptotalvehicles,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });

            $('#dropdownNumberofVehiclestoP').ddslick({
                data: cbdata_ptotalvehicles,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });

            $("#loading-image-numberofvehiclestopurchase").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-numberofvehiclestopurchase").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_numberofvehiclestopurchase.ajaxCallWidget('call');

//Contact Person Loading Services

 /**
* Contact Source of lead
* @returns {undefined}
* @author Gül Özdemir
* @since 14/10/2018
*/
    $("#loading-image-sourceoflead").loadImager('removeLoadImage');
    $("#loading-image-sourceoflead").loadImager('appendImage');

    var ajaxACLResources_sourceoflead = $('#ajaxACL-sourceoflead').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-sourceoflead",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysSourceofLead/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkSourceOfLeadDdList_syssourceoflead",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });
    ajaxACLResources_sourceoflead.ajaxCallWidget({
        onSuccess: function (event, datasourceoflead) {
            var cbdata_sourceoflead = $.parseJSON(datasourceoflead);
            cbdata_sourceoflead.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownSourceoflead').ddslick({
                data: cbdata_sourceoflead,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-sourceoflead").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-sourceoflead").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_sourceoflead.ajaxCallWidget('call');


 /**
 * Contact Person Title
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */
    var cbdata_title = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 0,
            selected: true
        },
        {
            text: "Mrs.",
            value: 1,
            selected: false
        },
        {
            text: "Mr.",
            value: 2,
            selected: false
        }
    ];

    $('#loading-image-title').loadImager('removeLoadImage');
    $("#loading-image-title").loadImager('appendImage');

    $('#dropdownTitle').ddslick({
        //height: 150,
        data: cbdata_title,
        width: '100%',

        onSelected: function (selectedData) {
            if (selectedData.selectedData.value > 1) {
            }
        }
    });
    $('#loading-image-title').loadImager('removeLoadImage');

 /**
 * Contact Person Role
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */
    $('#loading-image-role').loadImager('removeLoadImage');
    $("#loading-image-role").loadImager('appendImage');

    var ajaxACLResources_role = $('#ajaxACL-role').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-role",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysContactPersonRole/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkTitlesCustomerDdList_systitles",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });
    ajaxACLResources_role.ajaxCallWidget({
        onSuccess: function (event, datarole) {
            var cbdata_role = $.parseJSON(datarole);
            cbdata_role.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownRole').ddslick({
                data: cbdata_role,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-role").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-role").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_role.ajaxCallWidget('call');

 /**
 * Contact Person last brand
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */
    $('#loading-image-lastbrand').loadImager('removeLoadImage');
    $("#loading-image-lastbrand").loadImager('appendImage');

    var ajaxACLResources_lastbrand = $('#ajaxACL-lastbrand').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-lastbrand",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehicleBrand/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleBrandDdList_sysvehiclebrand",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });
    ajaxACLResources_lastbrand.ajaxCallWidget({
        onSuccess: function (event, datalastbrand) {
            var cbdata_lastbrand = $.parseJSON(datalastbrand);
            cbdata_lastbrand.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownLastBrand').ddslick({
                data: cbdata_lastbrand,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-lastbrand").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-lastbrand").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_lastbrand.ajaxCallWidget('call');


 /**
 * Contact Person product interest
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 18/10/2018
 */
    $('#loading-image-productinterest').loadImager('removeLoadImage');
    $("#loading-image-productinterest").loadImager('appendImage');

    var ajaxACLResources_productinterest = $('#ajaxACL-productinterest').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-productinterest",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Vehicle/SysVehiclesEndgroupsCost/',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehiclesEndgroupsCostDdList_sysvehiclesendgroups",
            pkIdentity: $("#publicKey").val()
        }),
        timeout: 30000
    });
    ajaxACLResources_productinterest.ajaxCallWidget({
        onSuccess: function (event, dataproductinterest) {
            console.log(dataproductinterest);
            var cbdata_productinterest = $.parseJSON(dataproductinterest);
            cbdata_productinterest.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownProductInterest').ddslick({
                data: cbdata_productinterest,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                        SelectedProductInterestId = selectedData.selectedData.value;
                    }
                }
            });

            $("#loading-image-productinterest").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-productinterest").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_productinterest.ajaxCallWidget('call');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* devexgrid */

    $('#customerList').click(function () {

        var customer_data = new DevExpress.data.CustomStore({
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
                    url: '/Customer/CustomerGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillCustomerGridx_infocustomer",
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
                    url: '/Customer/DeleteCustomer',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedCustomerId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_infocustomer"
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
            $("#gridContainer_customer").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: customer_data,

                columnHidingEnabled: true,

                selection: {
                    mode: "single"
                },

                hoverStateEnabled: true,

                editing: {
                    //mode: "batch"
                    mode: "popup",
                    //allowAdding: true,
                    //allowUpdating: true,
                    allowDeleting: true,
                    useIcons: true
                },

                "export": {
                    enabled: true,
                    fileName: window.lang.translate('CustomerList')
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

                // {"id":"2","apid":2,
                //"cust_sis_key": "1716068406394007398",
                //"registration_name": "TIREPOINT (PTY) LTD", 
                //"trading_name": "",
                //"name_short":"TIREPOINT ",
                //"embrace_customer_no": "31000663",
                //"tu_emb_customer_no": "", 
                //"ce_emb_customer_no": "",
                //"other_emb_customer_no":"",
                //"www": "",
                //"email":"",
                //"vatnumber": "", 
                //"registration_number": "", 
                //"registration_date": null, 
                //"ne_count_type_id": 16,
                //"numberofemployees":"51-100",
                //"nv_count_type_id": 23, 
                //"numberofvehicles": "21-50",
                //"customer_category_id":2,
                //"customer_category_name":"DTRK",
                //"reliability_id": 2, 
                //"reliability_name": "Low", 
                //"turnover_rate_id": 1,
                //"turnover_rate_name":"1 - 100.000",
                //"sector_type_id": 1, 
                //"sector_type_name": "General", 
                //"application_type_id": 2,
                //"application_type_name":"General Distribution",
                //"segment_type_id": 1, 
                //"segment_type_name": "Long Haul",
                //"is_bo_confirm":0,
                //"firm_country_id": 107,
                //"firm_country_name": "G\u00fcney Afrika", 
                //"address1": "", 
                //"address2": "", 
                //"address3": "",
                //"postalcode":"",
                //"country_id": 107,
                //"country_name": "G\u00fcney Afrika", 
                //"city_id": 0, 
                //"city_name": "", 
                //"region_id": null, 
                //"region": "",
                // "op_username":"admin@gmail.com",
 
                columns: [
                    {
                        caption: window.lang.translate('Active/Passive'),
                        width: 40,
                        alignment: 'center',

                        cellTemplate: function (container, options) {
                            var fieldHtml;
                            var customer_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveCustomer(customer_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveCustomer(customer_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                    }, {
                        caption: window.lang.translate('Customer name'),
                        dataField: "registration_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Cust. short name'),
                        dataField: "name_short",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Cust. trading name'),
                        dataField: "trading_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Embrace customer no'),
                        dataField: "embrace_customer_no",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Country'),
                        dataField: "country_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Province'),
                        dataField: "region",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('City'),
                        dataField: "city_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Address 1'),
                        dataField: "address1",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Address 2'),
                        dataField: "address2",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Address 3'),
                        dataField: "address3",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Postal code'),
                        dataField: "postalcode",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('E-mail'),
                        dataField: "email",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Web site'),
                        dataField: "www",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('VAT number'),
                        dataField: "vatnumber",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Registration number'),
                        dataField: "registration_number",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Registration date'),
                        dataField: "registration_date",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Segment'),
                        dataField: "segment_type_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Sector'),
                        dataField: "sector_type_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Total number of vehicles'),
                        dataField: "numberofvehicles",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Total number of employees'),
                        dataField: "numberofemployees",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Customer category'),
                        dataField: "customer_category_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Customer credibility'),
                        dataField: "reliability_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Application type'),
                        dataField: "application_type_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Turnover rate'),
                        dataField: "turnover_rate_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Order management embrace no'),
                        dataField: "embrace_customer_no",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('TopUsed embrace no'),
                        dataField: "tu_emb_customer_no",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Centurion embrace no'),
                        dataField: "ce_emb_customer_no",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Other embrace no'),
                        dataField: "other_emb_customer_no",
                    },
                    //{
                    //    caption: "Active/Passive",
                    //    //dataField: "active",
                    //    //dataType: "boolean"
                    //}
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
                        selectedCustomerId = data.id;
                        filldropdown = true;
                        fillCustomerInfoForm(data);
                        //filldropdown = false;
                    }
                },

                onRowRemoving: function (e) {
                    selectedCustomerId = e.key.id;
                    //alert(selectedBranchId);
                },

                onRowRemoved: function (e) {
                    $("#gridContainer_customer").dxDataGrid("instance").refresh();
                },

            });
        });
    })

    $('#customerList').click();


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /* devexgrid */
 /**
 * Contact person list
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */

    $('#contactpersonList').click(function () {

       // alert(selectedCustomerId);

        var contactperson_data = new DevExpress.data.CustomStore({
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
                    url: '/Customer/ContactPersonGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkCustomerContactPersonGridx_infocustomercontactpersons",
                        pkIdentity: $("#publicKey").val(),
                        page: "",
                        rows: "",
                        sort: "",
                        order: "", //args.orderby,
                        skip: args.skip,
                        take: args.take,
                        customer_id: selectedCustomerId
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

                //alert(selectedContactPersonId);

                return $.ajax({
                    url: '/Customer/DeleteContactPerson',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedContactPersonId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_infocustomercontactpersons"
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
            $("#gridContainer_contactperson").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: contactperson_data,

                columnHidingEnabled: true,

                selection: {
                    mode: "single"
                },

                hoverStateEnabled: true,

                editing: {
                    //mode: "batch"
                    mode: "popup",
                    //allowAdding: true,
                    //allowUpdating: true,
                    allowDeleting: true,
                    useIcons: true
                },

                "export": {
                    enabled: true,
                    fileName: window.lang.translate('ContactPersonList')
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
                            var contactperson_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveContactPerson(contactperson_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveContactPerson(contactperson_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                    }, {
                        caption: window.lang.translate('First name'),
                        dataField: "name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Last name'),
                        dataField: "surname",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Mobile phone'),
                        dataField: "mobile",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Phone'),
                        dataField: "phone",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Fax'),
                        dataField: "fax",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('E-mail'),
                        dataField: "email",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Source of lead'),
                        dataField: "source_of_lead_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Last contact date'),
                        dataField: "con_end_date",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Role'),
                        dataField: "role_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Priority'),
                        dataField: "priority_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Brand loyalty'),
                        dataField: "brand_loyalty_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Last brand'),
                        dataField: "last_brand_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Competitor satisfaction'),
                        dataField: "competitor_satisfaction_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Man satisfaction'),
                        dataField: "man_satisfaction_name",
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
                        selectedContactPersonId = data.id;
                        
                        fillContactPersonForm(data);
                        $('#contactperson_productinterestList').click();

                        //filldropdown = false;
                    }
                },

                onRowRemoving: function (e) {
                    selectedContactPersonId = e.key.id;
                    //alert(selectedBranchId);
                },

                onRowRemoved: function (e) {
                    $("#gridContainer_contactperson").dxDataGrid("instance").refresh();
                },

            });
        });
    })

    $('#contactpersonList').click();

//Seçili Müşteriye ait Aktiviteler Listelenir
/**
*.customer activity List Refresh
* @returns 
* @author Gül Özdemir
* @since 03/09/2018
*/

    $('#customerActivityList').click(function () {

        /* devexgrid */
        var activity_data = new DevExpress.data.CustomStore({
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
                    url: '/Customer/CustomerActivityGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillCustomeractivationsGridx_infocustomeractivations",
                        pkIdentity: $("#publicKey").val(),
                        page: "",
                        rows: "",
                        sort: "",
                        order: "", //args.orderby,
                        skip: args.skip,
                        take: args.take,
                        customer_id: selectedCustomerId
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
                /*
                var deferred = $.Deferred();

                return $.ajax({
                    url: '/Customer/DeleteCustomerActivity',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedBranchId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_infocustomeractivations"  //Değiş
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
                */
            }
        });

        DevExpress.localization.locale(langCode);

        $(function () {
            $("#gridContainer_activity").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: activity_data,

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
                    fileName: window.lang.translate('CustomerActivityList')
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

                //{"id":"14","apid":14,
                //"name": "asd,",
                //"branch_no": "e345fert", 
                //"address1": "213123 street", "address2": "no 11", "address3": "etlik", "postalcode": "06010", 
                //"country_name": "South Africa", "region_name": "Eastern Cape", "city_name": "Graaff-Reinet", 
                //"departman_name": "Middelburg", "country_id": 107, "country_region_id": 9, "city_id": 158, "sis_department_id": 45, "op_username": "mustafa.zeynel.admin@ostim.com.tr", 
                //"state_active": "Active", "date_saved": "2018-10-04 16:41:42", "date_modified": null, "language_code": "en", 
                //"active": 0, "op_user_id": 16, "language_id": "385", "language_name": "English"

                columns: [
                    /*{
                        
                        caption: window.lang.translate('Active/Passive'),
                        width: 40,
                        alignment: 'center',

                        cellTemplate: function (container, options) {
                            var fieldHtml;
                            var activity_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveActivity(activity_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveActivity(activity_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                    }, */

                    //    "registration_name": "COMMERCIAL MOTORS (PTY) LTD", 
                    //"trading_name": "", "embrace_customer_no": "", "tu_emb_customer_no": "", "ce_emb_customer_no": "", "other_emb_customer_no": "", 
                    //"www": "", "vatnumber": "", "registration_number": "", "registration_date": null, "customer_segment_type_id": 1, 
                    //"segment_type_name": "Long Haul", "cs_activation_type_id": 1, 
                    //"activation_type_name": "Fair Visit", "act_date": null, "cs_statu_types_id": 1, 
                    //"statu_types_name": "Passive - Not a Buyer", "cs_act_statutype_id": 1, 
                    //"cs_act_statutype_name": "Planned", "project_id": 0, "vehicle_model_id": 1, 
                    //"vehicle_model_name": "CLA", "description": "1", "manager_description": "", 
                    //"name": "Jimmy", "surname": "Page",
                    //"email": "jimmypage@gmail.com", "cep": "05325698569", "tel": "", "fax": "", "op_username": "admin@gmail.com", "state_active": "Active", "date_saved": "2018-10-11 15:16:36", "date_modified": null, "language_code": "en", "active": 0, "op_user_id": 0, "language_id": "385", "language_name": "English"

                    {
                        caption: window.lang.translate('Contact person name'),
                        dataField: "name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Contact person surname'),
                        dataField: "surname",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Activity type'),
                        dataField: "activation_type_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Statu type'),
                        dataField: "statu_types_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Activity status'),
                        dataField: "cs_act_statutype_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Vehicle Model'),
                        dataField: "vehicle_model_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Description'),
                        dataField: "description",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Segment type'),
                        dataField: "segment_type_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('E-mail'),
                        dataField: "email",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Mobile number'),
                        dataField: "cep",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Phone'),
                        dataField: "tel",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Fax'),
                        dataField: "fax",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Date saved'),
                        dataField: "date_saved",
                        encodeHtml: false
                    }, {
                        caption: "Active/Passive",
                        dataField: "active",
                        dataType: "boolean"
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
                        selectedCustomerActivityId = data.id;

                    }
                },

                onRowRemoving: function (e) {
                    selectedCustomerActivityId = e.key.id;
                    //alert(selectedBranchId);
                },

                onRowRemoved: function (e) {
                    $("#gridContainer_activity").dxDataGrid("instance").refresh();
                },

            });
        });
    })

 /**
 * Customer activity list
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */
    $('#customerActivityList').click();


    /**
* Contact person product interest list
* @returns {undefined}
* @author Gül Özdemir
* @since 14/10/2018
*/

    $('#contactperson_productinterestList').click(function () {

        //alert(selectedCustomerId);

        var contactpersonproduct_data = new DevExpress.data.CustomStore({
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
                    url: '/Customer/ContactPersonProductInterestGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillCustomerCpVehiclesGridx_infocustomercpersonvehicle",
                        pkIdentity: $("#publicKey").val(),
                        page: "",
                        rows: "",
                        sort: "",
                        order: "", //args.orderby,
                        skip: args.skip,
                        take: args.take,
                        customer_contact_persons_id: selectedContactPersonId
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

                //alert("remove selectedContactPersonProductId" + selectedContactPersonProductId);

                return $.ajax({
                    url: '/Customer/DeleteContactPersonProductInterest',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedContactPersonProductId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_infocustomercpersonvehicle"
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

        console.log(contactpersonproduct_data);

        $(function () {
            $("#gridContainer_contactperson_productinterest").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: contactpersonproduct_data,

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
                    fileName: window.lang.translate('ContactPersonProductInterestList')
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
                        caption: window.lang.translate('Product Interest'),
                        dataField: "name",
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
                        selectedContactPersonProductId = data.id;
                        //alert("onSelectionChanged selectedContactPersonProductId" + selectedContactPersonProductId);
                    }
                },

                onRowRemoving: function (e) {
                    selectedContactPersonProductId = e.key.id;
                    //alert("onRowRemoving selectedContactPersonProductId" + selectedContactPersonProductId);
                },

                onRowRemoved: function (e) {
                    $("#gridContainer_contactperson_productinterest").dxDataGrid("instance").refresh();
                },

            });
        });
    })

   // $('#contactperson_productinterestList').click();

    
 /**
 * insert / Update Customer Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */

    $("#btn-cst-save").on("click", function (e) {
        e.preventDefault();

        if ($("#customerInfoForm").validationEngine('validate')) {

            //$("#loading-image-cstInfo").loadImager('removeLoadImage');
            //$("#loading-image-cstInfo").loadImager('appendImage');

            var customerName = $('#txt-cst-name').val();
            var customerShortName = $('#txt-cst-sname').val();
            var customerTradingName = $('#txt-cst-tradingname').val();
            //alert(branchName);
            //txt-embrace-no
            //var branchEmbraceNo = $('#txt-embrace-no').val();
            var address1 = $('#txt-cst-address1').val();
            var address2 = $('#txt-cst-address2').val();
            var address3 = $('#txt-cst-address3').val();
            //txt-location-ptcode
            var postalCode = $('#txt-cst-ptcode').val();

            var ddData_Country = $('#dropdownCountry').data('ddslick');
            var countryId = ddData_Country.selectedData.value;

            var ddData_Province = $('#dropdownProvince').data('ddslick');
            var provinceId = ddData_Province.selectedData.value;

            var ddData_City = $('#dropdownCity').data('ddslick');
            var cityId = ddData_City.selectedData.value;

            var email = $('#txt-cst-email').val();
            var phone = $('#txt-cst-phone').val();
            var website = $('#txt-cst-website').val();
            var vatNumber = $('#txt-cst-vatnumber').val();
            var regNumber = $('#txt-cst-regnumber').val();
            var regDate = $('#registration-datepicker').val();

            var ddData_Segment = $('#dropdownSegment').data('ddslick');
            var segmentId = ddData_Segment.selectedData.value;

            var ddData_Sector = $('#dropdownSector').data('ddslick');
            var sectorId = ddData_Sector.selectedData.value;

            var ddData_AppType = $('#dropdownApplicationType').data('ddslick');
            var applicationId = ddData_AppType.selectedData.value;

            var ddData_AR = $('#dropdownAnnuelRevenue').data('ddslick');
            var annuelRevenueId = ddData_AR.selectedData.value;

            var ddData_Credibility = $('#dropdownCredibility').data('ddslick');
            var credibilityId = ddData_Credibility.selectedData.value;

            var ddData_CstCategory = $('#dropdownCustomerCategory').data('ddslick');
            var customercategoryId = ddData_CstCategory.selectedData.value;

            var ddData_TotalEmployees = $('#dropdownTotalEmployees').data('ddslick');
            var totalemployeesId = ddData_TotalEmployees.selectedData.value;

            var ddData_TotalVehicles = $('#dropdownTotalVehicles').data('ddslick');
            var totalvehicleId = ddData_TotalVehicles.selectedData.value;


            var omEmbraceNo = $('#txt-cst-ordermanagement-embno').val();
            var tuEmbraceNo = $('#txt-cst-topused-embno').val();
            var ceEmbraceNo = $('#txt-cst-centurion-embno').val();
            var otherEmbraceNo = $('#txt-cst-other-embno').val();

            //alert(selectedCustomerId);
            var mydata = JSON.stringify({
                url: "pkInsertAct_infocustomer",
                registration_name: customerName,
                name_short: customerShortName,
                trading_name: customerTradingName,
                address1: address1,
                address2: address2,
                address3: address3,
                postalcode: postalCode,
                country_id: countryId,
                country2_id: 0,
                country_region_id: provinceId,
                city_id: cityId,
                email: email,
                phonenumber: phone,
                www: website,
                vatnumber: vatNumber,
                registration_number: regNumber,
                registration_date: regDate,
                segment_type_id: segmentId,
                sector_type_id: sectorId,
                application_type_id: applicationId,
                turnover_rate_id: annuelRevenueId,
                credibilityId: credibilityId,
                customer_category_id: customercategoryId,
                ne_count_type_id: totalemployeesId,
                nv_count_type_id: totalvehicleId,
                embrace_customer_no: omEmbraceNo,
                tu_emb_customer_no: tuEmbraceNo,
                ce_emb_customer_no: ceEmbraceNo,
                other_emb_customer_no: otherEmbraceNo,
                pk: "GsZVzEYe50uGgNM"
            });

            console.log(mydata);


            var ajax;
            if (selectedCustomerId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-customer').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-cstInfo",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                    proxy: '/Customer/InsertCustomer',
                    type: "POST",
                    data: mydata
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onSucces: function (event, data) {
                        alert('success');
                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_customer").dxDataGrid("instance").refresh();
                        $("#loading-image-cstInfo").loadImager('removeLoadImage');
                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-customer').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loading-image-cstinfo",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Customer/UpdateCustomer',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedCustomerId,
                                url: "pkUpdateAct_infocustomer",
                                registration_name: customerName,
                                name_short: customerShortName,
                                trading_name: customerTradingName,
                                address1: address1,
                                address2: address2,
                                address3: address3,
                                postalcode: postalCode,
                                country_id: countryId,
                                country2_id: 0,
                                country_region_id: provinceId,
                                city_id: cityId,
                                email: email,
                                phonenumber: phone,
                                www: website,
                                vatnumber: vatNumber,
                                registration_number: regNumber,
                                registration_date: regDate,
                                segment_type_id: segmentId,
                                sector_type_id: sectorId,
                                application_type_id: applicationId,
                                turnover_rate_id: annuelRevenueId,
                                credibilityId: credibilityId,
                                customer_category_id: customercategoryId,
                                ne_count_type_id: totalemployeesId,
                                nv_count_type_id: totalvehicleId,
                                embrace_customer_no: omEmbraceNo,
                                tu_emb_customer_no: tuEmbraceNo,
                                ce_emb_customer_no: ceEmbraceNo,
                                other_emb_customer_no: otherEmbraceNo,
                                pk: "GsZVzEYe50uGgNM"
                            })
                        });

                        ajax.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#gridContainer_customer").dxDataGrid("instance").refresh();
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Customer will be updated! Are you ok?', 'customer will be updated! Are you sure?');
            }
        }
        return false;

    })

 /**
 * reset button function for Customer Info insert form
 * @returns null
 * @since 14/07/2016
 */
    window.resetCustomerInfoForm = function () {
        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        $("#loading-image-cstInfo").loadImager('appendImage');

        selectedCustomerId = 0;

        ddslick_countryId = 1;
        ddslick_country_name = "South Africa";

        ddslick_provinceId = 0;
        ddslick_province_name = "";

        ddslick_cityId = 0;
        ddslick_city_name = "";


        $('#customerInfoForm').validationEngine('hide');
        
        $('#dropdownCountry').ddslick('select', { index: String(0) });
        $('#dropdownProvince').ddslick('destroy');
        $('#dropdownCity').ddslick('destroy');

        $('#dropdownSegment').ddslick('select', { index: String(0) });
        $('#dropdownSector').ddslick('select', { index: String(0) });

        $('#dropdownCredibility').ddslick('select', { index: String(0) });
        $('#dropdownApplicationType').ddslick('select', { index: String(0) });
        $('#dropdownCustomerCategory').ddslick('select', { index: String(0) });
        $('#dropdownTotalVehicles').ddslick('select', { index: String(0) });
        $('#dropdownTotalEmployees').ddslick('select', { index: String(0) });
        $('#dropdownAnnuelRevenue').ddslick('select', { index: String(0) });

        resetCustomerPurchaseForm();

        $("#loading-image-cstInfo").loadImager('removeLoadImage');
    
        //yeni kayda açık, tablar kapatılıyor
        tab_disable();
        //$("#customer_tab").organizeTabs('disableAllTabs');

        return false;
    }

 
 /**
 * customer info fill form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */
    window.fillCustomerInfoForm = function (data) {
        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        $("#loading-image-cstInfo").loadImager('appendImage');

        selectedCustomerId = data.id;

                //"is_bo_confirm":0, //backoffice confirmasyon onayı
        if (data.registration_name) {
            document.getElementById("txt-cst-name").value = data.registration_name;
        } else {
            document.getElementById("txt-cst-name").value = "";
        }

        if (data.name_short) {
            document.getElementById("txt-cst-sname").value = data.name_short;
        } else {
            document.getElementById("txt-cst-sname").value = "";
        }

        if (data.trading_name) {
            document.getElementById("txt-cst-tradingname").value = data.trading_name;
        } else {
            document.getElementById("txt-cst-tradingname").value = "";
        }

        if (data.address1) {
            document.getElementById("txt-cst-address1").value = data.address1;
        } else {
            document.getElementById("txt-cst-address1").value = "";
        }

        if (data.address2) {
            document.getElementById("txt-cst-address2").value = data.address2;
        } else {
            document.getElementById("txt-cst-address2").value = "";
        }

        if (data.address3) {
            document.getElementById("txt-cst-address3").value = data.address3;
        } else {
            document.getElementById("txt-cst-address3").value = "";
        }

        if (data.postalcode) {
            document.getElementById("txt-cst-ptcode").value = data.postalcode;
        } else {
            document.getElementById("txt-cst-ptcode").value = "";
        }

        if (data.email) {
            document.getElementById("txt-cst-email").value = data.email;
        } else {
            document.getElementById("txt-cst-email").value = "";
        }

        if (data.www) {
            document.getElementById("txt-cst-website").value = data.www;
        } else {
            document.getElementById("txt-cst-website").value = "";
        }

        if (data.phonenumber) {
            document.getElementById("txt-cst-phone").value = data.phonenumber;
        } else {
            document.getElementById("txt-cst-phone").value = "";
        }

        if (data.vatnumber) {
            document.getElementById("txt-cst-vatnumber").value = data.vatnumber;
        } else {
            document.getElementById("txt-cst-vatnumber").value = "";
        }

        if (data.registration_number) {
            document.getElementById("txt-cst-regnumber").value = data.registration_number;
        } else {
            document.getElementById("txt-cst-regnumber").value = "";
        }

        if (data.registration_date) {
            document.getElementById("registration-datepicker").value = data.registration_date;
        } else {
            document.getElementById("registration-datepicker").value = "";
        }

        if (data.embrace_customer_no) {
            document.getElementById("txt-cst-ordermanagement-embno").value = data.embrace_customer_no;
        } else {
            document.getElementById("txt-cst-ordermanagement-embno").value = "";
        }

        if (data.tu_emb_customer_no) {
            document.getElementById("txt-cst-topused-embno").value = data.tu_emb_customer_no;
        } else {
            document.getElementById("txt-cst-topused-embno").value = "";
        }

        if (data.ce_emb_customer_no) {
            document.getElementById("txt-cst-centurion-embno").value = data.ce_emb_customer_no;
        } else {
            document.getElementById("txt-cst-centurion-embno").value = "";
        }

        if (data.ce_emb_customer_no) {
            document.getElementById("txt-cst-other-embno").value = data.other_emb_customer_no;
        } else {
            document.getElementById("txt-cst-other-embno").value = "";
        }

        if (data.country_id) {
            ddslick_countryId = data.country_id;
            ddslick_country_name = data.country_name;
        } else {
            ddslick_countryId = 0;
            ddslick_country_name = "";
        }

        if (data.region_id) {
            ddslick_provinceId = data.region_id;
            ddslick_province_name = data.region;
        } else {
            ddslick_provinceId = 0;
            ddslick_province_name = "";
        }

        if (data.city_id) {
            ddslick_cityId = data.city_id;
            ddslick_city_name = data.city_name;
        } else {
            ddslick_cityId = 0;
            ddslick_city_name = "";
        }

        if (data.country_id) {
            $('#dropdownCountry').ddslick('selectByValue',
                {
                    index: data.country_id,
                    value: data.country_name
                }
            );
        }

        if (data.segment_type_id) {
            $('#dropdownSegment').ddslick('selectByValue',
                {
                    index: data.segment_type_id,
                    value: data.segment_type_name
                }
            );
        }

        if (data.sector_type_id) {
            $('#dropdownSector').ddslick('selectByValue',
                {
                    index: data.sector_type_id,
                    value: data.sector_type_name
                }
            );
        }

        if (data.application_type_id) {
            $('#dropdownApplicationType').ddslick('selectByValue',
                {
                    index: data.application_type_id,
                    value: data.application_type_name
                }
            );
        }

        if (data.credibilityId) {
            $('#dropdownCredibility').ddslick('selectByValue',
                {
                    index: data.credibilityId,
                    value: data.reliability_name
                }
            );
        }

        if (data.customer_category_id) {
            $('#dropdownCustomerCategory').ddslick('selectByValue',
                {
                    index: data.customer_category_id,
                    value: data.customer_category_name
                }
            );
        }

        if (data.ne_count_type_id) {
            $('#dropdownTotalEmployees').ddslick('selectByValue',
                {
                    index: data.ne_count_type_id,
                    value: data.numberofemployees
                }
            );
        }

        if (data.nv_count_type_id) {
            $('#dropdownTotalVehicles').ddslick('selectByValue',
                {
                    index: data.nv_count_type_id,
                    value: data.numberofvehicles
                }
            );
        }

        if (data.turnover_rate_id) {
            $('#dropdownAnnuelRevenue').ddslick('selectByValue',
                {
                    index: data.turnover_rate_id,
                    value: data.turnover_rate_name
                }
            );
        }

        fillCustomerPuchaseForm();
        resetContactPersonForm();
        $('#contactpersonList').click();

        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        tab_active();
        //$("#customer_tab").organizeTabs('enableAllTabs');


        return false;
    }

/**
 * Contact person tab click grid refresh
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 18/10/2018
 */

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab
        //alert(target);
        if (target == "#tab_3") {
            // grid refresh olması gerektiği için kullanıldı.
            //$(gridContainer_tab).dxDataGrid("updateDimensions");
            $('#contactpersonList').click();

        }
        if (target == "#tab_4") {
            // grid refresh olması gerektiği için kullanıldı.
            //$(gridContainer_tab).dxDataGrid("updateDimensions");
            $('#customerActivityList').click();
        }
    });


/**
 * Customer purchaseplan delete
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */


  $("#btn-cstp-delete").on("click", function (e) { 
        e.preventDefault();

        wcm.warningComplexMessage({
            onConfirm: function (event, data) {
                var ajax = $('#ajaxACL-purchaseplan').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-cstPurchase",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                    proxy: '/Customer/DeletePurchasePlan',
                    type: "POST",
                    data: JSON.stringify({
                        id: selectedCustomerId,//selectedPurchasePlanId,
                        url: "pkDeletedAct_infocustomerpurchaseplan",
                        pk: "GsZVzEYe50uGgNM"
                    })
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#loading-image-cstPurchase").loadImager('removeLoadImage');
                    }
                })
                ajax.ajaxCallWidget('call');
            }
        });
        wcm.warningComplexMessage('show', 'Customer purchase plan will be deleted! Are you ok?', 'Customer purchase plan will be deleted! Are you sure?');
})

/**
 * Customer purcase plan insert / update
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */
    $("#btn-cstp-save").on("click", function (e) {
        e.preventDefault();

        if ($("#customerPurchaseForm").validationEngine('validate')) {

            var cst_lastpurchase_date = $('#lastpurchase-datepicker').val();
            var purchaseplan_description = $('#txt-cst-purchaseplandesc').val();

            var ddData_lastPurchaseBrand = $('#dropdownLastPurchaseBrand').data('ddslick')
            var lastPurchaseBrand_id = ddData_lastPurchaseBrand.selectedData.value;

            var ddData_purchaseDecision = $('#dropdownPurchaseDecision').data('ddslick')
            var purchaseDecision_id = ddData_purchaseDecision.selectedData.value;

            var ddData_dateofPurchasePlan = $('#dropdownDateofPurchasePlan').data('ddslick')
            var dateofPurchasePlan_id = ddData_dateofPurchasePlan.selectedData.value;

            var ddData_numberofVehiclestoP = $('#dropdownNumberofVehiclestoP').data('ddslick')
            var numberofVehiclestoP_id = ddData_numberofVehiclestoP.selectedData.value;


            var mydata = JSON.stringify({
                url: "pkInsertAct_infocustomerpurchaseplan",
                customer_id: selectedCustomerId,
                last_purchase_date: cst_lastpurchase_date,
                description: purchaseplan_description,
                last_brand_id: lastPurchaseBrand_id,
                purchase_decision_id: purchaseDecision_id,
                date_of_plan_id: dateofPurchasePlan_id,
                quantity_id: numberofVehiclestoP_id,
                pk: "GsZVzEYe50uGgNM"
            });

            console.log(mydata);

            wcm.warningComplexMessage({
                onConfirm: function (event, data) {
                    var ajax = $('#ajaxACL-purchaseplan').ajaxCallWidget({
                        failureLoadImage: true,
                        loadingImageID: "loading-image-cstPurchase",
                        triggerSuccessAuto: true,
                        transactionSuccessText: window.lang.translate('Transaction successful'),
                        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                        proxy: '/Customer/InsertPurchasePlan',
                        type: "POST",
                        data: mydata
                    });

                    ajax.ajaxCallWidget({
                        onReset: function (event, data) {

                        },
                        onSucces: function (event, data) {
                            alert('success');
                        },
                        onAfterSuccess: function (event, data) {

                            $("#loading-image-cstPurchase").loadImager('removeLoadImage');
                        }
                    })
                    ajax.ajaxCallWidget('call');

                }
            });

            wcm.warningComplexMessage('show', 'Customer purchase plan will be updated! Are you ok?', 'Customer purchase plan will be updated! Are you sure?');

        }
           
    })

/**
 * Customer purcase plan reset form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */

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

/**
 * Customer purcase plan fill form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */

    window.fillCustomerPuchaseForm = function () {

        resetCustomerPurchaseForm();

        $("#loading-image-cstPurchase").loadImager('removeLoadImage');
        $("#loading-image-cstPurchase").loadImager('appendImage');

        var ajaxACLResources_cstpurchaseplan = $('#ajaxACL-purchaseplan').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-cstPurchase",
            triggerSuccessAuto: true,
            transactionSuccessText: window.lang.translate('Transaction successful'),
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Customer/CustomerPurchasePlan/',
            type: 'POST',
            data: JSON.stringify({
                language_code: $("#langCode").val(),
                pk: "GsZVzEYe50uGgNM",
                url: "pkFillCustomerPurchaseGridx_infocustomerpurchaseplan",
                pkIdentity: $("#publicKey").val(),
                customer_id: selectedCustomerId
            })
        });

        ajaxACLResources_cstpurchaseplan.ajaxCallWidget({
            onSuccess: function (event, datapurchaseplan) {
                datapurchaseplan =  $.parseJSON(datapurchaseplan);

                if (datapurchaseplan) {

                    if (datapurchaseplan[0].last_purchase_date) {
                        document.getElementById("lastpurchase-datepicker").value = datapurchaseplan[0].last_purchase_date;
                    }

                    if (datapurchaseplan[0].date_saved) {
                        document.getElementById("txt-cst-purchaselastupdate").value = datapurchaseplan[0].date_saved;
                    }

                    if (datapurchaseplan[0].description) {
                        document.getElementById("txt-cst-purchaseplandesc").value = datapurchaseplan[0].description;
                    }

                    if (datapurchaseplan[0].last_brand_id) {
                        $('#dropdownLastPurchaseBrand').ddslick('selectByValue',
                            {
                                index: datapurchaseplan[0].last_brand_id,
                                value: datapurchaseplan[0].last_brand_name
                            }
                        );
                    }

                    if (datapurchaseplan[0].purchase_decision_id) {
                        $('#dropdownPurchaseDecision').ddslick('selectByValue',
                            {
                                index: datapurchaseplan[0].purchase_decision_id,
                                value: datapurchaseplan[0].purchase_decision
                            }
                        );
                    }

                    if (datapurchaseplan[0].date_of_plan_id) {
                        $('#dropdownDateofPurchasePlan').ddslick('selectByValue',
                            {
                                index: datapurchaseplan[0].date_of_plan_id,
                                value: datapurchaseplan[0].date_of_plan
                            }
                        );
                    }

                    if (datapurchaseplan[0].quantity_id) {
                        $('#dropdownNumberofVehiclestoP').ddslick('selectByValue',
                            {
                                index: datapurchaseplan[0].quantity_id,
                                value: datapurchaseplan[0].quantity_name
                            }
                        );
                    }
                }

                $("#loading-image-cstPurchase").loadImager('removeLoadImage');
            },
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#loading-image-cstPurchase").loadImager('removeLoadImage');
            }
        })
        ajaxACLResources_cstpurchaseplan.ajaxCallWidget('call');

        return false;
    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Contact Person

/**
 * insert / update CustomerContactPerson
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 07/08/2018
 */

    $("#btn-cstcp-save").on("click", function (e) {
        e.preventDefault();

        if ($("#customerContactPersonForm").validationEngine('validate')) {

            $("#loading-image-cstcp").loadImager('removeLoadImage');
            $("#loading-image-cstcp").loadImager('appendImage');

            var firstName = $('#txt-cp-firstname').val();
            var lastName = $('#txt-cp-lastname').val();
            var cp_mobile = $('#txt-cp-mobile').val();
            var cp_phone = $('#txt-cp-phone').val();
            var cp_fax = $('#txt-cp-fax').val();
            var cp_email = $('#txt-cp-email').val();
            var lastcontactdate = $('#lastcontactdate-datepicker').val();

            var ddData_Sourceoflead = $('#dropdownSourceoflead').data('ddslick');
            var sourceofleadId = ddData_Sourceoflead.selectedData.value;

            var ddData_Priority = $('#dropdownPriority').data('ddslick');
            var priorityId = ddData_Priority.selectedData.value;

            var ddData_Title = $('#dropdownTitle').data('ddslick');
            var titleId = ddData_Title.selectedData.value;

            var ddData_Role = $('#dropdownRole').data('ddslick');
            var roleId = ddData_Role.selectedData.value;  

            var ddData_CompSatisfaction = $('#dropdownCompSatisfaction').data('ddslick');
            var compsatisfactionId = ddData_CompSatisfaction.selectedData.value;  

            var ddData_MANSatisfaction = $('#dropdownMANSatisfaction').data('ddslick');
            var mansatisfactionId = ddData_MANSatisfaction.selectedData.value; 

            var ddData_BrandLoyalty = $('#dropdownBrandLoyalty').data('ddslick');
            var brandloyaltyId = ddData_BrandLoyalty.selectedData.value; 

            var ddData_LastBrand = $('#dropdownLastBrand').data('ddslick');
            var lastbrandId = ddData_LastBrand.selectedData.value;

            var mydata = JSON.stringify({
                url: "pkInsertAct_infocustomercontactpersons",
                customer_id: selectedCustomerId,
                name: firstName,
                surname: lastName,
                email: cp_email,
                mobile: cp_mobile,
                phone: cp_phone,
                fax: cp_fax,
                priority_id: priorityId,
                source_of_lead_id: sourceofleadId,
                con_end_date: lastcontactdate,
                title_id: titleId,
                title_role_id: roleId,
                brand_loyalty_id: brandloyaltyId,
                last_brand_id: lastbrandId,
                competitor_satisfaction_id: compsatisfactionId,
                man_satisfaction_id: mansatisfactionId,
                pk: "GsZVzEYe50uGgNM"
            })

            console.log(mydata);


            //alert(selectedContactPersonId); 
            var ajax;
            if (selectedContactPersonId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-contactperson').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-cstcp",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                    proxy: '/Customer/InsertContactPerson',
                    type: "POST",
                    data: mydata
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_contactperson").dxDataGrid("instance").refresh();
                        $("#loading-image-cstcp").loadImager('removeLoadImage');
                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");
                $("#loading-image-cstcp").loadImager('removeLoadImage');
                $("#loading-image-cstcp").loadImager('appendImage');

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-contactperson').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loading-image-cstcp",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Customer/UpdateContactPerson',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedContactPersonId,
                                url: "pkUpdateAct_infocustomercontactpersons",
                                customer_id: selectedCustomerId,
                                name: firstName,
                                surname: lastName,
                                email: cp_email,
                                mobile: cp_mobile,
                                phone: cp_phone,
                                fax: cp_fax,
                                priority_id: priorityId,
                                source_of_lead_id: sourceofleadId,
                                con_end_date: lastcontactdate,
                                title_id: titleId,
                                title_role_id: roleId,
                                brand_loyalty_id: brandloyaltyId,
                                last_brand_id: lastbrandId,
                                competitor_satisfaction_id: compsatisfactionId,
                                man_satisfaction_id: mansatisfactionId,
                                pk: "GsZVzEYe50uGgNM"
                            })
                        });

                        ajax.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#gridContainer_contactperson").dxDataGrid("instance").refresh();
                                $("#loading-image-cstcp").loadImager('removeLoadImage');
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Contact Person will be updated! Are you sure?', 'Contact Person will be updated! Are you sure?');
            }
        }
        return false;

    })
    /*
 {"id":"1","apid":1,
 "customer_id":29,
 "name":"dene",
 "surname":"ddwe",
 "email":"fdd",
 "mobile":"123",
 "phone":"321",
 "fax":"123331",
 "embrace_customer_no":"1222",
 "tu_emb_customer_no":"2333",
 "ce_emb_customer_no":"3444",
 "other_emb_customer_no":"4555",
 "www":"www.siteadi.com",
 "registration_name":"COMMERCIAL MOTORS (PTY) LTD",
 "source_of_lead_id":1,
 "source_of_lead_name":"telephone inquiry",
 "con_end_date":"2018-10-09 00:00:00",
 "title_id":1,
 "title_role_id":42,
 "role_name":"CEO",
 "priority_id":1,
 "priority_name":"Low",
 "brand_loyalty_id":1,
 "brand_loyalty_name":"",
 "last_brand_id":1,
 "last_brand_name":"MAN",
 "competitor_satisfaction_id":1,
 "competitor_satisfaction_name":"High",
 "man_satisfaction_id":2,
 "man_satisfaction_name":"Low",
 "op_username":"admin@gmail.com","state_active":"Active","date_saved":"2018-10-18 11:17:32","date_modified":null,"language_code":"en","active":0,"op_user_id":0,"language_id":"385","language_name":"English"},
     */


/**
 * fill CustomerContactPerson
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 07/08/2018
 */
    window.fillContactPersonForm = function (data) {

        $("#loading-image-cstcp").loadImager('removeLoadImage');
        $("#loading-image-cstcp").loadImager('appendImage');

        if (data.name) {
            document.getElementById("txt-cp-firstname").value = data.name;
        } else {
            document.getElementById("txt-cp-firstname").value = "";
        }

        if (data.surname) {
            document.getElementById("txt-cp-lastname").value = data.surname;
        } else {
            document.getElementById("txt-cp-lastname").value = "";
        }

        if (data.mobile) {
            document.getElementById("txt-cp-mobile").value = data.mobile;
        } else {
            document.getElementById("txt-cp-mobile").value = "";
        }

        if (data.phone) {
            document.getElementById("txt-cp-phone").value = data.phone;
        } else {
            document.getElementById("txt-cp-phone").value = "";
        }

        if (data.fax) {
            document.getElementById("txt-cp-fax").value = data.fax;
        } else {
            document.getElementById("txt-cp-fax").value = "";
        }

        if (data.email) {
            document.getElementById("txt-cp-email").value = data.email;
        } else {
            document.getElementById("txt-cp-email").value = "";
        }
        
        if (data.con_end_date) {
            document.getElementById("lastcontactdate-datepicker").value = data.con_end_date;
        } else {
            document.getElementById("lastcontactdate-datepicker").value = "";
        }
        

        if (data.source_of_lead_id) {
            $('#dropdownSourceoflead').ddslick('selectByValue',
                {
                    index: data.source_of_lead_id,
                    value: data.source_of_lead_name
                }
            );
        }

        if (data.title_id) {
            if (data.title_id === 1) {
                $('#dropdownTitle').ddslick('selectByValue',
                    {
                        index: data.title_id,
                        value: "Mrs"
                    }
                ); 
            }
            if (data.title_id === 2) {
                $('#dropdownTitle').ddslick('selectByValue',
                    {
                        index: data.title_id,
                        value: "Mr"
                    }
                );
            }
        }

        if (data.title_role_id) {
            $('#dropdownRole').ddslick('selectByValue',
                {
                    index: data.title_role_id,
                    value: data.role_name
                }
            );
        }
        
        //alert(data.priority_id);
        if (data.priority_id) {
            $('#dropdownPriority').ddslick('selectByValue',
                {
                    index: data.priority_id,
                    value: data.priority_name
                }
            );
        }

        if (data.brand_loyalty_id) {
            $('#dropdownBrandLoyalty').ddslick('selectByValue',
                {
                    index: data.brand_loyalty_id,
                    value: data.brand_loyalty_name
                }
            );
        }

        if (data.last_brand_id) {
            $('#dropdownLastBrand').ddslick('selectByValue',
                {
                    index: data.last_brand_id,
                    value: data.last_brand_name
                }
            );
        }

        if (data.competitor_satisfaction_id) {
            $('#dropdownCompSatisfaction').ddslick('selectByValue',
                {
                    index: data.competitor_satisfaction_id,
                    value: data.competitor_satisfaction_name
                }
            );
        }

        if (data.man_satisfaction_id) {
            $('#dropdownMANSatisfaction').ddslick('selectByValue',
                {
                    index: data.man_satisfaction_id,
                    value: data.man_satisfaction_name
                }
            );
        }


        $("#loading-image-cstcp").loadImager('removeLoadImage');
    }


/**
 * Customer contact person reset form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */
    window.resetContactPersonForm = function () {
        $("#loading-image-cstcp").loadImager('removeLoadImage');
        $("#loading-image-cstcp").loadImager('appendImage');

        $('#customerContactPersonForm').validationEngine('hide');

        $('#dropdownLastPriority').ddslick('select', { index: String(0) });
        $('#dropdownSourceoflead').ddslick('select', { index: String(0) });
        $('#dropdownTitle').ddslick('select', { index: String(0) });
        $('#dropdownRole').ddslick('select', { index: String(0) });
        $('#dropdownPriority').ddslick('select', { index: String(0) });
        $('#dropdownBrandLoyalty').ddslick('select', { index: String(0) });
        $('#dropdownLastBrand').ddslick('select', { index: String(0) });
        $('#dropdownCompSatisfaction').ddslick('select', { index: String(0) });
        $('#dropdownMANSatisfaction').ddslick('select', { index: String(0) });

        $("#loading-image-cstcp").loadImager('removeLoadImage');

        return false;
    }



/**
 * Customer active / passive
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */
    window.activepassiveCustomer = function (customer_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //passive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        $("#loading-image-cstInfoGrid").loadImager('removeLoadImage');
        $("#loading-image-cstInfoGrid").loadImager('appendImage');

        var ajax_activepassivecustomerlist = $('#ajaxACL-customerlist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-cstInfoGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Customer/ActivePassiveCustomer',
            type: "POST",
            data: JSON.stringify({
                id: customer_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_infocustomer"
            }),

        });
        ajax_activepassivecustomerlist.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_customer").dxDataGrid("instance").refresh();
                $("#loading-image-cstInfoGrid").loadImager('removeLoadImage');
            }
        })
        ajax_activepassivecustomerlist.ajaxCallWidget('call');

    }


    /**
    * insert CustomerContactPersonProductInterest
    * @returns {undefined}
    * @author Gül Özdemir
    * @since 07/08/2018
    */

    $("#btn-cstcp-pi-add").on("click", function (e) {
        e.preventDefault();

        if ($("#customerContactPersonProductInterestForm").validationEngine('validate')) {

            //var ddData_ProductInterest = $('#dropdownProductInterest').data('ddslick');
            //var productinterestId = ddData_ProductInterest.selectedData.value;
            $("#loading-image-productinterest").loadImager('removeLoadImage');
            $("#loading-image-productinterest").loadImager('appendImage');

            var ajax = $('#ajaxACL-cp-productinterest').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "loading-image-cstcppi",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                proxy: '/Customer/InsertContactPersonProductInterest',
                type: "POST",
                data: JSON.stringify({
                    url: "pkInsertAct_infocustomercpersonvehicle",
                    customer_contact_persons_id: selectedContactPersonId,
                    vehicle_group_id: SelectedProductInterestId,
                    pk: "GsZVzEYe50uGgNM"
                })
            });

            ajax.ajaxCallWidget({
                onReset: function (event, data) {

                },
                onAfterSuccess: function (event, data) {
                    $("#gridContainer_contactperson_productinterest").dxDataGrid("instance").refresh();
                    $("#loading-image-cstcppi").loadImager('removeLoadImage');
                }
            })
            ajax.ajaxCallWidget('call');
        }
       
        return false;

    })


/**
 * Customer contact person product interest reset form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */
    window.resetContactPersonProductInterestForm = function () {
        $("#loading-image-cstcppi").loadImager('removeLoadImage');
        $("#loading-image-cstcppi").loadImager('appendImage');

        $('#customerContactPersonProductInterestForm').validationEngine('hide');

        $('#dropdownProductInterest').ddslick('select', { index: String(0) });

        $("#loading-image-cstcp").loadImager('removeLoadImage');

        return false;
    }

 /**
 * Contact Person active / passive
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */
    window.activepassiveContactPerson = function (contactperson_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //passive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        $("#loading-image-contactpersonGrid").loadImager('removeLoadImage');
        $("#loading-image-contactpersonGrid").loadImager('appendImage');

        var ajax_activepassivecontactpersonlist = $('#ajaxACL-contactpersonlist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-contactpersonGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Customer/ActivePassiveContactPerson',
            type: "POST",
            data: JSON.stringify({
                id: contactperson_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_infocustomercontactpersons"
            }),

        });
        ajax_activepassivecontactpersonlist.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_contactperson").dxDataGrid("instance").refresh();
                $("#loading-image-contactpersonGrid").loadImager('removeLoadImage');
            }
        })
        ajax_activepassivecontactpersonlist.ajaxCallWidget('call');

    }
});

