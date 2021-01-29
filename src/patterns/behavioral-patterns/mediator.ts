interface IChatRoom {
    sendMessage(message: string, userId: string);

    addUser(user: User);
}

abstract class User {
    private readonly _mediator: IChatRoom;
    private readonly _id: string;
    private readonly _name: string;

    protected constructor(room: IChatRoom, id: string, name: string) {
        this._mediator = room;
        this._id = id;
        this._name = name;
    }

    abstract send(msg: string, userId: string);

    abstract receive(msg: string);

    get mediator(): IChatRoom {
        return this._mediator;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }
}

class ChatRoom implements IChatRoom {

    private usersMap: Map<string, User> = new Map<string, User>();

    sendMessage(message: string, userId: string) {
        const u: User = this.usersMap.get(userId);
        u.receive(message);
    }

    addUser(user: User) {
        this.usersMap.set(user.id, user);
    }
}

class ChatUser extends User {

    constructor(room: IChatRoom, id: string, name: string) {
        super(room, id, name);
    }

    send(message: string, userId: string) {
        console.log(this.name + ' :: Sending Message : ' + message);
        this.mediator.sendMessage(message, userId);
    }

    receive(message: string) {
        console.log(this.name + ' :: Received Message : ' + message);
    }
}

// How to use?
export class MediatorTest {
    static test() {
        const chatroom: IChatRoom = new ChatRoom();

        const user1: User = new ChatUser(chatroom, '1', 'Alex');
        const user2: User = new ChatUser(chatroom, '2', 'Mary');
        const user3: User = new ChatUser(chatroom, '3', 'Sarah');
        const user4: User = new ChatUser(chatroom, '4', 'David');

        chatroom.addUser(user1);
        chatroom.addUser(user2);
        chatroom.addUser(user3);
        chatroom.addUser(user4);

        user1.send('Hello Mary', '2');
        user2.send('Hey buddy', '1');
    }
}
