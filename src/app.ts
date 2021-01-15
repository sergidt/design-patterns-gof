import { DeviceType, ExternalSource } from './home-automation-system/definitions';
import { Device, ExternalDevice } from './home-automation-system/devices';
import { SystemController } from './home-automation-system/system-controller';

console.clear();

// AdapterTest.test();
// BridgeTest.test();
// SingletonTest.test();

// PrototypeTest.test();

// FactoryMethodTest.test();
// BuilderTest.test();
// AbstractFactoryTest.test();
// FacadeTest.test();

// HOME AUTOMATION SYSTEM TEST

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

SystemController.startSystem(DEVICES);
