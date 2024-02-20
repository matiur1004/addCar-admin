import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  constructor() { }
  type: any = 'BarChart';
  data = [
    ["France", 100200, 204400],
    ["Norway", 180000, 23000],
    ["Belgium", 40030, 620003],
    ["Cortia", 150000, 112020],
    ["Finland", 100200, 80020],
    ["Poland", 1000, 802200],
    ["Czech Rep.", 1020020, 100210]
  ];
  columnNames = [ "","Assigned", "Pending"];
  options = {
    colors: ['#D2042D', '#931314'],
    legend: { position: 'top', maxLines: 3 },
    hAxis: {
      title: 'Reservations',
      minValue: 0,
     
    },
    vAxis: {
      title: 'Country',
     
    }
  };
  width = 400;
  height = 400;

  ngOnInit(): void {
  }

}
