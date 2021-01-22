import { DeviceType, ExternalSource, Task, TaskExecutor } from './definitions';

import { randomInt } from './utils';

export class Device implements TaskExecutor {
    private notification: (message: string) => void;
    private loopCount = 0;

    constructor(public name: string, public type: DeviceType) {
    }

    bind(notification: (message: string) => void) {
        this.notification = notification;
        this.notification(`${ this.name } device bound!`);
        this.loop();
    }

    release() {
        this.notification(`${ this.name } device released!`);
    }

    executeTask(task: Task) {
        this.notification(`${ this.name } executing task: ${ task.type }`);
    }

    private loop() {
        function randomMessage() {
            const MESSAGES = ['SYNCHRONIZING...', 'LOW SIGNAL', 'CHECKING CHANNEL...', 'RUNNING OK!'];
            return Math.random() > 0.9 ? 'SYNC ERROR!' : MESSAGES[randomInt(0, MESSAGES.length - 1)];
        }

        const randomDelay = randomInt(30000, 120000);
        if (this.loopCount > 0)
            this.notification(`${ this.name } ${ randomMessage() }`);

        this.loopCount++;
        setTimeout(this.loop.bind(this), randomDelay);
    }

    private randomMessage() {
        const MESSAGES = ['SYNCHRONIZING...', 'LOW SIGNAL', 'CHECKING CHANNEL...', 'RUNNING OK!'];
        return Math.random() > 0.9 ? 'SYNC ERROR!' : MESSAGES[randomInt(0, MESSAGES.length - 1)];
    }
}

export class ExternalDevice extends Device {
    public externalSource: ExternalSource;

    constructor(name: string, externalSource: ExternalSource) {
        super(name, DeviceType.External);
        this.externalSource = externalSource;
    }
}
