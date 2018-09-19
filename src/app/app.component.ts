import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public registerForm: FormGroup;

  constructor() { }

  ngOnInit() {
    const defaultBillingAddress = {
      addressNumber: '21',
      addressLine1: 'address line 1',
      city: 'city',
      zipcode: 'zipcode',
      country: 'country'
    };

    const defaultShippingAddress = {
      addressNumber: '15',
      addressLine1: 'addr  1',
      city: 'Oxford',
      zipcode: 'zipcode',
      country: 'country'
    };

    this.registerForm = new FormGroup({
      billingAddress: new FormControl(defaultBillingAddress, Validators.required),
      shippingAddress: new FormControl(defaultShippingAddress, Validators.required)
    });
   }
}
