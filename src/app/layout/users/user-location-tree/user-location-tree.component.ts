// Code behind logic for UserLocationTreeComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LocationTreeItem } from '@app-shared/models/location-tree-item.model';

@Component({
  selector: 'app-user-location-tree',
  templateUrl: './user-location-tree.component.html',
})
export class UserLocationTreeComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('inputModel')
  public set currentModel(val: LocationTreeItem) {
    this._currentModel = val;
    if (this.formGroup) {
      this.updateForm();
    } else {
      this.createForm();
    }
  }

  public formGroup: FormGroup;

  private _currentModel: LocationTreeItem;

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  public get currentModel(): LocationTreeItem {
    return this._currentModel;
  }

  public submitted = false;

  // convenience getter for easy access to form fields
  public get fields() {
    return this.formGroup.controls;
  }

  constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit() {
    if (this.currentModel) {
      this.createForm();
    }
    this.loadLists();
  }

  private loadLists() {}

  //Applied to a new form
  //Requires unsubscribe
  public createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({});

    //Change event subscriptions
  }

  //Applied after the model saved
  public updateForm() {
    this.formGroup.patchValue({});
  }

  //Update the model with the form values
  private applyForm() {}

  //Save the model and update it from the service
  public save() {
    this.submitted = true;
    if (this.isValid) {
      this.applyForm();
      this.updateForm();
    }
  }

  public enable() {
    this.formGroup.enable();
  }

  public disable() {
    this.formGroup.disable();
  }

  //Validate the control
  public get isValid(): boolean {
    return this.formGroup.valid;
  }

  //Unsubscribe from subscriptions here
  public ngOnDestroy() {}
}
