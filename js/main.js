"use strict";

var TOOLTIP_MIN_MARGIN = 10;
var TEXTS = {
  'scout.js': 'Scout JS applications are written in JavaScript and run in the browser.' + ' An application server is optional.',
  'scout.classic': 'Scout Classic applications are written in Java. They implement the client/server principle. The business logic' + ' runs on a Java application server.'
};
var hideAnimationListener = function hideAnimationListener(event) {
  $(event.target).removeClass('animate-hide').addClass('hidden')[0].removeEventListener('animationend', hideAnimationListener);
};
var showAnimationListener = function showAnimationListener(event) {
  $(event.target).removeClass('animate-show')[0].removeEventListener('animationend', showAnimationListener);
};
function onDemoAppButtonClick() {
  var $button = $(this);
  if ($button.hasClass('active')) {
    return;
  }
  var $activeButton = $('.demo-app-button.active');
  $activeButton.removeClass('active');
  $button.addClass('active');
  var showContainerId = $button.data('showContainer');
  var $divToHide = $('.demo-app-container:not(.hidden)');
  var $divToShow = $('#' + showContainerId);

  // Animation already running --> skip
  if (!$divToHide.length) {
    return;
  }
  $divToHide.addClass('animate-hide')[0].addEventListener('animationend', hideAnimationListener);
  $divToShow.removeClass('hidden').addClass('animate-show')[0].addEventListener('animationend', showAnimationListener);
}
function navigateToGetStarted() {
  var $panel = $('#getting-started-panel');
  if ($panel.length) {
    // Only exists on index page
    $panel[0].scrollIntoView({
      behavior: 'smooth'
    });
  } else {
    document.location = './#getting-started-java';
  }
}
function onGetStartedLinkClick() {
  navigateToGetStarted();
  hideMobileNavigation($('#main-navigation'));
}
function onGetStartedButtonClick() {
  navigateToGetStarted();
}

/**
 * Handles the tooltip hover or click events. By default the tooltips are built CSS
 * only using the hover state of the link. But since this doesn't work on iOS devices
 * this function works with click events on these devices. There we set a 'hover' class
 * on click instead on relying on the :hover state of the element.
 * <p>
 * Creates the additional tooltip DIV only once.
 * </p>
 */
function onTooltipEvent(event) {
  var $tooltip = $(event.currentTarget);
  var tooltipTextKey = $tooltip.data('tooltipText');
  var availWidth = $(document).width(); // must happen before tooltip is made visible

  // create tooltip text once
  var $tooltipText = $tooltip.find('.tooltip-text');
  if (!$tooltipText.length) {
    var tooltipText = TEXTS[tooltipTextKey];
    if (!tooltipText) {
      tooltipText = 'Undefined textKey "' + tooltipTextKey + '"';
    }
    $tooltipText = $('<span>').addClass('tooltip-text').text(tooltipText);
    $tooltipText.appendTo($tooltip);
    var clickOutsideHandler = clickOutsideTooltipHandler.bind($tooltip);
    $tooltip.data('clickOutsideHandler', clickOutsideHandler);
  }

  // click handling instead :hover state, for iOS devices
  if (event.type === 'click') {
    $tooltip.toggleClass('hover');
    var showTooltip = $tooltip.hasClass('hover');
    if (showTooltip) {
      setTimeout(function () {
        $(document).on('click', $tooltip.data('clickOutsideHandler'));
      });
    } else {
      hideTooltip($tooltip);
    }
  }

  // adjust tooltip position
  $tooltipText.removeClass('adjust-left adjust-right');
  var position = $tooltipText.offset();
  var width = $tooltipText.outerWidth();
  var x = position.left;
  var diff;
  if (x < 0) {
    // left boundaries crossed?
    diff = Math.abs(x);
    var marginLeft = parseInt($tooltipText.css('margin-left'), 10);
    $tooltipText.css('margin-left', marginLeft + diff + TOOLTIP_MIN_MARGIN).addClass('adjust-left');
  } else if (x + width > availWidth) {
    // right boundaries crossed?
    diff = x + width - availWidth;
    var _marginLeft = parseInt($tooltipText.css('margin-left'), 10);
    $tooltipText.css('margin-left', _marginLeft - diff - TOOLTIP_MIN_MARGIN).addClass('adjust-right');
  }
}
function clickOutsideTooltipHandler(event) {
  var $tooltip = this;
  var $tooltipText = $tooltip.find('.tooltip-text');
  if (event.target !== $tooltipText[0]) {
    hideTooltip($tooltip);
  }
}
function hideTooltip($tooltip) {
  $tooltip.removeClass('hover');
  $(document).off('click', $tooltip.data('clickOutsideHandler'));
}
function installHandlers() {
  $('#get-started-button').on('click', onGetStartedButtonClick);
  $('#mobile-navigation-button').on('click', onMobileNavigationButtonClick);
  $('.navigation-item.lv1 > .text').on('click', onNavigationItemLv1Click);
  $('.demo-app-button').on('click', onDemoAppButtonClick);
  if (isIOs()) {
    $('.tooltip').on('click', onTooltipEvent);
  } else {
    $('.tooltip').one('mouseover', onTooltipEvent);
  }
}
function onNavigationItemLv1Click(event) {
  var $navItemText = $(event.currentTarget);
  var $navPanel = $navItemText.parent().find('.navigation-lv2-panel');
  if (isMobileMode()) {
    toggleMobileNavigationPanelLv2($navItemText, $navPanel);
  } else {
    toggleDesktopNavigationPanelLv2($navItemText, $navPanel);
  }
}
function toggleMobileNavigationPanelLv2($navItemText, $navPanel) {
  var open = $navItemText.hasClass('open');
  if (open) {
    $navPanel.addClass('hidden');
    $navItemText.removeClass('open');
  } else {
    $navPanel.removeClass('hidden');
    $navItemText.addClass('open');
  }
}
function toggleDesktopNavigationPanelLv2($navItemText, $navPanel) {
  if (!$navPanel.length) {
    hideAllDesktopNavigationPanelsLv2();
    return;
  }
  if (!$navPanel.hasClass('hidden')) {
    hideDesktopNavigationPanelLv2($navPanel);
    return;
  }
  $navItemText.addClass('open');
  var clickOutsideHandler = onDesktopNavigationPanelLv2ClickOutside.bind($navPanel);
  $navPanel.removeClass('hidden');
  $navPanel.data('clickOutsideHandler', clickOutsideHandler);
  setTimeout(function () {
    $(document).on('click', clickOutsideHandler);
  });
}
function onDesktopNavigationPanelLv2ClickOutside(event) {
  var $panel = this;
  if ($panel[0] !== event.target) {
    hideDesktopNavigationPanelLv2($panel);
  }
}
function onMobileNavigationButtonClick(event) {
  var $navButton = $(event.currentTarget);
  var $navigation = $('#main-navigation');
  var $body = $('body');
  var open = $navButton.hasClass('open');

  // Timeout is required for transition to work (cannot make a transition from display:none)
  // Transition listener is required for the same reason when hiding the panel
  if (open) {
    // Close navigation panel
    hideMobileNavigation($navigation);
  } else {
    // Open navigation panel
    var clickOutsideHandler = onMobileNavigationClickOutside.bind($navigation);
    $navigation.data('clickOutsideHandler', clickOutsideHandler);
    setTimeout(function () {
      $(document).on('click', clickOutsideHandler);
    });
    $body.addClass('fixed');
    $navButton.addClass('open');
    $navigation.addClass('open');
    setTimeout(function () {
      $navigation.addClass('navigation-slide-in');
    });
  }
}
function onMobileNavigationClickOutside(event) {
  var $navigation = this;
  var $header = $('header');
  if ($header.has(event.target).length === 0) {
    hideMobileNavigation($navigation);
  }
}
function hideMobileNavigation($navigation) {
  var transitionListener = function transitionListener() {
    $navigation[0].removeEventListener('transitionend', transitionListener);
    $navigation.removeClass('open');
  };
  var $body = $('body');
  var $navButton = $('#mobile-navigation-button');
  $navigation[0].addEventListener('transitionend', transitionListener);
  $body.removeClass('fixed');
  $navButton.removeClass('open');
  $navigation.removeClass('navigation-slide-in');
  $(document).off('click', $navigation.data('clickOutsideHandler'));
  $navigation.removeData('clickOutsideHandler');
}
function hideDesktopNavigationPanelLv2($panel) {
  $panel.addClass('hidden');
  $(document).off('click', $panel.data('clickOutsideHandler'));
  $panel.removeData('clickOutsideHandler');
}
function hideAllDesktopNavigationPanelsLv2() {
  $('.navigation-lv2-panel:not(.hidden)').each(function (index, element) {
    hideDesktopNavigationPanelLv2($(element));
  });
}
function isMobileMode() {
  // Read property 'content' from ::before element set by CSS
  // See: https://stackoverflow.com/questions/44342065/how-to-get-a-dom-elements-before-content-with-javascript
  var detectionDiv = document.querySelector('#device-detection');
  var content = getComputedStyle(detectionDiv, ':before').getPropertyValue('content');
  return content && content.indexOf('mobile') > -1;
}

/**
 * Add 'ios' class to certain elements which require different handling on iOS devices.
 */
function prepareDomForIOs() {
  if (isIOs()) {
    $('.tooltip').addClass('ios');
  }
}
function isIOs() {
  return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
  // iPad on iOS 13 detection
  navigator.userAgent.includes('Mac') && 'ontouchend' in document;
}
$(document).ready(function () {
  $('<div>').attr('id', 'device-detection').appendTo($('body'));
  prepareDomForIOs();
  installHandlers();
  hideAllDesktopNavigationPanelsLv2();
});