import { MinPriceFilterSeasonListItem } from "./min-price-filter-season-list-item.model";

export class MinPriceFilterViewModel {
  public franchiseeUid: string;
  public defaultMinPrice: number;
  public seasons: MinPriceFilterSeasonListItem[];
}
