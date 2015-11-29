var you;

function who() {
  // find someone who isn't you
  do {
    var result = Math.round(Math.random() * 7);
  } while (result == you);
  return result;
}

function tagEm() {
  // tag them
  var tagged = who();
  postMessage(tagged);
}

function findEm(event) {
  you = event.data;
  // "find" another player
  var time = Math.round(Math.random() * 2000);
  setTimeout(tagEm, time);
}

onmessage = findEm;