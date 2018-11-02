$(document).ready(function () {

    var caledardatas = [];

    var ajaxTest = $('#salesman_calendar').ajaxCallWidget({
        failureLoadImage: true,
        //loadingImageID: "loading-image-wrName",
        triggerSuccessAuto: true,
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

    ajaxTest.ajaxCallWidget({
        onReset: function (event, data) {

        },
        onSuccess: function (event, datacalendar) {
            var data = $.parseJSON(datacalendar);

            $.each(data.items, function (index, value) {
                caledardatas.push({ id: value.id, start: value.event_start_date.substr(0,10), title: value.name });
            });
            console.log(caledardatas);
            $('.calendar').fullCalendar('removeEventSource', caledardatas)
            $('.calendar').fullCalendar('addEventSource', caledardatas)
            //$('#loading-image-wrName').loadImager('removeLoadImage');
        },
        onAfterSuccess: function (event, data) {
            // $('#loading-image-wrName').loadImager('removeLoadImage');
        }
    });

    ajaxTest.ajaxCallWidget('call');



    $('.calendar').fullCalendar({
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
        events: []
    });

    $('.fc button, .fc-button-group, .fc-time-grid .fc-event .fc-time span').css('display', 'block');
    $('.fc-event, .fc-event-dot').css('background-color', '#3a87ad !important');
});