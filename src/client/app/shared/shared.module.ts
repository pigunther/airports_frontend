import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PanelToolbarComponent } from './panelToolbar/panelToolbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PanelComponent } from './panel/panel.component';
import { NameListService } from './name-list/name-list.service';


import { PanelModule, ToolbarModule, ButtonModule, TooltipModule, CalendarModule, AutoCompleteModule } from 'primeng/primeng';

import { AccordionModule } from 'primeng/primeng';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PanelModule,
    ToolbarModule,
    ButtonModule,
    TooltipModule,
    CalendarModule,
    AutoCompleteModule],
  declarations: [
    ToolbarComponent,
    NavbarComponent,
    PanelComponent,
    PanelToolbarComponent],
  exports: [
    ToolbarComponent,
    NavbarComponent,
    PanelComponent,
    PanelToolbarComponent,
    CommonModule,
    FormsModule,
    RouterModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NameListService]
    };
  }
}
