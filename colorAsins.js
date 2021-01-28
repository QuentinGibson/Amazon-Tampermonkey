// ==UserScript==
// @name         Color Asins
// @namespace    https://github.com/QuentinGibson/amazon-tampermonkey
// @version      1.0
// @description  Add a color to asins that represent pick status
// @author       QuentinGibson
// @match        https://aftlite-na.amazon.com/wms/pack_by_picklist/*
// @downloadURL  https://raw.githubusercontent.com/QuentinGibson/Amazon-Tampermonkey/master/colorasins.js
// @grant        GM_xmlhttpRequest
// run_at        document-end
// ==/UserScript==

(function init() {
  // These Variable depend on the website
  var allLinks = document.getElementsByTagName('a')
  var asinLinkRegex = /inventory\/view_inventory_for_asin?/
  var asinLinks = Array.prototype.filter.call(allLinks, findAsinLinks)
  // See the result of filter 
  Array.prototype.forEach.call(asinLinks, asinLink => setColorFromInventory(asinLink)); 
  function findAsinLinks(links) { return links.href.match(asinLinkRegex) }

  function setColorFromInventory(element) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: element.href,
        onload: function(output) {
            var count = countPickable(output.response)
            if (count >= 1) {
                element.style.color = "green"
            } else if (count == 0) {
                element.style.color = "red"
            } else {
                element.style.color = "grey"
            }
        }
    })
    function countPickable(response) {
      var count = 0;
      var container = document.implementation.createHTMLDocument().documentElement;

      container.innerHTML = response
      var nodeListOfSpans = container.querySelectorAll('span[style]')
      if (nodeListOfSpans.length === 0) {
          return 0
      }

      Array.prototype.forEach.call(nodeListOfSpans, span => {
        var text = span.textContent.toLowerCase()
        var regexForNumber = /^\d/
          if (!text.includes("unpickable") && text.match(regexForNumber)) {
            var number = text.match(regexForNumber)[0]
            count += number
          }
      })
      console.log(`Count: ${count}`)
      return count
    }
  }

//   function getElementByXPath(path) {
//     return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
//   }
})();
