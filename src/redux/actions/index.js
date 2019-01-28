export const ADD_USER = 'ADD_USER';
export const ADD_USER_TOKEN = 'ADD_USER_TOKEN';
export const ADD_PATIENT = 'ADD_PATIENT';
export function addUser(user) {
	return { type: ADD_USER, data: user };
}
export function addPatient(patient) {
	return { type: ADD_PATIENT, data: patient };
}
export function addUserToken(token) {
	console.log('adding ', token);
	return { type: ADD_USER_TOKEN, data: token };
}
