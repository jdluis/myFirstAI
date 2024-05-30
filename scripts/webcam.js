// webcam.js
import { PREDICTION_VALUE_FOR_DETECT, PREDICTION_VALUE_FOR_ALERT, getUserMediaSupported } from './utils.js';
import { alertIntruder } from './alert.js';

const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const enableWebcamButton = document.getElementById('webcamButton');

export let model;

if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
} else {
    console.warn('getUserMedia() is not supported by your browser');
}

function enableCam(event) {
    if (!model) {
        return;
    }

    event.target.classList.add('removed');

    const constraints = {
        video: true
    };

    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam);
    });
}

var children = [];

function predictWebcam() {
    model.detect(video).then(function (predictions) {
        for (let i = 0; i < children.length; i++) {
            liveView.removeChild(children[i]);
        }
        children.splice(0);

        for (let n = 0; n < predictions.length; n++) {
            if (predictions[n].score > PREDICTION_VALUE_FOR_DETECT) {
                const p = document.createElement('p');
                p.innerText = predictions[n].class + ' - with ' + Math.round(parseFloat(predictions[n].score) * 100) + '% confidence.';
                p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: ' + (predictions[n].bbox[1] - 10) + 'px; width: ' + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

                const highlighter = document.createElement('div');
                highlighter.setAttribute('class', 'highlighter');
                highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: ' + predictions[n].bbox[1] + 'px; width: ' + predictions[n].bbox[2] + 'px; height: ' + predictions[n].bbox[3] + 'px;';

                liveView.appendChild(highlighter);
                liveView.appendChild(p);
                children.push(highlighter);
                children.push(p);

                console.log(predictions[n]);

                if (predictions[n].score > PREDICTION_VALUE_FOR_ALERT && predictions[n].class === "person") {
                    alertIntruder(video);
                }
            }
        }

        window.requestAnimationFrame(predictWebcam);
    });
}

export function loadModel() {
    cocoSsd.load().then(function (loadedModel) {
        model = loadedModel;
        const demosSection = document.getElementById('demos');
        demosSection.classList.remove('invisible');
    });
}
