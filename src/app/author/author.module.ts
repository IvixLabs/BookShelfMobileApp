import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthorRoutingModule} from "./author-routing.module";
import {AuthorListPage} from "./author-list.page";
import {AuthorApi} from "./author.api";
import {AuthorService} from "./author.service";
import {AuthorFormPage} from "./author-form.page";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AuthorRoutingModule,
    SharedModule
  ],
  providers: [AuthorApi, AuthorService],
  declarations: [AuthorListPage, AuthorFormPage],
})
export class AuthorModule {
}
