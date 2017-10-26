import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import { passportConfig } from './passport.js';
import { routerConfig } from './routes.js';


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'PutAnythingYouWantHere',
  saveUninitialized: false,
  resave: false,
}));

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

routerConfig(app, passport);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
