let isRunning = false;

self.onmessage = function(event) {
  if (isRunning) {
    return;
  }
  isRunning = true;

  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  const endDate = activeTask.startDate + secondsRemaining * 1000;
  const now = Date.now();
  let countDownSeconds = Math.ceil((endDate - now) / 1000);
  
  function tickSeconds() {
    const now = Date.now();
    countDownSeconds = Math.floor((endDate - now) / 1000);

    self.postMessage(countDownSeconds)

    setTimeout(tickSeconds, 1000);
  }

  tickSeconds();
}