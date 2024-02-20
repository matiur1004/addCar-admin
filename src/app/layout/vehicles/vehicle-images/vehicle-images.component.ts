import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VehicleImageListItem} from '@app-shared/models/vehicle/vehicle-image-list-item.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {SpinnerOverlayService} from '@app-shared/services/spinner-overlay.service';
import {VehicleImageService} from '@app-shared/services/vehicle/vehicle-image.service';
import {
  SingleImageUploaderComponent
} from '@app-shared/components/single-image-uploader/single-image-uploader.component';
import {NotificationService} from 'app/shared/services/notification.service';
import {MessageCodes} from '@app-shared/models/system/message-codes';
import {MatDialog} from '@angular/material/dialog';
import {switchMap} from 'rxjs/operators';
import { DialogService } from '../../../shared/services/system/dialog.service';

@Component({
  selector: 'app-vehicle-images',
  templateUrl: './vehicle-images.component.html',
  styleUrls: ['./vehicle-images.component.css'],
})
export class VehicleImagesComponent implements OnInit, OnDestroy {
  @ViewChild(SingleImageUploaderComponent)
  public fileUpload: SingleImageUploaderComponent;
  public vehicleImages$: BehaviorSubject<Array<VehicleImageListItem>> = new BehaviorSubject<Array<VehicleImageListItem>>([]);
  public subscription = new Subscription();
  public isOpenDropZone = false;
  public vehicleUid: string;
  public sequenceNo: number | null = null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private spinnerService: SpinnerOverlayService,
    private vis: VehicleImageService,
    private notificationService: NotificationService,
    private dialogservice: DialogService,
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.route.params.subscribe((res: { uid: string }) => (this.vehicleUid = res.uid)),
    );
    this.subscription.add(
      this.route.data.subscribe((data: { vehicle: VehicleImageListItem[] }) => {
        this.vehicleImages$.next(data.vehicle);
      }),
    );
  }

  uploadVehicleImage(event) {
    this.spinnerService.show();
    this.vis
      .saveVehicleImage(this.vehicleUid, this.fileUpload.file, this.sequenceNo)
      .pipe(
        switchMap(() => {
          return this.vis.loadVehicleImages(this.vehicleUid);
        }),
      )
      .subscribe({
        next: (data) => {
          this.fileUpload.deleteAttachment();
          this.spinnerService.hide();
          this.notificationService.showSuccessMessage(MessageCodes.VehicleImageUploadSuccess);
          data[this.sequenceNo].imageFileUrl += '?' + Date.now(); //workaround to overcome the browser caching
          this.vehicleImages$.next(data);
          this.isOpenDropZone = false;
        },
        error: (response) => {
          this.fileUpload.deleteAttachment();
          this.spinnerService.hide();
          if (response.error.errorCode == MessageCodes.VehicleImageUploadError) {
            this.notificationService.showErrorMessage(MessageCodes.VehicleImageUploadError);
          }
          if (response.error.errorCode === MessageCodes.ImageIsEmptyError) {
            this.notificationService.showWarningMessage(MessageCodes.ImageIsEmptyError);
          }
          if (response.error.errorCode === MessageCodes.ImageMinWidthError) {
            this.notificationService.showWarningMessage(MessageCodes.ImageMinWidthError);
          }
          if (response.error.errorCode === MessageCodes.ImageAspectRatioError) {
            this.notificationService.showWarningMessage(MessageCodes.ImageAspectRatioError);
          }
          if (response.error.errorCode === MessageCodes.ImageFileFormatError) {
            this.notificationService.showErrorMessage(MessageCodes.ImageFileFormatError);
          }
        },
      });
  }

  openDropZone(e: Event, index: number): void {
    e.stopPropagation();
    this.isOpenDropZone = true;
    this.sequenceNo = index;
  }

  deleteImage(vehicleUid: string, uid: string) {


    this.dialogservice.twoButtons("Vehicle images", "Do you really want to delete image?", "Yes", "No").subscribe(result => {
      if (result==0) {
        this.spinnerService.show();
        this.vis
          .deleteVehicleImage(vehicleUid, uid)
          .pipe(
            switchMap(() => {
              return this.vis.loadVehicleImages(vehicleUid);
            }),
          )
          .subscribe({
            next: (data) => {
              this.sequenceNo = null;
              this.spinnerService.hide();
              this.notificationService.showSuccessMessage(
                MessageCodes.VehicleImageDeleteSuccess,
              );
              this.vehicleImages$.next(data);
            },
            error: (response) => {
              this.fileUpload.deleteAttachment();
              this.spinnerService.hide();
              if (response.error.errorCode == MessageCodes.VehicleImageDeleteError) {
                this.notificationService.showErrorMessage(MessageCodes.VehicleImageDeleteError);
              }
            },
          });
      }

    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
