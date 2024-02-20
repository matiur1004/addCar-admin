import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './shared/services/logged-in.guard';
import { WelcomeGuard } from './shared/services/welcome.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { TermsOfServiceComponent } from './layout/components/terms-of-service/terms-of-service.component';
import { PageListResolverService } from './shared/services/page-management/page-list-resolver.service';
import { InterpreterViewLabelsComponent } from './interpreter-view/interpreter-view-labels/interpreter-view-labels.component';
import { InterpreterViewEnglishtextPageComponent } from './interpreter-view/interpreter-view-englishtext-page/interpreter-view-englishtext-page.component';
import { InterpreterViewContentPagesComponent } from './interpreter-view/interpreter-view-content-pages/interpreter-view-content-pages.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInGuard],
  },
  { path: 'welcome', component: WelcomeComponent, canActivate: [WelcomeGuard] },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  {
    path: 'interpreter-view/:uid/page/:pageNum', component: InterpreterViewLabelsComponent, runGuardsAndResolvers: 'always', resolve: { pages: PageListResolverService }
  },
  {
    path: 'interpreter-view/:uid', component: InterpreterViewLabelsComponent, runGuardsAndResolvers: 'always'

  },
  {
    path: 'interpreter-view-englishtext-pages/:uid', component: InterpreterViewEnglishtextPageComponent, runGuardsAndResolvers: 'always'

  },
  {
    path: 'interpreter-view-content-pages/:uid', component: InterpreterViewContentPagesComponent, runGuardsAndResolvers: 'always'

  },
  
  { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  {
    path: 'error',
    loadChildren: () =>
      import('./server-error/server-error.module').then((m) => m.ServerErrorModule),
  },
  {
    path: 'access-denied',
    loadChildren: () =>
      import('./access-denied/access-denied.module').then((m) => m.AccessDeniedModule),
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule),
  },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
