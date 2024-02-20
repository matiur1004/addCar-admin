import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedDirectivesModule } from '@app-shared/directives';
import { ServicesModule } from '@app-shared/services/services.module';
import { TreeModule } from '@circlon/angular-tree-component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from '../../angular-material.module';
import {
    UserChangePasswordComponent,
    UserDeactivateDialogComponent,
    UserDeleteDialogComponent,
    UserDetailsComponent,
    UserInviteComponent,
    UserListComponent,
    UserLocationTreeComponent,
    UserProfileEditComponent,
    UserSearchComponent,
    UserSetPasswordComponent
} from './';
import { UserActivateDialogComponent } from './user-activate-dialog/user-activate-dialog.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    HttpClientModule,
    TreeModule,
    AngularMaterialModule,
    NgbTypeaheadModule,
    SharedDirectivesModule,
  ],
  declarations: [
    UserChangePasswordComponent,
    UserDetailsComponent,
    UserInviteComponent,
    UserListComponent,
    UserLocationTreeComponent,
    UserProfileEditComponent,
    UserSetPasswordComponent,
    UserDeactivateDialogComponent,
    UserDeleteDialogComponent,
    UserSearchComponent,
    UserActivateDialogComponent
  ],
  exports: [UserSetPasswordComponent, UserProfileEditComponent],
})
export class UsersModule {}
