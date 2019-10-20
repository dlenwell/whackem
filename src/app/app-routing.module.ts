import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttractorComponent } from './attractor/attractor.component';
import { ExplainerComponent } from './explainer/explainer.component';
import { GameComponent } from './game/game.component';
import { FinishComponent } from './finish/finish.component';

const routes: Routes = [
  { path: '', component: AttractorComponent },
  { path: 'explainer', component: ExplainerComponent },
  { path: 'game', component: GameComponent },
  { path: 'finish', component: FinishComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
