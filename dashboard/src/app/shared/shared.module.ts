import { NgModule } from '@angular/core';
import {ServerSideDirective} from "./server-side.directive";
import {TypeaheadComponent} from "./typeahead.component";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports:[
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [ServerSideDirective, TypeaheadComponent],
  exports:[ServerSideDirective, TypeaheadComponent]
})
export class SharedModule {}
