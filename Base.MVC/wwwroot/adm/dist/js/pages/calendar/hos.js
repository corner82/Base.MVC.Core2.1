$(document).ready(function () {

    var caledardatas = [];

    $('#hos_calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
        },
        defaultDate: moment(new Date()).format("YYYY-MM-DD"),
        navLinks: true, // can click day/week names to navigate views
        eventStartEditable: false,
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        eventClick: function (calEvent, jsEvent, view) {
            
            // change the border color just for fun
            $(this).css('border-color', 'red');
        },
        events: []
    });

    $('.fc button, .fc-button-group, .fc-time-grid .fc-event .fc-time span').css('display', 'block');
    $('.fc-event, .fc-event-dot').css('background-color', '#3a87ad !important');
});