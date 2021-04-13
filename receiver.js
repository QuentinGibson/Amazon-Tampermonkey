// ==UserScript==
// @name         Miles Auto Labor Tracker
// @namespace    https://github.com/QuentinGibson/amazon-tampermonkey
// @version      1.0
// @description  Logs miles into ASM about every 15 Minutes
// @author       QuentinGibson
// @match        https://aftlite-portal.amazon.com/indirect_action
// @downloadURL  https://raw.githubusercontent.com/QuentinGibson/Amazon-Tampermonkey/master/logMilesIn.js
// @grant        none
//
// #Plan
// Find all ASINS
// Link: https://aftlite-portal.amazon.com/dock_receive/reconcile_shorts_overages?po=
// Test ASINS location
// Link: https://aftlite-portal.amazon.com/inventory
// Postlink: /inventory/view_catalog_data_for_asin
// name: asin
// Move location to bin
// link: {Receive Tool}
// ?????
// Profit?
//
// ==/UserScript==


(function() {
    console.log("NOT YET COMPLETED")
    const getASINfromPO = () => {

    }
})()
