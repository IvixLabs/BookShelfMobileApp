import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {AuthorApi} from './author.api'
import {AuthorFormDto} from './dto/author-form.dto'
import {AuthState} from "../auth/auth.state";
import {RefAuthorDto} from "./dto/ref-author.dto";

@Injectable()
export class AuthorService {

  constructor(private authorApi: AuthorApi, private authState: AuthState) {
  }

  getAuthor(id: string): Observable<AuthorFormDto> {

    const token = this.authState.getToken()
    if (token) {
      return this.authorApi.getAuthor(token, id)
    }

    throw new Error('Token is empty')
  }


  getAuthors(first: number, rows: number, filters: Map<string, string>): Observable<any> {

    const token = this.authState.getToken()
    if (token) {
      return this.authorApi.getAuthors(token, first, rows, filters)
    }

    throw new Error('Token is empty')

  }

  getAuthorSuggestions(first: number, rows: number, filters: Map<string, string>): Observable<RefAuthorDto[]> {

    const token = this.authState.getToken()
    if (token) {
      return this.authorApi.getAuthorSuggestions(token, first, rows, filters)
    }

    throw new Error('Token is empty')
  }

  deleteAuthor(authorId: string): Observable<any> {

    const token = this.authState.getToken()
    if (token) {
      return this.authorApi.deleteAuthor(token, authorId)
    }

    throw new Error('Token is empty')
  }

  saveAuthor(author: AuthorFormDto): Observable<any> {

    const token = this.authState.getToken()
    if (token) {
      if (author.id) {
        return this.authorApi.updateAuthor(token, author)
      } else {
        return this.authorApi.createAuthor(token, author)
      }
    }

    throw new Error('Token is empty')
  }
}
