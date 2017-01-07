# DHCP Client Monitor for TP-LINK Archer C7

I noticed a few clients in my router that I didn't recognize one day.
Everything turned out to be fine, but I decided I wanted an automated way to keep an eye on things.
Since I already have a Raspberry Pi that is always on, I decided to make something that it could run to monitor MAC Addresses on my router.
I am using [Mailgun](http://www.mailgun.com) to send myself the emails because they have a nice API and allow 1000 free messages per month.


**This was built specifically to work with a TP-LINK Archer C7 v2, firmware version 3.14.3 Build 150427 Rel.36706n. It may work with other routers, but that is up to you.**

## Setup

1. Install [PhantomJS](http://phantomjs.org) on your Raspberry Pi, or whatever device you want this to run on.
I got PhantomJS for my Pi here: [fg2it/phantomjs-on-raspberry](https://github.com/fg2it/phantomjs-on-raspberry)
2. Be sure you have Node installed on your Pi as well
3. Clone the repo
4. Run `npm install` or `yarn install`
5. Edit the variables in `run.sh` and add MAC address in the same format as the router to `knownClients.json`
6. Add a crontab to execute `run.sh` on a schedule. I've included my cron entry below