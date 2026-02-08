function uploadLetter() {
  const file = document.getElementById("letterFile").files[0];
  const formData = new FormData();
  formData.append("letter", file);

  fetch("http://localhost:3000/process-letter", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("extractedText").value = data.text;
  });
}

function startRecording() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "te-IN";
  recognition.start();

  recognition.onresult = function (event) {
    const telugu = event.results[0][0].transcript;
    document.getElementById("teluguText").value = telugu;

    fetch("http://localhost:3000/generate-reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ telugu })
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById("finalReply").value = data.reply;
    });
  };
}

function downloadReply() {
  const text = document.getElementById("finalReply").value;
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "OfficialReply.txt";
  a.click();
}
