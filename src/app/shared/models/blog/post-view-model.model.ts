import { BaseEntity } from "../base-entity.model";

export class PostViewModel extends BaseEntity {
  public title: string;
  public author: string;
  public minutesToRead: number;
  public content: string;
  public alt: string;
  public brief: string;
  public isPublished: boolean;
  public url: string;
  public imageBase64: string;
  public imageSize: number;
  public imageUID: string;

}
