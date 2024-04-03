const usernameRegex = /^(?!\\.)(?!.*[._]{2})[a-zA-Z0-9_.]{2,19}[a-zA-Z0-9_]$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_*~!)(./:;<>?{}|`',-])(?=\S+$).{8,30}$/;
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

export const processErrorForm = (accountForm) => { //?  returns an object with the same structure as errorForm, where each field is true if there's an error (validation fails) or false otherwise.
  const errors = {
    firstName: !nameRegex.test(accountForm.firstName),
    lastName: !nameRegex.test(accountForm.lastName),
    email: !emailRegex.test(accountForm.email),
    username: !usernameRegex.test(accountForm.username),
  };
  return errors;
};

export const validateAccountForm = (accountForm,authenticatedUser) => { //? function returns error message

  if (!accountForm.firstName) {
    return "Моля въведете име."; //! error
  }
  
  if (!accountForm.lastName) {
    return "Моля въведете фамилия."; //! error
  }

  if (!accountForm.email) {
    return "Моля въведете имейл адрес."; //! error
  }

  if (!accountForm.username) {
    return "Моля въведете потребителско име."; //! error
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