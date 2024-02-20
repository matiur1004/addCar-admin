export class ListPageWrapper<T> {
  public totalCount = 0;
  public currentPage = 0;
  public pageSize = 0;
  public items?: T[];
}
