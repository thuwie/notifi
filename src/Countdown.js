const Cron = require('cron').CronJob;
const TelegramRequest = require('./TelegramRequest');

class Countdown {
  timestamp = null;
  oneDay = 24 * 60 * 60 * 1000;

  setDeadline(timestamp) {
    this.timestamp = timestamp;
  }

  startTimer() {
    const job = new Cron('0 0 10 * * 1-5', () => {this.sendPayload();}, null,
      true);
  }

  sendPayload() {
    let text = '';
    const currentTimestamp = Date.now() / 1000 | 0;
    // if timestamp (future) - currentTimestamp is bigger than 0, then it is not that day
    if ((this.timestamp - currentTimestamp) > 0) {
      const days = this.getDaysLeft(currentTimestamp, this.timestamp);
      text = `${days} days left 👻 \xF0\x9F\x91\xBB`;
    } else {
      text = 'It is the day 💀 \xF0\x9F\x92\x80';
    }
    new TelegramRequest().sendRequest(text).
      then(() => console.log('Countdown sent')).
      catch((err) => console.log(`Countdown message failed: ${err.message}`));
  }

  getDaysLeft(now, future) {
    const nowDate = new Date(now * 1000);
    const futureDate = new Date(future * 1000);

    const daysLeft = futureDate - nowDate;
    return (daysLeft / this.oneDay | 0);
  }
}

module.exports = Countdown;
