class GitlabPayloadParser {
  fields = {
    kind: 'object_kind',
    attributes: 'object_attributes',
  };

  events = {
    mr: 'merge_request',
    pipeline: 'pipeline',
  };

  message = 'Empty message';

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
      this.message = this.createMergeRequestMessage(this.body);
    }

    if (this.body[this.fields.kind] === this.events.pipeline) {
      this.message = this.createPipelineMessage(this.body);
    }

    return this.message;
  }
}

module.exports = GitlabPayloadParser;
