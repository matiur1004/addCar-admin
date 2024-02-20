import { BaseEntity } from "../base-entity.model";

export class PostListItem extends BaseEntity {
  public title: string;
  public author: string;
  public minutesToRead: number;
  public isPublished: boolean;
  public url: string;
  public brief: string;
  public imageBase64: string;
}
