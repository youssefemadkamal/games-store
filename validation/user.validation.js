import Joi from "joi";

export const userValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name must be at most 30 characters"
        }),
    email: Joi.string()
        .email() 
        .min(10)
        .max(30)
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be valid",
            "string.min": "Email must be at least 10 characters",
            "string.max": "Email must be at most 30 characters"
        }),
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password must be at most 30 characters"
        }),
});