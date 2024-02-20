import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridBase } from '../../shared/components/grid/grid-base';
import { LabelTranslationListItem } from '../../shared/models/localization/label-translation-list-item.model';
import { LanguageListItem } from '../../shared/models/localization/language-list-item.model';
import { InterpreterViewLabelsService } from '../../shared/services/localization/interpreter-view-labels.service';
import { DialogService } from '../../shared/services/system/dialog.service';

@Component({
  selector: 'app-interpreter-view-label-list',
  templateUrl: './interpreter-view-label-list.component.html',
  styleUrls: ['./interpreter-view-label-list.component.css']
})
export class InterpreterViewLabelListComponent extends GridBase implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.gridApi.sizeColumnsToFit();
  }

  @ViewChild('gridProperties') agGrid: AgGridAngular;

  @Input('labels')
  public items: LabelTranslationListItem[];




  @Output()
  removeRow = new EventEmitter();

  private selectedLanguage: LanguageListItem;
  @Input() set language(lang: LanguageListItem) {
    if (lang) {
      this.selectedLanguage = lang;
      if (lang.name == 'English' && this.columnDefs) {
        this.columnDefs[2]['hide'] = true;
        this.columnDefs[3]['editable'] = true;
        this.gridApi.setColumnDefs(this.columnDefs);
        this.gridApi.refreshHeader();
        this.gridApi.sizeColumnsToFit();
      }
      if (lang.name != 'English' && this.columnDefs) {
        this.columnDefs[2]['hide'] = false;
        this.columnDefs[2]['headerName'] = lang.name;
        this.columnDefs[3]['editable'] = false;
        this.gridApi.setColumnDefs(this.columnDefs);
        this.gridApi.refreshHeader();
        this.gridApi.sizeColumnsToFit();
      }
    }

  }
  constructor(private dialogservice: DialogService, private interpreterlabelService: InterpreterViewLabelsService,) {
    super();

  }

  ngOnInit(): void {
    super.ngOnInit();
  //  if (this.selectedLanguage.name == 'English') {
   //   this.columnDefs[2]['hide'] = true;
   // }
  }

}
