  // ==UserScript==
  // @name         Idle Addon
  // @namespace    https://github.com/QuentinGibson/amazon-tampermonkey
  // @version      1.0
  // @description  Changes idle to another code
  // @author       QuentinGibson
  // @match        TODO: URL HERE
  // @downloadURL  https://raw.githubusercontent.com/QuentinGibson/Amazon-Tampermonkey/master/enhancedUpdate.js
  // @grant        none
  // ==/UserScript==

  (function init() {
    const allCodes = document.getElementsByTagName('select')
    const cookieNamedSelectorsExists = document.cookie.split(';').some((item) => item.trim().startsWith('selectors='))
    const cookieNamedCodeExists = document.cookie.split(';').some((item) => item.trim().startsWith('code='))

    if (cookieNamedSelectorsExists && cookieNamedCodeExists) {
      const selectorCount = document.cookie
      .split('; ')
      .find(row => row.startsWith('selectors')) 
      .split('=')[1]

      const code = document.cookie
      .split('; ')
      .find(row => row.startsWith('code'))
      .split('=')[1]

      const lastTime = document.cookie
      .split('; ')
      .find(row => row.startsWith('lastTime'))
      .split('=')[1]

      const fifteenMinutesPassed = function () {
        const past = new Date().getTime();
        const fifteenMin = 1000 * 60 * 15;
        return (new Date().getTime() - past >= fifteenMin);
      }

      if (selectorCount > 0 && code !== 'undefined') {
        const cookieIdle = findFirstIdle(allCodes)
        changeIdleToAnother(cookieIdle, code)
        console.log(`The cookie "selector" exists, ${selectorCount} count!`)
      } else if (selectorCount > 0 && fifteenMinutesPassed) {
        const cookieIdle = findFirstIdle(allCodes)
        changeIdleToAnother(cookieIdle, code)
        console.log(`15 minutes passed, cleared Idle!`)
      }
    }

    // These Variables depend on the website
    var containerXPath = '//html/body/div' // TODO: CHANGE THIS | Where the inputs will be rendered
    var containerElement = getElementByXPath(containerXPath)
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
      
      const idle = findFirstIdle(allCodes);
      console.log(idle)
      const code = codeSelectorElement.value
      document.cookie = `code=${code}`
      changeIdleToAnother(idle, code)
    })

    containerElement.appendChild(codeSelectorElement)
    containerElement.appendChild(submitButton)

    function findFirstIdle(allCodes) {
      const idles = Array.prototype.filter.call(allCodes, selector => {
        if (selector.value === "IDLE") {
          return selector
        }
      })
      document.cookie = `selectors=${idles.length}`;
      return idles[0]

    }

    function changeIdleToAnother(idle, code) {
      idle.value = code
      idle.onchange()
    }

    function getElementByXPath(path) {
      return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    }
  })();
