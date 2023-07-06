"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = void 0;
const tryCatch = (controller) => {
    const func = async (req, res, next) => {
        try {
            await controller(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
    return func;
};
exports.tryCatch = tryCatch;
//# sourceMappingURL=tryCatch.js.map