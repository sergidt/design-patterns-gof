import { ConnectorFactory, DeviceConnector } from './connectors';
import { Device } from './home-automation-system';

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

    registerDevices(devices: Array<Device>): HomeAutomationEnvironment;

    setUsername(user: string): HomeAutomationEnvironment;

    start(): HomeAutomationEnvironment;

    stop(): HomeAutomationEnvironment;

    getConfig(): HomeAutomationEnvironmentData;
}

export class EnvironmentBuilder implements HomeAutomationEnvironment {
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

export class EnvironmentDirector {
    static build(devices: Array<Device>): HomeAutomationEnvironmentData {
        return new EnvironmentBuilder()
            .setMode(HomeAutomationMode.AllConnected)
            .setUsername('Sergi Dote')
            .registerDevices(devices)
            .start()
            .getConfig();
    }
}
