import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent, HeaderComponent, SidebarComponent } from './components';
import { HomeComponent } from './home/home.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderMenuComponent } from './components/header/header-menu/header-menu.component';
import { SidebarMenuComponent } from './components/sidebar/sidebar-menu/sidebar-menu.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BarchartComponent } from './dashboard/barchart/barchart.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { LinechartComponent } from './dashboard/linechart/linechart.component';
import { AreachartComponent } from './dashboard/areachart/areachart.component';

@NgModule({
  imports: [CommonModule, LayoutRoutingModule, GoogleChartsModule],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HeaderMenuComponent,
    SidebarMenuComponent,
    BreadcrumbComponent,
    DashboardComponent,
    BarchartComponent,
    LinechartComponent,
    AreachartComponent,
  ],
})
export class LayoutModule { }
