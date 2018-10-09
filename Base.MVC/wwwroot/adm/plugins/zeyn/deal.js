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
        getDealID: function (top) {
            var self = this;
            return self.options.dealID;
        },

        /**
         * add buyback to deal
         * @author Mustafa Zeynel Dağlı
         * @since 08/10/2018
         */
        addBuyBack : function (top) {
            
        },

        /**
         * add tradeback to deal
         * @author Mustafa Zeynel Dağlı
         * @since 08/10/2018
         */
        addTradeBack: function (top) {

        },

        /**
         * add vehicle type to deal
         * @author Mustafa Zeynel Dağlı
         * @since 09/10/2018
         */
        addVehicleType: function (vehicleTypeData) {
            var self = this;
            var vehicleTypes = self.options.vehicleTypes;
            vehicleTypes.push(vehicleTypeData);
            console.log(self.options.vehicleTypes);
        },

    });

}(jQuery));