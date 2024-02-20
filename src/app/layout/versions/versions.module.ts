import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VersionsRoutingModule } from './versions-routing.module';
import { VersionsComponent } from './versions.component';

@NgModule({
  imports: [CommonModule, VersionsRoutingModule],
  declarations: [VersionsComponent],
})
export class VersionsModule {}
