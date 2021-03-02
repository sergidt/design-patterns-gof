export interface Task {
    type: TaskType;
    params?: any;
}

export interface TaskExecutor {
    executeTask(task: Task);
}

export enum TaskType {
    Run = 'Run',
    GetInfo = 'Get info',
    GetState = 'Get state'
}

export interface DeviceMessage {
    type: DeviceMessageType;
    detail: string;
}

export enum DeviceMessageType {
    Log,
    Warning,
    Error,
    Critical
}

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

export interface DeviceConnector extends TaskExecutor {
    name: string;
    lastConnection: number;
    lastDisconnection: number;

    connect(extraMessage?: string);

    disconnect(extraMessage?: string);
}

export interface IDevice extends TaskExecutor {
    type: DeviceType;

    bind(notification: (message: DeviceMessage) => void);

    release();
}

export enum HomeAutomationMode {
    OnlyLights = 'Only lights',
    OnlyAirConditioning = 'Only air conditioning',
    OnlyAlarm = 'Only alarm',
    AllConnected = 'All connected'
}

export type HomeAutomationEnvironmentData = Partial<{
    mode: HomeAutomationMode;
    connectors: Array<DeviceConnector>;
    startTime: string;
    stopTime: string;
    username: string;
}>;

export interface HomeAutomationEnvironment {
    setMode(mode: HomeAutomationMode): HomeAutomationEnvironment;

    registerDevices(devices: Array<IDevice>): HomeAutomationEnvironment;

    setUsername(user: string): HomeAutomationEnvironment;

    start(): HomeAutomationEnvironment;

    stop(): HomeAutomationEnvironment;

    getConfig(): HomeAutomationEnvironmentData;
}


