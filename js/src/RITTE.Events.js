/* global RITTE: false */
(function($, window, document, undefined) {
    RITTE = window.RITTE || {};
    RITTE.Events = RITTE.events || {};

    RITTE.Events = {
        loadColors : function() {
            var $body = $('body');
            var $selectForm = $body.find('.select-form');
            $selectForm.on({ event: 'change' });

            // radio input click
            $body.on('click', '.select-form .select-option', function() {
                var $this = $(this),
                    $selectOptionInput = $this.find('.select-option-input'),
                    designInputName = $selectOptionInput.attr('name'),
                    designInputVal = $selectOptionInput.val(),
                    $designInputChecked = $('input[name='+designInputName+'][value='+designInputVal+']');

                // Change colors + add checkbox
                $selectForm.find('.checked').removeClass('checked');
                $('svg[name='+designInputName+']').attr('value', designInputVal);
                $designInputChecked.addClass('checked');

                // JQ BBQ Magic
                var state = {};
                state[ designInputName ] = designInputVal;
                $.bbq.pushState( state );
                $this.bind();
            });

            var $window = $(window);

            $window.bind( 'hashchange', function() {

                $('input').each(function(){

                    var $this = $(this),
                        thisAttrName = $this.attr('name'),
                        designInputVal = $.bbq.getState( $(this).designInputName, true ) || 0;

                    if ($this.val() === designInputVal[thisAttrName]) {
                        $this.addClass('checked');
                        $('.main-image__'+thisAttrName).attr('value', designInputVal[thisAttrName]);
                    }

                    if ($this.attr('name') === 'maincolor' && $this.val() === designInputVal.maincolor) {
                        $('.select-option-wrap').removeClass('is-disabled');
                        $('#maincolor-color').text($this.siblings('.select-option-label').text());
                        $('#main-color-summary').text(RITTE.Information.mainColor[designInputVal.maincolor].color_content);
                    } else if ($this.attr('name') === 'choosedesign' && $(this).val() === designInputVal.choosedesign) {
                        $('[data-hidden]').attr('data-hidden', 'hidden');
                        $('[data-design="'+designInputVal.choosedesign+'"]').add('[data-design="logo"]').attr('data-hidden', '');
                        $('#design').text($this.siblings('.select-option-label').text());
                        $('#design-summary').text(RITTE.Information.chooseDesign[designInputVal.choosedesign]);
                    }
                });

            });

            $window.trigger( 'hashchange' );

        },
        makeSlideHeight: function() {
            var $window = $(window),
                $document = $(document),
		        slideHeight = $window.outerHeight(),
			    slideWidth = $window.outerWidth(),
                $slide = $document.find('.slide');
            $slide.each( function() {
                var $this = $(this),
                    $mainImage = $this.find('.main-image'),
                    mainImageHeight = $mainImage.outerHeight() + 48;
                if ($(window).width() > 767) {
                    $this.css({
                        'height': slideHeight > mainImageHeight ? slideHeight : mainImageHeight,
                        'max-width': slideWidth

                    });
                } else {
                    $this.css({
                        'min-height': slideHeight
                    });
                }
            });

			$document.find('.main-image-wrap').css({
                'max-width': slideWidth
            });
            $('#slide-3 .slide__container').css('height', slideHeight);
        },
        loadEvents: function() {
            var $body = $('body');

            if (window.location.href.indexOf('maincolor') > -1) {
                if (!$('#slide-2').hasClass('is-enabled')) {
                    $('#slide-2').addClass('is-enabled');
                }
            }
            $('#start').on('click', function(){
                $('#slide-2').addClass('is-enabled');
                $('html, body').animate({ scrollTop: $('#slide-1').outerHeight() }, 500);
            });
            if (window.location.href.indexOf('choosedesign') > -1) {
                if (!$('#slide-3').hasClass('is-enabled')) {
                    $('#slide-3').addClass('is-enabled');
                }
            } else {
                $body.one('click', '#slide-2 .choose-design input', function() {
                    var scrollHeight = $('#slide-1').outerHeight() + $('#slide-2').outerHeight();
                    $('#slide-3').addClass('is-enabled');
                    $('html, body').animate({ scrollTop: scrollHeight }, 500);
                });
            }
            if (window.location.href.indexOf('accents') > -1 ||
                window.location.href.indexOf('design2b') > -1 ||
                window.location.href.indexOf('design3a') > -1 ||
                window.location.href.indexOf('design3b') > -1 ||
                window.location.href.indexOf('logo') > -1 ) {

                $('#slide-4, #slide-5').addClass('is-enabled');

            } else {

                $body.one('click', '#slide-3 input', function() {
                    var scrollHeight = $('#slide-1').outerHeight() + $('#slide-2').outerHeight() + $('#slide-3').outerHeight();
                    $('#slide-4, #slide-5').addClass('is-enabled');
                    $('html, body').animate({ scrollTop: scrollHeight }, 500);
                });
            }
            $body.on('click', '#view-bike', function() {
                var scrollHeight = $('#slide-1').outerHeight() + $('#slide-2').outerHeight() + $('#slide-3').outerHeight() + $('#slide-4').outerHeight();
                $('html, body').animate({ scrollTop: scrollHeight }, 500);
            });
        },
        backGround: function() {
            var $slides = $('#slide-2, #slide-3, #slide-4, #slide-5');
            if (window.location.href.indexOf('maincolor') > -1) {

                var mainColorValue = $('.select-option-wrap[data-name="maincolor"] .select-option-input.checked').val();
                if (mainColorValue === undefined) return;

                $slides.find('.slide__background').css('background-image', 'url('+RITTE.Information.mainColor[mainColorValue].image+')').addClass('is-showing');

                // change the background with option change
                $('.change-background-wrap').addClass('is-showing-change-background-select');

                $(document).find('.change-background').each( function() {
                    var $this = $(this);
                    $this.find('option').prop('selected', false) // remove selected attr
                    $this.find('[value="'+mainColorValue+'"]').prop('selected', true); //add selected attr
                    var $that = $this;
                    $this.on('change', function() {
                        var mainColorValue = $that.val();
                        $slides.find('.slide__background').css('background-image', 'url('+RITTE.Information.mainColor[mainColorValue].image+')').addClass('is-showing');
                    });
                });
            }
        },
        showUpButton: function() {
            var slide1Height = $('#slide-1').outerHeight();
            if ($(window).scrollTop() >= slide1Height) {
                $('#button-up').addClass('is-visible');
            } else {
                $('#button-up').removeClass('is-visible');
            }
        }
        // showBackgroundButton: function() {
        //     if ($('.button__background').addClass('is-visible') {

        //     }
        // }
        // socialShare: function(event) {
        //     event.preventDefault();
        //     var windowSize = 'height=300,width=400';
        //     var $this = $(this);
        //     var pageURL = window.location.href;
        //     //var dataShareText = $this.attr('data-share-text');
        //     //var dataShareVia = $this.attr('data-share-via');
        //     //var dataHashtags = $this.attr('data-hashtags');
        //     var dataHref = $this.attr('data-href');
        //     if ($('#page-share-twitter')) {
        //         var shareURL = dataHref + pageURL;
        //         window.open(shareURL, windowSize);
        //     } else if ($('#page-share-facebook')) {
        //         var shareURL = dataHref + pageURL;
        //         window.open(shareURL, windowSize);
        //     }
        // }
    };

})(jQuery, this, this.document);