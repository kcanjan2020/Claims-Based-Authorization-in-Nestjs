"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePermissions = exports.PERMISSIONS_KEY = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../../auth/decorator/auth.decorator");
const auth_type_enum_1 = require("../../auth/enums/auth-type.enum");
exports.PERMISSIONS_KEY = 'permissions';
const RequirePermissions = (...permissions) => {
    return (0, common_1.applyDecorators)((0, auth_decorator_1.Auth)(permissions.length !== 0 ? auth_type_enum_1.AuthType.Bearer : auth_type_enum_1.AuthType.None), (0, common_1.SetMetadata)(exports.PERMISSIONS_KEY, permissions));
};
exports.RequirePermissions = RequirePermissions;
//# sourceMappingURL=permission.decorator.js.map