// ==UserScript==
// @name         Сrossfi web
// @version      1.0
// @author       mudachyo
// @match        *://bot.crossfi.org/*
// @run-at       document-start
// @icon         https://s2.coinmarketcap.com/static/img/coins/64x64/26202.png
// @grant        none
// @downloadURL  https://github.com/mudachyo/Crossfi/raw/main/crossfi-web.user.js
// @updateURL    https://github.com/mudachyo/Crossfi/raw/main/crossfi-web.user.js
// @homepage     https://github.com/mudachyo/Crossfi
// ==/UserScript==

(function() {
    'use strict';

    var newUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";

    Object.defineProperty(navigator, 'userAgent', {
        get: function() { return newUserAgent; }
    });

    Object.defineProperty(navigator, 'platform', {
        get: function() { return 'iPhone'; }
    });

    Object.defineProperty(navigator, 'vendor', {
        get: function() { return 'Apple Computer, Inc.'; }
    });

})();
