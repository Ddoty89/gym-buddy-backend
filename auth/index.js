'use strict';
const {router} = require('./router');
const {localStrategy, jwtStrategy} = require('./models');

module.exports = {router, localStrategy, jwtStrategy};