// ==UserScript==
// @name         Amazon Style
// @namespace    https://github.com/QuentinGibson/amazon-tampermonkey
// @version      1.0
// @description  Adds some style to aftlite-na
// @author       QuentinGibson
// @match        https://aftlite-na.amazon.com*
// @downloadURL  https://raw.githubusercontent.com/QuentinGibson/Amazon-Tampermonkey/master/style.js
// @resource     IMPORTED_CSS https://quentmadeit-icons.s3.amazonaws.com/style.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==


(function() {
  'use strict';
    const my_css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(my_css);
})()
