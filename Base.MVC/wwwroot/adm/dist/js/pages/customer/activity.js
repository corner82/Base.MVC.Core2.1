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

    var selectedCustomerId = 0;
    var selectedProductInterestId = 0;
    var selectedActivityId = 0;


    var ddslick_customerId = 0;
    var ddslick_customer_name = "";

    var ddslick_contactpersonId = 0;
    var ddslick_contactperson_name = "";

    var filldropdown = false;
    var open_collapse = true;
    var firstopen_collapse = true;

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

    tab_disable();
*/
//    var tabOrganizer = $("#activity_tab").organizeTabs({ tabID: "activity_tab" });
//    $("#activity_tab").organizeTabs('disableAllTabs');



    $('#activityForm').validationEngine();


    $('#activity-datetimepicker').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });

    $('#followup-datetimepicker').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    }); 

    $('#activity-realization-datetimepicker').datetimepicker({
        locale: langCode,
        format: 'yyyy/mm/dd hh:ii',
        autoclose: true,
        todayBtn: true
    });



    //activity_report

    //$('#activityReport_collapse').collapse('hide');


    //activityReport_collapse.click();


    /**
     * ddslick customer dropdown and contact person dropdown
     * @author Gül Özdemir
     * @since 19/10/2018
     */

    $("#loading-image-customername").loadImager('removeLoadImage');
    $("#loading-image-customername").loadImager('appendImage');

    var ajax_customername = $('#ajaxACL-act-customername').ajaxCallWidget({
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

                    $('#dropdownContactPerson').ddslick('destroy');

                    if (selectedData.selectedData.value > 0) {

                        selectedCustomerId = selectedData.selectedData.value;
                        //alert(selectedCustomerId);
                        $("#loading-image-contactperson").loadImager('removeLoadImage');
                        $("#loading-image-contactperson").loadImager('appendImage');

                        var ajax_contactperson = $('#ajaxACL-act-contactperson').ajaxCallWidget({
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

                                if (filldropdown === true) {
                                    //alert(ddslick_contactpersonId);
                                    //alert(ddslick_contactperson_name);
                                    $('#dropdownContactPerson').ddslick('selectByValue',
                                    {
                                        index: ddslick_contactpersonId,
                                        value: ddslick_contactperson_name
                                    });
                                    filldropdown = false;
                                }
                            },
                            onAfterSuccess: function (event, data) {
                                //alert('geldim AfterSuccess province');

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

                        selectedProductInterestId = selectedData.selectedData.value;
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
                        if (selectedData.selectedData.text == "Achieved") {
                            //open tab
                            //tab_active();
                            //$("#activity_tab").organizeTabs('enableAllTabs');
                            //$('#activityReport_collapse').enabled;


                            $('#activityReport_collapse').collapse('show');
                            $("#activity-realization-datetimepicker").prop("disabled", false);
                            $("#activity_report").prop("disabled", false);

                            if (open_collapse) { 
                                activityReport_collapse.click();
                            } 
                            
                        } else {
                            //$('#activityReport_collapse').disabled;

                            $('#activityReport_collapse').collapse('hide');

                            $("#activity-realization-datetimepicker").prop("disabled", true);
                            $("#activity_report").prop("disabled", true);

                            if (!open_collapse) {
                                activityReport_collapse.click();
                            }

                        }
                    } else {
                        if (firstopen_collapse) {
                            firstopen_collapse = false;

                            if (open_collapse) {
                                activityReport_collapse.click();
                            }
                            $('#activityReport_collapse').collapse('show');


                        }
                        if (!open_collapse) {
                            activityReport_collapse.click();
                        }
                        $('#activityReport_collapse').collapse('hide');
                        $("#activity-realization-datetimepicker").prop("disabled", true);
                        $("#activity_report").prop("disabled", true);
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


    window.activity_savebutton = function () {
        var mydata;

        if ($("#activityForm").validationEngine('validate')) {

            //var activityFormcontrol = activity_Formcontrol();
            //alert(activityFormcontrol);

            var activitydate = $('#activity-datetimepicker').val();
            var followupdate = $('#followup-datetimepicker').val();

            var activityFormcontrol = true;

            var mytoday = new Date();
            var myday = mytoday.getDate();
            mytoday.setDate(myday - 15);

            //alert(mytoday);

            //1- aktivite tarihi, bugünden max 2hafta küçük olabilir.
            if (activitydate < mytoday) {
                dm.dangerMessage('show', window.lang.translate('Activity date cannot be less than 15 days!'), window.lang.translate('Activity date cannot be less than 15 days!'));
                activityFormcontrol = false;
            }

            //2- Takip tarihi dolu ise takip tipi seçili olmalıdır. (follow up)
            if (followupdate) {
                var ddData_Followuptype = $('#dropdownFollowuptype').data('ddslick');
                var followuptypeId = ddData_Followuptype.selectedData.value;

                if (followuptypeId === 0) {
                    dm.dangerMessage('show', window.lang.translate('Enter type of follow up!'), window.lang.translate('Enter type of follow up!'));
                    activityFormcontrol = false;
                }
            }

            //3- Takip tarihi activite tarihinden küçük olamaz 
            if (followupdate && followupdate < activitydate) {
                dm.dangerMessage('show', window.lang.translate('Follow up date Cannot be smaller than activity date!'), window.lang.translate('Follow up date Cannot be smaller than activity date!'));
                activityFormcontrol = false;
            }

            //alert(activityFormcontrol);

            if (activityFormcontrol) {
                //alert("geldim");
                $("#loading-image-activity").loadImager('removeLoadImage');
                $("#loading-image-activity").loadImager('appendImage');

                var activityComment = $('#txt-activity-comment').val();
                var activityNoteManager = $('#txt-note-manager').val();

                var realizationdate = $('#activity-realization-datetimepicker').val();

                var ddData_cstname = $('#dropdownCustomerName').data('ddslick');
                var cstnameId = ddData_cstname.selectedData.value;

                var ddData_ContactPerson = $('#dropdownContactPerson').data('ddslick');
                var contactpersonId = ddData_ContactPerson.selectedData.value;

                var ddData_ActivityType = $('#dropdownActivityType').data('ddslick');
                var activitytypeId = ddData_ActivityType.selectedData.value;

                var ddData_ActivityStatus = $('#dropdownActivityStatus').data('ddslick');
                var activitystatusId = ddData_ActivityStatus.selectedData.value;

                var ddData_ActivityPlanned = $('#dropdownActivityPlanned').data('ddslick');
                var activityplannedId = ddData_ActivityPlanned.selectedData.value;

                var ddData_ActivityLastStatus = $('#dropdownActivityLastStatus').data('ddslick');
                var activitylaststatusId = ddData_ActivityLastStatus.selectedData.value;

                var ddData_Segment = $('#dropdownSegment').data('ddslick');
                var segmentId = ddData_Segment.selectedData.value;

                var ddData_ProductInterest = $('#dropdownProductInterest').data('ddslick');
                var productinterestId = ddData_ProductInterest.selectedData.value;

                var ddData_Followuptype = $('#dropdownFollowuptype').data('ddslick');
                var followuptypeId = ddData_Followuptype.selectedData.value;

                var activityreport = $('#activity_report').val();

                //alert(selectedActivityId); 
                var ajax;

                if (selectedActivityId === 0) {
                    //alert("yeni kayıt");
                    //Yeni kayıt

                    /*  cs_activation_type_id: 2	Fair visit, Customer Visit vs.
                        cs_statu_types_id: 1	    active, pasive, project
                        cs_act_statutype_id: 1	    arshived, cancelled, planed, unplaned
                        planned_unplaned_id: 2	    planed, unplaned, 2 tane daha
                                                    (takipli için) Fair visit, Customer Visit vs.		 */
                    mydata = JSON.stringify({
                        url: "pkInsertAct_infocustomeractivations",
                        customer_id: selectedCustomerId,
                        act_date: activitydate,
                        contact_person_id: contactpersonId,
                        cs_activation_type_id: activitytypeId,
                        cs_statu_types_id: activitystatusId,
                        planned_unplaned_id: activityplannedId,
                        cs_act_statutype_id: activitylaststatusId,
                        customer_segment_type_id: segmentId,
                        vehicle_model_id: productinterestId,
                        activty_tracking_type_id: followuptypeId,
                        activity_tracking_date: followupdate,
                        manager_description: activityNoteManager,
                        project_id: 0,
                        description: activityComment,
                        realization_date: realizationdate,
                        report: activityreport,
                        pk: "GsZVzEYe50uGgNM"
                    })

                    console.log(mydata);

                    ajax = $('#ajaxACL-activity').ajaxCallWidget({
                        failureLoadImage: true,
                        loadingImageID: "loading-image-activity",
                        triggerSuccessAuto: true,
                        transactionSuccessText: window.lang.translate('Transaction successful'),
                        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                        proxy: '/Customer/InsertCustomerActivity',
                        type: "POST",
                        data: mydata
                    });

                    ajax.ajaxCallWidget({
                        onSuccess: function (event, data) {
                            //alert("success");
                        },
                        onReset: function (event, data) {

                        },
                        onAfterSuccess: function (event, data) {
                            $("#gridContainer_activity").dxDataGrid("instance").refresh();
                            $("#loading-image-activity").loadImager('removeLoadImage');
                            resetActivityForm();
                            //$('#activityList').click();
                        },
                        OnError: function (event, data) {
                            //alert("hata:" + event.text);
                        }
                    })
                    ajax.ajaxCallWidget('call');
                    $("#loading-image-activity").loadImager('removeLoadImage');

                } else {
                    //update
                    //alert("update");

                    mydata = JSON.stringify({
                        url: "pkUpdateAct_infocustomeractivations",
                        id: selectedActivityId,
                        customer_id: selectedCustomerId,
                        act_date: activitydate,
                        contact_person_id: contactpersonId,
                        cs_activation_type_id: activitytypeId,
                        cs_statu_types_id: activitystatusId,
                        planned_unplaned_id: activityplannedId,
                        cs_act_statutype_id: activitylaststatusId,
                        customer_segment_type_id: segmentId,
                        vehicle_model_id: productinterestId,
                        activty_tracking_type_id: followuptypeId,
                        activity_tracking_date: followupdate,
                        manager_description: activityNoteManager,
                        project_id: 0,
                        description: activityComment,
                        realization_date: realizationdate,
                        report: activityreport,
                        pk: "GsZVzEYe50uGgNM"
                    })

                    console.log(mydata);

                    wcm.warningComplexMessage({
                        onConfirm: function (event, data) {
                            ajax = $('#ajaxACL-activity').ajaxCallWidget({
                                failureLoadImage: true,
                                loadingImageID: "loading-image-activity",
                                triggerSuccessAuto: true,
                                transactionSuccessText: window.lang.translate('Transaction successful'),
                                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                                proxy: '/Customer/UpdateCustomerActivity',
                                type: "POST",
                                data: mydata
                            });

                            ajax.ajaxCallWidget({
                                onReset: function (event, data) {

                                },
                                onAfterSuccess: function (event, data) {
                                    $("#gridContainer_activity").dxDataGrid("instance").refresh();
                                    $("#loading-image-activity").loadImager('removeLoadImage');
                                    resetActivityForm();
                                    //$('#activityList').click();
                                }
                            })
                            ajax.ajaxCallWidget('call');
                            $("#loading-image-activity").loadImager('removeLoadImage');
                        }
                    });
                    wcm.warningComplexMessage('show', 'Activity will be updated! Are you sure?', 'Activity will be updated! Are you sure?');

                }
            }
        }
        return false;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    $("#activityReport_collapse").on("click", function (e) {

        //if (firstopen_collapse) {
        //    alert("geldim");
        //    $('#activityReport_collapse').collapse('hide');
        //    firstopen_collapse = false;
        //}

        open_collapse = !open_collapse;

    })

    /**
     * insert / update Activity
     * @returns {undefined}
     * @author Gül Özdemir
     * @since 07/08/2018
     */

    $("#btn-activity-save").on("click", function (e) {
        e.preventDefault();
        activity_savebutton();

    })

    /**
      * insert / update Activity
      * @returns {undefined}
      * @author Gül Özdemir
      * @since 07/08/2018
      */

    $("#btn-activityreport-save").on("click", function (e) {
        e.preventDefault();

        activity_savebutton();
    })

    /**
    * Activity Form kontrol (extantions)
    * @returns {undefined}
    * @author Gül Özdemir
    * @since 22/10/2018
    */
/*
    window.activity_Formcontrol = function () {
        var myreturn = true;

        var activitydate = $('#activity-datetimepicker').val();
        var followupdate = $('#followup-datetimepicker').val();

        var mytoday = new Date();
        var myday = mytoday.getDate();
        mytoday.setDate(myday - 15);

        //alert(mytoday);

        //1- aktivite tarihi, bugünden max 2hafta küçük olabilir.
        if (activitydate < mytoday) {

            //alert("Aktivite tarihi 15 günden küçük olamaz!");
            dm.dangerMessage('show', window.lang.translate('Activity date cannot be less than 15 days!'), window.lang.translate('Activity date cannot be less than 15 days!'));
            myreturn = false;
        }

        //2- Takip tarihi dolu ise takip tipi seçili olmalıdır. (follow up)
        if (followupdate) {
            //dropdownFollowuptype
            var ddData_Followuptype = $('#dropdownFollowuptype').data('ddslick');
            var followuptypeId = ddData_Followuptype.selectedData.value;
            if (followuptypeId === 0) {
                //alert("Folow up type giriniz!");
                dm.dangerMessage('show', window.lang.translate('Enter type of follow up!'), window.lang.translate('Enter type of follow up!'));

                myreturn = false;
            }
        }

        //3- Takip tarihi activite tarihinden küçük olamaz 
        if (followupdate < activitydate) {

            //alert("Follow up date Aktivite tarihinden küçük olamaz! / Follow up date Cannot be smaller than activity date");
            dm.dangerMessage('show', window.lang.translate('Follow up date Cannot be smaller than activity date!'), window.lang.translate('Follow up date Cannot be smaller than activity date!'));
            myreturn = false;
        }
        

        return myreturn;
    }
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

        selectedActivityId = 0;

        ddslick_customerId = 0;
        ddslick_customer_name = "";

        ddslick_contactpersonId = 0;
        ddslick_contactperson_name = "";

        $('#activityForm').validationEngine('hide');
        $('#dropdownCustomerName').ddslick('select', { index: String(0) });
        $('#dropdownContactPerson').ddslick('destroy');
        $('#dropdownActivityType').ddslick('select', { index: String(0) });
        $('#dropdownActivityStatus').ddslick('select', { index: String(0) });
        $('#dropdownActivityPlanned').ddslick('select', { index: String(0) });
        $('#dropdownSegment').ddslick('select', { index: String(0) });
        $('#dropdownProductInterest').ddslick('select', { index: String(0) });
        $('#dropdownFollowuptype').ddslick('select', { index: String(0) });
        $('#dropdownActivityLastStatus').ddslick('select', { index: String(0) });

        $('#activityReport_collapse').collapse('hide');
        if (!open_collapse) {
            activityReport_collapse.click();
        }

        //$("#activity_tab").organizeTabs('disableAllTabs');
        $("#loading-image-activity").loadImager('removeLoadImage');
        //tab_disable();
        return false;
    }


    /**
    * Fill Activity form
    * @returns {Boolean}
    * @author Gül Özdemir
    * @since 10/09/2018
    */

    window.fillActivityForm = function (data) {

        resetActivityForm;
        filldropdown = true;

        $("#loading-image-activity").loadImager('removeLoadImage');
        $("#loading-image-activity").loadImager('appendImage');
        
        selectedActivityId = data.id;

        if (data.customer_id) {
            ddslick_customerId = data.registration_id;
            ddslick_customer_name = data.registration_name;
        } else {
            ddslick_customerId = 0;
            ddslick_customer_name = "";
        }

        //alert(data.contact_person_id);
        if (data.contact_person_id) {

            ddslick_contactpersonId = data.contact_person_id;
            ddslick_contactperson_name = data.namesurname;
            /*
            $('#dropdownContactPerson').ddslick('selectByValue',
                {
                    index: ddslick_contactpersonId,
                    value: ddslick_contactperson_name
                });
            */
        } else {
            ddslick_contactpersonId = 0;
            ddslick_contactperson_name = "";
        }

        if (data.registration_name) {
            $('#dropdownCustomerName').ddslick('selectByValue',
                {
                    index: data.customer_id,
                    value: data.registration_name
                }
            );
        }


        if (data.activation_type_name) {
            $('#dropdownActivityType').ddslick('selectByValue',
                {
                    index: data.cs_activation_type_id,
                    value: data.activation_type_name
                }
            );
        }

        if (data.planned_unplaned_name) {
            $('#dropdownActivityPlanned').ddslick('selectByValue',
                {
                    index: data.planned_unplaned_id,
                    value: data.planned_unplaned_name
                }
            );
        }        

        if (data.description) {
            document.getElementById("txt-activity-comment").value = data.description;
        } else {
            document.getElementById("txt-activity-comment").value = "";
        }

        if (data.statu_types_name) {
            $('#dropdownActivityStatus').ddslick('selectByValue',
                {
                    index: data.cs_statu_types_id,
                    value: data.statu_types_name
                }
            );
        }

        if (data.statu_planned_unplaned_name) {
            $('#dropdownActivityPlanned').ddslick('selectByValue',
                {
                    index: data.planned_unplaned_id,
                    value: data.planned_unplaned_name
                }
            );
        }

        if (data.act_date) {
            document.getElementById("activity-datetimepicker").value = data.act_date;
        } else {
            document.getElementById("activity-datetimepicker").value = "";
        }

        if (data.customer_segment_type_id) {
            $('#dropdownSegment').ddslick('selectByValue',
                {
                    index: data.customer_segment_type_id,
                    value: data.segment_type_name
                }
            );
        }

        if (data.customer_segment_type_id) {
            $('#dropdownSegment').ddslick('selectByValue',
                {
                    index: data.customer_segment_type_id,
                    value: data.segment_type_name
                }
            );
        }

        if (data.vehicle_model_name) {
            $('#dropdownProductInterest').ddslick('selectByValue',
                {
                    index: data.vehicle_model_id,
                    value: data.vehicle_model_name
                }
            );
        }

        if (data.manager_description) {
            document.getElementById("txt-note-manager").value = data.manager_description;
        } else {
            document.getElementById("txt-note-manager").value = "";
        }

        if (data.activity_tracking_date) {
            document.getElementById("followup-datetimepicker").value = data.activity_tracking_date;
        } else {
            document.getElementById("followup-datetimepicker").value = "";
        }

        if (data.activty_tracking_type_id) {
            $('#dropdownFollowuptype').ddslick('selectByValue',
                {
                    index: data.activty_tracking_type_id,
                    value: data.activty_tracking_type_name
                }
            );
        }
        if (data.cs_act_statutype_name) {
            $('#dropdownActivityLastStatus').ddslick('selectByValue',
                {
                    index: data.cs_act_statutype_id,
                    value: data.cs_act_statutype_name
                }
            );
        }

        if (data.realization_date) {
            //tab_active();
            //$("#activity_tab").organizeTabs('enableAllTabs');
            document.getElementById("activity-realization-datetimepicker").value = data.realization_date;
        } else {
            //tab_disable();
            //$("#activity_tab").organizeTabs('disableAllTabs');
            document.getElementById("activity-realization-datetimepicker").value = "";
        }

        if (data.report) {
            document.getElementById("activity_report").value = data.report;
        } else {
            document.getElementById("activity_report").value = "";
        }

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
                    url: '/Customer/DeleteCustomerActivity',
                    dataType: "json",
                    data: JSON.stringify({
                        id: selectedActivityId,
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

                //allowColumnResizing: true,

                //columnResizingMode: "widget",

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
                        caption: window.lang.translate('Customer'),
                        dataField: "registration_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Contact person name'),
                        dataField: "namesurname",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Activity type'),
                        dataField: "activation_type_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Activity command'),
                        dataField: "description",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Activity status'),
                        dataField: "statu_types_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Planned/Unplanned'),
                        dataField: "planned_unplaned_name",   //"cs_act_statutype_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Activity date/time'),
                        dataField: "act_date",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Segment type'),
                        dataField: "segment_type_name",
                        encodeHtml: false
                    }, {                  
                        caption: window.lang.translate('Product of interest'),
                        dataField: "vehicle_model_name",
                        encodeHtml: false
                    },{
                        caption: window.lang.translate('Note to the manager'),
                        dataField: "manager_description",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Follow up date/time'),
                        dataField: "activity_tracking_date",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Follow up type'),
                        dataField: "activty_tracking_type_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Realization date/time'),
                        dataField: "realization_date",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Activity last status'),
                        dataField: "cs_act_statutype_name",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('E-mail'),
                        dataField: "email",
                        encodeHtml: false
                    }, {
                        caption: window.lang.translate('Mobile number'),
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
                        caption: window.lang.translate('Date saved'),
                        dataField: "date_saved",
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
                        selectedActivityId = data.id;
                        filldropdown = true;
                        fillActivityForm(data);
                        $("#loading-image-activity").loadImager('removeLoadImage');
                    }
                },

                onRowRemoving: function (e) {
                    selectedActivityId = e.key.id;
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

    //resetActivityForm(); 

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
                id: activity_id,
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

