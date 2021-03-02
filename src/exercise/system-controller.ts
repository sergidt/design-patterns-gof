// SINGLETON

import { Device } from './devices';
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
