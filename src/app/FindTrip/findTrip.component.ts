import { Component, OnInit,Input,OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FindTripService } from './findTrip.service';
import {FindTripModel} from './findTripDataModel';

@Component({
      templateUrl: 'findTrip.html',
    styleUrls: ['findTripStyle.css']
})

export class FindTripComponent implements OnChanges {
    findTripForm: FormGroup;
    disabled: false;
    bookingData: {};
    errorMessage: string;
     @Input() findTripModel: FindTripModel;
     submitAlert:string='';
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
  ngOnChanges() {
    this.findTripForm.reset({
      bookingCode: this.findTripModel.bookingCode,
      familyName: this.findTripModel.familyName
    });
  
  }
    OnValueChaged(data?: any) {
        if (!this.findTripForm) { return; }
         this.submitAlert='';
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
        this.submitAlert='';
        console.log("submit clicked");
          this.findTripModel = this.prepareQueryObject();
          if(this.findTripModel){
            this.findTripService.getBookingData(this.findTripModel).subscribe(res => this.bookingData = res,
            error => this.errorMessage = <any>error
                );
            console.log(this.bookingData);
        }
              else{  
                  this.submitAlert="Please provide Booking Code and family Name"
               }
         }

prepareQueryObject(): FindTripModel {
    const formModel = this.findTripForm.value;
    let queryObj: FindTripModel=null;
    if((formModel.bookingCode!='') && (formModel.familyName!='')){
     queryObj= {
      bookingCode: formModel.bookingCode as string,
      familyName: formModel.familyName as string
    };
    }
    return queryObj;
  }

}