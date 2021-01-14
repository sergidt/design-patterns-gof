namespace Adapter {
  //target (our payment object interface)
interface PaymentTransaction {
    id: string;
    total: number;
    submitPayment: Function;
}
//our payment class
class Payment implements PaymentTransaction {
    
    constructor(public id: string, public total: number){
    }
    
     submitPayment() {
        console.log(`Proprietary Payment Amount: ${this.total} - ID: ${this.id}`);
    }
}
// Adaptee: what we want to be adapted with (3rd party method)
interface ThirdPartyPayment {
    id: number; //abstract away the type in the adapter
    amount: number; //abstract away the field name in the adapter
    sendPayment: Function; //abstract away in the adapter
}

class AmazonPayment implements ThirdPartyPayment {

    constructor(public id: number, public amount: number){
    }
    
     sendPayment() {
        console.log(`3rd Party Payment Amount: ${this.amount} - ID: ${this.id}`);
    }
}

enum PaymentType {
    Amazon,
    Proprietary
}
//adapter
class PaymentAdapter implements PaymentTransaction {

    constructor(public id: string,public  total: number,public  type: PaymentType) {
    }

    public submitPayment() {
        if (this.type === PaymentType.Amazon) {
            const amount = this.total;
            const id = parseInt(this.id);
            const payment = new AmazonPayment(id, amount);
            payment.sendPayment();
        } else if (this.type === PaymentType.Proprietary) {
            const id = this.id.toString();
            const payment = new Payment(id, this.total);
            payment.submitPayment();
        } else {
            throw new Error("Invalid Payment Type");
        }
    }
}

//How to use

const payment:PaymentTransaction = new PaymentAdapter("123", 47.99, PaymentType.Proprietary);
payment.submitPayment();

const payment2:PaymentTransaction = new PaymentAdapter("543", 99.99, PaymentType.Amazon);
payment2.submitPayment();
}