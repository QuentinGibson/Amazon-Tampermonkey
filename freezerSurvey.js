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
    setTimeout(() => setInterval(start, 1000), 1500)

    function start() {
        const UGA2 = 107
        const firstPage = jQuery('.QuestionText')[0].innerHTML.includes('What is your login?')
        const secondPage = jQuery('.QuestionText')[0].innerHTML.includes('Was any piece of PPE unavailable?')
        const thirdPage = jQuery('.QuestionText')[0].innerHTML.includes('You have a 2 hour max time per 24 hours,')
        const fourthPage = jQuery('.QuestionText')[0].innerHTML.includes('warm up every 30 minutes for 5 minutes.')
        const lastPage = jQuery('.QuestionText')[0].innerHTML.includes('You may enter the freezer safely!')

        const submitPage = () => {
            jQuery('#NextButton').click()
        }

        function handleFirstPage() {
            jQuery('select')[0].value = UGA2
            document.getElementsByTagName('img')[0].style.display = 'none'
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
        } else if (lastPage) {
            handleLastPage()
            incrementCount()
        }

        class cookie {
            getCookie(cName) {
                const name = cName + "=";
                const cDecoded = decodeURIComponent(document.cookie); //to be careful
                const cArr = cDecoded.split('; ');
                let res;
                cArr.forEach(val => {
                    if (val.indexOf(name) === 0) res = val.substring(name.length);
                })
                return res;
            }

            setCookie(cName, cValue, expDays) {
                let date = new Date();
                date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
                const expires = "expires=" + date.toUTCString();
                document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
            }

            updateCookie(cName, cValue, expDays) {
                setCookie(cName, cValue, expDays)
            };

            deleteCookie(cName) {
                document.cookie = `${cName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
            }

        }
    }

})();