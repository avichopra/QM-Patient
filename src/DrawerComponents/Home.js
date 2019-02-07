import React, { Component } from 'react';
import Header from './Header';
import PolyLine from '@mapbox/polyline';
import {
	Platform,
	StyleSheet,
	PermissionsAndroid,
	Text,
	View,
	Dimensions,
	TextInput,
	Image,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import _ from 'lodash';
import { connectToSocket } from '../utilities/socket';
import { callApi } from '../utilities/serverApi';
import { connect } from 'react-redux';
import { setPatient } from '../redux/index';
const { width, height } = Dimensions.get('window');
// const Aspect_Ratio = width /height;
// let latitude_Delta = 0.0922;
// let longitude_Delta = latitude_Delta * Aspect_Ratio;
import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Polyline } from 'react-native-maps';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import Store from '../redux/store/index';
import { addLocation } from '../redux/actions/index';
import Button from '../ReusableComponents/Button';
import Base from './HomeBase';
import CallAmbulance from './HomeComponents/CallAmbulance';
import SearchingNearby from './HomeComponents/SearchingNearby';
import ShowDriver from './HomeComponents/ShowDriver';
let latitude_delta, longitude_delta;

// import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
// import Store from "../redux/store/index"
// import {addLocation} from "../redux/actions/index"

let e;

let response = {
	geocoded_waypoints: [
		{
			geocoder_status: 'OK',
			place_id: 'ChIJa147K9HX3IAR-lwiGIQv9i4',
			types: [ 'amusement_park', 'establishment', 'point_of_interest' ]
		},
		{
			geocoder_status: 'OK',
			place_id: 'ChIJzzgyJU--woARcZqceSdQ3dM',
			types: [ 'amusement_park', 'establishment', 'point_of_interest' ]
		}
	],
	routes: [
		{
			bounds: {
				northeast: {
					lat: 34.1373841,
					lng: -117.9220826
				},
				southwest: {
					lat: 33.8151707,
					lng: -118.357552
				}
			},
			copyrights: 'Map data ©2019 Google',
			legs: [
				{
					distance: {
						text: '36.0 mi',
						value: 57975
					},
					duration: {
						text: '52 mins',
						value: 3149
					},
					end_address: '100 Universal City Plaza, Universal City, CA 91608, USA',
					end_location: {
						lat: 34.1364887,
						lng: -118.3569926
					},
					start_address: '1313 Disneyland Dr, Anaheim, CA 92802, USA',
					start_location: {
						lat: 33.8162219,
						lng: -117.9224731
					},
					steps: [
						{
							distance: {
								text: '59 ft',
								value: 18
							},
							duration: {
								text: '1 min',
								value: 2
							},
							end_location: {
								lat: 33.8160679,
								lng: -117.9225314
							},
							html_instructions: 'Head <b>south</b>',
							polyline: {
								points: 'kvkmElvvnUJ'
							},
							start_location: {
								lat: 33.8162219,
								lng: -117.9224731
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '0.4 mi',
								value: 569
							},
							duration: {
								text: '2 mins',
								value: 142
							},
							end_location: {
								lat: 33.8151707,
								lng: -117.9280369
							},
							html_instructions: 'Keep <b>left</b>',
							maneuver: 'keep-left',
							polyline: {
								points: 'mukmExvvnUH@H@JDJHNJJJPTNLb@B`@?h@@v@DdYZ?R?'
							},
							start_location: {
								lat: 33.8160679,
								lng: -117.9225314
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '0.6 mi',
								value: 1028
							},
							duration: {
								text: '2 mins',
								value: 110
							},
							end_location: {
								lat: 33.8200876,
								lng: -117.9228559
							},
							html_instructions: 'Turn <b>left</b>',
							maneuver: 'turn-left',
							polyline: {
								points:
									'yokmEfywnUAyW?u@@k@Cg@EUO]KSOSIOKQOOQK]U[Mm@Q}@Ug@Km@Ig@Ec@A[?U@U@U@[DA?WBG@g@HkAZeAVkBb@_AV_@N'
							},
							start_location: {
								lat: 33.8151707,
								lng: -117.9280369
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '230 ft',
								value: 70
							},
							duration: {
								text: '1 min',
								value: 6
							},
							end_location: {
								lat: 33.8206848,
								lng: -117.9230995
							},
							html_instructions: 'Merge onto <b>Disneyland Dr</b>',
							maneuver: 'merge',
							polyline: {
								points: 'qnlmEzxvnUG@SFEBsA`@'
							},
							start_location: {
								lat: 33.8200876,
								lng: -117.9228559
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '22.3 mi',
								value: 35908
							},
							duration: {
								text: '27 mins',
								value: 1605
							},
							end_location: {
								lat: 34.0256221,
								lng: -118.2059515
							},
							html_instructions:
								'Slight <b>right</b> to merge onto <b>I-5 N</b> toward <b>Los Angeles</b>',
							polyline: {
								points:
									'grlmEjzvnUu@MKCIAWI_Cy@WGSGMEQEKCYCMAU?a@@E@E?MBE@I@IBKBWLE@EBIDGDKF}ArAeFlEWTs@l@qAjA_@]p@}ApAg@b@iAdA}BbCSTYXmExEsAxAOP[^cBlBw@x@qBtB}@~@{B`Cs@x@KLEBEDSPGF_BhCa@r@Wh@Wf@Sf@c@jAOb@K^ITW`AMd@_@xAWnAU`Bm@jEi@`Eu@hFOv@GXWlAMh@e@|AM`@M^KX{@vBkJtSmKhVgB|DiFlLeFfLWl@Q^Uf@_@t@a@r@a@r@A@Yd@y@zA}@|AQZYd@[h@U`@QZ[l@c@|@_@v@{@rBUn@s@hB_BjE_BtDuEhLu@hB[t@aChGQf@{CjHcDtHiItRkAdCuAdCy@rAgA~Aa@l@aB|BGHgAtAu@dAeGlIe@z@?@A@IPKRA@?@GJSd@_@~@Qh@Qh@WdAADIb@YrAe@~BGREVSbAU~@kAlE_A|Eg@zBADWbAOn@}@hCQh@k@~AcB~DYp@Wh@qAjCc@x@yBvD_BpC[f@eAfBgChFaBrDc@`AyHhQsAbDmAjCKV]v@uBxEuBvEoBnEsAnCABGHGNINEJCJGJGRc@`A[t@c@`AoAlCmBjEMZ]t@_@z@w@bBe@|@c@r@OTOTUg@v@a@h@g@n@e@j@Y^QRi@l@_@b@MPA?_@f@GFw@`AiBjCe@r@S^a@t@Ub@g@fACDq@xAm@tAqAxCiBbEg@lAcAzBYl@Wn@GJIRaBxDuCvGuEnK_ArBiBbE}@rBcAzBqBtEkBdEqA|CiAtBaD`GuAhCgAzBo@xAw@rBk@~Aq@xAcA|BoBtDYh@GJGLMVGNsA`Dc@bASj@y@rBcB|D_B~Da@bAsAjDyDjJi@nAm@vAsA`DmB`FIPwC~GiF|KaAlBmBvD{AzC{GzMkCpFsKhUkAhCcArCkBfEoBjEaAhBmAzBa@t@a@t@mAlBmAlBaB~BiBbCi@p@m@r@mBtBaChCmChCEBwBpB}CdEIL}ArCgBfBqAnA_A`AQVo@r@sAdBo@x@Yd@g@x@Wd@[j@c@|@oArCw@zAIPm@tAq@`BmAlCeAnBu@lAg@t@cBfCuDvEgEpEqAhAkA~@OLUNSNsCjBu@d@u@d@gDrBg@Zg@Z]Ra@TIFc@VGDu@`@iEpCsAz@uFjDgWdP{BhAa@PeAV_FxAg@Ze@e@VeBdAgKtGgAx@eDvB_GxEcAn@SLm@^wAz@a@Ve@ZiEdCqAt@wBnAGBoBjA}BrAKFGDu@b@k@Xi@XWNcB`Aa@VoDvBwCbBcAn@}@h@yBlAeAj@[RMF_@Ru@b@GDm@yAz@w@b@eAn@q@`@qEhC{A~@cDjBkAp@cAl@_FtC_@T_@T_Ap@y@n@g@b@iAfAa@`@UXmAvAa@j@QVwAvBk@|@}A`CeA`B{BhDeA~A_@l@iAfB}@rAeEpGo@bAMPSZCBuAvByBhD_DzEwPrWSXSZg@n@SVe@j@_@^[kAdAe@UNOLw@h@}@j@sAr@e@TQF[Lq@Vs@R_B`@iE|@WFqDr@sAZkATcB^s@NcBa@JaAP}Ac@Jg@JgAZi@Nu@XiAd@gAh@eAl@MHKFe@TGDSL{@h@i@^s@j@cAr@}B~A[PeAr@mClB_@cAz@qAnAoApA_A|@{A|AYX_A~@}@|@yBxBuBtBoBpBmAlA{AzAeBdBkAhAeAhAg@f@KLOPs@|@a@n@QXq@fA{@vAy@tA]l@[b@w@pA[b@a@d@y@|@w@v@YT?@CBKJA?ON]kClCmAlA}@t@{@v@A@wEjEoJbJeJ|IaC|B]Zc@^ED]Zo@n@q@l@MNc@o@d@m@`@cAj@aAh@q@Xq@Zq@^i@ZC@k@cAt@}@t@sBnByCpCkB`B}AzA_CvB}AvAu@r@cA`AoAtAkMtOwAbBa@r@[d@i@|@i@fAaAnBo@fASZQVcAnAeAnAi@h@UTs@l@mD|C_@MJYVg@f@g@j@e@p@[f@W^k@dAy@lBeAxCYr@w@zBaAtC{GpRcA|CYfAW~A}@nECRk@~B]`Ae@hAg@dAq@pAOXIPA@A@Ud@MXGNGNEJ[t@ADADi@~ASl@Of@Wt@cAbDaAnCkCrHa@hAA@GNq@lBe@vAe@dBWbACLMt@m@vDOrAKrAGjAEdBCbC@|J@zM?lB?nE?rEAbDCv@EhAA`@C`@It@MrAOhAMz@QfAKh@Mf@Qt@Of@W|@Sp@wBpGiAfD{@jCkEtMaH|S_@fAMb@_@rAa@zAIM`@'
							},
							start_location: {
								lat: 33.8206848,
								lng: -117.9230995
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '11.7 mi',
								value: 18809
							},
							duration: {
								text: '18 mins',
								value: 1062
							},
							end_location: {
								lat: 34.1294658,
								lng: -118.3475583
							},
							html_instructions:
								'Keep <b>left</b> at the fork to continue on <b>US-101 N</b>, follow signs for <b>Los Angeles N</b>/<b>Civic Center</b>',
							maneuver: 'fork-left',
							polyline: {
								points:
									'cstnEdbnpU@d@?@?@?@CJm@fCW`AMf@Od@Ut@cArCe@xAq@lB?@u@vBkD|Jq@nBc@rASh@e@vAYx@Wp@q@rB]bAm@`BUj@a@jAWp@w@hBOZS`@[p@INCFGJOVOX]j@]h@MTg@r@m@x@e@j@KLGDABC@C@SHiAhAA?EDw@x@[Zs@h@m@`@]T]RQFa@RSJQFMDiAXa@LWDg@FOB]Dy@Du@@u@As@EoBWy@Gu@Ek@?MAQ?_@@[BmAFy@Fa@@U@a@?W?a@Aa@Ca@C]Cm@KWCKCmASyC]}CU]Ak@Ae@?aEBoC@k@?}AFi@@uAJk@Di@Hm@Fm@JyAXi@LcBd@_Ac@PsAh@UHeAh@_@L]Nc@Pc@Pe@R}@{An@WNUNo@f@MN[^QVGJAB[j@[z@A??BUp@CLAHCJAHCP?HCNAPARAb@Er@?HAF?DAJAJG^AJC^AFATEOnAU~BKhAEZC`@CNMrAKpA_@pESnCInAK|ACRATClAARCVEZIdAGbA?BCZEbACj@CdAAz@@@NBb@Br@@T?X@VAT?RAPAZAVCTEZCNGZGI^GPCJUl@Wn@Q`@OZOVa@v@{AnCYh@[j@Yf@]n@mA|Bk@fAkAvBS`@o@jA]n@QZ]n@_@p@KNs@lAMRKP]h@w@pAk@v@[`@Y^_BtBST_@`@i@h@g@d@g@b@URUPUPo@h@gA|@gA|@k@d@eBvAEBi@b@i@b@UPWTe@`@YVSRQNYQTY^UZW^g@x@]h@GHq@dASXW`@[`@Se@p@aA|AiBpCeA`Ba@p@OXu@zAk@nAOWr@Wp@c@rASr@K^_@tA[rAi@tB[nAiAnEw@~CQp@e@lBCDg@pBg@pB[nAg@pBa@tAq@vBi@|Ai@zAc@nAc@nAc@pAq@pBa@lAm@jBaA|Ca@pAABCHCJIViApDk@|A_A~Bg@lAc@fAi@bBm@nBa@|AYdAKb@Mj@ETu@vDa@zB]~Au@~Dq@rDS|@Y|ACHAJMn@I`@I`@If@YjBm@bE?@Kr@?Dc@`Dg@jDYpB[pBc@fDMjAShBO~AQtAIj@Mx@[hBId@Ot@c@hBKf@Wz@c@lAKZYp@k@pAYr@k@jAMZeAbCuAhD}@dC}@`Cm@dBQd@Up@wB~FSh@g@rAEHSb@_@x@?Ba@t@KRSb@Wd@CD]n@c@x@o@bAiAjB_@l@ILILABMTKPMPqBfD{AbCu@hAOVmAjB[b@g@l@g@n@i@f@k@j@k@d@e@^m@b@_@V_@VC@ABSPQHUL{Av@iExB_@RyAt@u@`@k@XUN[P]To@d@URc@`@g@h@WVe@l@QTOVMR_@l@q@lAAB[l@q@lA_AdB_@r@}@`Bc@v@_A|As@hAKNMPg@n@c@h@QPEF_@`@_@^e@b@YTq@j@YPaAt@eAj@IFq@kB|@gKfFa@Pe@Re@Vs@s@b@[R_@X[Vg@f@[Zc@h@UXQRUg@~@i@dA]|@Y|@]tASbAMx@E`@EIx@Cn@E~@?^Ah@AvAAv@?d@A|@Ar@C`@Ab@I~@ALCPE^GCTGZGZK^Kb@Oj@k@zAO^Yl@Wh@]l@u@vAu@vAOZ[h@]p@Uf@s@vAqDnHu@zAyBhEQXkA`Cg@|@Ud@]l@KN]j@YiAvAKLQNCD]XMJg@`@[Re@Zu@`@q@XQJQFQF[JQDSFu@PaAT_@Js@Ne@LiDv@m@T?@oDr@iB^sATw@NQBKBiANaB^gAV}Bz@kCjAqBjAqBlAqC~BkAjAgBlBYXCFEDEFCB?@KLGFKJq@x@a@h@i@n@QXSVSVcAlAoA|AUXWZc@f@g@f@ONg@b@YTk@^_Al@eB`AWL[RYRWPQNQLa@ONQPi@h@iBjBEFMJWVMNo@n@uBvBo@p@'
							},
							start_location: {
								lat: 34.0256221,
								lng: -118.2059515
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '0.1 mi',
								value: 180
							},
							duration: {
								text: '1 min',
								value: 11
							},
							end_location: {
								lat: 34.1307998,
								lng: -118.3485738
							},
							html_instructions: 'Take exit <b>11B</b> toward <b>Universal Studios Blvd</b>',
							maneuver: 'ramp-right',
							polyline: {
								points: 'e|hoEfwiqUAACAA?A?C?E?A@C@MHURYXKHa@^WV[VKJMLIFIFKHCBA?A?A@A?A?C?CA'
							},
							start_location: {
								lat: 34.1294658,
								lng: -118.3475583
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '0.6 mi',
								value: 976
							},
							duration: {
								text: '2 mins',
								value: 105
							},
							end_location: {
								lat: 34.13502,
								lng: -118.3570364
							},
							html_instructions: 'Merge onto <b>W.C. Fields Dr</b>',
							maneuver: 'merge',
							polyline: {
								points:
									'odioEp}iqUMNQJYR_@Re@ZiBjASJk@^EBKJIHMLKLUTUQUb@GJKPGJGHCFEDCBCBCBC@EDEBEBC@EDCBEBEBCDCBC@CBEFCBCDEDEFINUd@ATCHEFGTMIVCJAL?N@JDTFZD^B^Bj@AD?PAXKt@_@hCQlAGVQ|@WfAc@nBw@jD'
							},
							start_location: {
								lat: 34.1307998,
								lng: -118.3485738
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '0.2 mi',
								value: 313
							},
							duration: {
								text: '1 min',
								value: 69
							},
							end_location: {
								lat: 34.1373841,
								lng: -118.356905
							},
							html_instructions: 'Turn <b>right</b> onto <b>Hotel Dr</b>',
							maneuver: 'turn-right',
							polyline: {
								points:
									'{~ioEnrkqUSEKEKAMAI?I@I?IBKBQDQDQBUFOB_@HQDE@GBKBMFIFGDIHCBIHA@A@A@C@C@C?C?E?w@CC?CACCAAACACACAEGYAC?CCQEOCKCICK'
							},
							start_location: {
								lat: 34.13502,
								lng: -118.3570364
							},
							travel_mode: 'DRIVING'
						},
						{
							distance: {
								text: '341 ft',
								value: 104
							},
							duration: {
								text: '1 min',
								value: 37
							},
							end_location: {
								lat: 34.1364887,
								lng: -118.3569926
							},
							html_instructions:
								'Turn <b>right</b> onto <b>Coral Dr</b><div style="font-size:0.9em">Destination will be on the left</div>',
							maneuver: 'turn-right',
							polyline: {
								points: 'smjoErqkqU^C@?pointCoords@?'
							},
							start_location: {
								lat: 34.1373841,
								lng: -118.356905
							},
							travel_mode: 'DRIVING'
						}
					],
					traffic_speed_entry: [],
					via_waypoint: []
				}
			],
			overview_polyline: {
				points:
					'grlmEjzvnUu@MKCIAWI_Cy@WGSGMEQEKCYCMAU?a@@E@E?MBE@I@IBKBWLE@EBIDGDKF}ArAeFlEWTs@l@qAjA_@]p@}ApAg@b@iAdA}BbCSTYXmExEsAxAOP[^cBlBw@x@qBtB}@~@{B`Cs@x@KLEBEDSPGF_BhCa@r@Wh@Wf@Sf@c@jAOb@K^ITW`AMd@_@xAWnAU`Bm@jEi@`Eu@hFOv@GXWlAMh@e@|AM`@M^KX{@vBkJtSmKhVgB|DiFlLeFfLWl@Q^Uf@_@t@a@r@a@r@A@Yd@y@zA}@|AQZYd@[h@U`@QZ[l@c@|@_@v@{@rBUn@s@hB_BjE_BtDuEhLu@hB[t@aChGQf@{CjHcDtHiItRkAdCuAdCy@rAgA~Aa@l@aB|BGHgAtAu@dAeGlIe@z@?@A@IPKRA@?@GJSd@_@~@Qh@Qh@WdAADIb@YrAe@~BGREVSbAU~@kAlE_A|Eg@zBADWbAOn@}@hCQh@k@~AcB~DYp@Wh@qAjCc@x@yBvD_BpC[f@eAfBgChFaBrDc@`AyHhQsAbDmAjCKV]v@uBxEuBvEoBnEsAnCABGHGNINEJCJGJGRc@`A[t@c@`AoAlCmBjEMZ]t@_@z@w@bBe@|@c@r@OTOTUg@v@a@h@g@n@e@j@Y^QRi@l@_@b@MPA?_@f@GFw@`AiBjCe@r@S^a@t@Ub@g@fACDq@xAm@tAqAxCiBbEg@lAcAzBYl@Wn@GJIRaBxDuCvGuEnK_ArBiBbE}@rBcAzBqBtEkBdEqA|CiAtBaD`GuAhCgAzBo@xAw@rBk@~Aq@xAcA|BoBtDYh@GJGLMVGNsA`Dc@bASj@y@rBcB|D_B~Da@bAsAjDyDjJi@nAm@vAsA`DmB`FIPwC~GiF|KaAlBmBvD{AzC{GzMkCpFsKhUkAhCcArCkBfEoBjEaAhBmAzBa@t@a@t@mAlBmAlBaB~BiBbCi@p@m@r@mBtBaChCmChCEBwBpB}CdEIL}ArCgBfBqAnA_A`AQVo@r@sAdBo@x@Yd@g@x@Wd@[j@c@|@oArCw@zAIPm@tAq@`BmAlCeAnBu@lAg@t@cBfCuDvEgEpEqAhAkA~@OLUNSNsCjBu@d@u@d@gDrBg@Zg@Z]Ra@TIFc@VGDu@`@iEpCsAz@uFjDgWdP{BhAa@PeAV_FxAg@Ze@e@VeBdAgKtGgAx@eDvB_GxEcAn@SLm@^wAz@a@Ve@ZiEdCqAt@wBnAGBoBjA}BrAKFGDu@b@k@Xi@XWNcB`Aa@VoDvBwCbBcAn@}@h@yBlAeAj@[RMF_@Ru@b@GDm@yAz@w@b@eAn@q@`@qEhC{A~@cDjBkAp@cAl@_FtC_@T_@T_Ap@y@n@g@b@iAfAa@`@UXmAvAa@j@QVwAvBk@|@}A`CeA`B{BhDeA~A_@l@iAfB}@rAeEpGo@bAMPSZCBuAvByBhD_DzEwPrWSXSZg@n@SVe@j@_@^[kAdAe@UNOLw@h@}@j@sAr@e@TQF[Lq@Vs@R_B`@iE|@WFqDr@sAZkATcB^s@NcBa@JaAP}Ac@Jg@JgAZi@Nu@XiAd@gAh@eAl@MHKFe@TGDSL{@h@i@^s@j@cAr@}B~A[PeAr@mClB_@cAz@qAnAoApA_A|@{A|AYX_A~@}@|@yBxBuBtBoBpBmAlA{AzAeBdBkAhAeAhAg@f@KLOPs@|@a@n@QXq@fA{@vAy@tA]l@[b@w@pA[b@a@d@y@|@w@v@YT?@CBKJA?ON]kClCmAlA}@t@{@v@A@wEjEoJbJeJ|IaC|B]Zc@^ED]Zo@n@q@l@MNc@o@d@m@`@cAj@aAh@q@Xq@Zq@^i@ZC@k@cAt@}@t@sBnByCpCkB`B}AzA_CvB}AvAu@r@cA`AoAtAkMtOwAbBa@r@[d@i@|@i@fAaAnBo@fASZQVcAnAeAnAi@h@UTs@l@mD|C_@MJYVg@f@g@j@e@p@[f@W^k@dAy@lBeAxCYr@w@zBaAtC{GpRcA|CYfAW~A}@nECRk@~B]`Ae@hAg@dAq@pAOXIPA@A@Ud@MXGNGNEJ[t@ADADi@~ASl@Of@Wt@cAbDaAnCkCrHa@hAA@GNq@lBe@vAe@dBWbACLMt@m@vDOrAKrAGjAEdBCbC@|J@zM?lB?nE?rEAbDCv@EhAA`@C`@It@MrAOhAMz@QfAKh@Mf@Qt@Of@W|@Sp@wBpGiAfD{@jCkEtMaH|S_@fAMb@_@rAa@zAIM`@'
			},
			summary: 'I-5 N and US-101 N',
			warnings: [],
			waypoint_order: []
		}
	],
	status: 'OK'
};

class Home extends Base {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		latitude: 0,
	// 		longitude: 0,
	// 		latitudeDelta: 0.015,
	// 		longitudeDelta: 0.0121,
	// 		currentPlace: '',
	// 		loading:true,
	// 		pointCoords:[],
	// 		routeCoordinates: [],
	// 		coordinate: new AnimatedRegion({
	// 			latitude: 29.95539,
	// 			longitude: 78.07513
	// 		   })
	// 		   ,
	// 		  region:null
	// 	};
	// }
	// componentWillMount()
	// {
	// 	this.requestLocationPermission()
	// 	// this.getRouteDirection()
	// 	if(this.props.location!=null)
	// 	{
	// 		this.setState({loading:false,latitude:this.props.location.latitude,longitude:this.props.location.longitude})

	// 	}
	// 	let headers = {
	// 		'Content-Type': 'application/json',
	// 		Accept: 'application/json',
	// 		authorization: `Bearer ${this.props.token}`
	// 	};
	// 	console.warn("token",this.props.token)
	// 	callApi(
	// 		'post',
	// 		'v1/daffo/Patient/getOwn',
	// 		{ perPage: 1, filter: { userId: this.props.user.id} },
	// 		headers
	// 	).then((result) => {
	// 		console.warn('resultttttttttttttttttttttttttttttt getOwn', result.data[0]);
	// 		result.data[0] ?  setPatient(result.data[0]) : '';
	// 	});
	// }
	// componentWillUnmount() {
	// 	navigator.geolocation.clearWatch(this.watchID);
	// }
	// openDrawer = () => {
	// 	this.props.navigation.openDrawer();
	// };
	// requestLocationPermission=async ()=>{
	// 	try {
	// 	  const granted = await PermissionsAndroid.request(
	// 		PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
	// 		{
	// 		  'title': 'Location Permission',
	// 		  'message': 'This app needs access to your location',
	// 		}
	// 	  )
	// 	  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
	// 		console.warn("You can use the location")
	// 	  } else {
	// 		console.warn("Location permission denied")
	// 	  }
	// 	} catch (err) {
	// 	  console.warn(err)
	// 	}
	//   }
	// componentDidMount() {

	// 	LocationServicesDialogBox.checkLocationServicesIsEnabled({
	// 		message: "<h3>Use Location?</h3> \
	// 					This app wants to change your device settings:<br/><br/>\
	// 					Use GPS for location<br/><br/>",
	// 		ok: "YES",
	// 		cancel: "NO"
	// 	}).then(() => {
	// 		RNGooglePlaces.getCurrentPlace()
	// 		.then((results) =>{
	// 			console.log("current location",results)
	// 			const {latitude,longitude}=results[0];
	// 			const newCoordinate = {
	// 				latitude,
	// 				longitude
	// 			  };
	//            Store.dispatch(addLocation({latitude:results[0].latitude,longitude:results[0].longitude}))
	// 			this.setState({
	// 				loading:false,currentPlace: `${results[0].name},${results[0].address}`,latitude:results[0].latitude,longitude:results[0].longitude
	// 			})
	// 			// this.getRouteDirection()
	// 			console.warn("current place",results)
	// 		})
	// 		.catch((error) => console.warn(error.message));
	// 	})
	// 	this.watchID = navigator.geolocation.watchPosition(
	// 		(position) => {
	// 			// Create the object to update this.state.mapRegion through the onRegionChange function
	// 			let region = {
	// 				latitude: position.coords.latitude,
	// 				longitude: position.coords.longitude,
	// 				latitudeDelta: 0.5,
	// 				longitudeDelta: 0.5 * (width / height)
	// 			};
	// 			const { latitude, longitude } = position.coords;

	// 			const newCoordinate = {
	// 			  latitude,
	// 			  longitude
	// 			};
	// 			console.log('Region', position);

	// 			// if (this.marker) {
	// 			// 	this.marker._component.animateMarkerToCoordinate(
	// 			// 	  newCoordinate,
	// 			// 	  500
	// 			// 	);
	// 			//   }
	// 			  this.setState({
	// 				latitude: position.coords.latitude,
	// 				longitude: position.coords.longitude,

	// 			});
	// 			// this.onRegionChange(region, region.latitude, region.longitude);
	// 			// this._map.animateToRegion(region, 100);
	// 		},
	// 		error => console.log(error),
	// 		// { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
	// 	);
	// 	// this.getDirection('29.132963299999993,75.7534505', '29.1328949,75.753995');
	// 	// this._askForLocationServices();
	// 	this.requestLocationPermission()
	// }
	// getDirection = async (startLoc, destinationLoc) => {
	// 	let resp = await fetch(
	// 		`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyASICVTRwAiAnnT_AzZFCqitJ56C8koh3s`
	// 	);
	// 	let respJson = await resp.json();
	// 	// let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
	// 	console.log(respJson);
	// 	// let coords = points.map((point, index) => {
	// 	//   return {
	// 	//     latitude: point[0],
	// 	//     longitude: point[1]
	// 	//   };
	// 	// });
	// 	console.log(respJson);
	// };
	// // _askForLocationServices() {
	// // 	PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
	// // 		title: 'question',
	// // 		message: 'gimme that location'
	// // 	}).then((granted) => {
	// // 		console.log('granted', granted);
	// // 		// always returns never_ask_again
	// // 	});
	// // }
	//  e=this;
	//  setUserLocation=(Coordinate)=>{
	// //   console.warn("location changed",Coordinate)
	//   const {latitude,longitude}=Coordinate;
	//   	const newCoordinate = {
	//   		latitude,
	//   		longitude
	// 		};
	// 		if (this.marker) {
	// 					  this.marker._component.animateMarkerToCoordinate(
	// 						newCoordinate,
	// 						500
	// 					  );
	// 					}
	// 					// this.getRouteDirection()
	// 					this.map.animateToRegion({latitude:Coordinate.latitude,longitude:Coordinate.longitude,latitudeDelta:latitude_delta,longitudeDelta:longitude_delta}, 2000);
	// 					// // this.setState({
	// 					// 			routeCoordinates: this.state.routeCoordinates.concat([newCoordinate])
	// 					// 		});
	//  }
	// // _onMapChange=(region)=>{
	// // 	// console.warn("region",region)
	// // 	// const {routeCoordinates}=this.state;
	// // 	// console.warn("route",routeCoordinates)
	// // 	const {latitude,longitude}=region;
	// // 	const newCoordinate = {
	// // 		latitude,
	// // 		longitude
	// // 	  };
	// // 	//   console.warn('Region', newCoordinate);

	// // 	  if (this.marker) {
	// // 		  this.marker._component.animateMarkerToCoordinate(
	// // 			newCoordinate,
	// // 			500
	// // 		  );
	// // 		}
	// // 		// this.setState({status:1})
	// // 	this.setState({
	// // 		routeCoordinates: this.state.routeCoordinates.concat([newCoordinate])
	// // 	});
	// // 	// console.warn("region changed", region);
	// // }

	// getRouteDirection=()=>{
	// 	try{
	//         //   const response=await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.latitude},${this.state.longitude}&destination=Universal+Studios+Hollywood&key=AIzaSyD9fameWCeX54X9WwqIKmp6x_S13v9a49g`)

	// 		//   const json=response.json();
	// 		//   console.log("response for map")
	// 		//   console.log("in json",json)
	// 		  const points=PolyLine.decode(response.routes[0].overview_polyline.points);
	// 		  console.log("Polyline points",points)
	// 		  const pointCoords=points.map(point=>{
	// 			  return {latitude:point[0],longitude:point[1]}
	// 		  });
	// 		//   console.log("state for route",this.state.pointCoords)
	// 		  this.setState({pointCoords})
	// 		  console.log("points coord",pointCoords)
	// 		  this.map.fitToCoordinates(pointCoords)
	// 		}
	// 	catch(error)
	// 	{
	// 		console.log(error)
	// 	}
	// }
	// onRegionChangeComplete=(region)=>{
	// 	latitude_delta=region.latitudeDelta;
	// 	longitude_delta=region.longitudeDelta;
	// //  console.warn("Completed region",region)
	// //  this.setState({latitudeDelta:region.latitudeDelta,longitudeDelta:region.longitudeDelta})
	// }
	// AutoCom = () => {
	// 	RNGooglePlaces.openAutocompleteModal({ country: 'IN', radius: 100 })
	// 		.then((place) => {
	// 			this.setState({
	// 				currentPlace: place.address,
	// 				latitude: place.latitude,
	// 				longitude: place.longitude
	// 			});
	// 			console.log(place.latitude);
	// 			// place represents user's selection from the
	// 			// suggestions and it is a simplified Google Place object.
	// 		})
	// 		.catch((error) => console.log(error.message));
	// };
	render() {
		console.log('Current position', this.state.latitude, this.state.longitude);
		return (
			<View style={{ flex: 1 }}>
				<Header title={'Quick Medic'} openDrawer={this.openDrawer} />

				{this.state.loading ? (
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<ActivityIndicator size="large" color="#000" />
					</View>
				) : (
					<MapView
						provider={PROVIDER_GOOGLE}
						style={[ styles.map ]}
						showsUserLocation={true}
						mapType="standard"
						followsUserLocation={true}
						showsBuildings={true}
						showsTraffic={true}
						loadingEnabled={true}
						ref={(map) => {
							this.map = map;
						}}
						initialRegion={{
							latitude: this.state.latitude,
							longitude: this.state.longitude,
							latitudeDelta: this.state.latitudeDelta,
							longitudeDelta: this.state.longitudeDelta
						}}
						//  maxZoomLevel={18}
						zoomEnabled={true}
						onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
						onUserLocationChange={(locationChangedResult) =>
							this.setUserLocation(locationChangedResult.nativeEvent.coordinate)}
					>
						<Polyline coordinates={this.state.pointCoords} strokeColor={'red'} strokeWidth={5} />
						<Marker.Animated
							ref={(marker) => {
								this.marker = marker;
							}}
							coordinate={this.state.coordinate}
						/>
					</MapView>
				)}
				<View
					style={{
						flexDirection: 'row',
						width: window.width,
						// margin: 30,
						height: 50,
						padding: 5,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 5,
						backgroundColor: '#fff',
						elevation: 20,
						position: 'absolute',
						marginTop: 60,
						// marginLeft: 20,
						// marginRight: 20,
						alignSelf: 'center'
					}}
				>
					<ScrollView
						contentContainerStyle={{ alignItems: 'center' }}
						style={{ width: '90%' }}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						<Text
							style={{
								borderBottomWidth: 2,
								borderBottomColor: '#507CFC',
								fontSize: 18
							}}
							onPress={this.AutoCom}
						>
							{this.state.currentPlace}
						</Text>
					</ScrollView>
					<View style={{ whidth: '10%' }}>
						<Image source={{ uri: 'mipmap/map' }} style={{ height: 19, width: 19 }} resizeMode="contain" />
					</View>
				</View>
				{this.state.callAmbulance === false ? (
					<View
						style={{
							position: 'absolute',
							alignSelf: 'flex-end',
							bottom: 0,
							marginVertical: 10,
							width: '100%'
						}}
					>
						<Button title={'Call Ambulance'} backgroundColor={'#f6263f'} onSave={this.callAmbulance} />
					</View>
				) : this.state.requestAmbulance === true ? this.props.showDriver === true ? (
					<ShowDriver driver={this.props.driver} Call={this.Call} />
				) : (
					<SearchingNearby />
				) : (
					<CallAmbulance
						advancedSupport={this.state.advancedSupport}
						basicSupport={this.state.basicSupport}
						onAdvancedSupport={this.onAdvancedSupport}
						onBasicSupport={this.onBasicSupport}
						onRequestAmbulance={this.onRequestAmbulance}
					/>
				)}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		// ...StyleSheet.absoluteFillObject
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-end',
		backgroundColor: 'yellow'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	},
	map: {
		// ...StyleSheet.absoluteFillObject
		flexGrow: 1
	}
});
function mapStateToProps(state) {
	return {
		user: state.user,
		patient: state.patient,
		token: state.token,
		location: state.Location,
		driver: state.driver,
		showDriver: state.showDriver
	};
}
export default connect(mapStateToProps)(Home);
