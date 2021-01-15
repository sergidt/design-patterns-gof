import { Connectable, Device, DeviceType, ExternalDevice, ExternalSource, Task } from './home-automation-system';
import { randomInt, sleep } from './utils';

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
        this.name = `${ device.type } Connector: ${ device.name }`;
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

    executeTask(task: Task) {
        console.log(`%c${ this.name } sending task ${ task.type } to bound device -> ${ this.device.name }`, 'color: #AA0000');
        this.device.executeTask(task);
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


