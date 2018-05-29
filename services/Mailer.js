const sendgrid = require('sendgrid');

const helper = sendgrid.mail;
const keys = require('../config/keys');
// Mailer will inherit a lot of configuration(functions) from helper.Mail and add to it
// each method here is either defined by us or inherited from helper.Mail class
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no_reply@egat.com');
    this.subject = subject;
    this.recipients = this.formatAddresses(recipients);
    this.body = new helper.Content('text/html', content);
    // addContent is extended from Mail class
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }
  // extract emails from recipients subcollection
  formatAddresses(recipients) {
    return recipients.map(({ email }) => new helper.Email(email));
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request);

    return response;
  }
}

module.exports = Mailer;
