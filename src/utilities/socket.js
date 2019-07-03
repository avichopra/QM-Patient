import io from 'socket.io-client';
import config from '../config/index';
import Store from '../redux/store/index';
import { addGPSData, addTrip, cancelAllRequest, cancelPickedLocationCoord } from '../redux/actions';

let ViewIdSubscriptionMap = {};
let socket = undefined;
export function connectToSocket() {
  return new Promise((resolve, reject) => {
    const options = {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 99999,
      secure: true
    };
    socket = io.connect(config.SERVER_SOCKET_URL, options);
    socket.on('connect', () => {
      for (let [viewName, groupIds] of Object.entries(ViewIdSubscriptionMap)) {
        subscribeGroups(groupIds);
      }
    });
    socket.on('disconnect', () => {
      console.warn('disconected');
    });
    socket.on('subscription_id', data => {
      resolve(data);
    });
    socket.on('error', err => {
      reject(err);
    });
    socket.on('connect_error', err => {
      reject(err);
    });
    socket.on('connect_failed', err => {
      reject(err);
    });
    socket.on('updateInRow', socketData => {
      if (socketData.data.filter === 'onAccept') {
        saveSubscriptionInfo('OnAccept', [socketData.data.trip.deviceId]);
        Store.dispatch(addTrip(socketData.data.trip));
      }
      if (socketData.data.filter === 'pickedUpPatient') {
        Store.dispatch(addTrip(socketData.data.trip));
        Store.dispatch(cancelPickedLocationCoord());
      }
      if (socketData.data.filter === 'MarkComplete') {
        unSubscribeSockets('OnAccept');
        Store.dispatch(cancelAllRequest());
      }
      if (socketData.data.filter === 'Gps_Device_Data') {
        Store.dispatch(addGPSData(socketData.data.data));
      }
    });
  });
}

export function disconnectSocket() {
  if (socket) socket.disconnect();
}
export function saveSubscriptionInfo(viewName, groupIds) {
  ViewIdSubscriptionMap[viewName] = ViewIdSubscriptionMap[viewName] || [];

  if (groupIds && groupIds.length > 0) {
    for (let groupId of groupIds) {
      if (!ViewIdSubscriptionMap[viewName].indexOf(groupId) >= 0) ViewIdSubscriptionMap[viewName].push(groupId);
    }
  }
  subscribeGroups(groupIds);
}

export function unSubscribeSockets(viewName) {
  let groupIds = ViewIdSubscriptionMap[viewName];
  delete ViewIdSubscriptionMap[viewName];
  if (!groupIds || groupIds.length < 1) {
    return;
  }
  if (!isInViewIdSubscriptionMap(groupIds)) {
    unSubscribeGroups(groupIds);
  }
}

export function onSocketData(groupId, viewName, onData) {}
export function subscribeGroups(groups) {
  socket.emit('subscribe', groups);
}
function unSubscribeGroups(groups) {
  socket.emit('unsubscribe', groups);
}
function isInViewIdSubscriptionMap(groupIds) {
  for (let groupId of groupIds) {
    for (let groupIdArray of Object.values(ViewIdSubscriptionMap)) {
      if (groupIdArray && groupIdArray.indexOf(groupId) >= 0) {
        return true;
      }
    }
  }
  return false;
}
