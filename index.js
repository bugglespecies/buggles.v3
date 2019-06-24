const express       = require('express');
const exprSession   = require('express-session');
const passport      = require('passport');
const sDiscord      = require('passport-discord');
const bodyParse     = require('body-parser');
const helmet        = require('helmet');
const flash         = require('req-flash');
const ioSockets     = require('socket.io');
const method        = require('method-override');

const appCore       = express();
const serverCore    = http.createServer(appCore);
const io            = ioSockets(serverCore);

appCore.use(helmet());
appCore.use(flash());
appCore.use(bodyParse.urlencoded({ extended: true }));
appCore.set('view engine', 'ejs');