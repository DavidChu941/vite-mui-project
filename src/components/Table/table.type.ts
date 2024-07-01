export type TableContentItemType = {
  [key: string]: React.ReactNode | string | number;
}


export type TableContentType = TableContentItemType[];

export type TableHeadItemType = {
  [key: string]: React.ReactNode | string | number;
}

export type PaginationType = {
  page: number;
  total: number;
  size: number
}
export type Order = 'asc' | 'desc';

export type FilterType = {
  [key: string]: string | boolean | number | undefined
}