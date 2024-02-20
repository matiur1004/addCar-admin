import {Overlay} from '@angular/cdk/overlay';
import {NotificationService} from './notification.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropzoneModule} from 'ngx-dropzone-wrapper';

import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.new.service';
import {GlobalErrorHandler} from './global-error-handler';
import {ListSettingsService} from './list-settings.service';
import {LoggedInGuard} from './logged-in.guard';
import {ConnectionInterceptor} from './connection-error/connection-error.interceptor';
import {ServerErrorInterceptor} from './server-error.interceptor';
import {TokenInterceptor} from './token.interceptor';
import {FranchiseeService} from './franchisee/franchisee.service';
import {FranchiseeResolverService} from './franchisee/franchisee-resolver.service';
import {FranchiseeListResolverService} from './franchisee/franchisee-list-resolver.service';
import {UserProfileListResolverService} from './user/user-profile-list-resolver.service';
import {UserProfileResolverService} from './user/user-profile-resolver.service';
import {UserProfileService} from './user/user-profile.service';
import {
  CommissionStatusRenderPipe,
  CommissionTypePipe,
  CommissionTypeRenderPipe,
  CommissionValRenderPipe,
  CropTextPipe,
  DiscountTypesPipe,
  EnumToArrayPipe,
  GetReservationStatusPipe,
  FranchiseeInvoiceStatusPipe,
  MailAddressTypesPipe,
  NumberToMonthPipe,
  StatusRenderPipe,
  UserRolesEnumTranslatePipe,
  UserRolesTranslatePipe,
  UserStatesPipe,
  YesNoPipe,
  FuelTypePipe,
  GearTypePipe
} from './pipes';
import { InviteUserResolverService } from './user/invite-user-resolver.service';
import { SubFranchiseeService } from './franchisee/sub-franchisee.service';
import {WelcomeGuard} from './welcome.guard';
import {SingleFileUploaderComponent} from '../components/single-file-uploader.component';
import {SingleImageUploaderComponent} from '@app-shared/components/single-image-uploader/single-image-uploader.component';
import {MessageDefinitionService} from './system/message-definition.service';
import {MessageService} from './system/message.service';
import {PasswordService} from './system/password.service';
import { PasswordResetTokenGuard } from './password-reset-token.guard';
import { VersionInterceptor } from './version-interceptor';
import { PageService } from './page-management/page.service';
import { PageResolverService } from './page-management/page-resolver.service';
import { PageListResolverService } from './page-management/page-list-resolver.service';
import { LanguageService } from './code-book/language.service';
import { LocationListResolverService } from './location/location-list-resolver.service';
import { LocationService } from './location/location.service';
import { CountryService } from './franchisee/country.service';
import { VehicleListResolverService } from './vehicle/vehicle-list-resolver.service';
import { VehicleResolverService } from './vehicle/vehicle-resolver.service';
import { VehicleService } from './vehicle/vehicle.service';
import { VehicleCategoryService } from './vehicle/vehicle-category.service';
import {VehicleImageService} from "@app-shared/services/vehicle/vehicle-image.service";
import {VehicleImageResolverService} from "@app-shared/services/vehicle/vehicle-image-resolver.service";
import { TranslationSettingsService } from './translation-settings.service';
import { TranslationSettingsResolverService } from './translation-settings-resolver.service';
import { CountryPageResolverService } from './page-management/country-page-resolver.service';
import { CountryPageUrlService } from './page-management/country-page-url.service';
import { CountryImageResolverService } from './franchisee/country-image-resolver.service';
import { CountryImageService } from './franchisee/country-image.service';
import { LocationResolverService } from './location/location-resolver.service';
import { CountryResolverService } from './country/country-resolver.service';
import { LocationVehicleResolverService } from './location/location-vehicle-resolver.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogService } from './system/dialog.service';
import { LabelService } from './localization/label.service';
import { TranslateService } from './localization/translate.service';
import { PostService } from './blog/post.service';
import { PostResolverService } from './blog/post-resolver.service';
import { PostListResolverService } from './blog/post-list-resolver.service';
import { WidgetResolverService } from './widget/widget-resolver.service';
import { WidgetService } from './widget/widget.service';
import { WidgetListResolverService } from './widget/widget-list-resolver.service';
import { FiltersSettingsService } from './settings/filters-settings.service';
import { GracePeriodFilterResolverService } from './settings/grace-period-filter-resolver.service';

@NgModule({
  imports: [CommonModule, DropzoneModule, MatDialogModule, MatCardModule],
  declarations: [
    SingleFileUploaderComponent,
    SingleImageUploaderComponent,
    UserRolesEnumTranslatePipe,
    UserRolesTranslatePipe,
    DiscountTypesPipe,
    UserStatesPipe,
    MailAddressTypesPipe,
    CropTextPipe,
    NumberToMonthPipe,
    StatusRenderPipe,
    CommissionTypeRenderPipe,
    CommissionStatusRenderPipe,
    CommissionValRenderPipe,
    StatusRenderPipe,
    FranchiseeInvoiceStatusPipe,
    CommissionTypePipe,
    GetReservationStatusPipe,
    EnumToArrayPipe,
    YesNoPipe,
    FuelTypePipe,
    GearTypePipe,
    DialogComponent
  ],
  providers: [
    Overlay,
    ListSettingsService,
    NotificationService,
    FranchiseeService,
    FranchiseeResolverService,
    FranchiseeListResolverService,
    AuthService,
    AuthGuard,
    WelcomeGuard,
    PasswordResetTokenGuard,
    LoggedInGuard,
    UserProfileResolverService,
    UserProfileListResolverService,
    UserProfileService,
    InviteUserResolverService,
    VersionInterceptor,
    SubFranchiseeService,
    MessageDefinitionService,
    MessageService,
    PasswordService,
    PageService,
    PageResolverService,
    WidgetService,
    WidgetResolverService,
    WidgetListResolverService,
    CountryPageResolverService,
    PageListResolverService,
    LanguageService,
    LocationListResolverService,
    LocationResolverService,
    LocationVehicleResolverService,
    CountryService,
    LocationService,
    VehicleListResolverService,
    VehicleResolverService,
    VehicleImageResolverService,
    VehicleService,
    VehicleImageService,
    VehicleCategoryService,
    TranslationSettingsService,
    TranslationSettingsResolverService,
    GracePeriodFilterResolverService,
    CountryPageUrlService,
    CountryImageResolverService,
    CountryImageService,
    CountryResolverService,
    LabelService,
    TranslateService,
    PostService,
    PostResolverService,
    PostListResolverService,
    FiltersSettingsService,
    { provide: HTTP_INTERCEPTORS, useClass: ConnectionInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: VersionInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: MatDialogRef, useValue: {} },
    DialogService
  ],
  exports: [
    SingleFileUploaderComponent,
    SingleImageUploaderComponent,
    UserRolesEnumTranslatePipe,
    UserRolesTranslatePipe,
    DiscountTypesPipe,
    UserStatesPipe,
    MailAddressTypesPipe,
    CropTextPipe,
    NumberToMonthPipe,
    StatusRenderPipe,
    CommissionTypeRenderPipe,
    CommissionStatusRenderPipe,
    CommissionValRenderPipe,
    StatusRenderPipe,
    FranchiseeInvoiceStatusPipe,
    CommissionTypePipe,
    GetReservationStatusPipe,
    EnumToArrayPipe,
    YesNoPipe,
    FuelTypePipe,
    GearTypePipe,
    DialogComponent,
  ],
})
export class ServicesModule {}
