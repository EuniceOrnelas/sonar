import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CopilotComponent } from './copilot/copilot.component';

const routes: Routes = [
  { path: 'copilot', component: CopilotComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
