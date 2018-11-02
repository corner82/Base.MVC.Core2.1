$(document).ready(function () {

    //----------------------------------loadImager begin-------------------------------------------------
    $('#loadingImage_DdslickVehicleGroupsBodyProposal').loadImager();
    $('#loadingImage_ddslickVehicleGroupProducts').loadImager();
    $("#loading-image-country").loadImager();
    $("#loading-image-province").loadImager();
    $("#loading-image-city").loadImager();
    $('#loadingImage_Ddslick3').loadImager();
    $('#loadingImage_Ddslick4').loadImager();
    $('#loadingImage_Ddslick5').loadImager();
    $('#loadingImage_Ddslick6').loadImager();
    $('#loadingImage_Ddslick7').loadImager();
    $('#loadingImage_Ddslick8').loadImager();
    //----------------------------------loadImager end-------------------------------------------------

    //----------------------------------tagcabin begin-------------------------------------------------
    var tagdataAksessuarlar = [{ "id": "120", "text": "TGS-26-4406X4BLS-LX-ALU-EL / 12 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "73", "privilege_name_eng": "Assign Consultant" } },
    { "id": "41", "text": "TGS-26-4406X4BLS-LX-ALU-ELX / 10 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "45", "privilege_name_eng": "You can list the database \/*table*\/." } },
    { "id": "47", "text": "TGS-16-4406X4BLS-LX-ALU-EL /8 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "51", "privilege_name_eng": "Menu Active \/  Passive" } },
    { "id": "46", "text": "TGS-26-5406X4BLS-LX-ALU-EL / 4 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "44", "privilege_name_eng": "Menu \/*Insert*\/" } },
    { "id": "48", "text": "TGX-26-5406X4BLS-LX-ALU-EL / 2 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "49", "privilege_name_eng": "Menu Update" } },
    { "id": "49", "text": "TGV-26-5406X4BLS-LX-ALU-EL / 1 piece", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "50", "privilege_name_eng": "Menu\/* delete*\/" } }];
    var tagBuilderAksesuarlar = $('#tagcabin_VehicleAksesuarlar').tagCabin({
        tagCopy: true,
        tagDeletable: true,
        tagDeletableAll: false,
        tagBox: $('.tag-container-aksesuarlar').find('ul'),
        //dataMapper: {attributes : Array('role_id', 'resource_id', 'privilege_id')}
        //dataMapper: Array('role_id', 'resource_id', 'privilege_id')

    });
    //var testArr = ['text', 'value'];
    tagBuilderAksesuarlar.tagCabin('addTags', JSON.stringify(tagdataAksessuarlar)/*, testArr*/);
    //----------------------------------tagcabin end-------------------------------------------------

   //----------------------------------datepicker begin-------------------------------------------------
    $('#date_vehicleDelivery').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-1d'
    });
    //----------------------------------datepicker end-------------------------------------------------

    //----------------------------------grid begin-------------------------------------------------
    /* 
    * body proposal grid data source
    * @author Mustafa Zeynel dağlı
    * @since 21/10/2018
    * */
    var deals_grid_datasource = new DevExpress.data.CustomStore({
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
                url: '/Deal/GetDealListProxyService',
                dataType: "json",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkFillProjectGridx_infoproject",
                    pkIdentity: $("#publicKey").val(),
                    //project_id: dealID,
                    project_id: parseInt(80),
                    page: "",
                    rows: "",
                    sort: "",
                    order: "",
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
        }
    });
    /* 
    * body proposal grid 
    * @author Mustafa Zeynel dağlı
    * @since 21/10/2018
    * */
    DevExpress.localization.locale($("#langCode").val());
    $("#gridContainer_vehicle").dxDataGrid({
        showColumnLines: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        showBorders: true,
        //dataSource: dealGridDataSource,
        dataSource: deals_grid_datasource,
        columnHidingEnabled: true,
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
            fileName: "Deals"
        },
        grouping: {
            contextMenuEnabled: true,
            expandMode: "rowClick"
        },
        groupPanel: {
            emptyPanelText: window.lang.translate("Use the context menu of header columns to group data"),
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
            placeholder: window.lang.translate("Search")
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
                caption: "Deal name",
                dataField: "deal_name"
            },
            {
                caption: "Customer",
                dataField: "registration_name"
            },
            /*{
                allowGrouping: false,
                dataField: "discount_rate",
                caption: "Discount rate",
                width: 130
            },*/
            {
                dataField: "state_active",
                caption: "Active / Passive",
            },
            {
                dataField: "date_saved",
                dataType: "date",
                caption: "Date",
            }, {
                dataField: "reliability_name",
                caption: "Reliability",
            }
        ],
        customizeColumns: function (columns) {
            //columns[5].format = { type: "currency", currency: "EUR" };
        },
        summary: {
            totalItems: [{
                column: "OrderNumber",
                summaryType: "count"
            }, /*{
                column: "SaleAmount",
                summaryType: "sum",
                valueFormat: "currency"
            }*/]
        }

    });

    //----------------------------------grid end-------------------------------------------------

    //----------------------------------dropdowns begin-------------------------------------------------
    var filldropdown = false;
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
            $('#loading-image-country').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            //alert('geldim AfterSuccess country');
            
        }
    })
    ajaxACLResources_country.ajaxCallWidget('call');

    /**
   * ddslick R&M (buyback) dropdown 
   * @author Mustafa Zeynel Dağlı
   * @since 15/08/2018
   */
    var ddslickRepMainDataBuyBack = [
        {
            text: 'Please select',
            value: 0,
            selected: true
        },

    ];
    $('#loading-image-province').loadImager('removeLoadImage');
    $("#loading-image-province").loadImager('appendImage');
    var selectedContRepMainBuyBack = false;
    $('#dropdownProvince').ddslick({
        //height: 150,
        data: ddslickRepMainDataBuyBack,
        width: '100%',
        onSelected: function (selectedData) {
            
        }
    });
    $("#loading-image-province").loadImager('removeLoadImage');

    /**
   * ddslick R&M (buyback) dropdown 
   * @author Mustafa Zeynel Dağlı
   * @since 15/08/2018
   */
    var ddslickRepMainDataBuyBack = [
        {
            text: 'Please select',
            value: 0,
            selected: true
        },


    ];
    $('#loading-image-city').loadImager('removeLoadImage');
    $("#loading-image-city").loadImager('appendImage');
    var selectedContRepMainBuyBack = false;
    $('#dropdownCity').ddslick({
        //height: 150,
        data: ddslickRepMainDataBuyBack,
        width: '100%',

        onSelected: function (selectedData) {
            
            
        }
    });
    $("#loading-image-city").loadImager('removeLoadImage');


    /**
    * ddslick vehicle groups (body) dropdown 
    * @author Mustafa Zeynel Dağlı
    * @since 16/10/2018
    */
    $('#loadingImage_DdslickVehicleGroupsBodyProposal').loadImager('removeLoadImage');
    $("#loadingImage_DdslickVehicleGroupsBodyProposal").loadImager('appendImage');
    var ajax_DdslickVehicleGroupsBodyProposal = $('#ajax_DdslickVehicleGroupsBodyProposal').ajaxCallWidget({
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleGroupsBodyProposal",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_DdslickVehicleGroupsBodyProposal.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickDeals').ddslick({
                //height: 150,
                data: data,
                width: '100%',
                onSelected: function (selectedData) {
                    /*if (selectedContTerrainTypeBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
                    selectedContTerrainTypeBuyBack = true;*/
                    if (selectedData.selectedData.value > 0) {
                        //getDealVehicleTypeDdslick();
                    }
                }
            });

            $("#loadingImage_DdslickVehicleGroupsBodyProposal").loadImager('removeLoadImage');
        },
    })
    ajax_DdslickVehicleGroupsBodyProposal.ajaxCallWidget('call');


    /**
   * ddslick vehicle group productions (body proposal)
   * @author Mustafa Zeynel Dağlı
   * @since 21/10/2018
   */
    
    $('#loadingImage_ddslickVehicleGroupProducts').loadImager('removeLoadImage');
    $("#loadingImage_ddslickVehicleGroupProducts").loadImager('appendImage');
    var ajax_Ddslick2 = $('#ajax_DdslickVehicleGroupProducts').ajaxCallWidget({
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        failureLoadImage: true,
        loadingImageID: "loadingImage_DdslickVehicleGroupsBodyProposal",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_Ddslick2.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslickInvoiceType').ddslick({
                //height: 150,
                data: data,
                width: '100%',
                onSelected: function (selectedData) {
                    
                }
            });

            $("#loadingImage_ddslickVehicleGroupProducts").loadImager('removeLoadImage');
        },
    })
    ajax_Ddslick2.ajaxCallWidget('call');


    /**
   * ddslick vehicle group productions (body proposal)
   * @author Mustafa Zeynel Dağlı
   * @since 21/10/2018
   */

    $('#loadingImage_Ddslick3').loadImager('removeLoadImage');
    $("#loadingImage_Ddslick3").loadImager('appendImage');
    var ajax_Ddslick3 = $('#ajax_Ddslick3').ajaxCallWidget({
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        failureLoadImage: true,
        loadingImageID: "loadingImage_Ddslick3",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_Ddslick3.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslick3').ddslick({
                //height: 150,
                data: data,
                width: '100%',
                onSelected: function (selectedData) {

                }
            });

            $("#loadingImage_Ddslick3").loadImager('removeLoadImage');
        },
    })
    ajax_Ddslick3.ajaxCallWidget('call');

    /**
  * ddslick vehicle group productions (body proposal)
  * @author Mustafa Zeynel Dağlı
  * @since 21/10/2018
  */

    $('#loadingImage_Ddslick4').loadImager('removeLoadImage');
    $("#loadingImage_Ddslick4").loadImager('appendImage');
    var ajax_Ddslick4 = $('#ajax_Ddslick4').ajaxCallWidget({
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        failureLoadImage: true,
        loadingImageID: "loadingImage_Ddslick3",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehicleGroupsDdList_sysvehiclegroups",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_Ddslick4.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslick4').ddslick({
                //height: 150,
                data: data,
                width: '100%',
                onSelected: function (selectedData) {

                }
            });

            $("#loadingImage_Ddslick4").loadImager('removeLoadImage');
        },
    })
    ajax_Ddslick4.ajaxCallWidget('call');


    /**
   * ddslick vehicle type dropdown 
   * @author Mustafa Zeynel Dağlı
   * @since 15/08/2018
   */

    $('#loadingImage_Ddslick5').loadImager('removeLoadImage');
    $("#loadingImage_Ddslick5").loadImager('appendImage');
    var ajax_Ddslick5 = $('#ajax_Ddslick5').ajaxCallWidget({
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        loadingImageID: "loadingImage_Ddslick5",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehiclesEndgroupsCostDdList_sysvehiclesendgroups",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_Ddslick5.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslick5').ddslick({
                //height: 150,
                data: data,
                width: '100%',
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                    }
                }
            });
            $("#loadingImage_Ddslick5").loadImager('removeLoadImage');
        },
    })
    ajax_Ddslick5.ajaxCallWidget('call');


    /**
   * ddslick vehicle type dropdown 
   * @author Mustafa Zeynel Dağlı
   * @since 15/08/2018
   */
    $('#loadingImage_Ddslick6').loadImager('removeLoadImage');
    $("#loadingImage_Ddslick6").loadImager('appendImage');
    var ajax_Ddslick6 = $('#ajax_Ddslick6').ajaxCallWidget({
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        loadingImageID: "loadingImage_Ddslick6",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehiclesEndgroupsCostDdList_sysvehiclesendgroups",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_Ddslick6.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslick6').ddslick({
                //height: 150,
                data: data,
                width: '100%',
                onSelected: function (selectedData) {
                    
                }
            });
            $("#loadingImage_Ddslick6").loadImager('removeLoadImage');
        },
    })
    ajax_Ddslick6.ajaxCallWidget('call');

    /**
   * ddslick vehicle type dropdown 
   * @author Mustafa Zeynel Dağlı
   * @since 15/08/2018
   */
    $('#loadingImage_Ddslick7').loadImager('removeLoadImage');
    $("#loadingImage_Ddslick7").loadImager('appendImage');
    var ajax_Ddslick7 = $('#ajax_Ddslick7').ajaxCallWidget({
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        loadingImageID: "loadingImage_Ddslick7",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehiclesEndgroupsCostDdList_sysvehiclesendgroups",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_Ddslick7.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslick7').ddslick({
                //height: 150,
                data: data,
                width: '100%',
                onSelected: function (selectedData) {

                }
            });
            $("#loadingImage_Ddslick7").loadImager('removeLoadImage');
        },
    })
    ajax_Ddslick7.ajaxCallWidget('call');

    /**
   * ddslick vehicle type dropdown 
   * @author Mustafa Zeynel Dağlı
   * @since 15/08/2018
   */
    $('#loadingImage_Ddslick8').loadImager('removeLoadImage');
    $("#loadingImage_Ddslick8").loadImager('appendImage');
    var ajax_Ddslick8 = $('#ajax_Ddslick8').ajaxCallWidget({
        proxy: '/DefaultPost/DefaultPostModel',
        type: "POST",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        loadingImageID: "loadingImage_Ddslick7",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkVehiclesEndgroupsCostDdList_sysvehiclesendgroups",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_Ddslick8.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#ddslick8').ddslick({
                //height: 150,
                data: data,
                width: '100%',
                onSelected: function (selectedData) {

                }
            });
            $("#loadingImage_Ddslick8").loadImager('removeLoadImage');
        },
    })
    ajax_Ddslick8.ajaxCallWidget('call');



    /**
   * ddslick deal vehicle group productions dropdown function (body proposal)
   * @author Mustafa Zeynel Dağlı
   * @since 21/10/2018
   */
    var getVehicleGroupProducts = function () {
        if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {
            $('#loadingImage_DdslickDealVehicleTypeBody').loadImager('removeLoadImage');
            $("#loadingImage_DdslickDealVehicleTypeBody").loadImager('appendImage');
            var ddDataVehicleGroupsBody = $('#ddslickVehicleGroupsBody').data("ddslick");
            var ajax_DdslickDealVehicleTypeBody = $('#ajax_DdslickDealVehicleTypeBody').ajaxCallWidget({
                proxy: '/Deal/DdslickGetDealVehicleTypeProxyService',
                type: "POST",
                failureLoadImage: true,
                loadingImageID: "loadingImage_DdslickDealVehicleTypeBody",
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                noDataFailureText: window.lang.translate("No data returned from service"),
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkVehicleGroupsDdList_sysvehiclegroups",
                    pkIdentity: $("#publicKey").val(),
                    project_id: parseInt($("#deal_hidden").deal("getDealID")),
                    vehicle_groups_id: parseInt(ddDataVehicleGroupsBody.selectedData.value)
                })

            });
            ajax_DdslickDealVehicleTypeBody.ajaxCallWidget({
                onSuccess: function (event, data) {
                    var data = $.parseJSON(data);
                    data.splice(0, 0,
                        { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                    );
                    $('#ddslickDealVehicleTypeBody').ddslick({
                        //height: 150,
                        data: data,
                        width: '100%',
                        onSelected: function (selectedData) {
                            if (selectedData.selectedData.value > 0) {
                                //vehicleKitTypeForDefineFields(selectedData.selectedData.text);
                            }
                        }
                    });
                    $("#loadingImage_DdslickDealVehicleTypeBody").loadImager('removeLoadImage');
                },
            })
            ajax_DdslickDealVehicleTypeBody.ajaxCallWidget('call');
        } else {
            /*$('#tab_VehicleType').loadImager('removeLoadImage');
            $('#tab_VehicleType').loadImager('appendImage');*/
            //alert("deal id < 0");
            $(window).warningMessage('resetOnShown');
            $(window).warningMessage('show', "Please select deal",
                "Please select deal");
        }


    };

    //----------------------------------dropdowns end-------------------------------------------------

    //----------------------------------add body proposal  begin-------------------------------------------------

    /**
     * loading image for add vehicle type process
     * */
    $('#loadingImage_BodyProposal').loadImager();

    /**
     * add body proposal form  reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetBodyProposalAddForm = function () {
        $('#addBodyPropForm').validationEngine('hide');
        $('#addBodyPropForm')[0].reset();
        $('#ddslickVehicleGroupsBodyProposal').ddslick("select", { index: '0' });
        $('#ddslickDealVehicleGroupProducts').ddslick("select", { index: '0' });

    }

    /**
     * add vehicle type form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addBodyPropForm").validationEngine();

    /**
     * add aksesuar click event handler
     * @author Mustafa Zeynel Dağlı
     * */
    $("#add_body_proposal").on("click", function (e) {
        e.preventDefault();
        $('#loadingImage_BodyProposal').loadImager('removeLoadImage');
        $("#loadingImage_BodyProposal").loadImager('appendImage');

        if ($("#addBodyPropForm").validationEngine('validate')) {
            var ddDataVehicleGroups = $('#ddslickVehicleGroupsBodyProposal').data('ddslick');
            if (!ddDataVehicleGroups.selectedData.value > 0) {
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select vehicle group"),
                    window.lang.translate("Please select vehicle group"));
                $('#loadingImage_BodyProposal').loadImager('removeLoadImage');
                return false;
            }

            var ddDataVehicleType = $('#ddslickDealVehicleGroupProducts').data('ddslick');
            /*if (!ddDataVehicleType.selectedData.value > 0) {
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select vehicle group product"),
                    window.lang.translate("Please select vehicle group product"));
                $('#loadingImage_BodyProposal').loadImager('removeLoadImage');
                return false;
            }*/
            var rows = $("#gridContainer_vehicle").dxDataGrid('getSelectedRowsData');

            var ajax = $('#add_body_proposal').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "loadingImage_BodyProposal",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                proxy: '/Deal/AddBodyProxyService',
                type: "POST",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkInsertAct_infoprojectvehiclemodels",
                    pkIdentity: $("#publicKey").val(),
                    project_id: dealID,
                    is_house_deal: 0,
                    vehicle_gt_model_id: ddDataVehicleType.selectedData.value,
                    quantity: $("#quantity").val(),
                    delivery_date: "10/10/2018",
                })

            });
            ajax.ajaxCallWidget({
                onReset: function (event, data) {
                    resetBodyProposalAddForm();
                },
                onAfterSuccess: function (event, data) {
                    
                }
            })
            //ajax.ajaxCallWidget('call');

        } else {
            $('#loadingImage_BodyProposal').loadImager('removeLoadImage');
        }


        return false;
    })

    // add aksesuar reset
    $("#add_bodyProposal_reset").on("click", function (e) {
        e.preventDefault();
        resetBodyProposalAddForm();
        return false;
    })

    //----------------------------------add  body proposal end-------------------------------------------------



})