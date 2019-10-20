import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularResizedEventModule } from 'angular-resize-event';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AttractorComponent } from './attractor/attractor.component';
import { ExplainerComponent } from './explainer/explainer.component';
import { GameComponent } from './game/game.component';
import { FinishComponent } from './finish/finish.component';
import { ClockComponent } from './clock/clock.component';
import { MoleComponent } from './mole/mole.component';
import { ConsoleComponent } from './console/console.component';
import { MoleService } from './mole.service';
import { PointsComponent } from './points/points.component';

@NgModule({
  declarations: [
    AppComponent,
    AttractorComponent,
    ExplainerComponent,
    GameComponent,
    FinishComponent,
    ClockComponent,
    MoleComponent,
    ConsoleComponent,
    PointsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularResizedEventModule
  ],
  providers: [MoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
