'use strict';
var nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: '/config.json' });

module.exports = nconf;
module.exports = {
    paypal: {
        businessEmail: '',
        url: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
        currency: 'USD'
    },
    secret: '',
    name: 'nodeStore',
    db: {
        url: 'mongodb://localhost:27017/amazon',
        sessions: 'sessions'
    },
    locale: {
        lang: 'en-US',
        currency: 'USD'
    }
};