'use strict';
const {router} = require('./router');
const {localStrategy, jwtStrategy} = require('./strategy');

module.exports = {router, localStrategy, jwtStrategy};