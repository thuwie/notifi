const { post } = require('axios');
const GitlabPayloadParser = require('./GitlabPayloadParser');

class TelegramRequest {
  botId = process.env.BOT_ID;
  chatId = process.env.CHAT_ID;
  botUrl = `https://api.telegram.org/bot${this.botId}/sendMessage`;

  constructor(body) {
    this.body = body;
  }

  async sendRequest(text = new GitlabPayloadParser(this.body).createPayload()) {
    try {
      await post(this.botUrl, null, {
        params: {
          chat_id: this.chatId,
          text,
        },
      });
      console.log(text);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = TelegramRequest;
