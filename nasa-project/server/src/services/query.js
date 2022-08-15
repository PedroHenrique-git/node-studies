import {
    DEFAULT_LIMIT_NUMBER,
    DEFAULT_ORDER,
    DEFAULT_PAGE_NUMBER
} from '../configs/constants';

export function getPagination(query) {
  const page = Math.abs(query.page) ?? DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) ?? DEFAULT_LIMIT_NUMBER;
  const order = query.order ?? DEFAULT_ORDER;

  const skip = (page - 1) * limit;

  return {
    page,
    order,
    skip,
    limit,
  };
}
