import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { IAddress } from './address.interface';

// Optional: Async validation
// import { NG_ASYNC_VALIDATORS, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true
    }
    // Optional: Async Validators:
    // { provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => AddressFormComponent), multi: true }
  ]
})
export class AddressFormComponent implements OnInit, ControlValueAccessor {
  public fg: FormGroup;
  private previousValue: any;

  constructor() {}

  ngOnInit() {
    this.fg = new FormGroup({
      addressLine1: new FormControl(null, Validators.required),
      addressLine2: new FormControl(null, Validators.required),
      town: new FormControl(null, Validators.required),
      postcode: new FormControl(null, Validators.required),
      county: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required)
    });

    this.fg.valueChanges.subscribe(val => {
      this._onChange(val);
    });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.fg.valid) {
      return { valid: this.fg.valid };
    } else {
      return null;
    }
  }

  // Optional: Async validate
  // validate(c: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
  //   return new Promise(resolve => {
  //     // For now, just simulate an api call.  Insert proper code here!
  //     setTimeout(() => {
  //       if (!this.fg.valid) {
  //         resolve({ valid: this.fg.valid });
  //       } else {
  //         resolve(null);
  //       }
  //     }, 100);
  //   });
  // }

  private _onChange = (_: any) => {};
  private _onTouched = (_: any) => {};

  public writeValue(val: IAddress): void {
    if (val && val !== null) {
      this.previousValue = val;
      this.fg.setValue(val, { emitEvent: false });
    } else {
      this.reset();
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: (_: any) => void): void {
    this._onTouched = fn;
  }

  public formChange(event: any) {
    this._onChange(this.fg.value);
  }

  public reset() {
    if (this.previousValue) {
      this.fg.patchValue(this.previousValue);
    } else {
      this.fg.reset({
        addressLine1: '',
        addressLine2: '',
        postTown: '',
        postcode: '',
        county: '',
        country: ''
      });
    }
  }
}
