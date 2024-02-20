import { Component, Input, AfterViewInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { TextEntryViewModel } from '../../shared/models/localization/text-entry-view-model.model';

declare const require: any;
const EditorModule: any = require('jodit');


@Component({
  selector: 'app-interpreter-view-content-editor',
  templateUrl: './interpreter-view-content-editor.component.html',
  styleUrls: ['./interpreter-view-content-editor.component.css']
})
export class InterpreterViewContentEditorComponent implements AfterViewInit {

  editor: any;

  @ViewChild('content')
  elementRef: ElementRef<HTMLElement>;

  private _currentModel: TextEntryViewModel;

  defaultValue: string;

  @Input('inputModel')
  set currentModel(val: TextEntryViewModel) {
    this._currentModel = val;
    this.value = val?.content;
  }

  @Input() isDarkTheme: boolean;

  get currentModel(): TextEntryViewModel { return this._currentModel };


  constructor(private ngZone: NgZone) {
  }

  get value(): string {
    if (this.editor) {
      return this.editor.getEditorValue();
    } else {
      return '';
    }
  }

  set value(v: string) {
    if (this.editor) {
      this.editor.setEditorValue(v || '');
    } else {
      this.defaultValue = v;
    }
  }

  ngAfterViewInit() {
    // Create instance outside Angular scope
    this.ngZone.runOutsideAngular(() => {
      this.editor = new EditorModule.Jodit(this.elementRef.nativeElement, {
        theme: this.isDarkTheme ? 'dark' : 'light',
        toolbar: true,
      });
    });
  }

  //Save the model and update it from the service
  save() {
    if (this.currentModel)
      this.currentModel.content = this.value;
  }

  enable() {
    //this.formGroup.enable();
  }

  disable() {
    //this.formGroup.disable();
  }

}
