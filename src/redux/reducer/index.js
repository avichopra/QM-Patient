import {
  ADD_USER,
  ADD_USER_TOKEN,
  ADD_PATIENT,
  ADD_USER_LOCATION,
  REQUEST_AMBULANCE,
  CANCEL_CALL_AMBULANCE,
  ADD_GPS_DATA,
  ADD_AMBULANCE_REQUEST,
  ADD_TRIP,
  CANCEL_ALL_REQUEST,
  ADD_HOSPITAL_LOCATION_COORD,
  ADD_PATIENT_LOCATION_COORD,
  CANCEL_PICKED_LOCATION_COORD,
  ADD_PICKUP_LOCATION
} from '../actions/index';
export const initialState = {
  user: null,
  token: null,
  patient: null,
  Location: null,
  requestAmbulance: false,
  callAmbulance: true,
  gpsData: null,
  ambulanceRequested: null,
  trip: null,
  pickedLocationCoord: null,
  hospitalLocationCoord: null,
  pickedDuration: null,
  hospitalDuration: null,
  pickupLocation: null,
  pickedReRoute: null,
  hospitalReRoute: null
};
export default function(state = {}, action) {
  switch (action.type) {
    case CANCEL_CALL_AMBULANCE:
      return { ...state, callAmbulance: action.data };
    case ADD_USER:
      return { ...state, user: action.data };
    case ADD_USER_TOKEN:
      return { ...state, token: action.data };
    case ADD_PATIENT:
      return { ...state, patient: action.data };
    case REQUEST_AMBULANCE:
      return { ...state, requestAmbulance: action.data };
    case ADD_USER_LOCATION:
      return { ...state, Location: action.data };
    case ADD_GPS_DATA:
      return { ...state, gpsData: action.data };
    case ADD_AMBULANCE_REQUEST:
      return { ...state, ambulanceRequested: action.data };
    case ADD_TRIP:
      return { ...state, trip: action.data };
    case CANCEL_ALL_REQUEST:
      return {
        ...state,
        callAmbulance: true,
        ambulanceRequested: null,
        trip: null,
        pickedLocationCoord: null,
        hospitalLocationCoord: null,
        pickupLocation: null
      };
    case ADD_PATIENT_LOCATION_COORD:
      return {
        ...state,
        pickedLocationCoord: action.data.pickedLocation,
        pickedDuration: action.data.duration,
        pickedReRoute: action.data.pickedReRoute
      };
    case ADD_HOSPITAL_LOCATION_COORD:
      return {
        ...state,
        hospitalLocationCoord: action.data.hospitalLocation,
        hospitalDuration: action.data.duration,
        hospitalReRoute: action.data.hospitalReRoute
      };
    case CANCEL_PICKED_LOCATION_COORD:
      return {
        ...state,
        pickedLocationCoord: null
      };
    case ADD_PICKUP_LOCATION:
      return {
        ...state,
        pickupLocation: action.data
      };
    default:
      return { ...state };
  }
}
