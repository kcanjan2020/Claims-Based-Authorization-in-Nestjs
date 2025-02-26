"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFilterHelper = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const searchFilterHelper = (search, searchables) => {
    if (searchables &&
        search.searchIn &&
        !searchables.includes(search.searchIn)) {
        throw new common_1.BadRequestException('Cannot use ' + search.searchIn + ' to search');
    }
    if (search.searchBy && search.searchBy) {
        return {
            [search.searchIn]: (0, typeorm_1.ILike)(`%${search.searchBy}%`),
        };
    }
    return undefined;
};
exports.searchFilterHelper = searchFilterHelper;
//# sourceMappingURL=search-helper.js.map