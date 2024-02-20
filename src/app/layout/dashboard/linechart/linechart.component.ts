import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {

  constructor() { }
  type = 'Line';
  data = [
    ["Jan", 7],
    ["Feb", 61],
    ["Mar", 91],
    ["Apr", 14],
    ["May", 18],
    ["Jun", 21],
    ["Jul", 25],
    ["Aug", 26],
    ["Sep", 23],
    ["Oct", 183],
    ["Nov", 139],
    ["Dec", 93]
  ];
  label: 'Anthracnose';
  columnNames = ["Month", "Visitor"];
  options = {
    colors: ['#D2042D'],

    legend: { position: 'top' },
    hAxis: {
      title: 'Month'
    },
    vAxis: {
      title: 'Visitor'
    },
  };
  width = 450;
  height = 400;
  ngOnInit(): void {
  }

}
