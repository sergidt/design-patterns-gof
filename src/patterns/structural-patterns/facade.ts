class Subsystem1 {
    public operation1(): string {
        return 'Subsystem1: Ready!\n';
    }

    public operationN(): string {
        return 'Subsystem1: Go!\n';
    }
}

class Subsystem2 {
    public operation1(): string {
        return 'Subsystem2: Get ready!\n';
    }

    public operationZ(): string {
        return 'Subsystem2: Fire!';
    }
}

class Facade {
    protected subsystem1: Subsystem1;

    protected subsystem2: Subsystem2;

    /**
     * Depending on your application's needs, you can provide the Facade with
     * existing subsystem objects or force the Facade to create them on its own.
     */
    constructor(subsystem1: Subsystem1 = null, subsystem2: Subsystem2 = null) {
        this.subsystem1 = subsystem1 || new Subsystem1();
        this.subsystem2 = subsystem2 || new Subsystem2();
    }

    /**
     * The Facade's methods are convenient shortcuts to the sophisticated
     * functionality of the subsystems. However, clients get only to a fraction
     * of a subsystem's capabilities.
     */
    public execute(): string {
        let result = 'Facade initializes subsystems:\n';
        result += this.subsystem1.operation1();
        result += this.subsystem2.operation1();
        result += 'Facade orders subsystems to perform the action:\n';
        result += this.subsystem1.operationN();
        result += this.subsystem2.operationZ();

        return result;
    }
}

// how to use
export class FacadeTest {
    static test() {
        const subsystem1 = new Subsystem1();
        const subsystem2 = new Subsystem2();
        const facade = new Facade(subsystem1, subsystem2);

        facade.execute();
    }
}
