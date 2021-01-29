// Support desk > supervisor > manager > director

enum ServiceLevel {
    LEVEL_ONE,
    LEVEL_TWO,
    LEVEL_THREE,
    LEVEL_FOUR,
    INVALID_REQUEST
}

class ServiceRequest {
    private type: ServiceLevel;
    private conclusion: string;

    getType(): ServiceLevel {
        return this.type;
    }

    setType(type: ServiceLevel) {
        this.type = type;
    }

    getConclusion(): string {
        return this.conclusion;
    }

    setConclusion(conclusion: string) {
        this.conclusion = conclusion;
    }
}

interface SupportServiceItf {
    handleRequest(request: ServiceRequest);
}

class SupportService implements SupportServiceItf {
    private handler: SupportServiceItf;

    getHandler(): SupportServiceItf {
        return this.handler;
    }

    setHandler(handler: SupportServiceItf) {
        this.handler = handler;
    }

    handleRequest(request: ServiceRequest) {
        this.handler.handleRequest(request);
    }
}

class FrontDeskSupport implements SupportServiceItf {

    private next: SupportServiceItf;

    getNext(): SupportServiceItf {
        return this.next;
    }

    setNext(next: SupportServiceItf) {
        this.next = next;
        return this;
    }

    handleRequest(service: ServiceRequest) {
        if (service.getType() == ServiceLevel.LEVEL_ONE)
            service.setConclusion('Front desk solved level one request !!');
        else if (this.next != null)
            this.next.handleRequest(service);
        else
            throw new Error('No handler found for :: ' + service.getType());
    }
}

class SupervisorSupport implements SupportServiceItf {

    private next: SupportServiceItf;

    getNext(): SupportServiceItf {
        return this.next;
    }

    setNext(next: SupportServiceItf) {
        this.next = next;
        return this;
    }

    handleRequest(request: ServiceRequest) {
        if (request.getType() == ServiceLevel.LEVEL_TWO)
            request.setConclusion('Supervisor solved level two request !!');
        else if (this.next != null)
            this.next.handleRequest(request);
        else
            throw new Error('No handler found for :: ' + request.getType());
    }
}

class ManagerSupport implements SupportServiceItf {
    private next: SupportServiceItf;

    public getNext(): SupportServiceItf {
        return this.next;
    }

    setNext(next: SupportServiceItf) {
        this.next = next;
        return this;
    }

    handleRequest(request: ServiceRequest) {
        if (request.getType() == ServiceLevel.LEVEL_THREE) {
            request.setConclusion('Manager solved level three request !!');
        } else if (this.next != null) {
            this.next.handleRequest(request);
        } else {
            throw new Error('No handler found for :: ' + request.getType());
        }
    }
}

class DirectorSupport implements SupportServiceItf {

    private next: SupportServiceItf;

    getNext(): SupportServiceItf {
        return this.next;
    }

    setNext(next: SupportServiceItf) {
        this.next = next;
    }

    handleRequest(request: ServiceRequest) {
        debugger;
        if (request.getType() == ServiceLevel.LEVEL_FOUR)
            request.setConclusion('Director solved level four request !!');
        else if (this.next != null)
            this.next.handleRequest(request);
        else {
            request.setConclusion('You problem is none of our business');
            throw new Error('You problem is none of our business :: ' + request.getType());
        }
    }
}

// How to use?
export class ChainOfResponsibilityTest {
    static test() {
//// Support desk > supervisor > manager > director
        const frontendDeskSupport: FrontDeskSupport = new FrontDeskSupport();
        const supervisorSupport: SupervisorSupport = new SupervisorSupport();
        const managerSupport: ManagerSupport = new ManagerSupport();
        const directorSupport: DirectorSupport = new DirectorSupport();

        const supportService: SupportService = new SupportService();
        supportService.setHandler(frontendDeskSupport.setNext(supervisorSupport.setNext(managerSupport.setNext(directorSupport))));

        let request: ServiceRequest = new ServiceRequest();
        request.setType(ServiceLevel.LEVEL_ONE);
        supportService.handleRequest(request);
        console.log(request.getConclusion());

        request = new ServiceRequest();
        request.setType(ServiceLevel.LEVEL_THREE);
        supportService.handleRequest(request);
        console.log(request.getConclusion());

        request = new ServiceRequest();
        request.setType(ServiceLevel.INVALID_REQUEST);
        supportService.handleRequest(request);
        console.log(request.getConclusion());
    }
}



