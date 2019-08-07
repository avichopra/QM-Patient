import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const Palette = {
  hB: '#f6263f',
  w: 'white'
};
export default StyleSheet.create({
  modalStyle: {
    display: 'flex',
    backgroundColor: 'rgb(255,255,255)',
    marginTop: 100,
    marginBottom: 30,
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 2
  },
  emergencyCallButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 170,
    width: 80,
    height: 80,
    borderRadius: 60,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  callAmbulance: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
    marginVertical: 10,
    width: '100%'
  },
  rippleLoader: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(174,182,191,0.8)',
    height: height - 190,
    top: 50
  },
  selfCheckBoxWrapper: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2d76d4',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  otherselfWrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'rgb(255,255,255)',
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 2
  },
  checkboxstyles: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#2d76d4'
  },
  cancelSubmitStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: '45%',
    height: 50,
    backgroundColor: '#2d76d4',
    borderRadius: 2
  },
  searchBar: {
    width: '96%',
    height: 50,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 20,
    position: 'absolute',
    marginTop: 60
  },
  markerStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderColor: 'black',
    display: 'flex',
    flexDirection: 'row'
  },
  checkBox: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2d76d4',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  innerCheckBoxStyle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#2d76d4'
  },
  h200: { height: 200 },
  call: {
    height: 30,
    width: 80,
    backgroundColor: '#76d015',
    borderRadius: 30,
    flexDirection: 'row'
  },
  bold: { fontFamily: 'NunitoSans-SemiBold' },
  wbg: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white'
  },
  map: {
    flexGrow: 1
  },
  frSelf: { flexDirection: 'row', alignSelf: 'center' },
  divider: {
    height: 0.8,
    backgroundColor: 'rgba(215,219,221,0.7)',
    width: '100%'
  },
  circle50: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  f8: {
    flex: 8
  },
  f1: {
    flexGrow: 1
  },
  f2: {
    flex: 1
  },
  f10: {
    textAlign: 'center',
    marginTop: 13,
    fontSize: 14,
    color: '#2948ff',
    letterSpacing: 0
  },
  f3: {
    flex: 6
  },
  d6: {
    width: 40,
    height: 20
  },
  d1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  d2: {
    width: 120,
    height: 120
  },
  a9: {
    justifyContent: 'flex-end',

    flexGrow: 1,
    marginVertical: 30,
    flexDirection: 'row'
  },
  a1: {
    alignSelf: 'center'
  },
  d3: {
    marginVertical: 30
  },
  d4: {
    flexDirection: 'row',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    width: width - 30,
    height: 60
  },
  a10: {
    backgroundColor: 'white',
    borderRadius: 1,
    width: Dimensions.get('window').width / 2 - 30,
    height: 45,
    margin: 10
  },
  a11: {
    borderRadius: 1,
    width: Dimensions.get('window').width / 2 - 30,
    height: 45,
    margin: 10
  },
  d5: {
    width: 20,
    height: 16,
    marginVertical: 30,
    marginHorizontal: 10
  },
  b1: {
    borderWidth: 0
  },
  i1: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Nunito Regular',
    letterSpacing: 0
  },
  c1: {
    color: 'red'
  },
  j1: {
    justifyContent: 'flex-end'
  },
  d7: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  c2: {
    backgroundColor: 'white',
    borderRadius: 1,
    width: Dimensions.get('window').width - 30,
    height: 45,
    marginVertical: 15
  },
  header: {
    width: '100%',
    backgroundColor: 'blue'
  },
  fr: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  headerIcon: { height: 30, width: '19%', marginTop: 10, marginLeft: 5 },
  HText: { height: 30, width: '60%', alignItems: 'center', marginTop: 10 },
  HTitle: { color: 'white', fontSize: 18 },
  circle: {
    height: 95,
    width: 95,
    borderRadius: 50
  },
  circleBorder: {
    borderWidth: 1.5,
    borderColor: 'white'
  },
  HImage: {
    marginTop: 10,
    alignSelf: 'center'
  },
  cameraContainer: {
    height: 35,
    width: 100,
    borderRadius: 50,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 60,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  cameraIcon: {
    height: 28,
    width: 28,
    borderRadius: 50,
    resizeMode: 'contain'
  },
  nameContainer: {
    height: 35,
    width: '70%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  name: {
    height: 40,
    width: '95%',
    alignSelf: 'center',
    color: 'white',
    fontSize: 16
  },
  close: { height: 10, width: 10, alignSelf: 'flex-end', marginVertical: 10 },
  icon19: { height: 19, width: 19 },
  icon40: { height: 40, width: 40 },
  f18: { fontSize: 18, color: 'black' }
});
