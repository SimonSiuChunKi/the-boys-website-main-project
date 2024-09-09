// Camera access script
const startCameraButton = document.getElementById('start-camera');
const stopCameraButton = document.getElementById('stop-camera');
const videoElement = document.getElementById('camera-stream');
let cameraStream = null;
let session = null;  // Store the ONNX session globally

// Initialize sequence and keypoints buffer
let sequence = [];

// Load the ONNX model
async function loadONNXModel() {
    session = await ort.InferenceSession.create('../assets/models/model.onnx');
    console.log("ONNX Model loaded successfully!");
}

// Mediapipe Holistic initialization
const holistic = new Holistic({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
});

holistic.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

holistic.onResults(onResults); // Call onResults when keypoints are detected

// Start the camera and feed frames to Mediapipe
const camera = new Camera(videoElement, {
    onFrame: async () => {
        await holistic.send({ image: videoElement });
    },
    width: 640,
    height: 480
});

// Determine the current chapter from the URL
function getCurrentChapterFromURL() {
    const path = window.location.pathname;  // Get the current URL path
    const page = path.split("/").pop();  // Get the last part of the path, i.e., the HTML file name
    
    if (page === 'chapter1.html') {
        return 1;
    } else if (page === 'chapter2.html') {
        return 2;
    } else if (page === 'chapter3.html') {
        return 3;
    } else if (page === 'chapter4.html') {
        return 4;
    } else if (page === 'chapter5.html') {
        return 5;
    } else if (page === 'chapter6.html') {
        return 6;
    } else {
        return null;  // If no match, return null
    }
}

// Process Mediapipe results and extract keypoints
function onResults(results) {
    const keypoints = [];

    // Extract pose keypoints including visibility
    if (results.poseLandmarks) {
        results.poseLandmarks.forEach(landmark => keypoints.push(landmark.x, landmark.y, landmark.z, landmark.visibility));
    } else {
        // If no pose landmarks, add 132 zeros (33 keypoints * 4 values)
        for (let i = 0; i < 33 * 4; i++) {
            keypoints.push(0);
        }
    }

    // Extract face keypoints (x, y, z)
    if (results.faceLandmarks) {
        results.faceLandmarks.forEach(landmark => keypoints.push(landmark.x, landmark.y, landmark.z));
    } else {
        // If no face landmarks, add 1404 zeros (468 keypoints * 3 values)
        for (let i = 0; i < 468 * 3; i++) {
            keypoints.push(0);
        }
    }

    // Extract left hand keypoints (x, y, z)
    if (results.leftHandLandmarks) {
        results.leftHandLandmarks.forEach(landmark => keypoints.push(landmark.x, landmark.y, landmark.z));
    } else {
        // If no left hand landmarks, add 63 zeros (21 keypoints * 3 values)
        for (let i = 0; i < 21 * 3; i++) {
            keypoints.push(0);
        }
    }

    // Extract right hand keypoints (x, y, z)
    if (results.rightHandLandmarks) {
        results.rightHandLandmarks.forEach(landmark => keypoints.push(landmark.x, landmark.y, landmark.z));
    } else {
        // If no right hand landmarks, add 63 zeros (21 keypoints * 3 values)
        for (let i = 0; i < 21 * 3; i++) {
            keypoints.push(0);
        }
    }

    // Now keypoints should have 1662 values
    console.log("Keypoints length:", keypoints.length);  // Should log 1662

    // Append keypoints to sequence
    sequence.push(keypoints);
    if (sequence.length > 30) {
        sequence.shift();  // Keep only the last 30 frames
    }

    // When we have 30 frames of keypoints, run the prediction
    if (sequence.length === 30) {
        console.log("Running prediction with 30 frames of keypoints...");
        runPrediction();
    }
}

// Run predictions using ONNX model with 30 frames of keypoints
async function runPrediction() {
    if (!session) {
        console.error("ONNX Model not loaded yet");
        return;
    }

    // Flatten the sequence array and convert it to Float32Array for ONNX model input
    const inputTensor = new ort.Tensor('float32', new Float32Array(sequence.flat()), [1, 30, sequence[0].length]);

    console.log("Input tensor for ONNX model:", inputTensor);  // Log input tensor

    // Inspect the input and output names of the ONNX model
    console.log("Model input names:", session.inputNames);  // Log the input names
    console.log("Model output names:", session.outputNames);  // Log the output names

    try {
        // Use the correct input name from session.inputNames[0]
        const results = await session.run({ [session.inputNames[0]]: inputTensor });  // Run the ONNX model with correct input name
        console.log("ONNX model prediction results:", results);  // Log the prediction results

        const predictedLetter = interpretONNXOutput(results);
        if (predictedLetter) {
            displayPrediction(predictedLetter);
        } else {
            console.log('No predicted letter returned');
        }
    } catch (error) {
        console.error("Error running ONNX model:", error);
    }
}

// Interpret ONNX model output dynamically based on the chapter
function interpretONNXOutput(results) {
    console.log("Model output:", results);  // Log the entire output

    // First check the structure of results.output_0
    const outputTensor = results['output_0'];

    if (!outputTensor) {
        console.error("Error: output_0 not found in model output");
        return;
    }

    // Log the structure of the output tensor
    console.log("Output tensor:", outputTensor);

    // Get the actual data of the output tensor
    const outputData = outputTensor.data;

    if (!outputData) {
        console.error("Error: data property not found in output tensor");
        return;
    }

    console.log("Model output data:", outputData);

    // Get the current chapter
    const currentChapter = getCurrentChapterFromURL();
    let letters;

    // Dynamically adjust letters array based on the chapter
    switch (currentChapter) {
        case 1:
            letters = ['A', 'B', 'C', 'D'];
            break;
        case 2:
            letters = ['E', 'F', 'G', 'H'];
            break;
        case 3:
            letters = ['I', 'J', 'K', 'L', 'M', 'N'];
            break;
        case 4:
            letters = ['O', 'P', 'Q', 'R', 'S', 'T'];
            break;
        case 5:
            letters = ['U', 'V', 'W', 'X', 'Y', 'Z'];
            break;
        case 6:
            letters = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;    
        default:
            console.error('Error: Unable to determine current chapter');
            return;
    }

    // Assuming outputData contains the prediction probabilities for each class
    const maxIndex = outputData.indexOf(Math.max(...outputData));  // Get index of highest probability

    console.log('Predicted letter index:', maxIndex, 'Predicted letter:', letters[maxIndex]);  // Log predicted letter
    return letters[maxIndex];
}

// Display the prediction on the page
function displayPrediction(letter) {
    console.log('Displaying predicted letter:', letter);  // Log the letter being displayed
    document.getElementById('predicted-letter').innerText = `Predicted Letter: ${letter}`;
}

// Initialize camera and ONNX model
async function startCameraAndRunModel() {
    await loadONNXModel();  // Load ONNX model before starting the camera

    startCameraButton.addEventListener('click', async () => {
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = cameraStream;

            console.log("Camera started");  // Log when camera starts
            camera.start();  // Start Mediapipe camera

        } catch (err) {
            console.error('Error accessing the camera: ', err);
        }
    });

    stopCameraButton.addEventListener('click', () => {
        if (cameraStream) {
            const tracks = cameraStream.getTracks();
            tracks.forEach(track => track.stop());
            videoElement.srcObject = null;
        }
        console.log("Camera stopped");  // Log when camera stops
        camera.stop();  // Stop Mediapipe camera
    });
}

// Call this function when the page loads
startCameraAndRunModel();

// Function to change videos based on letter clicked
function changeVideo(letter) {
    const videoSource = document.getElementById('sign-video');
    
    switch (letter) {
        case 'Aa':
            videoSource.src = '../assets/videos/A.mp4';
            break;
        case 'Bb':
            videoSource.src = '../assets/videos/B.mp4';
            break;
        case 'Cc':
            videoSource.src = '../assets/videos/C.mp4';
            break;
        case 'Dd':
            videoSource.src = '../assets/videos/D.mp4';
            break;
        case 'Ee':
            videoSource.src = '../assets/videos/E.mp4';
            break;
        case 'Ff':
            videoSource.src = '../assets/videos/F.mp4';
            break;
        case 'Gg':
            videoSource.src = '../assets/videos/G.mp4';
            break;
        case 'Hh':
            videoSource.src = '../assets/videos/H.mp4';
            break;
        case 'Ii':
            videoSource.src = '../assets/videos/I.mp4';
            break;
        case 'Jj':
            videoSource.src = '../assets/videos/J.mp4';
            break;
        case 'Kk':
            videoSource.src = '../assets/videos/K.mp4';
            break;
        case 'Ll':
            videoSource.src = '../assets/videos/L.mp4';
            break;
        case 'Mm':
            videoSource.src = '../assets/videos/M.mp4';
            break;
        case 'Nn':
            videoSource.src = '../assets/videos/N.mp4';
            break;
        case 'Oo':
            videoSource.src = '../assets/videos/O.mp4';
            break;
        case 'Pp':
            videoSource.src = '../assets/videos/P.mp4';
            break;
        case 'Qq':
            videoSource.src = '../assets/videos/Q.mp4';
            break;
        case 'Rr':
            videoSource.src = '../assets/videos/R.mp4';
            break;
        case 'Ss':
            videoSource.src = '../assets/videos/S.mp4';
            break;
        case 'Tt':
            videoSource.src = '../assets/videos/T.mp4';
            break;
        case 'Uu':
            videoSource.src = '../assets/videos/U.mp4';
            break;
        case 'Vv':
            videoSource.src = '../assets/videos/V.mp4';
            break;
        case 'Ww':
            videoSource.src = '../assets/videos/W.mp4';
            break;
        case 'Xx':
            videoSource.src = '../assets/videos/X.mp4';
            break;
        case 'Yy':
            videoSource.src = '../assets/videos/Y.mp4';
            break;
        case 'Zz':
            videoSource.src = '../assets/videos/Z.mp4';
            break;
        case '1':
            videoSource.src = '../assets/videos/1.mp4';
            break;
        case '2':
            videoSource.src = '../assets/videos/2.mp4';
            break;
        case '3':
            videoSource.src = '../assets/videos/3.mp4';
            break;
        case '4':
            videoSource.src = '../assets/videos/4.mp4';
            break;
        case '5':
            videoSource.src = '../assets/videos/5.mp4';
            break;
        case '6':
            videoSource.src = '../assets/videos/6.mp4';
            break;
        case '7':
            videoSource.src = '../assets/videos/7.mp4';
            break;
        case '8':
            videoSource.src = '../assets/videos/8.mp4';
            break;
        case '9':
            videoSource.src = '../assets/videos/9.mp4';
            break;
        default:
            videoSource.src = '../assets/videos/A.mp4';  // Default to Aa video if no match
    }

    videoSource.load();  // Reload the video so it updates on the webpage
}
