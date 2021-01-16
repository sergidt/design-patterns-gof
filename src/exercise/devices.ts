import { Connectable, DeviceType, ExternalSource, Task } from './definitions';

export class Device implements Connectable {
    constructor(public name: string, public type: DeviceType) {
    }

    connect() {
        console.log(`%c${ this.name } device ON!`, 'color: #008800');
    }

    disconnect() {
        console.log(`%c${ this.name } device OFF!`, 'color: #AA0000');
    }

    executeTask(task: Task) {
        console.log(`%c${ this.name } executing task: ${ task.type }`, 'color: #AA0000');
    }
}

export class ExternalDevice extends Device {
    public externalSource: ExternalSource;

    constructor(name: string, externalSource: ExternalSource) {
        super(name, DeviceType.External);
        this.externalSource = externalSource;
    }
}
