import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'imageBase64ToSrc' })
export class ImageBase64ToSrcPipe implements PipeTransform {
  public transform(val: string): string {
    return "data:image/jpeg;base64," + val;
  }
}
