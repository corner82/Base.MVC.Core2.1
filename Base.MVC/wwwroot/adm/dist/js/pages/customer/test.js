$(document).ready(function () {

    "use strict";

    /*
    * jquery lang master created dynamically
    */
    $("#langCode").jsLangMaster();


    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({
        denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'
    });


    window.tab_active = function () {
        //Update & View Mode
        //tablar açılacak

        $("a[data-toggle='tab'").prop('disabled', false);
        $("a[data-toggle='tab'").each(function () {
            $(this).attr('href', $(this).prop('data-href')); // restore original href
        });
        $("a[data-toggle='tab'").removeClass('disabled-link');
    }

    window.tab_disable = function () {
        //yeni kayda açık
        //tablar kapatılacak

        $("a[data-toggle='tab'").prop('disabled', true);
        $("a[data-toggle='tab'").each(function () {
            $(this).prop('data-href', $(this).attr('href')); // hold you original href
            $(this).attr('href', '#'); // clear href
        });
        $("a[data-toggle='tab'").addClass('disabled-link');

    }

    window.tab_disable();
    /*
    * Customer Info insert form validation engine attached to work
    * @since 02/08/2016
    */
    $('#customerInfoForm').validationEngine();
    $('#customerPurchaseForm').validationEngine();
    $('#customerContactPersonForm').validationEngine();

    /* Geçici data */
    //Dropdown plugin data

    var cbdata = [
        {
            text: "Select...",
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


    $("#loading-image-country").loadImager();
    $("#loading-image-country").loadImager('appendImage');

    var ajaxACLResources_country = $('#loading-image-country').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
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
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownCountry').ddslick({
                //height: 150,
                data: cbdata,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

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
            dm.dangerMessage('show', 'Ülke Bulunamamıştır...', 'Ülke  bulunamamıştır...');
        },
    })
    ajaxACLResources_country.ajaxCallWidget('call');


    var data_priority = [{
        "value": 0,
        "text": "Select...",
        selected: true
    }, {
        "value": 1,
        "text": "High",
        selected: false
    }, {
        "value": 2,
        "text": "Normal",
        selected: false
    }, {
        "value": 3,
        "text": "Low",
        selected: false

        }];

var data_product = [{
    "value": 0,
    "text": "Select...",
    selected: true
}, {
    "value": 1,
    "text": "T00001"
}, {
    "value": 2,
    "text": "T00002"
}, {
    "value": 3,
    "text": "T00003"
    }];

/**
* Product Interest dropdown prepared
* @type @call;$@call;ajaxCallWidget
* @since 30/05/2018
*/
var ajaxACLResources_productinterest = $('#loading-image-productinterest').ajaxCallWidget({
    proxy: 'https://jsonplaceholder.typicode.com/todos/',
    data: {
        url: '1'
        //pk: $("#pk").val()
    },
    async: false
});

ajaxACLResources_productinterest.ajaxCallWidget({
    onError: function (event, textStatus, errorThrown) {
        dm.dangerMessage({
            onShown: function () {
                $('#loading-image-productinterest').loadImager('removeLoadImage');
            }
        });
        dm.dangerMessage('show', 'servis Bulunamamıştır...',
            'Servis  bulunamamıştır...');
    },
    onSuccess: function (event, data) {

        $('#dropdownProductInterest').ddslick({

            height: 200,
            data: data_product,
            width: '100%',
            selectText: "Select your preferred social network",
            searchText: "Search",
            //showSelectedHTML : false,
            //defaultSelectedIndex: 3,
            search: true,
            multiSelect: true,
            tagBox: 'tag-container',
            //multiSelectTagID : 'deneme',
            //imagePosition:"right",
            onSelected: function (selectedData) {
                if (selectedData.selectedData.value > 0) {

                }
            }
        });
    },
    onErrorDataNull: function (event, data) {
        dm.dangerMessage({
            onShown: function () {
                $('#loading-image-productinterest').loadImager('removeLoadImage');
            }
        });
        dm.dangerMessage('show', 'Rol Bulunamamıştır...',
            'Rol  bulunamamıştır...');
    },
})
    ajaxACLResources_productinterest.ajaxCallWidget('call');

    $("#loading-image-mansatisfaction").loadImager();
    $("#loading-image-mansatisfaction").loadImager('appendImage');

    var ajaxACLResources_mansatisfaction = $('#loading-image-mansatisfaction').ajaxCallWidget({
        proxy: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            url: '1'
            //pk: $("#pk").val()
        }

    });

    ajaxACLResources_mansatisfaction.ajaxCallWidget({
        onError: function (event, textStatus, errorThrown) {

            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-mansatisfaction').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'servis Bulunamamıştır...', 'Servis  bulunamamıştır...');
        },
        onSuccess: function (event, data) {
            //var data = $.parseJSON(cbdata);

            $('#dropdownMANSatisfaction').ddslick({
                //height: 150,
                data: data_priority,
                width: '100%',

                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value > 0) {

                    }
                }
            });

            $("#loading-image-mansatisfaction").loadImager('removeLoadImage');
        },
        onErrorDataNull: function (event, data) {
            console.log("Error : " + event + " -data :" + data);
            dm.dangerMessage({
                onShown: function () {
                    $('#loading-image-mansatisfaction').loadImager('removeLoadImage');
                }
            });
            dm.dangerMessage('show', 'mansatisfaction not show...', 'mansatisfaction not show...');
        },
    })
    ajaxACLResources_mansatisfaction.ajaxCallWidget('call');

});
