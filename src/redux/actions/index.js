export const ADD_USER = 'ADD_USER';
export const ADD_USER_TOKEN = 'ADD_USER_TOKEN';
export const ADD_PATIENT = 'ADD_PATIENT';
export const ADD_USER_LOCATION = 'ADD_USER_LOCATION';
export const ADD_DRIVER = 'ADD_DRIVER';
export const REQUEST_AMBULANCE = 'REQUEST_AMBULANCE';
export const ADD_DRIVER_LOCATION="ADD_DRIVER_LOCATION";
export const PICKED_UP_PATIENT="PICKED_UP_PATIENT";
export const PICKED_UP_PATIENT_COMPLETE="PICKED_UP_PATIENT_COMPLETE";
export const CANCEL_CALL_AMBULANCE="CANCEL_CALL_AMBULANCE";
export function addUser(user) {
	return { type: ADD_USER, data: user };
}
export function addDriver(showDriver, driver) {
	return { type: ADD_DRIVER, data: { showDriver: showDriver, driver: driver } };
}
export function requestAmbulance(value) {
	return { type: REQUEST_AMBULANCE, data: value };
}
export function addPatient(patient) {
	return { type: ADD_PATIENT, data: patient };
}
export function addUserToken(token) {
	console.warn('adding ', token);
	return { type: ADD_USER_TOKEN, data: token };
}
export function addLocation(location) {
	console.log('Location ', location);
	return { type: ADD_USER_LOCATION, data: location };
}
export function addDriverLocation(location){
	return {type:ADD_DRIVER_LOCATION,data:location}
}
export function pickedUpPatient(status)
{
	console.warn("Pickedup called")
	return {type:PICKED_UP_PATIENT,data:status}
}
export function markComplete(cancelAll){
	return {type:PICKED_UP_PATIENT_COMPLETE,data:cancelAll}
}
export function cancelCallAmbulance(status)
{
	return {type:CANCEL_CALL_AMBULANCE,data:status}
}