import {Component} from '@angular/core';
import {AlertController, ViewWillEnter} from "@ionic/angular";
import {AuthorListDto} from "./dto/author-list.dto";
import {AuthorService} from "./author.service";
import {tap} from "rxjs";
import {BookListDto} from "../book/dto/book-list.dto";

@Component({
  selector: 'app-author-list',
  templateUrl: 'author-list.page.html'
})
export class AuthorListPage implements ViewWillEnter {

  items: AuthorListDto[] = []

  page: number = 0

  rows: number = 100

  loading: boolean = false

  constructor(
    private alertController: AlertController,
    private authorService: AuthorService) {
  }

  ionViewWillEnter(): void {
    this.items = []
    this.page = 0
    this.fetchItems().subscribe()
  }

  fetchItems() {
    this.loading = true
    const filters = new Map<string, string>()
    return this.authorService
      .getAuthors(this.page * this.rows, this.rows, filters)
      .pipe(tap(res => {
        this.items.push(...(res['hydra:member'] as AuthorListDto[]));
        this.loading = false
      }));
  }

  async deleteItem(item: AuthorListDto) {

    const alert = await this.alertController.create({
      header: 'Confirm deletion',
      message:'Associated books with this author will be removed too',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.loading = true
            this.items = this.items.filter(v => v!== item)
            this.authorService.deleteAuthor(item.id).subscribe(_ => {
              this.loading = false
            })
          },
        },
      ],
    });

    await alert.present();
  }

}
