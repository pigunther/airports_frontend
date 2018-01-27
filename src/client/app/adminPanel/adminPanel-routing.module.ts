import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminPanelComponent } from './adminPanel.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'admin', component: AdminPanelComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
