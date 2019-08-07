export function timeCalculate(expireTime) {
  let expireIn = new Date(expireTime);
  let currentTime = new Date();
  console.log('Expiretime', expireIn, 'current', currentTime);
  let diff = (expireIn.getTime() - currentTime.getTime()) / 1000 / 60;
  if (diff < 1) {
    return true;
  }
  return false;
}
