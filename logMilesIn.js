// ==UserScript==
// @name         Idle Addon
// @namespace    https://github.com/QuentinGibson/amazon-tampermonkey
// @version      1.0
// @description  Logs miles into ASM every 15 Minutes
// @author       QuentinGibson
// @match        https://aftlite-portal.amazon.com/indirect_action
// @downloadURL  https://raw.githubusercontent.com/QuentinGibson/Amazon-Tampermonkey/master/enhancedUpdate.js
// @grant        none
// ==/UserScript==


(function() {
  const loginInputElement = document.getElementsByName('scan_name');
  const activityInputElement = docuement.getElementsByName('scan_code')
  const milesLogin = `milesjr`
  const time = document.cookie
  .split('; ')
  .find(row => row.startsWith('time'))
  .split('=')[1]
  const fifteenMinutesPassed = function (time) {
    const fifteenMin = 1000 * 60 * 15;
    return (new Date().getTime() - time >= fifteenMin);
  }

  if (fifteenMinutesPassed(time)) {
    loginInputElement.value = milesLogin
    activityInputElement.value = 'ASM'
    document.cookie = `time=${new Date().getTime()}`;
    console.log('I labor tracked miles 15 minutes later!')
  }

  console.log(`Ready to go in 15 minutes`)

})()
