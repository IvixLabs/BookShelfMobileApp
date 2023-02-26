import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {BookApi} from "./book.api";
import {AuthState} from "../auth/auth.state";
import {BookFormDto} from "./dto/book-form.dto";

@Injectable()
export class BookService {

  constructor(private bookApi: BookApi, private authState: AuthState) {
  }

  getBook(id: string): Observable<BookFormDto> {

    const token = this.authState.getToken()
    if (token) {
      return this.bookApi.getBook(token, id)
    }

    throw new Error('Token is empty')
  }

  getBooks(first: number, rows: number): Observable<any> {
    const token = this.authState.getToken()
    if (token) {
      return this.bookApi.getBooks(token, first, rows)
    }

    throw new Error('Token is empty')
  }

  deleteBook(authorId: string): Observable<any> {

    const token = this.authState.getToken()
    if (token) {
      return this.bookApi.deleteBook(token, authorId)
    }

    throw new Error('Token is empty')
  }

  saveBook(book: BookFormDto): Observable<any> {
    const newBook = {...book}

    if (typeof newBook.author !== 'object') {
      newBook.author = undefined
    }

    const token = this.authState.getToken()
    if (token) {
      if (book.id) {
        return this.bookApi.updateBook(token, newBook)
      } else {
        return this.bookApi.createBook(token, newBook)
      }
    }

    throw new Error('Token is empty')

  }
}
