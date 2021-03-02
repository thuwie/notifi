const { post } = require('axios');

class TelegramRequest {
  fields = {
    kind: 'object_kind',
    attributes: 'object_attributes',
  };

  events = {
    mr: 'merge_request',
    pipeline: 'pipeline',
  };

  message = 'Empty message';
  botId = process.env.BOT_ID;
  chatId = process.env.CHAT_ID;
  botUrl = `https://api.telegram.org/bot${this.botId}/sendMessage`;

  constructor(body) {
    this.body = body;
  }

  createMergeRequestMessage(body) {
    let message = 'Merge Request\n';
    message += `Author: ${body.user.name}\n`;
    message += `Project: ${body.project.name}\n`;
    message += `Title: ${body[this.fields.attributes].title}\n`;
    message += `URL: ${body[this.fields.attributes].url}\n`;
    message += `State: ${body[this.fields.attributes].state}\n`;
    return message;
  }

  createPipelineMessage(body) {

  }

  createPayload() {
    if (this.body[this.fields.kind] === this.events.mr) {
      if (this.body[this.fields.attributes].state !== 'opened' || this.body[this.fields.attributes].action !== 'open') {
        throw new Error('Le Workaround to skip any but opened');
      }
      this.message = this.createMergeRequestMessage(this.body);
    }

    if (this.body[this.fields.kind] === this.events.pipeline) {
      this.message = this.createPipelineMessage(this.body);
    }
  }

  async sendRequest() {
    try {
      this.createPayload();
      await post(this.botUrl, null, {
        params: {
          chat_id: this.chatId,
          text: this.message,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = TelegramRequest;
