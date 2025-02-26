export declare class PaginatedDto<T> {
    data: T[];
    currentPage: number;
    total: number;
    totalPages: number;
    isLast: boolean;
    isFirst: boolean;
    size: number;
    constructor(offsetDataWithCount: [T[], number], pageData: {
        skip: number;
        take: number;
        page: number;
        size: number;
    });
}
