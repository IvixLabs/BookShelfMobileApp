import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {AuthGuard} from "../auth/auth.guard";

const routes: Routes = [
  {
    path: 'tabs',
    canActivate: [AuthGuard],
    component: TabsPage,
    children: [
      {
        path: 'authors',
        loadChildren: () => import('../author/author.module').then(m => m.AuthorModule)
      },
      {
        path: 'books',
        loadChildren: () => import('../book/book.module').then(m => m.BookModule)
      },
      {
        path: '',
        redirectTo: 'authors',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'authors',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
