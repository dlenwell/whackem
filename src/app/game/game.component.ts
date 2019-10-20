import {
  Renderer2, ElementRef, Component, Output,
  OnInit, Input, EventEmitter
} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { MoleComponent } from '../mole/mole.component';
import { ClockComponent } from '../clock/clock.component';
import { PointsComponent } from '../points/points.component';

import { MoleService } from '../mole.service';

// enables the jquery $ function.
declare var $: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

/* GameComponent
holes most of the main game logic

 */
export class GameComponent implements OnInit {
  @Input() mole: MoleComponent;
  @Input() clock: ClockComponent;

  constraining_height = 0;
  scale = 1;
  points = 0;


  // the parent container triggers this when it loads or on a resize.
  reportSize(event) {
    console.log("reportSize called");
    console.log(this.constraining_height)
    console.log(event.newHeight);
    this.constraining_height = event.newHeight ;
  }

  // shortly afte this is triggerd which calculates the ratio of the scaling
  // then because I suck at angular it uses jquery to actually apply the new
  // style to the nested container.
  onResized(event) {
    console.log("onResized called");
    console.log(event.newHeight);
    console.log('constraining:');
    console.log(this.constraining_height);

    this.scale = this.constraining_height / 1080 ;

    // jquery cheeting
    $("#very-specific-design").css({
      transform: `translate(-50%, -50%) scale(${this.scale})`
    });

    // to make it not jump around when it loads / scales.. the view
    // is covered with an absolutely positioned div that will fade away when
    // its done.
    $("#fader").fadeOut();
  }

  ngOnInit() { }
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private moleService: MoleService
  ) {}

  sendMessage(message): void {
    // send message to subscribers via observable subject
    console.log(`game/sendMessage: ${message}`);
    this.moleService.sendMessage(message);
  }

  clearMessages(): void {
    // clear messages
    this.moleService.clearMessages();
  }

  gameInput(message:string) {
    console.log(`game/gameInput: ${message}`);
    this.sendMessage(message);

  }
}
