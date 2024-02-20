
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from '../../shared/services/services.module';
import { ContentManagementRoutingModule } from './content-management-routing.module';
import { PageDetailsComponent } from './page-details/page-details.component';
import { PageListComponent } from './page-list/page-list.component';
import { MetatagListComponent } from './grid/metatag-list/metatag-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { PageSettingsComponent } from './page-settings/page-settings.component';
import { ContentEditorModule } from '../../shared/components/content-editor/content-editor.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostListComponent } from './post-list/post-list.component';
import { LabelsComponent } from './labels/labels.component';
import { WidgetListComponent } from './widget-list/widget-list.component';
import { InterpreterCreatePageLinkComponent } from './interpreter-create-page-link/interpreter-create-page-link.component';
import { InterpreterPageDetailsComponent } from './interpreter-page-details/interpreter-page-details.component';
import { InterpreterCreateLabelsLinkComponent } from './interpreter-create-labels-link/interpreter-create-labels-link.component';
import { InterpreterLabelsComponent } from './interpreter-labels/interpreter-labels.component';
import { LabelListComponent } from './labels/label-list/label-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { LabelTranslatorLinkComponent } from './label-translator-link/label-translator-link.component';
import { PagesTranslatorLinkComponent } from './pages-translator-link/pages-translator-link.component';
import { PageSearchComponent } from './page-search/page-search.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { WidgetDetailsComponent } from './widget-details/widget-details.component';
import { WidgetSearchComponent } from './widget-search/widget-search.component';


@NgModule({
  imports: [
    CommonModule,
    ContentManagementRoutingModule,
    FormsModule, ReactiveFormsModule, ServicesModule, AgGridModule, ContentEditorModule, MatSidenavModule, MatButtonModule, MatIconModule, AngularMaterialModule,
    PipesModule
  ],
  declarations: [PageDetailsComponent, PageListComponent, MetatagListComponent, PageSettingsComponent, PostListComponent, LabelsComponent,
    WidgetListComponent, InterpreterCreatePageLinkComponent, InterpreterPageDetailsComponent, InterpreterCreateLabelsLinkComponent, InterpreterLabelsComponent, LabelListComponent,
    PostDetailsComponent, LabelTranslatorLinkComponent, PagesTranslatorLinkComponent, PageSearchComponent, WidgetDetailsComponent, WidgetSearchComponent]
})
export class ContentManagementModule { }
