import { GridBase } from "app/shared/components/grid/grid-base";
import { GridDecoratorBase } from "app/shared/components/grid/grid-decorator-base";
//import { AutocompleteCell } from "../autocomplete-cell.editor/autocomplete-cell.editor";

export class GridDecoratorInterpreterLabels extends GridDecoratorBase {

  buildGrid(grid: GridBase) {
    grid.columnDefs = [
      {
        headerName: "Code", field: "code", resizable: false, width: 100, maxWidth: 100, hide: false,
        editable: (params) => { if (params.data.code) return false; else return true; }
      },
      { headerName: "English", field: "defaultLanguageContent", editable: true, resizable: false, minWidth: 200, hide: false },
      { headerName: "Content", field: "content", editable: true, resizable: true, minWidth: 300, hide: false },
    ];

    grid.frameworkComponents = {
      //autocomplateCell: AutocompleteCell

    };

    grid.defaultColDef = { resizable: true };
    grid.addHotKey({ key: "Ctrl + Shift + C", func: grid.clone });
  }
}
