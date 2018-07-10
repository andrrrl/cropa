let express = require('express');
let bodyParser = require('body-parser')
let fs = require('fs');
let router = express.Router();


// create application/json parser
let jsonParser = bodyParser.json({
    limit: '50mb'
});

/* POST image upload */
router.post('/', jsonParser, function (req, res, next) {

    let base64Data = req.body.file.replace(/^data:image\/png;base64,/, "");

    fs.writeFile('./public/images/cropped.png', base64Data, 'base64', (err) => {
        if (err) {
            return res.json(err);
        }
        res.json({
            response: 'OK'
        });

    });

});

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Cropped'
    });
});

module.exports = router;