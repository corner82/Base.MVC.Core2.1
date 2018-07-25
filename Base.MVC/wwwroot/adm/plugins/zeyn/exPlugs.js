
// dasboard sayfasında birinci sütun özet bilgi başlıklarını yazdırır
(function ($) {

    $.fn.numFormatter = function (nStr) {
        nStr += '';
        x = nStr.split(',');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1;
    };

    $.fn.headerSetter = function (data, options) {
        var data = data;
        //console.error(data);
        var opts = $.extend({}, $.fn.headerSetter.defaults, options);
        //console.log(opts);
        return this.each(function () {
            $this = $(this);
            //$this.find('div:first').html( data.adet);
            if (typeof data != 'undefined') {
                $this.find('div:first h3:first-child').html(data.adet);
                $this.find('p:first').html(data.aciklama);
            }
        });
    };

    $.fn.headerSetter.defaults = {
        class: 'test',
        background: 'yellow'
    };

    $.fn.headerSetterAfterSales = function (data, options) {
        var data = data;
        var opts = $.extend({}, $.fn.headerSetterAfterSales.defaults, options);
        return this.each(function () {
            $this = $(this);
            if (typeof data != 'undefined') {
                $this.find('div:first h3:first-child').html(data.A);
                //$.number( 5020.2364 )
                //$this.find('p:first').html(data.ACIKLAMA);
            }
        });
    };
    $.fn.headerSetterAfterSalesStocks = function (data, options) {
        var data = data;
        var opts = $.extend({}, $.fn.headerSetterAfterSales.defaults, options);
        return this.each(function () {
            $this = $(this);
            //console.log('explug değer-->'+data.A);
            if (typeof data != 'undefined') {
                $this.find('div:first h3:first-child').html($.number(data.A) + ' &#x20BA');
                //$.number( 5020.2364 )
                //$this.find('p:first').html(data.ACIKLAMA);
            }
        });
    };

    $.fn.headerSetterAfterSalesStocksNew = function (data, options) {
        var data = data;
        var opts = $.extend({}, $.fn.headerSetterAfterSales.defaults, options);
        return this.each(function () {
            $this = $(this);
            console.log('explug değer-->' + data.A);
            if (typeof data != 'undefined') {
                $this.find('div:first h3:first-child').html($.number(data.A) + ' &#x20BA');
                //$.number( 5020.2364 )
                //$this.find('p:first').html(data.ACIKLAMA);
            }
        });
    };

    $.fn.headerSetterAfterSalesYedekParcaDashboard = function (data, options) {
        var data = data;
        var opts = $.extend({}, $.fn.headerSetterAfterSales.defaults, options);
        return this.each(function () {
            $this = $(this);
            if (typeof data != 'undefined') {
                $this.find('div:first h3:first-child').html(data + ' &#x20BA');
                //$.number( 5020.2364 )
                //$this.find('p:first').html(data.ACIKLAMA);
            }
        });
    };

    $.fn.headerSetterAfterSalesDowntime = function (data, options) {
        var data = data;
        var opts = $.extend({}, $.fn.headerSetterAfterSales.defaults, options);
        return this.each(function () {
            $this = $(this);
            if (typeof data != 'undefined') {
                $this.find('div:first h3:first-child').html(data);
                //$.number( 5020.2364 )
                //$this.find('p:first').html(data.ACIKLAMA);
            }
        });
    };

    $.fn.headerSetter.defaults = {
        class: 'test',
        background: 'yellow'
    };

    $.fn.headerSetterAfterSalesInvoices = function (data, options) {
        var opts = $.extend({}, $.fn.headerSetterAfterSalesInvoices.defaults, options);
        var data = data;
        return this.each(function () {
            $this = $(this);
            if (typeof data != 'undefined') {
                $this.find('h3:first').remove();
                $this.find('span:first ').html(data.A + ' ' + window.lang.translate('piece'));
                //$this.find('span:last').html(data.ACIKLAMA);
            }
        });
    };
    $.fn.headerSetterAfterSalesInvoices.defaults = {
        class: 'test',
        background: 'yellow'
    };

    $.fn.headerSetterAfterSalesInvoicesNew = function (data, options) {
        var opts = $.extend({}, $.fn.headerSetterAfterSalesInvoices.defaults, options);
        var data = data;
        return this.each(function () {
            $this = $(this);
            if (typeof data != 'undefined') {
                $this.find('h3:first').remove();
                if (data.A == null) data.A = 0;
                $this.find('span:first ').html(data.A + ' &#x20BA');
                //$this.find('span:last').html(data.ACIKLAMA);
            }
        });
    };

    $.fn.headerSetterAfterSalesCiro = function (data, options) {
        var opts = $.extend({}, $.fn.headerSetterAfterSalesCiro.defaults, options);
        var data = data;
        return this.each(function () {
            $this = $(this);
            if (typeof data != 'undefined') {
                $this.find('h3:first').remove();
                $this.find('span:first ').html($.fn.numFormatter(data.A));
                $this.find('span:first ').html(data.A);
                //$this.find('span:nth-child(2)').html(data.ACIKLAMA);
            }
        });
    };
    $.fn.headerSetterAfterSalesCiro.defaults = {
        class: 'test',
        background: 'yellow'
    };

    $.fn.headerSetterAfterSalesMusteriCompare = function (todayData, yesterdayData, options) {
        var today = parseInt(todayData);
        var yesterday = parseInt(yesterdayData);
        var yuzde;
        $this = $(this);
        var opts = $.extend({}, $.fn.headerSetterAfterSalesMusteriCompare.defaults, options);
        //console.log(opts);

        if (today != null && yesterday != null) {
            if (today > yesterday) {
                //alert('bugün datası daha büyük');
                yuzde = $.fn.yuzdeHesaplaGreater(today, yesterday);
                //console.log(yuzde);
                $this.find('div:first').css("width", yuzde + "%");
                if (yuzde == 0) {
                    $this.next().html(window.lang.translate('Too high compared to the previous day'));
                } else {
                    $this.next().html(window.lang.translate('More than the previous day') + '  ' + yuzde + '%');
                }
            } else if (yesterday > today) {
                //alert('dün datası daha büyük');
                yuzde = $.fn.yuzdeHesaplaLittle(today, yesterday);
                //console.log(yuzde);
                $this.find('div:first').css("width", yuzde + "%");
                if (yuzde == 0) {
                    $this.next().html(window.lang.translate('Too low compared to the previous day'));
                } else {
                    $this.next().html(window.lang.translate('Lower the previous day') + '  ' + yuzde + '%');
                }
            } else if (yesterday = today) {
                //alert('dün datası == bugün datası');
                $this.find('div:first').css("width", "0%");
                $this.next().html(window.lang.translate('Equal to previous day'));
            }
        }
    };
    $.fn.headerSetterAfterSalesMusteriCompare.defaults = {
        compare: 'today_little',
    };

    $.fn.headerSetterAfterSalesCiroCompare = function (todayData, yesterdayData, options) {
        var today = parseInt(todayData);
        var yesterday = parseInt(yesterdayData);
        var yuzde;
        $this = $(this);
        var opts = $.extend({}, $.fn.headerSetterAfterSalesCiroCompare.defaults, options);
        //console.log(opts);

        if (today != null && yesterday != null) {
            if (today > yesterday) {
                //alert('bugün datası daha büyük');
                yuzde = $.fn.yuzdeHesaplaGreater(today, yesterday);
                //console.log(yuzde);
                $this.find('div:first').css("width", yuzde + "%");
                if (yuzde == 0) {
                    $this.next().html(window.lang.translate('Too high compared to the previous day'));
                } else {
                    $this.next().html(window.lang.translate('More than the previous day') + '  ' + yuzde + '%');
                }
            } else if (yesterday > today) {
                //alert('dün datası daha büyük');
                yuzde = $.fn.yuzdeHesaplaLittle(today, yesterday);
                //console.log(yuzde);
                $this.find('div:first').css("width", yuzde + "%");
                if (yuzde == 0) {
                    $this.next().html(window.lang.translate('Too low compared to the previous day'));
                } else {
                    $this.next().html(window.lang.translate('Lower the previous day') + '  ' + yuzde + '%');
                }
            } else if (yesterday = today) {
                //alert('dün datası == bugün datası');
                $this.find('div:first').css("width", "0%");
                $this.next().html(window.lang.translate('Equal to previous day'));
            }
        }

    };
    $.fn.headerSetterAfterSalesCiroCompare.defaults = {
        compare: 'today_little',
    };

    $.fn.yuzdeHesaplaGreater = function (todayData, yesterdayData, opts) {
        var today = parseInt(todayData);
        var yesterday = parseInt(yesterdayData);

        if (today > 0 && yesterday > 0) {
            var yuzde = Math.floor((yesterday / today) * 100);
            //console.log(yuzde);
            if (yuzde < 100) {
                return 100 - yuzde;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    };

    $.fn.yuzdeHesaplaLittle = function (todayData, yesterdayData) {
        var today = parseInt(todayData);
        var yesterday = parseInt(yesterdayData);

        if (today > 0 && yesterday > 0) {
            //alert('yuzdeHesaplaLittle');
            var yuzde = Math.floor((today / yesterday) * 100);
            //var yuzde2 = Math.floor(today/(yesterday*100));
            //console.log(yuzde);
            if (yuzde < 100) {
                return 100 - yuzde;
            } else {
                return 0;
            }
            //console.log(yuzde2);
        } else {
            return 0;
        }

    };

    $.fn.yuzdeHesaplaGreaterBayiFaturalar = function (todayData, yesterdayData, opts) {
        var today = parseInt(todayData);
        var yesterday = parseInt(yesterdayData);

        if (today > 0 && yesterday > 0) {
            var yuzde = Math.floor((yesterday / today) * 100);
            //console.log(yuzde);
            if (yuzde < 100) {
                //return 100-yuzde;
                return yuzde;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    };

    $.fn.yuzdeHesaplaLittleBayiFaturalar = function (todayData, yesterdayData) {
        var today = parseInt(todayData);
        var yesterday = parseInt(yesterdayData);

        if (today > 0 && yesterday > 0) {
            //alert('yuzdeHesaplaLittle');
            var yuzde = Math.floor((today / yesterday) * 100);
            //var yuzde2 = Math.floor(today/(yesterday*100));
            //console.log(yuzde);
            if (yuzde < 100) {
                //return 100-yuzde;
                return yuzde;
            } else {
                return yuzde - 100;
            }
            //console.log(yuzde2);
        } else {
            return 0;
        }

    };

}(jQuery));



(function ($) {

    /**
     * jquery lang master  object return dynamically
     * @author Mustafa Zeynel Dağlı
     * @since 15/05/2018
     */
    $.widget("sanalfabrika.jsLangMaster", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            langDefault: null,

        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
            var self = this;
            if ($("#langCode").length > 0) {
                if ($("#langCode").val() != null && $("#langCode").val() != '') {
                    //alert('lang code bulundu2');
                    self.options.langDefault = $("#langCode").val();
                }

            } else if (Cookies && Cookies.length > 0) {
                if (Cookies.get('langCookie') != null && Cookies.get('langCookie') != '') {
                    //alert('lang code bulundu1');
                    self.options.langDefault = Cookies.get('langCookie');
                }
            } else {
                //alert('lang code bulundu3');
                self.options.langDefault = 'tr';
            }

            //jquery lang master
            window.lang = new Lang();

            //lang.dynamic('tr', '../plugins/jquery-lang-js-master/js/langpack/tr.json');
            window.lang.dynamic('th', '/adm/plugins/jquery-lang-js-master/js/langpack/th.json');
            window.lang.dynamic('tr', '/adm/plugins/jquery-lang-js-master/js/langpack/tr.json');
            window.lang.dynamic('ar', '/adm/plugins/jquery-lang-js-master/js/langpack/ar.json');
            window.lang.dynamic('zh', '/adm/plugins/jquery-lang-js-master/js/langpack/zh.json');
            window.lang.dynamic('fa', '/adm/plugins/jquery-lang-js-master/js/langpack/fa.json');
            window.lang.dynamic('ru', '/adm/plugins/jquery-lang-js-master/js/langpack/ru.json');
            window.lang.dynamic('de', '/adm/plugins/jquery-lang-js-master/js/langpack/de.json');
            window.lang.dynamic('af', '/adm/plugins/jquery-lang-js-master/js/langpack/af.json');
            window.lang.init({
                defaultLang: 'en'
            });
            /* setTimeout(function() {
                     //console.log("adet translated =>"+window.lang.translate('piece'));
                     //alert(window.lang.translate('Brand Sales Units'));
                     window.lang.change(self.options.langDefault);
                 }, 4000);*/
            //alert(self.options.langDefault);
            window.lang.change(self.options.langDefault);
        },


    });

    /**
     * highcharts lang object return dynamically
     * @author Mustafa Zeynel Dağlı
     * @since 11/05/2018
     */
    $.widget("sanalfabrika.highChartsLang", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            langChart: null,

        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {

        },
        /**
         * public method to fill list data
         * @returns {null}
         */
        getHighChartsLang: function () {

            //console.warn(this.options.data[0].aciklama);  
            /**
             * main dom objects are found and data filled
             *  
             */
            var self = this;
            var lang = {
                downloadCSV: 'csv indir',
                downloadJPEG: 'jpeg indir',
                downloadPDF: 'pdf indir',
                downloadPNG: 'png indir',
                downloadSVG: 'svg indir',
                downloadXLS: 'xls indir',
                printChart: 'xls indir',
            };
            if ($("#langCode").length > 0) {
                if ($("#langCode").val() != null && $("#langCode").val() != '') {
                    self.options.langChart = $("#langCode").val();
                }
            } else if (Cookies && Cookies.length > 0) {
                if (Cookies.get('langCookie') != null && Cookies.get('langCookie') != '') {
                    self.options.langChart = Cookies.get('langCookie');
                }
            } else {
                self.options.langChart = 'tr';
            }
            //console.log('self options langchart->'+self.options.langChart);
            if (self.options.langChart != null) {
                if (self.options.langChart == 'ar') {
                    lang = {
                        downloadCSV: 'csvتحميل ',
                        downloadJPEG: 'jpegتحميل ',
                        downloadPDF: 'pdfتحميل ',
                        downloadPNG: 'pngتحميل ',
                        downloadSVG: 'svgتحميل ',
                        downloadXLS: 'xlsتحميل ',
                        printChart: 'الرسم البياني للطباعة',
                    };
                } else if (self.options.langChart == 'fa') {
                    lang = {
                        downloadCSV: 'csv دانلود',
                        downloadJPEG: 'jpeg دانلود',
                        downloadPDF: 'pdf دانلود',
                        downloadPNG: 'png دانلود',
                        downloadSVG: 'svg دانلود',
                        downloadXLS: 'xls دانلود',
                        printChart: 'نمودار چاپ',
                    };
                } else if (self.options.langChart == 'en') {
                    lang = {
                        downloadCSV: 'download csv',
                        downloadJPEG: 'download jpeg',
                        downloadPDF: 'download pdf',
                        downloadPNG: 'download png',
                        downloadSVG: 'download svg',
                        downloadXLS: 'download xls',
                        printChart: 'print chart',
                    };
                } else if (self.options.langChart == 'tr') {
                    lang = {
                        downloadCSV: 'csv indir',
                        downloadJPEG: 'jpeg indir',
                        downloadPDF: 'pdf indir',
                        downloadPNG: 'png indir',
                        downloadSVG: 'svg indir',
                        downloadXLS: 'xls indir',
                        printChart: 'yazdır',
                    };
                } else if (self.options.langChart == 'de') {
                    lang = {
                        downloadCSV: 'herunterladen csv',
                        downloadJPEG: 'herunterladen jpeg',
                        downloadPDF: 'herunterladen pdf',
                        downloadPNG: 'herunterladen png',
                        downloadSVG: 'herunterladen svg',
                        downloadXLS: 'herunterladen xls',
                        printChart: 'diagramm drucken',
                    };
                } else if (self.options.langChart == 'ru') {
                    lang = {
                        downloadCSV: 'скачать csv',
                        downloadJPEG: 'скачать jpeg',
                        downloadPDF: 'скачать pdf',
                        downloadPNG: 'скачать png',
                        downloadSVG: 'скачать svg',
                        downloadXLS: 'скачать xls',
                        printChart: 'график печати',
                    };
                } else if (self.options.langChart == 'zh') {
                    lang = {
                        downloadCSV: '下载 csv',
                        downloadJPEG: '下载 jpeg',
                        downloadPDF: '下载 pdf',
                        downloadPNG: '下载 png',
                        downloadSVG: '下载 svg',
                        downloadXLS: '下载 xls',
                        printChart: '打印图表',
                    };
                }
            }
            //console.log(lang);
            return lang;
        },
        /**
         * public method to fill list data
         * @returns {null}
         */
        fill2: function () {

            //console.warn(this.options.data[0].aciklama);  
            /**
             * main dom objects are found and data filled
             *  
             */
            var self = this;

            if (self.options.data != null) {
                //alert('data null değil');
                var numerator = 1
                //console.log(self.options.data);
                $.each(self.options.data, function (key, value) {
                    //console.log(value);
                    var servis = '';
                    var tarih = '';
                    if (value.SERVIS != null) servis = value.SERVIS.substr(0, 30);
                    if (value.TARIH != null) tarih = value.TARIH.substr(0, 30);
                    self.element.find('li:nth-child(' + numerator + ')').find('span:nth-child(3)').html(servis + '-' + tarih);
                    numerator++;
                    //console.log(numerator);
                });
            }

        },
        hide: function () {

        }
    });

    /**
     * any todo list vs. structures can be filled with data dynamically
     * @author Mustafa Zeynel Dağlı
     * @since 02/05/2018
     */
    $.widget("sanalfabrika.listFiller", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            data: null,
            rowCount: 0,
            searchPattern: '',
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {

        },
        /**
         * public method to fill list data
         * @returns {null}
         */
        fill: function () {

            //console.warn(this.options.data[0].aciklama);  
            /**
             * main dom objects are found and data filled
             *  
             */
            var self = this;

            if (self.options.data != null) {
                //alert('data null değil');
                var numerator = 1
                //console.log(self.options.data);
                $.each(self.options.data, function (key, value) {
                    //console.log(value.SERVIS);
                    var ad = '';
                    var tarih = '';
                    if (value.AD != null) ad = value.AD.substr(0, 30);
                    if (value.TARIH != null) tarih = value.TARIH.substr(0, 30);
                    self.element.find('li:nth-child(' + numerator + ')').find('span:nth-child(2)').html(ad + '-' + tarih);
                    numerator++;
                    //console.log(numerator);
                });
            }

        },
        /**
         * public method to fill list data
         * @returns {null}
         */
        fill2: function () {

            //console.warn(this.options.data[0].aciklama);  
            /**
             * main dom objects are found and data filled
             *  
             */
            var self = this;

            if (self.options.data != null) {
                //alert('data null değil');
                var numerator = 1
                //console.log(self.options.data);
                $.each(self.options.data, function (key, value) {
                    //console.log(value);
                    var servis = '';
                    var tarih = '';
                    if (value.SERVIS != null) servis = value.SERVIS.substr(0, 30);
                    if (value.TARIH != null) tarih = value.TARIH.substr(0, 30);
                    self.element.find('li:nth-child(' + numerator + ')').find('span:nth-child(3)').html(servis + '-' + tarih);
                    numerator++;
                    //console.log(numerator);
                });
            }

        },
        hide: function () {

        }
    });

    /**
     * create language select list dynamically
     * @author Mustafa Zeynel Dağlı
     * @since 10/05/2018
     */
    $.widget("sanalfabrika.setLangList", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            basePath: '/',
            baseLanguage: 'tr',
            requestUriTranslated: '/',
            langCode: 'tr',
            useLangMaster: 'true',
            activeLangDisplayId: 'default_lang'
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {

        },
        /**
         * public method to fill list data
         * @returns {null}
         */
        fillLangList: function () {
            //console.warn(this.options.data[0].aciklama);  
            /**
             * main dom objects are found and data filled
             *  
             */
            var self = this;

            //if(Cookies && Cookies.length>0) {
            if ($("#langCode").length > 0) {
                if ($("#langCode").val() != null && $("#langCode").val() != '') {
                    self.options.langCode = $("#langCode").val();
                }
            }
            //} 
            else if (Cookies.get('langCookie') != null && Cookies.get('langCookie') != '') {
                //alert(Cookies.get('langCookie'));
                self.options.langCode = Cookies.get('langCookie');
            } else {
                self.options.langCode = 'tr';
            }

            //console.log('set lang list->'+self.options.langCode);
            if ($("#requestUriRegulated").length > 0) {
                if ($("#requestUriRegulated").val != '' && $("#requestUriRegulated").val != null) {
                    self.options.requestUriTranslated = $("#requestUriRegulated").val()
                }
            }

            // sistem yabacı dilleri yükleniyor
            $.ajax({
                url: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
                async: true,
                data: {
                    url: 'fillComboBox_syslanguage',
                    language_code: self.options.langCode,
                    useLangMaster: 'true',
                },
                type: 'GET',
                dataType: 'json',
                //data: 'rowIndex='+rowData.id,
                success: function (data, textStatus, jqXHR) {
                    if (data.length > 0 && data != null) {
                        //alert('data null değil');
                        if (self.options.requestUriTranslated.toLowerCase().indexOf("--dil--") >= 0) {
                            var html = self._fillByLangCode(data);
                        } else {
                            var html = self._fillByDefault(data);
                        }
                        //console.log(html);
                        var numerator = 1;
                        self.element.html(html);
                    } else {
                        console.error('"fillComboBox_syslanguage" servis datası boştur!!');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('"fillComboBox_syslanguage" servis hatası->' + textStatus);
                }
            })

            var data = data;
            //console.log(self.options.langCode);
            //console.log(self.options.requestUriTranslated);
            //console.log(data);

        },

        _fillByLangCode: function (data) {
            var data = data;
            var self = this;
            var html = '';
            $.each(data, function (key, value) {

                var requestUriTranslatedLocal = self.options.requestUriTranslated;
                requestUriTranslatedLocal = requestUriTranslatedLocal.replace("--dil--", value.language_main_code);
                //console.log(requestUriTranslatedLocal);
                if (self.options.useLangMaster == 'true') {
                    if (self.options.langCode == value.language_main_code) {
                        $('#' + self.options.activeLangDisplayId + '').html(value.language);
                        html += '<li class="active">' +
                            '<a style="display:block;color:#000000;" onclick="window.lang.change(\'' + value.language_main_code + '\'); window.location.href= \'' + requestUriTranslatedLocal + '\';">' +
                            '<span class="logo-mini">' + value.language_main_code + '</span><span>&nbsp;&nbsp;&nbsp;' + value.language + '</span>' +
                            '</a>' +
                            '</li>';
                    } else {
                        html += '<li >' +
                            '<a style="display:block;color:#000000;" onclick="window.lang.change(\'' + value.language_main_code + '\'); window.location.href= \'' + requestUriTranslatedLocal + '\';">' +
                            '<span class="logo-mini">' + value.language_main_code + '</span><span>&nbsp;&nbsp;&nbsp;' + value.language + '</span>' +
                            '</a>' +
                            '</li>';
                    }
                } else {
                    if (self.options.langCode == value.language_main_code) {
                        $('#' + self.options.activeLangDisplayId + '').html(value.language);
                        html += '<li class="active">' +
                            '<a style="display:block;color:#000000;" onclick="window.lang.change(\'' + value.language_main_code + '\');window.location.href= \'' + requestUriTranslatedLocal + '\';">' +
                            '<span class="logo-mini">' + value.language_main_code + '</span><span>&nbsp;&nbsp;&nbsp;' + value.language + '</span>' +
                            '</a>' +
                            '</li>';
                    } else {
                        html += '<li >' +
                            '<a style="display:block;color:#000000;" onclick="window.lang.change(\'' + value.language_main_code + '\');window.location.href= \'' + requestUriTranslatedLocal + '\';">' +
                            '<span class="logo-mini">' + value.language_main_code + '</span><span>&nbsp;&nbsp;&nbsp;' + value.language + '</span>' +
                            '</a>' +
                            '</li>';
                    }
                }
            });
            return html;
        },

        _fillByDefault: function (data) {
            var data = data;
            var self = this;
            var html = '';
            $.each(data, function (key, value) {

                var requestUriTranslatedLocal = self.options.requestUriTranslated;
                //requestUriTranslatedLocal = requestUriTranslatedLocal.replace("--dil--", value.language_main_code);
                //console.log(requestUriTranslatedLocal);
                if (self.options.useLangMaster == 'true') {
                    if (self.options.langCode == value.language_main_code) {
                        $('#' + self.options.activeLangDisplayId + '').html(value.language);
                        html += '<li class="active">' +
                            '<a style="display:block;color:#000000;" onclick="window.lang.change(\'' + value.language_main_code + '\'); window.location.href= \'/' + value.language_main_code + requestUriTranslatedLocal + '\';">' +
                            '<span class="logo-mini">' + value.language_main_code + '</span><span>&nbsp;&nbsp;&nbsp;' + value.language + '</span>' +
                            '</a>' +
                            '</li>';
                    } else {
                        html += '<li >' +
                            '<a style="display:block;color:#000000;" onclick="window.lang.change(\'' + value.language_main_code + '\'); window.location.href= \'/' + value.language_main_code + requestUriTranslatedLocal + '\';">' +
                            '<span class="logo-mini">' + value.language_main_code + '</span><span>&nbsp;&nbsp;&nbsp;' + value.language + '</span>' +
                            '</a>' +
                            '</li>';
                    }
                } else {
                    if (self.options.langCode == value.language_main_code) {
                        $('#' + self.options.activeLangDisplayId + '').html(value.language);
                        html += '<li class="active">' +
                            '<a style="display:block;color:#000000;" onclick="window.lang.change(\'' + value.language_main_code + '\');window.location.href= \'' + value.language_main_code + requestUriTranslatedLocal + '\';">' +
                            '<span class="logo-mini">' + value.language_main_code + '</span><span>&nbsp;&nbsp;&nbsp;' + value.language + '</span>' +
                            '</a>' +
                            '</li>';
                    } else {
                        html += '<li >' +
                            '<a  style="display:block;color:#000000;" onclick="window.lang.change(\'' + value.language_main_code + '\');window.location.href= \'' + value.language_main_code + requestUriTranslatedLocal + '\';">' +
                            '<span class="logo-mini">' + value.language_main_code + '</span><span>&nbsp;&nbsp;&nbsp;' + value.language + '</span>' +
                            '</a>' +
                            '</li>';
                    }
                }

            });
            return html;
        },

    });

    /**
     * page blocking dialog after 22 minutes when page not refreshed
     * @returns {undefined}
     * @author Mustafa Zeynel Dağlı
     * @since 26/08/2016
     */
    /*setTimeout(function(){
        
        var $textAndPic = $('<div></div>');
        $textAndPic.append('<img src="https://zeynel.trf.com/dist/img/ostim_logo_en.png" />');
        $textAndPic.append('<img src="https://zeynel.trf.com/onyuz/standard/assets/img/logo1-default.png" />');
        $textAndPic.append('<h3>Sayfa Oturum Süreniz Sonlanmıştır, Lütfen Sisteme Tekrar Giriş Yapınız</h3>');
        
        
        BootstrapDialog.show({
            title: 'Sayfaya Giriş Yaptıktan Sonra Oluşan Oturum Süreniz Dolmuştur...',
            message: $textAndPic,
            closable : false, 
        });
      }, 1320000);*/

    /**
     * load imager widget for loading operations
     * @author Mustafa Zeynel Dağlı
     * @since 11/01/2016
     */
    $.widget("sanalfabrika.loadImager", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            overlay: "<div class='overlay'><div class='fa fa-refresh fa-spin'></div></div>",
            overlayKey: ".overlay:first",
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
            var self = this;
            //self.element.append(self.options.overlay);
        },
        /**
         * public method to remove loading image when necessary
         * @returns {null}
         */
        removeLoadImage: function () {
            var self = this;
            self.element.find(self.options.overlayKey).remove();
        },
        appendImage: function () {
            var self = this;
            /**
             * irf loading image appended control test
             * @author Mustafa Zeynel Dağlı
             * @since 04/10/2016
             * @todo test did always fire true so to be tested deeply before use
             */
            /*if(self.element.children().first().find('>div.fa-spin')) {
                console.log('loading image bulundu');
            }*/
            self.element.find(self.options.overlayKey).remove();
            if (typeof self.element.find(self.options.overlayKey) != 'undefined') {
                self.element.append(self.options.overlay);
            }

        }
    });

    /**
     * any todo list vs. structures can be filled with data dynamically
     * @author Mustafa Zeynel Dağlı
     * @since 05/02/2016
     */
    $.widget("sanalfabrika.todolistFiller", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            data: null,
            domObjectKey: 'span[data-zeynel="true"]',
            domObjectKeyDataLabel: 'aciklama',
            otherDomObjectKeys: null,
            otherDomObjectKeysDataLabels: null,
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {

        },
        /**
         * public method to remove loading image when necessary
         * @returns {null}
         */
        fill: function () {

            //console.warn(this.options.data[0].aciklama);  
            /**
             * main dom objects are found and data filled
             *  
             */
            var self = this;
            //console.log(self.options.data);
            $(this.options.domObjectKey).each(function (key, value) {
                if (typeof self.options.data[key] != 'undefined') {
                    var test = self.options.domObjectKeyDataLabel;
                    $(this).html(self.options.data[key][test]);
                }
            });

            /**
             * secondary dom objects are found and filled with data
             */
            if (this.options.otherDomObjectKeys != null) {
                var tobeSplited = this.options.otherDomObjectKeys;
                var arr = tobeSplited.split(',');
                $.each(arr, function (key, value) {
                    var dataLabel = self.options.otherDomObjectKeysDataLabels[key];
                    $(value).each(function (key, value) {
                        if (typeof self.options.data[key] != 'undefined') {
                            $(this).html(self.options.data[key][dataLabel] + ' gün');
                        }
                    });
                });
            }
        },
        hide: function () {

        }
    });

    /**
     * error service widget for ajax and system errors
     * @author Mustafa Zeynel Dağlı
     * @since 11/02/2016
     */
    $.widget("sanalfabrika.errorService", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            url: null,
            errorCode: null,
            pk: null,
            page: null,
            service: null,
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            errorInfo: null,
            errorUrl: null
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
        },
        /**
         * send error message to service
         * @returns {null}
         */
        send: function () {
            $.ajax({
                url: this.options.proxy,
                data: {
                    url: this.options.url,
                    error_code: this.options.errorCode,
                    pk: this.options.pk,
                    page_name: this.options.page,
                    service_name: this.options.service,
                    error_info: this.options.errorInfo,
                    url_full: this.options.errorUrl
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {

                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        },
        test: function () {
            alert('test');
        }
    });

    /**
     * wrapper for warning message
     * @author Mustafa Zeynel Dağlı
     * @since 07/04/2016
     * @version 25/08/2016 onHide call back event added
     */
    $.widget('sanalfabrika.warningDeleteMessage', {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
        },
        _create: function () {
        },
        show: function (title, message) {
            BootstrapDialog.show({
                title: title,
                message: message,
                type: BootstrapDialog.TYPE_WARNING,
                buttons: [{
                    icon: 'glyphicon glyphicon-ok-sign',
                    label: self.options.actionButtonLabel,
                    cssClass: 'btn-success',
                    action: function (dialogItself) {
                        dialogItself.close();
                        self._trigger('onConfirm', event, { data: data });
                    }
                }],
                onhide: function () {
                    self._trigger('onHide', event, { data: data });
                }
            });
        },
        resetOnShown: function () {
            this.onShown = function () {
                alert('on shown reset');
            }
        }

    });

    /**
     * wrapper for warning message for complex warning operations
     * @author Mustafa Zeynel Dağlı
     * @since 08/04/2016
     * @version 25/08/2016 onHide call back event added
     */
    $.widget('sanalfabrika.warningComplexMessage', {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            actionButtonLabel: '',
            denyButtonLabel: '',
        },
        _create: function () {
        },
        show: function (title, message, data) {
            var self = this;
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                title: title,
                message: message,
                buttons: [{
                    icon: 'glyphicon glyphicon-ban-circle',
                    label: self.options.denyButtonLabel,
                    cssClass: 'btn-warning',
                    action: function (dialogItself) {
                        dialogItself.close();
                        self._trigger('onGiveup', event, { data: data });

                    }
                }, {
                    icon: 'glyphicon glyphicon-ok-sign',
                    label: self.options.actionButtonLabel,
                    cssClass: 'btn-success',
                    action: function (dialogItself) {
                        dialogItself.close();
                        self._trigger('onConfirm', event, { data: data });
                    }
                }],
                onhide: function () {
                    self._trigger('onHide', event, { data: data });
                }
            });

        },
        resetOnShown: function () {
            this.options.onShown = function () {
            }
        }
    });

    /**
     * wrapper for warning message
     * @author Mustafa Zeynel Dağlı
     * @since 07/04/2016
     * @version 25/08/2016 onHide call back event added
     */
    $.widget('sanalfabrika.warningMessage', {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
        },
        _create: function () {
        },
        show: function (title, message, data) {
            var self = this;
            BootstrapDialog.show({
                title: title,
                message: message,
                type: BootstrapDialog.TYPE_WARNING,
                onhide: function () {
                    self._trigger('onHide', event, { data: data });
                }
            });
            self._trigger('onShown', event, { data: data });
        },
        resetOnShown: function () {
            this.options.onShown = function () {
            }
        }
    });

    /**
     * wrapper for success message
     * @author Mustafa Zeynel Dağlı
     * @since 08/04/2016
     * @version 25/08/2016 onHide call back event added
     */
    $.widget('sanalfabrika.successMessage', {

        /**
         * Default options.
         * @returns {null}
         */
        options: {
            data: '',
        },
        _create: function () {
            var self = this;
            // Call the base
            this._super();
        },

        show: function (title, message, data) {
            var self = this;
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_SUCCESS,
                title: title,
                message: message,
                closable: false,
                buttons: [{
                    icon: 'glyphicon glyphicon-ok-sign',
                    label: 'Kapat',
                    cssClass: 'btn-success',
                    action: function (dialogItself) {
                        dialogItself.close();
                        self._trigger('onShown', event, { data: data });
                    }
                }],
                onhide: function () {
                    self._trigger('onHide', event, { data: data });
                }
            });
        },
        resetOnShown: function () {
            this.options.onShown = function () {
            }
        }

    });

    /**
     * wrapper for danger message
     * @author Mustafa Zeynel Dağlı
     * @since 08/04/2016
     * @version 25/08/2016 onHide call back event added
     */
    $.widget('sanalfabrika.dangerMessage', {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
        },
        _create: function () {
        },
        show: function (title, message, data) {
            var self = this;
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_DANGER,
                title: title,
                message: message,
                buttons: [{
                    icon: 'glyphicon glyphicon-ok-sign',
                    label: 'Kapat',
                    cssClass: 'btn-danger',
                    action: function (dialogItself) {
                        dialogItself.close();
                        self._trigger('onShown', event, { data: data });
                    }
                }],
                onhide: function () {
                    self._trigger('onHide', event, { data: data });
                }
            });
        },
        resetOnShown: function () {
            this.options.onShown = function () {
            }
        }
    });

    /**
     * widget for machine tools tree view
     * @author Mustafa Zeynel Dağlı
     * @since 12/02/2016
     */
    $.widget("sanalfabrika.machineTree", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            url: null,
            pk: null,
            ajaxParams: null,
            treeClass: ' .tree ',
            treeID: ' #tree ',
            collapseTitle: 'Collapse',
            expandTitle: 'Expand',
            domFinderOnClick: ' li.parent_li > span ',
            domFinderChildren: ' > ul > li ',
            domFinderChildrenParent: 'li.parent_li',
            animationStyle: 'fast',
            language_code: 'tr',
            baseNodeCollapsedIcon: 'fa-calendar',
            baseNodeExpandedIcon: 'fa-calendar',
            //leafNodeCollapsedIcon: 'fa-spin',
            leafNodeExpandedIcon: 'fa-gear',
            leafNodeCollapsedIcon: 'fa-refresh fa-spin',
            alpacaFormCreator: null,
        },
        setMainRoot: function () {
            self = this;
            $.ajax({
                url: this.options.proxy,
                data: {
                    url: this.options.url,
                    parent_id: 0,
                    pk: this.options.pk,
                    language_code: this.options.language_code,
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.length !== 0) {
                        var datas = data;
                        var appendText = "<ul class='machine-main-ul'>";
                        $.each(data, function (key, value) {
                            appendText += '<li class="parent_li" data-state="' + data[key].state + '" data-lastNode="' + data[key].attributes.last_node + '" data-machine="' + data[key].attributes.machine + '" data-root="' + data[key].attributes.root + '" ><img src="/plugins/zeynel/img/node.png"><span id="' + data[key].id + '" data-action="root" ><i class="fa ' + self.options.baseNodeCollapsedIcon + '"></i>   ' + data[key].text + '  </span></li>';
                        });
                        appendText += "</ul>";
                        self.element.append(appendText);

                        //jQuery._data( $('.tree li.parent_li > span'), "events" );
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        },
        /**
         * private method to call sub nodes
         * @returns {null}
         */
        _create: function () {
            // this._trigger('tested');
            var self = this;

            /**
             * when <i> tag inside node <span> was clicked,
             * because of id not found, false data was retreiving,
             * bug fixed
             * @author Mustafa Zeynel Dağlı
             * @since 20/06/2016
             */
            this._on(this.element, {
                'click.parent_li > span > i': function (event, self) {
                    //alert('i onclick');
                    return false;

                }
            });


            /**
             * root node click event binding
             */
            this._on(this.element, {
                'click.parent_li > span[data-action="root"]': function (event, self) {
                    //alert('onclick root');
                    var element = $(event.target);
                    var id = element.attr('id');
                    //console.log(id);
                    var self = this;
                    self._loadSubNodes(id, element);
                }
            });

            /**
             * sub node click event binding
             */
            this._on(this.element, {
                'click.parent_li > span.badge': function (event, self) {
                    //alert('onclick sub nodes');
                    var element = $(event.target);
                    var id = element.attr('id');
                    //console.log(id);
                    var self = this;
                    if (element.hasClass('machine')) {
                        //alert('has class machine');
                        self._trigger('getMachineProp', event, [self, element]);
                        self._trigger('getMachineGenProp', event, [self, element]);
                    } else {
                        self._loadSubNodes(id, element);
                    }
                }
            });



        },
        /**
         * set leaf nodes
         * @param {type} id
         * @param {type} node
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         */
        _loadSubNodes: function (id, node) {
            //alert('_loadSubNodes');
            self = this;
            var listItem = node.parent('li.parent_li');
            if (listItem.attr('data-lastnode') == 'true') {
                //alert('test true');
            }

            /**
             * determine if loaded before,
             * if loaded alreadt , do not make service call anymore
             */
            if (node.parent().find('>ul').length == 0) {
                $.ajax({
                    url: this.options.proxy,
                    data: {
                        url: this.options.url,
                        parent_id: id,
                        pk: this.options.pk,
                        language_code: this.options.language_code,
                        last_node: listItem.attr('data-lastnode'),
                        machine: listItem.attr('data-machine'),
                        state: listItem.attr('data-state'),
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if (data.length !== 0) {
                            var datas = data;
                            var appendText = "<ul>";
                            $.each(data, function (key, value) {
                                appendText += '<li data-state="' + data[key].state + '" data-lastNode="' + data[key].attributes.last_node + '" data-machine="' + data[key].attributes.machine + '"  class="parent_li" data-root="' + data[key].attributes.root + '">';
                                var leafNodeIcons = self.setLeafNodeIcons(data, key);
                                appendText += leafNodeIcons;
                                appendText += '</li>';
                            });
                            appendText += "</ul>";

                            node.parent().hide();
                            node.parent().append(appendText);
                            node.parent().show('slow');

                            self.expandNodeIcons(node, listItem);
                            //jQuery._data( $('.tree li.parent_li > span'), "events" );
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            } else {
                var nodesUl = node.children().find('>ul');
                nodesUl.html('');
                //node.html('');
                var listItem = node.parent('li.parent_li');
                var children = node.parent('li.parent_li').find(' > ul > li');
                if (children.is(":visible")) {
                    children.hide('slow');
                    self.collapseNodeIcons(node, listItem);
                } else {
                    children.show('slow');
                    self.expandNodeIcons(node, listItem);
                }
            }

        },
        /**
         * return leaf node <i> and <span>
         * @param {type} data
         * @param {type} key
         * @returns {String}
         * @author Mustafa Zeynel Dağlı
         * @since 19/02/2016
         */
        setLeafNodeIcons: function (data, key) {
            self = this;
            var appendText = '';
            if (data[key].attributes.last_node == 'true' && data[key].state == 'open' && data[key].attributes.machine == 'false') {
                appendText += '<img src="/plugins/zeynel/img/node.png"></img><span id="' + data[key].id + '" data-action="false" class="badge"><i class="fa fa-gears"></i>   ' + data[key].text + '  </span>';
            } else if (data[key].attributes.last_node == 'true' && data[key].state == 'closed' && data[key].attributes.machine == 'false') {
                appendText += '<img src="/plugins/zeynel/img/node.png"></img><span id="' + data[key].id + '" data-action="false" class="badge"><i class="fa ' + self.options.leafNodeCollapsedIcon + '"></i>   ' + data[key].text + '  </span>';
            } else if (data[key].attributes.last_node == 'true' && data[key].state == 'open' && data[key].attributes.machine == 'true') {
                appendText += '<img src="/plugins/zeynel/img/node.png"></img><span id="' + data[key].id + '" data-action="false" class="badge machine"><i class="fa fa-gear"></i>   ' + data[key].text + '  </span>';
            }
            else {
                appendText += '<img src="/plugins/zeynel/img/node.png"></img><span id="' + data[key].id + '" data-action="false" class="badge"><i class="fa ' + self.options.leafNodeCollapsedIcon + '"></i>   ' + data[key].text + '  </span>';
            }
            return appendText;
        },
        /**
         * change node icons due to  collapse
         * @author Mustafa Zeynel Dağlı
         */
        collapseNodeIcons: function (node, listItem) {
            self = this;
            if (listItem.attr('data-root') == 'true') {
                node.attr('title', 'Expand this branch').find(' > i').addClass(self.options.baseNodeCollapsedIcon).removeClass(self.options.baseNodeExpandedIcon);
            } else {
                node.attr('title', 'Expand this branch').find(' > i').addClass('fa-spin').addClass('fa-refresh').removeClass('fa-gears');
            }

            /**
             * remove search button and text container
             */
            if (listItem.attr('data-lastnode') == 'true' &&
                listItem.attr('data-machine') == 'false' &&
                listItem.attr('data-state') == 'closed') {
                if (node.parent('li').find('>div button').length > 0) {
                    node.parent('li').find('>div').remove();
                }
            }
        },
        /**
         * change node icons due to  expand
         * @author Mustafa Zeynel Dağlı
         * @since 19/02/2016
         */
        expandNodeIcons: function (node, listItem) {
            self = this;
            var node = node;
            /**
             * base node icon changing due to collapse / expanse
             */
            if (listItem.attr('data-root') == 'true') {
                node.attr('title', 'Expand this branch').find(' > i').addClass(self.options.baseNodeExpandedIcon).removeClass(self.options.baseNodeCollapsedIcon);
            } else {
                node.attr('title', 'Expand this branch').find(' > i').addClass('fa-gears').removeClass('fa-refresh').removeClass('fa-spin');
            }

            /**
             * if node is last node and not a machine and data state closed
             * then serach dom elements are appended
             */
            self.setSearchContainer(node, listItem);
        },
        /**
         * 
         * @param {type} node
         * @param {type} listItem
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 25/02/2016
         */
        setSearchContainer: function (node, listItem) {
            var self = this;
            if (listItem.attr('data-lastnode') == 'true' &&
                listItem.attr('data-machine') == 'false' &&
                listItem.attr('data-state') == 'closed') {
                //alert('test deneme');
                if (node.parent('li').find('>div button').length == 0) {
                    node.parent('li').prepend('<div class="col-lg-12 col-xs-10"><button  onclick="event.preventDefault();" class="pull-left btn btn-default machine-tree-search-displayer">Makina Ara <i class="fa fa-arrow-circle-right"></i></button></div>');
                    node.parent('li').find('>div button').on('click', function (e) {
                        if ($(this).parent().find('>.machine-search-btn').length == 0) {
                            //$(this).parent('div').append('<button style="padding:0px;margin-left:10px;" onclick="event.preventDefault();" class="pull-left btn btn-default tree-search">Makina Ara <i class="fa fa-arrow-circle-right"></i></button>');
                            $(this).parent('div').append('<input class="machine-search"  type="text" value="Ara" />\n\
                                                                        <button  onclick="event.preventDefault();" class=" btn btn-default machine-search-btn machine-tree-search-button">\n\
                                                                        <i class="fa fa-search"></i>\n\
                                                                        </button>');
                            $(this).parent().find('>.machine-search-btn').on('click', function () {
                                self.searchAndDeployMachines(node, listItem);
                            });
                        } else {
                            $(this).parent().find('>.machine-search').remove();
                            $(this).parent().find('>.machine-search-btn').remove();
                        }

                    });
                }
            }
        },
        /**
         * search and display serached machines
         * @author Mustafa Zeynel Dağlı
         * @since 22/02/2016
         */
        searchAndDeployMachines: function (node, listItem) {
            self = this;
            var searchText = node.parent('li').find('>div .machine-search').val();
            //alert(node.parent('li').find('>div .machine-search').val());
            node.parent('li').find('>ul').remove();
            $.ajax({
                url: self.options.proxy,
                data: {
                    url: this.options.url,
                    parent_id: node.attr('id'),
                    pk: self.options.pk,
                    language_code: self.options.language_code,
                    last_node: listItem.attr('data-lastnode'),
                    machine: listItem.attr('data-machine'),
                    state: listItem.attr('data-state'),
                    search: searchText,
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.length !== 0) {
                        var datas = data;
                        var appendText = "<ul>";
                        $.each(data, function (key, value) {
                            appendText += '<li data-state="' + data[key].state + '" data-lastNode="' + data[key].attributes.last_node + '" data-machine="' + data[key].attributes.machine + '"  class="parent_li" data-root="' + data[key].attributes.root + '">';
                            var leafNodeIcons = self.setLeafNodeIcons(data, key);
                            appendText += leafNodeIcons;
                            appendText += '</li>';
                        });
                        appendText += "</ul>";

                        node.parent().hide();
                        node.parent().append(appendText);
                        node.parent().show('slow');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        },
        /**
         * set machine serach dom elements
         * @param {type} node
         * @param {type} listItem
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 22/02/2016
         * @todo to implemented in 'expandNodeIcons' function
         */
        setSearchElements: function (node, listItem, clickedSpan) {
            self = this;
            if (listItem.attr('data-lastnode') == 'true' &&
                listItem.attr('data-machine') == 'false' &&
                listItem.attr('data-state') == 'closed') {
                //alert('test deneme');
                if (node.parent('li').find('>div button').length == 0) {
                    node.parent('li').prepend('<div><button  onclick="event.preventDefault();" class="pull-left btn btn-default machine-tree-search-displayer">Makina Ara <i class="fa fa-arrow-circle-right"></i></button></div>');
                    node.parent('li').find('>div button').on('click', function (e) {
                        alert('test click deneme');
                        if (clickedSpan.parent().find('>.machine-search').length == 0) {
                            alert('ddddd');
                            //$(this).parent('div').append('<button style="padding:0px;margin-left:10px;" onclick="event.preventDefault();" class="pull-left btn btn-default tree-search">Makina Ara <i class="fa fa-arrow-circle-right"></i></button>');
                            clickedSpan.parent('div').append('<input class="machine-search"  type="text" value="Ara" />\n\
                                                                        <button  onclick="event.preventDefault();" class=" btn btn-default machine-search-btn machine-tree-search-button">\n\
                                                                        <i class="fa fa-search"></i>\n\
                                                                        </button>');
                            clickedSpan.parent().find('>.machine-search-btn').on('click', function () {
                                alert('search click');
                            });
                        } else {
                            clickedSpan.parent().find('>.machine-search').remove();
                            clickedSpan.parent().find('>.machine-search-btn').remove();
                        }
                    });
                }


            }
        },
        test: function () {
            alert('test');
            //this._trigger('tested');
        }
    });

    /**
     * set alpaca form due to machine tree selected machine item
     * @author Mustafa Zeynel Dağlı
     * @since 29/02/2016
     */
    $.widget("sanalfabrika.machinePropertyFormCreater", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            url: 'pkFillUsersFirmMachineProperties_infoFirmMachineTool',
            pk: $("#pk").val(),
            ajaxParams: null,
            machineID: null,
            //treeClass: ' .tree ',
            //treeID: ' #tree ',
            alpacaFormContainer: '#selectedMTInformation',
        },

        /**
         * private method to call sub nodes
         * @returns {null}
         */
        _create: function () {

        },

        /**
         * set alpaca plugin form
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 29/02/2016
         */
        setMachinePropertyForm: function () {
            $(this.options.alpacaFormContainer).alpaca("destroy");
            $(this.options.alpacaFormContainer).empty();

            this._getServiceForAlpacaForm();
        },

        /**
         * 
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 29/02/2016
         */
        _getServiceForAlpacaForm: function () {
            self = this;
            $.ajax({
                url: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
                data: {
                    /*
                     * Get selected machine tool information from system service name comes here
                     */
                    url: self.options.url,
                    pk: self.options.pk,
                    machine_id: self.options.machineID,
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {

                    if (data.rows.length !== 0) {
                        for (var i = 0; i < data.rows.length; i++) {

                            var property_name = data.rows[i].property_names;
                            var property_value = data.rows[i].property_value;
                            var property_unit = data.rows[i].unitcodes;
                            var property_name_english = data.rows[i].property_name_eng;

                            if (property_name !== null) {

                                $(self.options.alpacaFormContainer).alpaca({
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            property_name: {
                                                "type": "string"
                                            }
                                        }
                                    },
                                    "options": {
                                        "fields": {
                                            property_name: {
                                                "label": property_name,
                                                "type": "text",
                                                "helper": property_name_english,
                                                "disabled": true
                                            }
                                        }
                                    },
                                    "data": {
                                        property_name: property_value + '  ' + property_unit
                                    }
                                });
                            } else {

                            }
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error');
                    console.error(textStatus);
                }
            });
        },

    });

    /**
     * ajax wrapper class with call backs attached 
     * @author Mustafa Zeynle Dağlı
     * @since 12/04/2016
     */
    $.widget("sanalfabrika.ajaxCall", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            data: null,
            url: null,
            errorCode: null,
            page: null,
            service: null,
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            errorInfo: null,
            errorUrl: null,
            type: 'GET',
            dataType: 'json',
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
        },
        /**
         * make ajax call
         * @returns {null}
         */
        call: function () {
            var self = this;
            $.ajax({
                url: this.options.proxy,
                data: this.options.data,
                type: this.options.type,
                dataType: this.options.dataType,
                success: function (data, textStatus, jqXHR) {
                    if (data.length !== 0) {
                        if (data.found) {
                            self._trigger('onSuccess', event, data);
                        } else {
                            if (data.errorInfo == 23505) {
                                self._trigger('onError23505', event, data);
                            } else if (data.errorInfo == 23503) {
                                self._trigger('onError23503', event, data);
                            } else if (data.errorInfo == 22001) {
                                self._trigger('onError22001', event, data);
                            } else if (data.errorInfo == 23502) {
                                self._trigger('onError23502', event, data);
                            } else {
                                self._trigger('onErrorMessage', event, data);
                            }
                        }
                    } else {
                        self._trigger('onErrorDataNull');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    self._trigger('onError', event, textStatus, errorThrown);
                }
            });
        },

    });


    /**
    * ajax wrapper class for widget calls
    * @author Mustafa Zeynle Dağlı
    * @since 12/04/2016
    */
    $.widget("sanalfabrika.ajaxCallWidget", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            data: null,
            url: null,
            errorCode: null,
            page: null,
            service: null,
            proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
            errorInfo: null,
            errorUrl: null,
            type: 'GET',
            dataType: 'json',
            async: true,
            outbounds: function (e) {
                alert('outbounds example ajax call widget');
                alert(window.lang.translate('piece'));
            }
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
        },
        /**
         * make ajax call
         * @returns {null}
         */
        call: function () {
            var self = this;
            $.ajax({
                url: this.options.proxy,
                data: this.options.data,
                type: this.options.type,
                dataType: this.options.dataType,
                async: this.options.async,
                success: function (data, textStatus, jqXHR) {
                    //console.log(data);
                    /*var arr = $.makeArray(data);
                    console.log(arr);
                    console.log(arr.length);
                    console.log(arr[0]);*/
                    var jsonString = JSON.stringify(data);
                    //console.log(jsonString);

                    if (data.length !== 0) {
                        if (data.found) {
                            self._trigger('onSuccess', event, jsonString);
                            //self._trigger('outbounds');
                        } else if (data.errorInfo == 23505) {
                            self._trigger('onError23505', event, jsonString);
                        } else if (data.errorInfo == 23503) {
                            self._trigger('onError23503', event, jsonString);
                        } else if (data.errorInfo == 22001) {
                            self._trigger('onError22001', event, jsonString);
                        } else {
                            self._trigger('onSuccess', event, jsonString);
                        }

                    } else {
                        self._trigger('onErrorDataNull');

                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    self._trigger('onError', event, textStatus, errorThrown);
                    self._trigger('outbounds');
                }
            });
        },

    });

    /**
     * left menu widget for admin pages
     * @author Mustafa Zeynel Dağlı
     * @since 26/09/2016
     */
    $.widget("sanalfabrika.leftMenu", {

        /**
         * Default options.
         * @returns {null}
         */
        options: {
            lang: null,
            breadcrumbObj: null,
            //pageUrl : null,
            /*outbounds:function(e) {
            alert('outbounds example');}*/
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {

            /**
             * list item <li> tag click event binding
             */
            this._on(this.element, {
                'click > li.treeview': function (event, self) {
                    /*$('#menuContainer').loadImager('removeLoadImage');
                    $('#menuContainer').loadImager('appendImage');*/

                    var target = $(event.target);
                    var menuElement = target.closest("li");
                    if (menuElement.is("li")) {
                        this.setSubMenu(menuElement);
                    }
                    event.preventDefault();
                    this._trigger('onMenuItemClicked', event, {
                        element: menuElement,
                    });
                }
            });
            $('#menuContainer').loadImager();
            this.options.breadcrumbObj = $('#admin_breadcrumb').adminbreadcrumb();
            //this.options.pageUrl = decodeURIComponent(window.location);
        },

        /**
         * private function to append new sub menu items
         * @param {type} element
         * @param {type} data
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 28/09/2016
         */
        _setSubMenuLoop: function (element, data, id) {
            //alert('_setsubmenuloop 2');
            var menuId = id;
            var self = this;
            //var pageURL = decodeURIComponent(window.location.search.substring(1));
            //var pageURL = decodeURIComponent(window.location.search);
            var pageURL = decodeURIComponent(window.location);
            if (self.options.lang == null) { self.options.lang = $('#langCode').val(); }
            //alert(self.options.lang);

            /**
             * close all open menu items first
             */
            element.parents('ul').first().find('li.active').find('ul.menu-open').slideUp('normal');
            /**
             * change all menu items class to closed
             */
            element.parents('ul').first().find('li.active').removeClass('active');
            /**
             * opens new clicked menu item
             */

            var langCode = '';
            if (self.options.lang != 'tr') langCode = '/' + self.options.lang;

            var id = element.attr('id');
            /**
             * first create new sub menu html element
             */
            element.append("<ul class='treeview-menu' id='sub_" + id + "'></ul>");
            var appending_html = '';
            /**
             * prepare new menu items
             */
            $.each(data, function (index, value) {
                var menuName = '';
                if (value.menu_name != null && value.menu_name != '') {
                    if (value.menu_name.length > 25) {
                        menuName = value.menu_name.substr(0, 25) + '..';
                    } else {
                        menuName = value.menu_name;
                    }
                }
                var active = '';

                if (pageURL.indexOf(value.url + '?') !== -1) active = 'active';

                if (active != '' && active != null) {
                    if (menuName != '' && menuName != null) {
                        if (self.options.breadcrumbObj.adminbreadcrumb('getAppendControler') == false) self.options.breadcrumbObj.adminbreadcrumb('setBreadcrumbSub', menuName, value);
                    }
                }

                if (value.collapse === 0) {
                    //alert('_setsubmenuloop 2 collapse 0');
                    if (active != '' && active != null) {
                        appending_html += "<li  class='" + active + "' style='color: #fff;' id='" + value.id + "' ><a href='" + langCode + value.url + "?mnId=" + menuId + "'><i class='fa " +
                            value.icon_class + "'></i><span>" +
                            menuName + "</span></a></li>";
                    } else {
                        appending_html += "<li  id='" + value.id + "' ><a href='" + langCode + value.url + "?mnId=" + menuId + "'><i class='fa " +
                            value.icon_class + "'></i><span>" +
                            menuName + "</span></a></li>";
                    }
                } else {
                    //alert('_setsubmenuloop 2 else');
                    appending_html += "<li class='treeview  id='" +
                        value.id + "' ><a href='#' ><i class='fa " +
                        value.icon_class + "'></i><span>" +
                        value.menu_name +
                        "</span><i class='fa fa-angle-left pull-right'></i></a></li>";
                }
            });
            /**
             * append new menu item
             * @type @exp;element@call;find@call;first
             */
            var subUl = element.find('ul').first();
            subUl.append(appending_html);

            //üst menu grubu alınıyor
            var parentMenuItem = subUl.parent('li').first().find('span');
            //console.log(parentMenuItem.html());

            if (self.options.breadcrumbObj.adminbreadcrumb('getAppendControler') == false) self.options.breadcrumbObj.adminbreadcrumb('setBreadcrumbBase', parentMenuItem.html());
            self.options.breadcrumbObj.adminbreadcrumb('setAppendControler', true);

            subUl.slideDown('normal', function () {
                // opens selected item
                subUl.addClass('menu-open');
                element.addClass('active');
                $.AdminLTE.layout.fix();
            });
            appending_html = '';
        },

        /**
         * private method get sub menu items by ajax request
         * @param {type} element
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 28/09/2016
         */
        _getSubMenuAjax: function (element) {
            var id = element.attr('id');
            /**
             * find clicked item's <a> tag 'href' attribute
             * @type @exp;element@call;find@call;first@call;attr
             */
            var linkUrl = element.find('a').first().attr('href');
            /**
             * if <a> tag attribute is not a link call ajax request
             */
            if (linkUrl == '#') {
                var sm = $(window).successMessage();
                var dm = $(window).dangerMessage();
                var wm = $(window).warningMessage();
                var wcm = $(window).warningComplexMessage({
                    denyButtonLabel: 'Vazgeç',
                    actionButtonLabel: 'İşleme devam et'
                });
                var self = this;

                if (Cookies && Cookies.length > 0) {
                    if (Cookies.get('langCookie') != null && Cookies.get('langCookie') != '') {
                        self.options.lang = Cookies.get('langCookie');
                    }
                } else if ($("#langCode").length > 0) {
                    if ($("#langCode").val() != null && $("#langCode").val() != '') {
                        self.options.lang = $("#langCode").val();
                    }
                } else {
                    self.options.lang = 'tr';
                }


                var ajaxSubMenu = $(this).ajaxCallWidget({
                    proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
                    data: {
                        url: 'pkGetLeftMenu_leftnavigation',
                        parent: id,
                        pk: $("#pk").val(),
                        language_code: self.options.lang,
                        m: $("#module").val(),
                        a: $("#controller").val()
                    },
                    //async : false,
                })
                ajaxSubMenu.ajaxCallWidget({
                    onError: function (event, textStatus, errorThrown) {
                        dm.dangerMessage({
                            onShown: function () {
                            }
                        });
                        dm.dangerMessage('show', 'Menü Ögesi Bulunamamıştır...',
                            'Menü ögesi  bulunamamıştır...');
                    },
                    onSuccess: function (event, data) {
                        $('#menuContainer').loadImager('removeLoadImage');
                        var data = $.parseJSON(data);
                        self._setSubMenuLoop(element, data, id);
                    },
                    onErrorDataNull: function (event, data) {
                        $('#menuContainer').loadImager('removeLoadImage');
                        dm.dangerMessage({
                            onShown: function () {
                            }
                        });
                        dm.dangerMessage('show', 'Menü Ögesi Bulunamamıştır...',
                            'Menü ögesi  bulunamamıştır...');
                    },
                })
                ajaxSubMenu.ajaxCallWidget('call');
            } else {
                /**
                 * replace page due to clicked item  <a> tag link
                 */
                window.location.replace(linkUrl);
            }

        },

        /**
        * set sub menu items
        * @returns {undefined}
        * @since 27/09/2016
        */
        setSubMenu: function (element) {
            /**
             * if menu item loaded before
             */
            if (element.has("ul").length > 0) {
                if (!element.hasClass('active')) {
                    /**
                    * close all open menu items first
                    */
                    element.parents('ul').first().find('li.active').find('ul.menu-open').slideUp('normal');
                    /**
                    * change all menu items class to closed
                    */
                    element.parents('ul').first().find('li.active').removeClass('active');


                    //$('#menuContainer').loadImager();
                    $('#menuContainer').loadImager('removeLoadImage');
                    $('#menuContainer').loadImager('appendImage');
                    var subUl = element.find('ul').first();
                    /**
                    * opens new clicked menu item
                    */
                    subUl.slideDown('normal', function () {
                        // opens selected item
                        subUl.addClass('menu-open');
                        subUl.parents('ul').first().find('li.active').removeClass('active');
                        element.addClass('active');
                        $('#menuContainer').loadImager('removeLoadImage');
                        $.AdminLTE.layout.fix();
                    });
                } else if (element.hasClass('active')) {
                    /**
                     * if clicked item opened before close then
                     */
                    element.find('ul').first().slideUp('normal');
                    element.removeClass('active');
                }
            } else {
                /**
                 * if menu item not loaded before then call sub menu from server
                 */

                //$('#menuContainer').loadImager();
                $('#menuContainer').loadImager('removeLoadImage');
                $('#menuContainer').loadImager('appendImage');
                var subUl = element.find('ul').first();
                this._getSubMenuAjax(element);
            }
        },

        /**
         * set parent menu items
         * @returns {undefined}
         * @since 26/09/2016
         */
        setBaseMenu: function () {
            var sm = $(window).successMessage();
            var dm = $(window).dangerMessage();
            var wm = $(window).warningMessage();
            var wcm = $(window).warningComplexMessage({
                denyButtonLabel: 'Vazgeç',
                actionButtonLabel: 'İşleme devam et'
            });
            var self = this;
            if (self.options.lang == null) { self.options.lang = $('#langCode').val(); }
            //alert(self.options.lang );

            //if(Cookies && Cookies.length>0) {
            if ($("#langCode").length > 0) {
                if ($("#langCode").val() != null && $("#langCode").val() != '') {
                    self.options.lang = $("#langCode").val();
                }

            }
            //} 
            else if (Cookies.get('langCookie') != null && Cookies.get('langCookie') != '') {
                self.options.lang = Cookies.get('langCookie');
            } else {
                self.options.lang = 'tr';
            }

            //$('#menuContainer').loadImager();
            $('#menuContainer').loadImager('removeLoadImage');
            $('#menuContainer').loadImager('appendImage');
            var ajaxACLResources = $(this).ajaxCallWidget({
                proxy: 'https://proxy.codebase_v2.com/SlimProxyBoot.php',
                data: {
                    url: 'pkGetLeftMenu_leftnavigation',
                    parent: 0,
                    pk: $("#pk").val(),
                    language_code: self.options.lang,
                    m: $("#module").val(),
                    a: $("#controller").val()
                },
                //async:false,
            })
            ajaxACLResources.ajaxCallWidget({
                onError: function (event, textStatus, errorThrown) {
                    dm.dangerMessage('resetOnShown');
                    dm.dangerMessage('show', 'Menü Ögesi Bulunamamıştır...',
                        'Menü ögesi  bulunamamıştır...');
                    //self._trigger("outbounds");
                },
                onSuccess: function (event, data) {

                    var data = $.parseJSON(data);
                    self._setBaseMenuLoop(data);
                    var menuid = null;
                    menuid = self._getUrlParameter('mnId');
                    if (menuid != '' && menuid != null) {
                        self._triggerBaseMenuClick(menuid);
                    } else {
                        $('#menuContainer').loadImager('removeLoadImage');
                    }

                },
                onErrorDataNull: function (event, data) {
                    dm.dangerMessage('resetOnShown');
                    dm.dangerMessage('show', 'Menü Ögesi Bulunamamıştır...',
                        'Menü ögesi  bulunamamıştır...');
                    $('#menuContainer').loadImager('removeLoadImage');
                },

            })
            ajaxACLResources.ajaxCallWidget('call');
        },

        /**
         * get base menu items and append items to page
         * @param {type} data
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 27/09/2016
         */
        _setBaseMenuLoop: function (data) {
            //alert('_setBaseMenuLoop');
            var self = this;
            var appending_html;

            var langCode = '';
            if (self.options.lang != 'tr') langCode = '/' + self.options.lang;
            //var pageURL = decodeURIComponent(window.location);

            $.each(data, function (index, value) {
                var menuName = null;
                var active = '';
                if (value.menu_name != null && value.menu_name != '') {
                    if (value.menu_name.length > 23) {
                        menuName = value.menu_name.substr(0, 23) + '..';
                    } else {
                        menuName = value.menu_name;
                    }
                }

                // url ile menu url value eşleşiyor mu kontrolü yapılıyor (php dil replace karakterine göre de kontrol ediliyor(/--dil--)))
                if (value.url == $('#requestUriRegulated').val()
                    || '/--dil--' + value.url == $('#requestUriRegulated').val()) {
                    active = 'active';
                }

                if (active != '' && active != null) {
                    menuid = self._getUrlParameter('mnId');
                    if (menuid == '' || menuid == null) {
                        //console.log(value);
                        if (menuName != '' && menuName != null) {
                            if (self.options.breadcrumbObj.adminbreadcrumb('getAppendControler') == false) self.options.breadcrumbObj.adminbreadcrumb('setBreadcrumbBase', menuName);
                            // aktif menü bulunduysa sub menu ajax requestlerde yeniden breadcrumb yazılmaması için control koyuluyor
                            self.options.breadcrumbObj.adminbreadcrumb('setAppendControler', true);
                        }
                    }
                }

                if (value.collapse === 0) {
                    if (active != '' && active != null) {
                        appending_html += "<li class='boxMenu " + active + "' id='" +
                            value.id + "'><a href='" + langCode + value.url + "'><i class='fa " +
                            value.icon_class + "'></i><span>" +
                            value.menu_name + "</span></a></li>";
                    } else {
                        appending_html += "<li class='boxMenu ' id='" +
                            value.id + "'><a href='" + langCode + value.url + "'><i class='fa " +
                            value.icon_class + "'></i><span>" +
                            value.menu_name + "</span></a></li>";
                    }

                } else {
                    appending_html += "<li class='treeview boxMenu' id='" +
                        value.id + "'><a href='#' ><i class='fa " +
                        value.icon_class + "'></i><span>" +
                        menuName +
                        "</span><i class='fa fa-angle-left pull-right'></i></a></li>";
                }
            });
            self.element.append(appending_html);
            appending_html = null;
        },

        _triggerBaseMenuClick: function (menuId) {
            var menuId = menuId;
            //alert('_triggerBaseMenuClick');
            var self = this;
            //var listItem = self.element.find( "#"+menuId+".li" );
            //var listItem = self.element.find( "li:last-child");
            //console.log(listItem);
            //listItem.trigger( "click" );
            $('#' + menuId + '').trigger("click");
        },

        _getUrlParameter: function (sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;
            if (sURLVariables.length > 0) {
                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');

                    if (sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : sParameterName[1];
                    }
                }
            }
            sURLVariables = sPageURL.split('?');
            if (sURLVariables.length > 0) {
                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');

                    if (sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : sParameterName[1];
                    }
                }
            }
        },

        _init: function () {
        },
    });

    /**
     * breadcrumb widget for admin pages
     * @author Mustafa Zeynel Dağlı
     * @since 18/05/2018
     */
    $.widget("sanalfabrika.adminbreadcrumb", {

        /**
         * Default options.
         * @returns {null}
         */
        options: {
            containerId: 'admin_breadcrumb',
            subItemHtml: '',
            baseItemHtml: '',
            appendControler: false,
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {


        },

        setAppendControler: function (controler) {
            var self = this;
            self.options.appendControler = controler;
        },

        getAppendControler: function (controler) {
            var self = this;
            return self.options.appendControler;
        },

        /**
         * public function to append breadcrumb items
         * @param {type} menuName
         * @param {type} value
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 18/05/2018
         */
        setBreadcrumbBase: function (menuName) {
            var self = this;

            var menuName = menuName;
            console.log(menuName);
            if (menuName != null) {
                var breadcrumb = '<li><a href="#"><i class="fa fa-dashboard"></i> ' + menuName + '</a></li>';
                self.options.baseItemHtml = breadcrumb;
                $('#' + self.options.containerId + '').prepend(breadcrumb);
            }
        },

        /**
         * public function to append breadcrumb items
         * @param {type} menuName
         * @param {type} value
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 18/05/2018
         */
        setBreadcrumbSub: function (menuName, value) {
            var self = this;
            var menuName = menuName;
            console.log(menuName);
            if (menuName != null) {
                var breadcrumb = '<li><a href="#"><i class="fa fa-sitemap"></i> ' + menuName + '</a></li>';
                self.options.subItemHtml = breadcrumb;
                $('#' + self.options.containerId + '').append(breadcrumb);
            }
        }

    });



}(jQuery));

