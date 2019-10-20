import { Component,
         OnInit,
         HostBinding,
         EventEmitter,
         Input,
         OnDestroy,
         Output
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MoleService } from '../mole.service';

// including jquery its so much better at animations.
declare var $: any;

@Component({
  selector: 'app-mole',
  templateUrl: './mole.component.html',
  styleUrls: ['./mole.component.css'],
})

/*  MoleComponent
contains all of the control code for the moles and their holes.
 */
export class MoleComponent implements OnDestroy {
  id: number;

  messages: any[] = [];
  subscription: Subscription;

  @Input() myid: string;


  // TODO: put all of these in a popup
  popUpMax = 3000;
  popUpMin = 500;
  popUpSpeed = 800;
  popDownMax = 8000;
  popDownMin = 300;
  popDownSpeed = 800;
  moleCount = 34;
  decideWeight = 2;  // the number of positive results from shouldEye before it pops
  decideMax = 3000;
  decideMin = 500;

  // localized variabls
  moleNumber = 1;
  moleImage = 'm01.png';

  //@HostBinding('class.is-up')
  isUp = false;

  // TODO: add functionality that won't reuse cards you already hit
  whackedMoles = {};

  setUp() {
    this.isUp = true;
  }
  setDown() {
    this.isUp = false;
  }

  /* randomInterval
  returns a random number between the supplied inputs, if only one
  is supplied it assumes the minimum is 1.
   */
  randomInterval(maximum, minimum=1) {
    return(Math.floor(Math.random() * maximum) + minimum);
  }

  /* popUp
  makes this mole pop up.
   */
  popUp() {
    let thisID = `#${this.myid}_mole`;
    let hangTime = this.randomInterval(this.popUpMax, this.popUpMin)

    $(thisID).animate({
      top: '-140px',
    }, this.popUpSpeed);

    setTimeout(() => { this.setUp(); }, this.popUpSpeed);
    setTimeout(() => { this.popDown(); }, hangTime);
  }

  /* popDown
  makes this mole pop down.
   */
  popDown() {
    let thisID = `#${this.myid}_mole`;
    let hideTime = this.randomInterval(this.popDownMax, this.popDownMin);

    //console.log(`popDown triggered for ${thisID}`);

    $(thisID).animate({
      top: '150px',
    }, this.popDownSpeed);


    // set is up to false
    setTimeout(() => { this.setDown(); }, this.popDownSpeed);
    setTimeout(() => { this.decide(); }, hideTime);
  }

  /* shouldEye
  This funciton returns a random boolean value
   */
  shouldEye() {
    return(Math.random() >= 0.5);
  }

  /* decide
  This funciton decides if the mole will pop or not.
   */
  decide() {
    let count = 0;
    let decision = true;

    while (count < this.decideWeight){
      if (!this.shouldEye()) {
        decision = false;
        break;
      }
      count++;
    }

    if (decision) {
      this.popUp();
    } else {
      setTimeout(
        () => {
          this.decide()
        },
        this.randomInterval(
          this.decideMax,
          this.decideMin
        )
      );
    }
  }

  /* chooseMole
    picks one of the available mole chars to swap between pops
   */
  chooseMole() {
    let zero = '';
    this.moleNumber = this.randomInterval(this.moleCount);
    if (this.moleNumber < 10) {
       zero = '0';
    }
    return(`m${zero}${this.moleNumber}.png`);
  }

  /* hit
  triggered when the mole is hit
   */
  hitAttempt() {
    console.log(`mole:${this.myid}: checking for hit`);

    if( this.isUp ) {
      console.log(`mole:${this.myid}: OUCH!! emitting point notifications`);
      this.sendPoint();
      //this.reportPoint.emit(1);

    } else {
      console.log(`mole:${this.myid}: missed me sucker!!`);
    }
  }

  /* constructor
   */
  constructor(
      private moleService:MoleService
  ){  // subscribe to home component messages
    this.subscription = this.moleService.getMessage().subscribe(message => {
      if (message) {
        if (message['text'] == this.myid) {
          console.log(`moleComonent/${this.myid}: its mine`);
          this.hitAttempt();
          this.messages.push(message);
        }
      } else {
        this.messages = [];
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  /* ngAfterViewInit
   */
  ngAfterViewInit() {
    console.log(`DOM loaded ${this.myid}`);

    // start the deciscion train
    setTimeout(() => { this.decide(); },
      this.randomInterval(
        this.decideMax,
        this.decideMin
      )
    );
  }

  /* ngOnInit
   */
  ngOnInit() {
    this.moleImage = this.chooseMole();
  }

  sendPoint(): void {
    // send message to subscribers via observable subject
    console.log(`game/sendPoint`);
    this.moleService.sendPoint('');
  }

  clearPoints(): void {
    // clear points
    this.moleService.clearPoints();
  }

}
