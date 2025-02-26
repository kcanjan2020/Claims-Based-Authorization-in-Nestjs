import { QueryRunner } from 'typeorm';
export declare function runInTransaction<T>(operation: (queryRunner: QueryRunner) => Promise<T>): Promise<T>;
