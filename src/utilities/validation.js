function checkField(field, data) {
  if (data === '') return `${field} cannot be empty`;
  return true;
}
function isValidEmail(email) {
  if (email === '') return 'Email Cannot be Empty';
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function isValidContactnumber(contactnumber) {
  if (contactnumber === '') return 'Contact Number cannot be Empty';
  if (contactnumber.length < 10) return 'Enter Valid Contact Number';
  return true;
}
function isValidAge(age) {
  if (age === '') return 'Age cannot be empty';
  if (age.length > 3) return 'Enter Valid Age';
  return true;
}
function isValidPassword(password) {
  if (password === '') return 'Password cannot be empty';
  if (password.length < 6) return 'Password must be greater than 6';
  return true;
}
function isValidConfirmPassword(password, confirmpassword) {
  if (confirmpassword === '') return 'Confirm Password cannot be Empty';
  if (confirmpassword !== password) return 'Password not Match';
  return true;
}

function isValidPicture(picture) {
  if (picture == null) return 'Picture cannot be empty';
}
function isValidOTP(otp) {
  if (otp === '') return 'OTP cannot be Empty';
  if (otp.length < 6) return 'Enter Valid OTP';
  return true;
}
function checkEmpty(field) {
  if (field === '') return true;
  else return false;
}
export {
  isValidAge,
  checkField,
  isValidEmail,
  isValidContactnumber,
  isValidPassword,
  isValidConfirmPassword,
  isValidPicture,
  checkEmpty,
  isValidOTP
};
