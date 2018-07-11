let express = require('express');
let router = express.Router();
let descargar = require('../controllers/informe');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('informe', {
        title: '__Informes__'
    });
});

router.get('/pdf', function (req, res, next) {
    // res.json(req.body);
    descargar(res);
});


router.get('/pdf2', function (req, res, next) {
    const htmlPdf = require('html-pdf-chrome');

    const html = '<p>Hello, world!</p>';
    const options = {
        port: 9222, // port Chrome is listening on
    };

    htmlPdf.create(html, options).then((pdf) => {
        pdf.toFile('test.pdf').then(saved => {
            res.download(saved);
        });
    });
    // htmlPdf.create(html, options).then((pdf) => pdf.toBase64());
    // htmlPdf.create(html, options).then((pdf) => {
    //     res.download(pdf.toBuffer())
    // }).catch(e => {
    //     res.end(e);
    // });
})

module.exports = router;