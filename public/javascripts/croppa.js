const btn = document.getElementById('upload');
const fileInput = document.getElementById('cropImage');


fileInput.onchange = function (event) {
    event.preventDefault();
    window.fileToBase64(fileInput.files[0], (imgData) => {
        window.setCropper(imgData);
    });
};

btn.addEventListener('click', () => {
    window.cropper.getCroppedCanvas().toBlob((blob) => {
        window.fileToBase64(blob, (imgData) => {
            const data = {
                file: imgData
            }
            window.sendFile(data);
        });
    });
}, false);

function setCropper(imageSrc) {
    let myImage = new Image();
    myImage.setAttribute('src', imageSrc);
    document.body.appendChild(myImage);

    myImage.onload = function () {
        window.cropper = new Cropper(myImage, {
            initialAspectRatio: 3 / 4,
            aspectRatio: 3 / 4,
            crop(event) {
                console.log(event.detail.x);
                console.log(event.detail.y);
                console.log(event.detail.width);
                console.log(event.detail.height);
                console.log(event.detail.rotate);
                console.log(event.detail.scaleX);
                console.log(event.detail.scaleY);
            },
        });
    }
}


function fileToBase64(blob, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    return reader.onloadend = function () {
        base64data = reader.result;
        cb(base64data);
    }
}

function sendFile(data) {
    let xhr = new XMLHttpRequest();

    // Open
    xhr.open('POST', '/upload', false);

    // Send the proper header information along with the request
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log('RESPONSE', xhr.responseText);
        }
    }

    // console.log('formData', formData);
    xhr.send(JSON.stringify(data));
}

// setCropper();