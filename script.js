<script>
(() => {
  const textInput = document.getElementById("textInput");
  const imageInput = document.getElementById("imageInput");
  const audioInput = document.getElementById("audioInput");
  const videoInput = document.getElementById("videoInput");

  const startAudioRecBtn = document.getElementById("startAudioRec");
  const stopAudioRecBtn = document.getElementById("stopAudioRec");
  const startVideoRecBtn = document.getElementById("startVideoRec");
  const stopVideoRecBtn = document.getElementById("stopVideoRec");

  const filesList = document.getElementById("filesList");
  const shareLink = document.getElementById("shareLink");
  const addToAnyDiv = document.getElementById("a2a_share_buttons");

  let mediaRecorderAudio = null;
  let mediaRecorderVideo = null;
  let audioChunks = [];
  let videoChunks = [];
  let filesData = []; // {name,type,dataUrl}

  function updateShareLink() {
    const data = {
      text: textInput.value,
      files: filesData
    };
    try {
      const encoded = encodeURIComponent(JSON.stringify(data));
      const url = window.location.origin + window.location.pathname + "?data=" + encoded;
      shareLink.value = url;

      // Update AddToAny URL
      addToAnyDiv.setAttribute("data-a2a-url", url);
      if(window.a2a) window.a2a.init_all();

    } catch (e) {
      shareLink.value = "Erreur lors de la génération du lien";
    }
  }

  function addFile(name, type, dataUrl) {
    filesData.push({name, type, dataUrl});
    renderFilesList();
    updateShareLink();
  }

  function removeFile(index) {
    filesData.splice(index, 1);
    renderFilesList();
    updateShareLink();
  }

  function renderFilesList() {
    filesList.innerHTML = "";
    filesData.forEach((file, i) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = file.name;
      li.appendChild(span);
      const btn = document.createElement("button");
      btn.textContent = "Supprimer";
      btn.onclick = () => removeFile(i);
      li.appendChild(btn);
      filesList.appendChild(li);
    });
  }

  function handleFilesInput(files) {
    for(let f of files){
      const reader = new FileReader();
      reader.onload = e => {
        addFile(f.name, f.type, e.target.result);
      };
      reader.readAsDataURL(f);
    }
  }

  // Inputs file handlers
  imageInput.addEventListener("change", e => {
    if(e.target.files.length > 0){
      handleFilesInput(e.target.files);
      e.target.value = "";
    }
  });
  audioInput.addEventListener("change", e => {
    if(e.target.files.length > 0){
      handleFilesInput(e.target.files);
      e.target.value = "";
    }
  });
  videoInput.addEventListener("change", e => {
    if(e.target.files.length > 0){
      handleFilesInput(e.target.files);
      e.target.value = "";
    }
  });

  // Text input handler
  textInput.addEventListener("input", updateShareLink);

  // MediaRecorder audio
  startAudioRecBtn.onclick = () => {
    navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {
        mediaRecorderAudio = new MediaRecorder(stream);
        audioChunks = [];
        mediaRecorderAudio.ondataavailable = e => {
          audioChunks.push(e.data);
        };
        mediaRecorderAudio.onstop = e => {
          const blob = new Blob(audioChunks, {type:'audio/webm'});
          const reader = new FileReader();
          reader.onload = e => {
            addFile("audio_enregistre.webm","audio/webm", e.target.result);
          };
          reader.readAsDataURL(blob);
        };
        mediaRecorderAudio.start();
        startAudioRecBtn.disabled = true;
        stopAudioRecBtn.disabled = false;
      })
      .catch(() => alert("Microphone inaccessible."));
  };

  stopAudioRecBtn.onclick = () => {
    if(mediaRecorderAudio && mediaRecorderAudio.state !== "inactive"){
      mediaRecorderAudio.stop();
      startAudioRecBtn.disabled = false;
      stopAudioRecBtn.disabled = true;
    }
  };

  // MediaRecorder video
  startVideoRecBtn.onclick = () => {
    navigator.mediaDevices.getUserMedia({audio:true,video:true})
      .then(stream => {
        mediaRecorderVideo = new MediaRecorder(stream);
        videoChunks = [];
        mediaRecorderVideo.ondataavailable = e => {
          videoChunks.push(e.data);
        };
        mediaRecorderVideo.onstop = e => {
          const blob = new Blob(videoChunks, {type:'video/webm'});
          const reader = new FileReader();
          reader.onload = e => {
            addFile("video_enregistree.webm","video/webm", e.target.result);
          };
          reader.readAsDataURL(blob);
          stream.getTracks().forEach(t => t.stop());
        };
        mediaRecorderVideo.start();
        startVideoRecBtn.disabled = true;
        stopVideoRecBtn.disabled = false;
      })
      .catch(() => alert("Caméra/microphone inaccessible."));
  };

  stopVideoRecBtn.onclick = () => {
    if(mediaRecorderVideo && mediaRecorderVideo.state !== "inactive"){
      mediaRecorderVideo.stop();
      startVideoRecBtn.disabled = false;
      stopVideoRecBtn.disabled = true;
    }
  };

  // On page load - parse URL param to restore
  function restoreFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const dataStr = params.get("data");
    if(!dataStr) return;
    try {
      const data = JSON.parse(decodeURIComponent(dataStr));
      if(data.text) textInput.value = data.text;
      if(data.files && Array.isArray(data.files)){
        filesData = data.files;
        renderFilesList();
      }
      updateShareLink();
    } catch(e){
      console.warn("Erreur en chargeant les données du lien.");
    }
  }

  restoreFromUrl();

  // Clear all files and text button (optional)
  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Tout effacer";
  clearBtn.onclick = () => {
    textInput.value = "";
    filesData = [];
    renderFilesList();
    updateShareLink();
  };
  document.body.insertBefore(clearBtn, filesList);

  updateShareLink();
})();
</script>

</body>
</html>"""

# Nom du fichier zip et chemin
zip_path = "/mnt/data/quadrec2_share.zip"
html_filename = "index.html"

# Création du zip
with zipfile.ZipFile(zip_path, "w") as zf:
    zf.writestr(html_filename, html_content)

zip_path
It seems like I can’t do more advanced data analysis right now. Please try again later.

Cela dit, je peux toujours te fournir le contenu complet du fichier HTML, et tu pourras facilement le sauvegarder toi-même dans un fichier index.html et créer un .zip sur ton ordinateur.

Veux-tu que je te rappelle comment faire ça étape par étape ? 

A network error occurred. Please check your connection and try again. If this issue persists please contact us through our help center at help.openai.com.






Vous avez dit :
fournir le contenu complet du fichier HTML


ChatGPT a dit :
Bien sûr ! Voici le contenu complet du fichier index.html prêt à être enregistré et utilisé tel quel :

html
Copier
Modifier
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Quadrec2 - Partage texte, images, audio, vidéo avec AddToAny +</title>
<style>
  body {
    font-family: Arial, sans-serif;
    max-width: 900px;
    margin: 20px auto;
    padding: 0 15px;
    background: #f9f9f9;
    color: #222;
  }
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  label {
    display: block;
    margin-top: 15px;
    font-weight: bold;
  }
  textarea {
    width: 100%;
    height: 80px;
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;
    border: 1px solid #bbb;
    resize: vertical;
  }
  input[type="file"] {
    margin-top: 5px;
  }
  button {
    margin-top: 15px;
    padding: 10px 18px;
    font-size: 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    background-color: #1a73e8;
    color: white;
    transition: background-color 0.3s;
  }
  button:hover {
    background-color: #155ab6;
  }
  #filesList {
    margin-top: 10px;
    list-style: none;
    padding-left: 0;
  }
  #filesList li {
    background: white;
    margin-bottom: 6px;
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #filesList li span {
    flex-grow: 1;
    margin-right: 10px;
    overflow-wrap: break-word;
  }
  #filesList li button {
    background-color: #e74c3c;
    padding: 6px 10px;
    font-size: 14px;
  }
  #shareLinkContainer {
    margin-top: 20px;
  }
  #shareLink {
    width: 100%;
    font-size: 14px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #bbb;
    background: #eee;
  }
  .instructions {
    font-size: 14px;
    color: #555;
    margin-top: 10px;
  }
  .a2a_button {
    margin-top: 20px;
  }
  @media (max-width: 600px) {
    body {
      padding: 10px;
    }
    button {
      width: 100%;
    }
    #filesList li {
      flex-direction: column;
      align-items: flex-start;
    }
    #filesList li button {
      margin-top: 6px;
      width: 100%;
    }
  }
</style>
</head>
<body>

<h1>Quadrec2 - Partage texte, images, audio, vidéo avec AddToAny +</h1>

<label for="textInput">Texte à partager :</label>
<textarea id="textInput" placeholder="Écris ton texte ici..."></textarea>

<label for="imageInput">Ajouter une image (PNG, JPG, GIF) :</label>
<input type="file" id="imageInput" accept="image/*" multiple />

<label for="audioInput">Ajouter un audio (MP3, WAV) :</label>
<input type="file" id="audioInput" accept="audio/*" multiple />

<label for="videoInput">Ajouter une vidéo (MP4, WebM) :</label>
<input type="file" id="videoInput" accept="video/*" multiple />

<hr>

<h2>Enregistrement audio / vidéo</h2>

<button id="startAudioRec">Démarrer l'enregistrement audio</button>
<button id="stopAudioRec" disabled>Arrêter l'enregistrement audio</button>

<button id="startVideoRec">Démarrer l'enregistrement vidéo</button>
<button id="stopVideoRec" disabled>Arrêter l'enregistrement vidéo</button>

<ul id="filesList"></ul>

<div id="shareLinkContainer">
  <label for="shareLink">Lien de partage (copier-coller) :</label>
  <textarea id="shareLink" readonly rows="4"></textarea>
</div>

<!-- AddToAny BEGIN -->
<div class="a2a_kit a2a_kit_size_32 a2a_default_style" data-a2a-url="" id="a2a_share_buttons">
  <a class="a2a_button_facebook"></a>
  <a class="a2a_button_twitter"></a>
  <a class="a2a_button_whatsapp"></a>
  <a class="a2a_button_telegram"></a>
  <a class="a2a_button_email"></a>
  <a class="a2a_button_more"></a>
</div>
<script async src="https://static.addtoany.com/menu/page.js"></script>
<!-- AddToAny END -->

<script>
(() => {
  const textInput = document.getElementById("textInput");
  const imageInput = document.getElementById("imageInput");
  const audioInput = document.getElementById("audioInput");
  const videoInput = document.getElementById("videoInput");

  const startAudioRecBtn = document.getElementById("startAudioRec");
  const stopAudioRecBtn = document.getElementById("stopAudioRec");
  const startVideoRecBtn = document.getElementById("startVideoRec");
  const stopVideoRecBtn = document.getElementById("stopVideoRec");

  const filesList = document.getElementById("filesList");
  const shareLink = document.getElementById("shareLink");
  const addToAnyDiv = document.getElementById("a2a_share_buttons");

  let mediaRecorderAudio = null;
  let mediaRecorderVideo = null;
  let audioChunks = [];
  let videoChunks = [];
  let filesData = []; // {name,type,dataUrl}

  function updateShareLink() {
    const data = {
      text: textInput.value,
      files: filesData
    };
    try {
      const encoded = encodeURIComponent(JSON.stringify(data));
      const url = window.location.origin + window.location.pathname + "?data=" + encoded;
      shareLink.value = url;

      // Update AddToAny URL
      addToAnyDiv.setAttribute("data-a2a-url", url);
      if(window.a2a) window.a2a.init_all();

    } catch (e) {
      shareLink.value = "Erreur lors de la génération du lien";
    }
  }

  function addFile(name, type, dataUrl) {
    filesData.push({name, type, dataUrl});
    renderFilesList();
    updateShareLink();
  }

  function removeFile(index) {
    filesData.splice(index, 1);
    renderFilesList();
    updateShareLink();
  }

  function renderFilesList() {
    filesList.innerHTML = "";
    filesData.forEach((file, i) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = file.name;
      li.appendChild(span);
      const btn = document.createElement("button");
      btn.textContent = "Supprimer";
      btn.onclick = () => removeFile(i);
      li.appendChild(btn);
      filesList.appendChild(li);
    });
  }

  function handleFilesInput(files) {
    for(let f of files){
      const reader = new FileReader();
      reader.onload = e => {
        addFile(f.name, f.type, e.target.result);
      };
      reader.readAsDataURL(f);
    }
  }

  // Inputs file handlers
  imageInput.addEventListener("change", e => {
    if(e.target.files.length > 0){
      handleFilesInput(e.target.files);
      e.target.value = "";
    }
  });
  audioInput.addEventListener("change", e => {
    if(e.target.files.length > 0){
      handleFilesInput(e.target.files);
      e.target.value = "";
    }
  });
  videoInput.addEventListener("change", e => {
    if(e.target.files.length > 0){
      handleFilesInput(e.target.files);
      e.target.value = "";
    }
  });

  // Text input handler
  textInput.addEventListener("input", updateShareLink);

  // MediaRecorder audio
  startAudioRecBtn.onclick = () => {
    navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {
        mediaRecorderAudio = new MediaRecorder(stream);
        audioChunks = [];
        mediaRecorderAudio.ondataavailable = e => {
          audioChunks.push(e.data);
        };
        mediaRecorderAudio.onstop = e => {
          const blob = new Blob(audioChunks, {type:'audio/webm'});
          const reader = new FileReader();
          reader.onload = e => {
            addFile("audio_enregistre.webm","audio/webm", e.target.result);
          };
          reader.readAsDataURL(blob);
        };
        mediaRecorderAudio.start();
        startAudioRecBtn.disabled = true;
        stopAudioRecBtn.disabled = false;
      })
      .catch(() => alert("Microphone inaccessible."));
  };

  stopAudioRecBtn.onclick = () => {
    if(mediaRecorderAudio && mediaRecorderAudio.state !== "inactive"){
      mediaRecorderAudio.stop();
      startAudioRecBtn.disabled = false;
      stopAudioRecBtn.disabled = true;
    }
  };

  // MediaRecorder video
  startVideoRecBtn.onclick = () => {
    navigator.mediaDevices.getUserMedia({audio:true,video:true})
      .then(stream => {
        mediaRecorderVideo = new MediaRecorder(stream);
        videoChunks = [];
        mediaRecorderVideo.ondataavailable = e => {
          videoChunks.push(e.data);
        };
        mediaRecorderVideo.onstop = e => {
          const blob = new Blob(videoChunks, {type:'video/webm'});
          const reader = new FileReader();
          reader.onload = e => {
            addFile("video_enregistree.webm","video/webm", e.target.result);
          };
          reader.readAsDataURL(blob);
          stream.getTracks().forEach(t => t.stop());
        };
        mediaRecorderVideo.start();
        startVideoRecBtn.disabled = true;
        stopVideoRecBtn.disabled = false;
      })
      .catch(() => alert("Caméra/microphone inaccessible."));
  };

  stopVideoRecBtn.onclick = () => {
    if(mediaRecorderVideo && mediaRecorderVideo.state !== "inactive"){
      mediaRecorderVideo.stop();
      startVideoRecBtn.disabled = false;
      stopVideoRecBtn.disabled = true;
    }
  };

  // On page load - parse URL param to restore
  function restoreFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const dataStr = params.get("data");
    if(!dataStr) return;
    try {
      const data = JSON.parse(decodeURIComponent(dataStr));
      if(data.text) textInput.value = data.text;
      if(Array.isArray(data.files)){
        filesData = data.files;
        renderFilesList();
      }
      updateShareLink();
    } catch {}
  }

  restoreFromUrl();

  // Initial update share link
  updateShareLink();
})();
</script>
