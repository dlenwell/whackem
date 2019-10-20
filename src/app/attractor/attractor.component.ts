import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attractor',
  templateUrl: './attractor.component.html',
  styleUrls: ['./attractor.component.css']
})
export class AttractorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  inputCallback(event) {
    console.log('### attractor input callback triggered ');
  }
}
