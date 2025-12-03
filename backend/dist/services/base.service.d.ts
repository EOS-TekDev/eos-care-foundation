import { PaginationQuery } from '../types';
export declare const getPagination: (query: PaginationQuery) => {
    page: number;
    limit: number;
    skip: number;
};
export declare const getMeta: (total: number, page: number, limit: number) => {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};
//# sourceMappingURL=base.service.d.ts.map