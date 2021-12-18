// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://gsflearning.sjc1.qualtrics.com/jfe/form/SV_0VQwqtXIaDmjQnY
// @icon         https://www.google.com/s2/favicons?domain=qualtrics.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function getCount() {
        const name = "total_freezer=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded.split('; ');
        let res;
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        })
        return res;
    }

    function setCount(cValue) {
        let date = new Date();
        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = "total_freezer =" + cValue + "; " + expires + "; path=/";
    }

    function deleteCount() {
        document.cookie = `total_freezer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }


    function incrementCount(value) {
        const countValue = getCount()
        setCount(countValue + value)
    }

    function start() {
        const UGA2 = 107
        const firstPage = jQuery('.QuestionText')[0].innerHTML.includes('What is your login?')
        const secondPage = jQuery('.QuestionText')[0].innerHTML.includes('Was any piece of PPE unavailable?')
        const thirdPage = jQuery('.QuestionText')[0].innerHTML.includes('You have a 2 hour max time per 24 hours,')
        const fourthPage = jQuery('.QuestionText')[0].innerHTML.includes('<div style="text-align: center;"><span style="font-size: 29px; outline: rgb(0, 0, 0) solid 0px;" tabindex="-1">You <strong>must</strong> warm up every 30 minutes for 5 minutes. <br></span></div><div style="text-align: center;"><span style="font-size:29px;">Do you commit to that warm up period?</span><br>\n<img src="https://gsflearning.sjc1.qualtrics.com/CP/Graphic.php?IM=IM_6htHVD5abJmS84u" style="width: 526px; height: 499px;" data-image-state="ready"></div>')

        const submitPage = () => {
            jQuery('#NextButton').click()
        }

        function handleFirstPage() {
            jQuery('select')[0].value = UGA2
        }

        function handleSecondPage() {
            jQuery('label[for="QR~QID8~2"').click()
            submitPage()
        }

        function handleThirdPage() {
            jQuery('label[for="QR~QID5~1"]').click()
            submitPage()
        }
        function handleFourthPage() {
            jQuery('label[for="QR~QID6~1"]').click()
            submitPage()
        }

        function handleLastPage() {
            submitPage()
        }

        if (firstPage) {
            handleFirstPage()
        } else if (secondPage) {
            handleSecondPage()
        } else if (thirdPage) {
            handleThirdPage()
        } else if (fourthPage) {
            handleFourthPage()
        } else {
            handleLastPage()
            incrementCount(1)
        }
    }

    function showCount() {
        let countValue = 0;
        const cookieValue = getCount()
        if (Number.isInteger(cookieValue)) {
            countValue = cookieValue
        }
        const freezerCountElement = `<div class="freezer-count">${countValue}</div>`
        jQuery('.SkinInner').append(freezerCountElement)
    }

    showCount()
    setTimeout(() => setInterval(start, 1000), 1500)
})();