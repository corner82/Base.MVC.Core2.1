/*
* Supplier Form
* @author Gül Özdemir
* @since 23/10/2018
*/
$(document).ready(function () {

    "use strict";

    var selectedSupplierId = 0;

    var filldropdown = false;

    var ddslick_countryId = 0;
    var ddslick_country_name = "";
    var ddslick_provinceId = 0;
    var ddslick_province_name = "";
    var ddslick_cityId = 0;
    var ddslick_city_name = "";


    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Continue')
    });

 
    /*
    * Supplier LoadImager
    * @author Gül Özdemir
    * @since 03/09/2018
    */
    //to supplier form
    $("#loading-image-supplier").loadImager();

    $("#loading-image-country").loadImager();
    $("#loading-image-city").loadImager();
    $("#loading-image-province").loadImager();
    
    //to supplier form grid loading-image
    $("#loading-image-supplierGrid").loadImager();
    
    var langCode = $("#langCode").val();
    //alert(langCode);

    $('#supplierForm').validationEngine();


/*
* 
* Country, Province, City ddSlick
* Gül Özdemir
* 09/10/2018
*/
    $('#loading-image-country').loadImager('removeLoadImage');
    $("#loading-image-country").loadImager('appendImage');

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

                        $('#loading-image-province').loadImager('removeLoadImage');
                        $("#loading-image-province").loadImager('appendImage');

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

                                            $('#loading-image-city').loadImager('removeLoadImage');
                                            $("#loading-image-city").loadImager('appendImage');

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
                                                    if (filldropdown === true){
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

/**
* supplier List Refresh
* @returns 
* @author Gül Özdemir
* @since 03/09/2018
*/

    $('#supplierList').click(function () {

        /* devexgrid */
        var supplier_data = new DevExpress.data.CustomStore({
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
                    url: '/Sys/SysSupplierGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillSupplierDeffGridx_syssupplieresdealersdeff",
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
                    url: '/Sys/SysDeleteSupplier',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedSupplierId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_syssupplieresdealersdeff"
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
            $("#gridContainer_supplier").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: supplier_data,

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
                    fileName: window.lang.translate('SupplierList')
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
                     {
                        caption: window.lang.translate('Active/Passive'),
                        width: 40,
                        alignment: 'center',

                        cellTemplate: function (container, options) {
                            var fieldHtml;
                            var supplier_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveSupplier(supplier_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {
                                
                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveSupplier(supplier_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                    }, {
                        caption: window.lang.translate('Supplier name'),
                        dataField: "name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Supplier short name'),
                        dataField: "short_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Supplier embrace no'),
                        dataField: "embrace_no",
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
                        caption: window.lang.translate('Country'),
                        dataField: "country_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Province'),
                        dataField: "region_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('City'),
                        dataField: "city_name",
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
                        selectedSupplierId = data.id;
                        filldropdown = true;
                        fillSupplierForm(data);
                        
                    }
                },

                onRowRemoving: function (e) {
                    selectedSupplierId = e.key.id;
                    
                },

                onRowRemoved: function (e) {
                    $("#gridContainer_supplier").dxDataGrid("instance").refresh();
                },

            });
        });
    })
    

    $('#supplierList').click();

  
 /**
 * reset Supplier Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 23/10/2018
 */

    window.resetSupplierForm = function () {
        $("#loading-image-supplier").loadImager('removeLoadImage');
        $("#loading-image-supplier").loadImager('appendImage');

        selectedSupplierId = 0;

        ddslick_countryId = 0;
        ddslick_country_name = "";

        ddslick_provinceId = 0;
        ddslick_province_name = "";

        ddslick_cityId = 0;
        ddslick_city_name = "";

        $('#supplierForm').validationEngine('hide');

        $('#dropdownCountry').ddslick('select', { index: String(0) });

        $('#dropdownProvince').ddslick('destroy');
        $('#dropdownCity').ddslick('destroy');

        $("#loading-image-supplier").loadImager('removeLoadImage');
        return false;
    }

 /**
 * insert / Update Supplier Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 23/10/2018
 */

    $("#btn-supplier-save").on("click", function (e) {
        e.preventDefault();
        
        if ($("#supplierForm").validationEngine('validate')) {

            var supplierName = $('#txt-supplier-name').val();
            //alert(supplierName);
            //txt-embrace-no
            var supplierEmbraceNo = $('#txt-embrace-no').val();
            var address1 = $('#txt-supplier-address1').val();
            var address2 = $('#txt-supplier-address2').val();
            var address3 = $('#txt-suplier-address3').val();
            //txt-location-ptcode
            var postalCode = $('#txt-location-ptcode').val();
            var tel = $('#txt-supplier-tel').val();
            var fax = $('#txt-supplier-fax').val();
            var email = $('#txt-supplier-email').val();

            var ddData_Country = $('#dropdownCountry').data('ddslick');
            var countryId = ddData_Country.selectedData.value;

            var ddData_Province = $('#dropdownProvince').data('ddslick');
            var provinceId = ddData_Province.selectedData.value;

            var ddData_City = $('#dropdownCity').data('ddslick');
            var cityId = ddData_City.selectedData.value;

            //alert(selectedSupplierId);
            var ajax;
            if (selectedSupplierId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-supplier').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-supplier",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                    proxy: '/Sys/SysInsertSupplier',
                    type: "POST",
                    data: JSON.stringify({
                        url: "pkInsertAct_syssupplierdeff",
                        name: supplierName,
                        supplier_no: supplierEmbraceNo,
                        address1: address1,
                        address2: address2,
                        address3: address3,
                        postalcode: postalCode,
                        country_id: countryId,
                        country_region_id: provinceId,
                        city_id: cityId,
                        tel: tel,
                        fax: fax,
                        email: email,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_supplier").dxDataGrid("instance").refresh();
                        $("#loading-image-supplier").loadImager('removeLoadImage');
                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-supplier').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loading-image-supplier",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Sys/SysUpdateSupplier',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedSupplierId,
                                url: "pkUpdateAct_syssupplieresdealersdeff",
                                name: supplierName,
                                supplier_no: supplierEmbraceNo,
                                address1: address1,
                                address2: address2,
                                address3: address3,
                                postalcode: postalCode,
                                country_id: countryId,
                                country_region_id: provinceId,
                                city_id: cityId,
                                pk: "GsZVzEYe50uGgNM"
                            })
                        });

                        ajax.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#gridContainer_supplier").dxDataGrid("instance").refresh();
                                $("#loading-image-supplier").loadImager('removeLoadImage');
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Supplier is update! Are you ok?','Supplier is update! Are you sure?');
            }
        }
        return false;
            
    })

    /**
    * Fill Supplier form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 23/10/2018
    */

    window.fillSupplierForm = function (data) {
        $("#loading-image-supplier").loadImager('removeLoadImage');
        $("#loading-image-supplier").loadImager('appendImage');

        selectedSupplierId = data.id;

        document.getElementById("txt-supplier-name").value = data.name;
        document.getElementById("txt-embrace-no").value = data.supplier_no;

        document.getElementById("txt-supplier-address1").value = data.address1;
        document.getElementById("txt-supplier-address2").value = data.address2;
        document.getElementById("txt-supplier-address3").value = data.address3;
        document.getElementById("txt-location-ptcode").value = data.postalcode;

        ddslick_countryId = data.country_id;
        ddslick_country_name = data.country_name;

        ddslick_provinceId = data.country_region_id;
        ddslick_province_name = data.region_name;

        ddslick_cityId = data.city_id;
        ddslick_city_name = data.city_name;
        
        $('#dropdownCountry').ddslick('selectByValue',
            {
                index: data.country_id,
                value: data.country_name
            }
        );
      
        //province ve city otomatik tetikleniyor.
        
        
        $("#loading-image-supplier").loadImager('removeLoadImage');

        return false;
    }


    window.activepassiveSupplier = function (supplier_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //passive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassivesupplierlist = $('#ajaxACL-supplierlist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-suppliergrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Sys/SysActivePassiveSupplier',
            type: "POST",
            data: JSON.stringify({
                id: supplier_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syssupplierdeff"
            }),

        });
        ajax_activepassivesupplierlist.ajaxCallWidget({
            onReset: function (event, data) {
                
            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_supplier").dxDataGrid("instance").refresh();
                $("#loading-image-suppliergrid").loadImager('removeLoadImage');
            }
        })
        ajax_activepassivesupplierlist.ajaxCallWidget('call');     
    }
});

