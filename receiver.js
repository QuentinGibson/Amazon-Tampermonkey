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
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    function delete_cookie(name) {
        if( getCookie( name ) ) {
            document.cookie = `${name}=delete; expires=Thu, 00 Jan 1970 00:00:00 UTC; path=/;`
        }
    }
    function setCookie(cname, cvalue, exMinutes) {
        const d = new Date();
        d.setTime(d.getTime() + (exMinutes * 60 * 1000));
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
            setCookie('location', locationValue, 10)
            setCookie('bin', binValue, 10)
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
            const table = container.getElementsByTagName('table')[2];
            const tableRows = [...table.getElementsByTagName('tr')];
            tableRows.shift();
            for (let tableRow of tableRows) {
                const asin = tableRow.firstChild.lastChild.firstChild.innerHTML;
                asins.push(asin);
            }
            const asins_string = JSON.stringify(asins)
            setCookie(`asins`, asins_string, 10)
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
            if (pageASIN) {
                if (pageASIN.innerHTML.includes(currentASIN)) {
                    const pageLocation = document.getElementsByClassName('a-span5')[12]
                    if (pageLocation.innerHTML.includes(location)) {
                        moveToBIN(currentASIN, location);
                        asins.shift();
                        setCookie(`asins`, asins, 10)
                    }
                }
            } else {
                const asinInputElement = document.getElementsByName("asin")[0]
                asinInputElement.value = currentASIN
                const asinFormSubmit = document.querySelectorAll("input[type=submit]")[0]
                asinFormSubmit.click();
            }
        }
    }
    drawElements()
})()
