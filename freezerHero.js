// ==UserScript==
// @name         FreezerSurveyHelper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *gsflearning.sjc1.qualtrics.com/jfe/form/*
// @icon         https://www.google.com/s2/favicons?domain=qualtrics.com
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @require http://code.jquery.com/jquery-latest.js
// @require https://raw.githubusercontent.com/js-cookie/js-cookie/master/src/js.cookie.js
// @grant        none
// run_at        document-end
// ==/UserScript==

(function() {
    'use strict';
    jQuery.noConflict();
    jQuery(document).ready(function ($) {
        setTimeout(setInterval(start, 1000), 2000)

        const container = document.createElement('div')
       
        function start() {
             const answerQuestion = questionClassName => {
                 if (questionClassName !== null) { jQuery(`#${questionClassName}`).click() }
                 jQuery('#NextButton').click()
             }
             const renderInput = (container) => {
                 const radio = 
                 container.append()
             }
            const UGA2 = 107

            if (isFirstPage()) { 
                jQuery('.Selection')[0].value = UGA2;
                jQuery('img').hide();
                renderInput(container);
                }
            if (isSecondPage()) { answerQuestion('QID8-2-label') }
            if (isThirdPage()) { answerQuestion('QID5-1-label') }
            if (isFourthPage()) { answerQuestion('QID6-1-label') }
            if (isLastPage()) { answerQuestion(null) }

            function isFirstPage() {
                return jQuery('.QuestionText')[0].innerHTML === 'What is your login?'

            }
            function isSecondPage() {
                return jQuery('.QuestionText')[0].innerHTML === "Was any piece of PPE unavailable?"
            }
            function isThirdPage() {
                if (jQuery('.QuestionText div span span')[0]) {
                    return jQuery('.QuestionText div span span')[0].innerHTML === "You have a 2 hour max time per 24 hours, <br>"
                }
            }
            function isFourthPage() {
                if (jQuery('.QuestionText div span')[0]) {
                    return jQuery('.QuestionText div span')[0].innerHTML === "You <strong>must</strong> warm up every 30 minutes for 5 minutes. <br>"
                }
            }
            function isLastPage() {
                if (jQuery('.QuestionText div strong span')[0]) {
                    return jQuery('.QuestionText div strong span')[0].innerHTML ===  "You may enter the freezer safely!"
                }
            }
        }

    });
})();