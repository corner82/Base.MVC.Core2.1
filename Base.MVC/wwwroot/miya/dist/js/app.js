
'use strict';

//Make sure jQuery has been loaded before app.js
if (typeof jQuery === "undefined") {
    throw new Error("requires jQuery");
}

  
/**
 * page loading image fade out
 * @param {type} param
 * @author Mustafa Zeynel Dağlı
 * @since 28/09/2016
 */
$(window).load(function() {
        // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");
   
});

/**
 * local storage variables set null
 * @param {type} param
 * @author Mustafa Zeynel Dağlı
 * @since 25/10/2017
 */
// Recipe pages
/*localStorage.setItem('FarmerId', '');
localStorage.setItem('TaxNo', '');
localStorage.setItem('TCKN', '');
localStorage.setItem('TaxNoTab2', '');
localStorage.setItem('TCKNTab2', '');*/
// License page(popup)
/*localStorage.setItem('PlaceId', '');
localStorage.setItem('LicenseFasonPopupOpen', false);
localStorage.setItem('LicenseCompanyPopupOpen', false);*/


(function ($) {
    var oldJqTrigger = jQuery.fn.trigger;
    jQuery.fn.trigger = function () {
        if (arguments && arguments.length > 0) {
            if (typeof arguments[0] == "object") {
                if (typeof arguments[0].type == "string") {
                    if (arguments[0].type == "show.bs.modal") {
                        var ret = oldJqTrigger.apply(this, arguments);
                        if ($('.modal:visible').length) {
                            $('.modal-backdrop.in').first().css('z-index', parseInt($('.modal:visible').last().css('z-index')) + 10);
                            $(this).css('z-index', parseInt($('.modal-backdrop.in').first().css('z-index')) + 10);
                        }
                        return ret;
                    }
                }
            }
            else if (typeof arguments[0] == "string") {
                if (arguments[0] == "hidden.bs.modal") {
                    if ($('.modal:visible').length) {
                        $('.modal-backdrop').first().css('z-index', parseInt($('.modal:visible').last().css('z-index')) - 10);
                        $('body').addClass('modal-open');
                    }
                }
            }
        }
        return oldJqTrigger.apply(this, arguments);
    };
})(jQuery);


