import { PageFilterHelperParam } from 'src/interface/pageHelper';
export declare const pageFilterHelper: (queries: PageFilterHelperParam) => {
    skip: number;
    take: number;
    page: number;
    size: number;
};
