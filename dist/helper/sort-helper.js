"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortHelper = void 0;
const common_1 = require("@nestjs/common");
const sortHelper = (queries, sortables) => {
    const sortBy = queries.sortBy || 'updatedAt';
    const orderBy = queries.orderBy || 'DESC';
    sortables?.push('updatedAt');
    if (sortables && !sortables.includes(sortBy)) {
        throw new common_1.BadRequestException('Cannot use ' + sortBy + ' to sort');
    }
    return {
        [sortBy]: orderBy,
    };
};
exports.sortHelper = sortHelper;
//# sourceMappingURL=sort-helper.js.map