ws = null

function init() {
  setInterval(() => {
    if (ws && ws.readyState == WebSocket.OPEN) {
      queryInfo();
    }
  }, 1000)
}

function connect() {
  const url = document.getElementById("url").value
  console.log('connecting to ' + url)
  ws = new WebSocket(url)
  ws.onmessage = onMessage;
}

function step(left) {
  const duration = parseFloat(document.getElementById("duration").value)
  console.log('stepping ' + left + ', for ' + duration + ' seconds')
  ws.send(JSON.stringify({type: "step", left, duration}))
}

function inflate() {
  const maxInflateTime = parseFloat(document.getElementById("maxInflateTime2").value)
  const duration = parseFloat(document.getElementById("inflationTime").value)
  console.log('inflating ' + duration)
  const str = JSON.stringify({type: "inflate", duration, maxInflateTime})
  console.log(str)
  ws.send(str)
}

function inflateTo() {
  const maxInflateTime = parseFloat(document.getElementById("maxInflateTime1").value)
  const minPressure = parseFloat(document.getElementById("minPressure").value)
  const targetPressure = parseFloat(document.getElementById("targetPressure").value)
  console.log('inflating')
  const str = JSON.stringify({type: "inflateTo", minPressure, targetPressure, maxInflateTime})
  console.log(str)
  ws.send(str)
}

function deflate() {
  console.log('deflating')
  ws.send(JSON.stringify({type: "deflate"}))
}

function queryInfo()
{
  console.log('getting info')
  ws.send(JSON.stringify({type: "info"}))
}

function onMessage(event)
{
  const data = JSON.parse(event.data)
  console.log('got data: ' + data)
    console.log('setting data')
    const pressure = document.getElementById("pressure")
    pressure.value = data["pressure"]
}
