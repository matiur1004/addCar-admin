import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'app-interpreter-labels',
  templateUrl: './interpreter-labels.component.html',
  styleUrls: ['./interpreter-labels.component.css']
})
export class InterpreterLabelsComponent implements OnInit {

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.setContextVariable("entityName", "Translation");
    this.navigationService.setContextVariable("entityLink", "labels");
  }

}
