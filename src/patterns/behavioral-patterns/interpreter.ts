interface Expression {
    interpret(context: string): boolean;
}

class TerminalExpression implements Expression {
    constructor(private data: string) {
    }

    interpret(context: string): boolean {
        return context.includes(this.data);
    }
}

class OrExpression implements Expression {

    constructor(private  expression1: Expression, private  expression2: Expression) {
    }

    interpret(context: string): boolean {
        return this.expression1.interpret(context) || this.expression2.interpret(context);
    }
}

class AndExpression implements Expression {

    constructor(private  expression1: Expression, private  expression2: Expression) {
    }

    interpret(context: string): boolean {
        return this.expression1.interpret(context) && this.expression2.interpret(context);
    }
}

// How to use?
export class InterpreterTest {
    static test() {
        // Decision tree

        const smartWatches: Expression = new TerminalExpression('SmartWatches');
        const soundAndImage: Expression = new TerminalExpression('Sound and image');
        const sales: Expression = new OrExpression(smartWatches, soundAndImage);

        const tv: Expression = new TerminalExpression('TV');
        const lg: Expression = new TerminalExpression('LG');
        const lgWithDiscount: Expression = new AndExpression(tv, lg);

        const userProduct = {
            department: 'Sound and image',
            product: 'TV',
            brand: 'LG'
        };

        console.log('user product from sales? ' + sales.interpret(userProduct.department));
        console.log('product with discount? ' + lgWithDiscount.interpret(`${ userProduct.product } ${ userProduct.brand }`));

    }
}
