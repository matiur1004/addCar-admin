import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-areachart',
  templateUrl: './areachart.component.html',
  styleUrls: ['./areachart.component.css']
})
export class AreachartComponent implements OnInit {

  constructor() { }
  title = 'Area Chart';
  type = 'AreaChart';
  data = [
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540]
  ];
  columnNames = ['Year', 'Sales', "Expenses"];
  options = {
    legend: { position: 'top', maxLines: 3 },
    colors: ['#D2042D', '#931314'],

    isStacked: true,
    hAxis: {
      title: 'Year'
    }
  };
  width = 430;
  height = 400;
  ngOnInit(): void {
  }

}
