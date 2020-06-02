import { ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NgbButtonLabel } from './label';
/**
 * Allows to easily create Bootstrap-style checkbox buttons.
 *
 * Integrates with forms, so the value of a checked button is bound to the underlying form control
 * either in a reactive or template-driven way.
 */
export declare class NgbCheckBox implements ControlValueAccessor {
    private _label;
    private _cd;
    checked: any;
    /**
     * If `true`, the checkbox button will be disabled
     */
    disabled: boolean;
    /**
     * The form control value when the checkbox is checked.
     */
    valueChecked: boolean;
    /**
     * The form control value when the checkbox is unchecked.
     */
    valueUnChecked: boolean;
    onChange: (_: any) => void;
    onTouched: () => void;
    focused: boolean;
    constructor(_label: NgbButtonLabel, _cd: ChangeDetectorRef);
    onInputChange($event: any): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(value: any): void;
}
