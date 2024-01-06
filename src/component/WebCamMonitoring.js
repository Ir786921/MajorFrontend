import React, { useEffect } from 'react';
import cv from 'opencv.js';

const  FaceDetectionComponent = () => {
  useEffect(() => {
    const loadFaceDetectionModel = async () => {
      try {
        // Load the face detection model
        const classifier = new cv.CascadeClassifier();
        const modelPath = 'haarcascade_frontalface_default.xml'; // Path to the face detection model file
        await classifier.load(modelPath);

        // Accessing the webcam or video source
        const videoElement = document.createElement('video');
        videoElement.width = 220;
        videoElement.height = 160;
        document.body.appendChild(videoElement);

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
        videoElement.play();

        // Perform face detection on each video frame
        const canvas = document.createElement('canvas');
        canvas.width =  220;
        canvas.height = 160;
        document.body.appendChild(canvas);
        const context = canvas.getContext('2d');

        const detectFaces = async () => {
          try {
            const src = new cv.Mat(videoElement.height, videoElement.width, cv.CV_8UC4);
            context.drawImage(videoElement, 0, 0, videoElement.width, videoElement.height);
            const imageData = context.getImageData(0, 0, videoElement.width, videoElement.height);
            src.data.set(imageData.data);

            const gray = new cv.Mat();
            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
            const faces = new cv.RectVector();
            const faceSize = new cv.Size(0, 0);
            classifier.detectMultiScale(gray, faces, 1.1, 3, 0, faceSize, faceSize);

            // Draw rectangles around detected faces
            for (let i = 0; i < faces.size(); ++i) {
              const face = faces.get(i);
              const point1 = new cv.Point(face.x, face.y);
              const point2 = new cv.Point(face.x + face.width, face.y + face.height);
              cv.rectangle(src, point1, point2, new cv.Scalar(255, 0, 0, 255), 2);
            }

            cv.imshow(canvas, src);
            src.delete();
            gray.delete();

            requestAnimationFrame(detectFaces);
          } catch (err) {
            console.error('Error detecting faces:', err);
          }
        };

        detectFaces();
      } catch (error) {
        console.error('Error loading face detection model:', error);
      }
    };

    loadFaceDetectionModel();
  }, []);

  return (
    <div>
      <h1>Face Detection using OpenCV.js</h1>
    </div>
  );
};

export default  FaceDetectionComponent;

