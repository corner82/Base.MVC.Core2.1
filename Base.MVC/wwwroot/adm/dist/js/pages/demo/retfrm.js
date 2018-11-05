/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/
"use strict";

$(document).ready(function () {

    $('#input-1').checkboxpicker({
        html: true,
        offLabel: '<span class="glyphicon glyphicon-remove">',
        onLabel: '<span class="glyphicon glyphicon-ok">'
    });

    $('#input-1').on('change', function () {
        alert('test change');
        alert($('#input-1').prop('checked'));
        //$('#input-1').prop('checked', false);
        $('#myTabs a[href="#tab_2"]').tab('show') 
    });

    $('#myTabs a').click(function (e) {
        alert('tab changed');
        e.preventDefault()
        $(this).tab('show')
    })

    var dropdownLicenseDocumentTypeData = [{ text: "Please select", value: 0, selected: false, description: "" },
    { text: "Organik", value: 1, selected: false, description: "" },
    { text: "Kimyevi", value: 2, selected: false, description: "" }
    ];
    //registration type organik/kimyevi dropdown
    /*$('#dropdownRegType').ddslick({
        height: 200,
        data: dropdownLicenseDocumentTypeData,
        width: '98%',
        search: false,
        multiSelect: false,
        onSelected: function (selectedData) {

        }
    });*/


  //Make the dashboard widgets sortable Using jquery UI
  $(".connectedSortable").sortable({
    placeholder: "sort-highlight",
    connectWith: ".connectedSortable",
    handle: ".box-header, .nav-tabs",
    forcePlaceholderSize: true,
    zIndex: 999999
  });
  $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");
  

  //The Calender
  $("#calendar").datepicker();


});