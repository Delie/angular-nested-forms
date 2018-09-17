import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormControl, Validators } from '@angular/forms';

export interface IAddress {
  addressLine1: string;
  addressNumber: string;
  city: string;
  country: string;
  zipcode: string;
}

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressFormComponent),
    multi: true
  }]
})
export class AddressFormComponent implements OnInit, ControlValueAccessor {
  public addressForm: FormGroup;

  private formControls: any;
  private originalValue: any;

  constructor() { }

  ngOnInit() {
    this.formControls = {
      addressNumber: new FormControl(null, Validators.required),
      addressLine1: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      zipcode: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required)
    };
    this.addressForm = new FormGroup(this.formControls);
   }

  private _onChange = (_: any) => {};
  private _onTouched = (_: any) => {};

  set value(value: IAddress) {
    this.addressForm.setValue(value);
    this._onChange(this.addressForm.value);
  }

  get value() {
    return this.addressForm.value;
  }

  writeValue(value: IAddress): void {
    if (value && value !== null) {
      this.addressForm.setValue(value);
      this.originalValue = value;
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: (_: any) => void): void {
    this._onTouched = fn;
  }

  public formUpdate(event: any) {
    this._onChange(this.addressForm.value);
  }

  public reset() {
    this.addressForm.setValue(this.originalValue);
    this._onChange(this.addressForm.value);
  }
}
