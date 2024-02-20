import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientControlValidators } from 'app/shared/common/client-control-validators';

@Component({
  selector: 'app-min-price-filter-detail',
  templateUrl: './min-price-filter-detail.component.html',
  styleUrls: ['./min-price-filter-detail.component.css']
})
export class MinPriceFilterDetailComponent implements OnInit {

  detail: any;
  lastSeason: any;

  monthNameArray = ['', "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  minFromDate = new Date(`${new Date().getFullYear()}-01-01`);
  maxFromDate = new Date(`${new Date().getFullYear()}-12-31`);
  minToDate = new Date(`${new Date().getFullYear()}-01-01`);
  maxToDate = new Date(`${new Date().getFullYear()}-12-31`);

  public formGroup: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<MinPriceFilterDetailComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private readonly formBuilder: FormBuilder,
  ) { 
    this.detail = data['detail'];
    this.lastSeason = data['lastSeason'];
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
      minPrice: [0, [Validators.required, ClientControlValidators.number({min: 1})]]
    });
    if(this.detail) {
      this.formGroup.patchValue({
        minPrice: this.detail['minPrice'],
        fromDate: this.convertMonthToDate(this.detail.from),
        toDate: this.convertMonthToDate(this.detail.to)
      })
    } else {
      if(this.lastSeason) {
        if(this.lastSeason.to == '31 - Dec') {
          this.formGroup.get('fromDate').setValue(new Date(`${new Date().getFullYear()}-01-01`));
          this.formGroup.get('toDate').setValue(new Date(`${new Date().getFullYear()}-01-02`));
        } else {
          //this.minPriceFilterSeasons[index]['from'] = this.convertDateToFormmatedString(new Date(new Date(start).setDate(new Date(start).getDate() + 1)))
          let lastDate = this.convertMonthToDate(this.lastSeason.to);
          let nextLastDate = new Date(new Date(lastDate).setDate(new Date(lastDate).getDate() + 1))
          this.formGroup.get('fromDate').setValue(lastDate);
          this.formGroup.get('toDate').setValue(nextLastDate);
        }
      }
    }

    this.formGroup.get('fromDate').valueChanges.subscribe(res => {
      if(res) this.minToDate = res;
    })

    this.formGroup.get('toDate').valueChanges.subscribe(res => {
      if(res) this.maxFromDate = res;
    })
  }

  convertMonthToDate(dateStr) {
    let month = this.monthNameArray.indexOf(dateStr.split(' - ')[1]);
    let day = dateStr.split(' - ')[0];
    return new Date(`${new Date().getFullYear()}-${month}-${day}`);
  }

  convertDateToString(date: Date) {
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = (date.getDate()).toString().padStart(2, '0');
    return day + month;
  }

  save() {
    let formData = this.formGroup.value;
    formData = {
      ...formData,
      fromDate: this.convertDateToString(formData['fromDate']),
      toDate: this.convertDateToString(formData['toDate']),
    };
    this.dialogRef.close(formData);
    
  }

  close(result) {
    this.dialogRef.close(result);
  }

}
