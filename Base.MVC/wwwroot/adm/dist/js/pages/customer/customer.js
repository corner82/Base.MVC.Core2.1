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
    var selectedCustomerActivityId = 0;
    var selectedContactPersonId = 0;
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
    /*
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

    //tab_disable();
    */


    var tabOrganizer = $("#customer_tab").organizeTabs({ tabID: "customer_tab" });
    $("#customer_tab").organizeTabs('disableAllTabs');

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
        })
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
        })
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
        })
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
        })
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
        })
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
        })
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
        })
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
                search: true,
                searchText: window.lang.translate('Search'),
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
        })
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
                search: true,
                searchText: window.lang.translate('Search'),
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
        })
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
                search: true,
                searchText: window.lang.translate('Search'),
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
        })
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

/*
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

*/
    /**
 * Product Interest dropdown prepared
 * @type @call;$@call;ajaxCallWidget
 * @since 30/05/2018
 */
/*
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
*/
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


/*
//////////////////////////////////////////////////////////////////////////////////////////////

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

*/
    //Seçili Müşteriye ait Aktiviteler Listelenir
    /**
*.branch/dealer List Refresh
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
                        caption: window.lang.translate('GSM'),
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


    $('#customerActivityList').click();

    
/*
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


*/
    /**
    * insert CustomerInfo Wrapper
    * @returns {Boolean}
    * @since 02/08/2018
    */
/*
 * 
 * {"id":"2","apid":2,"cust_sis_key":"1716068406394007398","registration_name":"TIREPOINT (PTY) LTD","trading_name":"",
 * "name_short":"TIREPOINT ","embrace_customer_no":"31000663","tu_emb_customer_no":"","ce_emb_customer_no":"",
 * "other_emb_customer_no":"","www":"","vatnumber":"","registration_number":"","registration_date":null,"ne_count_type_id":16,
 * "numberofemployees":"51-100","nv_count_type_id":23,"numberofvehicles":"21-50",
 * "customer_category_id":2,
 * "customer_category_name":"DTRK","reliability_id":2,"reliability_name":"Low","turnover_rate_id":1,
 * "turnover_rate_name":"1 - 100.000","sector_type_id":1,"sector_type_name":"General","application_type_id":2,
 * "application_type_name":"General Distribution","segment_type_id":1,"segment_type_name":"Long Haul",
 * "is_bo_confirm":0,"firm_country_id":107,"firm_country_name":"G\u00fcney Afrika","address1":"","address2":"","address3":"",
 * "postalcode":"","country_id":107,"country_name":"G\u00fcney Afrika","city_id":0,"city_name":"","region_id":null,"region":"",
 * "op_username":"admin@gmail.com","state_active":"Active","date_saved":"2018-09-27 12:23:04","date_modified":null,
 * "language_code":"en","active":0,"op_user_id":0,"language_id":"385","language_name":"English"}
 * 
 * /
    window.insertCustomerInfoWrapper = function (e) {
        //e.preventDefault();
        
        if ($("#customerInfoForm").validationEngine('validate')) {

            insertCustomerInfo();
        }
        return false;
    }

 /**
 * insert / Update Customer Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */

    $("#btn-cst-save").on("click", function (e) {
        e.preventDefault();

        if ($("#customerInfoForm").validationEngine('validate')) {

            $("#loading-image-cstInfo").loadImager('removeLoadImage');
            $("#loading-image-cstInfo").loadImager('appendImage');

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
                                $("#gridContainer_branch").dxDataGrid("instance").refresh();
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Branch is update! Are you ok?', 'Branch is update! Are you sure?');
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

        $("#loading-image-cstInfo").loadImager('removeLoadImage');
    
        //yeni kayda açık, tablar kapatılıyor
        //tab_disable();
        $("#customer_tab").organizeTabs('disableAllTabs');

        return false;
    }


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

        //alert(data.nv_count_type_id);

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

        $("#loading-image-cstInfo").loadImager('removeLoadImage');
        //tab_active();
        $("#customer_tab").organizeTabs('enableAllTabs');

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

    window.fillCustomerPuchaseForm = function () {

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
                var cbdata_purchaseplan = $.parseJSON(datapurchaseplan);

                //lastpurchase-datepicker

                /*
                 "last_purchase_date":"2016-04-10 00:00:00",
                 "last_brand":"VW",
                 "description":"asdasd",
                 "date_of_purchase":"2018-10-10 00:00:00",
                 "quantity":22,"op_username":"mustafa.zeynel.admin@ostim.com.tr","date_saved":"2018-10-15 01:10:20","date_modified":null,"op_user_id":16}]
                 */

                $("#loading-image-cstPurchase").loadImager('removeLoadImage');
            },
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#loading-image-cstPurchase").loadImager('removeLoadImage');
            }
        })
        ajaxACLResources_cstpurchaseplan.ajaxCallWidget('call');


        /*$("#loading-image-cstPurchase").loadImager('removeLoadImage');
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
        */
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
        //selectedCustomerId;

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

    window.activepassiveCustomer = function (customer_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //passive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

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
});

