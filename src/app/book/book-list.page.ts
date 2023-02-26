import {Component} from '@angular/core';
import {ViewWillEnter} from "@ionic/angular";
import {tap} from "rxjs";
import {BookListDto} from "./dto/book-list.dto";
import {BookService} from "./book.service";
import {AuthorListDto} from "../author/dto/author-list.dto";

@Component({
  selector: 'app-book-list',
  templateUrl: 'book-list.page.html'
})
export class BookListPage implements ViewWillEnter {

  items: BookListDto[] = []

  page: number = 0

  rows: number = 100

  loading: boolean = false

  constructor(private bookService: BookService) {
  }

  ionViewWillEnter(): void {
    this.items = []
    this.page = 0
    this.fetchItems().subscribe()
  }

  fetchItems() {
    this.loading = true
    const filters = new Map<string, string>()
    return this.bookService
      .getBooks(this.page * this.rows, this.rows)
      .pipe(tap(res => {
        this.items = (res['hydra:member'] as BookListDto[]);
        this.loading = false
      }));
  }

  deleteItem(item: BookListDto) {
    this.loading = true
    this.items = this.items.filter(v => v!== item)
    this.bookService.deleteBook(item.id).subscribe(_ => {
      this.loading = false
    })
  }

}
