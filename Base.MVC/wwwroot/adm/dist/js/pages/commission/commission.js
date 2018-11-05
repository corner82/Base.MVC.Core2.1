/*
* Commission Name Form
* @author Gül Özdemir
* @since 29/10/2018
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


    var selectedCommissionnameId = 0;

    /*
    * Commission LoadImager
    * @author Gül Özdemir
    * @since 13/08/2016
    */
    //to Commission form
    $("#loading-image-commissionname").loadImager();
    //to Commission form grid loading-image
    $("#loading-image-commissionnameGrid").loadImager();

    $("#loading-image-commissionname-1").loadImager();
    $("#loading-image-role").loadImager();
    $('#loading-image-commissioncondition-1').loadImager();

    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#commissionForm').validationEngine();

    $('#start-datetimepicker1').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });
    $('#start-datetimepicker2').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });
    $('#start-datetimepicker3').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });
    $('#start-datetimepicker4').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });
    $('#start-datetimepicker5').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });
    $('#start-datetimepicker6').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });
    $('#start-datetimepicker7').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });

    $('#finish-datetimepicker1').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });
    $('#finish-datetimepicker2').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });
    $('#finish-datetimepicker3').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });
    $('#finish-datetimepicker4').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });
    $('#finish-datetimepicker5').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });
    $('#finish-datetimepicker6').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });
    $('#finish-datetimepicker7').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });
    //////////////////////////////////////////////////////////////////////////////////////////////
    /**
    * CommissionName ddSlick
    * @returns 
    * @author Gül Özdemir
    * @since 31/10/2018
    */
    $('#loading-image-commissionname-1').loadImager('removeLoadImage');
    $('#loading-image-commissionname-1').loadImager('appendImage');

    var ajaxACLResources_commissionname = $('#ajaxACL-commissionname').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-commissionname-1",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error (pkCommissionDefinitionsDdList_syscommissiondefinitions)"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkCommissionDefinitionsDdList_syscommissiondefinitions)"),
        proxy: '/Commission/CommissionNameDdslick/',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCommissionDefinitionsDdList_syscommissiondefinitions"
            //pkIdentity: $("#publicKey").val()
        })
    });

    ajaxACLResources_commissionname.ajaxCallWidget({
        onSuccess: function (event, datacommissionname) {
            var cbdata_commissionname = $.parseJSON(datacommissionname);
            cbdata_commissionname.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: true, description: "" }
            );

            console.log(cbdata_commissionname);

            $('#dropdownCommissionName1').ddslick({
                data: cbdata_commissionname,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    /*
                    if (selectedData.selectedData.value > 0) {

                    } else {

                    }
                    */
                }
            });

            $('#dropdownCommissionName2').ddslick({
                data: cbdata_commissionname,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    /*
                    if (selectedData.selectedData.value > 0) {

                    } else {

                    }
                    */
                }
            });

            $('#dropdownCommissionName3').ddslick({
                data: cbdata_commissionname,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    /*
                    if (selectedData.selectedData.value > 0) {

                    } else {

                    }
                    */
                }
            });

            $('#dropdownCommissionName4').ddslick({
                data: cbdata_commissionname,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    /*
                    if (selectedData.selectedData.value > 0) {

                    } else {

                    }
                    */
                }
            });

            $('#dropdownCommissionName5').ddslick({
                data: cbdata_commissionname,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    /*
                    if (selectedData.selectedData.value > 0) {

                    } else {

                    }
                    */
                }
            });

            $('#dropdownCommissionName6').ddslick({
                data: cbdata_commissionname,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    /*
                    if (selectedData.selectedData.value > 0) {

                    } else {

                    }
                    */
                }
            });

            $('#dropdownCommissionName7').ddslick({
                data: cbdata_commissionname,
                width: '100%',
                search: true,
                searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    /*
                    if (selectedData.selectedData.value > 0) {

                    } else {

                    }
                    */
                }
            });
            $("#loading-image-commissionname-1").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-commissionname-1").loadImager('removeLoadImage');
        },
        onError: function (event, data) {
            alert("hata");
        }

    })
    ajaxACLResources_commissionname.ajaxCallWidget('call');


    /**
 * Commision condition
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 30/10/2018
 */
     //Komisyon şartı / Commision condition
    //per vehicle
    //monthly
    //quarter
    //yearly   
    var cbdata_commisioncondition = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 0,
            selected: true
        },
        {
            text: "Per vehicle",
            value: 1,
            selected: false
        },
        {
            text: "Monthly",
            value: 2,
            selected: false
        },
        {
            text: "Quarter",
            value: 3,
            selected: false
        },
        {
            text: "Yearly",
            value: 4,
            selected: false
        }
    ];

    $('#loading-image-commissioncondition-1').loadImager('removeLoadImage');
    $("#loading-image-commissioncondition-1").loadImager('appendImage');

    $('#dropdownCommissionCondition1').ddslick({
        data: cbdata_commisioncondition,
        width: '100%',

        onSelected: function (selectedData) {
            if (selectedData.selectedData.value > 1) {
            }
        }
    });

    $('#dropdownCommissionCondition2').ddslick({
        data: cbdata_commisioncondition,
        width: '100%',

        onSelected: function (selectedData) {
            if (selectedData.selectedData.value > 1) {
            }
        }
    });

    $('#dropdownCommissionCondition3').ddslick({
        data: cbdata_commisioncondition,
        width: '100%',

        onSelected: function (selectedData) {
            if (selectedData.selectedData.value > 1) {
            }
        }
    });

    $('#dropdownCommissionCondition4').ddslick({
        data: cbdata_commisioncondition,
        width: '100%',

        onSelected: function (selectedData) {
            if (selectedData.selectedData.value > 1) {
            }
        }
    });

    $('#dropdownCommissionCondition5').ddslick({
        data: cbdata_commisioncondition,
        width: '100%',

        onSelected: function (selectedData) {
            if (selectedData.selectedData.value > 1) {
            }
        }
    });

    $('#dropdownCommissionCondition6').ddslick({
        data: cbdata_commisioncondition,
        width: '100%',

        onSelected: function (selectedData) {
            if (selectedData.selectedData.value > 1) {
            }
        }
    });

    $('#dropdownCommissionCondition7').ddslick({
        data: cbdata_commisioncondition,
        width: '100%',

        onSelected: function (selectedData) {
            if (selectedData.selectedData.value > 1) {
            }
        }
    });
    $('#loading-image-commissioncondition-1').loadImager('removeLoadImage');

    //////////////////////////////////////////////////////////////////////////////////////////////
    /**
    * commissionList1 Refresh
    * @returns 
    * @author Gül Özdemir
    * @since 29/10/2018
    */

    $('#commissionList1').click(function () {

        /* devexgrid */
        var commissionname_data = new DevExpress.data.CustomStore({
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
                    url: '/Commission/CommissionNameGridList',
                    dataType: "json",
                    data: JSON.stringify({
                        language_code: $("#langCode").val(),
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkFillCommissionDefinitionsGridx_syscommissiondefinitions",
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
                    url: '/Commission/DeleteCommissionName',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedCommissionnameId,
                        pk: "GsZVzEYe50uGgNM",
                        url: "pkDeletedAct_syscommissiondefinition"
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

        //DevExpress.localization.locale(langCode);

        $(function () {
            $("#gridContainer_commissionname").dxDataGrid({

                showColumnLines: true,

                showRowLines: true,

                showBorders: true,

                dataSource: commissionname_data,

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
                    fileName: window.lang.translate('CommissionNameList')
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
                            var commissionname_id = options.data.id;

                            if (options.data.active === 1) {
                                //active
                                $('<div />').addClass('dx-link').attr('class', "fa fa-minus-square fa-2x").on('click', function () {
                                    activepassiveCommissionName(commissionname_id, options.data.active);

                                }).appendTo(container);
                            } else if (options.data.active === 0) {

                                //passive
                                $('<div />').addClass('dx-link').attr('class', "fa fa-check-square fa-2x").on('click', function () {
                                    activepassiveCommissionName(commissionname_id, options.data.active);

                                }).appendTo(container);
                            }

                            //$('<img />').addClass('dx-link').attr('src', "/adm/dist/img/icons.png").on('click', function () {
                            //    dm.dangerMessage('show', window.lang.translate('dangerMessage...'), window.lang.translate('dangerMessage...'));
                            //}).appendTo(container); 

                        }

                    }, {
                        caption: window.lang.translate('Role name'),
                        dataField: "role_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Commission name'),
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
                        selectedCommissionnameId = data.id;

                        fillCommissionNameForm(data);

                    }
                },

                onRowRemoving: function (e) {
                    selectedCommissionnameId = e.key.id;

                },

                onRowRemoved: function (e) {
                    $("#gridContainer_commissionname").dxDataGrid("instance").refresh();
                },

            });
        });
    })

    $('#commissionnameList').click();

    /**
     * Insert CommissionName
     * @returns {undefined}
     * @author Gül Özdemir
     * @since 24/10/2018
     */

    $("#btn-commissionname-save").on("click", function (e) {
        e.preventDefault();

        if ($("#commissionnameForm").validationEngine('validate')) {

            $("#loading-image-commissionname").loadImager('removeLoadImage');
            $("#loading-image-commissionname").loadImager('appendImage');

            var commission_name = $('#txt-commission-name').val();

            var ddData_role = $('#dropdownRole').data('ddslick')
            var role_id = ddData_role.selectedData.value;

            var ajax;
            if (selectedCommissionnameId === 0) {
                //alert("yeni kayıt");
                //Yeni kayıt
                ajax = $('#ajaxACL-commissionname').ajaxCallWidget({
                    failureLoadImage: true,
                    loadingImageID: "loading-image-commissionname",
                    triggerSuccessAuto: true,
                    transactionSuccessText: window.lang.translate('Transaction successful'),
                    transactionFailureText: window.lang.translate("Service URL not found, please report error (pkInsertAct_syscommissiondefinitions)"),
                    dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkInsertAct_syscommissiondefinitions)"),
                    proxy: '/Commission/InsertCommissionName',
                    type: "POST",
                    data: JSON.stringify({
                        url: "pkInsertAct_syscommissiondefinitions",
                        role_id: role_id,
                        name: commission_name,
                        pk: "GsZVzEYe50uGgNM"
                    })
                });

                ajax.ajaxCallWidget({
                    onReset: function (event, data) {

                    },
                    onAfterSuccess: function (event, data) {
                        $("#gridContainer_commissionname").dxDataGrid("instance").refresh();
                        $("#loadingImage_commissionname").loadImager('removeLoadImage');
                        resetCommissionNameForm();

                    }
                })
                ajax.ajaxCallWidget('call');

            } else {
                //update
                //alert("update");

                wcm.warningComplexMessage({
                    onConfirm: function (event, data) {
                        ajax = $('#ajaxACL-commissionname').ajaxCallWidget({
                            failureLoadImage: true,
                            loadingImageID: "loading-image-commissionname",
                            triggerSuccessAuto: true,
                            transactionSuccessText: window.lang.translate('Transaction successful'),
                            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateAct_syscommissiondefinitions)"),
                            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateAct_syscommissiondefinitions)"),
                            proxy: '/Accessory/UpdateCommissionName',
                            type: "POST",
                            data: JSON.stringify({
                                id: selectedCommissionnameId,
                                url: "pkUpdateAct_syscommissiondefinitions",
                                role_id: role_id,
                                name: commission_name,
                                pk: "GsZVzEYe50uGgNM"
                            })
                        });

                        ajax.ajaxCallWidget({
                            onReset: function (event, data) {

                            },
                            onAfterSuccess: function (event, data) {
                                $("#gridContainer_commissionname").dxDataGrid("instance").refresh();
                                $("#loadingImage_commissionname").loadImager('removeLoadImage');
                                resetCommissionNameForm();
                            }
                        })
                        ajax.ajaxCallWidget('call');
                    }
                });
                wcm.warningComplexMessage('show', 'Commission data will be updated, do you want to proceed?', 'Commission data will be updated, do you want to proceed?');
            }
        }
        return false;

    })

    /**
    * reset Commission Name Form
    * @returns {undefined}
    * @author Gül Özdemir
    * @since 29/10/2018
    */

    window.resetCommissionNameForm = function () {
        $("#loading-image-commissionname").loadImager('removeLoadImage');
        $("#loading-image-commissionname").loadImager('appendImage');

        selectedCommissionnameId = 0;
        $('#commissionnameForm').validationEngine('hide');
        document.getElementById("txt-commission-name").value = "";

        $('#dropdownRole').ddslick('select', { index: String(0) });

        $("#loading-image-commissionname").loadImager('removeLoadImage');

        //yeni kayda açık, tablar kapatılıyor
        tab_disable();

        return false;
    }


    /**
    * Fill Commission Name form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 13/09/2018
    */

    window.fillCommissionNameForm = function (data) {
        $("#loading-image-commissionname").loadImager('removeLoadImage');
        $("#loading-image-commissionname").loadImager('appendImage');

        document.getElementById("txt-commission-name").value = data.name;

        if (data.role_id) {
            $('#dropdownRole').ddslick('selectByValue',
                {
                    index: data.role_id,
                    value: data.role_name
                }
            );
        } else {
            $('#dropdownRole').ddslick('select', { index: String(0) });
        }
        
        $("#loading-image-commissionname").loadImager('removeLoadImage');

        return false;
    }


    window.activepassiveCommissionName = function (commissionname_id, active) {
        $("#loading-image-commissionnameGrid").loadImager('removeLoadImage');
        $("#loading-image-commissionnameGrid").loadImager('appendImage');

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //pasive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        var ajax_activepassivecommissionnamelist = $('#ajaxACL-commissionnamelist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-commissionnameGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error (pkUpdateMakeActiveOrPassive_syscommissiondefinitions)"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data (pkUpdateMakeActiveOrPassive_syscommissiondefinitions)"),
            proxy: '/Commission/ActivePassiveCommissionName',
            type: "POST",
            data: JSON.stringify({
                id: commissionname_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_syscommissiondefinitions"
            }),

        });
        ajax_activepassivecommissionnamelist.ajaxCallWidget({
            onReset: function (event, data) {
            },
            onSuccess: function (event, data) {
            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_commissionname").dxDataGrid("instance").refresh();
                $("#loading-image-commissionnameGrid").loadImager('removeLoadImage');
            }
        })
        ajax_activepassivecommissionnamelist.ajaxCallWidget('call');

    }


});

