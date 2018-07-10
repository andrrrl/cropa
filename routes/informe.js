let express = require('express');
let router = express.Router();
let descargar = require('../controllers/informe');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('informe', {
        title: '__Informe__'
    });
});

router.get('/pdf', function (req, res, next) {
    // res.json(req.body);
    descargar(res);
});

module.exports = router;