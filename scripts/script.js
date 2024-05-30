console.info("Welcome to my first AI, if you have any problems let me know.")
console.info("Author: jdluisdev")

const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');

const PREDICTION_VALUE_FOR_DETECT = 0.65
const PREDICTION_VALUE_FOR_ALERT = 0.75;

// Check if webcam access is supported.
function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}

// If webcam supported, add event listener to button for when user
// wants to activate it to call enableCam function which we will 
if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
} else {
    console.warn('getUserMedia() is not supported by your browser');
}

// Enable the live webcam view and start classification.
function enableCam(event) {
    // Only continue if the COCO-SSD has finished loading.
    if (!model) {
        return;
    }

    // Hide the button once clicked.
    event.target.classList.add('removed');

    // getUsermedia parameters to force video but not audio.
    const constraints = {
        video: true
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam);
    });
}

var children = [];

function predictWebcam() {
    // Now let's start classifying a frame in the stream.
    model.detect(video).then(function (predictions) {
        // Remove any highlighting we did previous frame.
        for (let i = 0; i < children.length; i++) {
            liveView.removeChild(children[i]);
        }
        children.splice(0);

        // Now lets loop through predictions and draw them to the live view if
        // they have a high confidence score.
        for (let n = 0; n < predictions.length; n++) {
            // If we are over 66% sure we are sure we classified it right, draw it!
            if (predictions[n].score > PREDICTION_VALUE_FOR_DETECT) {
                const p = document.createElement('p');
                p.innerText = predictions[n].class + ' - with '
                    + Math.round(parseFloat(predictions[n].score) * 100)
                    + '% confidence.';
                p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
                    + (predictions[n].bbox[1] - 10) + 'px; width: '
                    + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

                const highlighter = document.createElement('div');
                highlighter.setAttribute('class', 'highlighter');
                highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
                    + predictions[n].bbox[1] + 'px; width: '
                    + predictions[n].bbox[2] + 'px; height: '
                    + predictions[n].bbox[3] + 'px;';

                liveView.appendChild(highlighter);
                liveView.appendChild(p);
                children.push(highlighter);
                children.push(p);

                console.log(predictions[n])

                //Send Alert when is a person
                predictions[n].score > PREDICTION_VALUE_FOR_ALERT && predictions[n].class === "person" ? alertIntruder() : null;
            }
        }

        // Call this function again to keep predicting when the browser is ready.
        window.requestAnimationFrame(predictWebcam);
    });
}


// Store the resulting model in the global scope of our app.
var model = undefined;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment 
// to get everything needed to run.
cocoSsd.load().then(function (loadedModel) {
    model = loadedModel;
    // Show demo section now model is ready to use.
    demosSection.classList.remove('invisible');
});


// Función para descargar la imagen del intruso
function downloadImage(imageSrc) {
    // Crear un elemento de ancla para descargar la imagen
    const anchor = document.createElement('a');
    anchor.href = imageSrc;
    anchor.download = 'intruder_image.png';
    anchor.click();
}

// Función para crear un contenedor de intruso cliclable
function createClickableIntruderContainer(imageSrc) {
    // Crear el contenedor del intruso
    const intruderContainer = document.createElement("div");
    intruderContainer.className = "intruder-container";

    // Crear la imagen del intruso
    const intruderImage = document.createElement("img");
    intruderImage.src = imageSrc;
    intruderImage.alt = "Captura del intruso";
    intruderImage.width = 80;
    intruderImage.height = 80;

    // Obtener la fecha actual
    const dateCapture = new Date();

    // Formatear la fecha
    const formattedDate = `${dateCapture.getDate().toString().padStart(2, '0')}/${(dateCapture.getMonth() + 1).toString().padStart(2, '0')}/${dateCapture.getFullYear()} ${dateCapture.getHours().toString().padStart(2, '0')}:${dateCapture.getMinutes().toString().padStart(2, '0')}:${dateCapture.getSeconds().toString().padStart(2, '0')}`;

    // Crear un elemento de párrafo para mostrar la fecha formateada
    const intruderDate = document.createElement("p");
    intruderDate.textContent = "Capture Date: " + formattedDate;

    // Añadir evento de clic para descargar la imagen cuando se hace clic en el contenedor
    intruderContainer.addEventListener('click', function () {
        downloadImage(imageSrc);
    });

    // Añadir la imagen y el texto de la fecha al contenedor del intruso
    intruderContainer.appendChild(intruderImage);
    intruderContainer.appendChild(intruderDate);

    // Devolver el contenedor del intruso
    return intruderContainer;
}


function alertIntruder() {
    const showcase = document.getElementById("showcase");

    // Capturar un fotograma del video
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Crear la imagen usando el fotograma capturado
    const intruderImageSrc = canvas.toDataURL("image/png");

    // Crear el contenedor del intruso cliclable
    const intruderContainer = createClickableIntruderContainer(intruderImageSrc);

    // Añadir el contenedor del intruso al showcase
    showcase.appendChild(intruderContainer);

    // Enviar alerta al móvil
}
