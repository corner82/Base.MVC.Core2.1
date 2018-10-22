/*
* Branch Form
* @author Gül Özdemir
* @since 03/09/2018
*/
$(document).ready(function () {

    "use strict";

    //var selectedNode;
    //var selectedRoot;
    //var selectedItem;
    var selectedBranchId = 0;
    var selectedMANBranchId;
    var selectedMANBranchName;
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

 //tree extend method
    $.extend($.fn.tree.methods,{
            unselect: function(jq,target){
		return jq.each(function(){
			var opts = $(this).tree('options');
        $(target).removeClass('tree-node-selected');
			if (opts.onUnselect){
            opts.onUnselect.call(this, $(this).tree('getNode', target));
        }
        });
        }
    });

//tree extend method
    $.extend($.fn.tree.methods, {
        getRoot: function (jq, nodeEl) {
            if (nodeEl) {
                var target = nodeEl;
                var p = jq.tree('getParent', target);
                while (p) {
                    target = p.target;
                    p = jq.tree('getParent', p.target);
                }
                return jq.tree('getNode', target);
            } else {
                var roots = jq.tree('getRoots');
                return roots.length ? roots[0] : null;
            }
        }
    })
    /*
    * Branch LoadImager
    * @author Gül Özdemir
    * @since 03/09/2018
    */
    //to branch form
    $("#loading-image-branch").loadImager();

    $("#loading-image-country").loadImager();
    $("#loading-image-city").loadImager();
    $("#loading-image-province").loadImager();
    $("#loading-image-manbranchoffice").loadImager();
    //to branch form grid loading-image
    $("#loading-image-branchGrid").loadImager();
    
    var langCode = $("#langCode").val();
    //alert(langCode);

    $('#branchForm').validationEngine();

/*
* 
* manbranchoffice tree
* Gül Özdemir
* 05/10/2018
*/
    
    $('#loading-image-manbranchoffice').loadImager('removeLoadImage');
    $("#loading-image-manbranchoffice").loadImager('appendImage');

    $('#tree_manbranchoffice').tree({
        animate: true,
        checkbox: false,
        cascadeCheck: false,
        lines: true,
        method: 'GET',
        url: '/Sys/SysBranchDealerManOfficeTreeList',
        formatter: function (node) {
            var s = node.text;
            var id = node.id;
            //s += '  (' + node.attributes.name_tr + ')';
            return s;
        },
        onLoadSuccess: function (node, data) { 
            $.parser.parse($(this));
            $('#loading-image-manbranchoffice').loadImager('removeLoadImage');
        },
        onLoadError: function () {
            alert("tree error on load");
        },

        onClick: function (node) {
            //selectedNode = node;
            //selectedRoot = $(this).tree('getRoot', node.target);
            var selectedItem = $(this).tree('getData', node.target);

            console.log(selectedItem);
            //console.log(selectedItem.id);
            //console.log(selectedItem.text);

            selectedMANBranchId = selectedItem.id;
            selectedMANBranchName = selectedItem.text;
        },
 
    })



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
*.branch/dealer List Refresh
* @returns 
* @author Gül Özdemir
* @since 03/09/2018
*/

    $('#branchdealerList').click(function () {

        /* devexgrid */
        var branchdealer_data = new DevExpress.data.CustomStore({
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
                    url: '/Sys/SysBranchDealerGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillBranchesDealersDeffGridx_sysbranchesdealersdeff",
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
                    url: '/Sys/SysDeleteBranch',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedBranchId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_sysbranchesdealersdeff"
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
            $("#gridContainer_branch").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: branchdealer_data,

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
                    fileName: window.lang.translate('Branch/DealerList')
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
                            var branch_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveBranch(branch_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {
                                
                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveBranch(branch_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                    }, {
                        caption: window.lang.translate('MAN Branch/Dealer office'),
                        dataField: "departman_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Branch/Dealer name'),
                        dataField: "name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Branch/Dealer no'),
                        dataField: "branch_no",
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
                        selectedBranchId = data.id;
                        filldropdown = true;
                        fillBranchForm(data);
                        //filldropdown = false;
                    }
                },

                onRowRemoving: function (e) {
                    selectedBranchId = e.key.id;
                    //alert(selectedBranchId);
                },

                onRowRemoved: function (e) {
                    $("#gridContainer_branch").dxDataGrid("instance").refresh();
                },

            });
        });
    })
    

    $('#branchdealerList').click();

  
 /**
 * reset Branch Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 03/09/2018
 */

    window.resetBranchForm = function () {
        $("#loading-image-branch").loadImager('removeLoadImage');
        $("#loading-image-branch").loadImager('appendImage');

        selectedBranchId = 0;

        ddslick_countryId = 0;
        ddslick_country_name = "";

        ddslick_provinceId = 0;
        ddslick_province_name = "";

        ddslick_cityId = 0;
        ddslick_city_name = "";

        $('#branchForm').validationEngine('hide');

        $('#dropdownCountry').ddslick('select', { index: String(0) });

        $('#dropdownProvince').ddslick('destroy');
        $('#dropdownCity').ddslick('destroy');

        var node = $('#tree_manbranchoffice').tree('getSelected');
        if (node) {
            $('#tree_manbranchoffice').tree('unselect', node.target);
        }
        $('#tree_manbranchoffice').tree('collapseAll');
        $("#loading-image-branch").loadImager('removeLoadImage');
        return false;
    }

 /**
 * insert / Update Branch Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 03/09/2018
 */

    $("#btn-branch-save").on("click", function (e) {
        e.preventDefault();
        
        if ($("#branchForm").validationEngine('validate')) {

            var branchName = $('#txt-branch-name').val();
            //alert(branchName);
            //txt-embrace-no
            var branchEmbraceNo = $('#txt-embrace-no').val();
            var address1 = $('#txt-branch-address1').val();
            var address2 = $('#txt-branch-address2').val();
            var address3 = $('#txt-branch-address3').val();
            //txt-location-ptcode
            var postalCode = $('#txt-location-ptcode').val();

            var ddData_Country = $('#dropdownCountry').data('ddslick');
            var countryId = ddData_Country.selectedData.value;

            var ddData_Province = $('#dropdownProvince').data('ddslick');
            var provinceId = ddData_Province.selectedData.value;

            var ddData_City = $('#dropdownCity').data('ddslick');
            var cityId = ddData_City.selectedData.value;

            var selectedManBranchId = 0;
            var node = $('#tree_manbranchoffice').tree('getSelected');
            if (node) {
                selectedManBranchId = node.target;
            }

            //alert(selectedBranchId); 
            var ajax;
            if (selectedBranchId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-branch').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-branch",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                    proxy: '/Sys/SysInsertBranch',
                    type: "POST",
                    data: JSON.stringify({
                        url: "pkInsertAct_sysbranchesdealersdeff",
                        name: branchName,
                        branch_no: branchEmbraceNo,
                        address1: address1,
                        address2: address2,
                        address3: address3,
                        postalcode: postalCode,
                        country_id: countryId,
                        country_region_id: provinceId,
                        city_id: cityId,
                        sis_department_id: selectedMANBranchId,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_branch").dxDataGrid("instance").refresh();
                        $("#loading-image-branch").loadImager('removeLoadImage');
                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-branch').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loading-image-branch",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                            proxy: '/Sys/SysUpdateBranch',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedBranchId,
                                url: "pkUpdateAct_sysbranchesdealersdeff",
                                name: branchName,
                                branch_no: branchEmbraceNo,
                                address1: address1,
                                address2: address2,
                                address3: address3,
                                postalcode: postalCode,
                                country_id: countryId,
                                country_region_id: provinceId,
                                city_id: cityId,
                                sis_department_id: selectedMANBranchId,
                                pk: "GsZVzEYe50uGgNM"
                            })
                        });

                        ajax.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#gridContainer_branch").dxDataGrid("instance").refresh();
                                $("#loading-image-branch").loadImager('removeLoadImage');
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Branch is update! Are you ok?','Branch is update! Are you sure?');
            }
        }
        return false;
            
    })

    /**
    * Fill Branch form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 03/09/2018
    */

        //{"id":"14","apid":14,
        //"name": "asd,",
        //"branch_no": "e345fert", 
        //"address1": "213123 street", "address2": "no 11", "address3": "etlik", "postalcode": "0601fillBranchForm0",
        //"country_name": "South Africa", "region_name": "Eastern Cape", "city_name": "Graaff-Reinet", 
        //"departman_name": "Middelburg", "country_id": 107, "country_region_id": 9, "city_id": 158, "sis_department_id": 45, "op_username": "mustafa.zeynel.admin@ostim.com.tr", 
        //"state_active": "Active", "date_saved": "2018-10-04 16:41:42", "date_modified": null, "language_code": "en", 
        //"active": 0, "op_user_id": 16, "language_id": "385", "language_name": "English"

    window.fillBranchForm = function (data) {
        $("#loading-image-branch").loadImager('removeLoadImage');
        $("#loading-image-branch").loadImager('appendImage');

        selectedBranchId = data.id;

        document.getElementById("txt-branch-name").value = data.name;
        document.getElementById("txt-embrace-no").value = data.branch_no;

        document.getElementById("txt-branch-address1").value = data.address1;
        document.getElementById("txt-branch-address2").value = data.address2;
        document.getElementById("txt-branch-address3").value = data.address3;
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

        //tree select
        //$('#tree_manbranchoffice').tree('expandAll');
        var node = $('#tree_manbranchoffice').tree('find', data.sis_department_id);
        //alert(data.sis_department_id);
        if (node) {
            //alert("buldum");

            var parentnode = $('#tree_manbranchoffice').tree('getParent', node.target);
            //alert(parentnode);

            var lastparentnode;
            while (parentnode) {
                //alert(parentnode.target);
                $('#tree_manbranchoffice').tree('expand', parentnode.target);
                lastparentnode = parentnode;
                parentnode = $('#tree_manbranchoffice').tree('getParent', lastparentnode.target);
            }

            $('#tree_manbranchoffice').tree('select', node.target);
            selectedMANBranchId = data.sis_department_id;

        } else {
            var node = $('#tree_manbranchoffice').tree('getSelected');
            if (node) {
                $('#tree_manbranchoffice').tree('unselect', node.target);
            }
        } 
        
        $("#loading-image-branch").loadImager('removeLoadImage');

        return false;
    }


    window.activepassiveBranch = function (branch_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //passive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassivebranchlist = $('#ajaxACL-branchlist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-branchgrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Sys/SysActivePassiveBranch',
            type: "POST",
            data: JSON.stringify({
                id: branch_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysbranchesdealersdeff"
            }),

        });
        ajax_activepassivebranchlist.ajaxCallWidget({
            onReset: function (event, data) {
                
            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_branch").dxDataGrid("instance").refresh();
                $("#loading-image-branchgrid").loadImager('removeLoadImage');
            }
        })
        ajax_activepassivebranchlist.ajaxCallWidget('call');     

    }
});

