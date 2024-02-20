import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentEditorComponent } from './content-editor.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ContentEditorComponent],
  exports: [ContentEditorComponent]
})
export class ContentEditorModule { }
