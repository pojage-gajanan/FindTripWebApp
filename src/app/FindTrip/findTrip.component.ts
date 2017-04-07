import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FindTripService } from './findTrip.service';


@Component({
      templateUrl: 'findTrip.html',
    styleUrls: ['findTripStyle.css']
})

export class FindTripComponent {
    findTripForm: FormGroup;
    disabled: false;
    bookingData: {};
    errorMessage: string;

    constructor(private findTripService: FindTripService) {
        this.creteForm();
    }

    creteForm() {
        this.findTripForm = new FormGroup({

            bookingCode: new FormControl('', [
                Validators.minLength(5),
                Validators.maxLength(6),
                Validators.pattern('[A-Za-z2-9]{1,}')
            ]),
            familyName: new FormControl('', [
                Validators.minLength(2),
                Validators.maxLength(30),
                Validators.pattern('[A-Za-z]{1,}'),
            ])
        })
        this.findTripForm.valueChanges.subscribe(data => this.OnValueChaged(data));
        this.OnValueChaged();
    }

    OnValueChaged(data?: any) {
        if (!this.findTripForm) { return; }

        const form = this.findTripForm;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            let control = form.get(field);
            let messages = this.validateMessages[field];
            if (control && control.invalid && control.dirty) {
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + '';
                }
            }
        }
    }

    formErrors = {
        'bookingCode': '',
        'familyName': ''
    }

    validateMessages = {
        'bookingCode': {
            'minlength': 'Booking code should have minimum 5 characters',
            'maxlength': 'Booking code should not be more than 6 characters long',
            'pattern': 'Booking code accepts all alphabets and numeric values(2-9) only'
        },
        'familyName': {
            'minlength': 'family name should have minimum 2 characters',
            'maxlength': 'family name should not be more than 30 characters long',
            'pattern': 'family name accepts alphabets only'
        }
    }

    checkButtonDisabled() {
        return !this.findTripForm.valid;
    }

    RetrieveBooking() {
        console.log("submit clicked");
       
            let bookingCode = this.findTripForm.get('bookingCode').value;
            this.findTripService.getBookingData(bookingCode).subscribe(res => this.bookingData = res,
            error => this.errorMessage = <any>error
                );
            console.log(this.bookingData);
         }


}