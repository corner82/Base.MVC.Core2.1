$(document).ready(function () {

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'Ýþleme devam et'
    });

    //offline loading-image
    //$("#offlineWrapperImager").loadImager();
    // offline up event handler
   /* Offline.on("up", function () {
        $("#offlineWrapperImager").loadImager('removeLoadImage');
    });*/
    // offline down event handler
    /*Offline.on("down", function () {
        $("#offlineWrapperImager").loadImager('appendImage');
    });*/

   // $.getScript({ url: "loadingImages.js", cache: true });
    
  //Make the dashboard widgets sortable Using jquery UI
  $(".connectedSortable").sortable({
    placeholder: "sort-highlight",
    connectWith: ".connectedSortable",
    handle: ".box-header, .nav-tabs",
    forcePlaceholderSize: true,
    zIndex: 999999
  });
    $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");

    $(document).click(function (event) {
        /*alert(event.target.nodeName);
        alert($(event.target).data('nodejs-log'));
        alert('session id =>' + localStorage.getItem('sessionID'));
        alert('user name =>' + localStorage.getItem('userName'));
        alert('user IP =>' + localStorage.getItem('userIP'));*/
        var test = event.target;
        //alert(test.attr('data-toggle'));

        //var socket = io.connect('https://localhost:8444');
        var socket = io.connect('http://localhost:3000', { reconnect: true });
        /*var $messageForm = $('#send-message');
        var $messageBox = $('#chat-input');*/

        /*$messageForm.submit(function (e) {
            e.preventDefault();
            socket.emit('send message', 'click message');
            //$messageBox.val('');
        })*/
        var msg = '{ "UserName" : "' + localStorage.getItem('userName') + '","Host" : "localhost:3000","Action": "' + $("#requestUriRegulated").val() + '","Controller":"' + $("#requestUriRegulated").val() + '","Port":"3000","UserAgent":"Chrome","UserIP":"127.0.0.1","Method":"Demo","SessionID": "' + localStorage.getItem('sessionID')+'","UserToken":"ssssss","UserPublicKey":"' + $("#publicKey").val() +'"}';
        //socket.emit('send message', 'click message');
        socket.emit('send message', msg);

        /*socket.on('new message', function (data) {
            $('.panel-body').append(data + '<br/>');
        })*/
    });
  
  //jQuery UI sortable for the todo list
  $(".todo-list").sortable({
    placeholder: "sort-highlight",
    handle: ".handle",
    forcePlaceholderSize: true,
    zIndex: 999999
    });

    // vehicle type date picker
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-1d'
    });


    // deal campaign asider 
    $('#campaignAddAside').asideRight({
        width: "900"
    });
    $('#campaignAddAside').asideRight({
        onOpening: function (event, element) {
            //console.log(element);
            //alert('onopening event right slider');
        }
    });

    $('#campaignAddAside').asideRight({
        onOpened: function (event, element) {
            //alert('onopened event right slider');
        }
    });

    $('#campaignAddAside').asideRight({
        onClosing: function (event, element) {
            //alert('onclosing event right slider');
        }
    });

    $('#campaignAddAside').asideRight({
        onClosed: function (event, element) {
            //alert('onclosed event right slider');
        }
    });
    //tab 2_1 side bar panel left toggle
    $("#toggle_CampaignAsider").on("click", function () {
        // $(".sidebar.left").sidebar().trigger("sidebar:open");
        //alert('test');
        
        //alert($(this).offset().top);
        $('#campaignAddAside').asideRight('setFromTop', (parseFloat($(this).offset().top))-500);
        $('#campaignAddAside').asideRight('toggle');
    });

    $("#toggle_closeCampaignAside").on("click", function () {
        $('#campaignAddAside').asideRight('toggle');
    });

    /*$('#testZeyn').slimScroll({
        height: '250px'
    });*/


});