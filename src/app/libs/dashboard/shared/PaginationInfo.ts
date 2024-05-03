import { SortDirection } from "@angular/material/sort";

export interface PaginationInfo{
    page: number;
    sort: string; // field name
    order: SortDirection,
    size: number,
}