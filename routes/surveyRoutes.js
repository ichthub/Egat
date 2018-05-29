const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url'); // integrated module in node
const requireLogin = require('../middleWares/requireLogin');
const requireCredits = require('../middleWares/requireCredits');
const mongoose = require('mongoose');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate/template');

// survey model
const Survey = mongoose.model('surveys');

module.exports = app => {
  // **************************Sending survey list*******************
  app.get('/api/surveys', requireLogin, async (req, res) => {
    // console.log(req.user);
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });
    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choise', (req, res) => {
    res.send('Thanks for voting');
  });
  // ***************All the logic to get data from user, store it in DB and send emails to recipients*****************************
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { titel, subject, recipients, body } = req.body; // object from req destruuctured
    // create survey and insert to it
    // Note: that title, is equal to title: title
    const survey = new Survey({
      titel,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({
        email: email.trim()
      })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    // send email to sendGrid
    const mailer = new Mailer(survey, surveyTemplate(survey));
    // res.send(console.log(req.body));

    try {
      await mailer.send(); // send email to sendGrid
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      return res.send(user);
    } catch (error) {
      return res.status(422).send(error); // unproccessable properties
      // res.send(req.user);
    }
  });
  // ***************************Get feedback from customer trough SendGrid and update the survey in DB************************************
  app.post('/api/surveys/webhook', (req, res) => {
    // console.log(req.body);
    const p = new Path('/api/surveys/:surveyId/:choise'); // construct a path
    // console.log('Send grid =>', SendedPathname);
    _.chain(req.body)
      .map(({ email, url }) => {
        const SendedPathname = new URL(url).pathname; // extracts id and choise from the path (/api/surveys/id/response)
        const match = p.test(SendedPathname); // compare and test path p to SendedPathname
        // console.log(' match=> ', match); // match is a obj of surveyId and choise
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choise: match.choise
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choise }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: {
                email,
                responded: false
              }
            }
          },
          {
            $inc: {
              [choise]: 1
            },
            $set: {
              'recipients.$.responded': true
            },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();
    res.send({});
  });
};
