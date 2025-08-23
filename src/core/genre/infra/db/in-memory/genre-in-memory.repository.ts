import { Genre, GenreId } from '../../../domain/genre.aggregate';
import {
  IGenreRepository,
  GenreFilter,
  GenreSearchParams,
  GenreSearchResult,
} from '../../../domain/genre.repository';
import { SortDirection } from '../../../../shared/domain/repository/search-params';
import { InMemorySearchableRepository } from '@core/shared/infra/db/in-memory/in-memory.repository';

export class GenreInMemoryRepository
  extends InMemorySearchableRepository<Genre, GenreId, GenreFilter>
  implements IGenreRepository
{
  search(props: GenreSearchParams): Promise<GenreSearchResult> {
    throw new Error('Method not implemented.');
  }
  insert(entity: Genre): Promise<void> {
    throw new Error('Method not implemented.');
  }
  bulkInsert(entities: Genre[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(entity: Genre): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(entity_id: GenreId): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(entity_id: GenreId): Promise<Genre | null> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Genre[]> {
    throw new Error('Method not implemented.');
  }
  sortableFields: string[] = ['name', 'created_at'];

  getEntity(): new (...args: any[]) => Genre {
    return Genre;
  }

  protected async applyFilter(
    items: Genre[],
    filter: GenreFilter,
  ): Promise<Genre[]> {
    if (!filter) {
      return items;
    }

    return items.filter((genre) => {
      const containsName =
        filter.name &&
        genre.name.toLowerCase().includes(filter.name.toLowerCase());
      const containsCategoriesId =
        filter.categories_id &&
        filter.categories_id.some((c) => genre.categories_id.has(c.id));
      return filter.name && filter.categories_id
        ? containsName && containsCategoriesId
        : filter.name
          ? containsName
          : containsCategoriesId;
    });
  }

  protected applySort(
    items: Genre[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Genre[] {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}
