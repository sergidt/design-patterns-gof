// BUILDER PATTERN

import { HomeAutomationEnvironment, HomeAutomationEnvironmentData, HomeAutomationMode, IDevice } from './definitions';

export class EnvironmentBuilder implements HomeAutomationEnvironment {
    constructor(private _config: HomeAutomationEnvironmentData = {}) {
    }

    setMode(mode: HomeAutomationMode): HomeAutomationEnvironment {
        this._config.mode = mode;
        return this;
    }

    registerDevices(devices: Array<IDevice>): HomeAutomationEnvironment {
        console.log(`%c[EnvironmentBuilder]: ${ devices.length } devices registered!`, 'color: blue');
        this._config.connectors = devices.map(device => ConnectorFactory.createConnector(device));
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
    static build(devices: Array<IDevice>): HomeAutomationEnvironmentData {
        return new EnvironmentBuilder()
            .setMode(HomeAutomationMode.AllConnected)
            .setUsername('Sergi Dote')
            .registerDevices(devices)
            .start()
            .getConfig();
    }
}
