#!/bin/bash

export MAILGUN_DOMAIN=""
export MAILGUN_API_KEY=""
export MAILGUN_FROM="\"Raspberry Pi\" <no-reply@example.com>"
export MAILGUN_TO=""

export ROUTER_URL="http://192.168.0.1"
export ROUTER_USER=""
export ROUTER_PASS=""

BASEDIR=$(dirname "$0")
cd $BASEDIR

phantomjs ./lib/getClients.phantom.js
node ./lib/processClients.node.js