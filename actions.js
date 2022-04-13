ws = null

function init() {
  
}

function connect() {
  const url = document.getElementById("url").value
  console.log('connecting to ' + url)
  ws = new WebSocket(url)
}

function step(left) {
  const duration = document.getElementById("duration").value
  console.log('stepping ' + left + ', for ' + duration + ' seconds')
  ws.send(JSON.stringify({type: "step", left, duration}))
}

function inflate() {
  console.log('inflating')
  ws.send(JSON.stringify({type: "inflate"}))
}

function deflate() {
  console.log('deflating')
  ws.send(JSON.stringify({type: "deflate"}))
}
