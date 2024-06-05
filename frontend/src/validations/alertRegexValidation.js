const minDescriptionWordCount = 2;
const maxDescriptionWordCount = 50;

const alertFormAllRequiredFieldsMessage = "Моля попълнете всички задължителни* полета.";
const descriptionFieldMessage1 = "Описанието трябва да съдържа минимум 2 думи.";
const descriptionFieldMessage2 = "Описанието не може да съдържа повече от 50 думи.";


const isDescriptionWordCountLess = (description) => {
    const wordCount = description.trim().split(/\s+/).length;
    return wordCount < minDescriptionWordCount ? true : false;
  };
const isDescriptionWordCountMore = (description) => {
    const wordCount = description.trim().split(/\s+/).length;
    return wordCount > maxDescriptionWordCount ? true : false;
  };







  export const validateAlertFormOnPublish = (alertForm) => { //? function returns error message
    if (!alertForm.zone || !alertForm.severity || !alertForm.description) 
    {
      return alertFormAllRequiredFieldsMessage; //! error
    }
  
    else
    {
        if (isDescriptionWordCountLess(alertForm.description)) {return descriptionFieldMessage1;} //! error
        if (isDescriptionWordCountMore(alertForm.description)) {return descriptionFieldMessage2;} //! error

        return ""; //* OK
    }
  };

  export const processErrorAlertFormOnPublish = (alertForm, errorAlertForm, validationMessage) => { //?  returns an object with the same structure as errorAlertForm, where each field is true if there's an error (validation fails) or false otherwise.
  
    if(validationMessage === alertFormAllRequiredFieldsMessage)
    {
      return {
        zone: !alertForm.zone,
        severity: !alertForm.severity,
        description: !alertForm.description
      };
    }
    if(validationMessage === descriptionFieldMessage1 || validationMessage === descriptionFieldMessage2)
    {
      return {
        ...errorAlertForm,
        description: true
      };
    }

    //? Better safe than sorry...
    return {
        zone: !alertForm.zone,
        severity: !alertForm.severity,
        description: !alertForm.description
    };
  };