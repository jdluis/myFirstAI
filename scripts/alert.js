import SocketService from '../src/socket/socket.service';

// alert.js
export function downloadImage(imageSrc) {
    const anchor = document.createElement('a');
    anchor.href = imageSrc;
    anchor.download = 'intruder_image.png';
    anchor.click();
}

export function createClickableIntruderContainer(imageSrc) {
    const intruderContainer = document.createElement("div");
    intruderContainer.className = "intruder-container";

    const intruderImage = document.createElement("img");
    intruderImage.src = imageSrc;
    intruderImage.alt = "Captura del intruso";
    intruderImage.width = 80;
    intruderImage.height = 80;

    const dateCapture = new Date();
    const formattedDate = `${dateCapture.getDate().toString().padStart(2, '0')}/${(dateCapture.getMonth() + 1).toString().padStart(2, '0')}/${dateCapture.getFullYear()} ${dateCapture.getHours().toString().padStart(2, '0')}:${dateCapture.getMinutes().toString().padStart(2, '0')}:${dateCapture.getSeconds().toString().padStart(2, '0')}`;
    const intruderDate = document.createElement("p");
    intruderDate.textContent = "Capture Date: " + formattedDate;

    intruderContainer.addEventListener('click', function () {
        downloadImage(imageSrc);
    });

    intruderContainer.appendChild(intruderImage);
    intruderContainer.appendChild(intruderDate);

    return intruderContainer;
}

export function alertIntruder(video) {
  const showcase = document.getElementById("showcase");

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const intruderImageSrc = canvas.toDataURL("image/png");
  const intruderContainer = createClickableIntruderContainer(intruderImageSrc);

  showcase.appendChild(intruderContainer);

  // Init Socket server
  const socketService = new SocketService();

  // Send msg to server
  const messageData = {
    userId: 'web-app',
    message: '¡¡Intruder!!'
  };
  socketService.emitClientEvent(messageData);

  console.log('Socket service initialized');
}
