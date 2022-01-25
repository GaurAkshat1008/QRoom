"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateRegister = (options) => {
    if (options.username.length <= 2) {
        return [
            {
                field: "username",
                message: "username too short",
            },
        ];
    }
    if (!!options.username.trim() === false) {
        return [
            {
                field: "username",
                message: "username cannot be spaces"
            }
        ];
    }
    if (!!options.password.trim() === false) {
        return [
            {
                field: "password",
                message: "password cannot be spaces"
            }
        ];
    }
    if (options.password.length <= 3) {
        return [
            {
                field: "password",
                message: "password too short",
            },
        ];
    }
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map