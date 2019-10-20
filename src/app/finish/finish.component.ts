import { Renderer2, ElementRef, OnInit, Component} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
declare var $: any;

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})

export class FinishComponent implements OnInit {

  // local costants
  constraining_height = 0;
  scale = 1;


  constructor(private el: ElementRef,
              private renderer: Renderer2){}

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
  inputCallback(event) {
    console.log('### finish input callback triggered ');
  }
  ngOnInit() {}

}
