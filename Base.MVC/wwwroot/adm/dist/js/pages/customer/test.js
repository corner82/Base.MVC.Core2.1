$(document).ready(function () {

    var employees = [{
        "ID": 1,
        "FirstName": "John",
        "LastName": "Heart",
        "Prefix": "Mr.",
        "Position": "CTO",
        "StateID": 5,
        "CityID": 17
    }, {
        "ID": 2,
        "FirstName": "Olivia",
        "LastName": "Peyton",
        "Prefix": "Mrs.",
        "Position": "HR Manager",
        "StateID": 5,
        "CityID": 17
    }, {
        "ID": 3,
        "FirstName": "Robert",
        "LastName": "Reagan",
        "Prefix": "Mr.",
        "Position": "IT Manager",
        "StateID": 4,
        "CityID": 14
    }, {
        "ID": 4,
        "FirstName": "Greta",
        "LastName": "Sims",
        "Prefix": "Ms.",
        "Position": "Shipping Manager",
        "StateID": 3,
        "CityID": 8
    }, {
        "ID": 5,
        "FirstName": "Brett",
        "LastName": "Wade",
        "Prefix": "Mr.",
        "Position": "Shipping Manager",
        "StateID": 3,
        "CityID": 9
    }, {
        "ID": 6,
        "FirstName": "Sandra",
        "LastName": "Johnson",
        "Prefix": "Mrs.",
        "Position": "Network Admin",
        "StateID": 2,
        "CityID": 6
    }, {
        "ID": 7,
        "FirstName": "Kevin",
        "LastName": "Carter",
        "Prefix": "Mr.",
        "Position": "Network Admin",
        "StateID": 1,
        "CityID": 3
    }, {
        "ID": 8,
        "FirstName": "Cynthia",
        "LastName": "Stanwick",
        "Prefix": "Ms.",
        "Position": "Sales Assistant",
        "StateID": 1,
        "CityID": 3
    }, {
        "ID": 9,
        "FirstName": "Kent",
        "LastName": "Samuelson",
        "Prefix": "Dr.",
        "Position": "Sales Assistant",
        "StateID": 1,
        "CityID": 2
    }, {
        "ID": 10,
        "FirstName": "Taylor",
        "LastName": "Riley",
        "Prefix": "Mr.",
        "Position": "Support Assistant",
        "StateID": 5,
        "CityID": 17
    }, {
        "ID": 11,
        "FirstName": "Sam",
        "LastName": "Hill",
        "Prefix": "Mr.",
        "Position": "Sales Assistant",
        "StateID": 2,
        "CityID": 5
    }, {
        "ID": 12,
        "FirstName": "Kelly",
        "LastName": "Rodriguez",
        "Prefix": "Ms.",
        "Position": "Sales Assistant",
        "StateID": 5,
        "CityID": 17
    }, {
        "ID": 13,
        "FirstName": "Natalie",
        "LastName": "Maguirre",
        "Prefix": "Mrs.",
        "Position": "Sales Assistant",
        "StateID": 4,
        "CityID": 14
    }, {
        "ID": 14,
        "FirstName": "Walter",
        "LastName": "Hobbs",
        "Prefix": "Mr.",
        "Position": "Support Assistant",
        "StateID": 2,
        "CityID": 5
    }];

    var states = [{
        "ID": 1,
        "Name": "Alabama",
        "CountryID": 1
    }, {
        "ID": 2,
        "Name": "Alaska"
    }, {
        "ID": 3,
        "Name": "Arizona"
    }, {
        "ID": 4,
        "Name": "Arkansas"
    }, {
        "ID": 5,
        "Name": "California"
    }];

    var cities = [{
        "ID": 1,
        "Name": "Tuscaloosa",
        "StateID": 1
    }, {
        "ID": 2,
        "Name": "Hoover",
        "StateID": 1
    }, {
        "ID": 3,
        "Name": "Dothan",
        "StateID": 1
    }, {
        "ID": 4,
        "Name": "Decatur",
        "StateID": 1
    }, {
        "ID": 5,
        "Name": "Anchorage",
        "StateID": 2
    }, {
        "ID": 6,
        "Name": "Fairbanks",
        "StateID": 2
    }, {
        "ID": 7,
        "Name": "Juneau",
        "StateID": 2
    }, {
        "ID": 8,
        "Name": "Avondale",
        "StateID": 3
    }, {
        "ID": 9,
        "Name": "Buckeye",
        "StateID": 3
    }, {
        "ID": 10,
        "Name": "Carefree",
        "StateID": 3
    }, {
        "ID": 11,
        "Name": "Springdale",
        "StateID": 4
    }, {
        "ID": 12,
        "Name": "Rogers",
        "StateID": 4
    }, {
        "ID": 13,
        "Name": "Sherwood",
        "StateID": 4
    }, {
        "ID": 14,
        "Name": "Jacksonville",
        "StateID": 4
    }, {
        "ID": 15,
        "Name": "Cabot",
        "StateID": 4
    }, {
        "ID": 16,
        "Name": "Adelanto",
        "StateID": 5
    }, {
        "ID": 17,
        "Name": "Glendale",
        "StateID": 5
    }, {
        "ID": 18,
        "Name": "Moorpark",
        "StateID": 5
    }, {
        "ID": 19,
        "Name": "Needles",
        "StateID": 5
    }, {
        "ID": 20,
        "Name": "Ontario",
        "StateID": 5
        }];





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



    $("#gridContainer").dxDataGrid({
        keyExpr: "ID",
        dataSource: employees,
        showBorders: true,
        editing: {
            allowUpdating: true,
            allowAdding: true,
            mode: "form"
        },
        onEditorPreparing: function (e) {
            if (e.parentType === "dataRow" && e.dataField === "CityID") {
                e.editorOptions.disabled = (typeof e.row.data.StateID !== "number");
            }
        },
        columns: ["FirstName", "LastName", "Position",
            {
                dataField: "StateID",
                caption: "State",
                setCellValue: function (rowData, value) {
                    rowData.StateID = value;
                    rowData.CityID = null;
                },
                lookup: {
                    dataSource: states,
                    valueExpr: "ID",
                    displayExpr: "Name"
                }
            },
            {
                dataField: "CityID",
                caption: "City",
                lookup: {
                    dataSource: function (options) {
                        return {
                            store: cities,
                            filter: options.data ? ["StateID", "=", options.data.StateID] : null
                        };
                    },
                    valueExpr: "ID",
                    displayExpr: "Name"
                }
            }
        ]
    });

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
