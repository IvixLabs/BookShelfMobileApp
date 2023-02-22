import {Component} from '@angular/core';
import {AuthorListPage} from "./author-list.page";

@Component({
  selector: 'app-author-page',
  templateUrl: 'author.page.html'
})
export class AuthorPage {

  component = AuthorListPage
}
