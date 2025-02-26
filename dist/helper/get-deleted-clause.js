"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeletedClause = void 0;
const typeorm_1 = require("typeorm");
const getDeletedClause = (deleted) => deleted ? (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) : (0, typeorm_1.IsNull)();
exports.getDeletedClause = getDeletedClause;
//# sourceMappingURL=get-deleted-clause.js.map