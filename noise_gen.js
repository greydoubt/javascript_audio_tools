const audioContext = new AudioContext();
const bufferSize = audioContext.sampleRate * 2;
const whiteNoiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
const data = whiteNoiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
  data[i] = Math.random() * 2 - 1;
}

// Create an audio source node with the white noise buffer
const whiteNoiseSource = audioContext.createBufferSource();
whiteNoiseSource.buffer = whiteNoiseBuffer;
whiteNoiseSource.loop = true;
whiteNoiseSource.connect(audioContext.destination);

// Start playing the white noise
whiteNoiseSource.start();
