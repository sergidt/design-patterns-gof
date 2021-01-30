import { DeviceMessage, DeviceMessageType } from './definitions';

export class Incident {
    private conclusion: string;
    private readonly _type: DeviceMessageType;

    constructor(message: DeviceMessage) {
        this._type = message.type;
        this._detail = message.detail;
    }

    private _detail: string;

    get detail(): string {
        return this._detail;
    }

    set detail(value: string) {
        this._detail = value;
    }

    get type(): DeviceMessageType {
        return this._type;
    }

    getConclusion(): string {
        return this.conclusion;
    }

    setConclusion(value: string) {
        this.conclusion = value;
    }
}

export interface IncidentManager {
    handleRequest(request: Incident);
}

export class IncidentManagementService implements IncidentManager {
    private handler: IncidentManager;

    setHandler(handler: IncidentManager) {
        this.handler = handler;
    }

    getHandler(): IncidentManager {
        return this.handler;
    }

    handleRequest(request: Incident) {
        this.handler.handleRequest(request);
    }
}

export class WarningIncidentManager implements IncidentManager {
    private next: IncidentManager;

    getNext(): IncidentManager {
        return this.next;
    }

    setNext(next: IncidentManager) {
        this.next = next;
        return this;
    }

    handleRequest(incident: Incident) {
        if (incident.type === DeviceMessageType.Warning) {
            incident.setConclusion(`WARNING manager: incident treated successfully!`);
            console.warn(incident.getConclusion());
        } else if (this.next != null)
            this.next.handleRequest(incident);
        else
            throw new Error('No manager found for :: ' + incident.type);
    }
}

export class ErrorIncidentManager implements IncidentManager {
    private next: IncidentManager;

    getNext(): IncidentManager {
        return this.next;
    }

    setNext(next: IncidentManager) {
        this.next = next;
        return this;
    }

    handleRequest(incident: Incident) {
        if (incident.type === DeviceMessageType.Error) {
            incident.setConclusion(`ERROR manager: incident treated successfully!`);
            console.error(incident.getConclusion());
        } else if (this.next != null)
            this.next.handleRequest(incident);
        else
            throw new Error('No manager found for :: ' + incident.type);
    }
}

export class CriticalIncidentManager implements IncidentManager {
    private next: IncidentManager;

    public getNext(): IncidentManager {
        return this.next;
    }

    setNext(next: IncidentManager) {
        this.next = next;
        return this;
    }

    handleRequest(incident: Incident) {
        if (incident.type === DeviceMessageType.Critical) {
            incident.setConclusion(`CRITICAL manager: incident treated successfully!`);
            console.error(incident.getConclusion());
        } else if (this.next != null)
            this.next.handleRequest(incident);
        else
            throw new Error('No manager found for :: ' + incident.type);
    }
}



