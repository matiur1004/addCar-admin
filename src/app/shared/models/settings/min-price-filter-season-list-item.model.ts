export class MinPriceFilterSeasonListItem {
  //Format: ddMM
  public from: string;
  //Format: ddMM
  public to: string;
  public minPrice: number;
  public isExtendBackwards?: boolean;
  public isExtendForwards?: boolean;
}
