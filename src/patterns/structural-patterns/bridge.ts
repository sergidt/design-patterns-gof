interface MessageSender {
    sendMessage(): void;
}

class TextMessageSender implements MessageSender {
    sendMessage() {
        console.log('TextMessageSender: Sending text message...');
    }
}

class EmailMessageSender implements MessageSender {
    sendMessage() {
        console.log('EmailMessageSender: Sending email message...');
    }
}

/////////////////////

abstract class Message {
    messageSender: MessageSender;

    protected constructor(messageSender: MessageSender) {
        this.messageSender = messageSender;
    }

    abstract send();
}

class TextMessage extends Message {

    constructor(messageSender: MessageSender) {
        super(messageSender);
    }

    send() {
        this.messageSender.sendMessage();
    }

}

class EmailMessage extends Message {
    constructor(messageSender: MessageSender) {
        super(messageSender);
    }

    send() {
        this.messageSender.sendMessage();
    }
}

// how to use
export class BridgeTest {
    static test() {
        const textMessageSender: MessageSender = new TextMessageSender();
        const textMessage: Message = new TextMessage(textMessageSender);
        textMessage.send();

        const emailMessageSender: MessageSender = new EmailMessageSender();
        const emailMessage: Message = new EmailMessage(emailMessageSender);
        emailMessage.send();
    }
}
