$(document).ready(function () {

    //Warranty
    //$("#loading-image-wrName").loadImager('removeLoadImage');
    //$("#loading-image-wrName").loadImager('appendImage');


    //$('#loadingImage_DdslickWarrantyType').loadImager('removeLoadImage');
    //$("#loadingImage_DdslickWarrantyType").loadImager('appendImage');
    var ajax_DdslickWarrantyType = $('#salesman_calendar').ajaxCallWidget({
        proxy: '/Calendar/SysCalendar',
        type: "POST",
        //failureLoadImage: true,
        //loadingImageID: "loadingImage_DdslickWarrantyType",
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        noDataFailureText: window.lang.translate("No data returned from service"),
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkFillCalendarEventsGridx_infocalendarevents"
        })

    });
    ajax_DdslickWarrantyType.ajaxCallWidget({
        onSuccess: function (event, data) {
            var data = $.parseJSON(data);
            console.log(data);
            //$("#loadingImage_DdslickWarrantyType").loadImager('removeLoadImage');
        },
    })
   // ajax_DdslickWarrantyType.ajaxCallWidget('call');


    /*
    //http://proxy.mansis.co.za:18443/SlimProxyBoot.php?url=pkWarrantiesParentsDdList_syswarranties&vehicle_group_id=8&language_code=en&pk=GsZVzEYe50uGgNM
    var ajaxACLResources_vehicle = $('#salesman-calendar').ajaxCallWidget({
        ///failureLoadImage: true,
        //loadingImageID: "loading-image-wrName",
        //triggerSuccessAuto: true,
        transactionSuccessText: window.lang.translate('Transaction successful'),
        transactionFailureText: window.lang.translate("Service URL not found, please report error"),
        dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
        proxy: '/Calendar/SysCalendar',
        type: "POST",
        data: JSON.stringify({
            language_code: $("#langCode").val(),
            pk: "GsZVzEYe50uGgNM",
            url: "pkFillCalendarEventsGridx_infocalendarevents"
        })
    });

    ajaxACLResources_vehicle.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datacalendar) {
            console.log(datacalendar);
            alert("test");

            //$('#loading-image-wrName').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
           // $('#loading-image-wrName').loadImager('removeLoadImage');
        }
    });

    ajaxACLResources_vehicle.ajaxCallWidget('call');
    */
    $('#salesman_calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
        },
        defaultDate: moment(new Date()).format("YYYY-MM-DD"),
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        eventClick: function (calEvent, jsEvent, view) {

            alert('Event: ' + calEvent.title);
            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            alert('View: ' + view.name);

            // change the border color just for fun
            $(this).css('border-color', 'red');

        },
        events: [
            {
                title: 'All Day Event',
                start: '2018-03-01',
            },
            {
                title: 'Long Event',
                start: '2018-03-07',
                end: '2018-03-10'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2018-03-09T16:00:00'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2018-03-16T16:00:00'
            },
            {
                title: 'Conference',
                start: '2018-03-11',
                end: '2018-03-13'
            },
            {
                title: 'Meeting',
                start: '2018-03-12T10:30:00',
                end: '2018-03-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2018-03-12T12:00:00'
            },
            {
                title: 'Meeting',
                start: '2018-03-12T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2018-03-12T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2018-03-12T20:00:00'
            },
            {
                title: 'Birthday Party',
                start: '2018-03-13T07:00:00'
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2018-03-28'
            }
        ]
    });

    $('.fc button, .fc-button-group, .fc-time-grid .fc-event .fc-time span').css('display', 'block');
    $('.fc-event, .fc-event-dot').css('background-color', '#3a87ad !important');
});