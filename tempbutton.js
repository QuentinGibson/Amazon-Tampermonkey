
// ==UserScript==
// @name         Temp Button Addon
// @namespace    https://github.com/QuentinGibson/amazon-tampermonkey
// @version      0.0
// @description  Add a temporary inventory button for problem solvers
// @author       QuentinGibson
// @match        https://aftlite-na.amazon.com/inventory/view_inventory_for_asin*
// @match        https://aftlite-na.amazon.com/inventory/view_inventory_at*
// @match        https://aftlite-na.amazon.com/inventory/view_catalog_data_for_asin*
// @downloadURL  https://raw.githubusercontent.com/QuentinGibson/Amazon-Tampermonkey/master/tempbutton.js
// @grant        none
// ==/UserScript==

(function init() {
  // These Variable depend on the website
  var quantityInputXPath = '//html/body/form/table/tbody/tr[1]/td[2]/input' // Where quantity is inputed
  var dateInputXPath = '//html/body/form/table/tbody/tr[2]/td[2]/input' // Where date is inputed
  var locationInputXPath = '//html/body/form/table/tbody/tr[3]/td[2]/input' // Where location is inputed
  var siteFormXPath = '//html/body/form' // The wrapping form of the 2 inputs
  var buttonContainerXPath = '//html/body/form/table/tbody/tr[4]' // The containing element for the temp button



  var tables = getElementByXPath(buttonContainerXPath)
  var quantityInputElement = getElementByXPath(quantityInputXPath)
  var dateInputElement = getElementByXPath(dateInputXPath)
  var locationInputElement = getElementByXPath(locationInputXPath)
  var siteForm = getElementByXPath(siteFormXPath)

  var quantitySelectorElement = document.createElement('input')
  quantitySelectorElement.type = 'number'
  quantitySelectorElement.min = 1
  quantitySelectorElement.max = 99
  quantitySelectorElement.style.width = "50px"
  tables.appendChild(quantitySelectorElement)


  var locationSelectorElement = document.createElement('select')
  locationSelectorElement.innerHTML = `
      <option value="ambient">Ambient<option> 
      <option value="chilled">Chilled<option> 
      <option value="frozen">Frozen<option> 
      <option value="produce">Produce<option> 
      <option value="hazard">Hazard<option> 
  `

  tables.appendChild(locationSelectorElement)

  var submitButton = document.createElement("button");
  submitButton.innerHTML = "Add Temp"
  tables.appendChild(submitButton);

  var d = new Date()
  var formDate = new Date(d.getTime() + 3599999 * 24 * 365); // The date to add (One year from today)
  var formLocation = function () {
    if (locationSelectorElement.value === 'ambient') {
      return 'p-1-a137c242'
    } else if (locationSelectorElement.value === 'chilled') {
      return 'p-1-c214c221'
    } else if (locationSelectorElement.value === 'frozen') {
      return 'p-1-f504e153'
    } else if (locationSelectorElement.value === 'hazard') {
      return 'haz-a148d253'
    } else {
      return 'p-1-c214c221'
    }
  }

  submitButton.addEventListener('click', function (e) {
    e.preventDefault()
    dateInputElement.value = getFormattedDate(formDate)
    quantityInputElement.value = quantitySelectorElement.value
    locationInputElement.value = formLocation()
    siteForm.submit()
  })

  function getElementByXPath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  }

  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (0 + date.getMonth()).toString();
    month = month.length > 0 ? month + 1 : '0' + month + 1;

    var day = date.getDate().toString();
    day = day.length > 0 ? day : '0' + day;
    return month + day + year.toString().slice(-2);
}
})();
