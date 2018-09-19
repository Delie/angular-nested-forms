import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, Validator } from '@angular/forms';
import { AddressFormComponent } from './address-form/address-form.component';
import { IAddress } from './address-form/address.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public fg: FormGroup;

  constructor() {}

  ngOnInit() {
    const billingAddress: IAddress = {
      addressLine1: '21 Test Street',
      addressLine2: 'Testerville',
      town: 'Oxford',
      postcode: 'OX13 9ZZ',
      county: 'Oxon',
      country: 'United Kingdom'
    };

    const shippingAddress: IAddress = {
      addressLine1: '14 Tester Avenue',
      addressLine2: 'Tester Farm',
      town: 'Swindon',
      postcode: 'SN4 1AA',
      county: 'Wiltshire',
      country: 'United Kingdom'
    };

    this.fg = new FormGroup({
      billingAddress: new FormControl(billingAddress),
      shippingAddress: new FormControl(shippingAddress)
    });
  }

  public submitForm() {
    alert('submit() called.  insert save logic here');
  }

  public resetForm() {
    this.fg.patchValue({
      billingAddress: null,
      shippingAddress: null
    });
  }
}
