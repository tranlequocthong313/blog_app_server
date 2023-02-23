import Joi from 'joi';

export default {
    registerSchema: Joi.object({
        email: Joi.string().email().lowercase().required(),
        name: Joi.string().required().regex(/[$\(\)<>]/, { invert: true }),
        password: Joi.string().min(6).required(),
        passwordConfirmation: Joi.any().equal(Joi.ref('password'))
            .required()
            .label('Confirm password')
            .messages({ 'any.only': '{{#label}} does not match' })
    }),
    loginSchema: Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().required()
    })
};
