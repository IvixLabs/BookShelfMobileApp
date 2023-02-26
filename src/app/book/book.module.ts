import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BookRoutingModule} from "./book-routing.module";
import {BookListPage} from "./book-list.page";
import {BookApi} from "./book.api";
import {BookService} from "./book.service";
import {BookFormPage} from "./book-form.page";
import {SharedModule} from "../shared/shared.module";
import {AuthorModule} from "../author/author.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BookRoutingModule,
    SharedModule,
    AuthorModule
  ],
  providers: [BookApi, BookService],
  declarations: [BookListPage, BookFormPage]
})
export class BookModule {
}
