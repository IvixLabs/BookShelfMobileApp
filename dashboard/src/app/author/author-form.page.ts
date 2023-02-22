import {Component, OnInit} from '@angular/core';
import {AuthorFormDto} from "./dto/author-form.dto";
import {AuthorService} from "./author.service";
import {LoadingController, NavController} from "@ionic/angular";
import {BehaviorSubject, catchError} from "rxjs";
import {getHelperOperatorFunctions} from "../shared/server-side.directive";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-author-form-page',
  templateUrl: 'author-form.page.html'
})
export class AuthorFormPage implements OnInit {

  author?: AuthorFormDto

  errors$: BehaviorSubject<Map<string, string>> = new BehaviorSubject(new Map<string, string>())

  constructor(
    private navController: NavController,
    private authorService: AuthorService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const authorId = this.route.snapshot.paramMap.get('id')
    if (authorId === null) {
      this.author = {}
    } else {
      this.fetchAuthor(authorId).then()
    }
  }

  async save() {
    if (this.author) {
      const loading = await this.loadingCtrl.create({
        message: 'Saving...',
      })

      await loading.present()

      this.authorService.saveAuthor(this.author)
        .pipe(
          ...getHelperOperatorFunctions(this.errors$),
          catchError(async err => {
            await loading.dismiss()
            throw err
          })
        )
        .subscribe(async res => {
          this.author = res
          await loading.dismiss()
          this.navController.back()
        })
    }
  }

  async fetchAuthor(authorId: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    })

    await loading.present()

    this.authorService
      .getAuthor(authorId)
      .subscribe(async author => {
        this.author = author
        await loading.dismiss()
      })

  }
}
