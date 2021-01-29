abstract class Beverage {
    abstract cost(): number;
}

abstract class AddonDecorator extends Beverage {
}

class Coffee extends Beverage {
    public cost(): number {
        return 10;
    }
}

class Caramel extends AddonDecorator {
    constructor(private beverage: Beverage) {
        super();
    }

    public cost(): number {
        return this.beverage.cost() + 2;
    }
}

class Chocolate extends AddonDecorator {
    constructor(private beverage: Beverage) {
        super();
    }

    public cost(): number {
        return this.beverage.cost() + 5;
    }
}

// how to use
export class DecoratorTest {
    static test() {
        console.log(new Chocolate(new Caramel(new Coffee())).cost());
    }
}
