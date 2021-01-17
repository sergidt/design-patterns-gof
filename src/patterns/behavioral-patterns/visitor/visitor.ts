export class Message {
    private readonly messageContent: string;

    constructor(m: string) {
        this.messageContent = m;
    }

    getMessageContent(): string {
        return this.messageContent;
    }
}

export abstract class Visitor {
    public readonly id: number;

    protected constructor() {
        this.id = new Date().getTime();
    }

    abstract update(m: Message);
}

export interface Observable {
    subscribe(o: Visitor);

    unsubscribe(o: Visitor);

    notify(m: Message);
}

export class MessagePublisher implements Observable {

    private observers: Array<Visitor> = [];

    subscribe(o: Visitor) {
        this.observers.push(o);
    }

    unsubscribe(o: Visitor) {
        this.observers = this.observers.filter(_ => _.id !== o.id);
    }

    notify(m: Message) {
        this.observers.forEach(_ => _.update(m));
    }
}

export class MessageSubscriberOne extends Visitor {
    constructor() {
        super();
    }

    update(m: Message) {
        console.log('MessageSubscriberOne :: ' + m.getMessageContent());
    }
}

export class MessageSubscriberTwo extends Visitor {
    constructor() {
        super();
    }

    update(m: Message) {
        console.log('MessageSubscriberTwo :: ' + m.getMessageContent());
    }
}

export class MessageSubscriberThree extends Visitor {
    constructor() {
        super();
    }

    update(m: Message) {
        console.log('MessageSubscriberThree :: ' + m.getMessageContent());
    }
}

// How to use?
export class ObserverTest {
    static test() {
        const s1: MessageSubscriberOne = new MessageSubscriberOne();
        const s2: MessageSubscriberTwo = new MessageSubscriberTwo();
        const s3: MessageSubscriberThree = new MessageSubscriberThree();

        const p: MessagePublisher = new MessagePublisher();

        p.subscribe(s1);
        p.subscribe(s2);

        p.notify(new Message('First Message'));   //s1 and s2 will receive the update

        p.unsubscribe(s1);
        p.unsubscribe(s3);

        p.notify(new Message('Second Message')); //s2 and s3 will receive the update
    }
}
