import { AfterViewInit, Component, ViewChild, ViewContainerRef } from "@angular/core";
import { ICellEditorAngularComp } from "ag-grid-angular";
import { AutocompleteHelper } from "../../../services/autocomplete.helper";

@Component({
  selector: 'autocomplete-cell',
  templateUrl: 'autocomplete-cell.editor.html',
  styleUrls: ['autocomplete-cell.editor.css']
})
export class AutocompleteCell implements ICellEditorAngularComp, AfterViewInit {

  params: any;
  value: any;
  highlightAllOnFocus: any;
  public helper: AutocompleteHelper<string>;
  
  @ViewChild('input', { read: ViewContainerRef }) public input: any;

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;

    this.helper = new AutocompleteHelper<string>();
    this.helper.formatter = params.formatter;
    this.helper.loader = params.loader;
    this.helper.filter = params.filter;
  }

  getValue() {
    return this.input.element.nativeElement.value;
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
      this.input.element.nativeElement.focus();
      if (this.highlightAllOnFocus) {
        this.input.element.nativeElement.select();

        this.highlightAllOnFocus = false;
      } else {
        let len = this.input.element.nativeElement.value?.length;
        if (len > 0) {
          this.input.element.nativeElement.setSelectionRange(0, len);
        }
      }

      this.input.element.nativeElement.focus();
    });
  }
}
