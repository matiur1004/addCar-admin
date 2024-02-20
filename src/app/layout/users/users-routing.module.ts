import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InviteUserResolverService } from '@app-shared/services/user/invite-user-resolver.service';
import { UserProfileListResolverService } from '@app-shared/services/user/user-profile-list-resolver.service';
import { UserProfileResolverService } from '@app-shared/services/user/user-profile-resolver.service';
import {
    UserChangePasswordComponent,
    UserDetailsComponent,
    UserInviteComponent,
    UserListComponent,
    UserSetPasswordComponent
} from './';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    resolve: { userProfiles: UserProfileListResolverService },
  },
  {
    path: 'page/:pageNum',
    component: UserListComponent,
    runGuardsAndResolvers: 'always',
    resolve: { userProfiles: UserProfileListResolverService },
  },
  {
    path: 'page',
    component: UserListComponent,
    resolve: { userProfiles: UserProfileListResolverService },
  },
  {
    path: 'change-password',
    component: UserChangePasswordComponent,
  },
  {
    path: 'set-password',
    component: UserSetPasswordComponent,
  },
  {
    path: 'invite-user',
    component: UserInviteComponent,
    resolve: { data: InviteUserResolverService },
  },
  {
    path: ':uid',
    component: UserDetailsComponent,
    resolve: { userProfile: UserProfileResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
