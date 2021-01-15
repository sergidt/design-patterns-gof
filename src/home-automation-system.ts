class SystemController {
    private static instance: SystemController;

    private constructor() {
    }

    static getInstance(): SystemController {
        if (SystemController.instance == null) {
            SystemController.instance = new SystemController();
        }
        return SystemController.instance;
    }
}

enum ConnectorType {
    Shutter = 'Shutter',
    Light = 'Light',
    AirConditioning = 'AirConditioning',
    External = 'External',
    Alarm = 'Alarm'
}

interface DeviceConnector {
    name: string;

    connect();

    disconnect();
}

class ShutterConnector implements DeviceConnector {
    public name: string;

    constructor(descriptor: string, config: any = {}) {
        this.name = `${ ConnectorType.Shutter }: ${ descriptor }`;
    }

    connect() {
        console.log(`${ this.name }: Connected`);
    }

    disconnect() {
        console.log(`${ this.name }: Disconnected`);
    }
}

class LightConnector implements DeviceConnector {
    public name: string;

    constructor(descriptor: string, config: any = {}) {
        this.name = `${ ConnectorType.Light }: ${ descriptor }`;
    }

    connect() {
        console.log(`${ this.name }: Connected`);
    }

    disconnect() {
        console.log(`${ this.name }: Disconnected`);
    }
}

class AirConditioningConnector implements DeviceConnector {
    public name: string;

    constructor(descriptor: string, config: any = {}) {
        this.name = `${ ConnectorType.AirConditioning }: ${ descriptor }`;
    }

    connect() {
        console.log(`${ this.name }: Connected`);
    }

    disconnect() {
        console.log(`${ this.name }: Disconnected`);
    }
}

class AlarmConnector implements DeviceConnector {
    public name: string;

    constructor(descriptor: string, config: any = {}) {
        this.name = `${ ConnectorType.Alarm }: ${ descriptor }`;
    }

    connect() {
        console.log(`${ this.name }: Connected`);
    }

    disconnect() {
        console.log(`${ this.name }: Disconnected`);
    }
}

class ExternalConnector implements DeviceConnector {
    public name: string;

    constructor(descriptor: string, config: any = {}) {
        this.name = `${ ConnectorType.External }: ${ descriptor }`;
    }

    connect() {
        console.log(`${ this.name }: Connected`);
    }

    disconnect() {
        console.log(`${ this.name }: Disconnected`);
    }
}

class ConnectorFactory {
    static createConnector(type: ConnectorType, description: string, config: any = {}) {
        switch (type) {
            case ConnectorType.Light:
                return new LightConnector(description, config);
            case ConnectorType.AirConditioning:
                return new AirConditioningConnector(description, config);
            case ConnectorType.Alarm:
                return new AlarmConnector(description, config);
            case ConnectorType.External:
                return new ExternalConnector(description, config);
            case ConnectorType.Shutter:
                return new ShutterConnector(description, config);
            default:
                throw new Error(`Unknown ${ type } Connector!`);
        }
    }
}
