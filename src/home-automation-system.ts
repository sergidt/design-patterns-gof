//////////// UTILS ///////////////

function sleep(ms): Promise<boolean> {
    return new Promise<boolean>(resolve => setTimeout(() => resolve(true), ms));
}

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

//////////////

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
enum HomeAutomationMode {
    OnlyLights = 'Only lights',
    OnlyAirConditioning = 'Only air conditioning',
    OnlyAlarm = 'Only alarm',
    AllConnected = 'All connected'
}

type HomeAutomationEnvironmentData = Partial<{
    mode: HomeAutomationMode;
    connectors: Array<DeviceConnector>;
    startTime: string;
    stopTime: string;
    username: string;
}>;

interface HomeAutomationEnvironment {
    setMode(mode: HomeAutomationMode): HomeAutomationEnvironment;

    registerDevices(devices: Array<Device>): HomeAutomationEnvironment;

    setUsername(user: string): HomeAutomationEnvironment;

    start(): HomeAutomationEnvironment;

    stop(): HomeAutomationEnvironment;

    getConfig(): HomeAutomationEnvironmentData;
}

class EnvironmentBuilder implements HomeAutomationEnvironment {
    constructor(private _config: HomeAutomationEnvironmentData = {}) {
    }

    setMode(mode: HomeAutomationMode): HomeAutomationEnvironment {
        this._config.mode = mode;
        return this;
    }

    registerDevices(devices: Array<Device>): HomeAutomationEnvironment {
        this._config.connectors = devices.map(device => ConnectorFactory.createConnector(device));
        console.log(`%c[EnvironmentBuilder]: ${ devices.length } devices registered!`, 'color: blue');
        return this;
    }

    setUsername(user: string): HomeAutomationEnvironment {
        this._config.username = user;
        return this;
    }

    start(): HomeAutomationEnvironment {
        console.log(`%c[${ this._config.mode } environment]: Starting up...`, 'color: orange');
        this._config.connectors.forEach(connector => connector.connect());
        return this;
    }

    stop(): HomeAutomationEnvironment {
        console.log(`%c[${ this._config.mode } environment]: Shutting down...`, 'color: orange');
        return this;
    }

    getConfig(): HomeAutomationEnvironmentData {
        return this._config;
    }
}

class EnvironmentDirector {
    static build(devices: Array<Device>): HomeAutomationEnvironmentData {
        return new EnvironmentBuilder()
            .setMode(HomeAutomationMode.AllConnected)
            .setUsername('Sergi Dote')
            .registerDevices(devices)
            .start()
            .getConfig();
    }
}

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

export interface Connectable {
    connect();

    disconnect();
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
}

export class ExternalDevice extends Device {
    public externalSource: ExternalSource;

    constructor(name: string, externalSource: ExternalSource) {
        super(name, DeviceType.External);
        this.externalSource = externalSource;
    }
}

export interface DeviceConnector extends Connectable {
    name: string;
    lastConnection: number;
    lastDisconnection: number;
}

export abstract class BaseConnector implements DeviceConnector {
    public name: string;
    public lastConnection: number;
    public lastDisconnection: number;

    protected constructor(public device: Device) {
        this.name = `${ device.type }: ${ device.name }`;
    }

    connect() {
        this.device.connect();
        this.lastConnection = new Date().getTime();
        this.loop();
    }

    disconnect() {
        this.device.disconnect();
        this.lastDisconnection = new Date().getTime();
    }

    private loop() {
        const randomDelay = randomInt(10000, 20000);
        console.log(`${ this.name } message...`);
        setTimeout(this.loop.bind(this), randomDelay);
    }

}

export class ShutterConnector extends BaseConnector {
    constructor(device: Device) {
        super(device);
    }

    connect() {
        super.connect();
        console.log(`${ this.name }: Shutter engine connected`);
    }

    disconnect() {
        super.disconnect();
        console.log(`${ this.name }: Shutter engine disconnected`);
    }
}

export class LightConnector extends BaseConnector {
    constructor(device: Device) {
        super(device);
    }

    connect() {
        super.connect();
        console.log(`${ this.name }: Light connected`);
    }

    disconnect() {
        super.disconnect();
        console.log(`${ this.name }: Light disconnected`);
    }
}

export class AirConditioningConnector extends BaseConnector {
    constructor(device: Device) {
        super(device);
    }

    connect() {
        super.connect();
        console.log(`${ this.name }: Cold and warm systems connected`);
    }

    disconnect() {
        super.disconnect();
        console.log(`${ this.name }: Cold and warm systems disconnected`);
    }
}

export class AlarmConnector extends BaseConnector {
    constructor(device: Device) {
        super(device);
    }

    connect() {
        super.connect();
        console.log(`${ this.name }: All sensors connected`);
    }

    disconnect() {
        super.disconnect();
        console.log(`${ this.name }: All sensors disconnected`);
    }
}

export abstract class ExternalConnector extends BaseConnector {
    public name: string;

    protected constructor(device: ExternalDevice) {
        super(device);
    }
}

export class AlexaProxy extends ExternalConnector {
    constructor(device: ExternalDevice) {
        super(device);
    }

    async connect() {
        this.accessAmazonCloud()
            .then(() => {
                super.connect();
                console.log(`${ this.name }: Connected`);
            });
    }

    disconnect() {
        this.disconnectFromAmazonCloud()
            .then(() => {
                super.disconnect();
                console.log(`${ this.name }: Disconnected`);
            });
    }

    private async accessAmazonCloud(): Promise<boolean> {
        return sleep(randomInt(500, 1500));
    }

    private async disconnectFromAmazonCloud(): Promise<boolean> {
        return sleep(randomInt(500, 1500));
    }
}

export class GoogleHomeProxy extends ExternalConnector {
    constructor(device: ExternalDevice) {
        super(device);
    }

    async connect() {
        this.accessGoogleCloud()
            .then(() => {
                super.connect();
                console.log(`${ this.name }: Connected`);
            });
    }

    disconnect() {
        this.disconnectFromGoogleCloud()
            .then(() => {
                super.disconnect();
                console.log(`${ this.name }: Disconnected`);
            });
    }

    private async accessGoogleCloud(): Promise<boolean> {
        return sleep(randomInt(500, 1500));
    }

    private async disconnectFromGoogleCloud(): Promise<boolean> {
        return sleep(randomInt(500, 1500));
    }
}

export class MusicSystemProxy extends ExternalConnector {
    constructor(device: ExternalDevice) {
        super(device);
    }

    connect() {
        this.device.connect();
        console.log(`${ this.name }: Connected`);
    }

    disconnect() {
        this.device.disconnect();
        console.log(`${ this.name }: Disconnected`);
    }
}

export class ExternalConnectorFactory {
    static createConnector(device: ExternalDevice): DeviceConnector {
        if (!device.externalSource)
            throw new Error(`Received device is not an External Device!`);

        switch (device.externalSource) {
            case ExternalSource.Alexa:
                return new AlexaProxy(device);
            case ExternalSource.GoogleHome:
                return new GoogleHomeProxy(device);
            case ExternalSource.MusicSystem:
                return new MusicSystemProxy(device);
            default:
                throw new Error(`Unknown ${ device.externalSource } External Connector!`);
        }
    }
}

export class ConnectorFactory {
    static createConnector(device: Device): DeviceConnector {
        switch (device.type) {
            case DeviceType.Light:
                return new LightConnector(device);
            case DeviceType.AirConditioning:
                return new AirConditioningConnector(device);
            case DeviceType.Alarm:
                return new AlarmConnector(device);
            case DeviceType.Shutter:
                return new ShutterConnector(device);
            case DeviceType.External:
                return ExternalConnectorFactory.createConnector(device as ExternalDevice);
            default:
                throw new Error(`Unknown ${ device.type } Connector!`);
        }
    }
}


