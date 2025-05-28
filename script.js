// Download text
function downloadText() {
  const text = document.getElementById("textInput").value;
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "text.txt";
  link.click();
}

// Audio recording
let mediaRecorderAudio, audioChunks = [];

document.getElementById("startAudio").onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorderAudio = new MediaRecorder(stream);
  audioChunks = [];
  mediaRecorderAudio.ondataavailable = e => audioChunks.push(e.data);
  mediaRecorderAudio.onstop = () => {
    const blob = new Blob(audioChunks, { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    document.getElementById("audioPlayback").src = url;
    document.getElementById("downloadAudio").href = url;
  };
  mediaRecorderAudio.start();
  document.getElementById("startAudio").disabled = true;
  document.getElementById("stopAudio").disabled = false;
};

document.getElementById("stopAudio").onclick = () => {
  mediaRecorderAudio.stop();
  document.getElementById("startAudio").disabled = false;
  document.getElementById("stopAudio").disabled = true;
};

// Video recording
let mediaRecorderVideo, videoChunks = [], videoStream;

document.getElementById("startVideo").onclick = async () => {
  videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  document.getElementById("videoPlayback").srcObject = videoStream;
  mediaRecorderVideo = new MediaRecorder(videoStream);
  videoChunks = [];
  mediaRecorderVideo.ondataavailable = e => videoChunks.push(e.data);
  mediaRecorderVideo.onstop = () => {
    const blob = new Blob(videoChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    document.getElementById("videoPlayback").src = url;
    document.getElementById("downloadVideo").href = url;
  };
  mediaRecorderVideo.start();
  document.getElementById("startVideo").disabled = true;
  document.getElementById("stopVideo").disabled = false;
};

document.getElementById("stopVideo").onclick = () => {
  mediaRecorderVideo.stop();
  videoStream.getTracks().forEach(track => track.stop());
  document.getElementById("startVideo").disabled = false;
  document.getElementById("stopVideo").disabled = true;
};

// Image upload
document.getElementById("imageInput").onchange = e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("imagePreview").src = reader.result;
    document.getElementById("downloadImage").href = reader.result;
  };
  if (file) reader.readAsDataURL(file);
};
