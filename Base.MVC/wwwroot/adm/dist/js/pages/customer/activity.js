/*
* Activity Form
* @author Gül Özdemir
* @since 10/09/2018
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

    var selectedCustomerId=0;

    /*
    * Activity LoadImager
    * @author Gül Özdemir
    * @since 10/09/2018
    */
    //to activity form
    $("#loading-image-activity").loadImager();

    $("#loading-image-customername").loadImager();
    $("#loading-image-contactperson").loadImager();
    $("#loading-image-activitytype").loadImager();
    $("#loading-image-activitystatus").loadImager();
    $("#loading-image-activityplaned").loadImager();
    $("#loading-image-segment").loadImager();
    $("#loading-image-concernedvehicletype").loadImager();
    $("#loading-image-activitytrackingtype").loadImager();
    $('#loading-image-activityplaned').loadImager();

    //to activity form grid loading-image
    $("#loading-image-activityGrid").loadImager();
   
    var langCode = $("#langCode").val();
    //alert(langCode);


    $('#activityForm').validationEngine();

    $('#activity-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });

    $('#activity-tracking-datepicker').datepicker({
        //autoclose: true,
        locale: langCode,
        format: 'yyyy/mm/dd'
    });


    /**
     * ddslick customer dropdown and contact person dropdown
     * @author Gül Özdemir
     * @since 19/10/2018
     */

    var ajax_customername = $('#ajaxACL-customername').ajaxCallWidget({
        proxy: '/Customer/DdslickGetAllCustomers',
        type: "POST",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        loadingImageID: "loadingImage_DdslickCustomer",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCustomerDdList_infocustomer",
            pkIdentity: $("#publicKey").val()
        })

    });
    ajax_customername.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            data.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            $('#dropdownCustomerName').ddslick({
                data: data,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                        selectedCustomerId = selectedData.selectedData.value;
                        alert(selectedCustomerId);
                        var ajax_contactperson = $('#ajaxACL-contactperson').ajaxCallWidget({
                            proxy: '/Customer/DdslickGetCustomerContactList',
                            type: "POST",
                            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                            noDataFailureText: window.lang.translate("No data returned from service"),
                            loadingImageID: "loading-image-contactperson",
                            data: JSON.stringify({
                                language_code: $("#langCode").val(),
                                pk: "GsZVzEYe50uGgNM",
                                url: "pkCustomerContactPersonDdList_infocustomercontactpersons",
                               // pkIdentity: $("#publicKey").val(),
                                customer_id: selectedCustomerId
                            })

                        });
                        ajax_contactperson.ajaxCallWidget({
                            onSuccess: function (event, datacontactperson) {
                                var data_contactperson = $.parseJSON(datacontactperson);
                                data_contactperson.splice(0, 0,
                                    { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
                                );

                                $('#dropdownContactPerson').ddslick({
                                    data: data_contactperson,
                                    width: '100%',

                                    onSelected: function (selectedData) {
                                        if (selectedData.selectedData.value > 0) {

                                        }
                                    }
                                });

                                $("#loading-image-contactperson").loadImager('removeLoadImage');

                            }
                        })
                        ajax_contactperson.ajaxCallWidget('call');

                    }
                }
            });

            $("#loading-image-customername").loadImager('removeLoadImage');
        }
    })
    ajax_customername.ajaxCallWidget('call');

/*
    var cbdata_customer = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Customer 1",
            value: 2,
            selected: false
        },
        {
            text: "Customer 2",
            value: 3,
            selected: false
        },
        {
            text: "Customer 3",
            value: 4,
            selected: false
        }
    ];

    $('#loading-image-customername').loadImager('removeLoadImage');
    $("#loading-image-customername").loadImager('appendImage');

    var ajaxACLResources_customername = $('#ajaxACL-customername').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_customername.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-customername').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCustomerName').ddslick({
                //height: 150,
                data: cbdata_customer,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-customername").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-customername').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Customer bulunamamıştır...'), window.lang.translate('Customer  bulunamamıştır...'));
        },
    })
    ajaxACLResources_customername.ajaxCallWidget('call');


    var cbdata_contactperson = [
        {
            text: window.lang.translate('Please select') + "...",
            value: 1,
            selected: true
        },
        {
            text: "Contact Person 1",
            value: 2,
            selected: false
        },
        {
            text: "Contact Person 2",
            value: 3,
            selected: false
        },
        {
            text: "Contact Person 3",
            value: 4,
            selected: false
        }
    ];

    $('#loading-image-contactperson').loadImager('removeLoadImage');
    $("#loading-image-contactperson").loadImager('appendImage');

    var ajaxACLResources_contactperson = $('#ajaxACL-contactperson').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_contactperson.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-contactperson').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownContactPerson').ddslick({
                //height: 150,
                data: cbdata_contactperson,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-contactperson").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-contactperson').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Contact Person bulunamamıştır...'), window.lang.translate('Contact Person  bulunamamıştır...'));
        },
    })
    ajaxACLResources_contactperson.ajaxCallWidget('call');

*/
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Activity type "Fair Visit","Customer support interview","Customer Visit(Inbound)","Customer Visit(Outbound)","Phone Interview(Incoming)","Telephone Interview(Outgoing)",

    var ajaxACLResources_activitytype = $('#ajaxACL-activitytype').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-activitytype",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysActivityTypes',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCsActivationTypesDdList_syscsactivationtypes",
            pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_activitytype.ajaxCallWidget({
        onSuccess: function (event, dataactivitytype) {
            var cbdata_activitytype = $.parseJSON(dataactivitytype);
            cbdata_activitytype.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownActivityType').ddslick({
                data: cbdata_activitytype,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });

            $("#loading-image-activitytype").loadImager('removeLoadImage');

            $("#loading-image-activitytrackingtype").loadImager('removeLoadImage');
            $("#loading-image-activitytrackingtype").loadImager('appendImage');
            $('#dropdownActivitytrackingtype').ddslick({
                data: cbdata_activitytype,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });
            $("#loading-image-activitytrackingtype").loadImager('removeLoadImage');

        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-activitytype").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_activitytype.ajaxCallWidget('call');


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


    /**
* concerned vehicle type (product type)
* @returns {undefined}
* @author Gül Özdemir
* @since 18/10/2018
*/
    var ajaxACLResources_concernedvehicletype = $('#ajaxACL-concernedvehicletype').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-concernedvehicletype",
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
        })
    });
    ajaxACLResources_concernedvehicletype.ajaxCallWidget({
        onSuccess: function (event, dataconcernedvehicletype) {
            console.log(dataconcernedvehicletype);
            var cbdata_concernedvehicletype = $.parseJSON(dataconcernedvehicletype);
            cbdata_concernedvehicletype.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownConcernedVehicleType').ddslick({
                data: cbdata_concernedvehicletype,
                width: '100%',
                //search: true,
                //searchText: window.lang.translate('Search'),
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                        SelectedProductInterestId = selectedData.selectedData.value;
                    }
                }
            });

            $("#loading-image-concernedvehicletype").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-concernedvehicletype").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_concernedvehicletype.ajaxCallWidget('call');



 //   $('#loading-image-activityplaned').loadImager('removeLoadImage');
 //   $("#loading-image-activityplaned").loadImager('appendImage');
/*
    var ajaxACLResources_activityplaned = $('#ajaxACL-activityplaned').ajaxCallWidget({
        proxy: '/Customer/SysCsActStatuTypess/',
        type: 'POST',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_activityplaned.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-activityplaned').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('Servis  bulunamamıştır...'), window.lang.translate('Servis  bulunamamıştır...'));
        },
        onSuccess: function (event, dataactpln) {
            var cbdata_activityplaned = $.parseJSON(dataactpln);
            cbdata_activityplaned.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );
            $('#dropdownActivityPlaned').ddslick({
                data: cbdata_activityplaned,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-activityplaned").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-activityplaned').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', window.lang.translate('activityplaned bulunamamıştır...'), window.lang.translate('activityplaned  bulunamamıştır...'));
        },
    })
    ajaxACLResources_activityplaned.ajaxCallWidget('call');
*/

 
 /**
 * reset Activity Form
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 10/09/2018
 */

    window.resetActivityForm = function () {
        $("#loading-image-activity").loadImager('removeLoadImage');
        $("#loading-image-activity").loadImager('appendImage');

        $('#activityForm').validationEngine('hide');
        
        $("#loading-image-activity").loadImager('removeLoadImage');

        return false;
    }



    /**
    * Fill Activity form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 10/09/2018
    */

    window.fillActivityForm = function (data) {
        $("#loading-image-activity").loadImager('removeLoadImage');
        $("#loading-image-activity").loadImager('appendImage');

        //document.getElementById("txt-activity-name").value = data.Employee;
    
        $("#loading-image-activity").loadImager('removeLoadImage');

        return false;
    }


    /**
*.All customer activity List Refresh
* @returns 
* @author Gül Özdemir
* @since 03/09/2018
*/

    $('#activityList').click(function () {

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
                    {
                        
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

                    }, {
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
    * All Customer activity list
    * @returns {undefined}
    * @author Gül Özdemir
    * @since 19/10/2018
    */
    $('#activityList').click();
});

