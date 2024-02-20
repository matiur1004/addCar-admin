import { BaseEntity } from "../base-entity.model";
import { TextEntryViewModel } from "../localization/text-entry-view-model.model";

export class MetaTagViewModel extends BaseEntity {
  public name: string;
  public httpEquiv: string;
  public localizedContent: Array<TextEntryViewModel> = [];
  public content: string; //client side only
}
