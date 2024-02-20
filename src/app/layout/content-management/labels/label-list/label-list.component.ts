import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridBase } from 'app/shared/components/grid/grid-base';
import { LabelTranslationListItem } from 'app/shared/models/localization/label-translation-list-item.model';
import { LanguageListItem } from 'app/shared/models/localization/language-list-item.model';
import { LabelService } from 'app/shared/services/localization/label.service';
import { DialogService } from 'app/shared/services/system/dialog.service';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.css']
})
export class LabelListComponent extends GridBase implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.gridApi.sizeColumnsToFit();
  }
  
  @ViewChild('gridProperties') agGrid: AgGridAngular;
  
  @Input('labels')
  public items: LabelTranslationListItem[];


    @Output() childButtonEvent = new EventEmitter<number>();

  public codeCount:number;
  
  @Output()
  removeRow = new EventEmitter();

  private selectedLanguage: LanguageListItem;
  @Input() set language(lang: LanguageListItem) {
    if(lang) {
      this.selectedLanguage = lang;
      if(lang.name == 'English' && this.columnDefs) {
        this.columnDefs[3]['hide'] = true;
        this.columnDefs[2]['editable'] = true;
        this.gridApi.setColumnDefs(this.columnDefs);
        this.gridApi.refreshHeader();
        this.gridApi.sizeColumnsToFit();
      }
      if(lang.name != 'English' && this.columnDefs) {
        this.columnDefs[3]['hide'] = false;
        this.columnDefs[3]['headerName'] = lang.name;
        this.columnDefs[2]['editable'] = false;
        this.gridApi.setColumnDefs(this.columnDefs);
        this.gridApi.refreshHeader();
        this.gridApi.sizeColumnsToFit();
      }
    }
    
  }

  constructor(private dialogservice: DialogService, private labelService: LabelService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if(this.selectedLanguage.name == 'English') {
      this.columnDefs[3]['hide'] = true;
    }
   
  }
  addCode(opt) {

    this.codeCount = this.labelService.addLabelcode(opt.data.code);


  }
  clickHandler() {
    this.childButtonEvent.emit(this.codeCount);
  }
  deletecode(opt) {
    this.codeCount = this.labelService.deleteLabelcode(opt.data.code);

  }
  deletewhenclicked(opt, grid) {
    this.dialogservice.twoButtons("Translation List", "Do you really want to delete this row?", "Yes", "No").subscribe(result => {
      if(result == 0) {
        this.labelService.removeLabel(opt.data.code).subscribe(() => {
          grid.gridApi.applyTransaction({remove: [opt.data]});
          this.rowData.splice(opt.rowIndex, 1);
          if(this.rowData.length == 0) {
            grid.makeEmptyGrid();
          };
        })
      }
    });
  }
}
