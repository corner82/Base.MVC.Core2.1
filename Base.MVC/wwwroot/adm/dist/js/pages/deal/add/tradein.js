$(document).ready(function () {

    //----------------------------------loadImager begin-------------------------------------------------
    $('#tab_TradeIn').loadImager();
    $('#loadingImage_DdslickOverAllowanceType').loadImager();
    //----------------------------------loadImager end-------------------------------------------------

    //----------------------------------tagcabin begin-------------------------------------------------
    var tagdataTradeIns = [{ "id": "120", "text": "TGS-26-4406X4BLS-LX-ALU-EL / 12 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "73", "privilege_name_eng": "Assign Consultant" } },
    { "id": "41", "text": "TGS-26-4406X4BLS-LX-ALU-ELX / 10 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "45", "privilege_name_eng": "You can list the database \/*table*\/." } },
    { "id": "47", "text": "TGS-16-4406X4BLS-LX-ALU-EL /8 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "51", "privilege_name_eng": "Menu Active \/  Passive" } },
    { "id": "46", "text": "TGS-26-5406X4BLS-LX-ALU-EL / 4 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "44", "privilege_name_eng": "Menu \/*Insert*\/" } },
    { "id": "48", "text": "TGX-26-5406X4BLS-LX-ALU-EL / 2 pieces", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "49", "privilege_name_eng": "Menu Update" } },
    { "id": "49", "text": "TGV-26-5406X4BLS-LX-ALU-EL / 1 piece", "attributes": { "active": 0, "resource_id": 21, "role_id": 1, "privilege_id": "50", "privilege_name_eng": "Menu\/* delete*\/" } }];
    var tagBuilderTradeIns = $('#tagcabin_TradeIns').tagCabin({
        tagCopy: true,
        tagDeletable: true,
        tagDeletableAll: false,
        tagBox: $('.tag-container-tradeins').find('ul'),
        //dataMapper: {attributes : Array('role_id', 'resource_id', 'privilege_id')}
        //dataMapper: Array('role_id', 'resource_id', 'privilege_id')

    });
    //var testArr = ['text', 'value'];
    tagBuilderTradeIns.tagCabin('addTags', JSON.stringify(tagdataTradeIns)/*, testArr*/);
    //----------------------------------tagcabin end-------------------------------------------------


    /**
     * tab organizer events attached
     * @author Mustafa Zeynel Dağlı
     * @since 15/08/2018
     */
    $("#deal_hidden").organizeTabs({
        onAftertab_TradeIn: function (e) {
            
            if (parseInt($("#deal_hidden").deal("getDealID")) > 0) {

                var vehicleTypes = $("#deal_hidden").deal("getVehicleTypes");
                if (vehicleTypes.length == 0) {

                    /*$('#tab_BuyBack').loadImager('removeLoadImage');
                    $('#tab_BuyBack').loadImager('appendImage');*/

                    $(window).warningMessage('resetOnShown');
                    $(window).warningMessage('show', window.lang.translate("You must add at least one vehicle type to deal"),
                        window.lang.translate("You must add at least one vehicle type to deal"));
                    return false;
                }
            } else {
                /*$('#tab_BuyBack').loadImager('removeLoadImage');
                $('#tab_BuyBack').loadImager('appendImage');*/

                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select deal"),
                    window.lang.translate("Please select deal"));
                // $('#loadingImage_DdslickVehicleTypeBuyBack').loadImager('removeLoadImage');
            }
        },
        
    });

    //----------------------------------dropdowns begin-------------------------------------------------

    


    /**
   * ddslick deal vehicle type dropdown (aksesuar)
   * @author Mustafa Zeynel Dağlı
   * @since 17/10/2018
   */
    var ddslickOverAllowanceTypeData = [
        {
            text: 'Please select',
            value: 0,
            selected: true
        },
        {
            text: 'Equal',
            value: 1,
            selected: true
        },
        {
            text: 'Vehicle based',
            value: 2,
            selected: true
        },
    ];
    $('#loadingImage_DdslickOverAllowanceType').loadImager('removeLoadImage');
    $("#loadingImage_DdslickOverAllowanceType").loadImager('appendImage');
    //var selectedContRepMainBuyBack = false;
    $('#ddslickOverAllowanceType').ddslick({
        //height: 150,
        data: ddslickOverAllowanceTypeData,
        width: '100%',
        onSelected: function (selectedData) {
            /*if (selectedContRepMainBuyBack == true) $("#gridContainer_BuyBack").dxDataGrid("instance").refresh();
            selectedContRepMainBuyBack = true;*/
            if (selectedData.selectedData.value > 0) {
                //$("#gridContainer_BuyBack").dxDataGrid("instance").refresh();

            }
        }
    });
    $("#loadingImage_DdslickOverAllowanceType").loadImager('removeLoadImage');


    //----------------------------------dropdowns end-------------------------------------------------


    //----------------------------------add tradein to deal begin-------------------------------------------------

    /**
     * loading image for add tradein process
     * */
    $('#tab_TradeIn').loadImager();

    /**
     * add tradein form body reset
     * @author Mustafa Zeynel Dağlı
     * */
    var resetTradeInAddDealForm = function () {
        $('#addTradeInForm').validationEngine('hide');
        $('#addTradeInForm')[0].reset();
        //$('#ddslickDealVehicleTypeBody').ddslick("select", { index: '0' });

    }

    /**
     * add trade in form validation engine activated
     * @author Mustafa Zeynel Dağlı
     * */
    $("#addTradeInForm").validationEngine();


    /**
     * add aksesuar click event handler
     * @author Mustafa Zeynel Dağlı
     * */
    $("#add_aksesuar").on("click", function (e) {
        e.preventDefault();
        $('#tab_Aksesuar').loadImager('removeLoadImage');
        $("#tab_Aksesuar").loadImager('appendImage');

        var dealID = null;
        if ($("#deal_hidden").deal()) {
            dealID = $("#deal_hidden").deal("getDealID");
        }
        if (dealID == null || dealID == "" || dealID <= 0) {
            $(window).warningMessage('resetOnShown');
            $(window).warningMessage('show', "Please select deal",
                "Please select deal");
            $('#tab_Aksesuar').loadImager('removeLoadImage');
            return false;
        }

        if ($("#addAksesuarForm").validationEngine('validate')) {
            var ddDataVehicleGroups = $('#ddslickVehicleGroupsAksesuar').data('ddslick');
            if (!ddDataVehicleGroups.selectedData.value > 0) {
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select vehicle group"),
                    window.lang.translate("Please select vehicle group"));
                $('#tab_Aksesuar').loadImager('removeLoadImage');
                return false;
            }

            var ddDataVehicleType = $('#ddslickDealVehicleTypeAksesuar').data('ddslick');
            if (!ddDataVehicleType.selectedData.value > 0) {
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select vehicle type"),
                    window.lang.translate("Please select vehicle type"));
                $('#tab_Aksesuar').loadImager('removeLoadImage');
                return false;
            }

            var ddDataAksesuarType = $('#ddslickAksesuarType').data('ddslick');
            if (!ddDataAksesuarType.selectedData.value > 0) {
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select accessory type"),
                    window.lang.translate("Please select accessory type"));
                $('#tab_Aksesuar').loadImager('removeLoadImage');
                return false;
            }

            var ddDataAksesuarOptions = $('#ddslickAksesuarOptions').data('ddslick');
            if (!ddDataAksesuarOptions.selectedData.value > 0) {
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select accessory options"),
                    window.lang.translate("Please select accessory options"));
                $('#tab_Aksesuar').loadImager('removeLoadImage');
                return false;
            }

            var ddDataAksesuarSuppliers = $('#ddslickAksesuarSuppliers').data('ddslick');
            if (!ddDataAksesuarSuppliers.selectedData.value > 0) {
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', window.lang.translate("Please select accessory supplier"),
                    window.lang.translate("Please select accessory supplier"));
                $('#tab_Aksesuar').loadImager('removeLoadImage');
                return false;
            }

            //alert(ddDataVehicleType.selectedData.value);
            if ($("#tagcabin_VehicleAksesuarlar").tagCabin('findSpecificTags', ddDataVehicleType.selectedData.value, 'data-attribute') != true) {
                /*tagBuilderChemicalPropGroup.tagCabin('addTagManuallyDataAttr', selectedItem.value,
                    selectedItem.text,*/
                $(window).warningMessage('resetOnShown');
                $(window).warningMessage('show', "Please select another accessory type",
                    "Please select another accessory type");
                $('#tab_Aksesuar').loadImager('removeLoadImage');
                return false;
            }

            var ajax = $('#add_aksesuar').ajaxCallWidget({
                failureLoadImage: true,
                loadingImageID: "tab_Body",
                triggerSuccessAuto: true,
                transactionSuccessText: window.lang.translate('Transaction successful'),
                transactionFailureText: window.lang.translate("Service URL not found, please report error"),
                dataAlreadyExistsText: window.lang.translate("Data already created, edit your data"),
                proxy: '/Deal/AddBodyProxyService',
                type: "POST",
                data: JSON.stringify({
                    language_code: $("#langCode").val(),
                    pk: "GsZVzEYe50uGgNM",
                    url: "pkInsertAct_infoprojectvehiclemodels",
                    pkIdentity: $("#publicKey").val(),
                    project_id: dealID,
                    is_house_deal: 0,
                    vehicle_gt_model_id: ddDataVehicleType.selectedData.value,
                    quantity: $("#quantity").val(),
                    delivery_date: "10/10/2018",
                })

            });
            ajax.ajaxCallWidget({
                onReset: function (event, data) {
                    resetVehicleTypeAddDealForm();
                },
                onAfterSuccess: function (event, data) {
                    $("#deal_hidden").deal("addVehicleType", { vehicleType: ddDataVehicleType.selectedData.value, count: $("#quantity").val() });
                    $("#tagcabin_DealBodies").tagCabin('addTagManuallyDataAttr', ddDataVehicleType.selectedData.value,
                        ddDataVehicleType.selectedData.text + " / " + $("#quantity").val(),

                    );

                    /*var tagBuilderChemicalPropGroup = $('#chemical-property-group-cabin').tagCabin({
                        tagCopy: false,
                        tagDeletable: true,
                        tagDeletableAll: false,
                        tagBox: $('.tag-container-chemical-property-group').find('ul'),
    
                    });*/

                }
            })
            //ajax.ajaxCallWidget('call');

        } else {
            $('#tab_Aksesuar').loadImager('removeLoadImage');
        }

        
        return false;
    })

    // add aksesuar reset
    $("#add_aksesuar_reset").on("click", function (e) {
        e.preventDefault();
        resetAksesuarAddDealForm();
        return false;
    })

    //----------------------------------add aksesuar to deal end-------------------------------------------------


    //----------------------------------asider begin-------------------------------------------------

    /**
     * add tradein to deal asider opening
     * @author Mustafa Zeynel Dağlı
     * @since 16/10/2018
     * */
    $('#tradeInAddAside').asideRight({
        width: "900"
    });

    /**
     * add tradein asider events
     * @author Mustafa Zeynel Dağlı
     * @since 16/10/2018
     * */
    $('#tradeInAddAside').asideRight({
        onClosed: function (event, element) {
            //alert('onclosed event right slider');
        },
        onClosing: function (event, element) {
            //alert('onclosing event right slider');
        },
        onOpened: function (event, element) {
            //alert('onopened event right slider');
        },
        onOpening: function (event, element) {
            //console.log(element);
            //alert('onopening event right slider');
        }
    });

    /**
      * add tradin vehicle asider opening
      * @author Mustafa Zeynel Dağlı
      * @since 16/10/2018
      * */
    $("#toggle_TradeInAsider").on("click", function (e) {
        e.preventDefault();
        $('#tradeInAddAside').asideRight('setFromTop', (parseFloat($(this).offset().top)) - 500);
        $('#tradeInAddAside').asideRight('toggle');
    });

    /**
     * add tradein asider closing
     * @author Mustafa Zeynel Dağlı
     * @since 16/10/2018
     * */
    $("#toggle_closeTradeInAside").on("click", function () {
        $('#tradeInAddAside').asideRight('toggle');
    });


    //----------------------------------asider end-------------------------------------------------

});