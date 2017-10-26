import * as controller from './controller.js';
import path from 'path';

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

export const routerConfig = (app, passport) => {
  app.get('/api/users', controller.getAllUsers);
  app.get('/api/users/:userId', controller.fetchUser);
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
  });

  app.get('/profile', isLoggedIn, (req, res) => {
    console.log(req.user);
    res.render(path.join(__dirname, '../frontend/profile.ejs'), {
      user: req.user
    });
  });

  app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  });

  app.get('/auth/google',
    passport.authenticate('google', {
      scope : ['profile', 'email']
    })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/profile',
      failureredirect: '/'
    })
  );
};
