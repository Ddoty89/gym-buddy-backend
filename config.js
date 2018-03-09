'use strict';

exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL || 
    'mongodb://ddoty89:dotysan815@ds153978.mlab.com:53978/gym-buddy-capstone';
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'localhost:3000';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'domandellie';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '5d';