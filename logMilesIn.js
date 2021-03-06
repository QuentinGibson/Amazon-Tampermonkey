// ==UserScript==
// @name         Miles Auto Labor Tracker
// @namespace    https://github.com/QuentinGibson/amazon-tampermonkey
// @version      1.0
// @description  Logs miles into ASM about every 15 Minutes
// @author       QuentinGibson
// @match        https://aftlite-portal.amazon.com/indirect_action
// @downloadURL  https://raw.githubusercontent.com/QuentinGibson/Amazon-Tampermonkey/master/logMilesIn.js
// @grant        none
// ==/UserScript==


(function() {
  const milesLogin = `milesjr`
  const activity = 'ASM'
  const loginInputElement = document.getElementsByName('scan_name');
  const activityInputElement = docuement.getElementsByName('scan_code')
  const past = document.cookie
  .split('; ')
  .find(row => row.startsWith('past'))
  .split('=')[1]
  const fifteenMinutesPassed = function (past) {
    const fifteenMin = 1000 * 60 * 15;
    return (new Date().getTime() - past >= fifteenMin);
  }

  if (past) {
    while (true) {
      const minute = 1000 * 60;
      setInterval(past => {
        if (fifteenMinutesPassed(past)) {
          loginInputElement.value = milesLogin
          activityInputElement.value = activity
          document.cookie = `past=${new Date().getTime()}`;
          console.log('I labor tracked miles 15 minutes later!')
          break;
        } else {
          console.log(`Not quite 15 minutes yet! Don't worry I'm still watching`)
        }
      }, minute)
    }
  } else {
    loginInputElement.value = milesLogin
    activityInputElement.value = 'ASM'
    document.cookie = `past=${new Date().getTime()}`;
    console.log('I labor tracked miles 15 minutes later!')
  }
})()
