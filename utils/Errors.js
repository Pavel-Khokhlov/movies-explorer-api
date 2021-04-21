const createError = require('http-errors');

module.exports.RequiredAuthError = () => createError(401, 'Требуется авторизация');

module.exports.IncorrectEmailPasswordError = () => createError(401, 'Неверный e-mail или пароль');

module.exports.ForbiddenError = () => createError(403, 'Доступ запрещен');

module.exports.PageNotFoundError = () => createError(404, 'Страница по указанному адресу не существует');

module.exports.UserNotFoundError = () => createError(404, 'Пользователь не найден');

module.exports.MovieNotFoundError = () => createError(404, 'Фильм не найден');

module.exports.EmailExistsError = (email) => createError(409, `Этот адрес ${email} уже зарегистрирован`);

module.exports.FileNotFoundError = () => createError(500, 'Файл не найден!');
