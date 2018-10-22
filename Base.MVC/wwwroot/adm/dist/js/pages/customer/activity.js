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
    $("#loading-image-activityplanned").loadImager();
    $("#loading-image-segment").loadImager();
    $("#loading-image-productinterest").loadImager();
    $("#loading-image-followuptype").loadImager();
    $("#loading-image-activitylaststatus").loadImager();
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

    $("#loading-image-customername").loadImager('removeLoadImage');
    $("#loading-image-customername").loadImager('appendImage');

    var ajax_customername = $('#ajaxACL-customername').ajaxCallWidget({
        proxy: '/Customer/DdslickGetAllCustomers',
        type: "POST",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        loadingImageID: "loading-image-customername",
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
                        //alert(selectedCustomerId);
                        $("#loading-image-contactperson").loadImager('removeLoadImage');
                        $("#loading-image-contactperson").loadImager('appendImage');

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

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Activity type "Fair Visit","Customer support interview","Customer Visit(Inbound)","Customer Visit(Outbound)","Phone Interview(Incoming)","Telephone Interview(Outgoing)",


    $("#loading-image-activitytype").loadImager('removeLoadImage');
    $("#loading-image-activitytype").loadImager('appendImage');

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

            $("#loading-image-followuptype").loadImager('removeLoadImage');
            $("#loading-image-followuptype").loadImager('appendImage');
            $('#dropdownFollowuptype').ddslick({
                data: cbdata_activitytype,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });
            $("#loading-image-followuptype").loadImager('removeLoadImage');

        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-activitytype").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_activitytype.ajaxCallWidget('call');

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Active / Pasive 


    $("#loading-image-activitystatus").loadImager('removeLoadImage');
    $("#loading-image-activitystatus").loadImager('appendImage');

    var ajaxACLResources_activitystatus = $('#ajaxACL-activitystatus').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-activitystatus",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysActivePassiveList',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCsStatuTypesDdList_syscsstatutypes",
            //pkIdentity: $("#publicKey").val()
        })
    });
    ajaxACLResources_activitystatus.ajaxCallWidget({
        onSuccess: function (event, dataactivitystatus) {
            console.log(dataactivitystatus);

            var cbdata_activitystatus = $.parseJSON(dataactivitystatus);
            cbdata_activitystatus.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            console.log(cbdata_activitystatus);

            $('#dropdownActivityStatus').ddslick({
                data: cbdata_activitystatus,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });

            $("#loading-image-activitystatus").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-activitystatus").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_activitystatus.ajaxCallWidget('call');


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Planed / UnPlaned 
    $("#loading-image-activityplaned").loadImager('removeLoadImage');
    $("#loading-image-activityplaned").loadImager('appendImage');


    var ajaxACLResources_activityplanned = $('#ajaxACL-activityplanned').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-activityplanned",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysPlannedUnPlanned',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCsActStatutypesPUDdList_syscsactstatutypess"
        })
    });
    ajaxACLResources_activityplanned.ajaxCallWidget({
        onSuccess: function (event, dataactivityplanned) {
            var cbdata_activityplanned = $.parseJSON(dataactivityplanned);
            cbdata_activityplanned.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            console.log(cbdata_activityplanned);

            $('#dropdownActivityPlanned').ddslick({
                data: cbdata_activityplanned,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });

            $("#loading-image-activityplanned").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-activityplanned").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_activityplanned.ajaxCallWidget('call');

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Segment

    $("#loading-image-segment").loadImager('removeLoadImage');
    $("#loading-image-segment").loadImager('appendImage');

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
    $("#loading-image-productinterest").loadImager('removeLoadImage');
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
        })
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //-achieved -cancelled -not planned -planned 

    /**
   * Activity Last Status Type
   * @returns {undefined}
   * @author Gül Özdemir
   * @since 14/10/2018
   */

    $("#loading-image-activitylaststatus").loadImager('removeLoadImage');
    $("#loading-image-activitylaststatus").loadImager('appendImage');


    var ajaxACLResources_activitylaststatus = $('#ajaxACL-activitylaststatus').ajaxCallWidget({
        failureLoadImage: true,
        loadingImageID: "loading-image-activitylaststatus",
        triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Customer/SysActivityLastStatus',
        type: 'POST',
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkCsActStatutypesDdList_syscsactstatutypess"
        })
    });
    ajaxACLResources_activitylaststatus.ajaxCallWidget({
        onSuccess: function (event, dataactivitylaststatus) {
            var cbdata_activitylaststatus = $.parseJSON(dataactivitylaststatus);
            cbdata_activitylaststatus.splice(0, 0,
                { text: window.lang.translate('Please select'), value: 0, selected: false, description: "" }
            );

            console.log(cbdata_activitylaststatus);

            $('#dropdownActivityLastStatus').ddslick({
                data: cbdata_activitylaststatus,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {
                        //alert(selectedData.selectedData.text);

                    }

                }
            });

            $("#loading-image-activitylaststatus").loadImager('removeLoadImage');
        },
        onReset: function (event, data) {

        },
        onAfterSuccess: function (event, data) {
            $("#loading-image-activitylaststatus").loadImager('removeLoadImage');
        }
    })
    ajaxACLResources_activitylaststatus.ajaxCallWidget('call');


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    

    /**
     * insert / update Activity
     * @returns {undefined}
     * @author Gül Özdemir
     * @since 07/08/2018
     */

    $("#btn-activity-save").on("click", function (e) {
        e.preventDefault();

        if ($("#activityForm").validationEngine('validate')) {

            $("#loading-image-activity").loadImager('removeLoadImage');
            $("#loading-image-activity").loadImager('appendImage');

            var activityComment = $('#txt-activity-comment').val();
            var activityNoteManager = $('#txt-note-manager').val();

            var activitydate = $('#activity-datepicker').val();
            var followupdate = $('#followup-datepicker').val();

            var ddData_cstname = $('#dropdownCustomerName').data('ddslick');
            var cstnameId = ddData_cstname.selectedData.value;

            var ddData_ContactPerson = $('#dropdownContactPerson').data('ddslick');
            var contactpersonId = ddData_ContactPerson.selectedData.value;

            var ddData_ActivityType = $('#dropdownActivityType').data('ddslick');
            var activitytypeId = ddData_ActivityType.selectedData.value;

            var ddData_ActivityStatus = $('#dropdownActivityStatus').data('ddslick');
            var activitystatusId = ddData_ActivityStatus.selectedData.value;
            
            var ddData_ActivityPlaned = $('#dropdownActivityPlaned').data('ddslick');
            var activityplanedId = ddData_ActivityPlaned.selectedData.value;

            var ddData_Segment = $('#dropdownSegment').data('ddslick');
            var segmentId = ddData_Segment.selectedData.value;

            var ddData_ProductInterest = $('#dropdownProductInterest').data('ddslick');
            var productinterestId = ddData_ProductInterest.selectedData.value;

            var ddData_Followuptype = $('#dropdownFollowuptype').data('ddslick');
            var followuptypeId = ddData_Followuptype.selectedData.value;

            var mydata = JSON.stringify({
                url: "pkInsertAct_infocustomeractivations",
                customer_id: selectedCustomerId,
                act_date: activitydate,
                contact_person_id: contactpersonId,
                cs_activation_type_id: activitytypeId,
                cs_statu_types_id: activitystatusId,
                cs_act_statutype_id: activityplanedId,
                customer_segment_type_id: segmentId,
                vehicle_model_id: productinterestId,
                activty_tracking_type_id : followuptypeId,
                activity_tracking_date: followupdate,
                manager_description: activityNoteManager,
                project_id: 0,
                description: "",
                realization_date: null,
                report:"",
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
                /*
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
            */
            }
        }
        return false;

    })

 
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
        $('#dropdownCustomerName').ddslick('select', { index: String(0) });
        $('#dropdownContactPerson').ddslick('destroy');
        $('#dropdownActivityType').ddslick('select', { index: String(0) });
        $('#dropdownActivityStatus').ddslick('select', { index: String(0) });
        $('#dropdownActivityPlaned').ddslick('select', { index: String(0) });
        $('#dropdownSegment').ddslick('select', { index: String(0) });
        $('#dropdownProductInterest').ddslick('select', { index: String(0) });

        $('#dropdownFollowuptype').ddslick('select', { index: String(0) });
        
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
                
                var deferred = $.Deferred();

                return $.ajax({
                    url: '/Customer/DeleteCustomerActivity',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedCustomerActivityId,
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


 /**
 * Activity active / passive
 * @returns {undefined}
 * @author Gül Özdemir
 * @since 14/10/2018
 */
    window.activepassiveActivity = function (activity_id, active) {

        var transactionSuccessMessage;

        if (active === 1) {
            //active
            transactionSuccessMessage = window.lang.translate('Active successful');
        } else {
            //passive
            transactionSuccessMessage = window.lang.translate('Passive successful');
        }

        $("#loading-image-activityGrid").loadImager('removeLoadImage');
        $("#loading-image-activityGrid").loadImager('appendImage');

        var ajax_activepassiveactivitylist = $('#ajaxACL-activityist').ajaxCallWidget({
            failureLoadImage: true,
            loadingImageID: "loading-image-activityGrid",
            triggerSuccessAuto: true,
            transactionSuccessText: transactionSuccessMessage,
            transactionFailureText: window.lang.translate("Service URL not found, please report error"),
            dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
            proxy: '/Customer/ActivePassiveCustomerActivity',
            type: "POST",
            data: JSON.stringify({
                id: contactperson_id,
                pk: "GsZVzEYe50uGgNM",
                url: "pkUpdateMakeActiveOrPassive_infocustomeractivations"
            }),

        });
        ajax_activepassiveactivitylist.ajaxCallWidget({
            onReset: function (event, data) {

            },
            onAfterSuccess: function (event, data) {
                $("#gridContainer_activity").dxDataGrid("instance").refresh();
                $("#loading-image-activityGrid").loadImager('removeLoadImage');
            }
        })
        ajax_activepassiveactivitylist.ajaxCallWidget('call');

    }
});

