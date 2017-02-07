import { Diacritics } from './diacritics';
import { Option } from './option';
export class OptionList {
    private _options: Array<Option>;

    /* Consider using these for performance improvement. */
    // private _selection: Array<Option>;
    // private _filtered: Array<Option>;
    // private _value: Array<string>;

    private _highlightedOption: Option = null;
    private _hasShown: boolean;

    constructor(options: Array<any>, displayElements?: string[], displaySeparator?: string) {

        if (typeof options === 'undefined' || options === null) {
            options = [];
        }

        this._options = options.map((option) => {
            if (displayElements && displaySeparator) {
                const label = this.getObjectLabel(option, displayElements, displaySeparator);
                const value = this.getObjectValue(option);
                const o: Option = new Option(value, label);
                if (option.disabled) {
                    o.disable();
                }
                return o;

            } else {
                const o: Option = new Option(option.value, option.label);
                if (option.disabled) {
                    o.disable();
                }
                return o;
            }
        });

        this._hasShown = this._options.length > 0;
        this.highlight();
    }

    /** Options. **/

    get options(): Array<Option> {
        return this._options;
    }

    getOptionsByValue(value: string): Array<Option> {
        return this.options.filter((option) => {
            return option.value === value;
        });
    }

    /** Value. **/

    get value(): Array<string> {
        return this.selection.map((selectedOption) => {
            return selectedOption.value;
        });
    }

    set value(v: Array<string>) {
        v = typeof v === 'undefined' || v === null ? [] : v;

        this.options.forEach((option) => {
            option.selected = v.indexOf(option.value) > -1;
        });
    }

    /** Selection. **/

    get selection(): Array<Option> {
        return this.options.filter((option) => {
            return option.selected;
        });
    }

    select(option: Option, multiple: boolean) {
        if (!multiple) {
            this.clearSelection();
        }
        option.selected = true;
    }

    deselect(option: Option) {
        option.selected = false;
    }

    clearSelection() {
        this.options.forEach((option) => {
            option.selected = false;
        });
    }

    /** Filter. **/

    get filtered(): Array<Option> {
        return this.options.filter((option) => {
            return option.shown;
        });
    }

    filter(term: string): boolean {
        let anyShown: boolean = false;

        if (term.trim() === '') {
            this.resetFilter();
            anyShown = this.options.length > 0;
        }
        else {
            this.options.forEach((option) => {
                const l: string = Diacritics.strip(option.label).toUpperCase();
                const t: string = Diacritics.strip(term).toUpperCase();
                option.shown = l.indexOf(t) > -1;

                if (option.shown) {
                    anyShown = true;
                }
            });

        }
        const toEmpty: boolean = this.hasShown && !anyShown;

        this.highlight();
        this._hasShown = anyShown;

        return toEmpty;
    }

    private resetFilter() {
        this.options.forEach((option) => {
            option.shown = true;
        });
    }

    /** Highlight. **/

    get highlightedOption(): Option {
        return this._highlightedOption;
    }

    highlight() {
        const option: Option = this.hasShownSelected() ?
            this.getFirstShownSelected() : this.getFirstShown();
        this.highlightOption(option);
    }

    highlightOption(option: Option) {
        this.clearHighlightedOption();

        if (option !== null) {
            option.highlighted = true;
            this._highlightedOption = option;
        }
    }

    highlightNextOption() {
        const shownOptions = this.filtered;
        const index = this.getHighlightedIndexFromList(shownOptions);

        if (index > -1 && index < shownOptions.length - 1) {
            this.highlightOption(shownOptions[index + 1]);
        }
    }

    highlightPreviousOption() {
        const shownOptions = this.filtered;
        const index = this.getHighlightedIndexFromList(shownOptions);

        if (index > 0) {
            this.highlightOption(shownOptions[index - 1]);
        }
    }

    private clearHighlightedOption() {
        if (this.highlightedOption !== null) {
            this.highlightedOption.highlighted = false;
            this._highlightedOption = null;
        }
    }

    private getHighlightedIndexFromList(options: Array<Option>) {
        for (let i = 0; i < options.length; i++) {
            if (options[i].highlighted) {
                return i;
            }
        }
        return -1;
    }

    getHighlightedIndex() {
        return this.getHighlightedIndexFromList(this.filtered);
    }

    /** Util. **/

    get hasShown(): boolean {
        return this._hasShown;
    }

    hasSelected() {
        return this.options.some((option) => {
            return option.selected;
        });
    }

    hasShownSelected() {
        return this.options.some((option) => {
            return option.shown && option.selected;
        });
    }

    private getFirstShown(): Option {
        for (const option of this.options) {
            if (option.shown) {
                return option;
            }
        }
        return null;
    }

    private getFirstShownSelected(): Option {
        for (const option of this.options) {
            if (option.shown && option.selected) {
                return option;
            }
        }
        return null;
    }

    // v0 and v1 are assumed not to be undefined or null.
    // tslint:disable-next-line:member-ordering
    static equalValues(v0: Array<string>, v1: Array<string>): boolean {

        if (v0.length !== v1.length) {
            return false;
        }

        const a: Array<string> = v0.slice().sort();
        const b: Array<string> = v1.slice().sort();

        return a.every((v, i) => {
            return v === b[i];
        });
    }

    getObjectLabel(o: any, displayElements: string[], displayElementsSeparator: string) {
        let out = '';
        for (const dispEl of displayElements) {
            if ((<string>dispEl).split('.').length > 1) {
                let object = o;
                for (const prop of (<string>dispEl).split('.')) {
                    object = object[prop];
                    if (object === undefined) {
                        throw new Error('formctrl-select-single -> Invalid display property : ' + dispEl);
                    }
                }
                out += object + displayElementsSeparator;
            } else {
                out += o[dispEl] + displayElementsSeparator;
            }
        }
        return out;
    }

    getObjectValue(o): string {
        return JSON.stringify(o);
    }
}
