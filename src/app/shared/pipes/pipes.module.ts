import { NgModule } from '@angular/core';
import { ImageBase64ToSrcPipe } from './image-base64-to-src/image-base64-to-src';


@NgModule({
  imports: [],
  declarations: [
    ImageBase64ToSrcPipe
  ],
  exports: [
    ImageBase64ToSrcPipe
  ],
})
export class PipesModule {
  static forRoot() {
    return {
      ngModule: PipesModule,
      providers: [],
    };
  }
}
