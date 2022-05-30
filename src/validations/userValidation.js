const Joi = require('joi')


exports.userValidation = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2).max(255),
        last_name: Joi.string().min(2).max(255),
        email: Joi.string().min(4).max(255).email(),
        phone: Joi.string().regex(/^[0-9]{10}$/),
        password: Joi.string().min(5).max(255)
    })
    return schema.validate(data)
}