const createError = require('http-errors');

module.exports.AccessDeniedError = () => createError(400, 'Access Denied');

module.exports.IncorrectUserIdError = () => createError(400, 'Incorrect user`s Id');

module.exports.IncorrectCardIdError = () => createError(400, 'Incorrect card`s Id');

module.exports.IncorrectEmailPasswordError = () => createError(401, 'Incorrect e-mail or password');

module.exports.ForbiddenError = () => createError(403, 'Forbidden');

module.exports.PageNotFoundError = () => createError(404, 'Page is not found');

module.exports.UserNotFoundError = () => createError(404, 'User is not found');

module.exports.CardNotFoundError = () => createError(404, 'Card is not found');

module.exports.EmailExistsError = (email) => createError(409, `This ${email} already exists`);

module.exports.FileNotFoundError = () => createError(500, 'Data file is not found');
