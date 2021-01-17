
// ==UserScript==
// @name         Temp Button Addon
// @namespace    https://github.com/QuentinGibson/amazon-tampermonkey
// @version      1.0
// @description  Add a temporary inventory button for problem solvers
// @author       QuentinGibson
// @match        https://aftlite-na.amazon.com/inventory/view_inventory_for_asin*
// @match        https://aftlite-na.amazon.com/inventory/view_inventory_at*
// @match        https://aftlite-na.amazon.com/inventory/view_catalog_data_for_asin*
// @downloadURL  https://raw.githubusercontent.com/QuentinGibson/Amazon-Tampermonkey/master/tempbutton.js
// @grant        none
// ==/UserScript==

(function init() {
  var tables = document.getElementsByTagName("table");
  var button = document.createElement("button");
  var quantityInput = 'change_this'
  var dateInput = 'change_this'
  var locationInput = 'change_this'
  var siteForm = 'change_this'


  var quantityInputElement = document.getElementsByTagName(quantityInput)
  var dateInputElement = document.getElementsByTagName(dateInput)
  var locationInputElement = document.getElementsByTagName(locationInput)
  var formQuantity = 1
  var formDate = new Date(d.getTime() + 3600000 * 24 * 365); // add one year
  var formLocation = 'p-1-a150-d240'


  button.innerHTML = "Add Temp"
  tables[2].appendChild(button);
  button.addEventListener('click', function () {
    quantityInputElement.value = formQuantity
    dateInputElement.value = formDate
    locationInputElement.value = formLocation
    siteForm.submit()
  })
})();
