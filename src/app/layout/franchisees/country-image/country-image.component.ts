import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SingleImageUploaderComponent } from '../../../shared/components/single-image-uploader/single-image-uploader.component';
import { CountryImageViewModel } from '../../../shared/models/franchisee/country-image-view-model.model';
import { MessageCodes } from '../../../shared/models/system/message-codes';
import { CountryImageService } from '../../../shared/services/franchisee/country-image.service';
import { CountryService } from '../../../shared/services/franchisee/country.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { SpinnerOverlayService } from '../../../shared/services/spinner-overlay.service';
import { DialogService } from '../../../shared/services/system/dialog.service';

@Component({
  selector: 'app-country-image',
  templateUrl: './country-image.component.html',
  styleUrls: ['./country-image.component.css']
})
export class CountryImageComponent implements OnInit {

  @ViewChild(SingleImageUploaderComponent)
  public fileUpload: SingleImageUploaderComponent;
  public subscription = new Subscription();
  public isOpenDropZone = false;
  public countryUid: string;
  public countryName: string;

  public countryImage: CountryImageViewModel;
  image: any;


  constructor(private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private spinnerService: SpinnerOverlayService,
    private cis: CountryImageService,
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer,
    private dialogservice: DialogService,
    private countryService: CountryService,
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe((res: { uid: string }) => {
        this.countryUid = res.uid;
        if (this.countryUid) {
          this.cis.showCountryImage(this.countryUid).subscribe(res => {
            if (res && res.size) {
              this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res));
            }
          },
          (err) => {
              if (err.status === 404) {
                return;
              }
              throw err;
            })
        }
      }),
    );
    this.subscription.add(
      this.route.data.subscribe((data: { image: any }) => {
        if (data && data.image)
          this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.image));;
        console.log(!this.image)
      },
        (err) => {
          if (err.status === 404) {
            return;
          }
          throw err;
        }),
    );
    this.countryService.getCountry(this.countryUid).subscribe(res => {
      this.countryName = res.name;
    });
  }

  uploadImage(event) {
    this.spinnerService.show();
    this.cis.saveCountryImage(this.countryUid, this.fileUpload.file)
      .subscribe({
        next: () => {
          this.cis.showCountryImage(this.countryUid).subscribe(res => {
            if (res) {
              this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res));
            }
          });
          this.spinnerService.hide();
          this.fileUpload.deleteAttachment();
          this.isOpenDropZone = false;
        },
        error: (err) => {
          if (err.errorCode === MessageCodes.ImageIsEmptyError) {
            this.notificationService.showWarningMessage(MessageCodes.ImageIsEmptyError);
          }
          if (err.errorCode === MessageCodes.ImageMinWidthError) {
            this.notificationService.showWarningMessage(MessageCodes.ImageMinWidthError);
          }
          if (err.errorCode === MessageCodes.ImageAspectRatioError) {
            this.notificationService.showWarningMessage(MessageCodes.ImageAspectRatioError);
          }
          if (err.status === 409) {
            this.notificationService.showErrorMessage(err.error.errorCode);
          }
          this.spinnerService.hide();
          this.fileUpload.deleteAttachment();
        }
      });

  }

  openDropZone(e: Event): void {
    e.stopPropagation();
    this.isOpenDropZone = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteImage() {
    this.spinnerService.show();


    this.dialogservice.twoButtons("Country images", "Do you really want to delete image?", "Yes", "No").subscribe(result => {
      if (result == 0) {
        this.spinnerService.show();
        this.cis
          .deleteImage(this.countryUid)
          .subscribe({
            next: (data) => {
              this.spinnerService.hide();
              this.isOpenDropZone = false;
              this.image = null;
              this.notificationService.showSuccessMessage(
                MessageCodes.CountryImageDeleteSuccess,
              );
            },
            error: (response) => {
              this.fileUpload.deleteAttachment();
              this.spinnerService.hide();
              if (response.error.errorCode == MessageCodes.CountryImageDeleteError) {
                this.notificationService.showErrorMessage(MessageCodes.CountryImageDeleteError);
              }

            },
          });

      }

    });

  }
}
