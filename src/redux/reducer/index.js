import {
	ADD_USER,
	ADD_USER_TOKEN,
	ADD_PATIENT,
	ADD_USER_LOCATION,
	ADD_DRIVER,
	REQUEST_AMBULANCE
} from '../actions/index';
export const initialState = {
	user: null,
	token: null,
	patient: null,
	driver: null,
	showDriver: false,
	Location: null,
	requestAmbulance: false
};
export default function(state = {}, action) {
	switch (action.type) {
		case ADD_USER:
			console.log('adding the usersssssssssssssssssssssssssssssssssss ', action.data);
			return { ...state, user: action.data };
		case ADD_USER_TOKEN:
			console.log('User token added in redux state', action.data);
			return { ...state, token: action.data };
		case ADD_PATIENT:
			console.log('User token added in redux state', action.data);
			return { ...state, patient: action.data };
		case ADD_DRIVER:
			return {
				...state,
				showDriver: action.data.showDriver,
				driver: action.data.driver.id ? action.data.driver : null
			};
		case REQUEST_AMBULANCE:
			return { ...state, requestAmbulance: action.data };
		case ADD_USER_LOCATION:
			return { ...state, Location: action.data };
		// case CHANGE_STATE:
		// 	return { ...state, [action.data.field]: action.data.value };
		default:
			return { ...state };
	}
}
