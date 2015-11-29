video = document.getElementById("video");
bufferCanvas = document.getElementById("canvas1");
buffer = canvas1.getContext("2d");
displayCanvas = document.getElementById("canvas2");
display = canvas2.getContext("2d");
effectFunction = psychedelic;

window.onload = function() {  
  video.addEventListener("play", function() { 
    processFrame();
  }, false);
}

function processFrame() {
  if(video.paused || video.ended) {
    return;
  }
  
  buffer.drawImage(video, 0, 0, bufferCanvas.width, displayCanvas.height);
  var frame = buffer.getImageData(0, 0, bufferCanvas.width, displayCanvas.height);
  var length = frame.data.length / 4;
  
  for (var i = 0; i < length; i++) {
    var r = frame.data[i * 4 + 0];
    var g = frame.data[i * 4 + 0];
    var b = frame.data[i * 4 + 0];
    
    if(effectFunction) {
      effectFunction(i, r, g, b, frame.data);
    }
  }
  display.putImageData(frame, 0 ,0);
    
  setTimeout(processFrame, 0);
}

function psychedelic(pos, r, g, b, data) {
  var offset = pos * 4;
  data[offset] = Math.round(Math.random() * 255 + (r / 2));
  data[offset+1] = Math.round(Math.random() * 255 + (g / 2));
  data[offset+2] = Math.round(Math.random() * 255 + (b / 2));
}