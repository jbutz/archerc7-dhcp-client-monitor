var system = require('system');
var page = require('webpage').create();
var fs = require('fs');

const MULT = 5000;

setTimeout(function () {
    page.open(system.env.ROUTER_URL);
}, 0 * MULT);

setTimeout(function () {
    if(system.env.DEBUG) page.render('step1.png');

    page.evaluate(function (username, password) {
        if (document.getElementById('loginBtn')) {
            document.getElementById('userName').value = username;
            document.getElementById('pcPassword').value = password;
            document.getElementById('loginBtn').click();
        }
    }, system.env.ROUTER_USER, system.env.ROUTER_PASS);
}, 1 * MULT);

setTimeout(function () {
    if(system.env.DEBUG) page.render('step2.png');

    var success = page.evaluate(function () {
        var leftFrame = document.getElementsByName('bottomLeftFrame')[0];
        leftFrame.contentDocument.getElementById('a26').click();

        return leftFrame != null;
    });

    if (!success) {
        console.error('Could not open DHCP Clients List');
        stopScript();
    }

}, 2 * MULT);

setTimeout(function () {
    if(system.env.DEBUG) page.render('step3.png');
    
    var dhcpClients = page.evaluate(function () {
        var mainFrame = document.getElementsByName('mainFrame')[0];

        if (!mainFrame) return [];

        var table = mainFrame.contentDocument.querySelector('#autoWidth tr td table');

        if (!table) return [];

        var dhcpClients = [];

        var rows = table.getElementsByTagName('tr');

        if (!rows) return [];

        for (var i = 0; i < rows.length; i++) {
            if (i === 0) continue;
            var row = rows[i];
            var cols = row.getElementsByTagName('td');

            dhcpClients.push({
                name: cols[1].textContent,
                mac: cols[2].textContent,
                ip: cols[3].textContent
            })
        }

        return dhcpClients
    });

    fs.write('dhcpClients.json', JSON.stringify(dhcpClients), 'w');

    if (dhcpClients.length <= 0) {
        console.error('Found no DHCP clients')
    }


}, 3 * MULT);

setTimeout(function () {
    stopScript();
}, 4 * MULT);

function stopScript() {
    page.close();
    setTimeout(function () {
        phantom.exit();
    }, 100);
}