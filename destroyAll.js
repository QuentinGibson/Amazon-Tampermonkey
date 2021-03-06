// ==UserScript==
// @name         Destroy All Button
// @namespace    https://github.com/QuentinGibson/amazon-tampermonkey
// @version      1.0
// @description  Creates a button in the location page that moves all items from inventory to trash
// @author       QuentinGibson
// @match        https://aftlite-na.amazon.com/inventory/view_inventory_at*
// @downloadURL  https://raw.githubusercontent.com/QuentinGibson/Amazon-Tampermonkey/master/destroyAll.js
// @grant        none
// ==/UserScript==

(function () {
  const inProgress = document.cookie
  .split('; ')
  .find(row => row.startsWith('inProgress'))
  .split('=')[1]

  const destroyItem = function () {
      document.cookie = `inProgress=true`;
      const locationName = 'changeMe'
      const quantity = document.getElementsByName('quantity')[0]
      const moveQuantity = document.getElementsByName('quantity')[1]
      const submitButton = document.getElementsByName('commit')[0]
      const locationInput = document.getElementsByName(locationName)[0]

      moveQuantity.value = quantity.value
      locationInput.value = 'Trash-DISPOSE'
      submitButton.submit();
  }

  if (inProgress === 'true' && document.getElementsByName('quantity').length !== 0) {
    destroyItem();
  } else {
    console.log('No more items!')
    console.log('Done!')
  }

  const button = document.createElement('button')
  button.value = 'Destroy ALl ⚠️'
  button.style.marginLeft = '100px'
  button.style.padding = '10px 20px'
  button.style.background = 'red'
  button.style.fontWeight = 'bold'
  button.onclick = (e) => {
    e.preventDefault();
    destroyItem();
  }
  const containerXPath = '//html/body/table[1]/tbody/tr/td[2]'
  const placeholder = getElementByXPath(containerXPath)

  placeholder.appendChild(button)
  function getElementByXPath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  }
})
