import {
  Component, Renderer2, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MoleService } from '../mole.service';

// enables the jquery $ function.
declare var $: any;

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})

export class PointsComponent implements AfterViewInit {
  @ViewChild('points_inner' , {static: false}) divView: ElementRef;
  points: any[] = [];
  subscription: Subscription;
  pointTemplate = '<div class="point"> </div>';

  /* constructor
   */
  constructor(
    private renderer: Renderer2,
    private moleService:MoleService
  ){  // subscribe to home component messages
    this.subscription = this.moleService.getPoint().subscribe(point => {
      if (point) {
        console.log(`PointsComponent: recieved point`);
        this.addElement();
        this.points.push(point);
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    // child is set
  }

  addElement() {
    const newPoint: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(newPoint, 'point');
    this.renderer.appendChild(this.divView.nativeElement, newPoint);
  }
}
