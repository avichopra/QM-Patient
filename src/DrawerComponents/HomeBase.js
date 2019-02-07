import React, { Component } from 'react';
import { Text, View, Dimensions, PermissionsAndroid } from 'react-native';
import PolyLine from '@mapbox/polyline';
import { callApi } from '../utilities/serverApi';
import { setPatient } from '../redux/index';
import RNGooglePlaces from 'react-native-google-places';
import { AnimatedRegion } from 'react-native-maps';
let screen = Dimensions.get('window');
const { width, height } = Dimensions.get('window');
import call from 'react-native-phone-call';
const Aspect_Ratio = screen.width / screen.height;
let latitude_Delta = 0.0922;
let longitude_Delta = latitude_Delta * Aspect_Ratio;
let latitude_delta = 0.009,
	longitude_delta = 0.009;
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import Store from '../redux/store/index';
import { addLocation } from '../redux/actions/index';
let headers = {
	'Content-Typpe': 'application/json',
	Accept: 'application/json',
	authorization: `Bearer ${this.props.token}`
};
// import { saveSubscriptionInfo, onSocketData, unSubscribeSockets } from '../utilities/socket';
import { isArray } from 'lodash';
import { combineReducers } from 'redux';
let response1 = {
	responseCode: 200,
	version: '190.16',
	results: {
		alternatives: [],
		status: 0,
		trips: [
			{
				advices: [
					{
						exit_nr: 0,
						icon_id: 50,
						meters: 0,
						pt: {
							lat: 29.13280847143,
							lng: 75.753442794085
						},
						seconds: 0,
						text: '<b>Head</b> north.'
					},
					{
						exit_nr: 0,
						icon_id: 13,
						meters: 82,
						pt: {
							lat: 29.133026360192,
							lng: 75.753843784332
						},
						seconds: 50,
						text: 'At the end of the road turn <b>left.</b>'
					},
					{
						exit_nr: 0,
						icon_id: 13,
						meters: 117,
						pt: {
							lat: 29.133335620868,
							lng: 75.753918886185
						},
						seconds: 71,
						text: 'At the end of the road turn <b>left</b> onto <em>NH 9.</em>'
					},
					{
						exit_nr: 0,
						icon_id: 5,
						meters: 1906,
						pt: {
							lat: 29.138789701706,
							lng: 75.736463069916
						},
						seconds: 278,
						text: '<b>Bear right</b> at <em>NH 9.</em>'
					},
					{
						exit_nr: 0,
						icon_id: 0,
						meters: 2664,
						pt: {
							lat: 29.143231471228,
							lng: 75.730530023575
						},
						seconds: 357,
						text: 'Turn <b>left.</b>'
					},
					{
						exit_nr: 0,
						icon_id: 11,
						meters: 2690,
						pt: {
							lat: 29.143072170578,
							lng: 75.73032617569
						},
						seconds: 373,
						text: 'Take the 1st <b>left.</b>'
					},
					{
						exit_nr: 0,
						icon_id: 8,
						meters: 2729,
						pt: {
							lat: 29.142787537182,
							lng: 75.730562210083
						},
						seconds: 396,
						text: '<b>You will arrive at your destination.</b>'
					}
				],
				duration: 394,
				length: 2729,
				pts:
					'_`cqv@ctrnoCgPg@bC{_@iRuCgDnZmEdc@gDnZqItx@e@`EuCxUsFze@QtCqIrv@kHrp@iKlgAe@tC}H|q@e@tCe@`EqIbYoLz_@uJx[eGlT}AjFeGvQmE`OgDlLgNfe@gD`KwQrl@qInXoBjHeGxScCjHuJd[sMpb@gf@z`BaMz_@oBtGyNfe@_Pph@w@tCoB`KcCtCgD`KoBjHsW|m@mu@jcAqbB`yBgD`EmEtGiA`Ea^pd@_h@|o@|HvKtNgP',
				status: 6
			}
		]
	}
};
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
export default class HomeBase extends Component {
	constructor() {
		super();
		this.state = {
			latitude: 0,
			longitude: 0,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
			currentPlace: '',
			loading: true,
			pointCoords: [],
			routeCoordinates: [],
			callAmbulance: false,
			advancedSupport: false,
			basicSupport: false,
			requestAmbulance: false,
			coordinate: new AnimatedRegion({
				latitude: 29.95539,
				longitude: 78.07513
			})
		};
	}
	callAmbulance = () => {
		this.setState({ callAmbulance: true });
	};
	Call = (contactNo) => {
		const args = {
			number: contactNo, // String value with the number to call
			prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
		};
		call(args).catch(console.error);
	};
	componentWillMount() {
		// this.requestLocationPermission()
		// this.getRouteDirection()
		if (this.props.location != null) {
			this.setState({
				loading: false,
				latitude: this.props.location.latitude,
				longitude: this.props.location.longitude
			});
		}
		let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			authorization: `Bearer ${this.props.token}`
		};
		console.warn('token', this.props.token);
		callApi(
			'post',
			'v1/daffo/Patient/getOwn',
			{ perPage: 1, filter: { userId: this.props.user.id } },
			headers
		).then((result) => {
			console.warn('resultttttttttttttttttttttttttttttt getOwn', result.data[0]);
			result.data[0] ? setPatient(result.data[0]) : '';
		});
	}
	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}
	openDrawer = () => {
		this.props.navigation.openDrawer();
	};
	// requestLocationPermission = () => {
	// 	try {
	// 		PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
	// 			title: 'Location Permission',
	// 			message: 'This app needs access to your location'
	// 		}).then((granted) => {
	// 			console.log('granted');
	// 		});
	// 	} catch (err) {
	// 		console.warn(err);
	// 	}
	// };
	componentDidMount() {
		// this.requestLocationPermission();

		LocationServicesDialogBox.checkLocationServicesIsEnabled({
			message:
				'<h3>Use Location?</h3> \
						This app wants to change your device settings:<br/><br/>\
						Use GPS for location<br/><br/>',
			ok: 'YES',
			cancel: 'NO'
		}).then(() => {
			RNGooglePlaces.getCurrentPlace()
				.then((results) => {
					console.log('current location', results);
					const { latitude, longitude } = results[0];
					const newCoordinate = {
						latitude,
						longitude
					};
					Store.dispatch(addLocation({ latitude: results[0].latitude, longitude: results[0].longitude }));
					this.setState({
						loading: false,
						currentPlace: `${results[0].name},${results[0].address}`,
						latitude: results[0].latitude,
						longitude: results[0].longitude
					});
					this.getRouteDirection();
					console.log('current place', results);
				})
				.catch((error) => console.warn(error.message));
		});
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				// Create the object to update this.state.mapRegion through the onRegionChange function
				let region = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.5,
					longitudeDelta: 0.5 * (width / height)
				};
				const { latitude, longitude } = position.coords;

				const newCoordinate = {
					latitude,
					longitude
				};
				console.log('Region', position);

				// if (this.marker) {
				// 	this.marker._component.animateMarkerToCoordinate(
				// 	  newCoordinate,
				// 	  500
				// 	);
				//   }
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
				// this.onRegionChange(region, region.latitude, region.longitude);
				// this._map.animateToRegion(region, 100);
			},
			(error) => console.log(error)
			// { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
		// this.getDirection('29.132963299999993,75.7534505', '29.1328949,75.753995');
		// this._askForLocationServices();
		// this.requestLocationPermission()
		
	}
	getDirection = async (startLoc, destinationLoc) => {
		let resp = await fetch(
			`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyASICVTRwAiAnnT_AzZFCqitJ56C8koh3s`
		);
		let respJson = await resp.json();
		// let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
		console.log(respJson);
		// let coords = points.map((point, index) => {
		//   return {
		//     latitude: point[0],
		//     longitude: point[1]
		//   };
		// });
		console.log(respJson);
	};
	// onRegionChange(region) {
	// 	// this.setState({
	// 	//   latitude: region.latitude,
	// 	//   longitude: region.longitude,
	// 	//   latitudeDelta: region.latitudeDelta,
	// 	//   longitudeDelta: region.longitudeDelta
	// 	// });
	// 	// console.warn("region changed", region);
	// }
	e = this;
	setUserLocation = (Coordinate) => {
		//   console.warn("location changed",Coordinate)
		const { latitude, longitude } = Coordinate;
		const newCoordinate = {
			latitude,
			longitude
		};
		if (this.marker) {
			this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
		}

		//    this.map.fitToCoordinates(this.state.pointCoords)
		// this.getRouteDirection()
		//    this.map.fitToCoordinates(this.state.pointCoords)
		//    this.map.animateToRegion({latitude:Coordinate.latitude,longitude:Coordinate.longitude,latitudeDelta:latitude_delta,longitudeDelta:longitude_delta}, 2000);
		// // this.setState({
		// 			routeCoordinates: this.state.routeCoordinates.concat([newCoordinate])
		// 		});
	};
	onRegionChangeComplete = (region) => {
		latitude_delta = region.latitudeDelta;
		longitude_delta = region.longitudeDelta;
		//  console.warn("Completed region",region)
		//  this.setState({latitudeDelta:region.latitudeDelta,longitudeDelta:region.longitudeDelta})
	};
	AutoCom = () => {
		RNGooglePlaces.openAutocompleteModal({ country: 'IN', radius: 100 })
			.then((place) => {
				this.setState({
					currentPlace: place.address,
					latitude: place.latitude,
					longitude: place.longitude
				});
				console.log(place);
				// place represents user's selection from the
				// suggestions and it is a simplified Google Place object.
			})
			.catch((error) => console.log(error.message));
	};
	getRouteDirection = () => {
		try {
			//   const response=await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.latitude},${this.state.longitude}&destination=Universal+Studios+Hollywood&key=AIzaSyD9fameWCeX54X9WwqIKmp6x_S13v9a49g`)

			//   const json=response.json();
			//   console.log("response for map")
			//   console.log("in json",json)
			console.log('inside route direction', response1.results.trips[0].pts);
			const points = PolyLine.decode(response1.results.trips[0].pts);
			console.warn('Polyline points', points);
			let pointCoords = points.map((point) => {
				return { latitude: point[0], longitude: point[1] };
			});

			//   console.log("state for route",this.state.pointCoords)
			this.setState({ pointCoords: pointCoords });
			console.log('points coords in state', this.state.pointCoords);
			console.log('points coord', pointCoords);
			//   this.map.animateToRegion({latitude:Coordinate.latitude,longitude:Coordinate.longitude,latitudeDelta:latitude_delta,longitudeDelta:longitude_delta}, 2000);
		} catch (error) {
			console.log(error);
		}
	};
	onRequestAmbulance = () => {
		let { latitude = '', longitude = '', currentPlace = '' } = this.state;
		console.warn(
			'I am the stateeeeeeeeeeeeeeeeeeeeeeeeeeee',
			JSON.stringify(this.props.user, null, 3),
			JSON.stringify(this.props.patient, null, 3)
		);

		console.log('request ambulance being called>>>>>>>>>>>>>>>>>>>>>>');
		this.setState({ requestAmbulance: true });
		let data = {
			ambulanceSupport: this.state.advancedSupport ? 'AdvanceSupport' : 'BasicSupport',
			patient: {
				id: this.props.user.id,
				name: this.props.user.fullname,
				address: this.props.patient.address,
				picture: this.props.user.picture,
				emergencyContactNo: this.props.user.emergencycontactnumber,
				contactNo: this.props.user.contactNo
			},
			location: { currentPlace: currentPlace, latitude: latitude, longitude: longitude }
		};

		callApi('post', 'v1/daffo/dispatch/requestAmbulance', data, headers).then((response) => {
			console.log('response', response);
		});
	};
	onAdvancedSupport = () => {
		console.log('advanced support>>>>>>>>>>>>>');
		this.setState({ advancedSupport: true, basicSupport: false });
	};
	onBasicSupport = () => {
		this.setState({ basicSupport: true, advancedSupport: false });
	};

	// render() {
	// 	return (
	// 		<View>
	// 			<Text> textInComponent </Text>
	// 		</View>
	// 	);
	// }
}
