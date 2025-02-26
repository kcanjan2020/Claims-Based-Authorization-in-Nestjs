export declare enum SortingOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class BaseQuery {
    page?: number;
    size?: number;
    sortBy?: string;
    orderBy?: SortingOrder;
    deleted?: boolean;
    searchIn?: string;
    searchBy?: string;
}
