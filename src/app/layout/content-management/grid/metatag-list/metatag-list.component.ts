import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { GridBase } from "app/shared/components/grid/grid-base";
import { GridDecoratorBase } from "app/shared/components/grid/grid-decorator-base";
import { MetaTagViewModel } from "../../../../shared/models/page-management/meta-tag-view-model.model";

@Component({
  selector: 'app-metatag-list',
  templateUrl: './metatag-list.component.html',
  styleUrls: ['./metatag-list.component.scss']
})
export class MetatagListComponent extends GridBase implements OnInit {


  @ViewChild('gridProperties') agGrid: AgGridAngular;

  @Input('metatags')
  public items: MetaTagViewModel[];


  constructor() {
    super();

  }
  
  translateButtonClickHandler(event, params) {
    if (params.data) {
      const metaTag: MetaTagViewModel = params.data;
      if (metaTag.content) {
        metaTag.localizedContent.forEach(a => a.content = metaTag.content);
      } else {
      }
    }
  }

  deletewhenclicked(opt, grid) {
    alert(`del button from ${opt.rowIndex} (generationresult grid) row worked!`);
    grid.gridApi.applyTransaction({remove: [opt.data]});
    this.rowData.splice(opt.rowIndex, 1);
    if(this.rowData.length == 0) {
      grid.makeEmptyGrid();
    };
  }

  checkedChangeHandler(event, params) {
    alert(`checkbox from ${params.rowIndex}, checked:${params.value}, (generationresult grid) row worked!`);
  }
}
