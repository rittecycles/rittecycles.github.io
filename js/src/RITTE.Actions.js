/* global RITTE: false, global _:false */
(function($, window, document, undefined) {
	var $window = $(window);
	var $document = $(document);
	$document.ready(function() {

		RITTE.Events.loadColors();
		RITTE.Events.makeSlideHeight();
		RITTE.Events.loadEvents();
		RITTE.Events.backGround();

		// save URL for the customer
		// if ($.cookie('bikeURL') !== undefined) {
		// 	window.location.hash = $.cookie('bikeURL');
		// }

		// Main Color Tooltip
		var $mainColor = $document.find('.main-color');
		var $chooseDesign = $document.find('.choose-design');
		var $tooltipLastWrap = $document.find('.tooltip-last-wrap');
		if ($.cookie('mainbutton') === undefined ) {
			$mainColor.addClass('is-displaying-tooltip');
			$('.main-color .select-option-input').on('click', function() {
		        $.cookie('mainbutton', 1);
		        $mainColor.removeClass('is-displaying-tooltip');
		        $mainColor.addClass('is-never-displaying-tooltip');
	    		$chooseDesign.addClass('is-displaying-tooltip');
	    	});
		} else {
			$mainColor.addClass('is-never-displaying-tooltip');
		}

		// Choose Design Tooltip
		if ($.cookie('chooseDesign') === undefined ) {
	    	$('.choose-design .select-option-input').on('click', function() {
	    		$.cookie('chooseDesign', 1);
	    		$chooseDesign.addClass('is-never-displaying-tooltip').removeClass('is-displaying-tooltip');
	    		$tooltipLastWrap.addClass('is-displaying-tooltip');
	    	});
		} else {
			$chooseDesign.removeClass('is-disabled').addClass('is-never-displaying-tooltip');
		}

	    // Finish Your Bike Tooltip
	    if ($.cookie('finishYourBike') === undefined ) {
	    	$('.tooltip-last-wrap .select-option-input').on('click', function() {
	    		$.cookie('finishYourBike', 1);
	    		$tooltipLastWrap.removeClass('is-displaying-tooltip').addClass('is-never-displaying-tooltip');
	    	});
	    } else {
	    	$tooltipLastWrap.addClass('is-never-displaying-tooltip');
	    }
	});

	$window.on(' resize scroll', _.throttle(function() {
		RITTE.Events.makeSlideHeight();
		RITTE.Events.showUpButton();
	}, 500));

	var $body = $('body');

    //show dropdown
    $body.on('click', '.select-show', function () {
        var $this = $(this);
        if (!$this.parents('.select-option-wrap').hasClass('select-option--is-disabled')) {
            $('.select-show').not(this).siblings().removeClass('is-visible');
            $this.siblings().toggleClass('is-visible');
        }
    });
    $body.on('click', '.mail-to', function () {
    	var $this = $(this);
    	var urlFront = $this.data('share-url');
    	var shareUrl = window.location.href.split('&').join('%26');
    	var mailtoHref = urlFront + shareUrl;
    	$(this).attr('href', mailtoHref);
    });

	// add radio click events here
	$document.on('click', '#start, .slide input', function() {
		RITTE.Events.loadEvents();
		RITTE.Events.backGround();
		RITTE.Events.makeSlideHeight();
		var cookieURL = window.location.hash;
		$.cookie('bikeURL', cookieURL);
	});

	$('.button__background').on('click', function() {
		var $this = $(this);
		var text = $this.text();
		$this.text( text === 'Hide Image' ? 'Show Image' : 'Hide Image');
		$this.parents('.slide').find('.slide__background').toggleClass('is-showing').toggleClass('is-hiding-image');
	});

	// change background image
	$document.on('click', '.slide-background-toggle', function () {
        var $this = $(this);
        var $backgroundImage = $this.attr('value');
        $this.parents('.slide').css('background-image', $backgroundImage);
    });

    $('#button-up').on('click', function() {
    	$('html, body').animate({ scrollTop: 0 }, 'slow');
    });

})(jQuery, this, this.document);