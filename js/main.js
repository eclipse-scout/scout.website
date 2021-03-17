;(function(window) {
	window.isMobile = false;

	(function(a,b){if(/(android|bb\d+|meego|ipad|playbook|silk).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))window.isMobile=true})(navigator.userAgent||navigator.vendor||window.opera);
})(window);

;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);
	var $body, $intro, $services, $navbar, $wrapper, $navMobile;

	$doc.ready(function() {
		// cache DOM elements
		$body      = $('body');
		$wrapper   = $('.wrapper');
		$intro     = $('.intro');
		$services  = $('.section-services');
		$navbar    = $('.navbar');
		$navMobile = $('.nav-mobile');

		// Slide to section Contact
		$doc.on('click', '.slide-to-section', function(e){
			e.preventDefault();
			var $waypoint = $($(this).attr('href'));

			var navbar_height = $('.navbar').outerHeight();

			$wrapper.animate({
				scrollTop: $wrapper.scrollTop() + $waypoint.offset().top - navbar_height
			}, 1000);

			if( isMobile ){
				var $menu = $(this).closest('.dropdown-menu').clone(),
					$parent = $(this).closest('.dropdown');
				
				$(this).closest('.dropdown-menu').remove();
				
				setTimeout(function() {
					$parent.append($menu);
				}, 100);
			}
		});

		resizeSections();

		$navbar.affix({
			offset: {
				top: 0
			},
			target: '.wrapper'
		});
		updateAffix();

		//Expand Intro image 
		$('.intro-image img').fullscreener();

		// form validation
		var $form = $('.form-contact form');
		var mailValidation = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

		$('.form-contact form').on('reset', function(){
			$('.form-errors').text('');
			$('input', $form).parent().removeClass('has-error');
		}).on('submit', function (event) {
			
			event.preventDefault();
			$('.form-errors').text('');
			$('.form-success').html('');
			$('.form-contact form .form-row').removeClass('has-error');
			var isValid = true;

			var $first_name = $('input[name="fname"]', $form);
			var $last_name = $('input[name="lname"]', $form);
			var $mail = $('input[name="email"]', $form);

			if ($first_name.val() == '' || $first_name[0].value == $first_name[0].title ){
				$('.form-errors').append('Invalid first name <br/ >');
				isValid = false;
				$first_name.parent().addClass('has-error');
			}

			if ($last_name.val() == '' || $last_name[0].value == $last_name[0].title ){
				$('.form-errors').append('Invalid last name <br/ >');
				isValid = false;
				$last_name.parent().addClass('has-error');
			}

			if ($mail.val() == '' || !mailValidation.test($mail.val()) ){
				$('.form-errors').append('Invalid email');
				isValid = false;
				$mail.parent().addClass('has-error');
			}

			if (isValid){
				$.ajax({
					url: $(this).attr('action'),
					data: $(this). serializeArray(),
					type: 'POST',
					success: function (response) {
						var str = response;

						$('.form-success').html(''+str);

						if (str == 'Your message has been sent.') {
							$form.trigger('reset');
						}

					},
					error: function (err) {
						$('.form-contact form .form-head .form-errors').append(err);	
					}
				}).always(function() {
					scrollToContactForm();
				});
			} else {
				scrollToContactForm();
			}
		});

		function scrollToContactForm() {
			setTimeout(function(){
				$wrapper.animate({scrollTop: $wrapper.scrollTop() + $('#contact-us').position().top - 76});
			}, 200)
			$win.scrollTop(0)
		};

		var screenWidth = $(window).width();
		var screenHeight = $(window).height();
		var smallScreen = screenWidth <= 767;
		var popupWidth = smallScreen ? '100%' : '90%';
		var popupHeight = smallScreen ? (screenHeight - 30 + 'px') : '90%';
		
		$(".btn-download").colorbox({
			maxWidth: 1400,
			maxHeight: '90%',
			width: popupWidth,
			height: popupHeight
		});
		
		$(".btn-helloworld").colorbox({
			maxWidth: 1400,
			maxHeight: '90%',
			width: popupWidth,
			height: popupHeight
		});
		
		// Section Download - Buttons Functionality
		if (navigator.appVersion.indexOf("Win")!=-1) {
			$('.btn-download').addClass('current').parent().find('.btn').not('.btn-download').css("display", "none");
		};

		if (navigator.appVersion.indexOf("Mac")!=-1) {
			$('.btn-mac').addClass('current').parent().find('.btn').not('.btn-mac').css("display", "none");
		};

		if (navigator.appVersion.indexOf("Linux")!=-1) {
			$('.btn-linux').addClass('current').parent().find('.btn').not('.btn-linux').css("display", "none");
		};

		$('#download-trigger').click(function() {
		    $(".section-download-actions .btn").not('.current').toggle(this.checked);
		});

		// Custom Checkbox Functionality
		// This class will be added to active item
		var checkedClass = 'custom-input-checked';
		var disabledClass = 'custom-input-disabled';
		var inputSelector = '.custom-checkbox input, .custom-radio input';
	 
		$(inputSelector)
	 
		// Add classes to all checked checkboxes
		.each(function() {
			var input = this;
			
			$(input)
				.parent() // go up to the input holder element
				.toggleClass(checkedClass, input.checked);
		})
 
		// Handle the change event
		.on('change', function() {
			var input = this;
 
			// detect if the input is radio
			if(input.type === 'radio') {
				var name = input.name;
 
				// find all the radios with that name, in the same document
				$(input.ownerDocument)
					.find('[name=' + name + ']')
					.each(function() {
 
						var radioInput = this;
 
						$(radioInput)
							.parent() // go up to the input holder element
							.toggleClass(checkedClass, radioInput.checked);
						
					});
			} else {
 
				$(input)
					.parent() // go up to the input holder element
					.toggleClass(checkedClass, input.checked);
			};
		})
		.on('disable', function() {
			var input = this;
			
			input.disabled = true;
			
			$(input)
				.parent() // go up to the input holder element
				.addClass(disabledClass);
		})
		.on('enable', function() {
			var input = this;
 
			input.disabled = false;
 
			$(input)
				.parent() // go up to the input holder element
				.removeClass(disabledClass);
		});


		$('.navbar-toggle').on('click', function() {
			var pos = $body.hasClass('open') ? '0%' : '-70%';

			updateMobileNav();

			$navbar.animate({
				left: pos
			}, 300);

			$wrapper.animate({
				left: pos
			}, 300, function() {
				$body.toggleClass('open');
			})
		});

		$('.nav-mobile a').on('click', function(){
			$wrapper.css('left', '0%');
			$navbar.css('left', '0%');
			$body.removeClass('open');
		});

		$doc.on('touchstart touchmove', function(e) {
			if ($body.hasClass('open')) {
				var $target = $(e.target);

				if (!$target.closest('.nav-mobile').length && !$target.is('.nav-mobile') && !$target.is('.navbar-toggle')) {
					e.preventDefault();
				}
			}
		})

		//Benefit Section Functionality
		$('.benefit-head').on('click', function(e) {
			e.preventDefault();
			var $href = $($(this).data('href'));
			$href.addClass('benefit-entry-visible').siblings().removeClass('benefit-entry-visible');
			$(this).parent().addClass('current').siblings().removeClass('current');
		});
	});
		
	//Benefit Section Functionality
	$win.load(function() {
		if($win.width() < 767 ) {
			$('.benefit-head').on('click', function(e) {
				e.preventDefault();
				$(this).next().addClass('benefit-entry-visible');
				$(this).parent().siblings().find('.benefit-entry').removeClass('benefit-entry-visible');
				$(this).parent().addClass('current').siblings().removeClass('current');
			});
		};
	});

	$win.resize(function() {
		if ($intro) {
			resizeSections();
		} 

		if ($navbar) {
			updateAffix();
		}

		if ($navMobile && !$navMobile.is(':visible')) {
			$wrapper.removeAttr('style');
			$body.removeClass('open');
			$navbar.removeAttr('style');
		}
	});

	$win.scroll(function(e) {
		if ($body.hasClass('open')) {
			updateMobileNav();
		}
	});

	function resizeSections() {
		var winHeight   = $win[0].innerHeight;
		var introHeight = winHeight - $services.outerHeight();
		
		if (winHeight >= 900) {
			$intro.css('min-height', introHeight);
		} else {
			$intro.removeAttr('style');
		}
	};

	function updateAffix() {
		$navbar.data('bs.affix').options.offset.top = $wrapper.scrollTop() + $services.offset().top - 84;
	};

	function updateMobileNav() {
		$body.toggleClass('is-affixed', $navbar.hasClass('affix'));
	};

})(jQuery, window, document);