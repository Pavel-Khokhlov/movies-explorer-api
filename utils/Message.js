const createMessage = require('http-errors');

module.exports.AccessDeniedError = () => createMessage(200, 'Access Denied');
