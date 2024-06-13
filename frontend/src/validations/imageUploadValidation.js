const validImageTypes = ['image/jpeg','image/jpg','image/png',];
const maxSize = 10485760; //? Bytes = 10MB

const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

export const validateImageOnUpload = (imageForUpload) => { //? function returns error message

    //! if(!imageForUpload) { return "Моля прикачете изображение.";} //! NOT NEEDED AS IMAGE UPLOAD IS OPTIONAL

    if(!validImageTypes.includes(imageForUpload.type.toLowerCase())) {return "Форматът на изображението трябва да бъде 'jpeg', 'jpg' или 'png'."} //! error

    if(imageForUpload.size > maxSize) {return "Размерът на изображението не може да е повече от 10MB.";} //! error

 
    const today = new Date();
    const fileDate = new Date(imageForUpload.lastModifiedDate);
    if (!isSameDay(today, fileDate)) {return "Изображението НЕ е от днес.";} //! error

    //! To test when from phone and see whether the lastModifiedDate is available
    //! Also after commit/push to try to use the exif-js library
    
    return ""; //* OK
  }