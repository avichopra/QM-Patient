import { addUser, addUserToken, addPatient } from './actions/index';
import * as Storage from '../utilities/asyncStorage';
import Store from './store/index';
export function setUser(user) {
	Store.dispatch(addUser(user));
	Storage.set('user', user);
}
export function setPatient(patient) {
	Store.dispatch(addPatient(patient));
}
export function setUserToken(token) {
	Store.dispatch(addUserToken(token));
	Storage.set('token', token);
}
export function setUserRefreshToken(refresshToken){
	Storage.set('refreshToken',refresshToken)
}
