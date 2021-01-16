export class Television {
    adjustVolumeUp() {
        console.log('TV -> adjustVolumeUp');
    }

    adjustVolumeDown() {
        console.log('TV -> adjustVolumeDown');
    }

    powerOff() {
        console.log('TV -> powerOff');
    }
}

export interface Command {
    execute(): void;
}

export class VolumeUpCommand implements Command {
    private tv: Television;

    constructor(tv: Television) {
        this.tv = tv;
    }

    public execute(): void {
        this.tv.adjustVolumeUp();
    }
}

export class RemoteControlButton {
    private command: Command;

    public setCommand(command: Command): void {
        this.command = command;
    }

    public buttonClicked(): void {
        this.command.execute();
    }
}

export class VolumeDownCommand implements Command {
    private tv: Television;

    constructor(tv: Television) {
        this.tv = tv;
    }

    public execute(): void {
        this.tv.adjustVolumeDown();
    }
}

export class PowerOffCommand implements Command {
    private tv: Television;

    constructor(tv: Television) {
        this.tv = tv;
    }

    public execute(): void {
        this.tv.powerOff();
    }
}

export class RemoteControl {
    public volumeUpButton: RemoteControlButton;
    public volumeDownButton: RemoteControlButton;
    public powerOffButton: RemoteControlButton;

    constructor(tv: Television) {
        this.volumeUpButton = new RemoteControlButton();
        this.volumeDownButton = new RemoteControlButton();
        this.powerOffButton = new RemoteControlButton();

        this.volumeUpButton.setCommand(new VolumeUpCommand(tv));
        this.volumeDownButton.setCommand(new VolumeDownCommand(tv));
        this.powerOffButton.setCommand(new PowerOffCommand(tv));

        this.powerOffButton.buttonClicked();
    }
}

// How to use?
export class CommandTest {
    static test() {
        new RemoteControl(new Television());
    }
}

