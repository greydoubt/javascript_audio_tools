let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let audioPreview;

// Get access to the microphone and start recording
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function (stream) {
    // Create a MediaRecorder object to record the audio stream
    mediaRecorder = new MediaRecorder(stream);

    // Add audio data to the audioChunks array whenever available
    mediaRecorder.addEventListener('dataavailable', function (event) {
      audioChunks.push(event.data);
    });

    // Handle the end of the recording
    mediaRecorder.addEventListener('stop', function () {
      // Create a new Blob from the audioChunks array
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

      // Create a URL for the audio Blob
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create an audio element for preview
      audioPreview = document.createElement('audio');
      audioPreview.controls = true;
      audioPreview.src = audioUrl;

      // Append the audio element to the document body for preview
      document.body.appendChild(audioPreview);

      // Cleanup resources
      URL.revokeObjectURL(audioUrl);
      audioChunks = [];
    });

    // Start recording when the mediaRecorder's start method is called
    function startRecording() {
      if (!isRecording) {
        mediaRecorder.start();
        isRecording = true;

        // Update the recording indicator
       
    const recordingIndicator = document.getElementById('recording-indicator');
    recordingIndicator.classList.add('recording');
  }
}

// Stop recording when the mediaRecorder's stop method is called
function stopRecording() {
  if (isRecording) {
    mediaRecorder.stop();
    isRecording = false;

    // Update the recording indicator
    const recordingIndicator = document.getElementById('recording-indicator');
    recordingIndicator.classList.remove('recording');
  }
}

// Remove the audio preview element from the page
function stopPreview() {
  if (audioPreview) {
    audioPreview.remove();
    audioPreview = null;
  }
}

// Event listeners for recording controls
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');

    startButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);
  })
  .catch(function (error) {
    console.error('Error accessing microphone:', error);
  });
