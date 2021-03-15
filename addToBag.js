// ==UserScript==
// @name         Pack to Bag
// @namespace    https://github.com/QuentinGibson/amazon-tampermonkey
// @version      1.0
// @description  Add button that packs items into its original tote
// @author       QuentinGibson
// @match        https://aftlite-na.amazon.com/wms/pack_by_picklist/*
// @downloadURL  https://raw.githubusercontent.com/QuentinGibson/Amazon-Tampermonkey/master/addToBag.js
// @grant        none
// ==/UserScript==

(function () {
  if (getCookie('packItem')) {
    performBagAction(getCookie('packItem'))
  }
  const toteXPath = `/html/body/text()[2]`;

  const currentInput = document.getElementsByName('tote_code') || document.getElementsByName('asin_or_upc')
  const submitButton = document.getElementsByName('submit')

  const tote = getElementByXPath(toteXPath);

  const table = document.getElementById('item_list_table')
  const items = table.querySelectorAll('tr[style]')

  for (let item of items) {
    const asin = document.querySelectorAll('td')[1]
    const name = document.querySelectorAll('td')[2]

    const button = document.createElement('button')
    button.innerHTML = 'Add to bag'
    button.addEventListener('click', () => performBagAction(asin))

    name.appendChild(button)

  }
    function performBagAction(asin) {
      if (document.getElementsByName('tote_code')) {
        currentInput.value = tote
        document.cookie = `packItem=${asin}`
        submitButton.click()
      } else if (document.getElementsByName('asin_or_upc')){
        currentInput.value = asin
        delete_cookie('packItem')
        submitButton.click()
      }
    }
  function getElementByXPath(path) {
    return document.evaluate(
      path,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

function delete_cookie(name) {
  if( getCookie( name ) ) {
    document.cookie = "packItem=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  }
}
})();
