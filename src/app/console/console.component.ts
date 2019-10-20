import {
  Component, OnInit, Output, EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {
  @Output() reportInput = new EventEmitter<string>();

  values = '';

  constructor(
    private router: Router,

  ) { }

  ngOnInit() {
  }

  onKey(event: any) { // without type info
    console.log(event.keyCode);
    this.values = '';
    console.log(this.router.url);
    switch(event.keyCode) {
      case 8: // backspace behavior
        console.log('backspace pressed');
        if (this.router.url == '/explainer') {
          this.router.navigateByUrl('/');
        }
        break;

      case 49: // pressed 1
        console.log('console/reportInput: one');
        this.reportInput.emit('one');

        break;

      case 50: // pressed 1
        console.log('2 pressed');
        this.reportInput.emit('two');
        break;

      case 51: // pressed 1
        console.log('3 pressed');
        this.reportInput.emit('three');
        break;

      case 52: // pressed 1
        console.log('4 pressed');
        this.reportInput.emit('four');
        break;

      case 53: // pressed 1
        console.log('5 pressed');
        this.reportInput.emit('five');
        break;

      case 54: // pressed 1
        console.log('6 pressed');
        this.reportInput.emit('six');
        break;

      case 112: // f1 key
        console.log('f1 pressed');

        break;

      case 113: // f2 key
        console.log('f2 pressed');
        if (this.router.url == '/game') {
          this.router.navigateByUrl('/finish');
        }
        break;

      default:
        // anykey
        console.log('anykey pressed');

        if (this.router.url == '/') {
          this.router.navigateByUrl('/explainer');
        }
        if (this.router.url == '/explainer') {
          this.router.navigateByUrl('/game');
        }
        if (this.router.url == '/finish') {
          this.router.navigateByUrl('/');
        }
    }
  }
}
