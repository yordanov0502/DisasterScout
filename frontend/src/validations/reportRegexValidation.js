const nameRegex = /^[А-ЯA-Z][а-яa-z]{2,19}$/;
const phoneNumberRegex = /^08[0-9]{8}$/;

const minDescriptionWordCount = 2;
const maxDescriptionWordCount = 500;

const minAddressCharacterCount = 2;
const maxAddressCharacterCount = 150;

const minLocationCharacterCount = 10;
const maxLocationCharacterCount = 250;

const allRequiredFieldsMessage = "Моля въведете данни във всички задължителни* полета.";
const descriptionFieldMessage1 = "Описанието трябва да съдържа минимум 2 думи.";
const descriptionFieldMessage2 = "Описанието не може да съдържа повече от 500 думи.";
const addressFieldMessage1 = "Полето на адреса трябва да съдържа минимум 2 символа.";
const addressFieldMessage2 = "Полето на адреса не може да съдържа повече от 150 символа.";
const locationUrlFieldMessage1 = "Полето 'Линк локация / координати' трябва да съдържа минимум 10 символа.";
const locationUrlFieldMessage2 = "Полето 'Линк локация / координати' не може да съдържа повече от 250 символа.";
const firstNameFieldMessage = "Невалидно име.";
const lastNameFieldMessage = "Невалидна фамилия.";
const phoneNumberFieldMessage = "Невалиден мобилен номер.";

const acceptReportFormAllRequiredFieldsMessage = "Моля попълнете всички задължителни* полета.";
const acceptReportFormExpectedDurationMessage = "Моля задайте времетраене.";

const revaluateReportFormAllRequiredFieldsMessage = "Моля попълнете всички задължителни* полета.";
const revaluateReportFormExpectedDurationMessage = "Моля задайте времетраене.";


const isDescriptionWordCountLess = (description) => {
    const wordCount = description.trim().split(/\s+/).length;
    return wordCount < minDescriptionWordCount ? true : false;
  };
const isDescriptionWordCountMore = (description) => {
    const wordCount = description.trim().split(/\s+/).length;
    return wordCount > maxDescriptionWordCount ? true : false;
  };

const isAddressCharacterCountLess = (address) => {
    return address.length < minAddressCharacterCount ? true : false;
  };
const isAddressCharacterCountMore = (address) => {
    return address.length > maxAddressCharacterCount ? true : false;
  };

const isLocationUrlCharacterCountLess = (locationUrl) => {
     return locationUrl.length < minLocationCharacterCount ? true : false;
  };
  const isLocationUrlCharacterCountMore = (locationUrl) => {
    return locationUrl.length > maxLocationCharacterCount ? true : false;
  };

export const validateReportFormOnSubmit = (reportForm) => { //? function returns error message
    if (!reportForm.issue || !reportForm.severity || !reportForm.expectedDuration || !reportForm.zone || !reportForm.area || !reportForm.locationUrl || !reportForm.description || !reportForm.firstName || !reportForm.lastName || !reportForm.phoneNumber) 
    {
      return allRequiredFieldsMessage; //! error
    }
  
    else
    {
        if (isDescriptionWordCountLess(reportForm.description)) {return descriptionFieldMessage1;} //! error
        if (isDescriptionWordCountMore(reportForm.description)) {return descriptionFieldMessage2;} //! error

        if (reportForm.address && isAddressCharacterCountLess(reportForm.address)) {return addressFieldMessage1;} //! error
        if (reportForm.address && isAddressCharacterCountMore(reportForm.address)) {return addressFieldMessage2;} //! error

        if (isLocationUrlCharacterCountLess(reportForm.locationUrl)) {return locationUrlFieldMessage1;} //! error
        if (isLocationUrlCharacterCountMore(reportForm.locationUrl)) {return locationUrlFieldMessage2;} //! error

        
        const isFirstNameValid = nameRegex.test(reportForm.firstName);
        const isLastNameValid = nameRegex.test(reportForm.lastName);
        const isPhoneNumberValid = phoneNumberRegex.test(reportForm.phoneNumber);
        if (!isFirstNameValid) {return firstNameFieldMessage;} //! error
        if (!isLastNameValid) {return lastNameFieldMessage;} //! error
        if (!isPhoneNumberValid) {return phoneNumberFieldMessage;} //! error

        return ""; //* OK
    }
  };

  export const processReportErrorFormOnSubmit = (reportForm,errorForm, validationMessage) => { //?  returns an object with the same structure as errorForm, where each field is true if there's an error (validation fails) or false otherwise.
  
    if(validationMessage === allRequiredFieldsMessage)
    {
      return {
        issue: !reportForm.issue ,
        severity: !reportForm.severity,
        expectedDuration: !reportForm.expectedDuration,
        description: !reportForm.description, 
        zone: !reportForm.zone,
        area: !reportForm.area,
        address: false, //* isn't required
        locationUrl: !reportForm.locationUrl,
    
        firstName: !reportForm.firstName,
        lastName: !reportForm.lastName,
        phoneNumber: !reportForm.phoneNumber
      };
    }
    if(validationMessage === descriptionFieldMessage1 || validationMessage === descriptionFieldMessage2)
    {
      return {
        ...errorForm,
        description: true
      };
    }
    if(validationMessage === addressFieldMessage1 || validationMessage === addressFieldMessage2)
    { 
      return {
        ...errorForm,
        address: true
      };
    }
    if(validationMessage === locationUrlFieldMessage1 || validationMessage === locationUrlFieldMessage2)
    {
      return {
        ...errorForm,
        locationUrl: true
      };
    }
    if(validationMessage === firstNameFieldMessage)
    {
      return {
        ...errorForm,
        firstName: true
      };
    }
    if(validationMessage === lastNameFieldMessage)
    {
      return {
        ...errorForm,
        lastName: true
      };
    }
    if(validationMessage === phoneNumberFieldMessage)
    {
      return {
        ...errorForm,
        phoneNumber: true
      };
    }

    //? Better safe than sorry...
    return {
      issue: !reportForm.issue ,
      severity: !reportForm.severity,
      expectedDuration: !reportForm.expectedDuration,
      description: !reportForm.description, 
      zone: !reportForm.zone,
      area: !reportForm.area,
      address: false, //* isn't required
      locationUrl: !reportForm.locationUrl,
  
      firstName: !reportForm.firstName,
      lastName: !reportForm.lastName,
      phoneNumber: !reportForm.phoneNumber
    };
  };



  export const validateReportFormOnAccept = (reportForm) => { //? function returns error message
    if (!reportForm.description || !reportForm.locationUrl || !reportForm.firstName || !reportForm.lastName || !reportForm.phoneNumber || reportForm.area === "-") 
    {
      return acceptReportFormAllRequiredFieldsMessage; //! error
    }
  
    else
    {
        if(reportForm.expectedDuration === -1) {return acceptReportFormExpectedDurationMessage;} //! error

        if (reportForm.address && isAddressCharacterCountLess(reportForm.address)) {return addressFieldMessage1;} //! error
        if (reportForm.address && isAddressCharacterCountMore(reportForm.address)) {return addressFieldMessage2;} //! error

        if (isDescriptionWordCountLess(reportForm.description)) {return descriptionFieldMessage1;} //! error
        if (isDescriptionWordCountMore(reportForm.description)) {return descriptionFieldMessage2;} //! error

        if (isLocationUrlCharacterCountLess(reportForm.locationUrl)) {return locationUrlFieldMessage1;} //! error
        if (isLocationUrlCharacterCountMore(reportForm.locationUrl)) {return locationUrlFieldMessage2;} //! error

        const isFirstNameValid = nameRegex.test(reportForm.firstName);
        const isLastNameValid = nameRegex.test(reportForm.lastName);
        const isPhoneNumberValid = phoneNumberRegex.test(reportForm.phoneNumber);
        if (!isFirstNameValid) {return firstNameFieldMessage;} //! error
        if (!isLastNameValid) {return lastNameFieldMessage;} //! error
        if (!isPhoneNumberValid) {return phoneNumberFieldMessage;} //! error

        return ""; //* OK
    }
  };

  export const processErrorAcceptFormOnSubmit = (reportForm, errorAcceptForm, validationMessage) => { //?  returns an object with the same structure as errorAcceptForm, where each field is true if there's an error (validation fails) or false otherwise.
  
    if(validationMessage === acceptReportFormAllRequiredFieldsMessage)
    {
      return {
        expectedDuration: false, //* always have selected value either -1 "не знам" or 1,2,3,24,48...
        description: !reportForm.description, 
        address: false, //* isn't required
        locationUrl: !reportForm.locationUrl, 
        firstName: !reportForm.firstName,
        lastName: !reportForm.lastName,
        phoneNumber: !reportForm.phoneNumber,
        area: reportForm.area === "-" ? true : false
      };
    }
    if(validationMessage === acceptReportFormExpectedDurationMessage)
    {
      return {
        ...errorAcceptForm,
        expectedDuration: true
      };
    }
    if(validationMessage === descriptionFieldMessage1 || validationMessage === descriptionFieldMessage2)
    {
      return {
        ...errorAcceptForm,
        description: true
      };
    }
    if(validationMessage === addressFieldMessage1 || validationMessage === addressFieldMessage2)
    { 
      return {
        ...errorAcceptForm,
        address: true
      };
    }
    if(validationMessage === locationUrlFieldMessage1 || validationMessage === locationUrlFieldMessage2)
    {
      return {
        ...errorAcceptForm,
        locationUrl: true
      };
    }
    if(validationMessage === firstNameFieldMessage)
    {
      return {
        ...errorAcceptForm,
        firstName: true
      };
    }
    if(validationMessage === lastNameFieldMessage)
    {
      return {
        ...errorAcceptForm,
        lastName: true
      };
    }
    if(validationMessage === phoneNumberFieldMessage)
    {
      return {
        ...errorAcceptForm,
        phoneNumber: true
      };
    }

    //? Better safe than sorry...
    return {
      expectedDuration: false, //* always have selected value either -1 "не знам" or 1,2,3,24,48...
      description: !reportForm.description, 
      address: false, //* isn't required
      locationUrl: !reportForm.locationUrl, 
      firstName: !reportForm.firstName,
      lastName: !reportForm.lastName,
      phoneNumber: !reportForm.phoneNumber,
      area: reportForm.area === "-" ? true : false
    };
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////










  export const validateReportFormOnRevaluate = (reportForm) => { //? function returns error message
    if (!reportForm.description || !reportForm.locationUrl || reportForm.area === "-") 
    {
      return revaluateReportFormAllRequiredFieldsMessage; //! error
    }
  
    else
    {
        if(reportForm.expectedDuration === -1) {return revaluateReportFormExpectedDurationMessage;} //! error

        if (reportForm.address && isAddressCharacterCountLess(reportForm.address)) {return addressFieldMessage1;} //! error
        if (reportForm.address && isAddressCharacterCountMore(reportForm.address)) {return addressFieldMessage2;} //! error

        if (isDescriptionWordCountLess(reportForm.description)) {return descriptionFieldMessage1;} //! error
        if (isDescriptionWordCountMore(reportForm.description)) {return descriptionFieldMessage2;} //! error

        if (isLocationUrlCharacterCountLess(reportForm.locationUrl)) {return locationUrlFieldMessage1;} //! error
        if (isLocationUrlCharacterCountMore(reportForm.locationUrl)) {return locationUrlFieldMessage2;} //! error

        return ""; //* OK
    }
  };

  export const processErrorRevaluateFormOnSubmit = (reportForm, errorRevaluateForm, validationMessage) => { //?  returns an object with the same structure as errorAcceptForm, where each field is true if there's an error (validation fails) or false otherwise.
  
    if(validationMessage === revaluateReportFormAllRequiredFieldsMessage)
    {
      return {
        expectedDuration: reportForm.expectedDuration === -1 ? true : false, //* always have selected value either -1 "-" or 1,2,3,24,48..., BUT IT SHOULD NOT BE -1 "-"
        description: !reportForm.description, 
        address: false, //* isn't required
        locationUrl: !reportForm.locationUrl,
        area: reportForm.area === "-" ? true : false
      };
    }
    if(validationMessage === revaluateReportFormExpectedDurationMessage)
    {
      return {
        ...errorRevaluateForm,
        expectedDuration: true
      };
    }
    if(validationMessage === descriptionFieldMessage1 || validationMessage === descriptionFieldMessage2)
    {
      return {
        ...errorRevaluateForm,
        description: true
      };
    }
    if(validationMessage === addressFieldMessage1 || validationMessage === addressFieldMessage2)
    { 
      return {
        ...errorRevaluateForm,
        address: true
      };
    }
    if(validationMessage === locationUrlFieldMessage1 || validationMessage === locationUrlFieldMessage2)
    {
      return {
        ...errorRevaluateForm,
        locationUrl: true
      };
    }
   

    //? Better safe than sorry...
    return {
      expectedDuration: reportForm.expectedDuration === -1 ? true : false, //* always have selected value either -1 "-" or 1,2,3,24,48..., BUT IT SHOULD NOT BE -1 "-"
      description: !reportForm.description, 
      address: false, //* isn't required
      locationUrl: !reportForm.locationUrl,
      area: reportForm.area === "-" ? true : false
    };
  };