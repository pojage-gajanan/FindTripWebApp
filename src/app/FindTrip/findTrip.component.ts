import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FindTripService } from './findTrip.service';
import { FindTripModel } from './findTripDataModel';
import { validateMessages } from './findTripErrorMessages';

@Component({
    templateUrl: 'findTrip.html',
    styleUrls: ['findTripStyle.css']
})

export class FindTripComponent implements OnChanges {
    findTripForm: FormGroup;
    disabled: false;
    bookingData: {};
    // Passenger Detail from response
    passengerName: string;
    type: string;
    origin: string;
    destination: string;

    //End of passnger details

    errorMessage: string;
    @Input() findTripModel: FindTripModel;
    submitWarning: string = '';

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
        this.findTripForm.valueChanges.subscribe(data => this.onValueChaged(data));
        this.onValueChaged();
    }

    ngOnChanges() {
        this.findTripForm.reset({
            bookingCode: this.findTripModel.bookingCode,
            familyName: this.findTripModel.familyName
        });

    }

    /* ....*** Checkinh Validation for Booking Code and FamilyName fields***..... */
    onValueChaged(data?: any) {
        if (!this.findTripForm) { return; }
        this.submitWarning = '';
        const form = this.findTripForm;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            let control = form.get(field);
            let messages = validateMessages[field];
            if (control && control.invalid && control.dirty) {
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + '. ';
                }
            }
        }
    }


    formErrors = {
        'bookingCode': '',
        'familyName': ''
    }

    checkButtonDisabled() {
        return !this.findTripForm.valid;
    }

    /* ....*** Checkinh Validation for Booking Code and FamilyName fields***..... */
    retrieveBooking() {
        this.submitWarning = '';
        console.log("submit clicked");
        this.findTripModel = this.prepareQueryObject();
        if (this.findTripModel) {
            this.findTripService.getBookingData(this.findTripModel).subscribe(res => {
                this.bookingData = res;
                this.processResponse(this.bookingData);
            },
                error => this.errorMessage = <any>error
            );
        }
        else {
            this.submitWarning = "Please provide Booking Code and family Name"
        }
    }

    prepareQueryObject(): FindTripModel {
        const formModel = this.findTripForm.value;
        let queryObj: FindTripModel = null;
        if ((formModel.bookingCode != '') && (formModel.familyName != '')) {
            queryObj = {
                bookingCode: formModel.bookingCode as string,
                familyName: formModel.familyName as string
            };
        }
        return queryObj;
    }
    processResponse(data: any) {
        this.passengerName = data["passengers"].firstName + " , " + data["passengers"].lastName;
        this.type = data["itinerary"].type;
        this.origin = data["itinerary"].connections[0].origin.name;
        this.destination = data["itinerary"].connections[0].destination.name;
    }

}