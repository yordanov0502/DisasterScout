const usernameRegex = /^(?![_.])[a-zA-Z0-9_.]{3,20}(?<![_.])$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_*~!)(./:;?{}|`',-])[0-9a-zA-Z@#$%^&+=_*~!)(./:;?{}|`',-]{8,30}$/;
const asciiPrintableRegex = /^[\x20-\x7E]*$/; //? Used to check whether password contains only ASCII characters
const emailRegex = /^[a-z][a-z0-9_.-]{2,29}@[a-z]{3,20}\.[a-z0-9.-]{2,20}$/;
const nameRegex = /^[А-ЯA-Z][а-яa-z]{2,19}$/;
const idRegex = /\b[0-9]{2}(?:0[1-9]|1[0-2]|2[1-9]|3[0-2]|4[1-9]|5[0-2])(?:0[1-9]|[1-2][0-9]|3[0-1])[0-9]{4}\b/;
//* Using asciiPrintableRegex might be useless as there is specified set of printable characters defined in the passwordRegex                   

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

  if (!isCurrentPasswordValid) {return "Невалиден формат на текущата парола. Изисквания: [бр.символи 8-30, поне 1 малка латинска буква, поне 1 главна латинска буква, поне 1 цифра, поне 1 спец. символ, без интервали]";} //! error
  if (!isNewPasswordValid) {return "Невалиден формат на новата парола. Изисквания: [бр.символи 8-30, поне 1 малка латинска буква, поне 1 главна латинска буква, поне 1 цифра, поне 1 спец. символ, без интервали]";} //! error
  if (!isConfirmNewPasswordValid) {return "Невалиден формат на потвърждението. Изисквания: [бр.символи 8-30, поне 1 малка латинска буква, поне 1 главна латинска буква, поне 1 цифра, поне 1 спец. символ, без интервали]";} //! error


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

export const processDispatcherForm = (dispatcherForm) => { //?  returns an object with the same structure as errorForm, where each field is true if there's an error (validation fails) or false otherwise.
  return {
    id: dispatcherForm.id !== "" && !idRegex.test(dispatcherForm.id),
    firstName: dispatcherForm.firstName !== "" && !nameRegex.test(dispatcherForm.firstName),
    lastName: dispatcherForm.lastName !== "" && !nameRegex.test(dispatcherForm.lastName),
    email: dispatcherForm.email !== "" && !emailRegex.test(dispatcherForm.email),
    username: dispatcherForm.username !== "" && !usernameRegex.test(dispatcherForm.username),
    password: dispatcherForm.password !== "" && !passwordRegex.test(dispatcherForm.password)
  };
};

export const validateDispatcherFormOnSubmit = (dispatcherForm) => { //? function returns error message

  if (!dispatcherForm.id || !dispatcherForm.firstName || !dispatcherForm.lastName || !dispatcherForm.email || !dispatcherForm.username || !dispatcherForm.password) 
  {
    return "Моля въведете данни във всички полета."; //! error
  }

  const isIdValid = idRegex.test(dispatcherForm.id);
  const isFirstNameValid = nameRegex.test(dispatcherForm.firstName);
  const isLastNameValid = nameRegex.test(dispatcherForm.lastName);
  const isEmailValid = emailRegex.test(dispatcherForm.email);
  const isUsernameValid = usernameRegex.test(dispatcherForm.username);
  const isPasswordValid = passwordRegex.test(dispatcherForm.password) && asciiPrintableRegex.test(dispatcherForm.password);
  
  if (!isIdValid) {return "Невалидно ЕГН.";} //! error
  if (!isFirstNameValid) {return "Невалидно име.";} //! error
  if (!isLastNameValid) {return "Невалидна фамилия.";} //! error
  if (!isEmailValid) {return "Невалиден имейл адрес.";} //! error
  if (!isUsernameValid) {return "Невалидно потребителско име. Изисквания: [бр.символи 3-20, може да съдържа малки и главни латински букви както и цифри от 0 до 9. Може да съдържа спец. символи . и _ но да не са в началото или края.]";} //! error
  if (!isPasswordValid) {return "Невалидна парола. Изисквания: [бр.символи 8-30, поне 1 малка латинска буква, поне 1 главна латинска буква, поне 1 цифра, поне 1 спец. символ, без интервали]";} //! error
  
    return ""; //* OK
};

export const processErrorDispatcherFormOnSubmit = (dispatcherForm, validationMessage) => { //?  returns an object with the same structure as errorForm, where each field is true if there's an error (validation fails) or false otherwise.
  
  if(validationMessage === "Моля въведете данни във всички полета.")
  {
    return {
      id: dispatcherForm.id ? false : true,
      firstName: dispatcherForm.firstName ? false : true,
      lastName: dispatcherForm.lastName ? false : true,
      email: dispatcherForm.email ? false : true,
      username: dispatcherForm.username ? false : true,
      password: dispatcherForm.password ? false : true,
    };
  }
  else
  {
    return {
      id: !idRegex.test(dispatcherForm.id),
      firstName: !nameRegex.test(dispatcherForm.firstName),
      lastName: !nameRegex.test(dispatcherForm.lastName),
      email: !emailRegex.test(dispatcherForm.email),
      username: !usernameRegex.test(dispatcherForm.username),
      password: !passwordRegex.test(dispatcherForm.password)
    };
  }
};

export const processErrorDispatcherFormOnServerResponse = (field) => { //?  returns an object with the same structure as errorForm, where each field is true if there's an error (validation fails) or false otherwise.
  
  if(field === "id")
  {
    return {
      id: true,
      firstName: false,
      lastName: false,
      email: false,
      username: false,
      password: false,
    };
  }
  if(field === "email")
  {
    return {
      id: false,
      firstName: false,
      lastName: false,
      email: true,
      username: false,
      password: false,
    };
  }
  if(field === "username")
  {
    return {
      id: false,
      firstName: false,
      lastName: false,
      email: false,
      username: true,
      password: false,
    };
  }
  
};