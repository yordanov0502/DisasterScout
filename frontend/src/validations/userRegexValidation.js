const usernameRegex = /^(?!\\.)(?!.*[._]{2})[a-zA-Z0-9_.]{2,19}[a-zA-Z0-9_]$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_*~!)(./:;<>?{}|`',-])(?=\S+$).{8,30}$/;
const asciiPrintableRegex = /^[\x20-\x7E]*$/; //? Used to check whether password contains only ASCII characters
const emailRegex = /^[a-z][a-z0-9_.-]{2,29}@[a-z]{3,20}\.[a-z0-9.-]{2,20}$/;
                   

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