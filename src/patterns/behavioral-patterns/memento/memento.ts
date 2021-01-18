export class Article {
    constructor(private  id: number, private title: string, private content?: string) {
    }

    setId(value: number) {
        this.id = value;
    }

    setTitle(value: string) {
        this.title = value;
    }

    setContent(value: string) {
        this.content = value;
    }

    createMemento(): ArticleMemento {
        return new ArticleMemento(this.id, this.title, this.content);
    }

    restore(m: ArticleMemento) {
        this.id = m.getId();
        this.title = m.getTitle();
        this.content = m.getContent();
    }

    toString(): string {
        return 'Article [id=' + this.id + ', title=' + this.title + ', content=' + this.content + ']';
    }
}

export class ArticleMemento {
    constructor(private  id: number, private title: string, private content: string) {
    }

    getId(): number {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getContent(): string {
        return this.content;
    }
}

// How to use?
export class MementoTest {
    static test() {
        const article: Article = new Article(1, 'My Article');
        article.setContent('ABC');
        console.log(article);

        const memento: ArticleMemento = article.createMemento();
        article.setContent('123');
        console.log('Content updated to 123');
        console.log(article);

        article.restore(memento);
        console.log('Content restored');
        console.log(article);
    }
}

