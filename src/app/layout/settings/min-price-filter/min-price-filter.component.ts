import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppValidators } from 'app/shared/common/app-validators';
import { FranchiseeShortListItem } from 'app/shared/models/franchisee-short-list-item.model';
import { MinPriceFilterSeasonListItem } from 'app/shared/models/settings/min-price-filter-season-list-item.model';
import { AutocompleteHelper } from 'app/shared/services/autocomplete.helper';
import { FranchiseeService } from 'app/shared/services/franchisee/franchisee.service';
import { FiltersSettingsService } from 'app/shared/services/settings/filters-settings.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MinPriceFilterDetailComponent } from '../min-price-filter-detail/min-price-filter-detail.component';
import { ClientControlValidators } from 'app/shared/common/client-control-validators';
import { SpinnerOverlayService } from 'app/shared/services/spinner-overlay.service';

@Component({
  selector: 'app-min-price-filter',
  templateUrl: './min-price-filter.component.html',
  styleUrls: ['./min-price-filter.component.css']
})
export class MinPriceFilterComponent implements OnInit {

  selectedFranchisee: any;
  minPriceFilterSeasons: MinPriceFilterSeasonListItem[] = [];
  monthNameArray = ['', "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  franchisees: FranchiseeShortListItem[] = [];
  currentYear = new Date().getFullYear();

  public formGroup: FormGroup;
  public franchiseeNameHelper: AutocompleteHelper<FranchiseeShortListItem>;

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private readonly franchiseeService: FranchiseeService,
    private filterSettingsService: FiltersSettingsService,
    private readonly formBuilder: FormBuilder,
    private dialog: MatDialog,
    private spinnerService: SpinnerOverlayService
  ) {
    this.franchiseeNameHelper = new AutocompleteHelper<FranchiseeShortListItem>();
    this.franchiseeNameHelper.loader = (name) => this.franchiseeService.findFranchisees(name);
    this.franchiseeNameHelper.filter = (term, list) =>
      AutocompleteHelper.franchiseeListFilter(term, list);
    this.franchiseeNameHelper.formatter = (result) => result.name;
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.franchiseeService.findFranchisees('', true)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.franchisees = res;
        this.selectedFranchisee = res[0];
        this.formGroup.get('franchiseeUid').setValue(this.selectedFranchisee.uid);
        this.getMinPriceFilter(this.selectedFranchisee.uid);
      })
    this.formGroup = this.formBuilder.group({
      franchiseeUid: [
        null,
        [Validators.required],
      ],
      defaultMinPrice: [null, [Validators.required, ClientControlValidators.number({ min: 0, max: 100 })]]
    });

    this.formGroup.controls['franchiseeUid'].valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((franchiseeUid) => {
        this.selectedFranchisee = this.franchisees.find(item => item.uid == franchiseeUid);
        this.getMinPriceFilter(this.selectedFranchisee.uid);
      });
  }

  getMinPriceFilter(uid) {
    this.spinnerService.show();
    this.filterSettingsService.getMinPriceFilter(uid)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        this.minPriceFilterSeasons = this.configureMinPriceFilters(result.seasons);
        this.spinnerService.hide();
      }, err => {this.spinnerService.hide()});
  }

  configureMinPriceFilters(seasons) {
    return seasons.map((season, index) => {
      let fromDt = this.convertToFormattedDate(season.from);
      let toDt = this.convertToFormattedDate(season.to);
      season = { ...season, isExtendBackwards: false, isExtendForwards: false };
      // config extend backwards
      if (index > 0) {
        let dateStart = new Date(`2023-${season.from.substring(2, 4)}-${season.from.substring(0, 2)}`);
        let datePrev = new Date(`2023-${seasons[index - 1].to.substring(2, 4)}-${seasons[index - 1].to.substring(0, 2)}`);
        if (this.getDiffDates(datePrev, dateStart) > 1) {
          season = { ...season, isExtendBackwards: true };
        }
      } else {
        if (season.from != '0101') season = { ...season, isExtendBackwards: true };
      }

      // config extend forwards
      if (index == seasons.length - 1) {
        if (season.to != '3112') season = { ...season, isExtendForwards: true };
      } else {
        let dateStart = new Date(`2023-${season.to.substring(2, 4)}-${season.to.substring(0, 2)}`);
        let dateNext = new Date(`2023-${seasons[index + 1].from.substring(2, 4)}-${seasons[index + 1].from.substring(0, 2)}`);
        if (this.getDiffDates(dateStart, dateNext) > 1) {
          season = { ...season, isExtendForwards: true };
        }
      }
      season = { ...season, from: fromDt, to: toDt };
      return season;
    });
  }

  convertToFormattedDate(dateStr) {
    return dateStr.substring(0, 2) + ' - ' + this.monthNameArray[Number(dateStr.substring(2, 4))];
  }

  getDiffDates(date1: Date, date2: Date) {
    let difference = Math.abs(date2.getTime() - date1.getTime());
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return totalDays;
  }

  onEdit(item: MinPriceFilterSeasonListItem, index = 0) {
    this.openDetailDialog(item, index);
  }

  onAdd() {
    this.openDetailDialog();
  }

  openDetailDialog(item = null, index = -1) {
    this.dialog.open(MinPriceFilterDetailComponent, { width: '500px', data: { detail: item, lastSeason: this.minPriceFilterSeasons[this.minPriceFilterSeasons.length - 1] } })
      .afterClosed().subscribe((res) => {
        if (res) {
          let result = {
            ...res,
            from: this.convertToFormattedDate(res['fromDate']),
            to: this.convertToFormattedDate(res['toDate'])
          };

          this.minPriceFilterSeasons = this.adjustPeriods(this.minPriceFilterSeasons, result);

          this.updateMinPriceFilterReasons();
        }
      });
  }

  adjustPeriods(filters, item) {
    if (filters.length === 0) {
      return [item];
    }

    let itemFromDt = this.convertToDate(item.from);
    let itemToDt = this.convertToDate(item.to);
    const updatedValue = [];

    if (itemToDt < this.convertToDate(filters[0].from)) updatedValue.push({ ...item });
    for (const arr of filters) {
      const start = this.convertToDate(arr.from);
      const end = this.convertToDate(arr.to);

      if (end < itemFromDt || start > itemToDt) {
        updatedValue.push({ ...arr });
      } else {
        // Overlap detected, adjust the ranges accordingly
        if (start < itemFromDt) {
          let newPeriod = { ...arr, to: this.convertDateToFormmatedString(new Date(new Date(itemFromDt).setDate(new Date(itemFromDt).getDate() - 1))) };
          updatedValue.push({ ...newPeriod });
        }
        if (end > itemToDt) {
          let newPeriod = { ...arr, from: this.convertDateToFormmatedString(new Date(new Date(itemToDt).setDate(new Date(itemToDt).getDate() + 1))) }
          updatedValue.push({ ...newPeriod });
        }

        if (!updatedValue.find(obj => obj.from == item.from && obj.to == item.to))
          updatedValue.push({ ...item });

      }
    }
    if (itemFromDt > this.convertToDate(filters[filters.length - 1].to)) updatedValue.push({ ...item });

    updatedValue.sort((a, b) => this.convertToDate(a.from) - this.convertToDate(b.from));
    return updatedValue;
  }

  convertToDateString(dateStr) {
    return dateStr.split(' - ')[0] + this.monthNameArray.indexOf(dateStr.split(' - ')[1]).toString().padStart(2, '0');
  }

  convertToDate(dateStr): number {
    let date = new Date(`${this.currentYear}-${this.monthNameArray.indexOf(dateStr.split(' - ')[1]).toString().padStart(2, '0')}-${dateStr.split(' - ')[0]}`);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date.getTime();
  }

  convertDateToFormmatedString(date: Date) {
    let month = (date.getMonth() + 1);
    let day = (date.getDate()).toString().padStart(2, '0');
    return day + ' - ' + this.monthNameArray[month];
  }

  onRemove(index) {
    this.minPriceFilterSeasons.splice(index, 1);
    this.updateMinPriceFilterReasons();
  }

  onBackwards(index: number) {
    if (index == 0) {
      this.minPriceFilterSeasons[index]['from'] = '01 - Jan';
    } else {
      let start = this.convertToDate(this.minPriceFilterSeasons[index - 1]['to']);
      this.minPriceFilterSeasons[index]['from'] = this.convertDateToFormmatedString(new Date(new Date(start).setDate(new Date(start).getDate() + 1)))
    }
    this.updateMinPriceFilterReasons();
  }

  onForwards(index: number) {
    if (index == this.minPriceFilterSeasons.length - 1) this.minPriceFilterSeasons[index]['to'] = '31 - Dec';
    else {
      let end = this.convertToDate(this.minPriceFilterSeasons[index + 1]['from']);
      this.minPriceFilterSeasons[index]['to'] = this.convertDateToFormmatedString(new Date(new Date(end).setDate(new Date(end).getDate() - 1)));
    }
    this.updateMinPriceFilterReasons();
  }

  updateMinPriceFilterReasons() {
    let defaultMinPrice = this.formGroup.get('defaultMinPrice').value;
    if (!this.minPriceFilterSeasons)
      this.minPriceFilterSeasons = [];
    this.spinnerService.show();
    let formData = this.minPriceFilterSeasons.map(item => {
      item = {
        ...item,
        from: this.convertToDateString(item.from),
        to: this.convertToDateString(item.to),
      };
      return item;
    });
    this.filterSettingsService.saveMinPriceFilter(this.selectedFranchisee.uid, { franchiseeUid: this.selectedFranchisee.uid, defaultMinPrice: defaultMinPrice, seasons: formData })
      .subscribe(res => {
        this.minPriceFilterSeasons = this.configureMinPriceFilters(formData);
        this.spinnerService.hide();
      }, err => {this.spinnerService.hide()});
  }

  //Unsubscribe from subscriptions here
  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
