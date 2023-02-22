import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {InfiniteScrollCustomEvent, ViewDidEnter, ViewWillEnter} from "@ionic/angular";
import {AuthorListDto} from "./dto/author-list.dto";
import {AuthorService} from "./author.service";
import {tap} from "rxjs";
import {AuthorFormPage} from "./author-form.page";

@Component({
  selector: 'app-author-list',
  templateUrl: 'author-list.page.html'
})
export class AuthorListPage implements ViewWillEnter {

  items: AuthorListDto[] = []

  page: number = 0

  rows: number = 10

  loading: boolean = false

  constructor(private authorService: AuthorService) {
  }

  ionViewWillEnter(): void {
    this.items = []
    this.page = 0
    this.fetchAuthors().subscribe()
  }

  fetchAuthors() {
    this.loading = true
    const filters = new Map<string, string>()
    return this.authorService
      .getAuthors(this.page * this.rows, this.rows, filters)
      .pipe(tap(res => {
        this.items.push(...(res['hydra:member'] as AuthorListDto[]));
        this.loading = false
      }));
  }

}
