const mongoose = require('mongoose');
const config = require('../config');
mongoose.set('debug', config.mongooseDebug);
mongoose.connect(config.mongoUri);
mongoose.Promise = Promise;

module.exports.Message = require('./message');
