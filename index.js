'use strict';
const express           = require('express');
const exprSession       = require('express-session');
const passport          = require('passport');
const sDiscord          = require('passport-discord');
const bodyParse         = require('body-parser');
const helmet            = require('helmet');
const flash             = require('req-flash');
const ioSockets         = require('socket.io');
const methodOverride    = require('method-override');

const config            = require('./configuration');

const appCore           = express();
const serverCore        = http.createServer(appCore);
const io                = ioSockets(serverCore);

require('./sockets.js')(io);

appCore.use(helmet());
appCore.use(flash());
appCore.use(bodyParse.urlencoded({ extended: true }));
appCore.use(methodOverride('_method'));
appCore.set('view engine', 'ejs');

appCore.use((exprSession)({
    secret: '1D8F7BA92-000FA1-D43838-78CCAF',
    resave: false,
    saveUninitialized: false
}));

appCore.use(passport.initialize());
appCore.use(passport.session());

passport.use(new sDiscord.Strategy({
    clientID: config.oauth2.discord.id,
    clientSecret: config.oauth2.discord.secret,
    callbackURL: 'http://localhost/auth/discord'
}))

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    done(err, user);
});