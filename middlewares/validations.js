const { celebrate, Joi } = require('celebrate');
// const ObjectId = require('mongoose').Types;

// module.exports.validateObjectId = celebrate({
//   params: Joi.ObjectId().
// })

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2)
      .messages({
        'string.empty': 'Поле Имя должно быть заполнено',
        'string.min': 'Минимальная длина поля Имя - 2 символа',
      }),
    email: Joi.string().required().email()
      .message('Поле E-mail должно быть заполнено валидным адресом')
      .messages({
        'string.empty': 'Поле E-mail должно быть заполнено',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': 'Поле Пароль должно быть заполнено',
        'string.min': 'Минимальная длина поля Пароль - 8 символов',
      }),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле E-mail должно быть заполнено валидным адресом')
      .messages({
        'string.empty': 'Поле E-mail должно быть заполнено',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': 'Поле Пароль должно быть заполнено',
        'string.min': 'Минимальная длина поля Пароль - 8 символов',
      }),
  }),
});
