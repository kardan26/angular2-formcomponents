import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {Option} from '../option';
import {OptionList} from '../option-list';
@Component({
  selector: 'formctrl-select-search-dropdown',
  templateUrl: './select-search-dropdown.component.html',
  styleUrls: ['./select-search-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectSearchDropdownComponent implements OnInit,  OnChanges, AfterViewInit {

  @Input() filterEnabled: boolean;
    @Input() highlightColor: string;
    @Input() highlightTextColor: string;
    @Input() left: number;
    @Input() multiple: boolean;
    @Input() notFoundMsg: string;
    @Input() optionList: OptionList;
    @Input() top: number;
    @Input() width: number;

    @Output() close = new EventEmitter<boolean>();
    @Output() optionClicked = new EventEmitter<Option>();
    @Output() singleFilterClick = new EventEmitter<null>();
    @Output() singleFilterInput = new EventEmitter<string>();
    @Output() singleFilterKeydown = new EventEmitter<any>();

    @ViewChild('filterInput') filterInput: any;
    @ViewChild('optionsList') optionsList: any;

    // tslint:disable-next-line:no-inferrable-types
    disabledColor: string = '#fff';
    // tslint:disable-next-line:no-inferrable-types
    disabledTextColor: string = '9e9e9e';

    /** Event handlers. **/

    // Angular life cycle hooks.

    ngOnInit() {
        this.optionsReset();
    }

    ngOnChanges(changes: any) {
        if (changes.hasOwnProperty('optionList')) {
            this.optionsReset();
        }
    }

    ngAfterViewInit() {
        this.moveHighlightedIntoView();
        if (!this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
    }

    // Filter input (single select).

    onSingleFilterClick(event: any) {
        this.singleFilterClick.emit(null);
    }

    onSingleFilterInput(event: any) {
        this.singleFilterInput.emit(event.target.value);
    }

    onSingleFilterKeydown(event: any) {
        this.singleFilterKeydown.emit(event);
    }

    // Options list.

    onOptionsWheel(event: any) {
        this.handleOptionsWheel(event);
    }

    onOptionMouseover(option: Option) {
        this.optionList.highlightOption(option);
    }

    onOptionClick(option: Option) {
        this.optionClicked.emit(option);
    }

    /** Initialization. **/

    private optionsReset() {
        this.optionList.filter('');
        this.optionList.highlight();
    }

    /** View. **/

    getOptionStyle(option: Option): any {
        if (option.highlighted) {
            return {
                'background-color': this.highlightColor,
                'color': this.highlightTextColor
            };
        } else {
            return {};
        }
    }

    clearFilterInput() {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
    }

    moveHighlightedIntoView() {

        const list = this.optionsList.nativeElement;
        const listHeight = list.offsetHeight;

        const itemIndex = this.optionList.getHighlightedIndex();

        if (itemIndex > -1) {
            const item = list.children[0].children[itemIndex];
            const itemHeight = item.offsetHeight;

            const itemTop = itemIndex * itemHeight;
            const itemBottom = itemTop + itemHeight;

            const viewTop = list.scrollTop;
            const viewBottom = viewTop + listHeight;

            if (itemBottom > viewBottom) {
                list.scrollTop = itemBottom - listHeight;
            } else if (itemTop < viewTop) {
                list.scrollTop = itemTop;
            }
        }
    }

    private handleOptionsWheel(e: any) {
        const div = this.optionsList.nativeElement;
        const atTop = div.scrollTop === 0;
        const atBottom = div.offsetHeight + div.scrollTop === div.scrollHeight;

        if (atTop && e.deltaY < 0) {
            e.preventDefault();
        } else if (atBottom && e.deltaY > 0) {
            e.preventDefault();
        }
    }

}
