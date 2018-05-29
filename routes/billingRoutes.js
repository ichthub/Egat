const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleWares/requireLogin');
// this is how you build a charge to a customer
module.exports = app => {
  // request will be passed to requireLogin middleware before it went to routHandler
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    // update the user in DB
    req.user.credits += 5;
    // save changes
    const user = await req.user.save();
    res.send(user); // send responce to the frontend
  });
};
