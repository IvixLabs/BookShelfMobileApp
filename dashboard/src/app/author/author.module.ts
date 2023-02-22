import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';
import {AuthorRoutingModule} from "./author-routing.module";
import {AuthorListPage} from "./author-list.page";
import {AuthorApi} from "./author.api";
import {AuthorService} from "./author.service";
import {AuthorPage} from "./author.page";
import {AuthorFormPage} from "./author-form.page";
import {ServerSideDirective} from "../shared/server-side.directive";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AuthorRoutingModule,
  ],
  providers: [AuthorApi, AuthorService],
  declarations: [AuthorPage, AuthorListPage, AuthorFormPage, ServerSideDirective]
})
export class AuthorModule {
}
