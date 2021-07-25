// ==UserScript==
// @name         Expiration Links
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adds links to the asins on the page
// @author       Quentin Gibson
// @match        https://aftlite-portal.amazon.com/missing_exp_date_report*
// @icon         https://www.google.com/s2/favicons?domain=amazon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var asinList = [...document.getElementsByTagName('tr')]
    asinList.shift()
    for (const tableRow of asinList) {
        var asinElement = tableRow.getElementsByTagName('td')[2]
        var ancher = document.createElement('a')
        ancher.setAttribute('href',"https://aftlite-na.amazon.com/inventory/view_inventory_for_asin?asin=" + asinElement.getElementsByTagName('p')[0].textContent);
        ancher.setAttribute('target', "_blank")
        var pTag = asinElement.getElementsByTagName('p')[0]
        ancher.innerText = pTag.textContent
        asinElement.appendChild(ancher);
        pTag.style.display = 'none'
    }


})();