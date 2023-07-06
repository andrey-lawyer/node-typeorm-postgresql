"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require('joi');
class IsExist {
    constructor() {
        this.validateRequest = async (schema, req, res, next) => {
            try {
                await schema.validateAsync(req.body);
                next();
            }
            catch (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
        };
        this.userValidation = async (req, res, next) => {
            const schema = Joi.object({
                email: Joi.string()
                    .email({
                    minDomainSegments: 2,
                    tlds: { allow: ['com', 'net'] }
                })
                    .pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
                    .required(),
                password: Joi.string()
                    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
                    .required()
            });
            await this.validateRequest(schema, req, res, next);
        };
        this.addTodoValidation = async (req, res, next) => {
            const schema = Joi.object({
                title: Joi.string().min(3).max(20).required(),
                description: Joi.string().min(3).max(100).required(),
                access: Joi.alternatives(['public', 'private']).required(),
                complete: Joi.boolean().required()
            });
            await this.validateRequest(schema, req, res, next);
        };
        this.updateTodoValidation = async (req, res, next) => {
            const schema = Joi.object({
                title: Joi.string().min(3).max(20).optional(),
                description: Joi.string().min(3).max(100).optional(),
                access: Joi.alternatives(['public', 'private']).optional(),
                complete: Joi.boolean().optional()
            });
            await this.validateRequest(schema, req, res, next);
        };
    }
}
exports.default = IsExist;
//# sourceMappingURL=validation.js.map