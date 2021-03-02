// PATTERNS: Factory, Proxy, Mediator, IoC

import { DeviceConnector, DeviceMessage, DeviceMessageType, DeviceType, ExternalSource, Task } from './definitions';
import { Device, ExternalDevice } from './devices';
import { formatDate, randomInt, sleep } from './utils';

export abstract class BaseConnector implements DeviceConnector {
    public name: string;
    public lastConnection: number;
    public lastDisconnection: number;
    static managersCreated = false;
    static incidentManagementService: IncidentManagementService;

    protected constructor(public device: Device) {
        BaseConnector.createIncidentManagers();
        this.name = `${ device.type } Connector: ${ device.name }`;
        console.log(`%c${ this.name } -- CREATED!!`, 'color: #000088');
    }

    static createIncidentManagers() {
        if (!BaseConnector.managersCreated) {
            const warningManager: WarningIncidentManager = new WarningIncidentManager();
            const errorManager: ErrorIncidentManager = new ErrorIncidentManager();
            const criticalManager: CriticalIncidentManager = new CriticalIncidentManager();

            BaseConnector.incidentManagementService = new IncidentManagementService();
            BaseConnector.incidentManagementService.setHandler(warningManager.setNext(errorManager.setNext(criticalManager)));
            BaseConnector.managersCreated = true;
        }
    }

    static getIncidentManagementService(): IncidentManagementService {
        return BaseConnector.incidentManagementService;
    }

    protected notificationHandler(message: DeviceMessage) {
        switch (message.type) {
            case DeviceMessageType.Log:
                console.log(`%c[${ this.name }]: ${ message.detail }`, 'color: #1b6a90');
                break;

            default:
                BaseConnector.getIncidentManagementService().handleRequest(new Incident(message));
                break;
        }
    }

    connect(extraMessage?: string) {
        this.device.bind(this.notificationHandler);
        this.lastConnection = new Date().getTime();
        console.log(`%c[${ formatDate(new Date(this.lastConnection)) }]: ${ this.name } CONNECTED - ${ extraMessage || '' }`, 'color: #008800');
    }

    disconnect(extraMessage?: string) {
        this.device.release();
        this.lastDisconnection = new Date().getTime();
        console.log(`%c[${ formatDate(new Date(this.lastDisconnection)) }]: ${ this.name } DISCONNECTED - ${ extraMessage || '' }`, 'color: #888800');
    }

    executeTask(task: Task) {
        console.log(`%c${ this.name } sending task ${ task.type } to bound device -> ${ this.device.name }`, 'color: #AA0000');
        this.device.executeTask(task);
    }
}

export class ShutterConnector extends BaseConnector {
    constructor(device: Device) {
        super(device);
    }

    connect(extraMessage?: string) {
        super.connect('Shutter engine connected');
    }

    disconnect(extraMessage?: string) {
        super.disconnect('Shutter engine disconnected');
    }
}

export class LightConnector extends BaseConnector {
    constructor(device: Device) {
        super(device);
    }

    connect(extraMessage?: string) {
        super.connect('Light connected');
    }

    disconnect(extraMessage?: string) {
        super.disconnect('Light disconnected');
    }
}

export class AirConditioningConnector extends BaseConnector {
    constructor(device: Device) {
        super(device);
    }

    connect(extraMessage?: string) {
        super.connect('Cold and warm systems connected');
    }

    disconnect(extraMessage?: string) {
        super.disconnect('Cold and warm systems disconnected');
    }
}

export class AlarmConnector extends BaseConnector {
    constructor(device: Device) {
        super(device);
    }

    connect(extraMessage?: string) {
        super.connect('All sensors connected');
    }

    disconnect(extraMessage?: string) {
        super.disconnect('All sensors disconnected');
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

    async connect(extraMessage?: string) {
        this.accessAmazonCloud()
            .then(() => super.connect());
    }

    disconnect(extraMessage?: string) {
        this.disconnectFromAmazonCloud()
            .then(() => super.disconnect());
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

    async connect(extraMessage?: string) {
        this.accessGoogleCloud()
            .then(() => super.connect());
    }

    disconnect(extraMessage?: string) {
        this.disconnectFromGoogleCloud()
            .then(() => super.disconnect());
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

    connect(extraMessage?: string) {
        this.device.bind(this.notificationHandler);
    }

    disconnect(extraMessage?: string) {
        this.device.release();
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


