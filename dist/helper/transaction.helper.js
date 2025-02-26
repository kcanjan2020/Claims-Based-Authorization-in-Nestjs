"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInTransaction = runInTransaction;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../database/data-source");
async function runInTransaction(operation) {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const result = await operation(queryRunner);
        await queryRunner.commitTransaction();
        return result;
    }
    catch (error) {
        await queryRunner.rollbackTransaction();
        throw new common_1.InternalServerErrorException('Transaction failed', error.message);
    }
    finally {
        await queryRunner.release();
    }
}
//# sourceMappingURL=transaction.helper.js.map