export const validateMessages = {
    'bookingCode': {
        'minlength': 'Booking code should have minimum 5 character',
        'maxlength': 'Booking code should not be more than 6 characters long',
        'pattern': 'Booking code accepts all alphabets and numeric values(2-9) only'
    },
    'familyName': {
        'minlength': 'family name should have minimum 2 characters',
        'maxlength': 'family name should not be more than 30 characters long',
        'pattern': 'family name accepts alphabets only'
    }
}
export const warningMsg = "Please provide Booking Code and family Name";