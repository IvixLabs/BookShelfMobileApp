import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal, LoadingController, NavController} from "@ionic/angular";
import {BehaviorSubject, catchError} from "rxjs";
import {getHelperOperatorFunctions} from "../shared/server-side.directive";
import {ActivatedRoute} from "@angular/router";
import {BookFormDto} from "./dto/book-form.dto";
import {BookService} from "./book.service";
import {TypeaheadItem} from "../shared/typeahead-item";
import {AuthorService} from "../author/author.service";
import {RefAuthorDto} from "../author/dto/ref-author.dto";

@Component({
  selector: 'app-book-form-page',
  templateUrl: 'book-form.page.html',
  styleUrls: ['./book-form.page.scss'],
})
export class BookFormPage implements OnInit {

  book?: BookFormDto

  errors$: BehaviorSubject<Map<string, string>> = new BehaviorSubject(new Map<string, string>())

  @ViewChild(IonModal) modal!: IonModal;

  authors: TypeaheadItem[] = [];

  searchingAuthors = false


  constructor(
    private authorService: AuthorService,
    private navController: NavController,
    private bookService: BookService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id')
    if (itemId === null) {
      this.book = {}
    } else {
      this.fetchItem(itemId).then()
    }
  }

  async openAuthors() {
    await this.modal.present()
    this.searchAuthors('')
  }

  selectAuthor(author: TypeaheadItem) {
    if (this.book) {
      this.book.author = (author.value as RefAuthorDto)
    }
    this.modal.dismiss();
  }

  searchAuthors(searchStr: string) {

    this.searchingAuthors = true

    const filters = new Map<string, string>();
    filters.set('search', searchStr)
    this.authorService
      .getAuthorSuggestions(0, 10, filters)
      .subscribe(authors => {
        this.authors = authors.map(author => ({title: author.name, value: author, id: author.id}))
        this.searchingAuthors = false
      })
  }

  async save() {
    if (this.book) {
      const loading = await this.loadingCtrl.create({
        message: 'Saving...',
      })

      await loading.present()

      this.bookService.saveBook(this.book)
        .pipe(
          ...getHelperOperatorFunctions(this.errors$),
          catchError(async err => {
            await loading.dismiss()
            throw err
          })
        )
        .subscribe(async res => {
          this.book = res
          await loading.dismiss()
          this.navController.back()
        })
    }
  }

  async fetchItem(authorId: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    })

    await loading.present()

    this.bookService
      .getBook(authorId)
      .subscribe(async item => {
        this.book = item
        await loading.dismiss()
      })

  }
}
