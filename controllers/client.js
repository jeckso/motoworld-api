const Client = require('../models/client');
module.exports.createClient =  (req, res) => {
    var client = new Client({ name: req.body.name, clientId: req.body.clientId, clientSecret:req.body.clientSecret });
    client.save(function(err, client) {
        if(err) return res.status(500).send(err);
    else res.status(200).send(client);
    });
};