import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  constructor() { }

  @Input()
  error: string = null;

  ngOnInit() {
  }

}
