"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageFilterHelper = void 0;
const pageFilterHelper = (queries) => {
    const page = queries.page ? +queries.page : 1;
    const size = queries.size ? +queries.size : 10;
    return {
        skip: (page - 1) * size,
        take: size,
        page,
        size,
    };
};
exports.pageFilterHelper = pageFilterHelper;
//# sourceMappingURL=page-helper.js.map