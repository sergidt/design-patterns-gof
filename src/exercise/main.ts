import { DeviceType, ExternalSource } from './definitions';
import { Device, ExternalDevice } from './devices';
import { SystemController } from './system-controller';

const DEVICES: Array<Device> = [
    new Device('Living room shutter', DeviceType.Shutter),
    new Device('Living room lights', DeviceType.Light),
    new Device('Garden lights', DeviceType.Light),
    new Device('Swimming pool lights', DeviceType.Light),
    new Device('Bathroom lights', DeviceType.Light),
    new Device('Kitchen lights', DeviceType.Light),
    new Device('Bedroom shutter', DeviceType.Shutter),
    new Device('Bedroom shutter', DeviceType.Shutter),
    new Device('Kitchen shutter', DeviceType.Light),
    new Device('Central air conditioning', DeviceType.AirConditioning),
    new Device('Central alarm', DeviceType.Alarm),
    new ExternalDevice('Alexa device', ExternalSource.Alexa),
    new ExternalDevice('Google Home device', ExternalSource.GoogleHome),
    new ExternalDevice('Music system', ExternalSource.MusicSystem),
];

export class Exercise {
    static execute() {
        SystemController.startSystem(DEVICES);
    }
}
