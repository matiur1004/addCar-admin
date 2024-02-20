import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDatepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './layout/users/users.module';
import { StantumCommonModule } from './shared/common/module';
import { ServicesModule } from './shared/services/services.module';
import { SpinnerOverlayComponent } from './spinner/spinner-overlay.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TermsOfServiceComponent } from './layout/components/terms-of-service/terms-of-service.component';
import { NavigationModule } from './shared/services/navigation/navigation.module';
import { AppNavigation } from './shared/services/navigation/app-navigation';
import { PipesModule } from './shared/pipes/pipes.module';
import { AgGridModule } from 'ag-grid-angular';
import { ContentEditorModule } from './shared/components/content-editor/content-editor.module';
import { InterpreterViewLabelsComponent } from './interpreter-view/interpreter-view-labels/interpreter-view-labels.component';
import { InterpreterViewLabelListComponent } from './interpreter-view/interpreter-view-label-list/interpreter-view-label-list.component';
import { InterpreterViewContentPagesComponent } from './interpreter-view/interpreter-view-content-pages/interpreter-view-content-pages.component';
import { InterpreterViewContentEditorComponent } from './interpreter-view/interpreter-view-content-editor/interpreter-view-content-editor.component';
import { InterpreterViewEnglishtextPageComponent } from './interpreter-view/interpreter-view-englishtext-page/interpreter-view-englishtext-page.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    SpinnerOverlayComponent,
    AppComponent,
    WelcomeComponent,
    TermsOfServiceComponent,
    InterpreterViewLabelsComponent,
    InterpreterViewLabelListComponent,
    InterpreterViewContentPagesComponent,
    InterpreterViewContentEditorComponent,
    InterpreterViewEnglishtextPageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StantumCommonModule,
    MatProgressSpinnerModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    ServicesModule,
    AppRoutingModule,
    ArchwizardModule,
    SimpleNotificationsModule.forRoot(),
    UsersModule,
    NavigationModule.forRoot(AppNavigation.LoadConfig()),
    PipesModule.forRoot(),
    AgGridModule,
    ContentEditorModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [SpinnerOverlayComponent],
})
export class AppModule {}
