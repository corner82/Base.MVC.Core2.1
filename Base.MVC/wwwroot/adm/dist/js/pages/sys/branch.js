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

    var selectedMANBranchId;
    var selectedMANBranchName;
    

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });


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

                        var countryId = selectedData.selectedData.value;

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
                                country_id: countryId
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

                                            var provinceId = selectedData.selectedData.value;
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
                                                    country_id: countryId,
                                                    region_id: provinceId
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
                                                        
                                                    })
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
                            },
                            onAfterSuccess: function (event, data) {
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
                    timeout: 10000
                });

                return deferred.promise();
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

                /*
                 $("<div id='reportdelete' />").dxButton({
                                    icon: 'trash',
                                    onClick: function (e) {
                                         var grid = $("#gridContainer").dxDataGrid("instance");
                                        var rowIndex = options.rowIndex;
                                        $.ajax({.......,
                                               success: function(result){
                                                // send a custom request here
                                                $("#gridContainer").dxDataGrid("instance").refresh(); // rebind the grid
                                        })
                                    }
}).appendTo(container);
                 */
                 
                    {
                        caption: window.lang.translate('Active/Pasive'),
                        width: 40,
                        alignment: 'center',

                        cellTemplate: function (container, options) {
                            var fieldHtml;
                            var branch_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepasiveBranch(branch_id);
                                    dm.successMessage('show', window.lang.translate('Active success message...'), window.lang.translate('Active success message...'));
                                }).appendTo(container);
                            } else if (options.data.active === 0) {
                                
                                //pasive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepasiveBranch(branch_id);
                                    dm.successMessage('show', window.lang.translate('Pasive success message...'), window.lang.translate('Pasive success message...'));
                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                        //dataField: "active"
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
                        fillBranchForm(data);
                    }
                },

                onRowRemoving: function (e) {

                    $(function (confirmed) {
                        if (confirmed) {
                            //Delete Yes
                            e.Cancel = true;
                            var branch_id = e.key.id;
                            deleteBranch(branch_id);

                        }
                        else {
                            //Delete No

                        }
                    })
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

        $('#branchForm').validationEngine('hide');
        $('#dropdownMANBranchOffice').ddslick('select', { index: String(0) });
        $('#dropdownCountry').ddslick('select', { index: String(0) });
        $('#dropdownCity').ddslick('select', { index: String(0) });
        $('#dropdownProvince').ddslick('select', { index: String(0) });

        $("#loading-image-branch").loadImager('removeLoadImage');

        return false;
    }

 /**
 * insert Branch Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 03/09/2018
 */

    $("#btn-branch-save").on("click", function (e) {
        e.preventDefault();
        
        if ($("#branchForm").validationEngine('validate')) {

            $("#loading-image-branch").loadImager('removeLoadImage');
            $("#loading-image-branch").loadImager('appendImage');

            var branchName = $('#txt-branch-name').val();
            alert(branchName);
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

            var ajax = $('#ajaxACL-branch').ajaxCallWidget({
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
                    $("#gridContainer_branch").dxDataGrid("instance").refresh();
                },
            })
            ajax.ajaxCallWidget('call');
            return false;
        }
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
        //"address1": "213123 street", "address2": "no 11", "address3": "etlik", "postalcode": "06010", 
        //"country_name": "South Africa", "region_name": "Eastern Cape", "city_name": "Graaff-Reinet", 
        //"departman_name": "Middelburg", "country_id": 107, "country_region_id": 9, "city_id": 158, "sis_department_id": 45, "op_username": "mustafa.zeynel.admin@ostim.com.tr", 
        //"state_active": "Active", "date_saved": "2018-10-04 16:41:42", "date_modified": null, "language_code": "en", 
        //"active": 0, "op_user_id": 16, "language_id": "385", "language_name": "English"

    window.fillBranchForm = function (data) {
        $("#loading-image-branch").loadImager('removeLoadImage');
        $("#loading-image-branch").loadImager('appendImage');

        document.getElementById("txt-branch-name").value = data.name;
        document.getElementById("txt-embrace-no").value = data.branch_no;
        document.getElementById("txt-branch-address1").value = data.address1;
        document.getElementById("txt-branch-address2").value = data.address2;
        document.getElementById("txt-branch-address3").value = data.address3;
        document.getElementById("txt-location-ptcode").value = data.postalcode;
        //active
        //checkbox-branch-active

        //$('#dropdownMANBranchOffice').ddslick('select', { index: 1 });
        $('#dropdownMANBranchOffice').ddslick('selectByValue',
            {
                index: '' + data.sis_department_id + '',
                text: '' + data.departman_name + ''
            }
        );

        $('#dropdownCountry').ddslick('selectByValue',
            {
                index: '' + data.country_id + '',
                text: '' + data.country_name + ''
            }
        );
        $('#dropdownProvince').ddslick('selectByValue',
            {
                index: '' + data.region_id + '',
                text: '' + data.region_name + ''
            }
        );
        $('#dropdownCity').ddslick('selectByValue',
            {
                index: '' + data.city_id + '',
                text: '' + data.city_name + ''
            }
        );

        $("#loading-image-branch").loadImager('removeLoadImage');

        return false;
    }

    window.deleteBranch = function (branch_id) {
        $("#loading-image-branchgrid").loadImager('removeLoadImage');
        $("#loading-image-branchgrid").loadImager('appendImage');

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkDeletedAct_sysbranchesdealersdeff&id=29&pk=GsZVzEYe50uGgNM

        var ajax_deletebranchlist = $('#ajaxACL-branchlist').ajaxCallWidget({
            proxy: '/Sys/SysDeleteBranch',
            data: JSON.stringify({
                id: branch_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkDeletedAct_sysbranchesdealersdeff"           
            }),
            type: "POST"

        });
        ajax_deletebranchlist.ajaxCallWidget({
            onError: function (event, textStatus, errorThrown) {

                $(window).dangerMessage({
                    onShown: function () {
                        $('#loading-image-branchgrid').loadImager('removeLoadImage');
                    }
                });
                $(window).dangerMessage('show', window.lang.translate('yyyyyyyyyyyyyyyy...'), window.lang.translate('yyyyyyyyyyyyyyyyyyyy...'));
            },
            onSuccess: function (event, mydata) {

                $("#gridContainer_branch").dxDataGrid("instance").refresh();

                $("#loading-image-branchgrid").loadImager('removeLoadImage');
            },
            onErrorDataNull: function (event, data) {
                console.log("Error : " + event + " -data :" + data);
                $(window).dangerMessage({
                    onShown: function () {
                        $('#loading-image-branchgrid').loadImager('removeLoadImage');
                    }
                });
                $(window).dangerMessage('show', window.lang.translate('xxxxxxxxxxx'), window.lang.translate('xxxxxxxxxxxxxxxxxx...'));
            },
        })
        ajax_deletebranchlist.ajaxCallWidget('call');

       
    }


    window.activepasiveBranch = function (branch_id) {
        $("#loading-image-branchgrid").loadImager('removeLoadImage');
        $("#loading-image-branchgrid").loadImager('appendImage');

        //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkUpdateMakeActiveOrPassive_sysbranchesdealersdeff&id=29&pk=GsZVzEYe50uGgNM

        var ajax_activepasivebranchlist = $('#ajaxACL-branchlist').ajaxCallWidget({
            proxy: '/Sys/SysActivePasiveBranch',
            data: JSON.stringify({
                id: branch_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_sysbranchesdealersdeff"
            }),
            type: "POST"

        });
        ajax_activepasivebranchlist.ajaxCallWidget({
            onError: function (event, textStatus, errorThrown) {

                $(window).dangerMessage({
                    onShown: function () {
                        $('#loading-image-branchgrid').loadImager('removeLoadImage');
                    }
                });
                $(window).dangerMessage('show', window.lang.translate('yyyyyyyyyyyyyyyy...'), window.lang.translate('yyyyyyyyyyyyyyyyyyyy...'));
            },
            onSuccess: function (event, mydata) {
                var data = $.parseJSON(mydata);
                
                //grid refresh
                //$('#branchdealerList').click();
                $("#gridContainer_branch").dxDataGrid("instance").refresh();

                $("#loading-image-branchgrid").loadImager('removeLoadImage');
                //$(window).successMessage('show', window.lang.translate('Active/Pasive Ok.'), window.lang.translate('Active/Pasive Ok.'));
        
            },
            onErrorDataNull: function (event, data) {
                console.log("Error : " + event + " -data :" + data);
                $(window).dangerMessage({
                    onShown: function () {
                        $('#loading-image-branchgrid').loadImager('removeLoadImage');
                    }
                });
                $(window).dangerMessage('show', window.lang.translate('xxxxxxxxxxx'), window.lang.translate('xxxxxxxxxxxxxxxxxx...'));
            },
        })
        ajax_activepasivebranchlist.ajaxCallWidget('call');


    }
});

