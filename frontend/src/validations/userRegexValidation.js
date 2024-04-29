const usernameRegex = /^(?![_.])[a-zA-Z0-9_.]{3,20}(?<![_.])$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_*~!)(./:;?{}|`',-])[0-9a-zA-Z@#$%^&+=_*~!)(./:;?{}|`',-]{8,30}$/;
const asciiPrintableRegex = /^[\x20-\x7E]*$/; //? Used to check whether password contains only ASCII characters
const emailRegex = /^[a-z][a-z0-9_.-]{2,29}@[a-z]{3,20}\.[a-z0-9.-]{2,20}$/;
const nameRegex = /^[А-ЯA-Z][а-яa-z]{2,19}$/;
                   

export const validateLoginForm = (username, password) => { //? function returns error message
    const isUsernameValid = usernameRegex.test(username);
    const isPasswordValid = passwordRegex.test(password) && asciiPrintableRegex.test(password);

    if (!username || !password) {
        return "Моля въведете данни в полетата."; //! error
      } 
    else if (!isUsernameValid || !isPasswordValid) {
        return "Невалидно потребителско име или парола."; //! error
      } 
    else return ""; //* OK
 };

export const validateForgotPasswordForm = (email) => { //? function returns error message
  const isEmailValid = emailRegex.test(email);

  if (!email) {
      return "Моля въведете имейл адрес."; //! error
    } 
  else if (!isEmailValid) {
      return "Невалиден имейл адрес."; //! error
    } 
  else return ""; //* OK
};

export const validateAccountForm = (accountForm,authenticatedUser) => { //? function returns error message

  if (!accountForm.firstName || !accountForm.lastName || !accountForm.email || !accountForm.username) {
    return "Моля въведете данни във всички полета."; //! error
  }

  if(accountForm.firstName === authenticatedUser.firstName 
     && accountForm.lastName === authenticatedUser.lastName
     && accountForm.email === authenticatedUser.email
     && accountForm.username === authenticatedUser.username)
  {
    return "Моля въведете нови данни, в поне едно от полетата."; //! error
  }
  else
  {
    const isFirstNameValid = nameRegex.test(accountForm.firstName);
    const isLastNameValid = nameRegex.test(accountForm.lastName);
    const isEmailValid = emailRegex.test(accountForm.email);
    const isUsernameValid = usernameRegex.test(accountForm.username);
  
    if (!isFirstNameValid) {return "Невалидно име.";} //! error
    if (!isLastNameValid) {return "Невалидна фамилия.";} //! error
    if (!isEmailValid) {return "Невалиден имейл адрес.";} //! error
    if (!isUsernameValid) {return "Невалидно потребителско име.";} //! error
  
    return ""; //* OK
  }

};

export const processErrorForm = (accountForm) => { //?  returns an object with the same structure as errorForm, where each field is true if there's an error (validation fails) or false otherwise.
  return {
    firstName: !nameRegex.test(accountForm.firstName),
    lastName: !nameRegex.test(accountForm.lastName),
    email: !emailRegex.test(accountForm.email),
    username: !usernameRegex.test(accountForm.username),
  };
};

export const processErrorFormOnSubmit = (accountForm, validationMessage) => { //?  returns an object with the same structure as errorForm, where each field is true if there's an error (validation fails) or false otherwise.
  
  if(validationMessage === "Моля въведете нови данни, в поне едно от полетата.")
  {
    return {
      firstName: true,
      lastName: true,
      email: true,
      username: true,
    };
  }
  else
  {
    return {
      firstName: !nameRegex.test(accountForm.firstName),
      lastName: !nameRegex.test(accountForm.lastName),
      email: !emailRegex.test(accountForm.email),
      username: !usernameRegex.test(accountForm.username),
    };
  }
};

export const validateChangePasswordForm = (changePasswordForm) => { //? function returns error message

  if (!changePasswordForm.currentPassword || !changePasswordForm.newPassword || !changePasswordForm.confirmNewPassword) {
    return "Моля въведете данни във всички полета."; //! error
  }

  const isCurrentPasswordValid = passwordRegex.test(changePasswordForm.currentPassword);
  const isNewPasswordValid = passwordRegex.test(changePasswordForm.newPassword);
  const isConfirmNewPasswordValid = passwordRegex.test(changePasswordForm.confirmNewPassword);

  if (!isCurrentPasswordValid) {return "Невалиден формат на текущата парола. Изисквания: [бр.символи 8-30, поне 1 малка буква, поне 1 главна буква, поне 1 цифра, поне 1 спец. символ, без интервали]";} //! error
  if (!isNewPasswordValid) {return "Невалиден формат на новата парола. Изисквания: [бр.символи 8-30, поне 1 малка буква, поне 1 главна буква, поне 1 цифра, поне 1 спец. символ, без интервали]";} //! error
  if (!isConfirmNewPasswordValid) {return "Невалиден формат на потвърждението. Изисквания: [бр.символи 8-30, поне 1 малка буква, поне 1 главна буква, поне 1 цифра, поне 1 спец. символ, без интервали]";} //! error


  if(changePasswordForm.newPassword !== changePasswordForm.confirmNewPassword )
  {
    return "Полето за нова парола и полето за потвърждение се различават."; //! error
  }
  if(changePasswordForm.currentPassword === changePasswordForm.newPassword )
  {
    return "Новата парола трябва да се различава от текущата парола."; //! error
  }
  
    return ""; //* OK
}

export const processChangePasswordErrorForm = (changePasswordForm) => { //?  returns an object with the same structure as errorForm, where each field is true if there's an error (validation fails) or false otherwise.
  return {
    currentPassword: changePasswordForm.currentPassword !== "" && !passwordRegex.test(changePasswordForm.currentPassword),
    newPassword: changePasswordForm.newPassword !== "" && !passwordRegex.test(changePasswordForm.newPassword),
    confirmNewPassword: changePasswordForm.confirmNewPassword !== "" && !passwordRegex.test(changePasswordForm.confirmNewPassword),
  };
};

export const processChangePasswordErrorFormOnSubmit = (changePasswordForm, validationMessage) => { //?  returns an object with the same structure as errorForm, where each field is true if there's an error (validation fails) or false otherwise.
  
  if(validationMessage === "Полето за нова парола и полето за потвърждение се различават." ||
     validationMessage === "Новата парола трябва да се различава от текущата парола.")
  {
    return {
      currentPassword: false,
      newPassword: true,
      confirmNewPassword: true,
    };
  }
  else if(validationMessage === "Текущата парола, която сте въвели е грешна.")
  {
    return {
      currentPassword: true,
      newPassword: false,
      confirmNewPassword: false,
    };
  }
  else
  {
    return {
      currentPassword: !passwordRegex.test(changePasswordForm.currentPassword),
      newPassword: !passwordRegex.test(changePasswordForm.newPassword),
      confirmNewPassword: !passwordRegex.test(changePasswordForm.confirmNewPassword),
    };
  }
};

export const validateChangeUsername = (username, authenticatedUserUsername) => { //? function returns error message

  if (!username) { return "Моля въведете потребителско име на диспечер.";} //! error

  const isUsernameValid = usernameRegex.test(username);
  if (!isUsernameValid) {return "Невалидно потребителско име.";} //! error
  
  //? when admin tries to clear cache of dispatcher,but instead gives his own username
  if(username === authenticatedUserUsername) {return "Диспечер с потребителско име \""+username+"\" не съществува.";} //! error

    return ""; //* OK
}

export const processChangeUsernameError = (username) => { 
  return username !== "" && !usernameRegex.test(username)
};

export const validateUsernameInLoggerOnSearch = (username) => { //? function returns error message

  if (!username) { return "Моля въведете потребителско име.";} //! error

  const isUsernameValid = usernameRegex.test(username);
  if (!isUsernameValid) {return "Невалидно потребителско име.";} //! error
  
  return ""; //* OK
}
