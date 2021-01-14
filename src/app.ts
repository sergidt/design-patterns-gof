import { BehaviorSubject, combineLatest, fromEvent, merge, Observable, of, Subject, timer } from 'rxjs';
import { delay, distinctUntilChanged, filter, map, mapTo, scan, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';

console.clear();

/*

ORDENAR EL CODI I FER GUIÍO!!!!!!!!!!!!!!!!!!!!!!!!!!!!


Acabar:
* escriure els punts que s'han de fer
* MILLORES MIRANT EL DOM!!!! (performance)
* TAKE WHIlE AMB UN INHIBIDOR STATUS

 */

//////////////////////////// DOM ELEMENTS  ////////////////////////////

const doorSensorOkButton = document.getElementById('doorSensorOkButton');
const doorSensorIntrusionButton = document.getElementById('doorSensorIntrusionButton');
const doorSensorStatusHtmlElement = document.getElementById('doorSensorStatusHtmlElement');

const livingRoomSensorOkButton = document.getElementById('livingRoomSensorOkButton');
const livingRoomSensorIntrusionButton = document.getElementById('livingRoomSensorIntrusionButton');
const livingRoomSensorStatusHtmlElement = document.getElementById('livingRoomSensorStatusHtmlElement');

const perimeterSensorOkButton = document.getElementById('perimeterSensorOkButton');
const perimeterSensorIntrusionButton = document.getElementById('perimeterSensorIntrusionButton');
const perimeterSensorStatusHtmlElement = document.getElementById('perimeterSensorStatusHtmlElement');

const alarmStatusHtmlElement = document.getElementById('alarmStatusHtmlElement');

const alarmIcon = document.getElementById('alarmIcon');
const policeIcon = document.getElementById('policeIcon');
const inhibitionButton = document.getElementById('inhibitionButton');
const alarmCounterHtmlElement = document.getElementById('alarmCounterHtmlElement');
const inhibitionHtmlElement = document.getElementById('inhibitionHtmlElement');

//////////////////////////// DEFINITIONS ////////////////////////////

enum SensorStatus {
    Connecting = 'Connecting',
    Ok = 'Ok',
    Intrusion = 'Intrusion'
}

//////////////////////////// CLICK HANDLERS ////////////////////////////
function handleSensorClick(okButton: HTMLElement, intrusionButton: HTMLElement, intrusion$: Subject<boolean>) {
    merge(
        fromEvent(intrusionButton, 'click')
            .pipe(tap(e => console.log(`%c${ e.target['name'] } Intrusion detected!!`, 'background: #8B0000; color: #FFFFFF')),
                mapTo(true)),

        fromEvent(okButton, 'click')
            .pipe(tap(e => console.log(`%c${ e.target['name'] } Intrusion deactivated!!`, 'background: #00AA00; color: #FFFFFF')),
                mapTo(false))
    )
        .subscribe((intrusion: boolean) => intrusion$.next(intrusion));
}

//////////////////////////// INTRUSION CONTROLLERS ////////////////////////////
const doorIntrusionController$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
const livingRoomIntrusionController$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
const perimeterIntrusionController$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
const inhibitionController$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

/*
        Creamos las suscripciones para cada sensor y su respectivo controllador de intrusión
 */
handleSensorClick(doorSensorOkButton, doorSensorIntrusionButton, doorIntrusionController$);
handleSensorClick(livingRoomSensorOkButton, livingRoomSensorIntrusionButton, livingRoomIntrusionController$);
handleSensorClick(perimeterSensorOkButton, perimeterSensorIntrusionButton, perimeterIntrusionController$);

fromEvent(inhibitionButton, 'click')
    .pipe(tap(e => {
        console.log(`%c${ e.target['name'] } detected!!`, 'background: #8B0000; color: #FFFFFF');
        inhibitionHtmlElement.className = 'alarm-item blinking';
    }))
    .subscribe(() => inhibitionController$.next(true));

///////////////////////// UTILS ///////////////////////////

const setElementStatus = (sensor: HTMLElement) => (status: SensorStatus) => {
    sensor.innerText = status.toUpperCase();
    sensor.className = `sensor-status ${ status }`;
};

const intFrom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

//////////////////////////////// EJERCICIO ////////////////////////////////

function createSensor(intrusionController$: Observable<boolean>): Observable<SensorStatus> {
    return combineLatest([timer(intFrom(1500, 5000), 1000),
                          intrusionController$])
        .pipe(
            map(([, intrusion]) => intrusion ? SensorStatus.Intrusion : SensorStatus.Ok),
            startWith(SensorStatus.Connecting)
        );
}

function setAlarmStatus([doorStatus, livingRoomStatus, perimeterStatus]: [SensorStatus, SensorStatus, SensorStatus]) {
    const status = [doorStatus, livingRoomStatus, perimeterStatus].includes(SensorStatus.Connecting)
        ? SensorStatus.Connecting
        : [doorStatus, livingRoomStatus, perimeterStatus].includes(SensorStatus.Intrusion)
            ? SensorStatus.Intrusion
            : SensorStatus.Ok;

    setElementStatus(alarmStatusHtmlElement)(status);
    alarmIcon.className = `alarm-action ${ status === SensorStatus.Intrusion ? 'active' : 'inactive' }`;
}

const callToPolice = () => policeIcon.className = 'alarm-action active';

const hasStatus = (status: SensorStatus) => (statuses: Array<SensorStatus>) => statuses.includes(status);

const hasIntrusionStatus = hasStatus(SensorStatus.Intrusion);

//////////////////////////////// EXERCISE ////////////////////////////////

const doorSensorStatus$: Subject<SensorStatus> = new Subject<SensorStatus>();
const livingRoomSensorStatus$: Subject<SensorStatus> = new Subject<SensorStatus>();
const perimeterSensorStatus$: Subject<SensorStatus> = new Subject<SensorStatus>();

const allSensorsStatuses$ = combineLatest([doorSensorStatus$, livingRoomSensorStatus$, perimeterSensorStatus$]);

allSensorsStatuses$
    .subscribe(_ => setAlarmStatus(_));

// Hay una alarma real cuando se detecta una intrusión y no se desactiva antes del delay de seguridad
const REAL_ALARM_DELAY_SECONDS = 5;

const sensorsHaveIntrusion$: Observable<boolean> = allSensorsStatuses$
    .pipe(
        map(_ => hasIntrusionStatus(_)),
        distinctUntilChanged(), // treure'l inicialment així ensenyo la potència de l'operador
    );

const alarmSignals$: Observable<boolean> = sensorsHaveIntrusion$
    .pipe(
        switchMap((anyIntrusion: boolean) => of(anyIntrusion)
            .pipe(delay(anyIntrusion ? REAL_ALARM_DELAY_SECONDS * 1000 : 0)))
    );

// primer ensenyar sense el merge perque s'entengui

merge(alarmSignals$, inhibitionController$)
    .pipe(filter(signal => !!signal))
    .subscribe(() => callToPolice());

const alarmCountDown$ = sensorsHaveIntrusion$
    .pipe(
        switchMap(anyIntrusion => {
            return anyIntrusion
                ? timer(0, 1000)
                    .pipe(
                        scan((countDown) => countDown - 1, REAL_ALARM_DELAY_SECONDS),
                        takeWhile(_ => _ >= 0)
                    )
                : of(REAL_ALARM_DELAY_SECONDS);
        }));

alarmCountDown$
    .subscribe(_ => alarmCounterHtmlElement.innerText = String(_));

doorSensorStatus$
    .subscribe((status: SensorStatus) => setElementStatus(doorSensorStatusHtmlElement)(status));

livingRoomSensorStatus$
    .subscribe((status: SensorStatus) => setElementStatus(livingRoomSensorStatusHtmlElement)(status));

perimeterSensorStatus$
    .subscribe((status: SensorStatus) => setElementStatus(perimeterSensorStatusHtmlElement)(status));

// Creació després de las subscriptions
createSensor(doorIntrusionController$)
    .subscribe(doorSensorStatus$);

createSensor(livingRoomIntrusionController$)
    .subscribe(livingRoomSensorStatus$);

createSensor(perimeterIntrusionController$)
    .subscribe(perimeterSensorStatus$);

/*
Exercicis

- que no es respongui a cap botó mentre els sensors s'estan connectant
- comptador enrere amb scan
- unificar totes les subscripcions y posar un take while per dir quan acaba tot (inhibició)
 */



