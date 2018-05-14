const passport = require('passport');
/*
 whene the user navigates to the this route fire authenticate func with GoogleSrategy.
 GoogleStrategy has an internal identifier which is google we pass to the authenticate func.
 scope objects tells google what infos we want about the user
*/
module.exports = app => {
  // rout handler
  /*
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  */
  app.get('/auth/google', (req, res) => {
    res.send('from auth/google');
  });

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/'); // destroyes the key inside cookie
  });
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
