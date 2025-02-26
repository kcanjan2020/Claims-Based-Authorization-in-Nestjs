"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeError = safeError;
async function safeError(promise) {
    try {
        const result = await promise;
        return [result, null];
    }
    catch (error) {
        return [null, error];
    }
}
//# sourceMappingURL=safe-error.helper.js.map