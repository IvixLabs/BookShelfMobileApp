import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public user: any

  constructor() {
    this.user = {}
  }

  fetchData() {
    fetch('http://192.168.2.1/api/books/1', {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    })
      .then(response => response.json())
      .then(json => {
        this.user = json
        console.log(json)
      })
  }
}
