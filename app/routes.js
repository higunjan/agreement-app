
let agreementController = require('../controllers/agreementController.js');

module.exports = function(app) {

    app.all('/*', function(req, res, next){
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'my-header,X-Requested-With,content-type,Authorization,cache-control');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    })

    // HOME PAGE (with login links)
    app.get('/', function(req, res) {
        res.send('OK');
    });

    app.get('/getAgreements', agreementController.getAgreements);
    app.post('/saveAgreement', agreementController.saveAgreement);
    app.post('/updateAgreement', agreementController.updateAgreement);
    app.post('/deleteAgreement', agreementController.deleteAgreement);
    app.post('/getAgreement', agreementController.getAgreement);
    app.post('/filterAgreement', agreementController.filterAgreement);
}