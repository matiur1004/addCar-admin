// Code behind logic for PostDetailsComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnInit, ErrorHandler, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '@app-shared/services/notification.service';
import { Converters } from '@app-shared/common/converters';
import { ClientControlValidators } from '@app-shared/common/client-control-validators';
import { PostViewModel } from '../../../shared/models/blog/post-view-model.model';
import { PostService } from '../../../shared/services/blog/post.service';
import { SingleImageUploaderComponent } from '../../../shared/components/single-image-uploader/single-image-uploader.component';
import { DialogService } from '../../../shared/services/system/dialog.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TextEntryViewModel } from '../../../shared/models/localization/text-entry-view-model.model';
import { ContentEditorComponent } from '../../../shared/components/content-editor/content-editor.component';
import { MessageCodes } from '../../../shared/models/system/message-codes';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';

@Component({
  styleUrls: ['./post-details.component.css'],
  templateUrl: './post-details.component.html'
})

export class PostDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  public formGroup: FormGroup;



  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver
  currentModel: PostViewModel;
  submitted = false;
  isSubmitting = false;

  //image
  @ViewChild(SingleImageUploaderComponent)
  public fileUpload: SingleImageUploaderComponent;
  public isOpenDropZone = false;
  image: any;

  //content
  @ViewChild('contentEditor')
  public contentEditor: ContentEditorComponent;

  // convenience getter for easy access to form fields
  get fields() { return this.formGroup.controls; }

  constructor(private formBuilder: FormBuilder,
    private defaultService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
    private errorHandler: ErrorHandler,
    private sanitizer: DomSanitizer,
    private dialogservice: DialogService) {

  }

  ngAfterViewInit(): void {
    this.contentEditor.value = this.currentModel.content;
    this.contentEditor.save();
  }

  ngOnInit() {
    this.navigationService.setContextVariable("entityName", "Post");
    this.navigationService.setContextVariable("entityLink", "posts");
    this.routeDataSubscription = this.route.data.subscribe((data: { post: PostViewModel }) => {
      this.currentModel = data.post;
      if (this.currentModel) {
        this.createForm();
        if (this.currentModel.imageBase64)
          this.image = "data:image/jpeg;base64," + this.currentModel.imageBase64;
      }
    });
    this.loadLists();
  }

  private loadLists() {

  }

  //Applied to a new form
  //Requires unsubscribe
  createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      title: new FormControl(this.currentModel.title, Validators.compose([Validators.required, Validators.maxLength(255)])),
      author: new FormControl(this.currentModel.author, Validators.compose([Validators.required, Validators.maxLength(50)])),
      minutesToRead: new FormControl(this.currentModel.minutesToRead, Validators.compose([ClientControlValidators.isValidIntegerNumber, Validators.min(0), Validators.max(120)])),
      content: new FormControl(this.currentModel.content, Validators.compose([Validators.required, Validators.maxLength(2500000)])),
      alt: new FormControl(this.currentModel.alt, Validators.maxLength(255)),
      brief: new FormControl(this.currentModel.brief, Validators.compose([Validators.required, Validators.maxLength(50000)])),
      url: new FormControl(this.currentModel.url, Validators.compose([Validators.required, Validators.maxLength(255)])),
    });

    //Change event subscriptions



  }

  //Applied after the model saved
  updateForm() {
    this.formGroup.patchValue({
      title: this.currentModel.title,
      author: this.currentModel.author,
      minutesToRead: this.currentModel.minutesToRead,
      content: this.currentModel.content,
      alt: this.currentModel.alt,
      brief: this.currentModel.brief,
      url: this.currentModel.url,
    });
  }

  //Update the model with the form values
  private applyForm() {
    this.currentModel.title = this.formGroup.controls["title"].value;
    this.currentModel.author = this.formGroup.controls["author"].value;
    this.currentModel.minutesToRead = this.formGroup.controls["minutesToRead"].value;
    this.currentModel.content = this.formGroup.controls["content"].value;
    this.currentModel.alt = this.formGroup.controls["alt"].value;
    this.currentModel.brief = this.formGroup.controls["brief"].value;
    this.currentModel.url = this.formGroup.controls["url"].value;
    this.currentModel.imageBase64 = this.image?.replace("data:image/jpeg;base64,", "");
  }

  publish() {
    this.currentModel.isPublished = true;
    this.save();
  }

  saveDraft() {
    this.currentModel.isPublished = false;
    this.save();
  }

  //Save the model and update it from the service
  save() {
    this.contentEditor.save();
    this.formGroup.controls["content"].setValue(this.contentEditor.value);
    this.submitted = true;
    if (this.isValid()) {
      this.applyForm();
      this.isSubmitting = true;
      this.formGroup.disable();
      this.defaultService.savePost(this.currentModel).subscribe(res => {
        this.isSubmitting = false;
        this.formGroup.enable();
        this.notificationService.showSuccess("PostViewModel was successfully saved");
        //this.currentModel = res;
        //this.updateForm();
        this.router.navigateByUrl(`/content-management/posts/${res.uid}`);
      },
        err => {
          if (err.status === 401) {
            /*
            const dialogRef = this.dialog.open(ErrorDialogComponent, {
              data: {
                title: "Operation error",
                content: "You are not authorized to perform this action."
              }
            });

            dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl("home"));*/
            this.notificationService.showError("You are not authorized to perform this action");
            this.router.navigateByUrl("/");
          }
          this.isSubmitting = false;
          this.formGroup.enable();
          throw err;
        }
      );
    }
  }

  //Validate the control
  isValid(): boolean {
    const result = this.formGroup.valid;
    //if (this.formGroup.controls["content"].value && this.formGroup.controls["content"].value.length > 50000) {

    if (this.contentEditor && this.contentEditor.editor && this.contentEditor.editor.text.length > 2500000) {
      this.notificationService.showErrorMessage(MessageCodes.ContentTextTooLargeError);
    }
    return result;
  }

  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.routeDataSubscription)
      this.routeDataSubscription.unsubscribe();


  }

  //image
  openDropZone(e: Event): void {
    e.stopPropagation();
    this.isOpenDropZone = true;
  }

  deleteImage() {
    this.dialogservice
      .twoButtons("Post image", "Do you really want to delete image?", "Yes", "No")
      .subscribe(result => {
        if (result == 0) {
          this.isOpenDropZone = false;
          this.image = null;
          //this.fileUpload.deleteAttachment();
        }
      });
  }

  uploadImage(event) {
    
    this.currentModel.imageSize = event.file.size;
    this.image = event.image;
    

    //this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res));

    // this.fileUpload.deleteAttachment();
    this.isOpenDropZone = false;



  }
}
