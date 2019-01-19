module.exports = {
    // configure the code below with your username, password and mlab database information
    database: 'mongodb://admin:admin123@ds253284.mlab.com:53284/motoworld',   //prod
    //database: 'mongodb://localhost:27017/meanauth',    //dev


        paypal: {
            businessEmail: '',
            url: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
            currency: 'USD'
        },
        secret: '123',
        name: 'nodeStore',
        db: {
            url: 'mongodb://admin:admin123@ds253284.mlab.com:53284/motoworld',
            sessions: 'sessions'
        },
        locale: {
            lang: 'en-US',
            currency: 'USD'
        }

};
