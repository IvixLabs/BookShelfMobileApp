import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookListPage} from "./book-list.page";
import {BookFormPage} from "./book-form.page";

const routes: Routes = [

  {
    path: 'new',
    component: BookFormPage,
  },
  {
    path: ':id',
    component: BookFormPage,
  },
  {
    path: '',
    component: BookListPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
