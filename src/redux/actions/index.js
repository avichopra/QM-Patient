export const ADD_USER = 'ADD_USER';
export const ADD_USER_TOKEN = 'ADD_USER_TOKEN';
export const ADD_PATIENT = 'ADD_PATIENT';
export const ADD_USER_LOCATION = 'ADD_USER_LOCATION';
export const REQUEST_AMBULANCE = 'REQUEST_AMBULANCE';
export const CANCEL_CALL_AMBULANCE = 'CANCEL_CALL_AMBULANCE';
export const ADD_GPS_DATA = 'ADD_GPS_DATA';
export const ADD_AMBULANCE_REQUEST = 'ADD_AMBULANCE_REQUEST';
export const ADD_TRIP = 'ADD_TRIP';
export const CANCEL_ALL_REQUEST = 'CANCEL_ALL_REQUEST';
export const ADD_PATIENT_LOCATION_COORD = 'ADD_PATIENT_LOCATION_COORD';
export const ADD_HOSPITAL_LOCATION_COORD = 'ADD_HOSPITAL_LOCATION_COORD';
export const CANCEL_PICKED_LOCATION_COORD = 'CANCEL_PICKED_LOCATION_COORD';
export const ADD_PICKUP_LOCATION = 'ADD_PICKUP_LOCATION';
export function addUser(user) {
  return { type: ADD_USER, data: user };
}
export function requestAmbulance(value) {
  return { type: REQUEST_AMBULANCE, data: value };
}
export function addPatient(patient) {
  return { type: ADD_PATIENT, data: patient };
}
export function addUserToken(token) {
  return { type: ADD_USER_TOKEN, data: token };
}
export function addLocation(location) {
  return { type: ADD_USER_LOCATION, data: location };
}
export function cancelCallAmbulance(status) {
  return { type: CANCEL_CALL_AMBULANCE, data: status };
}
export function addGPSData(gps_data) {
  return { type: ADD_GPS_DATA, data: gps_data };
}
export function addAmbulanceRequest(requestData) {
  return { type: ADD_AMBULANCE_REQUEST, data: requestData };
}
export function addTrip(tripData) {
  return { type: ADD_TRIP, data: tripData };
}
export function cancelAllRequest() {
  return { type: CANCEL_ALL_REQUEST };
}
export function addPatientLocationCoord(
  pickedLocation,
  duration,
  pickedReRoute
) {
  return {
    type: ADD_PATIENT_LOCATION_COORD,
    data: {
      pickedLocation: pickedLocation,
      duration: duration,
      pickedReRoute: pickedReRoute
    }
  };
}
export function addHospitalLocationCoord(
  hospitalLocation,
  duration,
  hospitalReRoute
) {
  return {
    type: ADD_HOSPITAL_LOCATION_COORD,
    data: {
      hospitalLocation: hospitalLocation,
      duration: duration,
      hospitalReRoute: hospitalReRoute
    }
  };
}
export function cancelPickedLocationCoord() {
  return {
    type: CANCEL_PICKED_LOCATION_COORD
  };
}
export function addPickupLocation(locationData) {
  return {
    type: ADD_PICKUP_LOCATION,
    data: locationData
  };
}
