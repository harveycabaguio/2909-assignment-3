var turns = 0;
var it;

window.onload = function () {
  // 8 players
  var player = [8];

  // put to work
  var p = document.createElement("p");
  p.innerHTML = Date() + " starting workers...";
  document.body.appendChild(p);
  for (var i = 0; i < 8; i++) {
    player[i] = new Worker("worker.js");
    // listen to players
    player[i].addEventListener("message", function(event) {
      // tell user
      var message = Date() + " player " + it + " tagged player " + event.data;
      var p = document.createElement("p");
      p.innerHTML = message;
      document.body.appendChild(p);
      // new it, another person tagged so a turn has passed
      it = event.data;
      turns++;
      // while game isn't done, tell next it to tag another player
      if (turns >= 10) {
        // tell user
        var message = Date() + " Done playing";
        var p = document.createElement("p");
        p.innerHTML = message;
        document.body.appendChild(p);
      } else {
        player[event.data].postMessage(event.data);
      }
    });
  }
  
  // game master sets first it
  it = Math.round(Math.random() * 7);
  player[it].postMessage(it);
  // tell user
  var message = Date() + " game master says player " + it + " is it";
  var p = document.createElement("p");
  p.innerHTML = message;
  document.body.appendChild(p);
  turns++;
};