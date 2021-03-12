export const isBegin = (page: number) => page === 0;

export const canLoadMore = (total: number, current: number, currentPage: number) =>
  currentPage === 0 ? true : total > current;
