"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMemberTypeDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_member_type_dto_1 = require("./create-member-type.dto");
class UpdateMemberTypeDto extends (0, swagger_1.PartialType)(create_member_type_dto_1.CreateMemberTypeDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateMemberTypeDto = UpdateMemberTypeDto;
//# sourceMappingURL=update-member-type.dto.js.map