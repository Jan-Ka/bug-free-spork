import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bug-free-spork';
  displayedColumns: string[] = ['rowNumber'];
  dataSource = [
    {
      rowNumber: 1
    },
    {
      rowNumber: 2
    }
  ];
}
