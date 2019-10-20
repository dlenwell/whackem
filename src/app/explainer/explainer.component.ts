import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explainer',
  templateUrl: './explainer.component.html',
  styleUrls: ['./explainer.component.css']
})
export class ExplainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  inputCallback(event) {
    console.log('### explainer input callback triggered ');
  }
}
