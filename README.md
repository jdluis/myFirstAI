# Welcome to My First Machine Learning AI on Website

## Introduction
This project is an exercise inspired by the course "Build a Web Based Smart Camera in JavaScript" offered by Google for Developers and taught by Jason Mayes. Leveraging the knowledge available up to the specified date, I've developed an application that demonstrates the integration of machine learning models into a web environment.

## Project Overview
The main objective of this project is to create an "Intruder" application capable of recognizing a person, capturing photos that can be downloaded, and sending a message to a mobile device via WebSockets. The application utilizes machine learning models to detect and classify objects, specifically focusing on identifying intruders.

## Features
- **Live Webcam Feed**: The application provides a live webcam feed, allowing real-time detection and classification of objects.
- **Intruder Detection**: Using machine learning models, the application can identify and highlight potential intruders in the webcam feed.
- **Photo Capture**: Users have the option to capture photos of detected intruders, which can be downloaded for further analysis.
- **Mobile Notification**: Upon detecting an intruder, the application sends a notification to a mobile device via WebSockets, providing instant alerts. FEAUTURE**

## Technologies Used
- **JavaScript**: The core language for implementing the application logic.
- **TensorFlow.js**: Used for integrating machine learning models into the web application.
- **WebSockets**: Employed for real-time communication between the web application and mobile devices.
- **HTML & CSS**: Used for structuring the user interface and styling elements.

## WebSockets alert
- **To enable this feature, ensure that you have the socket-api running alongside this application.**
- **Currently, the socket-api will notify you if an intruder appears.**

## Installation
To run the application locally, follow these steps:
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies with `npm install`.
4. Start the development server with `npm run dev`.
5. Open your browser and visit `http://localhost:5173`.
6. Allow webcam access when prompted.
7. Experience the "Intruder" application in action!

## Acknowledgments
Special thanks to Jason Mayes for his informative course on building web-based smart cameras. Additionally, gratitude to Google for Developers for providing valuable learning resources and support.

Feel free to reach out with any questions, feedback, or suggestions for improvement. Enjoy exploring the world of machine learning on the web!
