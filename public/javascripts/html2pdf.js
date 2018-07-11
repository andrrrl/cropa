// document.getElementById('upload').addEventListener('click', (event) => {
//     event.preventDefault();
//     const data = {
//         input: 'informe.html',
//         download: 'informe.pdf'
//     };
//     window.requestPDF(data);

// }, false);


// function requestPDF(data) {
//     let xhr = new XMLHttpRequest();

//     // Open
//     xhr.open('GET', '/informe/pdf', true);

//     // Send the proper header information along with the request
//     xhr.setRequestHeader('Content-type', 'application/json');

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == XMLHttpRequest.DONE) {
//             console.log('RESPONSE', xhr.responseText);
//         } else {
//             // xhr.onerror(err => {
//             //     console.log(err);
//             // });
//         }

//     }

//     xhr.send(null);
// }