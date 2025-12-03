"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const response_1 = require("../utils/response");
const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof Error) {
                (0, response_1.sendError)(res, 400, error.message);
                return;
            }
            (0, response_1.sendError)(res, 400, 'Validation error');
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validate.middleware.js.map