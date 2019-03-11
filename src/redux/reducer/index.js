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
} from '../actions/index';
export const initialState = {
	user: null,
	token: null,
	patient: null,
	Location: null,
	requestAmbulance: false,
	callAmbulance:true,
	gpsData:null,
	ambulanceRequested:null,
	trip:null,
	pickedLocationCoord:null,
	hospitalLocationCoord:null,
	pickedDuration:null,
	hospitalDuration:null
};
export default function(state = {}, action) {
	switch (action.type) {
		case CANCEL_CALL_AMBULANCE:
		return {...state,callAmbulance:action.data}
		case ADD_USER:
			console.log('adding the usersssssssssssssssssssssssssssssssssss ', action.data);
			return { ...state, user: action.data };
		case ADD_USER_TOKEN:
			console.log('User token added in redux state', action.data);
			return { ...state, token: action.data };
		case ADD_PATIENT:
			console.log('User token added in redux state', action.data);
			return { ...state, patient: action.data };
		case REQUEST_AMBULANCE:
			return { ...state, requestAmbulance: action.data };
		case ADD_USER_LOCATION:
			return { ...state, Location: action.data };
		case ADD_GPS_DATA:
		return {...state,gpsData:action.data}	
		case ADD_AMBULANCE_REQUEST:
		return {...state,ambulanceRequested:action.data}
		case ADD_TRIP:
		return {...state,trip:action.data}
		case CANCEL_ALL_REQUEST:
		return {...state,callAmbulance:true,ambulanceRequested:null,trip:null,pickedLocationCoord:null,hospitalLocationCoord:null}
		case ADD_PATIENT_LOCATION_COORD:
		return {...state,pickedLocationCoord:action.data.pickedLocation,pickedDuration:action.data.duration}
		case ADD_HOSPITAL_LOCATION_COORD:
		return {...state,hospitalLocationCoord:action.data.hospitalLocation,hospitalDuration:action.data.duration}
		default:
			return { ...state };
	}
}
