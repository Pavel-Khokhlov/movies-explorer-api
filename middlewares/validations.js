const { celebrate, Joi } = require('celebrate');
// const ObjectId = require('mongoose').Types;

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
});

module.exports.validateCreateUser = celebrate({
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

module.exports.validateUser = celebrate({
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

module.exports.validateUserUpdate = celebrate({
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
  }),
});

module.exports.validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.empty': 'Поле Страна должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'string.empty': 'Поле Директор должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'string.empty': 'Поле Длительность должно быть заполнено',
      }),
    year: Joi.string().required()
      .messages({
        'string.empty': 'Поле Год должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'string.empty': 'Поле Описание должно быть заполнено',
      }),
    image: Joi.string().required().pattern(/https?:\/\/[a-z0-9-]{1,}\.[a-z/\-._~:?#[\]@!$&'()*+,;=0-9]{1,}/)
      .messages({
        'string.empty': 'Поле Картинка должно быть заполнено',
      }),
    trailer: Joi.string().required().pattern(/https?:\/\/[a-z0-9-]{1,}\.[a-z/\-._~:?#[\]@!$&'()*+,;=0-9]{1,}/)
      .messages({
        'string.empty': 'Поле Трейлер должно быть заполнено',
      }),
    thumbnail: Joi.string().required().pattern(/https?:\/\/[a-z0-9-]{1,}\.[a-z/\-._~:?#[\]@!$&'()*+,;=0-9]{1,}/)
      .messages({
        'string.empty': 'Поле Миниатюра должно быть заполнено',
      }),
    movieId: Joi.number().required()
      .messages({
        'string.empty': 'Поле Номер должно быть заполнено',
      }),
    nameRU: Joi.string().required()
      .messages({
        'string.empty': 'Поле Название должно быть заполнено',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.empty': 'Поле Название должно быть заполнено',
      }),
  }),
});
