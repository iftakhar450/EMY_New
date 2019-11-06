import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() dataArray: any[];
  @Input() isSingleSelection: boolean;
  @Input() isSearchAllow: boolean;
  @Input() idField: any;
  @Input() dataField: any;
  @Input() placeHolder: any;
  @Input() selected: any;
  @Input() showid: any;
  @Output() valueChange = new EventEmitter();

  array_of_data: any = [];
  selected_item: any = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    searchPlaceholderText: 'Search for option here',
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  placeholder: any = 'Select option here';

  constructor() { }

  ngOnInit() {
    // console.log(this.dataArray);
    this.dropdownSettings.singleSelection = this.isSingleSelection;
    this.dropdownSettings.allowSearchFilter = this.isSearchAllow;
    this.dropdownSettings.idField = this.idField;
    this.dropdownSettings.textField = this.dataField;
    this.placeholder = this.placeHolder;
    if (this.selected) {
      this.selected_item = this.selected;
    }
    setTimeout(() => {
      this.array_of_data = this.dataArray;
    }, 1000);

  // console.log(this.array_of_data);
  //  console.log(this.selected_item);
  }

  onItemSelect(args) {
    this.valueChange.emit(this.selected_item);
  }
  onItemDeSelect(args) {
    this.valueChange.emit(this.selected_item);
  }
  onSelectAll(items: any) {
    this.valueChange.emit(items);
  }
  onDeSelectAll(items) {
    // alert('called');
    this.valueChange.emit(items);
  }
}
