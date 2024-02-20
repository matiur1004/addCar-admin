import { GridBase } from "app/shared/components/grid/grid-base";
import { GridDecoratorBase } from "app/shared/components/grid/grid-decorator-base";
import { MetatagListComponent } from "../metatag-list/metatag-list.component";
//import { AutocompleteCell } from "../autocomplete-cell.editor/autocomplete-cell.editor";
import { CheckboxRenderer } from "./grid-cell-renderers/checkbox.renderer";
import { CloneButtonRenderer } from "./grid-cell-renderers/clone-button.renderer";
import { DeleteButtonRenderer } from "./grid-cell-renderers/delete-button.renderer";
import { TranslateButtonRenderer } from "./grid-cell-renderers/translate-button.renderer";

export class GridDecoratorMetatags extends GridDecoratorBase {

  buildGrid(grid: GridBase) {
    grid.columnDefs = [
      { headerName: "Name", field: "name", editable: true, resizable: true, minWidth: 100 },
      { headerName: "Http-equiv", field: "httpEquiv", editable: true, resizable: true, minWidth: 100 },
      { headerName: "Content", field: "content", editable: true, sortable: true, resizable: true, minWidth: 100 },
      { headerName: '', cellRenderer: 'cloneButtonRenderer', cellRendererParams: { gridparam: grid }, minWidth: 35, maxWidth: 35 },
      { headerName: '', cellRenderer: 'translateButtonRenderer', cellRendererParams: { clicked: (<MetatagListComponent>grid).translateButtonClickHandler }, minWidth: 35, maxWidth: 35 },
      { headerName: '', cellRenderer: 'deleteButtonRenderer', cellRendererParams: { gridparam: grid }, minWidth: 35, maxWidth: 35 },
    ];

    grid.frameworkComponents = {
      deleteButtonRenderer: DeleteButtonRenderer,
      checkboxRenderer: CheckboxRenderer,
      cloneButtonRenderer: CloneButtonRenderer,
      translateButtonRenderer: TranslateButtonRenderer,
      //autocomplateCell: AutocompleteCell

    };

    grid.defaultColDef = { resizable: true };
    grid.addHotKey({ key: "Ctrl + Shift + C", func: grid.clone });
  }
}
