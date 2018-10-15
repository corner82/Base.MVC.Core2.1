(function ($) {
    /**
* manage deal
* @author Mustafa Zeynel Dağlı
* @since 08/10/2018
*/
    $.widget("sanalfabrika.deal", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            dealID: null,
            buyBacks: [],
            tradeBacks: [],
            vehicleTypes: [],
            //vehicleType : 
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
        },

        /**
         * get deal id
         * @author Mustafa Zeynel Dağlı
         * @since 08/10/2018
         */
        getDealID: function () {
            var self = this;
            return self.options.dealID;
        },

        /**
         * set deal id
         * @author Mustafa Zeynel Dağlı
         * @since 08/10/2018
         */
        setDealID: function (dealID) {
            var self = this;
            return self.options.dealID = dealID;
        },

        /**
         * add buyback to deal
         * @author Mustafa Zeynel Dağlı
         * @since 08/10/2018
         */
        addBuyBack: function (buyBackData) {
            var self = this;
            var buyBacks = self.options.buyBacks;
            buyBacks.push(buyBackData);
            console.log(self.options.buyBackData);
        },

        /**
         * add tradeback to deal
         * @author Mustafa Zeynel Dağlı
         * @since 08/10/2018
         */
        addTradeBack: function (tradeBackData) {
            var self = this;
            var tradeBacks = self.options.tradeBacks;
            tradeBacks.push(tradeBackData);
            console.log(self.options.tradeBacks);
        },

        /**
         * add vehicle type to deal
         * @author Mustafa Zeynel Dağlı
         * @since 09/10/2018
         */
        addVehicleType : function (vehicleTypeData) {
            var self = this;
            var vehicleTypes = self.options.vehicleTypes;
            vehicleTypes.push(vehicleTypeData);
            console.log(self.options.vehicleTypes);
        },

        /**
         * get vehicle types from deal
         * @author Mustafa Zeynel Dağlı
         * @since 12/10/2018
         */
        getVehicleTypes : function (vehicleTypeData) {
            var self = this;
            var vehicleTypes = self.options.vehicleTypes;
            return vehicleTypes;
        },

    });

}(jQuery));