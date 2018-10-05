/*
* Branch Form
* @author Gül Özdemir
* @since 03/09/2018
*/
$(document).ready(function () {

    "use strict";

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

    var cbdata_manbranchoffice = [
        {
            text: 'Search...',
            value: 1,
            selected: true
        },
        {
            text: "MAN Centurion",
            value: 2,
            selected: false
        },
        {
            text: "MAN RSA",
            value: 3,
            selected: false
        },
        {
            text: "Bloemfontein",
            value: 4,
            selected: false
        }
    ];


    $('#loading-image-manbranchoffice').loadImager('removeLoadImage');
    $("#loading-image-manbranchoffice").loadImager('appendImage');

    var ajaxACLResources_manbranchoffice = $('#ajaxACL-manbranchoffice').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_manbranchoffice.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-manbranchoffice').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('MANbranchoffice  bulunamamıştır...'), window.lang.translate('MANranchoffice  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownMANBranchOffice').ddslick({
                //height: 150,
                data: cbdata_manbranchoffice,
                width: '100%',

                onSelected: function (selectedData) {
                    //if (selectedData.selectedData.value > 0) {
                       
                    //}
                }
            });

            $("#loading-image-manbranchoffice").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-manbranchoffice').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('MAN Bayi bulunamamıştır...'), window.lang.translate('Man Bayi  bulunamamıştır...'));
        },
    })
    ajaxACLResources_manbranchoffice.ajaxCallWidget('call');

/*
    var cbdata_country = [
        {
            text: 'Search...',
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

*/
    $('#loading-image-country').loadImager('removeLoadImage');
    $("#loading-image-country").loadImager('appendImage');

    var ajaxACLResources_country = $('#ajaxACL-country').ajaxCallWidget({
        proxy: '/Sys/SysCountrys/',
        type: 'POST',
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
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, datacountry) {
            var cbdata_country = $.parseJSON(datacountry);
            cbdata_country.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#dropdownCountry').ddslick({
                //height: 150,
                data: cbdata_country,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {

                    $('#dropdownProvince').ddslick('destroy');

                    if (selectedData.selectedData.value > 0) {
                        //var provinceInfo = new ProvinceInfo;
                        //provinceInfo.country_id = selectedData.selectedData.value;
                        var country_id = selectedData.selectedData.value;
                        //country_id = "107";
                        //////////////////////////////////////////////////////////
                        //alert(country_id);

                        $('#loading-image-province').loadImager('removeLoadImage');
                        $("#loading-image-province").loadImager('appendImage');

                        var ajaxACLResources_getprovince = $('#ajaxACL-province').ajaxCallWidget({
                            proxy: '/Sys/SysCountryRegions',
                            type: 'GET',
                            data: {
                                "country_id": country_id //country_id,                              
                            },
                        });

                        ajaxACLResources_getprovince.ajaxCallWidget({
                            onError: function (event, textStatus, errorThrown) {

                                dm.dangerMessage({
                                    onShown: function () {
                                        $('#loading-image-province').loadImager('removeLoadImage');
                                    }
                                });
                                dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
                            },
                            onSuccess: function (event, dataprovince) {
                                var cbdata_province = $.parseJSON(dataprovince);

                                //alert(cbdata_province);
                                
                                $('#dropdownProvince').ddslick({
                                    //height: 150,
                                    data: cbdata_province,
                                    width: '100%',
                                    search: true,
                                    searchText: window.lang.translate('Search'),
                                    onSelected: function (selectedData) {

                                        $('#dropdownCity').ddslick('destroy');

                                        if (selectedData.selectedData.value > 0) {
                                            var province_id = selectedData.selectedData.value;
                                            //province_id = "1";
                                            //******************************************

                                            $('#loading-image-city').loadImager('removeLoadImage');
                                            $("#loading-image-city").loadImager('appendImage');

                                            var ajaxACLResources_getcity = $('#ajaxACL-city').ajaxCallWidget({
                                                proxy: '/Sys/SysCity',
                                                type: 'GET',
                                                data: {
                                                    "country_id": country_id,  //country_id, 
                                                    "region_id": province_id     //province_id 
                                                },
                                            });

                                            ajaxACLResources_getcity.ajaxCallWidget({
                                                onError: function (event, textStatus, errorThrown) {

                                                    dm.dangerMessage({
                                                        onShown: function () {
                                                            $('#loading-image-city').loadImager('removeLoadImage');
                                                        }
                                                    });
                                                    dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
                                                },
                                                onSuccess: function (event, datacity) {
                                                    var cbdata_city = $.parseJSON(datacity);
                                                    
                                                    $('#dropdownCity').ddslick({
                                                        data: cbdata_city,
                                                        width: '100%',
                                                        search: true,
                                                        searchText: window.lang.translate('Search'),
                                                        onSelected: function (selectedData) {
                                                            //if (selectedData.selectedData.value > 0) {


                                                            //}
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
                                                    dm.dangerMessage('show', window.lang.translate('City not found...'), window.lang.translate('Bölge  bulunamamıştır...'));
                                                },
                                            })
                                            ajaxACLResources_getcity.ajaxCallWidget('call');
                                            //******************************************
                                        }
                                    }
                                });

                                $("#loading-image-province").loadImager('removeLoadImage');
                            },
                            onErrorDataNull: function (event, data) {
                                console.log("Error : " + event + " -data :" + data);
                                dm.dangerMessage({
                                    onShown: function () {
                                        $('#loading-image-province').loadImager('removeLoadImage');
                                    }
                                });
                                dm.dangerMessage('show', window.lang.translate('Bölge bulunamamıştır...'), window.lang.translate('Bölge  bulunamamıştır...'));
                            },
                        })
                        ajaxACLResources_getprovince.ajaxCallWidget('call');


                        //////////////////////////////////////////////////////////

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
            dm.dangerMessage('show', window.lang.translate('Ülke bulunamamıştır...'), window.lang.translate('Ülke  bulunamamıştır...'));
        },
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
                    data: args,
                    type: 'POST',
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

                columns: [//"active",
                    //{
                    //    dataField: "active",
                    //    dataType: "boolean",
                    //    width: 110
                    //},

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
                 /*   {
                        caption: window.lang.translate('Delete'),
                        width: 40,
                        alignment: 'center',

                        cellTemplate: function (container, options) {
                            
                            var branch_id = options.data.id;

                            $("<div id='reportdelete' />").dxButton({
                                icon: 'trash',
                                onClick: function (e) {
                                    deleteBranch(branch_id);

                                }
                            }).appendTo(container);

                        }

                    },
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
                        dataField: "departman_name"
                    }, {
                        caption: window.lang.translate('Branch/Dealer name'),
                        dataField: "name"
                    }, {
                        caption: window.lang.translate('Branch/Dealer no'),
                        dataField: "branch_no"
                    }, {
                        caption: window.lang.translate('Address 1'),
                        dataField: "address1"
                    }, {
                        caption: window.lang.translate('Address 2'),
                        dataField: "address2"
                    }, {
                        caption: window.lang.translate('Address 3'),
                        dataField: "address3"
                    }, {
                        caption: window.lang.translate('Postal code'),
                        dataField: "postalcode"
                    }, {
                        caption: window.lang.translate('Country'),
                        dataField: "country_name"
                    }, {
                        caption: window.lang.translate('Province'),
                        dataField: "region_name"
                    }, {
                        caption: window.lang.translate('City'),
                        dataField: "city_name"
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
                    //e.cancel = true;
                    //Confirmasyon ile silme düzenlenecek...
                    var branch_id = e.key.id;
                    deleteBranch(branch_id);

                },
                onRowRemoved: function (e) {
                    
                },

            });
        });
    })
    

    $('#branchdealerList').click();

    /**
 * insertBranch
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 03/09/2018
 */

    window.insertBranch = function () {
        $("#loading-image-branch").loadImager('removeLoadImage');
        $("#loading-image-branch").loadImager('appendImage');

        var branch_name = $('#txt-branch-name').val();

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_sysbranch',
                
                name: branch_name,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Branch Ekleme İşlemi Başarısız...',
                    'Branch Ekleme İşlemi Başarısız..., sistem yöneticisi ile temasa geçiniz... ')
                console.error('"pkInsert_sysCustomerInfo" servis hatası->' + textStatus);
                $("#loading-image-branch").loadImager('removeLoadImage');
            },
            onSuccess: function (event, data) {
                console.log(data);
                //var mydata = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        $('#branchForm')[0].reset();

                        $("#loading-image-branch").loadImager('removeLoadImage');

                    }
                });
                sm.successMessage('show', 'Branch Kayıt İşlemi Başarılı...',
                    'Branch kayıt işlemini gerçekleştirdiniz... ',
                    data);
                $("#loading-image-branch").loadImager('removeLoadImage');

            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Branch Kayıt İşlemi Başarısız...',
                    'Branch kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysBranch" servis datası boştur!!');
                $("#loading-image-branch").loadImager('removeLoadImage');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Branch Kayıt İşlemi Başarısız...',
                    'Branch kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysBranch" servis datası boştur!!');
                $("#loading-image-branch").loadImager('removeLoadImage');
            },
            onError23503: function (event, data) {
                dm.dangerMessage('Error23503');
                $("#loading-image-branch").loadImager('removeLoadImage');
            },
            onError23505: function (event, data) {
                dm.dangerMessage({
                    onShown: function (event, data) {
                        $('#branchForm')[0].reset();
                        $("#loading-image-branch").loadImager('removeLoadImage');
                    }
                });
                dm.dangerMessage('show', 'Kayıt İşlemi Başarısız...',
                    'Aynı isim ile Marka kaydı yapılmıştır, yeni bir Marka kaydı deneyiniz... ');
                $("#loading-image-branch").loadImager('removeLoadImage');
            }
        })
        aj.ajaxCall('call');
    }
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
    * insert Branch Wrapper
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 03/09/2018
    */

    window.insertBranchWrapper = function (e) {
        e.preventDefault();

        if ($("#branchForm").validationEngine('validate')) {

            insertBranch();
        }
        return false;
    }


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
            onSuccess: function (event, data) {
                var data = $.parseJSON(data);

                //grid refresh
                //$('#branchdealerList').click();
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
            onSuccess: function (event, data) {
                var data = $.parseJSON(data);
                
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

