let fs = require('fs');
let scss = require('node-sass');
let path = require('path');
let pdf = require('html-pdf');

module.exports = function descargar(res) {

    const input = 'informe.html';

    // Se leen header y footer (si se le pasa un encoding, devuelve un string)
    let headerHTML = fs.readFileSync(path.join(__dirname, '../assets/includes/header.html'), 'utf8');
    let footerHTML = fs.readFileSync(path.join(__dirname, '../assets/includes/footer.html'), 'utf8');

    // let logotipoAndes = fs.readFileSync(path.join(__dirname, '../../../templates/andes/logotipo-andes-blue.png'));
    // let logoPDP = fs.readFileSync(path.join(__dirname, '../../../templates/andes/logo-pdp.png'));

    let html = headerHTML;
    html += fs.readFileSync(path.join(__dirname, '../assets/informe.html'), 'utf8');
    html += footerHTML;

    // Se cargan logos
    let logoEfector = fs.readFileSync(path.join(__dirname, '../assets/img/logo-efector.png'));
    let logoAdicional = fs.readFileSync(path.join(__dirname, '../assets/img/logo-adicional.png'));
    let logoAndes = fs.readFileSync(path.join(__dirname, '../assets/img/logo-andes-h.png'));
    let logoPDP = fs.readFileSync(path.join(__dirname, '../assets/img/logo-pdp.png'));
    let logoPDP2 = fs.readFileSync(path.join(__dirname, '../assets/img/logo-pdp-h.png'));

    // Firmas
    let firma1 = fs.readFileSync(path.join(__dirname, '../assets/img/firmas/firma-1.png'));
    let firma2 = fs.readFileSync(path.join(__dirname, '../assets/img/firmas/firma-2.png'));

    // Se reemplazan ciertos <!--placeholders--> por logos de ANDES y Dirección de Protección de Datos Personales
    // Y datos de sesión (organización, nombre del usuario, timestamp)

    // .replace('<!--logotipoAndes-->', `<img class="logotipoAndes" src="data:image/png;base64,${logotipoAndes.toString('base64')}">`)
    // .replace('<!--logoPDP-->', `<img class="logoPDP" src="data:image/png;base64,${logoPDP.toString('base64')}">`)
    // .replace('<!--organizacion-->', Auth.getOrganization(req, 'nombre'))
    // .replace('<!--usuario-->', JSON.stringify(Auth.getUserName(req)))
    // .replace('<!--timestamp-->', new Date().toLocaleString('locale', { timeZone: this.timeZone }));

    // return html;


    html = html
        .replace('<!--logoOrganizacion-->', `<img class="logo-efector" src="data:image/png;base64,${logoEfector.toString('base64')}">`)
        .replace('<!--logoAdicional-->', `<img class="logo-adicional" src="data:image/png;base64,${logoAdicional.toString('base64')}">`)
        .replace('<!--logoAndes-->', `<img class="logo-andes" src="data:image/png;base64,${logoAndes.toString('base64')}">`)
        .replace('<!--firma1-->', `<img class="logo-andes" src="data:image/png;base64,${firma1.toString('base64')}">`)
        .replace('<!--firma2-->', `<img class="logo-andes" src="data:image/png;base64,${firma2.toString('base64')}">`)
        .replace('<!--logoPDP-->', `<img class="logo-pdp" src="data:image/png;base64,${logoPDP.toString('base64')}">`)
        .replace('<!--logoPDP2-->', `<img class="logo-pdp-h" src="data:image/png;base64,${logoPDP2.toString('base64')}">`)
    // .replace('<!--logoOrganizacion-->', `<img class="logo-efector" src="data:image/png;base64,${logoEfector.toString('base64')}">`)
    // .replace('<!--logoOrganizacion-->', `<img class="logo-efector" src="data:image/png;base64,${logoEfector.toString('base64')}">`)
    // .replace('<!--logoOrganizacion-->', `<img class="logo-efector" src="data:image/png;base64,${logoEfector.toString('base64')}">`)
    // .replace('<!--logoOrganizacion-->', `<img class="logo-efector" src="data:image/png;base64,${logoEfector.toString('base64')}">`)


    // Se agregan los estilos CSS
    let scssFile = path.join(__dirname, '../assets/sass/main.scss');

    console.log(__dirname);

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
            top: '0cm',
            right: '0cm',
            bottom: '0cm',
            left: '0cm'
        },
        header: {
            height: '3.5cm',
        },
        footer: {
            height: '10mm',
            contents: {
                default: '<small class="text-muted">{{page}}</small>/<small class="text-muted">{{pages}}</small>'
            }
        }
    };

    // console.log(html);

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
            // console.log(html);
        });
    });
}