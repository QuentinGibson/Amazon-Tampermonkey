// ==UserScript==
// @name         Pack to Bag
// @namespace    https://github.com/QuentinGibson/amazon-tampermonkey
// @version      1.0
// @description  Add button that packs items into its original tote
// @author       QuentinGibson
// @match        https://aftlite-portal.amazon.com/indirect_action
// @downloadURL  https://raw.githubusercontent.com/QuentinGibson/Amazon-Tampermonkey/master/addToBag.js
// @grant        none
// ==/UserScript==

(function () {
  const toteXPath = ``;

  const baseUrl = "https://aftlite-na.amazon.com";
  const setToteEndPoint = `${baseUrl}/wms/set_tote`;
  const packProductEndPoint = `${baseUrl}/wms/pack_product`;
  const closeToteEndPoint = `${baseUrl}/wms/close_tote`;
  const finishEndPoint = `${baseUrl}/wms/finish_packing_picklist`;

  const tote = getElementByXPath(toteXPath);

  function getElementByXPath(path) {
    return document.evaluate(
      path,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  }
})();
