import { QueryBuilder } from "../core/query-builder";
import { IPaginatedResult } from "../interfaces/paginated-result";

export class Paginator{
  static async paginate<T>(
    query: QueryBuilder<T>,
    page: number = 1,
    perPage: number = 15
  ): Promise<IPaginatedResult<T>> {
    const offset = (page - 1) * perPage;

    const total = await query.count();

    const data = await query
      .limit(perPage)
      .offset(offset)
      .execute();

    const lastPage = Math.ceil(total / perPage);
    const from = offset + 1;
    const to = Math.min(offset * perPage, total);

    return {
      data,
      total,
      perPage,
      currentPage: page,
      lastPage,
      from,
      to
    }
  }
}
