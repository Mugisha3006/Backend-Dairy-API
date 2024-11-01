import Joi from "joi";

const userSchema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(10).required(),
    role: Joi.string()
});

// const loginSchema = Joi.object({
//     Email: Joi.string().required(),
//     Password: Joi.string().min(4).max(10).required(),
// })

const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            res.json(result.error);
        } else {
            next();
        }
    };
};

export { validate, userSchema };