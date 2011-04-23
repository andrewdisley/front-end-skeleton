---
layout: nil
---
/*!
 * @name {{ site.title }}
 * @package script.js
 * @version {{ 'now' | date: "%Y-%m-%d %H:%M" }}
 * @author {{ site.author }} {@link {{ site.author_twitter }} | {{ site.author_url }}}
 */

/*	Global Configuration
 ----------------------------------------------- */
var $j = jQuery;

var SGlobal = {

  /* Configuration */
  cDebug: null,
  cBrowser: null,

  /* jQuery Object References  */
  jHTML: null,

  /* Utility: Browser Tests / Specific Fixes/Hooks */
  utilBrowserTests : function() {

    var t = this;

    /* Add jq class to html */
    t.jHTML.addClass('jq');

    if (t.jHTML.hasClass('ie6')) {
      t.cBrowser = 'ie6';
    } else if (t.jHTML.hasClass('ie7')) {
      t.cBrowser = 'ie7';
    } else if (t.jHTML.hasClass('ie8')) {
      t.cBrowser = 'ie8';
    }

    /* Detect if User Agent is Safari, add class '.safari' to html */
    if ($j.browser.safari) {
      t.jHTML.addClass('safari');
      t.cBrowser = 'safari';
    }

  },

  /* Utility: External Links */
  utilExternalLinks : function() {
    $j("a.external").live('click', function(e) {
      e.preventDefault();
      return !window.open($j(this).attr("href"));
    });
  },

  /* Utility: Scroll to 0 */
  utilScrollTop : function() {
    $j('#Content a.totp').live('click', function(e) {
      e.preventDefault();
      $j('html, body').animate({scrollTop: 0}, 200);
    });
  },

  init : function() {

    var t = this;

    t.cDebug = false;

    t.jHTML = $j('html');
    t.jHTML.addClass('jqloaded');

    t.utilBrowserTests();

    t.utilExternalLinks();

    /* Initialise .totp */
    t.utilScrollTop();

  }

};

/*	DOM Ready events
----------------------------------------------- */
$j(function() {

  SGlobal.init();

});
