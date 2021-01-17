/**
 Tenemos una colección de la clase Topic y crearemos un iterator para iterar sobre esta lista.
 */

export class Topic {
    constructor(private name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }
}

export interface Iterator<E> {
    reset();

    next(): E;

    currentItem(): E;

    hasNext(): boolean;
}

export class TopicIterator implements Iterator<Topic> {

    private position: number;

    constructor(private readonly topics: Topic[]) {
        this.position = 0;
    }

    reset() {
        this.position = 0;
    }

    next(): Topic {
        return this.topics[this.position++];
    }

    currentItem(): Topic {
        return this.topics[this.position];
    }

    hasNext() {
        return this.position < this.topics.length;
    }
}

export interface List<E> {
    iterator(): Iterator<E>;
}

export class TopicList implements List<Topic> {

    constructor(private topics: Topic[]) {
    }

    iterator(): Iterator<Topic> {
        return new TopicIterator(this.topics);
    }
}

// How to use?
export class IteratorTest {
    static test() {
        const topics: Topic[] = [
            new Topic('topic1'),
            new Topic('topic2'),
            new Topic('topic3'),
            new Topic('topic4'),
            new Topic('topic5')
        ];

        const list: List<Topic> = new TopicList(topics);

        const iterator: Iterator<Topic> = list.iterator();

        while (iterator.hasNext()) {
            const currentTopic: Topic = iterator.next();
            console.log(currentTopic.getName());
        }
    }
}
