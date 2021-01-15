import { EnvironmentDirector, HomeAutomationEnvironmentData } from './environment';

export class SystemController {
    private static instance: SystemController;

    private static config: HomeAutomationEnvironmentData;

    private constructor() {
    }

    static getInstance(): SystemController {
        if (SystemController.instance == null) {
            SystemController.instance = new SystemController();
        }
        return SystemController.instance;
    }

    static startSystem(devices: Array<Device>) {
        console.log(`%c[SystemController]: Starting system...`, 'font-weight: bold; font-size: 16px');
        SystemController.config = EnvironmentDirector.build(devices);

    }

    static stopSystem() {
        SystemController.config = null;
        console.log(`%c[SystemController]: System stopped!`, 'font-weight: bold; font-size: 16px');
    }
}

//// BUILDER

////////////////////

export enum DeviceType {
    Shutter = 'Shutter',
    Light = 'Light',
    AirConditioning = 'Air Conditioning',
    External = 'External',
    Alarm = 'Alarm'
}

export enum ExternalSource {
    Alexa = 'Alexa',
    GoogleHome = 'Google Home',
    MusicSystem = 'Music System',
}

export enum TaskType {
    Run = 'Run',
    GetInfo = 'Get info',
    GetState = 'Get state'
}

export interface Task {
    type: TaskType;
    params?: any;
}

export interface Connectable {
    connect();

    disconnect();

    executeTask(task: Task);
}

export class Device implements Connectable {
    constructor(public name: string, public type: DeviceType) {
    }

    connect() {
        console.log(`%c${ this.name } device ON!`, 'color: #008800');
    }

    disconnect() {
        console.log(`%c${ this.name } device OFF!`, 'color: #AA0000');
    }

    executeTask(task: Task) {
        console.log(`%c${ this.name } executing task: ${ task.type }`, 'color: #AA0000');
    }
}

export class ExternalDevice extends Device {
    public externalSource: ExternalSource;

    constructor(name: string, externalSource: ExternalSource) {
        super(name, DeviceType.External);
        this.externalSource = externalSource;
    }
}



