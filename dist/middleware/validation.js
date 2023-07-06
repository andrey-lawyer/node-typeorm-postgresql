"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regex_variables_1 = require("../const/regex.variables");
const Joi = require('joi');
class IsValidate {
    constructor() {
        this.userValidation = async (req, res, next) => {
            const schema = Joi.object({
                email: Joi.string()
                    .email({
                    minDomainSegments: 2,
                    tlds: { allow: ['com', 'net', 'ua'] }
                })
                    .pattern(regex_variables_1.regexEmail)
                    .required(),
                password: Joi.string().pattern(regex_variables_1.regexPassword).required()
            });
            await this.validateRequest(schema, req, res, next);
        };
        this.userValidationEmail = async (req, res, next) => {
            const schema = Joi.object({
                email: Joi.string()
                    .email({
                    minDomainSegments: 2,
                    tlds: { allow: ['com', 'net', 'ua'] }
                })
                    .pattern(regex_variables_1.regexEmail)
            });
            await this.validateRequest(schema, req, res, next);
        };
        this.userValidationPassword = async (req, res, next) => {
            const schema = Joi.object({
                password: Joi.string().pattern(regex_variables_1.regexPassword).required()
            });
            await this.validateRequest(schema, req, res, next);
        };
        this.validateRequest = async (schema, req, res, next) => {
            try {
                await schema.validateAsync(req.body);
                next();
            }
            catch (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
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
exports.default = IsValidate;
//# sourceMappingURL=validation.js.map