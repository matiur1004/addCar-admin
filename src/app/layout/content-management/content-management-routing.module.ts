
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageListComponent } from './page-list/page-list.component';
import { PageListResolverService } from '@app-shared/services/page-management/page-list-resolver.service';
import { PageDetailsComponent } from './page-details/page-details.component';
import { PageResolverService } from '@app-shared/services/page-management/page-resolver.service';
import { CountryPageResolverService } from '../../shared/services/page-management/country-page-resolver.service';
import { PostListComponent } from './post-list/post-list.component';
import { WidgetListComponent } from './widget-list/widget-list.component';
import { LabelsComponent } from './labels/labels.component';
import { InterpreterLabelsComponent } from './interpreter-labels/interpreter-labels.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostResolverService } from '../../shared/services/blog/post-resolver.service';
import { PostListResolverService } from '../../shared/services/blog/post-list-resolver.service';
import { WidgetDetailsComponent } from './widget-details/widget-details.component';
import { WidgetResolverService } from 'app/shared/services/widget/widget-resolver.service';
import { WidgetListResolverService } from 'app/shared/services/widget/widget-list-resolver.service';


const routes: Routes = [
  {
    path: '', component: PageListComponent, runGuardsAndResolvers: 'always', resolve: { pages: PageListResolverService }
  },
  {
    path: 'pages/page/:pageNum', component: PageListComponent, runGuardsAndResolvers: 'always', resolve: { pages: PageListResolverService }
  },
  {
    path: 'pages/page', component: PageListComponent, runGuardsAndResolvers: 'always', resolve: { pages: PageListResolverService }
  },
  {
    path: 'posts/page/:pageNum', component: PostListComponent, runGuardsAndResolvers: 'always', resolve: { posts: PostListResolverService }
  },
  {
    path: 'posts/page', component: PostListComponent, runGuardsAndResolvers: 'always', resolve: { posts: PostListResolverService }
  },
  {
    path: 'posts/:uid', component: PostDetailsComponent, resolve: { post: PostResolverService }
  },
  {
    path: 'widgets/page/:pageNum', component: WidgetListComponent, runGuardsAndResolvers: 'always', resolve: { pages: WidgetListResolverService }
  },
  {
    path: 'widgets/page', component: WidgetListComponent, runGuardsAndResolvers: 'always', resolve: { pages: WidgetListResolverService }
  },
  {
    path: 'labels/page/:pageNum', component: LabelsComponent, runGuardsAndResolvers: 'always'/*, resolve: { pages: PageListResolverService }*/
  },
  {
    path: 'labels/page', component: LabelsComponent, runGuardsAndResolvers: 'always'/*, resolve: { pages: LabelPageResolverService }*/
  },
  {
    path: 'pages/country-page/:countryUid/terms-and-conditions', component: PageDetailsComponent, runGuardsAndResolvers: 'always', resolve: { page: CountryPageResolverService }
  },
  {
    path: 'pages/country-page/:countryUid/conditions', component: PageDetailsComponent, runGuardsAndResolvers: 'always', resolve: { page: CountryPageResolverService }
  },
  {
    path: 'pages/country-page/:countryUid/important-information', component: PageDetailsComponent, runGuardsAndResolvers: 'always', resolve: { page: CountryPageResolverService }
  },
  {
    path: 'pages/country-page/:countryUid/content', component: PageDetailsComponent, runGuardsAndResolvers: 'always', resolve: { page: CountryPageResolverService }
  },
  {
    path: 'pages/:uid', component: PageDetailsComponent, runGuardsAndResolvers: 'always', resolve: { page: PageResolverService }
  },
  {
    path: 'labels/:uid', component: InterpreterLabelsComponent, runGuardsAndResolvers: 'always'/*, resolve: { page: PageResolverService }*/
  },
  {
    path: 'widgets/:uid', component: WidgetDetailsComponent, runGuardsAndResolvers: 'always', resolve: { page: WidgetResolverService }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentManagementRoutingModule { }
