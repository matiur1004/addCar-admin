import { GridBase } from "app/shared/components/grid/grid-base";
import { GridDecoratorBase } from "app/shared/components/grid/grid-decorator-base";
import { CheckboxRenderer } from "../../grid/grid-decorators/grid-cell-renderers/checkbox.renderer";
import { LabelListComponent } from "../label-list/label-list.component";
//import { AutocompleteCell } from "../autocomplete-cell.editor/autocomplete-cell.editor";
import { DeleteButtonRenderer } from "./grid-cell-renderers/delete-button.renderer";

export class GridDecoratorLabels extends GridDecoratorBase {

  buildGrid(grid: GridBase) {
    grid.columnDefs = [
      { headerName: "Checkbox", cellRenderer: 'checkBoxRenderer', cellRendererParams: { gridparam: grid }, minWidth: 80, maxWidth: 80, hide: false },
      { headerName: "Code", field: "code", resizable: false, width: 100, maxWidth: 100,  hide: false,
        editable: (params) => { if(params.data.code) return false; else return true;} },
      { headerName: "English", field: "defaultLanguageContent", editable: true, resizable: false, minWidth: 200, hide: false },
      { headerName: "Content", field: "content", editable: true, resizable: true, minWidth: 300, hide: false },
      { headerName: '', cellRenderer: 'deleteButtonRenderer', cellRendererParams: { gridparam: grid }, minWidth: 35, maxWidth: 35, hide: false }
    ];

    grid.frameworkComponents = {
      deleteButtonRenderer: DeleteButtonRenderer,
      checkBoxRenderer: CheckboxRenderer,
      //autocomplateCell: AutocompleteCell

    };

    grid.defaultColDef = { resizable: true };
    grid.addHotKey({ key: "Ctrl + Shift + C", func: grid.clone });
  }
}
