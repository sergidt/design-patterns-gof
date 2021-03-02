import { DeviceMessage, DeviceMessageType, DeviceType, ExternalSource, IDevice, Task } from './definitions';
import { randomInt } from './utils';

export class Device implements IDevice {
    private notification: (message: DeviceMessage) => void;
    private loopCount = 0;

    constructor(public name: string, public type: DeviceType) {
    }

    bind(notification: (message: DeviceMessage) => void) {
        this.notification = notification;
        this.notification({
            type: DeviceMessageType.Log,
            detail: `${ this.name } device bound!`
        });
        this.loop();
    }

    release() {
        this.notification({
            type: DeviceMessageType.Log,
            detail: `${ this.name } device released!`
        });
    }

    executeTask(task: Task) {
        this.notification({
            type: DeviceMessageType.Log,
            detail: `${ this.name } executing task: ${ task.type }`
        });
    }

    private loop() {
        const DEVICE_MESSAGES: Array<DeviceMessage> = [
            {
                type: DeviceMessageType.Log,
                detail: 'SYNCHRONIZING...'
            },
            {
                type: DeviceMessageType.Warning,
                detail: 'LOW SIGNAL'
            },
            {
                type: DeviceMessageType.Log,
                detail: 'CHECKING CHANNEL...'
            },
            {
                type: DeviceMessageType.Log,
                detail: 'RUNNING OK!'
            },
            {
                type: DeviceMessageType.Warning,
                detail: 'BATTERY LOW!!'
            }
        ];

        function randomMessage() {
            const rand = Math.random();
            return rand > 0.85 && rand <= 0.9 ? ({
                    type: DeviceMessageType.Error,
                    detail: 'CONNECTION LOST!!'
                })
                :
                rand > 0.9 ? ({
                        type: DeviceMessageType.Critical,
                        detail: 'CRITICAL ERROR!!'
                    })
                    : DEVICE_MESSAGES[randomInt(0, DEVICE_MESSAGES.length - 1)];
        }

        const randomDelay = randomInt(30000, 120000);
        if (this.loopCount > 0) {
            const message = randomMessage();
            this.notification({
                ...message,
                detail: `${ this.name }: ${ message.detail }`
            });
        }

        this.loopCount++;
        setTimeout(this.loop.bind(this), randomDelay);
    }
}

export class ExternalDevice extends Device {
    public externalSource: ExternalSource;

    constructor(name: string, externalSource: ExternalSource) {
        super(name, DeviceType.External);
        this.externalSource = externalSource;
    }
}
