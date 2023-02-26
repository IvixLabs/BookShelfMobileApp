import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorFormPage} from "./author-form.page";
import {AuthorListPage} from "./author-list.page";

const routes: Routes = [

  {
    path: 'new',
    component: AuthorFormPage,
  },
  {
    path: ':id',
    component: AuthorFormPage,
  },
  {
    path: '',
    component: AuthorListPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule {}
