var Hjson = require('hjson');
var fs = require('fs');

var mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });


var knownMacAddresses = Hjson.parse(fs.readFileSync('knownClients.json', {encoding: 'utf8'}));
var dhcpClients = Hjson.parse(fs.readFileSync('dhcpClients.json', {encoding: 'utf8'}));

var newClients = [];
dhcpClients.forEach(function (client) {
    if (knownMacAddresses.indexOf(client.mac) < 0) {
        newClients.push(client);
    }
});

if (newClients.length > 0) {
    var outputText = [];

    newClients.forEach(function (client) {
        outputText.push(client.name + '  |  ' + client.mac + '  |  ' + client.ip);
    });

    var data = {
        from: process.env.MAILGUN_FROM,
        to: process.env.MAILGUN_TO,
        subject: '!! New Home Network DHCP Clients !!',
        text: outputText.join('\n\n')
    };

    mailgun.messages().send(data, function (error, body) {
        console.log('Unknown clients found, mail sent');
    });
} else {
    console.log('No new clients');
}
