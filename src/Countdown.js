class Countdown {
  timer = null;
  timestamp = null;

  setDeadline(timestamp) {
    this.timestamp = timestamp;
  }

  startTimer() {
    const now = new Date();
    let night = new Date(new Date().getDate());
    night.setDate(new Date().getDate());
    // night.setDate(new Date().getDate()+1);
    night.setHours(18, 5, 0)
    const ms = night.getTime() - now.getTime();
    console.log(`Now: ${now.getTime()}\nNig: ${night.getTime()}\nMs: ${ms}`)
    setTimeout(() => {
      console.log('time');
    }, ms);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

}

module.exports = Countdown;
