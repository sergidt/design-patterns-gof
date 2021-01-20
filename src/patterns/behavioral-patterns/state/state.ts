export interface PackageState {
    updateState(context: DeliveryContext);
}

export class Acknowledged implements PackageState {
    //Singleton
    private static instance: Acknowledged = new Acknowledged();

    private constructor() {
    }

    public static getInstance(): Acknowledged {
        return Acknowledged.instance;
    }

    //Business logic and state transition
    updateState(context: DeliveryContext) {
        console.log('Package is acknowledged !!');
        context.setCurrentState(Shipped.getInstance());
    }
}

export class Shipped implements PackageState {
    //Singleton
    private static instance: Shipped = new Shipped();

    constructor() {
    }

    public static getInstance(): Shipped {
        return Shipped.instance;
    }

    //Business logic and state transition
    updateState(context: DeliveryContext) {
        console.log('Package is shipped !!');
        context.setCurrentState(InTransition.getInstance());
    }
}

export class InTransition implements PackageState {
    //Singleton
    private static instance: InTransition = new InTransition();

    private constructor() {
    }

    public static getInstance(): InTransition {
        return InTransition.instance;
    }

    //Business logic and state transition
    updateState(context: DeliveryContext) {
        console.log('Package is in transition !!');
        context.setCurrentState(OutForDelivery.getInstance());
    }
}

export class OutForDelivery implements PackageState {
    //Singleton
    private static instance: OutForDelivery = new OutForDelivery();

    private constructor() {
    }

    public static getInstance(): OutForDelivery {
        return OutForDelivery.instance;
    }

    //Business logic and state transition
    updateState(context: DeliveryContext) {
        console.log('Package is out of delivery !!');
        context.setCurrentState(Delivered.getInstance());
    }
}

export class Delivered implements PackageState {
    //Singleton
    private static instance: Delivered = new Delivered();

    private constructor() {
    }

    public static getInstance() {
        return Delivered.instance;
    }

    //Business logic
    updateState(context: DeliveryContext) {
        console.log('Package is delivered!!');
    }
}

export class DeliveryContext {

    constructor(private packageId: string, private currentState?: PackageState) {
        if (!currentState) {
            this.currentState = Acknowledged.getInstance();
        }
    }

    getCurrentState(): PackageState {
        return this.currentState;
    }

    setCurrentState(currentState: PackageState) {
        this.currentState = currentState;
    }

    getPackageId(): string {
        return this.packageId;
    }

    setPackageId(packageId: string) {
        this.packageId = packageId;
    }

    update() {
        this.currentState.updateState(this);
    }
}

// How to use?

export class StateTest {
    static test() {
        const ctx: DeliveryContext = new DeliveryContext('Test123');

        ctx.update();
        ctx.update();
        ctx.update();
        ctx.update();
        ctx.update();
    }
}
