// ==UserScript==
// @name         Idle Addon
// @namespace    https://github.com/QuentinGibson/amazon-tampermonkey
// @version      1.0
// @description  Changes idle to another code
// @author       QuentinGibson
// @match        TODO: https://aftlite-na.amazon.com/inventory/view_inventory_for_asin*
// @downloadURL  https://raw.githubusercontent.com/QuentinGibson/Amazon-Tampermonkey/master/enhancedUpdate.js
// @grant        none
// ==/UserScript==

(function init() {
  // These Variable depend on the website
  var expirationDate = document.getElementsByName('expiration_date')
  var firstQuantity = document.getElementsByName('quantity')
  var

  var codeSelectorElement = document.createElement('select')
  codeSelectorElement.innerHTML = `
      <option value="AMCR">AMCR</option> 
      <option value="ASM">Assistant Manager</option> 
      <option value="BAGPREP">Bag Prep</option> 
      <option value="BATCHING">Batching</option> 
      <option value="BRK">Break</option> 
      <option value="HERO">Bullpen Hero</option> 
      <option value="DOCKCREW">Dock Sort Associate</option> 
      <option value="EOS">End Of Shift</option> 
      <option value="NIN">Flow Coordinator - Covid Testing</option> 
      <option value="STWTR">Freezer Hero</option> 
      <option value="WTRSP">IB Waterspider</option> 
      <option value="IDLE">Idle</option> 
      <option value="ADMN">Meetings - SD Heroes</option> 
      <option value="OBPS">OB Problem Solver</option> 
      <option value="GRADING">Produce Grading</option> 
      <option value="SORTER">Sorter</option> 
      <option value="SPECINDIRECT">Specialty Indirect Functions</option> 
      <option value="TIMEOFFTASK">Time Off Task</option> 
      <option value="TRN">Training</option> 
  `

  var submitButton = document.createElement("button");
  submitButton.innerHTML = "Set Idles"
  submitButton.addEventListener('click', function (e) {
    e.preventDefault()
    changeIdles()
  })

  containerElement.appendChild(codeSelectorElement)
  containerElement.appendChild(submitButton);


  function changeIdles() {
    const allSelectors = document.getElementsByTagName('select')
    Array.prototype.forEach.call(allSelectors, selector => {
      if (selector.value === "IDLE") selector.value = codeSelectorElement.value
    })
  }

  function getElementByXPath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  }
})();
