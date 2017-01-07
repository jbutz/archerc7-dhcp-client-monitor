var system = require('system');
var page = require('webpage').create();
var fs = require('fs');

const MULT = 5000;

setTimeout(function () {
    page.open(system.env.ROUTER_URL);
}, 0 * MULT);

setTimeout(function () {
    
    page.evaluate(function (username, password) {
        if (document.getElementById('loginBtn')) {
            document.getElementById('userName').value = username;
            document.getElementById('pcPassword').value = password;
            document.getElementById('loginBtn').click();
        }
    }, system.env.ROUTER_USER, system.env.ROUTER_PASS);
}, 1 * MULT);

setTimeout(function () {
    
    var el = page.evaluate(function () {
        var leftFrame = document.getElementsByName('bottomLeftFrame')[0];
        leftFrame.contentDocument.getElementById('a26').click();
        return leftFrame;
    });
}, 2 * MULT);

setTimeout(function () {
    
    var dhcpClients = page.evaluate(function () {
        var mainFrame = document.getElementsByName('mainFrame')[0];

        var table = mainFrame.contentDocument.querySelector('#autoWidth tr td table');
        var dhcpClients = [];

        var rows = table.getElementsByTagName('tr');

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


}, 3 * MULT);

setTimeout(function () {
    page.close();
    setTimeout(function () {
        phantom.exit();
    }, 100);
}, 4 * MULT);