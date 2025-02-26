import { SearchFilterHelperParam } from 'src/interface/searchHelper';
export declare const searchFilterHelper: (search: SearchFilterHelperParam, searchables?: string[]) => {
    [x: string]: import("typeorm").FindOperator<string>;
};
