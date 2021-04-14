// ==UserScript==
// @name         Auto Receiver
// @namespace    https://github.com/QuentinGibson/amazon-tampermonkey
// @version      1.0
// @description  Move items from receive to desired location by location
// @author       QuentinGibson
// @match        https://aftlite-portal.amazon.com/inventory/view_catalog_data_for_asin
// @downloadURL  https://raw.githubusercontent.com/QuentinGibson/Amazon-Tampermonkey/master/receiver.js
// @grant        GM_xmlhttpRequest
// run_at        document-end
//
//
// ==/UserScript==


(function() {
    function getCookie(name) {
        if (document.cookie) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 1) return parts.pop().split(';').shift();
        }
    }
    function delete_cookie(name) {
        if( getCookie( name ) ) {
            document.cookie = `${name}=delete; expires=Thu, 00 Jan 1970 00:00:00 UTC; path=/;`
        }
    }
    function setCookie(cname, cvalue, exMinutes) {
        const d = new Date();
        d.setTime(d.getTime() + (exMinutes  * 59 * 1000));
        const expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    function drawElements() {
        const binLabel = document.createElement("p")
        const POLabel = document.createElement("p")
        const locationLabel = document.createElement("p")
        binLabel.innerHTML = "BIN"
        POLabel.innerHTML = "PO"
        locationLabel.innerHTML = "LOCATION"

        const submitButton = document.createElement("button")
        submitButton.innerHTML = "Start"
        const binInputElement = document.createElement("input")
        const POInputElement = document.createElement("input")
        const locationInputElement = document.createElement("input")

        submitButton.addEventListener('click', () => {
            const locationValue = locationInputElement.value
            const binValue = binInputElement.value
            const POValue = POInputElement.value
            setCookie('location', locationValue)
            setCookie('bin', binValue)
            getASINFromPO(POValue, locationValue, binValue)
        })

        const page = document.getElementById("a-page")
        page.append(binLabel)
        page.append(binInputElement)
        page.append(POLabel)
        page.append(POInputElement)
        page.append(locationLabel)
        page.append(locationInputElement)
        page.append(submitButton)
    }

    const getASINFromPO = (PO) => {
        const dock_receive_link = `https://aftlite-portal.amazon.com/dock_receive/reconcile_shorts_overages?po=${PO}`;
        GM_xmlhttpRequest({
            method: 'GET',
            url: dock_receive_link,
            onload: (output) => parseASIN(output.response)
        })

        function parseASIN(response) {
            const asins = [];
            const container = document.implementation.createHTMLDocument().documentElement;
            container.innerHTML = response;
            const table = container.getElementsByTagName('table')[3];
            const tableRows = [...table.getElementsByTagName('tr')];
            tableRows.shift();
            for (let tableRow of tableRows) {
                const asins = tableRow.firstChild.lastChild.firstChild.innerHTML;
                const asins_string = JSON.stringify(asins)
                asins.push(asins_string);
            }
            setCookie(`asins`, asins, 10)
        }

    }

    function moveToBIN(asin, bin) {
        console.log(`Fake Moved ${asin} to ${bin}`)
    }

    if (getCookie('location') && getCookie('bin') && getCookie('asins')) {
        const asins = JSON.parse(getCookie('asins'))
        if (asins.length === 0) {
            delete_cookie('location')
            delete_cookie('bin')
            delete_cookie('asins')
        } else {
            const location = getCookie('location')
            const currentASIN = asins[0];
            const pageASIN = document.getElementsByTagName('h4')[0]
            if (pageASIN.innerHTML.includes(currentASIN)) {
                const pageLocation = document.getElementsByClassName('a-span5')[12]
                if (pageLocation.innerHTML.includes(location)) {
                    moveToBIN(currentASIN, location);
                    asins.shift();
                    setCookie(`asins`, asins, 10)
                }
            } else {
                const asinInputElement = document.getElementsByName("asin")
                asinInputElement.value = currentASIN
                const asinFormSubmit = document.querySelectorAll("input[type=submit]")[2]
                asinFormSubmit.submit();
            }
        }
    }
    drawElements()
})()
