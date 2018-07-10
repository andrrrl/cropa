let fs = require('fs');
let scss = require('node-sass');
let path = require('path');
let pdf = require('html-pdf');

module.exports = function descargar(res) {

    const input = 'informe.html';

    let html = fs.readFileSync('/home/andrrr/src/cropa/assets/informe.html', 'utf8');

    // Se agregan los estilos CSS
    let scssFile = '/home/andrrr/src/cropa/assets/sass/main.scss';

    // Se agregan los estilos
    let css = '<style>\n\n';

    // SCSS => CSS
    css += scss.renderSync({
        file: scssFile,
        // includePaths: [
        //     path.join(__dirname, '/home/andrrr/src/cropa/assets/sass/')
        // ]
    }, (err, result) => {
        if (err) {
            res.json({
                err: err
            });
        }
    }).css;
    css += '</style>';
    html += css;




    // PhantomJS PDF rendering options
    // https://www.npmjs.com/package/html-pdf
    // http://phantomjs.org/api/webpage/property/paper-size.html
    const phantomPDFOptions = {
        format: 'A4',
        border: {
            // default is 0, units: mm, cm, in, px
            top: '0.5cm',
            right: '0.5cm',
            bottom: '1.5cm',
            left: '1.5cm'
        },
        header: {
            height: '2.5cm',
        },
        footer: {
            height: '10mm',
            contents: {
                default: '<span class="text-muted">{{page}}</span>/<span>{{pages}}</span>'
            }
        }
    };

    console.log(html);

    pdf.create(html, phantomPDFOptions).toFile((err2, file) => {

        console.log(file);

        if (err2) {
            res.json({
                err2: err2
            });
        }

        // res.setHeader('Content-disposition', 'attachment; filename=' + file.filenam);
        res.download(file.filename, (err3) => {
            if (err3) {
                res.json({
                    err3: err3
                });
            }
        });
    });
}