import {Component, Input, Output, EventEmitter} from '@angular/core';
import type {OnInit} from '@angular/core';
import {TypeaheadItem} from "./typeahead-item";

@Component({
  selector: 'app-typeahead',
  templateUrl: 'typeahead.component.html',
})
export class TypeaheadComponent implements OnInit {
  @Input() items: TypeaheadItem[] = [];
  @Input() title = 'Select Items';
  @Output() selectionCancel = new EventEmitter<void>();
  @Output() itemSelected = new EventEmitter<TypeaheadItem>();
  @Output() searchChanged = new EventEmitter<string>();
  @Input() loading = false;

  ngOnInit() {
  }

  trackItems(index: number, item: TypeaheadItem) {
    return item.id;
  }

  cancelChanges() {
    this.selectionCancel.emit();
  }

  searchbarInput(ev: any) {
    this.searchChanged.emit(ev.target.value)
  }

  selectItem(item: TypeaheadItem) {
    this.itemSelected.emit(item)
  }
}
